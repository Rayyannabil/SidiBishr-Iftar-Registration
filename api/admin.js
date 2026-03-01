const { Redis } = require("@upstash/redis");

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-token");
  if (req.method === "OPTIONS") return res.status(200).end();

  const token = req.headers["x-admin-token"];
  if (token !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: "غير مصرح" });
  }

  try {
    const ids = await redis.lrange("registrations", 0, -1);
    if (!ids || ids.length === 0) return res.status(200).json({ records: [] });

    const records = await Promise.all(
      ids.map(async (id) => {
        const raw = await redis.get(id);
        if (!raw) return null;
        try { return typeof raw === "string" ? JSON.parse(raw) : raw; }
        catch { return null; }
      })
    );

    const clean = records
      .filter(Boolean)
      .sort((a, b) => (a.id > b.id ? -1 : 1));

    return res.status(200).json({ records: clean, total: clean.length });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "خطأ في جلب البيانات" });
  }
};