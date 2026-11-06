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

Berichten komen binnen op **BK-abfy@hotmail.com**.

### Twee diensten achter elkaar

Het formulier gebruikt twee formulierdiensten:

1. **Web3Forms** — de hoofdroute (250 berichten per maand gratis)
2. **FormSubmit** — de reserve, springt automatisch bij

Reageert Web3Forms niet binnen 12 seconden, dan probeert de site meteen
FormSubmit. De bezoeker merkt daar niets van en komt gewoon op `bedankt.html`.
Pas als **beide** diensten plat liggen krijgt hij een storingsmelding — en
dan blijft zijn getypte tekst staan, zodat hij het zo opnieuw kan proberen.

### Beide diensten staan aan

De access key van Web3Forms is ingevuld, dus beide routes zijn actief. Er
hoeft niets meer te gebeuren.

Moet de sleutel ooit vervangen worden (ander mailadres, sleutel kwijt): haal
een nieuwe op via [web3forms.com](https://web3forms.com) en vervang de waarde
van `data-web3forms-key` in `contact.html`.

### Van dienst wisselen

Alles staat als attribuut op het `<form>` in `contact.html`:

| Attribuut | Betekenis |
|---|---|
| `data-web3forms-key` | access key van Web3Forms (hoofdroute) |
| `data-formsubmit-code` | unieke code van FormSubmit (reserve) |
| `data-bedankt` | pagina na succesvol verzenden |
| `action` | noodroute voor bezoekers zonder JavaScript |

Leeg je een attribuut of laat je de placeholder staan, dan slaat de site die
dienst over. Een derde dienst toevoegen kan in `components.js`, in de functie
`bouwDiensten`.

### Als het versturen niet lukt

Zie je toch de melding "Het versturen lukt nu even niet", dan lagen beide
diensten tegelijk plat — zeldzaam. Krijg je bij rechtstreeks bezoek aan zo'n
dienst een Cloudflare-foutpagina (error 502, 520, 522), dan ligt het aan hen
en niet aan de website.

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
