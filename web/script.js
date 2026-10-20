document.documentElement.classList.add('js');

// Dropdowns (language + burger menu)
const dropdowns = [...document.querySelectorAll('[data-dropdown]')];
const closeAll = (except) => dropdowns.forEach((d) => {
  if (d === except) return;
  d.classList.remove('is-open');
  d.querySelector('button').setAttribute('aria-expanded', 'false');
});
dropdowns.forEach((d) => {
  const btn = d.querySelector('button');
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = !d.classList.contains('is-open');
    closeAll(d);
    d.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
  });
  d.querySelectorAll('.dropdown a').forEach((a) => a.addEventListener('click', () => closeAll()));
});
document.addEventListener('click', (e) => { if (!e.target.closest('[data-dropdown]')) closeAll(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });

// Language: UI only for now — translations are not wired yet
const langLabel = document.querySelector('.lang__label');
const langFlag = document.querySelector('.lang__flag');
document.querySelectorAll('[data-lang]').forEach((opt) => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('[data-lang]').forEach((o) => o.setAttribute('aria-selected', String(o === opt)));
    langLabel.textContent = opt.firstChild.textContent.trim();
    langFlag.textContent = opt.querySelector('span').textContent;
    closeAll();
  });
});

// Reviews carousel: center card + faded neighbours, autoplay with pause on hover/focus/hidden tab
const slider = document.querySelector('[data-slider]');
if (slider) {
  const slides = [...slider.querySelectorAll('.review')];
  const dotsBox = slider.querySelector('.reviews__dots');
  const n = slides.length;
  const DELAY = 5000;
  let i = 0;
  let timer = null;
  const dots = slides.map((_, k) => {
    const d = document.createElement('button');
    d.type = 'button';
    d.setAttribute('role', 'tab');
    d.setAttribute('aria-label', `${k + 1} / ${n}`);
    d.addEventListener('click', () => { show(k); restart(); });
    dotsBox.append(d);
    return d;
  });
  const show = (to) => {
    i = (to + n) % n;
    slides.forEach((s, k) => {
      const off = (k - i + n) % n;
      s.classList.toggle('is-active', off === 0);
      s.classList.toggle('is-next', n > 1 && off === 1);
      s.classList.toggle('is-prev', n > 2 && off === n - 1);
      s.setAttribute('aria-hidden', String(off !== 0));
    });
    dots.forEach((d, k) => d.setAttribute('aria-selected', String(k === i)));
  };
  const stop = () => { clearInterval(timer); timer = null; };
  const start = () => {
    if (n < 2 || timer || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = setInterval(() => show(i + 1), DELAY);
  };
  const restart = () => { stop(); start(); };

  slider.querySelector('.reviews__prev').addEventListener('click', () => { show(i - 1); restart(); });
  slider.querySelector('.reviews__next').addEventListener('click', () => { show(i + 1); restart(); });
  slides.forEach((s) => s.addEventListener('click', () => {
    if (s.classList.contains('is-next')) { show(i + 1); restart(); }
    if (s.classList.contains('is-prev')) { show(i - 1); restart(); }
  }));

  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  slider.addEventListener('focusin', stop);
  slider.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  let x0 = null;
  slider.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; stop(); }, { passive: true });
  slider.addEventListener('touchend', (e) => {
    if (x0 !== null) {
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) show(i + (dx < 0 ? 1 : -1));
    }
    x0 = null;
    start();
  });

  show(0);
  start();
}

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
document.querySelectorAll('.services, .team, .stories, .faq').forEach((group) => {
  group.querySelectorAll('.reveal').forEach((el, k) => { el.style.transitionDelay = `${(k % 3) * 80}ms`; });
});
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-in'));
}

// Booking form — client-side validation; hook a real endpoint in `send()`
const form = document.getElementById('booking-form');
const send = async (data) => {
  // TODO: отправка заявки (Telegram-бот / CRM / email). Сейчас — только имитация.
  console.info('Booking request', data);
  await new Promise((r) => setTimeout(r, 600));
};
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll('[required]').forEach((inp) => {
    const valid = inp.name === 'phone' ? inp.value.replace(/\D/g, '').length >= 8 : inp.value.trim().length > 1;
    inp.closest('.field').classList.toggle('is-invalid', !valid);
    if (!valid && ok) { inp.focus(); ok = false; }
  });
  if (!ok) return;
  const btn = form.querySelector('.form__submit');
  btn.disabled = true;
  await send(Object.fromEntries(new FormData(form)));
  form.querySelector('.form__done').hidden = false;
});
form.addEventListener('input', (e) => e.target.closest('.field')?.classList.remove('is-invalid'));

document.querySelector('[data-year]').textContent = new Date().getFullYear();
