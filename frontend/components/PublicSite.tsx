"use client";

import { useEffect, useRef, useState } from "react";
import { Bootstrap } from "@/lib/types";
import { DEFAULT_BOOTSTRAP } from "@/lib/defaults";
import { apiUrl } from "@/lib/api";
import ThemeStyle from "./ThemeStyle";

export default function PublicSite() {
  const [data, setData] = useState<Bootstrap>(DEFAULT_BOOTSTRAP);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const orbsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // جلب البيانات من الخادم (مع بقاء الافتراضي إن فشل)
  useEffect(() => {
    fetch(apiUrl("/bootstrap/"))
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setData(d))
      .catch(() => {});
  }, []);

  // الحركات: الظهور، شريط التنقّل، العمق، الأزرار المغناطيسية
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    const hoverFine = window.matchMedia("(hover: hover)").matches;
    let raf = 0;
    let tx = 0, ty = 0, ox = 0, oy = 0;
    const onMove = (ev: MouseEvent) => {
      tx = ev.clientX / window.innerWidth - 0.5;
      ty = ev.clientY / window.innerHeight - 0.5;
    };
    const loop = () => {
      ox += (tx - ox) * 0.06;
      oy += (ty - oy) * 0.06;
      if (orbsRef.current)
        orbsRef.current.style.transform = `translate(${ox * -40}px, ${oy * -40}px)`;
      if (visualRef.current)
        visualRef.current.style.transform = `translate(${ox * 26}px, ${oy * 26}px)`;
      raf = requestAnimationFrame(loop);
    };
    if (hoverFine) {
      window.addEventListener("mousemove", onMove);
      loop();
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [data]);

  const s = data.settings;
  const wa = `https://wa.me/${s.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <>
      <ThemeStyle settings={s} />

      <div className="bg-orbs" aria-hidden ref={orbsRef}>
        <span className="orb orb-1" />
        <span className="orb orb-2" />
      </div>

      <header className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="container nav-inner">
          <a href="#home" className="logo">
            <span className="logo-mark">ت</span>
            <span className="logo-text">
              {s.brand_name.split(" ")[0]} <b>{s.brand_name.split(" ").slice(1).join(" ")}</b>
            </span>
          </a>
          <nav className={`nav-links${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(false)}>
            <a href="#home">الرئيسية</a>
            <a href="#about">من نحن</a>
            <a href="#services">خدماتنا</a>
            <a href="#process">كيف نعمل</a>
            <a href="#projects">أعمالنا</a>
            <a href="#contact" className="nav-cta">لنتحدّث ↗</a>
          </nav>
          <button className="menu-toggle" aria-label="القائمة" onClick={() => setMenuOpen((o) => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* الواجهة */}
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="pill reveal"><i className="dot" /> متاحون لمشاريع جديدة</span>
            <h1 className="hero-title reveal">
              {s.hero_title} <span className="grad">{s.hero_highlight}</span> {s.hero_title_end}
            </h1>
            <p className="hero-sub reveal">{s.hero_subtitle}</p>
            <div className="hero-actions reveal">
              <a href="#contact" className="btn btn-primary">ابدأ مشروعك <span>↗</span></a>
              <a href="#projects" className="btn btn-ghost">تصفّح أعمالنا</a>
            </div>
            <div className="hero-stats reveal">
              {data.stats.map((st, i) => (
                <div key={st.id} style={{ display: "flex", alignItems: "center", gap: 26 }}>
                  {i > 0 && <span className="divider" />}
                  <div>
                    <b>{st.value}{st.suffix}</b>
                    <span>{st.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual reveal" ref={visualRef}>
            <div className="mockup">
              <div className="mockup-bar">
                <i /><i /><i />
                <div className="mockup-url">technosham.com</div>
              </div>
              <div className="mockup-screen">
                <div className="m-nav"><span className="m-logo" /><span className="m-links"><i /><i /><i /></span></div>
                <div className="m-hero">
                  <div className="m-hero-text">
                    <span className="m-line w80" /><span className="m-line w60" /><span className="m-btn" />
                  </div>
                  <div className="m-hero-art" />
                </div>
                <div className="m-cards"><div className="m-card" /><div className="m-card" /><div className="m-card" /></div>
              </div>
            </div>
            <div className="float-card fc-1"><span className="fc-icon">★</span><div><b>٤٫٩ / ٥</b><small>تقييم العملاء</small></div></div>
            <div className="float-card fc-2"><span className="fc-icon blue-bg">✓</span><div><b>تسليم سريع</b><small>في الموعد دائماً</small></div></div>
          </div>
        </div>
      </section>

      {/* شريط الثقة */}
      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          <span>تصميم واجهات ✦ متاجر إلكترونية ✦ أنظمة ويب ✦ تطبيقات ✦ هويات بصرية ✦ تحسين محركات البحث ✦</span>
          <span>تصميم واجهات ✦ متاجر إلكترونية ✦ أنظمة ويب ✦ تطبيقات ✦ هويات بصرية ✦ تحسين محركات البحث ✦</span>
        </div>
      </div>

      {/* من نحن */}
      <section className="section" id="about">
        <div className="container about-grid">
          <div className="about-head reveal">
            <span className="section-tag">٠١ — من نحن</span>
            <h2>نؤمن أن <span className="blue">البساطة</span> هي قمّة الأناقة.</h2>
          </div>
          <div className="about-text reveal">
            <p className="lead">في <b>{s.brand_name}</b> لا نبني مجرّد مواقع، بل نصنع انطباعاً أوّل لا يُنسى.</p>
            <p>{s.about_text || "نهتمّ بكل تفصيلة — من أول لون تراه إلى آخر زر تضغطه — لنقدّم لك موقعاً يجمع بين الجمال والوضوح والسرعة. تصاميمنا يفهمها الجميع، وتترك أثراً في الجميع."}</p>
            <ul className="feature-list">
              <li><span>✦</span> تصاميم عصرية تترك انطباعاً قوياً</li>
              <li><span>✦</span> أداء وسرعة تحميل عالية</li>
              <li><span>✦</span> متوافق مع جميع الأجهزة</li>
              <li><span>✦</span> دعم وتواصل مستمر بعد التسليم</li>
            </ul>
          </div>
        </div>
      </section>

      {/* الخدمات */}
      <section className="section" id="services">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-tag">٠٢ — خدماتنا</span>
            <h2>ماذا نصنع <span className="blue">لك؟</span></h2>
            <p className="section-desc">حلول رقمية متكاملة تغطّي كل ما يحتاجه مشروعك.</p>
          </div>
          <div className="cards-grid">
            {data.services.map((sv) => (
              <article className="card reveal" key={sv.id}>
                <div className="card-icon">{sv.icon}</div>
                <h3>{sv.title}</h3>
                <p>{sv.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* كيف نعمل */}
      <section className="section process" id="process">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-tag">٠٣ — كيف نعمل</span>
            <h2>رحلة بسيطة من <span className="blue">الفكرة إلى الإطلاق</span></h2>
          </div>
          <div className="steps">
            {data.process.map((p) => (
              <div className="step reveal" key={p.id}>
                <span className="step-num">{p.number}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* المشاريع */}
      <section className="section" id="projects">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-tag">٠٤ — أعمالنا</span>
            <h2>مشاريع نفخر <span className="blue">بها</span></h2>
          </div>
          <div className="projects-grid">
            {data.projects.map((pr) => (
              <article className="project reveal" key={pr.id}>
                <div className={`project-thumb${pr.gradient ? " " + pr.gradient : ""}`}>
                  <div className="pt-window"><i /><i /><i /></div>
                  <span>{pr.emoji}</span>
                </div>
                <div className="project-meta">
                  <h3>{pr.title}</h3>
                  <p>{pr.description}</p>
                  <div className="tags">{pr.tag_list.map((t) => <span key={t}>{t}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* الآراء */}
      <section className="section" id="testimonials">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-tag">٠٥ — الآراء</span>
            <h2>ماذا قال <span className="blue">عملاؤنا؟</span></h2>
          </div>
          <div className="testi-grid">
            {data.testimonials.map((t) => (
              <article className="testimonial reveal" key={t.id}>
                <div className="stars">{"★".repeat(t.rating)}</div>
                <p className="quote">{t.quote}</p>
                <div className="author">
                  <div className="avatar">{t.initial}</div>
                  <div><b>{t.name}</b><span>{t.role}</span></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* التواصل */}
      <section className="section contact" id="contact">
        <div className="container">
          <div className="contact-box reveal">
            <span className="section-tag">٠٦ — لنتحدّث</span>
            <h2>لديك فكرة؟ <span className="blue">لنحوّلها إلى واقع.</span></h2>
            <p className="section-desc">أخبرنا عن مشروعك وسنعود إليك في أسرع وقت.</p>
            <div className="contact-info">
              <a href={wa} className="info-item" target="_blank" rel="noopener"><span className="info-icon">💬</span><span>واتساب<br /><b>{s.phone}</b></span></a>
              <a href={`mailto:${s.email}`} className="info-item"><span className="info-icon">✉️</span><span>البريد<br /><b>{s.email}</b></span></a>
              <a href={`tel:${s.phone}`} className="info-item"><span className="info-icon">📞</span><span>الهاتف<br /><b>{s.phone}</b></span></a>
            </div>
            <div className="contact-actions">
              <a href={wa} className="btn btn-primary" target="_blank" rel="noopener">راسلنا على واتساب <span>↗</span></a>
              <a href={`mailto:${s.email}`} className="btn btn-ghost">أرسل بريداً</a>
            </div>
            <div className="socials">
              <a href={s.github} target="_blank" rel="noopener">GitHub</a>
              <a href={s.linkedin} target="_blank" rel="noopener">LinkedIn</a>
              <a href={s.x_url} target="_blank" rel="noopener">X</a>
              <a href={s.instagram} target="_blank" rel="noopener">Instagram</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <span className="logo-text">{s.brand_name.split(" ")[0]} <b>{s.brand_name.split(" ").slice(1).join(" ")}</b></span>
          <p>© {new Date().getFullYear()} {s.brand_name} — جميع الحقوق محفوظة.</p>
          <a href="#home" className="to-top">للأعلى ↑</a>
        </div>
      </footer>
    </>
  );
}
