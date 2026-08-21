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

1. Noem de bestanden `bjorn.jpg` en `kitana.jpg` en upload ze naar dezelfde map als de
   HTML-bestanden.
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

## Contactformulier

Het formulier verstuurt berichten via FormSubmit naar de mailbox van ABFY.
Het is geactiveerd en werkt — er hoeft niets meer te gebeuren.

Het e-mailadres staat **niet** in de website. In plaats daarvan gebruikt het
formulier een unieke FormSubmit-code (`data-code` in `contact.html`). Die code
is aan het adres gekoppeld, maar er niet uit af te leiden.

Verandert het ontvangstadres ooit? Vraag dan op formsubmit.co een nieuwe code
aan voor het nieuwe adres en vervang de waarde van `data-code`.

## Bescherming tegen spam

Er zitten vier lagen in:

**1. Het e-mailadres staat niet leesbaar in de broncode.**
Op het formulier staat een gecodeerde waarde die pas in de browser wordt
omgezet. Bots die pagina's afstruinen op zoek naar e-mailadressen vinden niets.

**2. Honeypot.** Een verborgen veld dat bezoekers niet zien maar bots vaak
automatisch invullen. Wordt het ingevuld, dan gaat het bericht niet door.

**3. Tijdslot.** Een bericht dat binnen 3 seconden na het openen van de pagina
wordt verstuurd is van een bot — een mens typt niet zo snel.

**4. Linkfilter.** Berichten met drie of meer links, of met BBCode-links,
worden geweigerd. Een klant die zijn eigen website noemt komt gewoon door.

Geblokkeerde berichten krijgen een "verzonden"-melding te zien, zodat bots niet
doorhebben dat ze tegengehouden zijn en het niet blijven proberen.

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
