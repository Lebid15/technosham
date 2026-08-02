"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Project } from "@/lib/types";

const EMPTY = { title: "", description: "", emoji: "🌐", gradient: "", tags: "", link: "", order: 0, is_active: true };

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<any>(EMPTY);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const load = () =>
    apiFetch<Project[]>("/projects/").then(setProjects).catch((e) => setError(e.message));

  useEffect(() => { load(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      if (editingId) {
        await apiFetch(`/projects/${editingId}/`, { method: "PATCH", auth: true, body: JSON.stringify(form) });
      } else {
        await apiFetch("/projects/", { method: "POST", auth: true, body: JSON.stringify(form) });
      }
      setForm(EMPTY);
      setEditingId(null);
      load();
    } catch (e) {
      setError((e as Error).message);
    }
  }

  function edit(p: Project) {
    setEditingId(p.id);
    setForm({ title: p.title, description: p.description, emoji: p.emoji, gradient: p.gradient, tags: p.tags, link: p.link, order: p.order, is_active: p.is_active });
  }

  async function remove(id: number) {
    if (!confirm("حذف هذا المشروع؟")) return;
    await apiFetch(`/projects/${id}/`, { method: "DELETE", auth: true });
    load();
  }

  return (
    <>
      {error && <div className="error-msg">{error}</div>}

      <div className="panel">
        <h2>{editingId ? "تعديل مشروع" : "إضافة مشروع جديد"}</h2>
        <form onSubmit={submit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="field"><label>العنوان</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
            <div className="field"><label>الرمز (إيموجي)</label><input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} /></div>
          </div>
          <div className="field"><label>الوصف</label><textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            <div className="field"><label>الوسوم (بفاصلة)</label><input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} /></div>
            <div className="field"><label>التدرّج</label>
              <select value={form.gradient} onChange={(e) => setForm({ ...form, gradient: e.target.value })}>
                <option value="">أخضر</option><option value="alt">ذهبي</option><option value="alt2">فيروزي</option>
              </select>
            </div>
            <div className="field"><label>الترتيب</label><input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} /></div>
          </div>
          <div className="field"><label>الرابط (اختياري)</label><input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} /></div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-sm primary" type="submit">{editingId ? "حفظ التعديل" : "إضافة"}</button>
            {editingId && <button type="button" className="btn-sm" onClick={() => { setEditingId(null); setForm(EMPTY); }}>إلغاء</button>}
          </div>
        </form>
      </div>

      <div className="panel">
        <h2>المشاريع ({projects.length})</h2>
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead><tr><th>الرمز</th><th>العنوان</th><th>الوسوم</th><th>الترتيب</th><th>مفعّل</th><th></th></tr></thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontSize: "1.3rem" }}>{p.emoji}</td>
                  <td>{p.title}</td>
                  <td>{p.tag_list.join("، ")}</td>
                  <td>{p.order}</td>
                  <td>{p.is_active ? "✓" : "✕"}</td>
                  <td style={{ display: "flex", gap: 8 }}>
                    <button className="btn-sm" onClick={() => edit(p)}>تعديل</button>
                    <button className="btn-sm danger" onClick={() => remove(p.id)}>حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
