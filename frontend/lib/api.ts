const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export function apiUrl(path: string): string {
  return `${API_URL}${path}`;
}

// ---------- إدارة رمز الدخول (JWT) ----------
const TOKEN_KEY = "ts_access";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

interface FetchOptions extends RequestInit {
  auth?: boolean;
}

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { auth, headers, ...rest } = options;
  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string>),
  };
  if (auth) {
    const token = getToken();
    if (token) finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(apiUrl(path), { ...rest, headers: finalHeaders });

  if (res.status === 401) {
    clearToken();
    throw new Error("انتهت الجلسة، الرجاء تسجيل الدخول من جديد.");
  }
  if (!res.ok) {
    let detail = `خطأ ${res.status}`;
    try {
      const data = await res.json();
      detail = data.detail || JSON.stringify(data);
    } catch {
      /* تجاهل */
    }
    throw new Error(detail);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export async function login(username: string, password: string): Promise<void> {
  const res = await fetch(apiUrl("/auth/token/"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("اسم المستخدم أو كلمة المرور غير صحيحة.");
  const data = await res.json();
  setToken(data.access);
}
