// ABFY — gedeelde componenten (header/footer), navigatie en kleine interacties.
// Vanilla JS, geen build-stap nodig — werkt direct op Vercel of lokaal.

(function () {
  const NAV_ITEMS = [
    { href: 'index.html', label: 'Home' },
    { href: 'socials.html', label: 'Socials' },
    { href: 'blog.html', label: 'Blog' },
    { href: 'prijzen.html', label: 'Prijzen' },
    { href: 'contact.html', label: 'Contact' },
  ];

  function currentPage() {
    const path = window.location.pathname.split('/').pop();
    return path === '' ? 'index.html' : path;
  }

  function renderHeader() {
    const mount = document.getElementById('site-header');
    if (!mount) return;
    const active = currentPage();

    const links = NAV_ITEMS.map(
      (item) =>
        `<a href="${item.href}" class="${item.href === active ? 'active' : ''}">${item.label}</a>`
    ).join('');

    mount.innerHTML = `
      <div class="container">
        <a href="index.html" class="brand">ABFY<span class="dot">.</span></a>
        <nav class="main-nav" id="main-nav">${links}</nav>
        <button class="nav-toggle" id="nav-toggle" aria-label="Menu openen" aria-expanded="false">
          <span></span>
        </button>
      </div>
    `;

    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('main-nav');
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  function renderFooter() {
    const mount = document.getElementById('site-footer');
    if (!mount) return;
    mount.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <h4>ABFY</h4>
            <p>Accounting Business For You. Boekhouding, aangiften en financieel advies voor zzp'ers en kleine ondernemers in Zuid-Limburg.</p>
          </div>
          <div>
            <h4>Snel naar</h4>
            <ul>
              <li><a href="prijzen.html">Pakketten &amp; prijzen</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:info@abfy.nl">info@abfy.nl</a></li>
              <li><a href="https://instagram.com/abfy_bk" target="_blank" rel="noopener">Instagram</a></li>
              <li><a href="https://www.facebook.com/people/ABFY-Accounting-Business-For-You/100088247887144/" target="_blank" rel="noopener">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${new Date().getFullYear()} ABFY — Bjorn &amp; Kitana</span>
          <span>Zuid-Limburg</span>
        </div>
      </div>
    `;
  }

  // Signature element: ledger rows tick in one by one when scrolled into view.
  function initLedgerAnimation() {
    const rows = document.querySelectorAll('.ledger-row');
    if (!rows.length) return;

    if (!('IntersectionObserver' in window)) {
      rows.forEach((r) => r.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            rows.forEach((row, i) => {
              setTimeout(() => row.classList.add('is-visible'), i * 220);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(rows[0].closest('.ledger-card'));
  }

  // Contact form: posts to Formspree if configured, otherwise falls back to mailto.
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const status = document.getElementById('form-status');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const endpoint = form.getAttribute('data-endpoint');
      const data = new FormData(form);

      const isConfigured = endpoint && !endpoint.includes('JOUW_FORM_ID');

      if (!isConfigured) {
        const name = data.get('name') || '';
        const email = data.get('email') || '';
        const message = data.get('message') || '';
        const subject = encodeURIComponent('Contact via website — ' + name);
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
        window.location.href = `mailto:info@abfy.nl?subject=${subject}&body=${body}`;
        status.textContent = 'Je e-mailprogramma wordt geopend om het bericht te versturen.';
        status.className = 'form-status success';
        return;
      }

      status.textContent = 'Bezig met versturen...';
      status.className = 'form-status';

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });
        if (res.ok) {
          status.textContent = 'Bedankt! Je bericht is verzonden, we nemen snel contact op.';
          status.className = 'form-status success';
          form.reset();
        } else {
          throw new Error('Verzenden mislukt');
        }
      } catch (err) {
        status.textContent = 'Er ging iets mis. Mail ons gerust rechtstreeks via info@abfy.nl.';
        status.className = 'form-status error';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    initLedgerAnimation();
    initContactForm();
  });
})();
