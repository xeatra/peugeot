/* =====================================================================
   PAGES — group shell: group home (all brands, all locations) · brand page (phase-2 / icon brands)
   ===================================================================== */
(function () {
  const SP = window.SP; SP.pages = SP.pages || {};
  const t = SP.t, L = v => SP.L(v), I = SP.icon;

  /* ================================================================ GROUP HOME */
  SP.pages.group = function () {
    const p = SP.BRANDS[0], m3 = SP.model('3008');
    const hero = '<section class="ghero"><img src="' + SP.bannerImg('group', SP.carScene('suv', '#2B3440', 'dusk', 'PLACEHOLDER · IMAGINE GRUP')) + '" alt="" fetchpriority="high"><div class="container ghero__in"><p class="eyebrow">' + t('g.heroK') + '</p><h1 class="h1">' + t('g.heroT') + '</h1><p class="ghero__d">' + t('g.heroD') + '</p>' +
      '<div class="btnrow"><a class="btn btn--white" href="#marci">' + t('g.heroC1') + I('arrow') + '</a><a class="btn btn--glass" href="locatii.html">' + t('g.heroC2') + '</a></div>' +
      '<ul class="gstats"><li><strong>' + SP.BRANDS.length + '</strong>' + t('g.st1') + '</li><li><strong>' + SP.LOCATIONS.length + '</strong>' + t('g.st2') + '</li><li><strong>' + SP.STOCK.length + '</strong>' + t('g.st3') + '</li><li><strong>' + SP.LOCATIONS.filter(l => l.types.includes('service')).length + '</strong>' + t('g.st4') + '</li></ul></div></section>';

    const tile = b => {
      const full = b.status === 'full', locs = SP.LOCATIONS.filter(l => l.brands.includes(b.id)).length;
      return '<a class="btile btile--' + b.status + ' btile--' + b.id + '" href="' + b.home + '">' +
        (full ? '<img src="' + m3.hero + '" alt="" loading="lazy">' : '') + '<span class="btile__w">' + b.word + '</span>' +
        '<span class="btile__d">' + (full ? t('g.full').replace('{n}', SP.MODELS.length) + ' · ' + t('c.from') + ' ' + SP.eur(Math.min(...SP.MODELS.map(m => m.best))) : b.status === 'soon' ? t('g.soonD') : t('g.iconD')) + '</span>' +
        '<span class="btile__f"><small>' + I('pin') + locs + ' ' + t('lo.count') + '</small>' + (b.status === 'soon' ? '<em>' + t('g.soon') + '</em>' : '') + I('arrow') + '</span></a>';
    };
    const brands = '<section class="section" id="marci"><div class="container">' + SP.shead(t('g.brandsK'), t('g.brandsT'), t('g.brandsD')) + '<div class="bgrid">' + SP.BRANDS.map(tile).join('') + '</div></div></section>';

    const quick = '<section class="qlinks"><div class="container qlinks__in">' + [['car', 'nav.stock', 'g.q1', 'stoc.html'], ['tag', 'nav.offers', 'g.q2', 'oferte.html'], ['wrench', 'nav.booking', 'g.q3', 'service.html#programare'], ['doc', 'nav.offer', 'g.q4', 'solicita.html?tip=oferta']].map(x => '<a class="qlink" href="' + x[3] + '">' + I(x[0]) + '<span><strong>' + t(x[1]) + '</strong><small>' + t(x[2]) + '</small></span>' + I('arrow') + '</a>').join('') + '</div></section>';

    const order = { stock: 0, demo: 1, transit: 2 };
    const stock = '<section class="section section--soft"><div class="container">' + SP.shead(t('home.stock'), t('g.stockT'), null, [t('c.viewAll') + ' (' + SP.STOCK.length + ')', 'stoc.html']) +
      '<div class="grid4">' + SP.STOCK.slice().sort((a, b) => order[a.status] - order[b.status]).filter((v, i, a) => a.findIndex(x => x.modelId === v.modelId) === i).slice(0, 4).map(SP.stockCard).join('') + '</div></div></section>';

    const offers = '<section class="section"><div class="container">' + SP.shead(t('home.offers'), t('g.offersT'), null, [t('c.viewAll'), 'oferte.html']) + '<div class="grid3">' + SP.OFFERS.slice(0, 3).map(SP.offerCard).join('') + '</div></div></section>';

    const svcs = ['service', 'body', 'parts', 'itp', 'fleet', 'charging'];
    const services = '<section class="section section--soft"><div class="container">' + SP.shead(t('nav.service'), t('g.svcT'), null, [t('nav.booking'), 'service.html#programare']) +
      '<div class="qtiles qtiles--6">' + svcs.map(k => '<div class="qtile">' + I({ service: 'wrench', body: 'shield', parts: 'box', itp: 'check', fleet: 'car', charging: 'bolt' }[k]) + '<strong>' + L(SP.LOC_TYPES[k]) + '</strong><span>' + SP.LOCATIONS.filter(l => l.types.includes(k)).map(l => L(l.short)).join(', ') + '</span></div>').join('') + '</div></div></section>';

    const locs = '<section class="section"><div class="container">' + SP.shead(t('nav.locations'), t('g.locT'), null, [t('c.viewAll'), 'locatii.html']) + '<div class="lgrid">' + SP.LOCATIONS.map(SP.locCard).join('') + '</div></div></section>';

    return { title: '', html: hero + brands + quick + stock + offers + services + locs };
  };

  /* ================================================================ BRAND PAGE (phase-2 brands and icon brands) */
  SP.pages.brand = function () {
    const b = SP.brand(SP.param('b'));
    if (!b || b.status === 'full') { location.replace('peugeot.html'); return { title: '', html: '' }; }
    const locs = SP.LOCATIONS.filter(l => l.brands.includes(b.id));
    const html = '<section class="bhero bhero--' + b.id + '"><div class="container bhero__in"><a class="link link--sm link--w" href="index.html#marci">' + I('arrowL') + t('g.all') + '</a><p class="bhero__w">' + b.word + '</p>' +
      '<p class="lead">' + L(SP.BRAND_INFO[b.id]) + '</p>' + (b.status === 'soon' ? '<span class="chip chip--glass">' + t('g.phase2') + '</span>' : '') + '</div></section>' +
      '<section class="section"><div class="container req"><div class="panel"><p class="eyebrow">' + b.name + '</p><h2 class="h3">' + t(b.status === 'soon' ? 'g.reqT' : 'g.reqSvc') + '</h2><p class="muted">' + t('g.reqD') + '</p>' +
      SP.leadForm({ type: b.status === 'soon' ? 'offer' : 'service', ctx: 'brand:' + b.id, message: true, when: true }) + '</div>' +
      '<aside class="req__a"><h2 class="h4">' + t('g.whereT') + ' ' + b.name + '</h2><div class="lgrid lgrid--1">' + locs.map(SP.locCard).join('') + '</div></aside></div></section>' +
      '<section class="section section--soft"><div class="container">' + SP.shead(t('g.alsoK'), t('g.alsoT'), null, [t('g.all'), 'index.html#marci']) + '<div class="rgrid">' + SP.MODELS.filter(m => m.seg === 'cars').slice(0, 4).map(SP.rangeCard).join('') + '</div></div></section>';
    return { title: b.name, html };
  };
})();
