/* ============================================
   تكنو شام — التفاعلات
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- سنة الفوتر ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- شريط التنقّل + شريط التقدّم عند التمرير ---- */
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('progressBar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    if (progressBar) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- قائمة الجوال ---- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const closeMenu = () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
  };
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

  /* ---- تدرّج ظهور عناصر الشبكات (Stagger) ---- */
  ['.cards-grid', '.steps', '.projects-grid', '.testi-grid'].forEach((sel) => {
    document.querySelectorAll(sel).forEach((grid) => {
      Array.from(grid.children).forEach((child, i) => {
        if (child.classList.contains('reveal')) {
          child.style.transitionDelay = (i * 0.09) + 's';
        }
      });
    });
  });

  /* ---- أنيميشن الظهور عند التمرير ---- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* ---- عدّاد الأرقام ---- */
  const countIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const tick = () => {
          current += step;
          if (current >= target) {
            el.textContent = target + '+';
          } else {
            el.textContent = current;
            requestAnimationFrame(tick);
          }
        };
        tick();
        countIO.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll('[data-count]').forEach((el) => countIO.observe(el));

  /* ---- تأثير العمق مع حركة الماوس (Parallax) ---- */
  const orbs = document.querySelector('.bg-orbs');
  const heroVisual = document.querySelector('.hero-visual');
  if (window.matchMedia('(hover: hover)').matches && (orbs || heroVisual)) {
    let tx = 0, ty = 0, ox = 0, oy = 0;
    window.addEventListener('mousemove', (e) => {
      tx = (e.clientX / window.innerWidth - 0.5);
      ty = (e.clientY / window.innerHeight - 0.5);
    });
    const loop = () => {
      ox += (tx - ox) * 0.06;
      oy += (ty - oy) * 0.06;
      if (orbs) orbs.style.transform = `translate(${ox * -40}px, ${oy * -40}px)`;
      if (heroVisual) heroVisual.style.transform = `translate(${ox * 26}px, ${oy * 26}px)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---- أزرار مغناطيسية ---- */
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.btn').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${mx * 0.25}px, ${my * 0.35}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---- المؤشر التفاعلي (سطح المكتب فقط) ---- */
  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(hover: hover)').matches) {
    let x = 0, y = 0, cx = 0, cy = 0;
    window.addEventListener('mousemove', (e) => {
      x = e.clientX; y = e.clientY;
      cursor.style.opacity = '1';
    });
    const render = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(render);
    };
    render();

    const hoverables = document.querySelectorAll('a, button, .service, .project, .testimonial');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }
});
