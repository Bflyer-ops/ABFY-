# SEO — wat er in de site zit en wat jij nog moet doen

## Wat er al in zit

Deze dingen zijn ingebouwd en vragen geen actie meer:

- **Titels en omschrijvingen per pagina.** Elke pagina heeft een eigen titel en
  omschrijving die is geschreven op zoektermen waar jullie klanten op zoeken
  ("administratiekantoor Zuid-Limburg", "boekhouder zzp", "btw-aangifte").
- **Gestructureerde data (schema.org).** Vertelt Google letterlijk dat ABFY een
  `AccountingService` is, in welke regio jullie werken, wat de openingstijden
  zijn en wat de pakketten kosten. Dit is wat je in Google soms als een
  uitgebreid resultaat met sterren en prijzen ziet verschijnen.
- **Sitemap en robots.txt.** Een kaart van de site voor zoekmachines.
- **Open Graph-tags.** Deel je de site in WhatsApp of op Facebook, dan
  verschijnt er een nette kaart met logo in plaats van een kale link.
- **Favicon.** Het beeldmerk in het browsertabblad en als app-icoon.
- **Drie blogartikelen.** Content is voor SEO belangrijker dan techniek —
  hierover verderop meer.

---

## Wat jij moet doen — in volgorde van belang

### 1. Google Business Profile aanmaken (VERREWEG het belangrijkst)

Voor een lokaal kantoor levert dit meer op dan alles wat er in de code staat.
Zoekt iemand op "boekhouder [plaatsnaam]", dan verschijnen de kaartresultaten
bóven de gewone zoekresultaten. Zonder profiel sta je daar niet tussen.

1. Ga naar [business.google.com](https://business.google.com).
2. Maak een profiel aan voor ABFY, categorie **Accountant** of
   **Administratiekantoor**.
3. Vestigingsadres: **Sikkelhof, Heerlen**. Geef daarnaast je servicegebied op — de
   gemeenten waar je klanten hebt (Kerkrade, Landgraaf, Brunssum,
   Sittard-Geleen, Maastricht). Werk je vanuit huis en wil je je adres niet
   publiek maken? Kies dan voor een servicegebied in plaats van een
   vestigingsadres; Heerlen blijft dan wel je basis.
4. Upload het logo en, zodra je ze hebt, jullie foto's.
5. Vul openingstijden in en link naar www.abfy.nl.

**Vraag daarna elke tevreden klant om een review.** Dit is de belangrijkste
factor voor je positie in de kaartresultaten. Tien echte reviews zetten je
voorbij concurrenten die er drie hebben.

### 2. Google Search Console instellen

1. Ga naar [search.google.com/search-console](https://search.google.com/search-console).
2. Voeg `abfy.nl` toe als property en bevestig het eigendom (meestal via een
   DNS-record bij Strato).
3. Dien de sitemap in: `https://www.abfy.nl/sitemap.xml`.
4. Kijk hier na een paar weken welke zoektermen bezoekers opleveren — dat is
   gratis marktonderzoek.

### 3. Vul huisnummer en postcode aan (5 minuten werk)

Heerlen en de straatnaam Sikkelhof staan er al in. Wat nog ontbreekt is het
huisnummer en de postcode — die kon ik niet publiek terugvinden, en een
verzonnen postcode zou je Google-vermelding juist schaden.

**Aanpassen in `index.html`**, in het blok met gestructureerde data:

```json
"streetAddress": "Sikkelhof",     ->  "streetAddress": "Sikkelhof 12",
"postalCode": "",                 ->  "postalCode": "6418 XX",
```

**En in `contact.html`**, bij het adresveld:

```html
<dd>Sikkelhof<br />Heerlen</dd>
->
<dd>Sikkelhof 12<br />6418 XX Heerlen</dd>
```

Zorg dat dit exact overeenkomt met wat er bij de KVK en straks in je Google
Business Profile staat. Google vergelijkt die gegevens, en verschillen
verzwakken je positie.

### 4. Schrijf regelmatig een blogartikel

Dit is de motor onder je vindbaarheid op de lange termijn. Elk artikel is een
nieuwe ingang waarop mensen je kunnen vinden. Een paar onderwerpen die goed
werken voor een administratiekantoor:

- "Wat kost een boekhouder voor een zzp'er?" (mensen zoeken hier veel op)
- "Kleineondernemersregeling (KOR): is het iets voor jou?"
- "Van eenmanszaak naar BV: wanneer is het slim?"
- "Welke kosten kun je als zzp'er aftrekken?"
- "Starten als zzp'er: dit regel je in de eerste maand"

Vuistregel: schrijf het antwoord op een vraag die je vaak van klanten krijgt.
Eén goed artikel per maand is genoeg — regelmaat telt zwaarder dan volume.

### 5. Zorg dat je overal hetzelfde vermeld staat

Google let erop of je bedrijfsgegevens consistent zijn. Zorg dat naam,
regio en telefoonnummer identiek zijn op:

- je website
- Google Business Profile
- Instagram en Facebook
- de KVK-inschrijving
- eventuele vermeldingen op verzamelsites

Kleine verschillen ("ABFY" vs "ABFY Boekhouding") verzwakken je positie.

---

## Zodra je domein aan Vercel gekoppeld is

Controleer of `abfy.nl` en `www.abfy.nl` naar dezelfde versie verwijzen.
Vercel regelt dit meestal automatisch met een omleiding. Staat er in de
canonical-tags `www.abfy.nl` maar gebruik je liever `abfy.nl` zonder www?
Pas dan in alle HTML-bestanden `https://www.abfy.nl` aan naar `https://abfy.nl`
— en ook in `sitemap.xml` en `robots.txt`.

## Realistische verwachting

SEO is traag. Reken op **drie tot zes maanden** voordat je gewone
zoekresultaten ziet verbeteren. Je Google Business Profile kan daarentegen al
binnen enkele weken effect hebben — daarom staat die bovenaan deze lijst.
