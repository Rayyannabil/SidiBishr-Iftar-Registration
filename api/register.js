const { kv } = require("@vercel/kv");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  const { name, phone, payment } = body;
  if (!name || !payment) {
    return res.status(400).json({ error: "البيانات المطلوبة ناقصة" });
  }

  try {
    const id = `reg:${Date.now()}`;
    const record = {
      id,
      name,
      phone: phone || "—",
      payment,
      timestamp: new Date().toLocaleString("ar-EG", {
        timeZone: "Africa/Cairo",
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit"
      })
    };

    // Save individual record
    await kv.set(id, JSON.stringify(record));

    // Add to sorted index list
    await kv.lpush("registrations", id);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "خطأ في الحفظ، حاول مرة أخرى" });
  }
};
