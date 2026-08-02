"use client";

import { SiteSettings } from "@/lib/types";

/**
 * يحقن متغيّرات المظهر (ألوان/خط/حجم) في :root،
 * ويحمّل خط Google المختار. أي تغيير في الإعدادات ينعكس فوراً.
 */
export default function ThemeStyle({ settings }: { settings: SiteSettings }) {
  const s = settings;
  const paper = s.dark_mode ? "#12140f" : s.color_paper;
  const ink = s.dark_mode ? "#eef0e8" : s.color_ink;
  const fontParam = s.font_family.replace(/ /g, "+");

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=${fontParam}:wght@300;400;500;600;700;800;900&display=swap');
    :root {
      --blue: ${s.color_primary};
      --blue-2: ${s.color_primary_2};
      --blue-deep: ${s.color_deep};
      --gold: ${s.color_gold};
      --paper: ${paper};
      --ink: ${ink};
      --font: '${s.font_family}', sans-serif;
      --radius: ${s.radius}px;
    }
    html { font-size: ${s.base_font_size}px; }
  `;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
