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
