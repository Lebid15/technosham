"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { SiteSettings } from "@/lib/types";

const FONTS = ["Cairo", "Tajawal", "Almarai", "IBM Plex Sans Arabic", "Rubik"];

const PRESETS: { name: string; primary: string; p2: string; deep: string; gold: string; paper: string; ink: string }[] = [
  { name: "زمرّدي", primary: "#0f9b73", p2: "#16b98a", deep: "#0a3b2c", gold: "#d8a43f", paper: "#f5f2ea", ink: "#16211d" },
  { name: "أزرق", primary: "#2062d4", p2: "#3b82f6", deep: "#10294e", gold: "#d8a43f", paper: "#f4eee3", ink: "#172538" },
  { name: "بنفسجي", primary: "#7c3aed", p2: "#a855f7", deep: "#2e1065", gold: "#e0a83a", paper: "#f4f0f7", ink: "#1e1633" },
  { name: "نبيذي", primary: "#b0324b", p2: "#d14d67", deep: "#4a0f1c", gold: "#d8a43f", paper: "#f6efe9", ink: "#2a1418" },
  { name: "برتقالي", primary: "#e0671f", p2: "#f38b3d", deep: "#5a2408", gold: "#e0b53a", paper: "#f7f1e8", ink: "#2a1c11" },
];

/** يطبّق المظهر مباشرةً على الصفحة (معاينة حيّة). */
function applyTheme(s: Partial<SiteSettings>) {
  const root = document.documentElement;
  if (s.color_primary) root.style.setProperty("--blue", s.color_primary);
  if (s.color_primary_2) root.style.setProperty("--blue-2", s.color_primary_2);
  if (s.color_deep) root.style.setProperty("--blue-deep", s.color_deep);
  if (s.color_gold) root.style.setProperty("--gold", s.color_gold);
  if (s.color_paper) root.style.setProperty("--paper", s.dark_mode ? "#12140f" : s.color_paper);
  if (s.color_ink) root.style.setProperty("--ink", s.dark_mode ? "#eef0e8" : s.color_ink);
  if (s.font_family) {
    root.style.setProperty("--font", `'${s.font_family}', sans-serif`);
    loadFont(s.font_family);
  }
  if (s.base_font_size) root.style.fontSize = `${s.base_font_size}px`;
  if (s.radius != null) root.style.setProperty("--radius", `${s.radius}px`);
}

function loadFont(family: string) {
  const id = "ts-dyn-font";
  let link = document.getElementById(id) as HTMLLinkElement | null;
  const href = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@300;400;500;600;700;800;900&display=swap`;
  if (!link) {
    link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  link.href = href;
}

export default function AppearancePanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [s, setS] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    apiFetch<SiteSettings>("/settings/")
      .then((data) => {
        setS(data);
        applyTheme(data);
      })
      .catch(() => {});
  }, []);

  function update(patch: Partial<SiteSettings>) {
    setS((prev) => {
      const next = { ...(prev as SiteSettings), ...patch };
      applyTheme(next);
      return next;
    });
    setSaved(false);
  }

  async function save() {
    if (!s) return;
    setSaving(true);
    try {
      await apiFetch("/settings/1/", {
        method: "PATCH",
        auth: true,
        body: JSON.stringify(s),
      });
      setSaved(true);
    } catch (e) {
      alert("تعذّر الحفظ: " + (e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (!s) return null;

  return (
    <>
      <div className={`appearance-overlay${open ? " open" : ""}`} onClick={onClose} />
      <aside className={`appearance${open ? " open" : ""}`}>
        <div className="appearance-head">
          <h3>🎨 المظهر</h3>
          <button className="btn-sm" onClick={onClose}>✕</button>
        </div>

        <div className="appearance-body">
          {/* قوالب جاهزة */}
          <div className="group">
            <label>قوالب ألوان جاهزة</label>
            <div className="swatches">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  className={`swatch${s.color_primary === p.primary ? " active" : ""}`}
                  style={{ background: p.primary }}
                  title={p.name}
                  onClick={() =>
                    update({
                      color_primary: p.primary,
                      color_primary_2: p.p2,
                      color_deep: p.deep,
                      color_gold: p.gold,
                      color_paper: p.paper,
                      color_ink: p.ink,
                    })
                  }
                />
              ))}
            </div>
          </div>

          {/* ألوان مفصّلة */}
          <div className="group">
            <label>الألوان</label>
            {([
              ["color_primary", "اللون الأساسي"],
              ["color_primary_2", "الأساسي الفاتح"],
              ["color_deep", "الغامق"],
              ["color_gold", "لون التمييز"],
              ["color_paper", "الخلفية"],
              ["color_ink", "النص"],
            ] as [keyof SiteSettings, string][]).map(([key, label]) => (
              <div className="color-row" key={key}>
                <span>{label}</span>
                <input
                  type="color"
                  value={s[key] as string}
                  onChange={(e) => update({ [key]: e.target.value } as Partial<SiteSettings>)}
                />
              </div>
            ))}
          </div>

          {/* الخط */}
          <div className="group">
            <label>الخط</label>
            <div className="field" style={{ marginBottom: 0 }}>
              <select value={s.font_family} onChange={(e) => update({ font_family: e.target.value })}>
                {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>

          {/* حجم الخط */}
          <div className="group">
            <label>حجم الخط الأساسي</label>
            <div className="range-row">
              <input type="range" min={13} max={20} value={s.base_font_size}
                onChange={(e) => update({ base_font_size: Number(e.target.value) })} />
              <b>{s.base_font_size}px</b>
            </div>
          </div>

          {/* الاستدارة */}
          <div className="group">
            <label>استدارة الحواف</label>
            <div className="range-row">
              <input type="range" min={0} max={34} value={s.radius}
                onChange={(e) => update({ radius: Number(e.target.value) })} />
              <b>{s.radius}px</b>
            </div>
          </div>

          {/* الوضع الداكن */}
          <div className="group">
            <div className="toggle-row">
              <label style={{ marginBottom: 0 }}>الوضع الداكن</label>
              <label className="switch">
                <input type="checkbox" checked={s.dark_mode}
                  onChange={(e) => update({ dark_mode: e.target.checked })} />
                <span className="slider" />
              </label>
            </div>
          </div>
        </div>

        <div className="appearance-foot">
          <button className="btn-sm primary" style={{ flex: 1 }} onClick={save} disabled={saving}>
            {saving ? "جارٍ الحفظ…" : saved ? "✓ تم الحفظ" : "حفظ التغييرات"}
          </button>
        </div>
      </aside>
    </>
  );
}
