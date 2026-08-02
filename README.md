# تكنو شام 🚀

موقع شخصي (Portfolio) + لوحة تحكم لاستوديو تصميم وبرمجة المواقع، بتصميم **زمرّدي + عاجي** أنيق ينبض بالحياة.

## بنية المشروع

```
technosham/
├── index.html, css/, js/   # النسخة الثابتة (تعمل على GitHub Pages حالياً)
├── backend/                # Django + DRF — API ولوحة الإدارة  (المرحلة 2)
├── frontend/               # Next.js 14 — الموقع العام + لوحة التحكم (المرحلة 2)
├── info.md                 # معلومات المشروع
└── plan.md                 # خطة التطوير
```

## المرحلة 1 — موقع ثابت (منشور حالياً)
موقع `HTML + CSS + JS` بسيط وجميل، منشور على GitHub Pages.
افتح `index.html` مباشرةً، أو شغّل: `python3 -m http.server 8000`.

## المرحلة 2 — Django + Next.js + لوحة تحكم ✅
النسخة الكاملة الديناميكية:

- **الخلفية** (`backend/`): Django REST Framework + JWT، تدير المحتوى والمظهر،
  و**API مفتوح** لربط مواقعك الأخرى ورؤية إحصائياتها في لوحة موحّدة.
- **الواجهة** (`frontend/`): Next.js — الموقع العام (يُبنى من الـ API) + **لوحة تحكم**
  احترافية فيها زر **«المظهر»** لتغيير الألوان والخط والحجم مع معاينة حيّة.

### تشغيل سريع للنسخة الكاملة
```bash
# 1) الخلفية
cd backend && python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt && python manage.py migrate && python manage.py seed
python manage.py runserver           # http://localhost:8000

# 2) الواجهة (نافذة طرفية أخرى)
cd frontend && npm install && npm run dev   # http://localhost:3000
```
المشرف الافتراضي للوحة التحكم: **admin / admin12345** (غيّرها لاحقاً).

التفاصيل الكاملة في [`backend/README.md`](./backend/README.md) و [`frontend/README.md`](./frontend/README.md).

## النشر
- **المرحلة 1:** GitHub Pages (Settings → Pages → الفرع + `/root`).
- **المرحلة 2:** الواجهة على Vercel، والخلفية+قاعدة البيانات على Render/Railway (مجاناً).
