/* =====================================================================
   CORE — helpers, header, footer, shared components.
   Partials map 1:1 to CakePHP elements (header + mega menu, footer, card-model,
   card-stock, card-offer, card-news, lead-form).
   ===================================================================== */
(function () {
  const SP = window.SP;
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } } };
  SP.store = store;
  const qs = new URLSearchParams(location.search);
  SP.lang = (qs.get('lang') || store.get('spauto.lang') || 'ro') === 'en' ? 'en' : 'ro';
  SP.setLang = l => { SP.lang = l; store.set('spauto.lang', l); SP.render(); };
  const VATK = { 'c.vatPro': 'c.noVat', 'c.vat': 'c.noVat', 'c.withVat': 'c.noVat', 'c.vatIncl': 'c.noVat', 'c.recVat': 'c.recNoVat', 'cfg.totalNote': 'cfg.totalNoteB' };
  SP.t = k => { if (SP.biz && VATK[k]) k = VATK[k]; const v = (SP.I18N[SP.lang] || {})[k] || SP.I18N.ro[k] || k; return v.indexOf('{B}') < 0 ? v : v.replace(/\{B\}/g, SP.BRAND ? SP.BRAND.name : ''); };
  SP.L = v => (v && typeof v === 'object' && !Array.isArray(v) && ('ro' in v || 'en' in v)) ? (v[SP.lang] || v.ro) : v;
  SP.param = k => new URLSearchParams(location.search).get(k);
  SP.esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  /* private / business customer: all stored prices include VAT; companies see net prices */
  SP.biz = (qs.get('client') || store.get('spauto.client')) === 'business';
  SP.setBiz = b => { SP.biz = !!b; store.set('spauto.client', b ? 'business' : 'private'); SP.render(); };
  SP.vat = n => n == null ? n : (SP.biz ? n / 1.21 : n);
  SP.eur = n => { if (n == null) return '—'; n = SP.vat(n); const s = Math.round(n).toLocaleString(SP.lang === 'en' ? 'en-GB' : 'de-DE'); return SP.lang === 'en' ? '€' + s : s + ' €'; };
  SP.num = n => n.toLocaleString(SP.lang === 'en' ? 'en-GB' : 'de-DE');
  SP.date = (iso, o) => new Date(iso + 'T12:00:00').toLocaleDateString(SP.lang === 'en' ? 'en-GB' : 'ro-RO', o || { day: 'numeric', month: 'long', year: 'numeric' });
  SP.model = id => SP.MODELS.find(m => m.id === id);
  SP.ref = p => p + '-' + String(Math.floor(100000 + Math.random() * 899999));
  SP.monthly = (price, down = .2, n = 60, rate = .079) => { const P = price * (1 - down), r = rate / 12; return P * r / (1 - Math.pow(1 + r, -n)); };
  const t = SP.t, L = SP.L, esc = SP.esc;

  /* icons */
  const P = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>', arrowL: '<path d="M19 12H5M11 18l-6-6 6-6"/>', down: '<path d="m6 9 6 6 6-6"/>',
    left: '<path d="m15 18-6-6 6-6"/>', right: '<path d="m9 18 6-6-6-6"/>', menu: '<path d="M4 7h16M4 12h16M4 17h16"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>', minus: '<path d="M6 12h12"/>', plus: '<path d="M12 5v14M5 12h14"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>', wheel: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/><path d="M12 3v6.5M4.2 16.5l5.6-3.2M19.8 16.5l-5.6-3.2"/>',
    sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    doc: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
    download: '<path d="M12 4v11m0 0 4-4m-4 4-4-4M5 20h14"/>', car: '<path d="M5 17h14M3 17v-4l2.2-5.2A2 2 0 0 1 7 6.5h10a2 2 0 0 1 1.8 1.3L21 13v4"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>', bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/>', tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    headset: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="2" y="14" width="5" height="6" rx="2"/><rect x="17" y="14" width="5" height="6" rx="2"/>',
    book: '<path d="M4 4h10a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z"/><path d="M4 16a4 4 0 0 1 4-4h10"/>', alert: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>',
    box: '<path d="m3 7 9-4 9 4v10l-9 4-9-4z"/><path d="m3 7 9 4 9-4M12 11v10"/>', whatsapp: '<path d="M3 21l1.7-5A9 9 0 1 1 8 19.4z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1.2-1.2 2 1-.4 1.6c-3 .5-7.6-4-7-7l1.6-.4 1 2z"/>',
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
    pause: '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>', play: '<path d="M7 4.5v15l12-7.5z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'
  };
  SP.icon = (n, c) => '<svg class="ic ' + (c || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[n] || '') + '</svg>';
  const I = SP.icon;

  /* brand wordmark rendered as text (no official logo files in the demo; production: importer DAM logo) */
  SP.logo = cls => '<span class="wmark ' + (cls || '') + '" aria-label="' + SP.BRAND.name + '">' + SP.BRAND.word + '</span>';
  SP.groupLogo = cls => '<span class="glogo ' + (cls || '') + '"><b>SP</b><span>Sales Partner<small>Auto</small></span></span>';
  SP.brandIcon = b => '<span class="bico bico--' + b.id + '" aria-hidden="true">' + (b.id === 'omoda' ? 'O|J' : b.id === 'opel' ? 'OP' : b.id === 'citroen' ? 'C' : b.id === 'peugeot' ? 'P' : 'DS') + '</span>';

  SP.fuelChip = f => '<span class="etag">' + L(SP.FUEL[f]) + '</span>';
  SP.statusChip = s => '<span class="chip chip--st-' + s + '">' + t('status.' + s) + '</span>';
  SP.hoursOpen = () => { const d = new Date(), h = d.getHours() + d.getMinutes() / 60, wd = d.getDay(); return (wd >= 1 && wd <= 5 && h >= 8.5 && h < 18) || (wd === 6 && h >= 10 && h < 14); };
  /* price label for a family / variant: recommended "de la", or status */
  SP.fromLabel = x => x.status === 'soon' || (x.family && x.family.status === 'soon') ? t('c.soon') : x.status === 'request' || (x.family && x.family.status === 'request') || x.from == null ? t('c.onRequest') : t('c.from') + ' ' + SP.eur(x.from);
  SP.bestLabel = x => (x.best != null && x.best < x.from) ? t('c.promoFrom') + ' ' + SP.eur(x.best) : '';

  /* ---------- header: group bar (brand switcher) + Peugeot header with mega menus (peugeot.ro style) ---------- */
  const ACTIVE = { home: '', models: 'cars', model: 'cars', prices: 'buy', configurator: 'buy', stock: 'buy', vehicle: 'buy', offers: 'buy', offer: 'buy', pro: 'pro', service: 'service', brochures: 'buy', locations: 'locations', location: 'locations', news: '', article: '', contact: '', request: '' };
  SP.segModels = seg => SP.MODELS.filter(m => seg === 'all' || m.seg === seg || (seg === 'ev' && m.fuels.some(f => f === 'ev' || f === 'phev' || f === 'hev')));
  SP.energyTags = m => '<span class="etags">' + m.fuels.map(f => '<span class="etag">' + L(SP.FUEL[f]) + '</span>').join('') + '</span>';
  const megaTile = m => '<li data-fuels="' + m.fuels.join(' ') + '"><a href="model.html?m=' + m.id + '"><span class="mega__img"><img src="' + m.cut + '" alt="" loading="lazy"></span><strong>' + SP.BRAND.word + ' ' + m.name + (m.isNew ? '<em>' + t('c.new') + '</em>' : '') + '</strong>' + SP.energyTags(m) + '<small>' + (m.best < m.from ? t('c.from') + ' <b>' + SP.eur(m.best) + '</b> <s>' + SP.eur(m.from) + '</s>' : SP.fromLabel(m)) + (m.from ? ' ' + t(m.seg === 'pro' ? 'c.vatPro' : 'c.vat') : '') + '</small></a></li>';
  function mega(seg) {
    const list = SP.segModels(seg), fuels = SP.FUEL_ORDER.filter(f => list.some(m => m.fuels.includes(f)));
    return '<div class="mega" data-mega><div class="container"><div class="mega__h"><div class="epills" role="group" aria-label="' + t('st.fuel') + '"><button type="button" aria-pressed="true" data-ef="all">' + t('f.all') + '</button>' + fuels.map(f => '<button type="button" aria-pressed="false" data-ef="' + f + '">' + L(SP.FUEL[f]) + '</button>').join('') + '</div><a class="link link--sm" href="modele.html' + (seg === 'pro' ? '?seg=pro' : '') + '">' + t(seg === 'pro' ? 'mega.allPro' : 'mega.all') + I('arrow') + '</a></div>' +
      '<ul class="mega__g">' + list.map(megaTile).join('') + '</ul>' +
      '<div class="mega__f"><a href="configurator.html">' + I('sliders') + t('nav.config') + '</a><a href="preturi.html">' + I('tag') + t('nav.prices') + '</a><a href="solicita.html?tip=oferta">' + I('doc') + t('nav.offer') + '</a><a href="stoc.html">' + I('car') + t('nav.stock') + '</a><a href="brosuri.html">' + I('download') + t('nav.brochures') + '</a></div></div></div>';
  }
  const BUY = [['nav.prices', 'preturi.html'], ['nav.config', 'configurator.html'], ['nav.stock', 'stoc.html'], ['nav.offers', 'oferte.html'], ['nav.offer', 'solicita.html?tip=oferta'], ['nav.testdrive', 'solicita.html?tip=test-drive'], ['nav.brochures', 'brosuri.html']];
  const SVC = [['nav.booking', 'service.html#programare'], ['nav.warranty', 'service.html#garantie'], ['nav.assist', 'service.html#asistenta'], ['nav.recall', 'service.html#rechemare'], ['nav.accessories', 'service.html#accesorii']];
  const NAV = [['cars', 'modele.html', 'mega'], ['pro', 'modele.html?seg=pro', 'megapro'], ['ev', 'modele.html?seg=ev'], ['buy', 'preturi.html', BUY], ['business', 'profesionisti.html'], ['service', 'service.html', SVC], ['locations', 'locatii.html']];
  const GNAV = [['brands', 'index.html#marci'], ['stock', 'stoc.html'], ['offers', 'oferte.html'], ['service', 'service.html'], ['locations', 'locatii.html'], ['contact', 'contact.html']];
  const custSeg = cls => '<div class="cust ' + (cls || '') + '" role="group" aria-label="' + t('cust.label') + '"><button type="button" data-cust="private" aria-pressed="' + !SP.biz + '">' + t('cust.private') + '</button><button type="button" data-cust="business" aria-pressed="' + SP.biz + '">' + t('cust.business') + '</button></div>';
  SP.custSeg = custSeg;
  /* brand switcher (group shell): full / phase-2 brands as words, DS & Opel as icons */
  SP.brandBar = (cur, cls) => '<nav class="bbar ' + (cls || '') + '" aria-label="' + t('g.brands') + '"><a class="bbar__g' + (cur === 'group' ? ' is-on' : '') + '" href="index.html">' + t('g.all') + '</a>' +
    SP.BRANDS.map(b => b.status === 'icon' ? '<a class="bbar__i" href="' + b.home + '" title="' + b.name + '">' + SP.brandIcon(b) + '</a>' : '<a class="bbar__b' + (cur === b.id ? ' is-on' : '') + '" href="' + b.home + '">' + b.word + (b.status === 'soon' ? '<small>' + t('g.soon') + '</small>' : '') + '</a>').join('') + '</nav>';

  SP.header = function (page) {
    const group = page === 'group' || page === 'brand', act = ACTIVE[page];
    const lang = '<span class="lang"><button data-lang="ro" class="' + (SP.lang === 'ro' ? 'is-on' : '') + '">RO</button><button data-lang="en" class="' + (SP.lang === 'en' ? 'is-on' : '') + '">EN</button></span>';
    const open = SP.hoursOpen();
    const top = '<div class="topbar"><div class="container topbar__in">' + SP.brandBar(group ? (page === 'brand' ? SP.param('b') : 'group') : 'peugeot', 'bbar--top') + '<span class="topbar__r"><span class="dotst ' + (open ? 'is-open' : '') + '">' + t(open ? 'c.open' : 'c.closedNow') + '</span>' +
      '<a href="tel:' + SP.DEALER.phone.replace(/\s/g, '') + '">' + I('phone') + SP.DEALER.phone + '</a>' + custSeg('cust--top') + lang + '</span></div></div>';
    let items, drawer, brand;
    if (group) {
      brand = '<a class="brand" href="index.html" aria-label="Sales Partner Auto">' + SP.groupLogo() + '</a>';
      items = GNAV.map(n => '<li class="nav__i"><a href="' + n[1] + '">' + t('g.nav.' + n[0]) + '</a></li>').join('');
      drawer = GNAV.map(n => '<li><a class="drawer__a" href="' + n[1] + '">' + t('g.nav.' + n[0]) + '</a></li>').join('');
    } else {
      brand = '<a class="brand" href="peugeot.html" aria-label="' + SP.BRAND.name + ' · Sales Partner Auto">' + SP.logo() + '<span class="brand__d">Sales Partner Auto<small>' + t('dealer.short') + '</small></span></a>';
      items = NAV.map(n => '<li class="nav__i' + (act === n[0] ? ' is-on' : '') + (n[2] ? ' has-sub' : '') + (n[2] === 'mega' || n[2] === 'megapro' ? ' has-mega' : '') + '"><a href="' + n[1] + '">' + t('nav.' + n[0]) + (n[2] ? I('down', 'chev') : '') + '</a>' +
        (n[2] === 'mega' ? mega('cars') : n[2] === 'megapro' ? mega('pro') : n[2] ? '<ul class="drop">' + n[2].map(s => '<li><a href="' + s[1] + '">' + t(s[0]) + '</a></li>').join('') + '</ul>' : '') + '</li>').join('');
      drawer = NAV.map(n => {
        const subs = n[2] === 'mega' ? SP.segModels('cars').map(m => [m.name, 'model.html?m=' + m.id]) : n[2] === 'megapro' ? SP.segModels('pro').map(m => [m.name, 'model.html?m=' + m.id]) : (n[2] || []).map(s => [t(s[0]), s[1]]);
        return subs.length ? '<li><details><summary>' + t('nav.' + n[0]) + I('down') + '</summary><ul>' + (n[2] === 'mega' ? '<li><a href="modele.html">' + t('mega.all') + '</a></li>' : '') + subs.map(s => '<li><a href="' + s[1] + '">' + s[0] + '</a></li>').join('') + '</ul></details></li>'
          : '<li><a class="drawer__a" href="' + n[1] + '">' + t('nav.' + n[0]) + '</a></li>';
      }).join('');
    }
    return top + '<header class="hdr' + (group ? ' hdr--group' : '') + '" id="hdr"><div class="container hdr__in">' +
      '<button class="burger" type="button" aria-label="' + t('nav.menu') + '" data-open>' + I('menu') + '</button>' + brand +
      '<nav class="nav" aria-label="Main"><ul>' + items + '</ul></nav>' +
      '<div class="hdr__cta"><a class="btn btn--ink btn--sm" href="' + (group ? 'solicita.html?tip=oferta' : 'solicita.html?tip=test-drive') + '">' + t(group ? 'nav.offer' : 'nav.testdrive') + '</a></div>' +
      '</div></header>' +
      '<div class="drawer" id="drawer" hidden><div class="drawer__p"><div class="drawer__h">' + (group ? SP.groupLogo() : SP.logo()) + '<button type="button" class="drawer__x" aria-label="' + t('nav.close') + '" data-close>' + I('x') + '</button></div>' +
      SP.brandBar(group ? 'group' : 'peugeot', 'bbar--drawer') + custSeg('cust--drawer') + '<ul class="drawer__l">' + drawer + '</ul>' +
      '<div class="drawer__f"><a class="btn btn--ink btn--block" href="solicita.html?tip=test-drive">' + t('nav.testdrive') + '</a><a class="btn btn--line btn--block" href="tel:' + SP.DEALER.phone.replace(/\s/g, '') + '">' + I('phone') + SP.DEALER.phone + '</a>' + lang + '</div></div></div>';
  };

  /* ---------- quick actions: bottom bar (mobile) — peugeot.ro: Configurator / Listă de prețuri / Solicită o ofertă ---------- */
  SP.actionbar = () => '<nav class="abar" aria-label="Quick actions"><a href="configurator.html">' + I('sliders') + t('nav.config') + '</a><a href="preturi.html">' + I('tag') + t('nav.pricesShort') + '</a><a href="solicita.html?tip=oferta">' + I('doc') + t('nav.offerShort') + '</a><a href="locatii.html">' + I('pin') + t('nav.dealer') + '</a></nav>';

  /* ---------- footer (black) ---------- */
  SP.footer = function () {
    const page = document.body.dataset.page, group = page === 'group' || page === 'brand';
    const col = (h, l) => '<div class="fcol"><h4>' + h + '</h4><ul>' + l.map(x => '<li><a href="' + x[1] + '">' + x[0] + '</a></li>').join('') + '</ul></div>';
    const legal = [['ft.privacy', 'confidentialitate'], ['ft.cookies', 'cookies'], ['ft.legalNotes', 'mentiuni-legale'], ['ft.anpc', 'anpc'], ['ft.legal', 'mentiune-legala']];
    const hrs = (title, list) => '<div class="fhours"><h4>' + title + '</h4><table>' + list.map(h => '<tr><th>' + L(h.d) + '</th><td>' + (h.h || t('c.closed')) + '</td></tr>').join('') + '</table></div>';
    return '<div class="fquick"><div class="container fquick__in"><a href="contact.html">' + I('mail') + t('ft.q1') + '</a><a href="locatii.html">' + I('pin') + t('ft.q2') + '</a><a href="solicita.html?tip=oferta">' + I('doc') + t('ft.q3') + '</a></div></div>' +
      '<footer class="ftr"><div class="container">' +
      '<div class="ftr__top"><div class="ftr__brand">' + (group ? SP.groupLogo('glogo--w') : SP.logo('wmark--w')) + '<p>' + SP.DEALER.name + ' · ' + t('dealer.tag') + '. ' + t('ft.importer') + '</p>' + SP.brandBar(group ? 'group' : 'peugeot', 'bbar--ftr') +
      '<div class="social">' + ['Facebook', 'Instagram', 'YouTube', 'TikTok', 'LinkedIn'].map(s => '<a href="#" aria-label="' + s + '">' + s.slice(0, 2) + '</a>').join('') + '</div></div>' +
      '<div class="ftr__loc">' + SP.LOCATIONS.map(l => '<div><h4><a href="locatie.html?id=' + l.id + '">' + L(l.short) + '</a></h4><p>' + l.address + '</p><p><a href="tel:' + l.phone.replace(/\s/g, '') + '">' + l.phone + '</a></p></div>').join('') + '</div>' +
      '<div class="ftr__hrs">' + hrs(t('ft.hSales'), SP.DEALER.hours) + hrs(t('ft.hService'), SP.DEALER.hoursService) + '</div></div>' +
      '<div class="ftr__cols">' +
      col(L(SP.SEG.cars), SP.segModels('cars').map(m => [SP.BRAND.name + ' ' + m.name, 'model.html?m=' + m.id]).concat([[t('mega.all'), 'modele.html']])) +
      col(L(SP.SEG.pro), SP.segModels('pro').map(m => [SP.BRAND.name + ' ' + m.name, 'model.html?m=' + m.id]).concat([[t('nav.business'), 'profesionisti.html']])) +
      col(t('ft.buy'), [[t('nav.prices'), 'preturi.html'], [t('nav.config'), 'configurator.html'], [t('nav.stock'), 'stoc.html'], [t('nav.offers'), 'oferte.html'], [t('nav.testdrive'), 'solicita.html?tip=test-drive'], [t('nav.offer'), 'solicita.html?tip=oferta'], [t('nav.brochures'), 'brosuri.html']]) +
      col(t('ft.service'), [[t('nav.booking'), 'service.html#programare'], [t('nav.warranty'), 'service.html#garantie'], [t('nav.assist'), 'service.html#asistenta'], [t('nav.recall'), 'service.html#rechemare'], [t('nav.locations'), 'locatii.html'], [t('nav.news'), 'stiri.html'], [t('nav.contact'), 'contact.html']]) +
      '<div class="fcol fcol--nl"><h4>' + t('ft.newsletter') + '</h4><p>' + t('ft.newsletterD') + '</p><form class="nl" data-nl novalidate><label class="sr" for="nl">Email</label><input id="nl" type="email" placeholder="' + t('f.emailPh') + '"><button class="btn btn--white btn--sm" type="submit">' + t('ft.subscribe') + '</button></form></div>' +
      '</div>' +
      '<div class="ftr__legal">' + legal.map(x => '<a href="legal.html?doc=' + x[1] + '">' + t(x[0]) + '</a>').join('<span>|</span>') + '<span>|</span><a href="sitemap.html">' + t('ft.sitemap') + '</a></div>' +
      '<div class="ftr__bottom"><p>© 2026 ' + SP.DEALER.legal.company + ' · ' + SP.DEALER.legal.reg + ' · ' + SP.DEALER.legal.cui + '</p><p class="ftr__demo">' + t('ft.demo') + '</p>' +
      '<div class="anpc"><a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener"><small>ANPC</small>SAL</a><a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener"><small>EU</small>SOL</a></div></div>' +
      '</div></footer>';
  };

  /* ---------- shared cards ---------- */
  SP.modelTile = m => '<a class="mtile" href="model.html?m=' + m.id + '"><span class="mtile__img"><img src="' + m.cut + '" alt="' + m.name + '" loading="lazy"></span><span class="mtile__n">' + m.name + (m.isNew ? '<em>' + t('c.new') + '</em>' : '') + '</span><small>' + SP.fromLabel(m) + '</small>' + (SP.bestLabel(m) ? '<small class="mtile__r">' + SP.bestLabel(m) + '</small>' : '') + '</a>';
  SP.modelCard = m => '<article class="mcard" data-fuels="' + m.fuels.join(' ') + '"><a href="model.html?m=' + m.id + '" class="mcard__stage"><span class="mcard__no">' + String(m.no).padStart(2, '0') + '</span><img src="' + m.cut + '" alt="' + m.name + '" loading="lazy"></a>' +
    '<div class="mcard__b"><div class="mcard__top">' + m.fuels.map(SP.fuelChip).join('') + (m.isNew ? '<span class="chip chip--new">' + t('c.new') + '</span>' : '') + '</div>' +
    '<h3><a href="model.html?m=' + m.id + '">' + m.name + '</a></h3><p>' + L(m.tagline) + '</p>' +
    '<div class="mcard__price"><strong>' + SP.fromLabel(m) + '</strong>' + (m.from ? '<small>' + t('c.recVat') + '</small>' : '') + (SP.bestLabel(m) ? '<small class="mcard__r">' + SP.bestLabel(m) + '</small>' : '') + '</div>' +
    '<div class="mcard__cta"><a class="btn btn--ink btn--sm" href="model.html?m=' + m.id + '">' + t('c.explore') + '</a>' + (m.count ? '<a class="btn btn--line btn--sm" href="preturi.html?m=' + m.id + '">' + t('c.seePrices') + '</a>' : '<a class="btn btn--line btn--sm" href="solicita.html?tip=oferta&m=' + m.id + '">' + t('c.notify') + '</a>') + '</div></div></article>';

  SP.stockCard = v => '<article class="scard"><a class="scard__stage" href="vehicul.html?id=' + v.id + '">' + SP.statusChip(v.status) + '<img src="' + v.img + '" alt="' + esc(v.variant.name) + '" loading="lazy"><span class="scard__n">' + I('camera') + v.gallery.length + '</span></a>' +
    '<div class="scard__b"><p class="scard__k"><span>' + v.year + ' · ' + SP.num(v.km) + ' km</span></p><h3><a href="vehicul.html?id=' + v.id + '">' + v.variant.name + ' <span>' + SP.L(v.version.trim) + '</span></a></h3>' +
    '<ul class="scard__chips"><li>' + L(SP.FUEL[v.version.fuel]) + '</li><li>' + esc(SP.L(v.version.engine)) + '</li><li>' + L(v.color.name) + '</li></ul>' +
    '<div class="scard__f"><div class="scard__p">' + (v.priceList > v.price ? '<s>' + SP.eur(v.priceList) + '</s>' : '') + '<strong>' + SP.eur(v.price) + '</strong><small>' + t('c.vat') + '' + ' · ' + t('v.rate') + ' ' + SP.eur(SP.monthly(v.price)) + '/' + t('c.month') + '</small></div><a class="iconbtn" href="vehicul.html?id=' + v.id + '" aria-label="' + t('c.details') + '">' + I('arrow') + '</a></div></div></article>';

  SP.offerCard = o => '<article class="ocard"><a class="ocard__img" href="oferta.html?id=' + o.id + '"><img src="' + o.img + '" alt="" loading="lazy"><span class="ocard__tag">' + esc(o.tag) + '</span></a>' +
    '<div class="ocard__b"><p class="kicker">' + (o.model ? SP.BRAND.name + ' ' + SP.model(o.model).name : SP.DEALER.name) + ' · ' + t('of.cat.' + o.cat) + '</p><h3><a href="oferta.html?id=' + o.id + '">' + L(o.title) + '</a></h3><p>' + L(o.lead) + '</p>' +
    '<div class="ocard__f"><a class="link" href="oferta.html?id=' + o.id + '">' + t('c.details') + I('arrow') + '</a><small>' + t('c.valid') + ' ' + SP.date(o.valid, { day: '2-digit', month: '2-digit', year: 'numeric' }) + '</small></div></div></article>';

  SP.newsCard = n => '<article class="ncard"><a class="ncard__img" href="stire.html?id=' + n.id + '"><img src="' + n.img + '" alt="" loading="lazy"></a><div class="ncard__b"><p class="kicker">' + SP.BRAND.name + ' · ' + SP.date(n.date, { day: 'numeric', month: 'long' }) + '</p>' +
    '<h3><a href="stire.html?id=' + n.id + '">' + L(n.title) + '</a></h3><p>' + L(n.lead) + '</p><a class="link" href="stire.html?id=' + n.id + '">' + t('c.read') + I('arrow') + '</a></div></article>';

  SP.shead = (eyebrow, title, sub, link) => '<div class="shead"><div><p class="eyebrow">' + eyebrow + '</p><h2 class="h2">' + title + '</h2>' + (sub ? '<p class="shead__sub">' + sub + '</p>' : '') + '</div>' + (link ? '<a class="link" href="' + link[1] + '">' + link[0] + I('arrow') + '</a>' : '') + '</div>';
  SP.phead = (eyebrow, title, sub) => '<section class="phead"><div class="container"><p class="eyebrow">' + eyebrow + '</p><h1 class="h1">' + title + '</h1>' + (sub ? '<p class="phead__sub">' + sub + '</p>' : '') + '</div></section>';

  /* ---------- lead form (→ Sales Partner Lead Collector) ---------- */
  const COUNTIES = ['București', 'Ilfov', 'Alba', 'Arad', 'Argeș', 'Bacău', 'Bihor', 'Bistrița-Năsăud', 'Botoșani', 'Brăila', 'Brașov', 'Buzău', 'Călărași', 'Caraș-Severin', 'Cluj', 'Constanța', 'Covasna', 'Dâmbovița', 'Dolj', 'Galați', 'Giurgiu', 'Gorj', 'Harghita', 'Hunedoara', 'Ialomița', 'Iași', 'Maramureș', 'Mehedinți', 'Mureș', 'Neamț', 'Olt', 'Prahova', 'Sălaj', 'Satu Mare', 'Sibiu', 'Suceava', 'Teleorman', 'Timiș', 'Tulcea', 'Vâlcea', 'Vaslui', 'Vrancea'];
  let seq = 0;
  SP.field = (id, name, label, input, full) => '<div class="field' + (full ? ' field--full' : '') + '"><label for="' + id + '">' + label + '</label>' + input + '<span class="err" data-err="' + name + '"></span></div>';
  SP.leadForm = function (o) {
    o = o || {}; const id = 'lf' + (++seq), F = SP.field;
    return '<form class="lead" data-lead novalidate data-type="' + (o.type || 'offer') + '" data-ctx="' + esc(o.ctx || '') + '"><div class="grid-f">' +
      (o.model !== undefined && !o.hideModel ? F(id + 'm', 'model', t('f.model'), '<select id="' + id + 'm" name="model">' + SP.MODELS.map(m => '<option value="' + m.id + '"' + (m.id === o.model ? ' selected' : '') + '>' + m.name + '</option>').join('') + '</select>', true) : '') +
      F(id + 'n', 'name', t('f.name') + ' *', '<input id="' + id + 'n" name="name" autocomplete="name" placeholder="' + t('f.namePh') + '">') +
      F(id + 'p', 'phone', t('f.phone') + ' *', '<input id="' + id + 'p" name="phone" type="tel" autocomplete="tel" placeholder="' + t('f.phonePh') + '">') +
      F(id + 'e', 'email', t('f.email') + ' *', '<input id="' + id + 'e" name="email" type="email" autocomplete="email" placeholder="' + t('f.emailPh') + '">') +
      F(id + 'c', 'county', t('f.county'), '<select id="' + id + 'c" name="county">' + COUNTIES.map(c => '<option>' + c + '</option>').join('') + '</select>') +
      (o.when ? F(id + 'w', 'when', t('f.when'), '<select id="' + id + 'w" name="when"><option>' + t('f.asap') + '</option><option>' + t('f.morning') + '</option><option>' + t('f.afternoon') + '</option><option>' + t('f.evening') + '</option></select>', true) : '') +
      (o.message ? F(id + 'g', 'message', t('f.msg'), '<textarea id="' + id + 'g" name="message" rows="3"></textarea>', true) : '') +
      '</div><label class="check"><input type="checkbox" name="gdpr"><span>' + t('f.gdpr') + ' <a href="legal.html?doc=confidentialitate">' + t('ft.privacy') + '</a></span></label><span class="err" data-err="gdpr"></span>' +
      '<label class="check"><input type="checkbox" name="mkt"><span>' + t('f.mkt') + '</span></label>' +
      '<button class="btn btn--ink btn--block" type="submit">' + (o.submit || t('f.send')) + I('arrow') + '</button></form>';
  };
  SP.validate = function (f) {
    const v = n => (f.elements[n] && f.elements[n].value || '').trim(), e = {};
    if (f.elements.name && v('name').length < 3) e.name = t('f.errName');
    if (f.elements.phone && !/^[+0-9 ()-]{9,}$/.test(v('phone'))) e.phone = t('f.errPhone');
    if (f.elements.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v('email'))) e.email = t('f.errEmail');
    if (f.elements.gdpr && !f.elements.gdpr.checked) e.gdpr = t('f.errGdpr');
    f.querySelectorAll('[data-err]').forEach(x => { x.textContent = e[x.dataset.err] || ''; });
    f.querySelectorAll('input,select,textarea').forEach(x => x.toggleAttribute('aria-invalid', !!e[x.name]));
    const k = Object.keys(e)[0]; if (k && f.elements[k]) f.elements[k].focus();
    return !k;
  };
  SP.done = (title, text, ref, extra) => '<div class="done" role="status"><span class="done__i">' + I('check') + '</span><h3>' + title + '</h3><p>' + text + ' <strong>' + ref + '</strong></p>' + (extra || '') + '</div>';

  /* ---------- lightbox / toast ---------- */
  SP.lightbox = function (imgs, i) {
    i = i || 0; const el = document.createElement('div'); el.className = 'lb';
    el.innerHTML = '<button class="lb__x" aria-label="' + t('nav.close') + '">' + I('x') + '</button><button class="lb__p" aria-label="prev">' + I('left') + '</button><img alt=""><button class="lb__n" aria-label="next">' + I('right') + '</button><span class="lb__c"></span>';
    const draw = () => { el.querySelector('img').src = imgs[i]; el.querySelector('.lb__c').textContent = (i + 1) + ' / ' + imgs.length; };
    const close = () => { el.remove(); document.removeEventListener('keydown', key); document.body.classList.remove('noscroll'); };
    const key = e => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') { i = (i + 1) % imgs.length; draw(); } if (e.key === 'ArrowLeft') { i = (i - 1 + imgs.length) % imgs.length; draw(); } };
    el.addEventListener('click', e => { if (e.target.closest('.lb__x') || e.target === el) close(); else if (e.target.closest('.lb__n')) { i = (i + 1) % imgs.length; draw(); } else if (e.target.closest('.lb__p')) { i = (i - 1 + imgs.length) % imgs.length; draw(); } });
    document.addEventListener('keydown', key); document.body.appendChild(el); document.body.classList.add('noscroll'); draw();
  };
  SP.toast = msg => { let el = document.querySelector('.toast'); if (!el) { el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); } el.textContent = msg; el.classList.add('is-on'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('is-on'), 2400); };

  function chrome() {
    document.querySelectorAll('.cookie,.demo-badge').forEach(e => e.remove());
    const b = document.createElement('a'); b.className = 'demo-badge'; b.href = 'https://salespartner.ro'; b.target = '_blank'; b.rel = 'noopener'; b.textContent = 'DEMO · Sales Partner'; document.body.appendChild(b);
    if (store.get('spauto.cookies')) return;
    const c = document.createElement('div'); c.className = 'cookie';
    c.innerHTML = '<p>' + t('ck.text') + ' <a href="legal.html?doc=cookies">' + t('ck.more') + '</a></p><div><button class="btn btn--line btn--sm" data-ck="n">' + t('ck.necessary') + '</button><button class="btn btn--ink btn--sm" data-ck="a">' + t('ck.accept') + '</button></div>';
    c.addEventListener('click', e => { const k = e.target.closest('[data-ck]'); if (k) { store.set('spauto.cookies', k.dataset.ck); c.remove(); } });
    document.body.appendChild(c);
  }

  function bind() {
    document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => SP.setLang(b.dataset.lang)));
    document.querySelectorAll('[data-cust]').forEach(b => b.addEventListener('click', () => { const z = b.dataset.cust === 'business'; if (z !== SP.biz) { SP.setBiz(z); SP.toast(t(z ? 'cust.toastB' : 'cust.toastP')); } }));
    document.querySelectorAll('[data-mega]').forEach(m => m.querySelectorAll('[data-ef]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); m.querySelectorAll('[data-ef]').forEach(x => x.setAttribute('aria-pressed', String(x === b))); m.querySelectorAll('.mega__g li').forEach(li => { li.hidden = b.dataset.ef !== 'all' && !li.dataset.fuels.split(' ').includes(b.dataset.ef); }); })));
    const dr = document.getElementById('drawer');
    document.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => { dr.hidden = false; document.body.classList.add('noscroll'); }));
    document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => { dr.hidden = true; document.body.classList.remove('noscroll'); }));
    dr.addEventListener('click', e => { if (e.target === dr) { dr.hidden = true; document.body.classList.remove('noscroll'); } });
    const hdr = document.getElementById('hdr'); const sc = () => hdr.classList.toggle('is-scrolled', scrollY > 20);
    window.removeEventListener('scroll', SP._sc || (() => { })); SP._sc = sc; window.addEventListener('scroll', sc, { passive: true }); sc();
    document.querySelectorAll('[data-nl]').forEach(f => f.addEventListener('submit', e => { e.preventDefault(); const i = f.querySelector('input'); if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value.trim())) { i.setAttribute('aria-invalid', ''); i.focus(); return; } f.innerHTML = '<p class="nl__ok">' + I('check') + t('ft.subscribed') + '</p>'; }));
    document.querySelectorAll('form[data-lead]').forEach(f => f.addEventListener('submit', e => {
      e.preventDefault(); if (!SP.validate(f)) return;
      /* Integration point: POST /api/leads → Sales Partner Lead Collector (source = Website, type, model, context) */
      f.outerHTML = SP.done(t('f.ok'), t('f.okD'), '#' + SP.ref('WEB'));
    }));
    document.querySelectorAll('[data-lightbox]').forEach(el => el.addEventListener('click', e => { e.preventDefault(); SP.lightbox(JSON.parse(el.dataset.lightbox), +(el.dataset.index || 0)); }));
  }

  /* image fallback: importer media that fails to load is replaced by the neutral silhouette (SP.FB) */
  window.addEventListener('error', e => { const el = e.target; if (el && el.tagName === 'IMG' && !el.dataset.fb) { const k = Object.keys(SP.FB || {}).find(u => el.src === u || el.src === encodeURI(u)); el.dataset.fb = '1'; if (k) { el.src = SP.FB[k]; el.classList.add('is-fb'); } } }, true);

  SP.render = function () {
    const page = document.body.dataset.page || 'home';
    if (SP.applyMode) SP.applyMode();
    document.documentElement.lang = SP.lang;
    document.getElementById('site-header').innerHTML = SP.header(page);
    document.getElementById('site-footer').innerHTML = SP.footer() + (page === 'configurator' ? '' : SP.actionbar());
    const fn = SP.pages[page] || SP.pages.notfound, out = fn();
    document.getElementById('main').innerHTML = out.html;
    document.title = (out.title ? out.title + ' · ' : '') + (['group', 'brand'].includes(document.body.dataset.page) ? 'Sales Partner Auto' : SP.BRAND.name + ' · Sales Partner Auto');
    bind(); if (out.bind) out.bind(document.getElementById('main'));
    chrome();
    if (location.hash) { const el = document.getElementById(location.hash.slice(1)); if (el) setTimeout(() => el.scrollIntoView(), 50); }
  };
  document.addEventListener('DOMContentLoaded', SP.render);
})();
