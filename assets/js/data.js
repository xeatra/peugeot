/* =====================================================================
   DATA LAYER (demo) — Sales Partner multi-brand dealer group
   In production every block below is published from Sales Partner via API.
   Peugeot range, versions and list prices come from the Peugeot România price
   lists (peugeot.ro, valid Aug–Nov 2026); "de la" promotional prices are those
   shown on peugeot.ro in October 2026. Dealer, locations, people and stock are
   fictional. Images are neutral placeholders (see media.js) — no brand photos
   or official logos are used.
   All stored prices are WITH VAT (commercial vehicles, which the importer lists
   without VAT, are stored ×1.21); the private / business toggle shows net prices.
   ===================================================================== */
window.SP = window.SP || {};

SP.DEALER = {
  name: 'Sales Partner Auto', short: 'SP Auto',
  legal: { company: 'Demo Auto Group S.R.L.', address: 'Șos. Pantelimon 400, Sector 2, București', reg: 'J40/0000/2026', cui: 'RO00000000', capital: '200 RON', email: 'contact@sp-auto.demo' },
  importer: { company: 'Importator Peugeot România (demo)', official: 'Peugeot România', site: 'https://www.peugeot.ro', assistance: '0800 000 000' },
  phone: '021 555 04 00', phoneService: '021 555 04 10', phonePro: '021 555 04 30', whatsapp: '+40 722 000 400',
  email: 'vanzari@sp-auto.demo', emailService: 'service@sp-auto.demo', emailPro: 'flote@sp-auto.demo',
  hours: [
    { d: { ro: 'Luni – Vineri', en: 'Monday – Friday' }, h: '08:30 – 18:00' },
    { d: { ro: 'Sâmbătă', en: 'Saturday' }, h: '10:00 – 14:00' },
    { d: { ro: 'Duminică', en: 'Sunday' }, h: null }
  ],
  hoursService: [
    { d: { ro: 'Luni – Vineri', en: 'Monday – Friday' }, h: '08:00 – 17:00' },
    { d: { ro: 'Sâmbătă – Duminică', en: 'Saturday – Sunday' }, h: null }
  ],
  social: { fb: '#', ig: '#', yt: '#', tt: '#', in: '#' }
};

/* ---------------------------------------------------------------- BRANDS (group shell)
   full = complete brand mini-site · soon = phase 2 (page + lead form) · icon = shown as icon only */
SP.BRANDS = [
  { id: 'peugeot', name: 'Peugeot', word: 'PEUGEOT', status: 'full', home: 'peugeot.html', color: '#000000' },
  { id: 'citroen', name: 'Citroën', word: 'CITROËN', status: 'soon', home: 'marca.html?b=citroen', color: '#DA291C' },
  { id: 'omoda', name: 'Omoda & Jaecoo', word: 'OMODA | JAECOO', status: 'soon', home: 'marca.html?b=omoda', color: '#1F2A33' },
  { id: 'ds', name: 'DS Automobiles', word: 'DS', status: 'icon', home: 'marca.html?b=ds', color: '#8C7B6B' },
  { id: 'opel', name: 'Opel', word: 'OPEL', status: 'icon', home: 'marca.html?b=opel', color: '#F7D800' }
];
SP.BRAND = SP.BRANDS[0];
SP.brand = id => SP.BRANDS.find(b => b.id === id);
SP.BRAND_INFO = {
  citroen: { ro: 'Gama Citroën — autoturisme și vehicule utilitare, cu prețuri, configurator și stoc — vine în faza 2 a site-ului. Până atunci te ajutăm cu oferte, test drive și service la locațiile marcate.', en: 'The Citroën range — cars and vans, with prices, configurator and stock — arrives in phase 2 of the site. Until then we help with quotes, test drives and service at the marked locations.' },
  omoda: { ro: 'Omoda și Jaecoo — SUV-uri electrice, hibride și pe benzină — vin în faza 2 a site-ului. Până atunci îți trimitem ofertă și te programăm la test drive.', en: 'Omoda and Jaecoo — electric, hybrid and petrol SUVs — arrive in phase 2 of the site. Until then we send you a quote and book your test drive.' },
  ds: { ro: 'DS Automobiles: vânzări la cerere și service autorizat la locațiile marcate.', en: 'DS Automobiles: sales on request and authorised service at the marked locations.' },
  opel: { ro: 'Opel: service autorizat și piese originale la locațiile marcate.', en: 'Opel: authorised service and genuine parts at the marked locations.' }
};

SP.TEAM = {
  ad: { name: 'Andrei Dumitrescu', role: { ro: 'Director General', en: 'General Manager' } },
  mc: { name: 'Mihaela Constantin', role: { ro: 'Director Vânzări', en: 'Sales Director' } },
  ri: { name: 'Radu Ionescu', role: { ro: 'Consilier vânzări Peugeot', en: 'Peugeot sales advisor' }, phone: '+40 722 000 401' },
  cs: { name: 'Corina Stan', role: { ro: 'Consilier vânzări electrice', en: 'EV sales advisor' }, phone: '+40 722 000 402' },
  gp: { name: 'George Pavel', role: { ro: 'Consilier vânzări', en: 'Sales advisor' }, phone: '+40 722 000 403' },
  ia: { name: 'Ioana Albu', role: { ro: 'Manager vehicule utilitare & flote', en: 'Vans & fleet manager' }, phone: '+40 722 000 430' },
  sv: { name: 'Sorin Vlad', role: { ro: 'Consilier flote', en: 'Fleet advisor' }, phone: '+40 722 000 431' },
  ab: { name: 'Adrian Barbu', role: { ro: 'Consilier vânzări Brașov', en: 'Sales advisor Brașov' }, phone: '+40 722 000 440' },
  lm: { name: 'Laura Mureșan', role: { ro: 'Consilier vânzări Cluj', en: 'Sales advisor Cluj' }, phone: '+40 722 000 450' },
  dn: { name: 'Dan Neagu', role: { ro: 'Consilier vânzări Pitești', en: 'Sales advisor Pitești' }, phone: '+40 722 000 460' },
  ep: { name: 'Elena Popescu', role: { ro: 'Consilier vânzări Ploiești', en: 'Sales advisor Ploiești' }, phone: '+40 722 000 470' },
  tm: { name: 'Tudor Manea', role: { ro: 'Șef Service', en: 'Head of Service' } },
  am: { name: 'Ana Marin', role: { ro: 'Consilier service', en: 'Service advisor' }, phone: '+40 722 000 410' }
};

/* ---------------------------------------------------------------- LOCATIONS (7) */
(function () {
  const T = { sales: { ro: 'Vânzări autoturisme noi', en: 'New car sales' }, service: { ro: 'Service autorizat', en: 'Authorised service' }, body: { ro: 'Caroserie & vopsitorie', en: 'Body & paint' }, parts: { ro: 'Piese & accesorii originale', en: 'Genuine parts & accessories' }, itp: { ro: 'Stație ITP', en: 'MOT (ITP) station' }, fleet: { ro: 'Utilitare & flote', en: 'Vans & fleets' }, charging: { ro: 'Stație de încărcare', en: 'Charging station' } };
  const loc = (id, city, area, address, phone, lat, lng, brands, types, team, extra) => Object.assign({
    id, city, area,
    name: { ro: 'Sales Partner ' + city + (area ? ' ' + area : ''), en: 'Sales Partner ' + city + (area ? ' ' + area : '') },
    short: { ro: city + (area ? ' ' + area : ''), en: city + (area ? ' ' + area : '') },
    address, phone, email: id + '@sp-auto.demo', lat, lng, brands, types, team,
    img: SP.placeImg('showroom', city + (area ? ' · ' + area : '')),
    services: { ro: types.map(x => T[x].ro), en: types.map(x => T[x].en) }
  }, extra || {});
  SP.LOC_TYPES = T;
  SP.LOCATIONS = [
    loc('pantelimon', 'București', 'Pantelimon', 'Șos. Pantelimon 400, Sector 2, București', '021 555 04 00', 44.4430, 26.2050, ['peugeot', 'citroen', 'ds', 'opel'], ['sales', 'service', 'body', 'parts', 'itp', 'charging'], ['ad', 'mc', 'ri', 'cs', 'tm', 'am'], { hq: true }),
    loc('militari', 'București', 'Militari', 'Bd. Iuliu Maniu 600, Sector 6, București', '021 555 04 20', 44.4350, 25.9900, ['peugeot', 'citroen', 'opel'], ['sales', 'service', 'parts'], ['gp', 'am']),
    loc('otopeni', 'Otopeni', '', 'Calea Bucureștilor 300, Otopeni, Ilfov', '021 555 04 30', 44.5500, 26.0700, ['peugeot', 'citroen', 'ds', 'omoda'], ['sales', 'service', 'body', 'parts', 'itp', 'fleet'], ['ia', 'sv', 'cs'], { pro: true }),
    loc('brasov', 'Brașov', '', 'Str. Zizinului 200, Brașov', '0268 555 040', 45.6440, 25.6250, ['peugeot', 'citroen', 'opel'], ['sales', 'service', 'body', 'parts'], ['ab']),
    loc('cluj', 'Cluj-Napoca', '', 'Calea Florești 100, Cluj-Napoca', '0264 555 040', 46.7560, 23.5410, ['peugeot', 'omoda'], ['sales', 'service', 'parts'], ['lm']),
    loc('pitesti', 'Pitești', '', 'Str. Depozitelor 50, Pitești', '0248 555 040', 44.8500, 24.8900, ['peugeot', 'citroen'], ['sales', 'service', 'parts'], ['dn']),
    loc('ploiesti', 'Ploiești', '', 'Șos. Vestului 30, Ploiești', '0244 555 040', 44.9410, 25.9950, ['peugeot', 'citroen', 'omoda'], ['sales', 'service', 'parts'], ['ep'])
  ];
})();
SP.loc = id => SP.LOCATIONS.find(l => l.id === id);

/* Peugeot energy labels (peugeot.ro order) */
SP.FUEL = {
  ev: { ro: 'Electric', en: 'Electric' }, phev: { ro: 'Plug-In Hybrid', en: 'Plug-In Hybrid' }, hev: { ro: 'Hybrid', en: 'Hybrid' },
  ice: { ro: 'Benzină', en: 'Petrol' }, diesel: { ro: 'Diesel', en: 'Diesel' }
};
SP.FUEL_ORDER = ['ev', 'phev', 'hev', 'ice', 'diesel'];
SP.BODY = {
  hatch: { ro: 'Hatchback', en: 'Hatchback' }, suv: { ro: 'SUV', en: 'SUV' }, sw: { ro: 'Break (SW)', en: 'Estate (SW)' }, fastback: { ro: 'Fastback', en: 'Fastback' },
  mpv: { ro: 'Monovolum', en: 'MPV' }, van: { ro: 'Utilitar', en: 'Van' }
};
SP.SEG = { cars: { ro: 'Vehicule', en: 'Vehicles' }, ev: { ro: 'Electric & Hybrid', en: 'Electric & Hybrid' }, pro: { ro: 'Utilitare', en: 'Vans' } };

/* ---------------------------------------------------------------- COLOURS (configurator + stock) */
SP.COLORS = [
  { id: 'okenite', name: { ro: 'Alb Okenite', en: 'Okenite White' }, hex: '#E6E5E0', price: 0 },
  { id: 'nera', name: { ro: 'Negru Perla Nera', en: 'Perla Nera Black' }, hex: '#17181B', price: 650 },
  { id: 'selenium', name: { ro: 'Gri Selenium', en: 'Selenium Grey' }, hex: '#5B6168', price: 650 },
  { id: 'artense', name: { ro: 'Gri Artense', en: 'Artense Grey' }, hex: '#8E9399', price: 650 },
  { id: 'vertigo', name: { ro: 'Albastru Vertigo', en: 'Vertigo Blue' }, hex: '#1F4E8C', price: 650 },
  { id: 'elixir', name: { ro: 'Roșu Elixir', en: 'Elixir Red' }, hex: '#9E1B22', price: 900 },
  { id: 'olivine', name: { ro: 'Verde Olivine', en: 'Olivine Green' }, hex: '#7C8457', price: 650 },
  { id: 'agueda', name: { ro: 'Galben Agueda', en: 'Agueda Yellow' }, hex: '#C8D23C', price: 650 },
  { id: 'obsession', name: { ro: 'Albastru Obsession', en: 'Obsession Blue' }, hex: '#1E3A5F', price: 650 },
  { id: 'titane', name: { ro: 'Gri Titane', en: 'Titane Grey' }, hex: '#6B6E70', price: 650 },
  { id: 'ingaro', name: { ro: 'Albastru Ingaro', en: 'Ingaro Blue' }, hex: '#3C6E9E', price: 900 }
];
SP.COLORS_PRO = [
  { id: 'banquise', name: { ro: 'Alb Banquise', en: 'Banquise White' }, hex: '#EFEFEC', price: 0 },
  { id: 'artense', name: { ro: 'Gri Artense', en: 'Artense Grey' }, hex: '#8E9399', price: 550 },
  { id: 'nera', name: { ro: 'Negru Perla Nera', en: 'Perla Nera Black' }, hex: '#17181B', price: 550 },
  { id: 'impulse', name: { ro: 'Albastru Impulse', en: 'Impulse Blue' }, hex: '#254F8F', price: 550 },
  { id: 'titane', name: { ro: 'Gri Titane', en: 'Titane Grey' }, hex: '#6B6E70', price: 550 },
  { id: 'thunder', name: { ro: 'Gri Thunder', en: 'Thunder Grey' }, hex: '#6D7176', price: 550 },
  { id: 'iron', name: { ro: 'Gri Iron', en: 'Iron Grey' }, hex: '#4A4D50', price: 550 },
  { id: 'expedition', name: { ro: 'Gri Expedition', en: 'Expedition Grey' }, hex: '#9A9C8F', price: 550 }
];
/* image fallback: importer image URL → neutral silhouette (used by core.js when an image fails to load) */
SP.FB = {};
SP.fb = (url, fallback) => { if (!url) return fallback; SP.FB[url] = fallback; return url; };

/* ---------------------------------------------------------------- MODELS — Peugeot România price lists (Aug–Nov 2026) */
(function () {
  const V = 1.21, net = n => Math.round(n * V);
  const E = (name, cp, extra) => ({ ro: name + ' ' + cp + ' CP' + (extra ? ', ' + extra.replace('.', ',') : ''), en: name + ' ' + cp + ' hp' + (extra ? ', ' + extra : '') });
  /* feature sets per trim (highlights from the price lists) */
  const F = {
    style208: [['Faruri Eco LED cu semnătura cu 3 gheare', 'Eco LED headlights with 3-claw signature'], ['Peugeot i-Cockpit, ecran central 10"', 'Peugeot i-Cockpit, 10" centre screen'], ['Aer condiționat', 'Air conditioning'], ['Senzori parcare spate', 'Rear parking sensors'], ['Jante 16"', '16" wheels']],
    allure208: [['Peugeot i-Cockpit cu instrumentar digital 10"', 'Peugeot i-Cockpit with 10" digital cluster'], ['Peugeot i-Connect, radio DAB', 'Peugeot i-Connect, DAB radio'], ['Jante aliaj 16" bicolore', '16" two-tone alloy wheels'], ['Oglindă electrocromă', 'Auto-dimming mirror'], ['Senzori parcare față și spate', 'Front and rear parking sensors']],
    gt208: [['Peugeot i-Cockpit 3D', 'Peugeot i-Cockpit 3D'], ['Faruri Full LED', 'Full LED headlights'], ['Acces și pornire fără cheie', 'Keyless entry and start'], ['Iluminare ambientală 8 culori', '8-colour ambient lighting'], ['Jante aliaj 17"', '17" alloy wheels']],
    style2008: [['Faruri LED cu semnătura cu 3 gheare', 'LED headlights with 3-claw signature'], ['Climatizare automată', 'Automatic climate control'], ['Ecran tactil 10"', '10" touchscreen'], ['Senzori parcare spate', 'Rear parking sensors'], ['Jante 16"', '16" wheels']],
    allure2008: [['Peugeot i-Cockpit cu instrumentar digital 10"', 'Peugeot i-Cockpit with 10" digital cluster'], ['Peugeot i-Connect', 'Peugeot i-Connect'], ['Jante aliaj 17" bicolore', '17" two-tone alloy wheels'], ['Senzori parcare față și spate', 'Front and rear parking sensors'], ['Oglindă electrocromă', 'Auto-dimming mirror']],
    gt2008: [['Peugeot i-Cockpit 3D', 'Peugeot i-Cockpit 3D'], ['Faruri Full LED', 'Full LED headlights'], ['Cameră Visiopark 1', 'Visiopark 1 camera'], ['Acces și pornire fără cheie', 'Keyless entry and start'], ['Volan compact din piele', 'Compact leather steering wheel']],
    style308: [['Faruri Full LED', 'Full LED headlights'], ['i-Cockpit cu instrumentar digital 10"', 'i-Cockpit with 10" digital cluster'], ['Ecran 10", CarPlay/Android Auto wireless', '10" screen, wireless CarPlay/Android Auto'], ['Climatizare automată bizonă', 'Dual-zone automatic climate control'], ['Jante aliaj 16"', '16" alloy wheels']],
    allure308: [['Cameră marșarier HD', 'HD reversing camera'], ['Senzori parcare față', 'Front parking sensors'], ['Jante aliaj 17"', '17" alloy wheels'], ['Peugeot Connect SOS & Assistance', 'Peugeot Connect SOS & Assistance'], ['Tapițerie textil Tremezzo', 'Tremezzo fabric upholstery']],
    gt308: [['Faruri Matrix LED', 'Matrix LED headlights'], ['Jante aliaj 18"', '18" alloy wheels'], ['Inserții Alcantara', 'Alcantara trim'], ['Grilă superioară iluminată', 'Illuminated upper grille'], ['Tapițerie cu cusături verzi', 'Upholstery with green stitching']],
    allure408: [['Acces și pornire fără cheie', 'Keyless entry and start'], ['Climatizare automată bizonă', 'Dual-zone automatic climate control'], ['i-Cockpit cu instrumentar digital 10"', 'i-Cockpit with 10" digital cluster'], ['Ecran 10", CarPlay/Android Auto wireless', '10" screen, wireless CarPlay/Android Auto'], ['6 airbaguri', '6 airbags']],
    gt408: [['Faruri Matrix LED', 'Matrix LED headlights'], ['Hayon electric', 'Power tailgate'], ['Senzori parcare față', 'Front parking sensors'], ['Volan GT din piele', 'GT leather steering wheel'], ['Jante aliaj 19"', '19" alloy wheels']],
    allure3008: [['i-Cockpit Panoramic, 2 ecrane HD 10"', 'Panoramic i-Cockpit, two 10" HD screens'], ['i-Connect, CarPlay/Android Auto wireless', 'i-Connect, wireless CarPlay/Android Auto'], ['Pachet Safety Plus (frânare automată, menținere bandă)', 'Safety Plus pack (AEB, lane keeping)'], ['Cameră Visiopark 1 și senzori spate', 'Visiopark 1 camera and rear sensors'], ['Acces fără cheie', 'Keyless entry']],
    gt3008: [['Faruri PEUGEOT Pixel LED', 'PEUGEOT Pixel LED headlights'], ['Drive Assist cu cruise control adaptiv Stop & Go', 'Drive Assist with Stop & Go adaptive cruise'], ['i-Cockpit Panoramic 21" HD', '21" HD Panoramic i-Cockpit'], ['Navigație conectată TomTom', 'TomTom connected navigation'], ['Volan încălzit, hayon hands-free', 'Heated wheel, hands-free tailgate']],
    allure5008: [['7 locuri', '7 seats'], ['i-Cockpit Panoramic, 2 ecrane HD 10"', 'Panoramic i-Cockpit, two 10" HD screens'], ['i-Connect, CarPlay/Android Auto wireless', 'i-Connect, wireless CarPlay/Android Auto'], ['Cameră Visiopark 1 și senzori spate', 'Visiopark 1 camera and rear sensors'], ['Acces fără cheie', 'Keyless entry']],
    gt5008: [['Faruri Pixel LED', 'Pixel LED headlights'], ['Cruise control adaptiv Stop & Go', 'Stop & Go adaptive cruise control'], ['i-Cockpit Panoramic 21" HD', '21" HD Panoramic i-Cockpit'], ['Navigație conectată TomTom', 'TomTom connected navigation'], ['Camere față și spate', 'Front and rear cameras']],
    rifter: [['ESP, Hill Assist', 'ESP, Hill Assist'], ['Lumini de zi LED', 'LED daytime running lights'], ['Aer condiționat', 'Air conditioning'], ['Frână de parcare electrică', 'Electric parking brake'], ['5 locuri, ușe glisante', '5 seats, sliding doors']],
    traveller: [['Ecran tactil 10", oglindire smartphone', '10" touchscreen, smartphone mirroring'], ['Asistență menținere bandă', 'Lane keeping assist'], ['Senzori parcare spate', 'Rear parking sensors'], ['Aer condiționat', 'Air conditioning'], ['Până la 8 locuri', 'Up to 8 seats']],
    partner: [['Airbaguri frontale și laterale', 'Front and side airbags'], ['ESP', 'ESP'], ['Cameră marșarier 180°', '180° reversing camera'], ['Ecran tactil 10", radio DAB', '10" touchscreen, DAB radio'], ['Comenzi vocale', 'Voice control']],
    expert: [['Aer condiționat', 'Air conditioning'], ['Airbaguri șofer și pasager', 'Driver and passenger airbags'], ['Senzori parcare spate', 'Rear parking sensors'], ['ESP cu Hill Assist', 'ESP with Hill Assist'], ['Ecran tactil 5", DAB, Bluetooth', '5" touchscreen, DAB, Bluetooth']],
    boxer: [['Airbaguri șofer și pasager', 'Driver and passenger airbags'], ['ESP cu Hill Hold', 'ESP with Hill Hold'], ['Senzori parcare spate', 'Rear parking sensors'], ['Geamuri electrice față', 'Electric front windows'], ['Cruise control și limitator', 'Cruise control and limiter']]
  };
  const feat = k => (F[k] || []).map(x => ({ ro: x[0], en: x[1] }));
  const TRIM = n => ({ ro: n, en: n });
  /* ver(trim, featureKey, engine, fuel, cp, kWh, gearbox, drive/body, price incl. VAT, promo incl. VAT) */
  const ver = (trim, fk, engine, fuel, cp, kwh, gb, dr, list, promo) => ({ trim: TRIM(trim), engine, fuel, cp, kwh: kwh || null, gb, dr, list, promo: promo || null, f: feat(fk) });
  const M = (id, name, seg, body, shape, color, variants, extra) => Object.assign({ id, brand: 'peugeot', name, seg, body, shape, color, variants }, extra || {});
  const v = (id, name, fuel, versions, extra) => Object.assign({ id, name, fuel, versions }, extra || {});
  const T100 = E('Turbo', 100, 'manuală 6'), H110 = E('Hybrid', 110, 'e-DCS6'), H145 = E('Hybrid', 145, 'e-DCS6');
  T100.en = 'Turbo 100 hp, 6-speed manual';
  const EV156 = kwh => E('Electric', 156, kwh + ' kWh');
  const PRICE_SRC = { '208': '208-Lista-de-preturi-Lista-de-pret-valabila-incepand-cu-luna-august-2026.pdf', '2008': '2008-Lista-preturi-Lista-de-pret-valabila-incepand-cu-luna-august-2026.pdf', '308': 'Peugeot_308_MCA_V2-Lista-de-preturi-valabila-incepand-cu-luna-mai-2026.pdf', '308-sw': 'Peugeot_308_MCA_V2-Lista-de-preturi-valabila-incepand-cu-luna-mai-2026.pdf', '408': 'Noul-Peugeot-408_A.pdf', '3008': 'Noul-3008-Lista-de-preturi-Lista-de-preturi-valabila-incepand-luna-august-2026.pdf', '5008': 'Noul-5008-Lista-de-preturi_Lista-de-preturi-valabila-incepand-cu-luna-august-2026.pdf', 'rifter': 'Noul-Peugeot-Rifter_e-Rifter-Lista-de-pret-valabila-incepand-cu-luna-august-2026.pdf', 'traveller': 'Peugeot_e-Traveller-VP-productie-februarie_2026.pdf', 'partner': 'Peugeot_Partner_e-Partner-Lista-de-pret-valabila-incepand-cu-luna-de-productie-octombrie-2026.pdf', 'expert': 'Peugeot-Expert-VU_e-Expert_VU_Preturi-valabile-incepand-cu-luna-noiembrie-2026.pdf', 'boxer': 'Noul-Peugeot-Boxer-Lista-de-preturi-valabila-incepand-cu-luna-august.pdf' };
  SP.PRICE_PDF = id => PRICE_SRC[id] ? 'https://www.peugeot.ro/content/dam/peugeot/romania/preturi/' + PRICE_SRC[id] : null;

  SP.MODELS = [
    M('208', '208', 'cars', 'hatch', 'hatch', '#E2B33C', [
      v('208', '208', 'hev', [ver('Style', 'style208', T100, 'ice', 100, 0, 'manual', 'FWD', 21200, 16780), ver('Allure', 'allure208', T100, 'ice', 100, 0, 'manual', 'FWD', 22750),
        ver('Style', 'style208', H110, 'hev', 110, 0, 'auto', 'FWD', 25050), ver('Allure', 'allure208', H110, 'hev', 110, 0, 'auto', 'FWD', 26700), ver('GT', 'gt208', H110, 'hev', 110, 0, 'auto', 'FWD', 28300),
        ver('Allure', 'allure208', H145, 'hev', 145, 0, 'auto', 'FWD', 28000), ver('GT', 'gt208', H145, 'hev', 145, 0, 'auto', 'FWD', 29650)]),
      v('e-208', 'E-208', 'ev', [ver('Style', 'style208', EV156(51), 'ev', 156, 51, 'auto', 'FWD', 35250), ver('Allure', 'allure208', EV156(51), 'ev', 156, 51, 'auto', 'FWD', 36450), ver('GT', 'gt208', EV156(51), 'ev', 156, 51, 'auto', 'FWD', 38600)], { label: 'E-208', color: '#1F4E8C' })
    ], { tagline: { ro: 'Compacta urbană: benzină, hybrid sau 100% electrică.', en: 'The urban compact: petrol, hybrid or fully electric.' }, intro: { ro: '208 vine cu motor Turbo 100, Hybrid 110 sau 145 cu cutie automată e-DCS6 și ca E-208 100% electric de 156 CP, în nivelurile Style, Allure și GT, cu Peugeot i-Cockpit.', en: '208 comes with a Turbo 100, a Hybrid 110 or 145 with the e-DCS6 automatic, and as the fully electric 156 hp E-208, in Style, Allure and GT trims, with Peugeot i-Cockpit.' }, cats: ['urban', 'hatch'] }),
    M('2008', '2008', 'cars', 'suv', 'suv', '#5B6168', [
      v('2008', '2008', 'hev', [ver('Style', 'style2008', T100, 'ice', 100, 0, 'manual', 'FWD', 23950, 20770), ver('Allure', 'allure2008', T100, 'ice', 100, 0, 'manual', 'FWD', 25900),
        ver('Style', 'style2008', H110, 'hev', 110, 0, 'auto', 'FWD', 26950), ver('Allure', 'allure2008', H110, 'hev', 110, 0, 'auto', 'FWD', 29200),
        ver('Style', 'style2008', H145, 'hev', 145, 0, 'auto', 'FWD', 28200), ver('Allure', 'allure2008', H145, 'hev', 145, 0, 'auto', 'FWD', 30450), ver('GT', 'gt2008', H145, 'hev', 145, 0, 'auto', 'FWD', 32900)]),
      v('e-2008', 'E-2008', 'ev', [ver('Style', 'style2008', EV156(54), 'ev', 156, 54, 'auto', 'FWD', 36800), ver('Allure', 'allure2008', EV156(54), 'ev', 156, 54, 'auto', 'FWD', 38000), ver('GT', 'gt2008', EV156(54), 'ev', 156, 54, 'auto', 'FWD', 39850)], { label: 'E-2008', color: '#7C8457' })
    ], { tagline: { ro: 'SUV-ul compact: benzină, hybrid sau electric.', en: 'The compact SUV: petrol, hybrid or electric.' }, intro: { ro: '2008 combină postura de SUV cu dimensiuni compacte: Turbo 100, Hybrid 110/145 sau E-2008 electric de 156 CP, cu Peugeot i-Cockpit și niveluri Style, Allure și GT.', en: '2008 pairs an SUV stance with compact size: Turbo 100, Hybrid 110/145 or the 156 hp electric E-2008, with Peugeot i-Cockpit in Style, Allure and GT.' }, cats: ['suv'] }),
    M('308', '308', 'cars', 'hatch', 'hatchL', '#1F4E8C', [
      v('308', '308', 'hev', [ver('Style', 'style308', H145, 'hev', 145, 0, 'auto', 'FWD', 27350), ver('Allure', 'allure308', H145, 'hev', 145, 0, 'auto', 'FWD', 28750), ver('GT', 'gt308', H145, 'hev', 145, 0, 'auto', 'FWD', 32050),
        ver('Style', 'style308', E('BlueHDi', 130, 'EAT8'), 'diesel', 130, 0, 'auto', 'FWD', 27550), ver('Allure', 'allure308', E('BlueHDi', 130, 'EAT8'), 'diesel', 130, 0, 'auto', 'FWD', 28950), ver('GT', 'gt308', E('BlueHDi', 130, 'EAT8'), 'diesel', 130, 0, 'auto', 'FWD', 32250)]),
      v('308-phev', '308 Plug-In Hybrid', 'phev', [ver('Style', 'style308', E('Plug-In Hybrid', 195, 'e-DCS7, 17.2 kWh'), 'phev', 195, 17.2, 'auto', 'FWD', 38050), ver('Allure', 'allure308', E('Plug-In Hybrid', 195, 'e-DCS7, 17.2 kWh'), 'phev', 195, 17.2, 'auto', 'FWD', 39450), ver('GT', 'gt308', E('Plug-In Hybrid', 195, 'e-DCS7, 17.2 kWh'), 'phev', 195, 17.2, 'auto', 'FWD', 42950)], { label: 'Plug-In Hybrid' }),
      v('e-308', 'E-308', 'ev', [ver('Style', 'style308', EV156(54), 'ev', 156, 54, 'auto', 'FWD', 39250), ver('Allure', 'allure308', EV156(54), 'ev', 156, 54, 'auto', 'FWD', 39650), ver('GT', 'gt308', EV156(54), 'ev', 156, 54, 'auto', 'FWD', 43050)], { label: 'E-308', color: '#5B6168' })
    ], { tagline: { ro: 'Hatchback-ul compact: hybrid, diesel, plug-in sau electric.', en: 'The compact hatchback: hybrid, diesel, plug-in or electric.' }, intro: { ro: '308 este disponibil cu Hybrid 145, BlueHDi 130 EAT8, Plug-In Hybrid 195 și E-308 electric, cu faruri Full LED, i-Cockpit și CarPlay/Android Auto wireless de serie.', en: '308 is available as Hybrid 145, BlueHDi 130 EAT8, Plug-In Hybrid 195 and the electric E-308, with Full LED lights, i-Cockpit and wireless CarPlay/Android Auto as standard.' }, cats: ['hatch'] }),
    M('308-sw', '308 SW', 'cars', 'sw', 'estate', '#8E9399', [
      v('308-sw', '308 SW', 'hev', [ver('Style', 'style308', H145, 'hev', 145, 0, 'auto', 'FWD', 28400), ver('Allure', 'allure308', H145, 'hev', 145, 0, 'auto', 'FWD', 29800), ver('GT', 'gt308', H145, 'hev', 145, 0, 'auto', 'FWD', 33100),
        ver('Style', 'style308', E('BlueHDi', 130, 'EAT8'), 'diesel', 130, 0, 'auto', 'FWD', 28600), ver('Allure', 'allure308', E('BlueHDi', 130, 'EAT8'), 'diesel', 130, 0, 'auto', 'FWD', 30000), ver('GT', 'gt308', E('BlueHDi', 130, 'EAT8'), 'diesel', 130, 0, 'auto', 'FWD', 33300)]),
      v('308-sw-phev', '308 SW Plug-In Hybrid', 'phev', [ver('Style', 'style308', E('Plug-In Hybrid', 195, 'e-DCS7, 17.2 kWh'), 'phev', 195, 17.2, 'auto', 'FWD', 39100), ver('Allure', 'allure308', E('Plug-In Hybrid', 195, 'e-DCS7, 17.2 kWh'), 'phev', 195, 17.2, 'auto', 'FWD', 40600), ver('GT', 'gt308', E('Plug-In Hybrid', 195, 'e-DCS7, 17.2 kWh'), 'phev', 195, 17.2, 'auto', 'FWD', 43900)], { label: 'Plug-In Hybrid' }),
      v('e-308-sw', 'E-308 SW', 'ev', [ver('Style', 'style308', EV156(54), 'ev', 156, 54, 'auto', 'FWD', 40200), ver('Allure', 'allure308', EV156(54), 'ev', 156, 54, 'auto', 'FWD', 40800), ver('GT', 'gt308', EV156(54), 'ev', 156, 54, 'auto', 'FWD', 44300)], { label: 'E-308 SW' })
    ], { tagline: { ro: 'Break-ul spațios pentru familie și drum lung.', en: 'The roomy estate for family and long trips.' }, intro: { ro: '308 SW adaugă un portbagaj generos și aceleași motorizări ca 308: Hybrid 145, BlueHDi 130, Plug-In Hybrid 195 și E-308 SW electric.', en: '308 SW adds a generous boot with the same powertrains as 308: Hybrid 145, BlueHDi 130, Plug-In Hybrid 195 and the electric E-308 SW.' }, cats: ['sw'] }),
    M('408', '408', 'cars', 'fastback', 'fastback', '#9E1B22', [
      v('408', '408', 'hev', [ver('Allure', 'allure408', H145, 'hev', 145, 0, 'auto', 'FWD', 32950), ver('GT', 'gt408', H145, 'hev', 145, 0, 'auto', 'FWD', 35550)]),
      v('408-phev', '408 Plug-In Hybrid', 'phev', [ver('Allure', 'allure408', E('Plug-In Hybrid', 240, 'e-DCS7, 17.2 kWh'), 'phev', 240, 17.2, 'auto', 'FWD', 42700), ver('GT', 'gt408', E('Plug-In Hybrid', 240, 'e-DCS7, 17.2 kWh'), 'phev', 240, 17.2, 'auto', 'FWD', 45300)], { label: 'Plug-In Hybrid' }),
      v('e-408', 'E-408', 'ev', [ver('Allure', 'allure408', E('Electric', 210, '58.2 kWh'), 'ev', 210, 58.2, 'auto', 'FWD', 45200), ver('GT', 'gt408', E('Electric', 210, '58.2 kWh'), 'ev', 210, 58.2, 'auto', 'FWD', 47800)], { label: 'E-408' })
    ], { tagline: { ro: 'Fastback-ul cu siluetă de coupé: hybrid, plug-in sau electric.', en: 'The coupé-like fastback: hybrid, plug-in or electric.' }, intro: { ro: '408 combină silueta fastback cu spațiul unei berline familiale: Hybrid 145, Plug-In Hybrid 240 sau E-408 electric de 210 CP, în Allure și GT.', en: '408 blends a fastback silhouette with family-saloon space: Hybrid 145, Plug-In Hybrid 240 or the 210 hp electric E-408, in Allure and GT.' }, cats: ['fastback'] }),
    M('3008', '3008', 'cars', 'suv', 'suv', '#2B3440', [
      v('3008', '3008', 'hev', [ver('Allure', 'allure3008', H145, 'hev', 145, 0, 'auto', 'FWD', 35750, 31650), ver('GT', 'gt3008', H145, 'hev', 145, 0, 'auto', 'FWD', 38600)]),
      v('3008-phev', '3008 Plug-In Hybrid', 'phev', [ver('Allure', 'allure3008', E('Plug-In Hybrid', 225, 'e-DCS7, 17.8 kWh'), 'phev', 225, 17.8, 'auto', 'FWD', 43900), ver('GT', 'gt3008', E('Plug-In Hybrid', 225, 'e-DCS7, 17.8 kWh'), 'phev', 225, 17.8, 'auto', 'FWD', 46650)], { label: 'Plug-In Hybrid' }),
      v('e-3008', 'E-3008', 'ev', [ver('Allure', 'allure3008', E('Electric', 210, '73 kWh'), 'ev', 210, 73, 'auto', 'FWD', 47900), ver('GT', 'gt3008', E('Electric', 210, '73 kWh'), 'ev', 210, 73, 'auto', 'FWD', 50950),
        ver('Allure', 'allure3008', E('Electric Long Range', 230, '98 kWh'), 'ev', 230, 98, 'auto', 'FWD', 52250), ver('GT', 'gt3008', E('Electric Long Range', 230, '98 kWh'), 'ev', 230, 98, 'auto', 'FWD', 55350),
        ver('GT', 'gt3008', E('Electric Dual Motor', 325, '73 kWh'), 'ev', 325, 73, 'auto', 'AWD', 53050)], { label: 'E-3008', color: '#1F4E8C' })
    ], { isNew: true, tagline: { ro: 'SUV fastback: hybrid, plug-in sau electric până la 700 km.', en: 'Fastback SUV: hybrid, plug-in or electric with up to 700 km.' }, intro: { ro: 'Noul 3008 aduce i-Cockpit Panoramic și trei motorizări: Hybrid 145, Plug-In Hybrid 225 și E-3008 electric de 210, 230 (Long Range, 98 kWh) sau 325 CP cu tracțiune integrală.', en: 'The new 3008 brings Panoramic i-Cockpit and three powertrains: Hybrid 145, Plug-In Hybrid 225 and the electric E-3008 with 210, 230 (Long Range, 98 kWh) or 325 hp all-wheel drive.' }, cats: ['suv'] }),
    M('5008', '5008', 'cars', 'suv', 'suv7', '#17181B', [
      v('5008', '5008', 'hev', [ver('Allure', 'allure5008', H145, 'hev', 145, 0, 'auto', 'FWD', 32600), ver('GT', 'gt5008', H145, 'hev', 145, 0, 'auto', 'FWD', 35650)]),
      v('5008-phev', '5008 Plug-In Hybrid', 'phev', [ver('Allure', 'allure5008', E('Plug-In Hybrid', 225, 'e-DCS7'), 'phev', 225, null, 'auto', 'FWD', 40950), ver('GT', 'gt5008', E('Plug-In Hybrid', 225, 'e-DCS7'), 'phev', 225, null, 'auto', 'FWD', 43650)], { label: 'Plug-In Hybrid' }),
      v('e-5008', 'E-5008', 'ev', [ver('Allure', 'allure5008', E('Electric', 210, '73 kWh'), 'ev', 210, 73, 'auto', 'FWD', 44850), ver('GT', 'gt5008', E('Electric', 210, '73 kWh'), 'ev', 210, 73, 'auto', 'FWD', 47450),
        ver('Allure', 'allure5008', E('Electric Long Range', 230, '98 kWh'), 'ev', 230, 98, 'auto', 'FWD', 48900), ver('GT', 'gt5008', E('Electric Long Range', 230, '98 kWh'), 'ev', 230, 98, 'auto', 'FWD', 51550),
        ver('GT', 'gt5008', E('Electric Dual Motor', 325, '73 kWh'), 'ev', 325, 73, 'auto', 'AWD', 49550)], { label: 'E-5008' })
    ], { isNew: true, tagline: { ro: 'SUV-ul de familie cu 7 locuri.', en: 'The 7-seat family SUV.' }, intro: { ro: 'Noul 5008 are 7 locuri, i-Cockpit Panoramic și aceleași motorizări ca 3008: Hybrid 145, Plug-In Hybrid 225 și E-5008 electric, inclusiv Long Range și Dual Motor AWD.', en: 'The new 5008 has 7 seats, Panoramic i-Cockpit and the same powertrains as 3008: Hybrid 145, Plug-In Hybrid 225 and the electric E-5008, including Long Range and Dual Motor AWD.' }, cats: ['suv'] }),
    M('rifter', 'Rifter', 'cars', 'mpv', 'mpv', '#8E9399', [
      v('rifter', 'Rifter', 'diesel', [ver('Allure', 'rifter', E('BlueHDi', 100, 'manuală 6'), 'diesel', 100, 0, 'manual', 'L1', 29400), ver('GT', 'rifter', E('BlueHDi', 130, 'EAT8'), 'diesel', 130, 0, 'auto', 'L1', 34700), ver('GT', 'rifter', E('BlueHDi', 130, 'EAT8'), 'diesel', 130, 0, 'auto', 'L2', 35800)]),
      v('e-rifter', 'E-Rifter', 'ev', [ver('Allure', 'rifter', E('Electric', 136, '50 kWh'), 'ev', 136, 50, 'auto', 'L1', 44000), ver('GT', 'rifter', E('Electric', 136, '50 kWh'), 'ev', 136, 50, 'auto', 'L1', 46400)], { label: 'E-Rifter' })
    ], { tagline: { ro: 'Monovolumul pentru familie și aventură.', en: 'The MPV for family and adventure.' }, intro: { ro: 'Rifter oferă uși glisante, 5 locuri și lungime Standard sau Lung, cu diesel BlueHDi 100/130 sau E-Rifter 100% electric.', en: 'Rifter offers sliding doors, 5 seats and Standard or Long length, with BlueHDi 100/130 diesel or the fully electric E-Rifter.' }, cats: ['mpv'] }),
    M('traveller', 'Traveller', 'cars', 'mpv', 'bus', '#17181B', [
      v('traveller', 'Traveller', 'diesel', [ver('Business', 'traveller', E('BlueHDi', 180, 'EAT8'), 'diesel', 180, 0, 'auto', 'L3', 42713), ver('Business VIP', 'traveller', E('BlueHDi', 180, 'EAT8'), 'diesel', 180, 0, 'auto', 'L3', 49126)]),
      v('e-traveller', 'E-Traveller', 'ev', [ver('Business', 'traveller', E('Electric', 136, '50 kWh'), 'ev', 136, 50, 'auto', 'L2', 53095), ver('Business', 'traveller', E('Electric', 136, '75 kWh'), 'ev', 136, 75, 'auto', 'L3', 60845),
        ver('Business VIP', 'traveller', E('Electric', 136, '75 kWh'), 'ev', 136, 75, 'auto', 'L2', 67045), ver('Business VIP', 'traveller', E('Electric', 136, '75 kWh'), 'ev', 136, 75, 'auto', 'L3', 68194)], { label: 'E-Traveller' })
    ], { tagline: { ro: 'Transport de persoane, până la 8 locuri.', en: 'People carrier, up to 8 seats.' }, intro: { ro: 'Traveller și E-Traveller sunt gândite pentru transfer de persoane și business: versiuni Business și Business VIP, lungime Standard sau Lung, diesel 180 CP sau electric cu baterie de 50/75 kWh.', en: 'Traveller and E-Traveller are built for people transfer and business: Business and Business VIP, Standard or Long, 180 hp diesel or electric with a 50/75 kWh battery.' }, cats: ['business'] }),
    M('partner', 'Partner', 'pro', 'van', 'van', '#E6E5E0', [
      v('partner', 'Partner', 'diesel', [ver('Control', 'partner', E('PureTech', 110, 'manuală 6'), 'ice', 110, 0, 'manual', 'L1', net(21450), net(19040)),
        ver('Control', 'partner', E('BlueHDi', 100, 'manuală 6'), 'diesel', 100, 0, 'manual', 'L1', net(21650)), ver('Control', 'partner', E('BlueHDi', 130, 'manuală 6'), 'diesel', 130, 0, 'manual', 'L1', net(22650)),
        ver('Control 1000 kg', 'partner', E('BlueHDi', 130, 'EAT8'), 'diesel', 130, 0, 'auto', 'L1', net(24550)), ver('Control 1000 kg', 'partner', E('BlueHDi', 100, 'manuală 6'), 'diesel', 100, 0, 'manual', 'L2', net(22950)), ver('Control 1000 kg', 'partner', E('BlueHDi', 130, 'manuală 6'), 'diesel', 130, 0, 'manual', 'L2', net(23950))]),
      v('e-partner', 'E-Partner', 'ev', [ver('Control', 'partner', E('Electric', 136, '50 kWh'), 'ev', 136, 50, 'auto', 'L1', net(31000)), ver('Control', 'partner', E('Electric', 136, '50 kWh'), 'ev', 136, 50, 'auto', 'L2', net(31800))], { label: 'E-Partner' })
    ], { tagline: { ro: 'Utilitarul compact pentru oraș.', en: 'The compact van for the city.' }, intro: { ro: 'Partner este disponibil cu motor PureTech 110, BlueHDi 100/130 sau E-Partner electric (până la 320 km), lungime L1 sau L2 și sarcină utilă de 650 sau 1000 kg.', en: 'Partner comes with a PureTech 110, BlueHDi 100/130 or the electric E-Partner (up to 320 km), L1 or L2 length and a 650 or 1,000 kg payload.' }, cats: ['van'] }),
    M('expert', 'Expert', 'pro', 'van', 'mvan', '#8E9399', [
      v('expert', 'Expert', 'diesel', [ver('Active', 'expert', E('BlueHDi', 120, 'manuală 6'), 'diesel', 120, 0, 'manual', 'L2', net(27050), net(23690)), ver('Active', 'expert', E('BlueHDi', 150, 'manuală 6'), 'diesel', 150, 0, 'manual', 'L2', net(28250)),
        ver('Active', 'expert', E('BlueHDi', 150, 'EAT8'), 'diesel', 150, 0, 'auto', 'L2', net(29550)), ver('Active', 'expert', E('BlueHDi', 180, 'EAT8'), 'diesel', 180, 0, 'auto', 'L2', net(31250)),
        ver('Active', 'expert', E('BlueHDi', 120, 'manuală 6'), 'diesel', 120, 0, 'manual', 'L3', net(28250)), ver('Active', 'expert', E('BlueHDi', 180, 'EAT8'), 'diesel', 180, 0, 'auto', 'L3', net(32450))]),
      v('e-expert', 'E-Expert', 'ev', [ver('e-Active', 'expert', E('Electric', 136, '50 kWh'), 'ev', 136, 50, 'auto', 'L2', net(35750)), ver('e-Active', 'expert', E('Electric', 136, '75 kWh'), 'ev', 136, 75, 'auto', 'L2', net(41250)),
        ver('e-Active', 'expert', E('Electric', 136, '50 kWh'), 'ev', 136, 50, 'auto', 'L3', net(36950)), ver('e-Active', 'expert', E('Electric', 136, '75 kWh'), 'ev', 136, 75, 'auto', 'L3', net(42450))], { label: 'E-Expert' })
    ], { tagline: { ro: 'Furgonul mediu, diesel sau electric.', en: 'The mid-size van, diesel or electric.' }, intro: { ro: 'Expert oferă lungimi M (L2) și L (L3), motoare BlueHDi de 120–180 CP cu cutie manuală sau automată EAT8 și E-Expert electric cu baterie de 50 sau 75 kWh.', en: 'Expert comes in M (L2) and L (L3) lengths, with 120–180 hp BlueHDi engines, manual or EAT8 automatic, and the electric E-Expert with a 50 or 75 kWh battery.' }, cats: ['van'] }),
    M('boxer', 'Boxer', 'pro', 'van', 'bigvan', '#E6E5E0', [
      v('boxer', 'Boxer', 'diesel', [ver('Furgon 3.0 t L2H1', 'boxer', E('BlueHDi', 120, 'manuală 6'), 'diesel', 120, 0, 'manual', 'L2H1', net(27550)), ver('Furgon 3.5 t L2H1', 'boxer', E('BlueHDi', 140, 'automată 8'), 'diesel', 140, 0, 'auto', 'L2H1', net(33200)),
        ver('Furgon 3.5 t L3H2', 'boxer', E('BlueHDi', 140, 'manuală 6'), 'diesel', 140, 0, 'manual', 'L3H2', net(32150)), ver('Furgon 3.5 t L3H2', 'boxer', E('BlueHDi', 180, 'automată 8'), 'diesel', 180, 0, 'auto', 'L3H2', net(36600)),
        ver('Furgon 3.5 t Heavy L4H2', 'boxer', E('BlueHDi', 140, 'manuală 6'), 'diesel', 140, 0, 'manual', 'L4H2', net(33550)), ver('Furgon 3.5 t Heavy L4H3', 'boxer', E('BlueHDi', 180, 'automată 8'), 'diesel', 180, 0, 'auto', 'L4H3', net(38900))]),
      v('e-boxer', 'E-Boxer', 'ev', [ver('Furgon 3.5 t Heavy L3H2', 'boxer', E('Electric', 270, '110 kWh'), 'ev', 270, 110, 'auto', 'L3H2', net(50150)), ver('Furgon 3.5 t Heavy L4H2', 'boxer', E('Electric', 270, '110 kWh'), 'ev', 270, 110, 'auto', 'L4H2', net(50900))], { label: 'E-Boxer' })
    ], { tagline: { ro: 'Furgonul mare: până la 3,5 t, diesel sau electric.', en: 'The large van: up to 3.5 t, diesel or electric.' }, intro: { ro: 'Noul Boxer are lungimi L2–L4 și înălțimi H1–H3, BlueHDi de 120–180 CP și E-Boxer electric de 270 CP pentru livrări fără emisii.', en: 'The new Boxer comes in L2–L4 lengths and H1–H3 heights, with 120–180 hp BlueHDi and the 270 hp electric E-Boxer for zero-emission deliveries.' }, cats: ['van'] })
  ];

  /* derived fields */
  const COL = SP.COLORS, COLP = SP.COLORS_PRO;
  SP.MODELS.forEach((m, i) => {
    m.no = i + 1; m.status = m.status || 'sale';
    const P = (SP.PMEDIA || {})[m.id] || {}, w = SP.pimg || (u => u);
    const palette = m.seg === 'pro' ? COLP : COL;
    const sil = SP.carCut(m.shape, m.color);
    m.cut = SP.fb(P.cut && w(P.cut, 810), sil);
    m.hero = SP.fb(P.hero && w(P.hero, 1920), SP.carScene(m.shape, m.color, 'night'));
    m.gallery = [m.hero].concat((P.gallery || []).map(g => SP.fb(w(g, 1200), SP.carScene(m.shape, m.color, 'studio'))));
    if (m.gallery.length < 2) m.gallery = m.gallery.concat([SP.carScene(m.shape, palette[1].hex, 'night'), SP.carScene(m.shape, palette[0].hex, 'sand')]);
    /* colours: model-specific when importer colour photos exist, else the default palette (cut-out shown) */
    const all = COL.concat(COLP);
    m.palette = P.colors ? Object.keys(P.colors).map(id => Object.assign({}, all.find(c => c.id === id), { img: SP.fb(w(P.colors[id], 1200), SP.carCut(m.shape, (all.find(c => c.id === id) || {}).hex)) })).filter(c => c.id) : palette.slice(0, 5);
    m.palette.sort((a, b) => a.price - b.price);
    m.pdf = SP.PRICE_PDF(m.id);
    m.variants.forEach(x => {
      x.family = m; x.color = x.color || m.color;
      x.cut = x.fuel === 'ev' && P.cutE ? SP.fb(w(P.cutE, 810), SP.carCut(m.shape, x.color)) : x.color !== m.color && !P.cut ? SP.carCut(m.shape, x.color) : m.cut;
      x.gallery = m.gallery;
      x.versions.forEach((y, j) => { y.id = x.id + '-' + (j + 1); y.variant = x; y.promoP = y.promo; });
    });
    m.fuels = SP.FUEL_ORDER.filter(f => m.variants.some(x => x.versions.some(y => y.fuel === f)));
  });
  SP.colorImg = (m, colorId) => { const c = m.palette.find(x => x.id === colorId); return c && c.img || null; };
  /* private / business: promo prices apply to both (dealer / importer campaigns) */
  SP.applyMode = () => SP.MODELS.forEach(m => {
    m.variants.forEach(x => {
      x.versions.forEach(y => { y.variant = x; y.promo = y.promoP; if (y.promo != null && y.promo >= y.list) y.promo = null; y.best = y.promo || y.list; });
      x.from = x.versions.length ? Math.min(...x.versions.map(y => y.list)) : null; x.best = x.versions.length ? Math.min(...x.versions.map(y => y.best)) : null;
    });
    const all = m.variants.flatMap(x => x.versions);
    m.from = all.length ? Math.min(...all.map(y => y.list)) : null; m.best = all.length ? Math.min(...all.map(y => y.best)) : null;
    m.count = all.length; m.maxSave = all.length ? Math.max(...all.map(y => y.list - y.best)) : 0;
  });
  SP.applyMode();
})();
SP.model = id => SP.MODELS.find(m => m.id === id);
SP.variant = id => SP.MODELS.flatMap(m => m.variants).find(v => v.id === id);
SP.version = id => SP.MODELS.flatMap(m => m.variants).flatMap(v => v.versions).find(x => x.id === id);
SP.PRICES_VALID = '2026-11-30';

/* ---------------------------------------------------------------- CONFIGURATOR: dealer accessories & services (demo prices, VAT incl.) */
SP.ACCESSORIES = [
  { id: 'mats', name: { ro: 'Set covorașe originale', en: 'Genuine floor mats' }, price: 119, fits: 'all' },
  { id: 'tray', name: { ro: 'Tavă portbagaj / protecție podea marfă', en: 'Boot liner / load-floor protection' }, price: 129, fits: 'all' },
  { id: 'film', name: { ro: 'Folie protecție vopsea (față)', en: 'Paint protection film (front)' }, price: 590, fits: 'cars' },
  { id: 'tow', name: { ro: 'Cârlig remorcare detașabil, montat', en: 'Detachable tow bar, fitted' }, price: 850, fits: ['ice', 'hev', 'phev', 'diesel'] },
  { id: 'wallbox', name: { ro: 'Wallbox 11 kW, montaj inclus', en: '11 kW wallbox, installed' }, price: 1290, fits: ['ev', 'phev'] },
  { id: 'racking', name: { ro: 'Amenajare compartiment marfă (rafturi)', en: 'Load-area racking' }, price: 1790, fits: ['pro'] },
  { id: 'winter', name: { ro: 'Set roți iarnă complete', en: 'Complete winter wheel set' }, price: 1290, fits: 'all' },
  { id: 'service', name: { ro: 'Contract service 3 ani', en: '3-year service plan' }, price: 790, fits: 'all' },
  { id: 'warranty', name: { ro: 'Extensie garanție 5 ani / 100.000 km', en: 'Warranty extension 5 years / 100,000 km' }, price: 690, fits: 'all' }
];

/* ---------------------------------------------------------------- STOCK (demo — live: Sales Partner API GET /api/stock) */
(function () {
  const C = id => SP.COLORS.concat(SP.COLORS_PRO).find(c => c.id === id);
  /* id, model, variant, version index, colour, status, km, extra discount, location, advisor */
  const rows = [
    ['PG-2601', '208', '208', 0, 'okenite', 'stock', 0, 0, 'pantelimon', 'ri'], ['PG-2602', '208', '208', 3, 'elixir', 'stock', 0, 400, 'militari', 'gp'],
    ['PG-2603', '208', 'e-208', 1, 'vertigo', 'stock', 0, 1000, 'pantelimon', 'cs'], ['PG-2604', '2008', '2008', 0, 'selenium', 'stock', 0, 0, 'brasov', 'ab'],
    ['PG-2605', '2008', '2008', 5, 'okenite', 'transit', 0, 0, 'cluj', 'lm'], ['PG-2606', '2008', 'e-2008', 2, 'artense', 'demo', 2900, 2500, 'pantelimon', 'cs'],
    ['PG-2607', '308', '308', 1, 'vertigo', 'stock', 0, 600, 'pitesti', 'dn'], ['PG-2608', '308-sw', '308-sw', 4, 'artense', 'stock', 0, 0, 'ploiesti', 'ep'],
    ['PG-2609', '408', '408', 1, 'elixir', 'demo', 3400, 2000, 'otopeni', 'cs'], ['PG-2610', '3008', '3008', 0, 'nera', 'stock', 0, 0, 'pantelimon', 'ri'],
    ['PG-2611', '3008', 'e-3008', 1, 'titane', 'transit', 0, 0, 'otopeni', 'cs'], ['PG-2612', '3008', '3008-phev', 1, 'okenite', 'stock', 0, 1200, 'brasov', 'ab'],
    ['PG-2613', '5008', '5008', 0, 'artense', 'stock', 0, 0, 'militari', 'gp'], ['PG-2614', '5008', 'e-5008', 1, 'nera', 'demo', 4100, 3000, 'pantelimon', 'ri'],
    ['PG-2615', 'rifter', 'rifter', 0, 'artense', 'stock', 0, 0, 'ploiesti', 'ep'], ['PG-2616', 'traveller', 'e-traveller', 0, 'nera', 'stock', 0, 0, 'otopeni', 'ia'],
    ['PG-2617', 'partner', 'partner', 0, 'banquise', 'stock', 0, 0, 'otopeni', 'sv'], ['PG-2618', 'partner', 'e-partner', 0, 'banquise', 'transit', 0, 0, 'otopeni', 'sv'],
    ['PG-2619', 'expert', 'expert', 0, 'banquise', 'stock', 0, 0, 'otopeni', 'ia'], ['PG-2620', 'expert', 'e-expert', 1, 'artense', 'stock', 0, 800, 'otopeni', 'ia'],
    ['PG-2621', 'boxer', 'boxer', 2, 'banquise', 'stock', 0, 0, 'otopeni', 'sv'], ['PG-2622', '208', '208', 6, 'nera', 'stock', 0, 0, 'cluj', 'lm'],
    ['PG-2623', '2008', '2008', 6, 'vertigo', 'stock', 0, 500, 'pitesti', 'dn'], ['PG-2624', '308', 'e-308', 1, 'okenite', 'demo', 1800, 2500, 'militari', 'gp']
  ];
  SP.STOCK = rows.map(r => {
    const [id, mid, vid, vi, col, status, km, extra, loc, adv] = r;
    const m = SP.model(mid), variant = m.variants.find(x => x.id === vid), ver = variant.versions[Math.min(vi, variant.versions.length - 1)], c = C(col);
    const img = SP.colorImg(m, col) || variant.cut;
    return {
      id, versionId: ver.id, version: ver, variant, model: m, modelId: m.id, year: 2026, km, status,
      color: { name: c.name, hex: c.hex, price: c.price },
      vin: 'VR3' + (ver.fuel === 'ev' ? 'E' : 'U') + 'HZKXZ' + id.slice(-4) + 'R26',
      get priceList() { return ver.list + c.price; }, get price() { return ver.best + c.price - extra; }, extraDiscount: extra, location: loc, advisor: adv,
      img, gallery: [img].concat(m.gallery.slice(0, 3))
    };
  });
})();

/* ---------------------------------------------------------------- OFFERS (SP Campaigns, demo — "de la" prices shown on peugeot.ro, Oct 2026) */
SP.OFFERS = [
  { id: '208-promo', model: '208', cat: 'auto', tag: '208 · 16.780 €',
    title: { ro: 'Peugeot 208 de la 16.780 €', en: 'Peugeot 208 from €16,780' },
    lead: { ro: '208 Style Turbo 100 la preț promoțional de 16.780 € cu TVA, față de 21.200 € preț de listă. În limita stocului.', en: '208 Style Turbo 100 at a promotional €16,780 incl. VAT, versus a €21,200 list price. While stocks last.' }, valid: '2026-11-30', featured: true },
  { id: '2008-promo', model: '2008', cat: 'auto', tag: '2008 · 20.770 €',
    title: { ro: 'SUV 2008 de la 20.770 €', en: '2008 SUV from €20,770' },
    lead: { ro: '2008 Style Turbo 100 de la 20.770 € cu TVA. Hybrid 145 și E-2008 electric disponibile din stoc.', en: '2008 Style Turbo 100 from €20,770 incl. VAT. Hybrid 145 and electric E-2008 available from stock.' }, valid: '2026-11-30' },
  { id: '3008-hybrid', model: '3008', cat: 'auto', tag: '3008 · 31.650 €',
    title: { ro: 'Noul 3008 Hybrid de la 31.650 €', en: 'New 3008 Hybrid from €31,650' },
    lead: { ro: '3008 Allure Hybrid 145 la 31.650 € cu TVA, cu i-Cockpit Panoramic de serie.', en: '3008 Allure Hybrid 145 at €31,650 incl. VAT, with Panoramic i-Cockpit as standard.' }, valid: '2026-11-30' },
  { id: 'utilitare', model: 'partner', cat: 'auto', tag: 'Utilitare',
    title: { ro: 'Utilitare de la 19.040 € + TVA', en: 'Vans from €19,040 + VAT' },
    lead: { ro: 'Partner de la 19.040 € + TVA și Expert de la 23.690 € + TVA, cu finanțare pentru companii și service cu linie rapidă pentru flote.', en: 'Partner from €19,040 + VAT and Expert from €23,690 + VAT, with business finance and a fleet fast lane in service.' }, valid: '2026-12-31' },
  { id: 'finantare', model: null, cat: 'finance', tag: 'Leasing',
    title: { ro: 'Leasing și credit auto prin partenerii noștri', en: 'Leasing and car finance through our partners' },
    lead: { ro: 'Avans de la 10%, rate fixe și leasing operațional cu service inclus pentru companii. Ofertă în 24 de ore.', en: 'From 10% down, fixed instalments and operating lease with service included for companies. Quote within 24 hours.' }, valid: '2026-12-31' },
  { id: 'service-iarna', model: null, cat: 'service', tag: '−15%',
    title: { ro: 'Verificare gratuită de iarnă', en: 'Free winter check' },
    lead: { ro: 'Verificare gratuită în 20 de puncte și reduceri la anvelope, baterii și lichide, în toate cele 7 locații.', en: 'Free 20-point check and discounts on tyres, batteries and fluids, at all 7 locations.' }, valid: '2026-12-15' }
];
SP.OFFERS.forEach(o => { const m = o.model && SP.model(o.model); o.img = m ? m.hero : SP.placeImg(o.cat === 'service' ? 'service' : 'news', o.tag); });

/* ---------------------------------------------------------------- NEWS (CMS) */
SP.NEWS = [
  { id: 'e-3008-long-range', date: '2026-10-08', model: '3008', title: { ro: 'E-3008 Long Range: baterie de 98 kWh', en: 'E-3008 Long Range: a 98 kWh battery' }, lead: { ro: 'SUV-ul electric primește versiunea cu autonomie extinsă și 230 CP.', en: 'The electric SUV gets the extended-range, 230 hp version.' } },
  { id: '208-hybrid', date: '2026-09-22', model: '208', title: { ro: '208 Hybrid 145: mai multă putere, cutie automată', en: '208 Hybrid 145: more power, automatic gearbox' }, lead: { ro: 'Motorul hibrid de 145 CP cu cutie e-DCS6 ajunge pe 208 Allure și GT.', en: 'The 145 hp hybrid with the e-DCS6 gearbox arrives on 208 Allure and GT.' } },
  { id: 'e-boxer', date: '2026-09-05', model: 'boxer', title: { ro: 'E-Boxer: furgonul mare devine electric', en: 'E-Boxer: the large van goes electric' }, lead: { ro: '270 CP și versiuni Heavy L3H2 și L4H2 pentru livrări fără emisii.', en: '270 hp and Heavy L3H2 and L4H2 versions for zero-emission deliveries.' } },
  { id: 'itp-otopeni', date: '2026-08-20', model: null, title: { ro: 'Stație ITP nouă la Otopeni', en: 'New MOT (ITP) station in Otopeni' }, lead: { ro: 'Programezi ITP-ul online, în aceeași vizită cu revizia.', en: 'Book your MOT online, in the same visit as your service.' } }
];
SP.NEWS.forEach(n => { const m = n.model && SP.model(n.model); n.img = m ? m.hero : SP.placeImg('service', 'ITP'); });
SP.NEWS_BODY = {
  ro: ['Sales Partner Auto este un grup de dealeri multi-marcă, cu 7 locații în București, Ilfov, Brașov, Cluj, Pitești și Ploiești. Gama Peugeot cuprinde autoturisme pe benzină, hibride, plug-in hibride și 100% electrice, precum și vehiculele utilitare Partner, Expert și Boxer.', 'Vehiculele noi beneficiază de garanția producătorului, cu extensii disponibile, iar bateriile vehiculelor electrice au garanție separată conform condițiilor importatorului.', 'Programează un test drive în locația cea mai apropiată și primește o ofertă personalizată, cu finanțare, în 24 de ore.'],
  en: ['Sales Partner Auto is a multi-brand dealer group with 7 locations in Bucharest, Ilfov, Brașov, Cluj, Pitești and Ploiești. The Peugeot range includes petrol, hybrid, plug-in hybrid and fully electric cars, plus the Partner, Expert and Boxer vans.', 'New vehicles come with the manufacturer warranty and optional extensions, and EV batteries carry a separate warranty under the importer\'s terms.', 'Book a test drive at your nearest location and get a tailored quote, with finance, within 24 hours.']
};
