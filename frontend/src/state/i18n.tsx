import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Lang = 'en' | 'ar' | 'tr'

type Dict = Record<string, string>

interface I18nCtx {
  lang: Lang
  rtl: boolean
  t: (key: string) => string
  setLang: (l: Lang) => void
}

const DEFAULTS: Record<Lang, Dict> = {
  en: {
    home: 'Home', services: 'Services', products: 'Products', about: 'About Technosham', settings: 'Settings',
    webdev: 'Web Development', design: 'Graphic Design', training: 'Training Courses', mobile: 'Mobile Apps', remote_it: 'Remote IT Support',
    watan: 'Watan platform for app/game top-up', saas: 'SaaS marketplace', courses: 'Courses',
    theme: 'Theme', language: 'Language', light: 'Light', dark: 'Dark'
  },
  ar: {
    home: 'الصفحة الرئيسية', services: 'الخدمات', products: 'المنتجات', about: 'من نحن - تكنوشام', settings: 'الإعدادات',
    webdev: 'تطوير الويب', design: 'التصميم الجرافيكي', training: 'الدورات التدريبية', mobile: 'تطبيقات الهواتف', remote_it: 'الدعم الفني عن بُعد',
    watan: 'منصة وطن لشحن التطبيقات والألعاب', saas: 'سوق البرمجيات كخدمة', courses: 'الدورات',
    theme: 'السمة', language: 'اللغة', light: 'فاتح', dark: 'داكن'
  },
  tr: {
    home: 'Ana Sayfa', services: 'Hizmetler', products: 'Ürünler', about: 'Technosham Hakkında', settings: 'Ayarlar',
    webdev: 'Web Geliştirme', design: 'Grafik Tasarım', training: 'Eğitim Kursları', mobile: 'Mobil Uygulamalar', remote_it: 'Uzaktan BT Desteği',
    watan: 'Uygulama/oyun bakiye (Watan platformu)', saas: 'SaaS pazaryeri', courses: 'Kurslar',
    theme: 'Tema', language: 'Dil', light: 'Açık', dark: 'Koyu'
  }
}

const I18nContext = createContext<I18nCtx | undefined>(undefined)

export const I18nProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [lang, setLang] = useState<Lang>((localStorage.getItem('lang') as Lang) || 'en')
  const [dict, setDict] = useState<Dict>(DEFAULTS[lang])

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    // best-effort sync with backend
    fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lang }) }).catch(()=>{})
    // try fetch from backend for future extensibility
    fetch(`/api/menu?lang=${lang}`).then(r=>r.json()).then(data => {
      if (data?.labels) setDict(data.labels)
    }).catch(() => setDict(DEFAULTS[lang]))
  }, [lang])

  const value = useMemo<I18nCtx>(() => ({
    lang,
    rtl: lang === 'ar',
    setLang,
    t: (k) => dict[k] ?? k
  }), [lang, dict])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
