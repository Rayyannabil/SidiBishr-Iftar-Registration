# 🌙 شقة سيدي بشر — دليل النشر

## هيكل المشروع
```
sidi-bishr/
├── index.html          ← الصفحة الكاملة
├── api/
│   ├── register.js     ← حفظ التسجيل في KV
│   └── admin.js        ← جلب البيانات (محمي بكلمة سر)
├── package.json
├── vercel.json
└── README.md
```

---

## خطوات النشر

### ١. ارفع على GitHub
```bash
git init
git add .
git commit -m "شقة سيدي بشر 2026"
git push origin main
```

### ٢. وصّل المشروع بـ Vercel
- اذهب إلى vercel.com → New Project
- اختر الـ GitHub repo
- اضغط Deploy

### ٣. أنشئ Vercel KV (قاعدة البيانات)
1. في Vercel Dashboard → مشروعك → **Storage**
2. اضغط **Create Database → KV**
3. سمِّها `sidi-bishr-kv`
4. اضغط **Connect** — Vercel هيضيف المتغيرات تلقائياً ✅

### ٤. أضف متغير كلمة سر الأدمن
في Vercel → Settings → Environment Variables:
```
ADMIN_SECRET = كلمة_سر_تختارها_أنت
```
> ⚠️ اختر كلمة سر قوية مثل: `RayyanAdmin2026`

### ٥. أعد النشر (Redeploy)
بعد إضافة المتغيرات اضغط **Redeploy**

---

## كيف تدخل لوحة الإدارة؟

1. افتح الموقع
2. **انقر نقراً مزدوجاً** على نص حقوق النشر في أسفل الصفحة
3. أدخل كلمة السر (`ADMIN_SECRET`)
4. ستظهر لك جميع البيانات + زر تحميل CSV (يفتح في Excel)

---

## ملاحظات
- البيانات محفوظة في Vercel KV — لا تُمسح عند كل deploy
- الـ CSV يدعم العربية في Excel (يحتوي BOM)
- الخطة المجانية تسمح بـ 30,000 عملية/شهر — كافية جداً
