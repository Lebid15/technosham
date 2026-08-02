"use client";

import { useEffect, useState } from "react";
import { apiFetch, apiUrl } from "@/lib/api";
import { ExternalSite } from "@/lib/types";

const EMPTY = { name: "", url: "", site_type: "other", color: "#0f9b73", is_active: true };
const TYPES: Record<string, string> = { store: "متجر", blog: "مدونة", saas: "نظام", landing: "تعريفي", other: "أخرى" };

export default function SitesPage() {
  const [sites, setSites] = useState<ExternalSite[]>([]);
  const [form, setForm] = useState<any>(EMPTY);
  const [error, setError] = useState("");
  const [showKey, setShowKey] = useState<number | null>(null);

  const load = () =>
    apiFetch<ExternalSite[]>("/external-sites/", { auth: true }).then(setSites).catch((e) => setError(e.message));

  useEffect(() => { load(); }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await apiFetch("/external-sites/", { method: "POST", auth: true, body: JSON.stringify(form) });
      setForm(EMPTY);
      load();
    } catch (e) {
      setError((e as Error).message);
    }
  }

  async function remove(id: number) {
    if (!confirm("حذف هذا الموقع المرتبط؟")) return;
    await apiFetch(`/external-sites/${id}/`, { method: "DELETE", auth: true });
    load();
  }

  return (
    <>
      {error && <div className="error-msg">{error}</div>}

      <div className="panel">
        <h2>ربط موقع جديد</h2>
        <form onSubmit={add}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="field"><label>اسم الموقع</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
            <div className="field"><label>الرابط</label><input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://…" /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="field"><label>النوع</label>
              <select value={form.site_type} onChange={(e) => setForm({ ...form, site_type: e.target.value })}>
                {Object.entries(TYPES).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div className="field"><label>اللون المميّز</label><input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} /></div>
          </div>
          <button className="btn-sm primary" type="submit">ربط الموقع</button>
        </form>
      </div>

      <div className="panel">
        <h2>المواقع المرتبطة ({sites.length})</h2>
        <p style={{ color: "var(--ink-soft)", fontSize: ".9rem", marginBottom: 16 }}>
          لربط موقعك، أرسِل إحصائياته إلى الرابط أدناه مع ترويسة <code>X-Api-Key</code> الخاصة بكل موقع.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead><tr><th>الموقع</th><th>النوع</th><th>مفتاح API</th><th>آخر زيارات</th><th></th></tr></thead>
            <tbody>
              {sites.map((site) => (
                <tr key={site.id}>
                  <td><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: site.color, marginLeft: 8 }} />{site.name}</td>
                  <td>{TYPES[site.site_type] || site.site_type}</td>
                  <td>
                    <button className="btn-sm" onClick={() => setShowKey(showKey === site.id ? null : site.id)}>
                      {showKey === site.id ? site.api_key : "•••••• إظهار"}
                    </button>
                  </td>
                  <td>{site.latest ? site.latest.visitors.toLocaleString("ar") : "—"}</td>
                  <td><button className="btn-sm danger" onClick={() => remove(site.id)}>حذف</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <h2>مثال على إرسال الإحصائيات (API)</h2>
        <pre style={{ background: "var(--paper-2)", padding: 16, borderRadius: 12, overflowX: "auto", direction: "ltr", fontSize: ".82rem" }}>
{`curl -X POST ${apiUrl("/ingest/")} \\
  -H "Content-Type: application/json" \\
  -H "X-Api-Key: <مفتاح الموقع>" \\
  -d '{"visitors": 1200, "orders": 34, "new_users": 88, "revenue": 5400, "status": "up", "response_ms": 210}'`}
        </pre>
      </div>
    </>
  );
}
