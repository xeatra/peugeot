# peugeot_dealership — Sales Partner Dealer WebKit (multi-brand, multi-location)

Demo website for a generic multi-brand dealer group (**Sales Partner Auto**, fictional), built on the Sales Partner Dealer WebKit (same structure as the Ford POC).

**Phase 1 (this version):** group shell + complete **Peugeot** mini-site, desktop and mobile, RO / EN.

| Phase | Scope |
|---|---|
| 1 | Group shell (brand switcher, 7 locations) + Peugeot complete |
| 2 | Citroën + Omoda & Jaecoo mini-sites (today: brand page with lead form) |
| 3 | Used cars + fleet / leasing |

DS and Opel are shown as icons only (brand page with service / on-request info).

## Pages

| File | Page |
|---|---|
| `index.html` | Group home: brands, stock, offers, services, 7 locations |
| `marca.html?b=citroen\|omoda\|ds\|opel` | Brand page for phase-2 / icon brands (lead form + locations) |
| `peugeot.html` | Peugeot home: hero slider, quick links, range with energy pills, offers, stock, business, service, locations |
| `modele.html` (`?seg=pro\|ev`) | Range with energy / segment filters |
| `model.html?m=` | Model page: versions & prices, gallery, stock, price-list PDF |
| `preturi.html` | Price list: model → powertrain → versions, compare up to 3 |
| `configurator.html` | Light configurator: model → powertrain & trim → colour → accessories → summary, finance, quote |
| `profesionisti.html` | Pentru Profesioniști: vans, people carriers, fleet quote |
| `stoc.html`, `vehicul.html?id=` | Stock list and vehicle page |
| `oferte.html`, `oferta.html?id=` | Offers |
| `service.html` | Service booking (4 steps, location choice), warranty, assistance, recall |
| `brosuri.html` | Official price-list PDFs per model (links to peugeot.ro) |
| `locatii.html`, `locatie.html?id=` | 7 locations, filter by brand / city |
| `stiri.html`, `stire.html`, `contact.html`, `solicita.html`, `legal.html`, `sitemap.html`, `404.html` | Shared pages |

## Structure

```
assets/css  fonts.css (Archivo, OFL) · tokens.css (Peugeot C&I) · site.css (WebKit) · brand.css (Peugeot + group shell)
assets/js   media.js (placeholder images) · data.js · i18n.js · core.js · pages-sales.js · pages-config.js · pages-other.js · pages-group.js
assets/fonts archivo-latin(-ext)-wdth-normal.woff2 + OFL-Archivo.txt
```

- **Brand swap:** a new brand mini-site = new `tokens.css` + brand block in `brand.css` + its models in `data.js` (`SP.BRANDS`, `SP.BRAND`). UI strings use `{B}` for the brand name.
- **Font:** Archivo variable (weight 100–900, width 62–125%) stands in for the proprietary Peugeot New typeface; headings use `font-stretch: 125%`.
- **Images:** no Peugeot photos or official logos. Vehicles are neutral SVG silhouettes (`media.js`), the brand is rendered as a text wordmark. Replace with importer DAM media in production.
- **Prices:** versions and list prices from the Peugeot România price lists (peugeot.ro, Aug–Nov 2026); promotional "de la" prices as shown on peugeot.ro (Oct 2026). Vans are listed by the importer excl. VAT and stored ×1.21. The private / business toggle (`?client=business`) shows net prices.
- **Demo data:** dealer, locations, people, stock, colours and accessories are fictional.

## Integration points (search `Integration point:`)

`POST /api/leads` · `GET /api/catalog/{model}` (+ `/media`) · `GET /api/stock` · `POST /api/service-bookings` · SP Campaigns / CMS (offers, news).

## Run

Static site: open via any web server (`python3 -m http.server`). Fonts do not load from `file://`. `vercel.json` sends noindex headers, `robots.txt` blocks crawlers, a DEMO badge is shown.
