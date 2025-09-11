# Technosham Monorepo

Responsive website header built with Python Django (backend) and React + Vite (frontend). Includes:

- Desktop: horizontal header with dropdowns for Services and Products, Settings with theme and language.
- Mobile/Tablet: hamburger menu with expandable sections, overlay shading, smooth transitions.
- i18n: Arabic (ar), Turkish (tr), English (en). Emojis: 🏠, 🛠️, 📦, ⚙️.
- Backend APIs: /api/menu and /api/settings (in-memory).

## Structure

```
backend/   # Django 5 project (core) + app (main)
frontend/  # Vite + React + TypeScript app
```

## Quick start (Windows PowerShell)

Note: You need Python 3.11+ and Node.js 18+ installed. pnpm is recommended for frontend.

1) Backend

- Create and activate a virtual environment, then install deps and run server:

```
python -m venv .venv ; .\.venv\Scripts\Activate.ps1 ; pip install -r backend\requirements.txt ; python backend\manage.py migrate ; python backend\manage.py runserver 0.0.0.0:8000
```

APIs:

- http://localhost:8000/api/menu
- http://localhost:8000/api/settings (GET/POST JSON: {"theme":"light|dark","lang":"en|ar|tr"})

2) Frontend

- From project root:

```
cd frontend ; pnpm install ; pnpm dev
```

- App serves at http://localhost:5173

## Testing

- Backend:

```
.\.venv\Scripts\Activate.ps1 ; python backend\manage.py test
```

- Frontend:

```
cd frontend ; pnpm test
```

## Notes

- CORS is enabled for local dev origins (Vite dev server).
- Theme and language are persisted in-memory on the backend and also stored in localStorage on the client for resilience.
- Arabic uses RTL direction automatically.
# this is a test