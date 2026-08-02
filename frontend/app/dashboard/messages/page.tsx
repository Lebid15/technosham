"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { ContactMessage } from "@/lib/types";

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [error, setError] = useState("");

  const load = () =>
    apiFetch<ContactMessage[]>("/messages/", { auth: true }).then(setMessages).catch((e) => setError(e.message));

  useEffect(() => { load(); }, []);

  async function toggleRead(m: ContactMessage) {
    await apiFetch(`/messages/${m.id}/`, { method: "PATCH", auth: true, body: JSON.stringify({ is_read: !m.is_read }) });
    load();
  }

  async function remove(id: number) {
    if (!confirm("حذف الرسالة؟")) return;
    await apiFetch(`/messages/${id}/`, { method: "DELETE", auth: true });
    load();
  }

  return (
    <>
      {error && <div className="error-msg">{error}</div>}
      <div className="panel">
        <h2>رسائل التواصل ({messages.length})</h2>
        {messages.length === 0 ? (
          <p style={{ color: "var(--ink-soft)" }}>لا توجد رسائل بعد.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="table">
              <thead><tr><th>الاسم</th><th>البريد</th><th>الرسالة</th><th>التاريخ</th><th>الحالة</th><th></th></tr></thead>
              <tbody>
                {messages.map((m) => (
                  <tr key={m.id} style={{ opacity: m.is_read ? 0.6 : 1 }}>
                    <td>{m.name}</td>
                    <td>{m.email}</td>
                    <td style={{ maxWidth: 320 }}>{m.message}</td>
                    <td>{new Date(m.created_at).toLocaleDateString("ar")}</td>
                    <td>
                      <button className="btn-sm" onClick={() => toggleRead(m)}>
                        {m.is_read ? "مقروءة" : "جديدة"}
                      </button>
                    </td>
                    <td><button className="btn-sm danger" onClick={() => remove(m.id)}>حذف</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
