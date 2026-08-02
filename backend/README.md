# خلفية تكنو شام (Django + DRF)

واجهة برمجة (API) لإدارة محتوى الموقع، المظهر، والمواقع المرتبطة.

## التشغيل محلياً

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate          # على ويندوز: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed               # بيانات تجريبية + مشرف (admin / admin12345)
python manage.py runserver          # http://localhost:8000
```

- لوحة Django Admin: `http://localhost:8000/admin/`
- الوثائق التفاعلية للـ API: افتح أي مسار في المتصفح (Browsable API).

## أهم المسارات

| المسار | الوصف | صلاحية |
|--------|-------|--------|
| `GET /api/bootstrap/` | كل محتوى الموقع في طلب واحد | عام |
| `GET /api/settings/` | إعدادات المظهر والمحتوى | عام |
| `PATCH /api/settings/1/` | تعديل المظهر | مشرف |
| `GET/POST /api/projects/` | المشاريع | قراءة عامة / كتابة مشرف |
| `POST /api/messages/` | إرسال رسالة تواصل | عام |
| `POST /api/auth/token/` | تسجيل الدخول (JWT) | عام |
| `GET /api/overview/` | ملخّص كل المواقع المرتبطة | مشرف |
| `GET/POST /api/external-sites/` | إدارة المواقع المرتبطة | مشرف |
| `POST /api/ingest/` | **API عام** لاستقبال إحصائيات موقع خارجي | مفتاح API |

## ربط مواقعك الأخرى (API مفتوح)

أضِف موقعاً من لوحة التحكم لتحصل على مفتاح `X-Api-Key`، ثم اجعل موقعك يرسل إحصائياته:

```bash
curl -X POST http://localhost:8000/api/ingest/ \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: <مفتاح الموقع>" \
  -d '{"visitors":1200,"orders":34,"new_users":88,"revenue":5400,"status":"up","response_ms":210}'
```

## متغيّرات البيئة (للإنتاج)

- `DJANGO_SECRET_KEY` — مفتاح سرّي.
- `DJANGO_DEBUG=0` — إيقاف وضع التطوير.
- `DJANGO_ALLOWED_HOSTS` — النطاقات المسموحة (مفصولة بفاصلة).
- `CORS_ALLOW_ALL=0` و `CORS_ALLOWED_ORIGINS` — نطاق الواجهة.
