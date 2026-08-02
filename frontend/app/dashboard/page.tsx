"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Overview } from "@/lib/types";

const STATUS_LABEL: Record<string, string> = { up: "يعمل", down: "متوقّف", degraded: "بطيء" };

export default function OverviewPage() {
  const [data, setData] = useState<Overview | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<Overview>("/overview/", { auth: true })
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="error-msg">{error}</div>;
  if (!data) return <p>جارٍ التحميل…</p>;

  const t = data.totals;
  const tiles = [
    { label: "إجمالي الزيارات", value: t.visitors.toLocaleString("ar"), icon: "👁️" },
    { label: "إجمالي الطلبات", value: t.orders.toLocaleString("ar"), icon: "🛒" },
    { label: "مستخدمون جدد", value: t.new_users.toLocaleString("ar"), icon: "👥" },
    { label: "الإيرادات", value: t.revenue.toLocaleString("ar"), icon: "💰" },
    { label: "المواقع المرتبطة", value: `${t.sites_up}/${t.sites_total}`, icon: "🔗" },
  ];

  return (
    <>
      <div className="stat-grid">
        {tiles.map((tile) => (
          <div className="stat-tile" key={tile.label}>
            <div className="icon">{tile.icon}</div>
            <div className="label">{tile.label}</div>
            <div className="value">{tile.value}</div>
          </div>
        ))}
      </div>

      <div className="panel">
        <h2>حالة المواقع المرتبطة</h2>
        {data.sites.length === 0 ? (
          <p style={{ color: "var(--ink-soft)" }}>لا توجد مواقع مرتبطة بعد. أضِف موقعاً من صفحة «المواقع المرتبطة».</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>الموقع</th><th>الزيارات</th><th>الطلبات</th><th>مستخدمون جدد</th>
                  <th>زمن الاستجابة</th><th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {data.sites.map((site) => (
                  <tr key={site.id}>
                    <td>
                      <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: site.color, marginLeft: 8 }} />
                      {site.name}
                    </td>
                    <td>{site.latest ? site.latest.visitors.toLocaleString("ar") : "—"}</td>
                    <td>{site.latest ? site.latest.orders.toLocaleString("ar") : "—"}</td>
                    <td>{site.latest ? site.latest.new_users.toLocaleString("ar") : "—"}</td>
                    <td>{site.latest ? `${site.latest.response_ms}ms` : "—"}</td>
                    <td>
                      {site.latest ? (
                        <span className={`badge ${site.latest.status}`}>{STATUS_LABEL[site.latest.status]}</span>
                      ) : "—"}
                    </td>
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
