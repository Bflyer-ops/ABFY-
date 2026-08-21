// ABFY — gedeelde componenten (header/footer), navigatie en kleine interacties.
// Vanilla JS, geen build-stap nodig.

(function () {
  const NAV_ITEMS = [
    { href: 'index.html', label: 'Home' },
    { href: 'wie-zijn-wij.html', label: 'Wie zijn wij' },
    { href: 'prijzen.html', label: 'Prijzen' },
    { href: 'blog.html', label: 'Blog' },
    { href: 'socials.html', label: 'Socials' },
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

    const contactClass = active === 'contact.html' ? 'nav-cta active' : 'nav-cta';

    mount.innerHTML = `
      <div class="container">
        <a href="index.html" class="brand" aria-label="ABFY — naar de homepage">
          <img src="logo-groen.png" alt="ABFY — Accounting Business For You" class="brand-logo" width="420" height="171" />
        </a>
        <nav class="main-nav" id="main-nav">
          ${links}
          <a href="contact.html" class="${contactClass}">Contact</a>
        </nav>
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
            <img src="logo-wit.png" alt="ABFY — Accounting Business For You" class="footer-logo" width="420" height="171" />
            <p>Accounting Business For You. Administratiekantoor in Heerlen. Persoonlijke boekhouding, aangiften en financieel advies voor zzp'ers en kleine ondernemers in Zuid-Limburg.</p>
          </div>
          <div>
            <h4>Snel naar</h4>
            <ul>
              <li><a href="wie-zijn-wij.html">Wie zijn wij</a></li>
              <li><a href="prijzen.html">Pakketten &amp; prijzen</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="contact.html">Contactformulier</a></li>
              <li><a href="https://instagram.com/abfy_bk" target="_blank" rel="noopener">Instagram</a></li>
              <li><a href="https://www.facebook.com/people/ABFY-Accounting-Business-For-You/100088247887144/" target="_blank" rel="noopener">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${new Date().getFullYear()} ABFY — Bjorn &amp; Kitana</span>
          <span>Heerlen · Zuid-Limburg</span>
        </div>
      </div>
    `;
  }

  // Checklist ticks in one row at a time when scrolled into view.
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
              setTimeout(() => row.classList.add('is-visible'), i * 200);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(rows[0].closest('.ledger-card'));
  }

  // Contact form: verstuurt via FormSubmit naar de mailbox van ABFY.
  //
  // Spambescherming, vier lagen:
  //  1. Het e-mailadres staat helemaal niet in de website (unieke code).
  //  2. Honeypot — een onzichtbaar veld dat alleen bots invullen.
  //  3. Tijdslot — bots versturen binnen een seconde, mensen doen er langer over.
  //  4. Linkfilter — berichten volgestopt met links zijn vrijwel altijd spam.
  //
  // Het formulier gebruikt de unieke FormSubmit-code (data-code). Het
  // e-mailadres van ABFY komt daardoor nergens in de website voor.
  function resolveEndpoint(form) {
    const code = form.getAttribute('data-code');
    if (!code) return null;
    return 'https://formsubmit.co/ajax/' + code;
  }

  function lijktOpSpam(data, geopendOp) {
    // Honeypot ingevuld = bot.
    if (data.get('_honey')) return true;

    // Sneller dan 3 seconden ingevuld = bot. Een mens typt niet zo snel.
    if (Date.now() - geopendOp < 3000) return true;

    const bericht = String(data.get('message') || '');

    // Drie of meer links in een bericht: vrijwel altijd spam.
    const links = (bericht.match(/https?:\/\/|www\./gi) || []).length;
    if (links >= 3) return true;

    // Losse BBCode-links zijn een klassiek spampatroon.
    if (/\[url[=\]]/i.test(bericht)) return true;

    return false;
  }

  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const status = document.getElementById('form-status');
    const button = form.querySelector('button[type="submit"]');
    const geopendOp = Date.now();

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);

      // Spam wordt stil geweigerd: de bot krijgt een "gelukt"-melding te zien,
      // zodat hij niet doorheeft dat hij tegengehouden is.
      if (lijktOpSpam(data, geopendOp)) {
        status.textContent = 'Bedankt! Je bericht is verzonden.';
        status.className = 'form-status success';
        form.reset();
        return;
      }

      const endpoint = resolveEndpoint(form);
      if (!endpoint) {
        status.textContent =
          'Het formulier is niet goed ingesteld. Stuur ons gerust een bericht via Instagram of Facebook.';
        status.className = 'form-status error';
        return;
      }

      data.append('_subject', 'Nieuw bericht via de ABFY-website');
      data.append('_captcha', 'false');
      data.append('_template', 'table');

      status.textContent = 'Bezig met versturen...';
      status.className = 'form-status';
      if (button) button.disabled = true;

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });

        if (res.ok) {
          status.textContent =
            'Bedankt! Je bericht is verzonden — we nemen zo snel mogelijk contact met je op.';
          status.className = 'form-status success';
          form.reset();
        } else {
          throw new Error('Verzenden mislukt');
        }
      } catch (err) {
        status.textContent =
          'Er ging iets mis bij het versturen. Probeer het later nog eens, of stuur ons een bericht via Instagram of Facebook.';
        status.className = 'form-status error';
      } finally {
        if (button) button.disabled = false;
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
