import { Bootstrap } from "./types";

// بيانات افتراضية تضمن ظهور الموقع حتى لو كان الخادم غير متاح.
export const DEFAULT_BOOTSTRAP: Bootstrap = {
  settings: {
    brand_name: "تكنو شام",
    color_primary: "#0f9b73",
    color_primary_2: "#16b98a",
    color_deep: "#0a3b2c",
    color_gold: "#d8a43f",
    color_paper: "#f5f2ea",
    color_ink: "#16211d",
    font_family: "Cairo",
    base_font_size: 16,
    radius: 20,
    dark_mode: false,
    hero_title: "نصمّم ونبرمج مواقع",
    hero_highlight: "تُبهر عملاءك",
    hero_title_end: "من أول نظرة.",
    hero_subtitle:
      "استوديو تكنو شام يحوّل أفكارك إلى تجارب رقمية بسيطة وأنيقة — أي موقع تحتاجه، بذوقٍ عالٍ وأداءٍ لا يخذلك.",
    about_text: "",
    whatsapp: "9665XXXXXXXX",
    email: "info@technosham.com",
    phone: "+9665XXXXXXXX",
    github: "https://github.com/technosham",
    linkedin: "https://linkedin.com/in/technosham",
    x_url: "https://x.com/technosham",
    instagram: "https://instagram.com/technosham",
  },
  services: [
    { id: 1, icon: "🌐", title: "مواقع تعريفية", description: "موقع أنيق يعرّف بعلامتك التجارية ويجذب العملاء.", order: 0, is_active: true },
    { id: 2, icon: "🛒", title: "متاجر إلكترونية", description: "متجر متكامل بتجربة شراء سلسة وبوابات دفع آمنة.", order: 1, is_active: true },
    { id: 3, icon: "⚙️", title: "أنظمة وتطبيقات", description: "لوحات تحكم وأنظمة إدارة مخصّصة تناسب عملك.", order: 2, is_active: true },
    { id: 4, icon: "🎨", title: "تصميم UI/UX", description: "تصاميم تضع المستخدم أولاً — جميلة وسهلة.", order: 3, is_active: true },
    { id: 5, icon: "📱", title: "مواقع متجاوبة", description: "يعمل موقعك بشكل مثالي على جميع الأجهزة.", order: 4, is_active: true },
    { id: 6, icon: "🚀", title: "تحسين وسرعة (SEO)", description: "نحسّن موقعك لمحركات البحث ونرفع سرعته.", order: 5, is_active: true },
  ],
  process: [
    { id: 1, number: "١", title: "نستمع", description: "نفهم فكرتك وأهدافك وجمهورك بدقّة قبل أي شيء.", order: 0 },
    { id: 2, number: "٢", title: "نصمّم", description: "نرسم تصميماً أنيقاً يعكس هويتك ويأخذ موافقتك.", order: 1 },
    { id: 3, number: "٣", title: "نبرمج", description: "نحوّل التصميم إلى موقع سريع ونظيف يعمل بلا عيوب.", order: 2 },
    { id: 4, number: "٤", title: "نُطلق", description: "نطلق موقعك ونبقى بجانبك بالدعم المستمر.", order: 3 },
  ],
  projects: [
    { id: 1, title: "متجر إلكتروني", description: "متجر متكامل لبيع المنتجات مع نظام دفع.", emoji: "🛍️", gradient: "", tags: "تصميم,برمجة", tag_list: ["تصميم", "برمجة"], link: "", order: 0, is_active: true },
    { id: 2, title: "لوحة تحكم إدارية", description: "نظام إدارة بيانات مع رسوم بيانية وتقارير.", emoji: "📊", gradient: "alt", tags: "نظام,API", tag_list: ["نظام", "API"], link: "", order: 1, is_active: true },
    { id: 3, title: "موقع تعريفي لشركة", description: "موقع عصري يعرّف بخدمات الشركة.", emoji: "🌐", gradient: "alt2", tags: "UI/UX,ويب", tag_list: ["UI/UX", "ويب"], link: "", order: 2, is_active: true },
  ],
  testimonials: [
    { id: 1, name: "أحمد الشمري", role: "صاحب متجر إلكتروني", quote: "موقع رائع وسريع، والتعامل كان احترافياً. أنصح به بشدّة.", rating: 5, initial: "أ", order: 0, is_active: true },
    { id: 2, name: "سارة عبدالله", role: "مديرة تسويق", quote: "نفّذوا موقع شركتي بتصميم مبهر فاق توقعاتي، والتسليم في الموعد.", rating: 5, initial: "س", order: 1, is_active: true },
    { id: 3, name: "محمد العتيبي", role: "رائد أعمال", quote: "أفضل فريق تعاملت معه — يفهمون ما تريده ويقدّمون حلولاً ذكية.", rating: 5, initial: "م", order: 2, is_active: true },
  ],
  stats: [
    { id: 1, label: "مشروع منجز", value: 30, suffix: "+", order: 0 },
    { id: 2, label: "عميل سعيد", value: 25, suffix: "+", order: 1 },
    { id: 3, label: "سنوات خبرة", value: 4, suffix: "+", order: 2 },
  ],
};
