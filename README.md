# ABFY website

Statische website (HTML/CSS/JS, geen build-stap nodig) voor ABFY —
Administratiekantoor Zuid-Limburg.

## Structuur

```
abfy-website/
├── index.html       Home
├── prijzen.html      Pakketten & prijzen
├── socials.html      Instagram/Facebook
├── blog.html         Blog (voorbeeldposts, later aan te vullen)
├── contact.html       Contactformulier
├── css/style.css     Alle styling
├── js/components.js  Header/footer, navigatie, animatie, contactformulier
└── assets/           (leeg — hier kun je eigen logo/afbeeldingen plaatsen)
```

## Lokaal bekijken

Open `index.html` gewoon in je browser, of start een kleine lokale server
(handig omdat sommige browsers relatieve paden anders behandelen):

```bash
npx serve .
```

## Naar GitHub

```bash
cd abfy-website
git init
git add .
git commit -m "Eerste versie ABFY website"
git branch -M main
git remote add origin https://github.com/<jouw-gebruikersnaam>/abfy-website.git
git push -u origin main
```

## Naar Vercel

1. Ga naar [vercel.com](https://vercel.com) en log in met je GitHub-account.
2. Klik op **Add New Project** en selecteer de `abfy-website` repository.
3. Vercel herkent dit als een statisch project — er hoeft niets aangepast te
   worden aan de build-instellingen (geen framework, geen build command).
4. Klik op **Deploy**.
5. Voeg daarna je eigen domein toe via **Project Settings → Domains** en volg
   de DNS-instructies (in te stellen in het domeinbeheer-paneel van Strato,
   niet de website builder).

## Contactformulier activeren

Het formulier op `contact.html` gebruikt nu een tijdelijke fallback: bij
versturen opent het gewoon een e-mail naar `info@abfy.nl`. Wil je échte
formulierinzendingen (zonder eigen backend)?

1. Maak een gratis account op [formspree.io](https://formspree.io).
2. Maak een nieuw formulier aan en kopieer de endpoint-URL.
3. Vervang in `contact.html` het attribuut:
   ```html
   data-endpoint="https://formspree.io/f/JOUW_FORM_ID"
   ```
   door je eigen Formspree-URL.

## Later uitbreiden

- **Eigen logo**: zet een SVG/PNG in `assets/` en vervang de tekstuele "ABFY"
  in `js/components.js` (functie `renderHeader`) door een `<img>`.
- **Echte blogposts**: de blogkaarten in `blog.html` zijn nu statisch. Voor
  een uitbreidbare blog (met een CMS) is een overstap naar bijvoorbeeld
  Next.js op een later moment een logische vervolgstap — dat werkt ook
  probleemloos op Vercel.
