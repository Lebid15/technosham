Technosham Project
===================

ENGLISH
-------
This repository contains the Technosham platform codebase:

Frontend (React 16 + i18next + RTL support + Dark Mode)
Backend (Django) with initial configuration

Key customizations performed:
- Removed unused demo pages (icons, form elements, etc.)
- Added Arabic (RTL) & Turkish localization with i18next
- Implemented persistent Dark Mode (localStorage)
- Standardized Arabic font (Tajawal)
- Simplified navigation: Services & Products (Watan only)
- Rebuilt Watan product page with hero, pricing, badges, image
- Added pricing translation keys (one‑time & monthly)
- Mobile padding & dark mode visual fixes

Development
1. Install frontend deps: cd frontend && npm install
2. Run frontend dev server: npm start
3. Backend (Django): cd backend && (create venv) && pip install -r requirements.txt && python manage.py runserver

Build (frontend): npm run build (output in frontend/build)

Arabic / العربية
-----------------
هذا المستودع يحتوي على منصة تكنوشام:

الواجهة الأمامية (React 16) مع تعدد اللغات (العربية + التركية) ودعم الاتجاه من اليمين لليسار ووضع داكن دائم.
الواجهة الخلفية (Django) مهيأة مبدئياً.

أهم التعديلات:
- حذف الصفحات التجريبية غير الضرورية
- إضافة الترجمة للعربية والتركية (i18next)
- تفعيل الوضع الداكن مع حفظ الاختيار
- توحيد خط العربية (Tajawal)
- تبسيط القائمة: الخدمات والمنتجات (منتج وطن فقط)
- بناء صفحة منتج وطن (صورة، وصف، تسعير، شارات)
- إضافة مفاتيح تسعير (شراء مرة واحدة، اشتراك شهري)
- تحسين الهوامش في الموبايل ومعالجة ألوان الوضع الداكن

بدء التطوير:
1. تثبيت الحزم للواجهة الأمامية: ادخل مجلد frontend ثم npm install
2. تشغيل الواجهة الأمامية: npm start
3. تشغيل الواجهة الخلفية: ادخل backend ثم فعّل بيئة افتراضية وثبّت المتطلبات ثم python manage.py runserver

بناء الإصدار النهائي (frontend): npm run build (المخرجات في frontend/build)

حقوق: 2025 Technosham. جميع الحقوق محفوظة.
