export default async function handler(req, res) {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(400).json({ error: { message: "Missing authorization header" } });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
