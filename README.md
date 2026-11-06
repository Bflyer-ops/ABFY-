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
bedankt.html       Bevestiging na verzenden
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

## Foto's

De portretten van Bjorn en Kitana staan op de pagina Wie zijn wij, en samen
op de homepage. Ze zijn bijgesneden naar staand 4:5 en geoptimaliseerd voor
snel laden.

| Bestand | Waar |
|---|---|
| `bjorn.jpg` | Wie zijn wij |
| `kitana.jpg` | Wie zijn wij |
| `bjorn-kitana.jpg` | Homepage, naast de introtekst |
| `og-image.jpg` | Voorbeeld bij delen via WhatsApp/Facebook/LinkedIn |

Wil je later een foto vervangen? Zorg voor staand formaat (4:5) en een breedte
van ongeveer 900 pixels, en gebruik dezelfde bestandsnaam — dan hoeft er in de
code niets te veranderen.

## Contactformulier

Het formulier verstuurt berichten via FormSubmit naar de mailbox van ABFY.

**Hoe het werkt:** het bericht gaat op de achtergrond naar FormSubmit. Lukt
dat, dan komt de bezoeker op `bedankt.html`. Lukt het niet, dan blijft hij op
de contactpagina, **blijft zijn getypte tekst staan**, en krijgt hij uitleg
plus een verwijzing naar Instagram en Facebook. Na 15 seconden zonder reactie
stopt de poging vanzelf, zodat niemand eindeloos zit te wachten.

### Als het versturen niet lukt

FormSubmit is een gratis dienst en heeft af en toe storing. Zie je als
bezoeker de melding "Het versturen lukt nu even niet", of krijg je bij
rechtstreeks bezoek aan formsubmit.co een Cloudflare-foutpagina (error 502,
520, 522), dan ligt het aan hen en niet aan de website. Meestal is het binnen
een paar uur weer opgelost.

### Van formulierdienst wisselen

Zit je vaker zonder, dan kun je overstappen zonder de rest van de site aan te
raken. In `contact.html` staan twee plekken met de huidige dienst:

```html
<form id="contact-form" class="contact-form"
      data-endpoint="https://formsubmit.co/ajax/<code>"   <- hoofdroute
      data-bedankt="bedankt.html"
      action="https://formsubmit.co/<code>"               <- noodroute
      method="POST">
```

Vervang beide adressen door die van de nieuwe dienst. Alternatieven die op
dezelfde manier werken (formulier erheen sturen, zij mailen het door) zijn
onder meer Formspree, Web3Forms en Getform; kijk even welke gratis grenzen ze
hanteren. De verborgen velden die met een underscore beginnen (`_subject`,
`_next`, `_template`, `_captcha`) zijn FormSubmit-specifiek — een andere
dienst gebruikt andere namen, die staan in hun documentatie.

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
