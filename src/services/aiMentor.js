const SYSTEM_PROMPT = `You are a blockchain mentor for the app "BlockQuest". Your only job is to teach blockchain, Web3, and cryptocurrency concepts to absolute beginners.

RULES:
1. Only answer questions related to blockchain, Web3, cryptocurrency, smart contracts, DeFi, NFTs, DAOs, or adjacent topics.
2. If a question is unrelated (e.g., cooking, sports, politics, general coding), politely refuse: "I am a blockchain mentor and can only help with Web3 topics. Ask me about blockchain!"
3. Always use beginner-friendly language. No jargon without explanation.
4. Give real-world analogies whenever possible.
5. Keep responses concise — 3 to 5 short paragraphs max.
6. Be encouraging and patient. The user is learning.
7. If you do not know something, say so honestly. Never make up facts.
8. Use emoji sparingly to keep it friendly.

Tone: Friendly teacher who loves blockchain and wants everyone to understand it.`;

export class AIMentorError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "AIMentorError";
    this.code = code;
  }
}

export const ERROR_CODES = {
  NO_API_KEY: "NO_API_KEY",
  WRONG_KEY_TYPE: "WRONG_KEY_TYPE",
  RATE_LIMITED: "RATE_LIMITED",
  API_ERROR: "API_ERROR",
  NETWORK_ERROR: "NETWORK_ERROR",
  INVALID_RESPONSE: "INVALID_RESPONSE",
};

function detectProvider(apiKey) {
  if (apiKey.startsWith("sk-or-")) {
    return "openrouter";
  }
  if (apiKey.startsWith("sk-") || apiKey.startsWith("sk-proj-")) {
    return "openai";
  }
  return "googleai";
}

function getConfig() {
  const key = (import.meta.env.VITE_OPENAI_API_KEY || "").trim();
  if (!key || key === "sk-your-key-here") {
    return null;
  }

  const provider = detectProvider(key);

  if (!provider) {
    return { error: "unknown-key-format" };
  }

  const configs = {
    openai: {
      apiUrl: "/api/ai/openai",
      model: "gpt-4o-mini",
      headers: {
        Authorization: `Bearer ${key}`,
      },
      keyHint: "sk-proj-...",
    },
    openrouter: {
      apiUrl: "/api/ai/openrouter",
      model: "openai/gpt-4o-mini",
      headers: {
        Authorization: `Bearer ${key}`,
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "BlockQuest",
      },
      keyHint: "sk-or-...",
    },
    googleai: {
      apiUrl: "/api/ai/googleai",
      model: "gemini-2.0-flash",
      headers: {
        "x-goog-api-key": key,
      },
      keyHint: "Google AI Studio key",
    },
  };

  return configs[provider];
}

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendMessage(history, newMessage, retries = 2) {
  const config = getConfig();

  if (!config) {
    throw new AIMentorError(
      "API key not configured. Create a .env file in the project root and add VITE_OPENAI_API_KEY=sk-your-key-here",
      ERROR_CODES.NO_API_KEY
    );
  }

  if (config.error === "unknown-key-format") {
    throw new AIMentorError(
      "The API key format is not recognized. It should start with sk- (OpenAI), sk-or- (OpenRouter), or be a Google AI Studio key.",
      ERROR_CODES.WRONG_KEY_TYPE
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  const isGoogle = config.apiUrl === "/api/ai/googleai";

  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) await delay(1000 * attempt);

    try {
      let body;
      if (isGoogle) {
        const contents = history.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.text }],
        }));
        contents.push({
          role: "user",
          parts: [{ text: newMessage }],
        });
        body = JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          generationConfig: {
            maxOutputTokens: 600,
            temperature: 0.7,
          },
        });
      } else {
        body = JSON.stringify({
          model: config.model,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...history.map((m) => ({ role: m.role, content: m.text })),
            { role: "user", content: newMessage },
          ],
          max_tokens: 600,
          temperature: 0.7,
        });
      }

      const response = await fetch(config.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...config.headers,
        },
        body,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (response.status === 429) {
        const body = await response.json().catch(() => ({}));
        const detail = isGoogle
          ? body.error?.message ?? "Quota exceeded. Please wait a moment before sending another message."
          : "You are sending messages too quickly. Please wait a moment before asking another question.";
        if (attempt < retries) {
          lastError = new AIMentorError(detail, ERROR_CODES.RATE_LIMITED);
          continue;
        }
        throw new AIMentorError(detail, ERROR_CODES.RATE_LIMITED);
      }

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        const message = body.error?.message ?? `API request failed (${response.status})`;
        throw new AIMentorError(message, ERROR_CODES.API_ERROR);
      }

      const data = await response.json();

      if (isGoogle) {
        if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
          throw new AIMentorError(
            "Received an empty response from the AI. Please try again.",
            ERROR_CODES.INVALID_RESPONSE
          );
        }
        return data.candidates[0].content.parts[0].text.trim();
      }

      if (!data.choices?.[0]?.message?.content) {
        throw new AIMentorError(
          "Received an empty response from the AI. Please try again.",
          ERROR_CODES.INVALID_RESPONSE
        );
      }

      return data.choices[0].message.content.trim();
    } catch (error) {
      clearTimeout(timeout);

      if (error instanceof AIMentorError && error.code !== ERROR_CODES.RATE_LIMITED) {
        throw error;
      }

      if (error instanceof AIMentorError && error.code === ERROR_CODES.RATE_LIMITED) {
        if (attempt < retries) {
          lastError = error;
          continue;
        }
        throw error;
      }

      if (error.name === "AbortError") {
        throw new AIMentorError(
          "The request timed out. Please check your internet connection and try again.",
          ERROR_CODES.NETWORK_ERROR
        );
      }

      throw new AIMentorError(
        "Unable to reach the AI service. Please check your internet connection.",
        ERROR_CODES.NETWORK_ERROR
      );
    }
  }

  throw lastError ?? new AIMentorError("Request failed. Please try again.", ERROR_CODES.API_ERROR);
}
