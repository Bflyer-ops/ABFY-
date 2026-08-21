# ABFY website

Statische website (HTML/CSS/JS, geen build-stap nodig) voor ABFY —
Administratiekantoor Zuid-Limburg.

## Structuur

```
index.html         Home
wie-zijn-wij.html  Over Bjorn & Kitana
prijzen.html       Pakketten & prijzen
blog.html          Blogoverzicht
blog-*.html        De drie blogartikelen
socials.html       Instagram/Facebook
contact.html       Contactformulier
style.css          Alle styling
components.js      Header/footer, navigatie, animatie, contactformulier
```

Alle bestanden staan bewust in dezelfde map (geen submappen), zodat uploaden
via de GitHub-webinterface zonder problemen werkt.

## Logobestanden

Uit het aangeleverde logo zijn deze versies gemaakt (achtergrond verwijderd,
dus bruikbaar op elke kleur):

| Bestand | Waarvoor |
|---|---|
| `logo-groen.png` | Header (op lichte achtergrond) |
| `logo-wit.png` | Footer (op donkergroene achtergrond) |
| `beeldmerk-groen.png` / `beeldmerk-wit.png` | Alleen het staafdiagram, zonder tekst |
| `favicon.ico`, `favicon-16.png`, `favicon-32.png` | Icoon in het browsertabblad |
| `apple-touch-icon.png` | Icoon als iemand de site op zijn telefoon bewaart |
| `icon-512.png` | Groot icoon, o.a. voor Google |
| `og-image.jpg` | Voorbeeldafbeelding bij delen via WhatsApp/Facebook/LinkedIn |

## SEO

Zie **SEO-HANDLEIDING.md** voor wat er in de site zit en wat je zelf nog moet
doen om beter gevonden te worden.

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

## Contactformulier — EENMALIG ACTIVEREN

Het formulier stuurt berichten via FormSubmit naar **BK-abfy@hotmail.com**.
Dit moet je één keer activeren, anders komt er niets binnen:

1. Zet de website live op Vercel.
2. Vul het contactformulier op de live site één keer zelf in en verstuur het.
3. Je krijgt een e-mail van FormSubmit op BK-abfy@hotmail.com met een
   bevestigingslink. Klik die aan.
4. Klaar — vanaf dat moment komen alle berichten binnen in je mailbox.

Die eerste keer krijg je dus nog geen bericht, alleen de bevestigingsmail.
Test daarna nog een keer om zeker te weten dat het werkt.

## Bescherming tegen spam

Er zitten al twee maatregelen in:

**1. Het e-mailadres staat niet leesbaar in de broncode.**
Op het formulier staat een gecodeerde waarde (`data-target`), die pas in de
browser wordt omgezet naar het echte adres. Bots die de pagina uitlezen op zoek
naar e-mailadressen vinden zo niets bruikbaars.

**2. Een onzichtbare spamval (honeypot).**
In het formulier zit een verborgen veld dat bezoekers niet zien, maar bots vaak
automatisch invullen. Wordt het ingevuld, dan wordt het bericht niet verstuurd.
Dat veld staat in `contact.html` — niet weghalen.

### Nog een stap verder: de unieke code

Wil je dat het adres helemaal niet meer in de website voorkomt? Na activatie
kun je op formsubmit.co een unieke code voor je adres opvragen. Voeg die dan
toe aan het formulier in `contact.html`:

```html
<form id="contact-form" class="contact-form"
      data-target="QkstYWJmeUBob3RtYWlsLmNvbQ=="
      data-code="JOUW_CODE_HIER">
```

De code krijgt automatisch voorrang. Daarna mag je `data-target` weghalen —
het adres staat dan nergens meer in de site, ook niet gecodeerd.

## Blogartikelen

De drie artikelen staan in `blog-bonnetjes.html`, `blog-btw-deadlines.html` en
`blog-zelf-of-uitbesteden.html`. Wil je een artikel toevoegen? Kopieer een
bestaand artikelbestand, pas de tekst aan, en voeg op `blog.html` een nieuw
kaartje toe dat ernaar verwijst.

## Bijwerken op GitHub

Upload de bestanden via **Add file → Upload files** in je repository en klik op
**Commit changes**. Vercel deployt daarna automatisch binnen een minuut.

Let op: het oude bestand `wie-zijn-wij.html` bestond nog niet, en de bestanden
`css/style.css` en `js/components.js` (met submap) zijn niet meer nodig — als
die nog in je repo staan, kun je ze verwijderen.
