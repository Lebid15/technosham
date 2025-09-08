# abdulrahman3

مشروع Django بواجهات Django Templates + TailwindCSS (CDN) لبناء موقع technosham.

## المتطلبات
- Python 3.13 (أو 3.11/3.12)
- Windows PowerShell

## تشغيل محلي (Windows PowerShell)
1. إنشاء وتشغيل بيئة افتراضية:
   ```powershell
   python -m venv .venv
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   .\.venv\Scripts\Activate.ps1
   ```
2. تثبيت الاعتمادات:
   ```powershell
   python -m pip install -r requirements.txt
   ```
3. تشغيل Django:
   ```powershell
   python manage.py migrate
   python manage.py runserver
   ```

افتح المتصفح على: http://127.0.0.1:8000/

## البنية
- `technosham/settings.py`: تهيئة Django وتفعيل القوالب والمجلد `static/`.
- `core/`: التطبيق الأساسي والصفحات.
- `templates/base.html`: هيدر + منيو + فوتر + Tailwind (CDN).

## ملاحظات
- أثناء التطوير نستخدم Tailwind عبر CDN. يمكن بناء Tailwind محلياً لاحقاً للإنتاج.
