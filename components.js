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

  // ==========================================================================
  // Contactformulier
  //
  // Het formulier verstuurt als een gewone HTML-POST naar FormSubmit (zie het
  // action-attribuut in contact.html). Geen achtergrondverzoek, dus geen CORS
  // en geen stille fouten: lukt iets niet, dan toont FormSubmit zelf de reden.
  // Na verzenden komt de bezoeker op bedankt.html.
  //
  // Dit script doet de controle VOORAF. Alles goed -> het formulier wordt
  // gewoon verstuurd. Iets mis -> we houden het tegen en leggen uit wat.
  //
  // Spambescherming, vier lagen:
  //  1. Het e-mailadres staat nergens in de website (unieke FormSubmit-code).
  //  2. Honeypot — een onzichtbaar veld dat alleen bots invullen.
  //  3. Tijdslot — bots versturen binnen enkele seconden, mensen niet.
  //  4. Linkfilter — berichten volgestopt met links zijn vrijwel altijd spam.
  // ==========================================================================

  // Telefoonnummer licht controleren op vorm. Bewust soepel: buitenlandse
  // nummers en notaties met spaties, streepjes of haakjes komen gewoon door.
  function telefoonOngeldig(waarde) {
    const schoon = String(waarde || '').replace(/[\s\-().]/g, '');
    if (!/^\+?[0-9]+$/.test(schoon)) return 'Vul een telefoonnummer in met alleen cijfers.';
    const cijfers = schoon.replace(/\D/g, '');
    if (cijfers.length < 9) return 'Dit nummer lijkt te kort. Controleer het even.';
    if (cijfers.length > 15) return 'Dit nummer lijkt te lang. Controleer het even.';
    return null;
  }

  function lijktOpSpam(form, geopendOp) {
    const honey = form.querySelector('[name="_honey"]');
    if (honey && honey.value) return true;

    if (Date.now() - geopendOp < 3000) return true;

    const veld = form.querySelector('[name="message"]');
    const bericht = veld ? String(veld.value || '') : '';

    const links = (bericht.match(/https?:\/\/|www\./gi) || []).length;
    if (links >= 3) return true;

    if (/\[url[=\]]/i.test(bericht)) return true;

    return false;
  }

  function waardeVan(form, naam) {
    const veld = form.querySelector('[name="' + naam + '"]');
    return veld ? String(veld.value || '').trim() : '';
  }

  // De formulierdiensten, op volgorde van proberen. Reageert de eerste niet,
  // dan gaat de site automatisch door naar de tweede. Elke dienst wil de
  // gegevens net iets anders aangeleverd krijgen; dat staat hier per dienst.
  function bouwDiensten(form, v) {
    const lijst = [];
    const onderwerpMail = 'Nieuw bericht via de ABFY-website';

    // 1. Web3Forms
    const key = form.getAttribute('data-web3forms-key');
    if (key && key !== 'JOUW_ACCESS_KEY') {
      lijst.push({
        naam: 'Web3Forms',
        url: 'https://api.web3forms.com/submit',
        velden: {
          access_key: key,
          subject: onderwerpMail,
          name: v.name,
          email: v.email,
          telefoonnummer: v.phone,
          onderwerp: v.onderwerp,
          message: v.message,
        },
        // Web3Forms kan 200 teruggeven met success:false; dat is ook een fout.
        isGelukt: async (res) => {
          if (!res.ok) return false;
          try {
            const json = await res.json();
            return json && json.success === true;
          } catch (e) {
            return false;
          }
        },
      });
    }

    // 2. FormSubmit (reserve)
    const code = form.getAttribute('data-formsubmit-code');
    if (code) {
      lijst.push({
        naam: 'FormSubmit',
        url: 'https://formsubmit.co/ajax/' + code,
        velden: {
          name: v.name,
          email: v.email,
          telefoonnummer: v.phone,
          onderwerp: v.onderwerp,
          message: v.message,
          _subject: onderwerpMail,
          _template: 'table',
          _captcha: 'false',
        },
        isGelukt: async (res) => res.ok,
      });
    }

    return lijst;
  }

  // Eén poging bij één dienst, met tijdslimiet. Gooit een fout als het misgaat,
  // zodat de aanroeper weet dat hij de volgende dienst moet proberen.
  async function verstuurNaar(dienst) {
    const data = new FormData();
    Object.keys(dienst.velden).forEach((k) => data.append(k, dienst.velden[k]));

    const afbreken = new AbortController();
    const klok = setTimeout(() => afbreken.abort(), 12000);

    try {
      const res = await fetch(dienst.url, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
        signal: afbreken.signal,
      });
      const ok = await dienst.isGelukt(res);
      if (!ok) throw new Error('Status ' + res.status);
      return true;
    } finally {
      clearTimeout(klok);
    }
  }

  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Maar één keer instellen. Zou het script onverhoopt twee keer geladen
    // worden, dan zou het formulier anders twee verzend-handlers krijgen en
    // elkaars meldingen overschrijven.
    if (form.dataset.initialized === '1') return;
    form.dataset.initialized = '1';

    const status = document.getElementById('form-status');
    const telefoon = form.querySelector('#phone');
    const button = form.querySelector('button[type="submit"]');
    const geopendOp = Date.now();

    function toonVeldfout(veld, bericht) {
      wisVeldfout(veld);
      if (!bericht) return;
      veld.classList.add('is-invalid');
      veld.setAttribute('aria-invalid', 'true');
      const p = document.createElement('p');
      p.className = 'field-error';
      p.id = veld.id + '-error';
      p.textContent = bericht;
      veld.setAttribute('aria-describedby', p.id);
      veld.parentNode.appendChild(p);
    }

    function wisVeldfout(veld) {
      veld.classList.remove('is-invalid');
      veld.removeAttribute('aria-invalid');
      veld.removeAttribute('aria-describedby');
      const bestaand = veld.parentNode.querySelector('.field-error');
      if (bestaand) bestaand.remove();
    }

    if (telefoon) {
      telefoon.addEventListener('input', () => wisVeldfout(telefoon));
    }

    function toonStatus(tekst, soort) {
      if (!status) return;
      status.innerHTML = '';
      status.textContent = tekst;
      status.className = 'form-status' + (soort ? ' ' + soort : '');
    }

    // Storing bij de formulierdienst: eerlijk zijn over wat er aan de hand is,
    // en de bezoeker een andere weg naar ons wijzen.
    function toonStoring() {
      if (!status) return;
      status.className = 'form-status error';
      status.innerHTML =
        '<strong>Het versturen lukt nu even niet.</strong> ' +
        'Onze formulierdienst is tijdelijk onbereikbaar — dit ligt niet aan jou. ' +
        'Je bericht staat nog in het formulier, dus je kunt het over een paar ' +
        'minuten gewoon opnieuw proberen.<br />' +
        'Liever niet wachten? Stuur ons een bericht via ' +
        '<a href="https://instagram.com/abfy_bk" target="_blank" rel="noopener">Instagram</a> of ' +
        '<a href="https://www.facebook.com/people/ABFY-Accounting-Business-For-You/100088247887144/" target="_blank" rel="noopener">Facebook</a>.';
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Spam: stil tegenhouden. De bot ziet een "gelukt"-melding en heeft niet
      // door dat het bericht nergens heen gaat.
      if (lijktOpSpam(form, geopendOp)) {
        toonStatus('Bedankt! Je bericht is verzonden.', 'success');
        form.reset();
        return;
      }

      // Telefoonnummer controleren.
      if (telefoon) {
        const fout = telefoonOngeldig(telefoon.value);
        if (fout) {
          toonVeldfout(telefoon, fout);
          telefoon.focus();
          toonStatus('', '');
          return;
        }
        wisVeldfout(telefoon);
      }

      // Velden verzamelen. Per dienst bouwen we hier een eigen verzending van,
      // zodat er geen vreemde technische velden in de mail belanden.
      const velden = {
        name: waardeVan(form, 'name'),
        email: waardeVan(form, 'email'),
        phone: waardeVan(form, 'phone'),
        onderwerp: waardeVan(form, 'subject'),
        message: waardeVan(form, 'message'),
      };

      const diensten = bouwDiensten(form, velden);
      if (!diensten.length) {
        // Niets ingesteld: val terug op een gewone verzending.
        form.submit();
        return;
      }

      toonStatus('Bezig met versturen...', '');
      if (button) button.disabled = true;

      let gelukt = false;
      for (const dienst of diensten) {
        try {
          await verstuurNaar(dienst);
          gelukt = true;
          break;
        } catch (err) {
          if (window.console) {
            console.warn('Verzenden via ' + dienst.naam + ' mislukt:', err.message);
          }
          // Volgende dienst proberen.
        }
      }

      if (gelukt) {
        const bedankt = form.getAttribute('data-bedankt') || 'bedankt.html';
        window.location.href = bedankt;
        return;
      }

      if (button) button.disabled = false;
      // BELANGRIJK: het formulier wordt NIET geleegd. De bezoeker houdt zijn
      // tekst, zodat hij het zo opnieuw kan proberen.
      toonStoring();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    initLedgerAnimation();
    initContactForm();
  });
})();
