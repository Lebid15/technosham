"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { getToken, clearToken } from "@/lib/api";
import AppearancePanel from "@/components/dashboard/AppearancePanel";

const NAV = [
  { href: "/dashboard", label: "نظرة عامة", icon: "📊" },
  { href: "/dashboard/projects", label: "المشاريع", icon: "🗂️" },
  { href: "/dashboard/sites", label: "المواقع المرتبطة", icon: "🔗" },
  { href: "/dashboard/messages", label: "الرسائل", icon: "✉️" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const isLogin = pathname === "/dashboard/login";

  useEffect(() => {
    if (isLogin) {
      setReady(true);
      return;
    }
    if (!getToken()) {
      router.replace("/dashboard/login");
    } else {
      setReady(true);
    }
  }, [isLogin, pathname, router]);

  if (isLogin) return <>{children}</>;
  if (!ready) return null;

  const logout = () => {
    clearToken();
    router.replace("/dashboard/login");
  };

  const title = NAV.find((n) => n.href === pathname)?.label || "لوحة التحكم";

  return (
    <div className="dash">
      <aside className="dash-side">
        <div className="dash-brand">
          <span className="logo-mark">ت</span>
          <span>تكنو شام</span>
        </div>
        <nav className="dash-nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={pathname === n.href ? "active" : ""}>
              <span>{n.icon}</span> {n.label}
            </Link>
          ))}
        </nav>
        <div className="dash-side-foot">
          <a href="/" target="_blank" className="btn-sm">↗ عرض الموقع</a>
          <button className="btn-sm danger" onClick={logout}>تسجيل الخروج</button>
        </div>
      </aside>

      <main className="dash-main">
        <div className="dash-top">
          <h1>{title}</h1>
          <div className="dash-top-actions">
            <button className="btn-sm primary" onClick={() => setAppearanceOpen(true)}>
              🎨 المظهر
            </button>
          </div>
        </div>
        <div className="dash-content">{children}</div>
      </main>

      <AppearancePanel open={appearanceOpen} onClose={() => setAppearanceOpen(false)} />
    </div>
  );
}
