export default async function handler(req, res) {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(400).json({ error: { message: "Missing authorization header" } });
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
      "HTTP-Referer": req.headers["http-referer"] || "https://blockquest.vercel.app",
      "X-Title": req.headers["x-title"] || "BlockQuest",
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
