/* ============================================
   Technosham — التفاعلات
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- سنة الفوتر ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- تغيير شريط التنقّل عند التمرير ---- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 30) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll);

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

  /* ---- أنيميشن الظهور عند التمرير ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));

  /* ---- عدّاد الأرقام ---- */
  const counters = document.querySelectorAll('[data-count]');
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
  counters.forEach((el) => countIO.observe(el));

  /* ---- تأثير الكتابة في الواجهة ---- */
  const typedEl = document.getElementById('typed');
  if (typedEl) {
    const words = ['يجذب عملاءك', 'يبيع منتجاتك', 'يبهر زوّارك', 'ينمّي أعمالك'];
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const word = words[wordIndex];
      if (deleting) {
        charIndex--;
      } else {
        charIndex++;
      }
      typedEl.textContent = word.substring(0, charIndex);

      let delay = deleting ? 55 : 110;
      if (!deleting && charIndex === word.length) {
        delay = 1600;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 400;
      }
      setTimeout(type, delay);
    };
    type();
  }
});
