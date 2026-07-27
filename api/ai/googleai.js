export default async function handler(req, res) {
  const key = req.headers["x-goog-api-key"];
  if (!key) {
    return res.status(400).json({ error: { message: "Missing API key" } });
  }

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key,
      },
      body: JSON.stringify(req.body),
    }
  );

  const data = await response.json();
  res.status(response.status).json(data);
}
