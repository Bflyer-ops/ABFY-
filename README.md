# ABFY website

Statische website (HTML/CSS/JS, geen build-stap nodig) voor ABFY —
Administratiekantoor Zuid-Limburg.

## Structuur

```
index.html         Home
wie-zijn-wij.html  Over Bjorn & Kitana
prijzen.html       Pakketten & prijzen
blog.html          Blog
socials.html       Instagram/Facebook
contact.html       Contactformulier
style.css          Alle styling
components.js      Header/footer, navigatie, animatie, contactformulier
```

Alle bestanden staan bewust in dezelfde map (geen submappen), zodat uploaden
via de GitHub-webinterface zonder problemen werkt.

## Jullie foto's toevoegen

Op `wie-zijn-wij.html` staan nu tijdelijke plaatshouders met de initialen B en K.
Zodra jullie foto's hebben:

1. Noem de bestanden `bjorn.jpg` en `kitana.jpg` en upload ze naar dezelfde map
   als de HTML-bestanden.
2. Open `wie-zijn-wij.html` en zoek het blok:
   ```html
   <div class="portrait__placeholder">
     <span class="portrait__initials">B</span>
     Foto volgt
   </div>
   ```
3. Vervang dat hele blok door:
   ```html
   <img src="bjorn.jpg" alt="Bjorn, mede-oprichter van ABFY" />
   ```
4. Doe hetzelfde voor Kitana met `kitana.jpg`.

Tip voor de foto's: staand formaat (verhouding 4:5), rustige effen achtergrond,
daglicht van opzij. Fotografeer beiden op dezelfde plek en met dezelfde
belichting — dan staan de twee portretten naast elkaar rustig op de pagina.

## Contactformulier activeren

Het formulier op `contact.html` opent nu een e-mail naar `info@abfy.nl`.
Voor echte formulierinzendingen:

1. Maak een gratis account op [formspree.io](https://formspree.io).
2. Maak een formulier aan en kopieer de endpoint-URL.
3. Vervang in `contact.html` het attribuut
   `data-endpoint="https://formspree.io/f/JOUW_FORM_ID"` door je eigen URL.

## Bijwerken op GitHub

Upload de bestanden via **Add file → Upload files** in je repository en klik op
**Commit changes**. Vercel deployt daarna automatisch binnen een minuut.

Let op: het oude bestand `wie-zijn-wij.html` bestond nog niet, en de bestanden
`css/style.css` en `js/components.js` (met submap) zijn niet meer nodig — als
die nog in je repo staan, kun je ze verwijderen.
