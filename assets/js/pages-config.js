/* =====================================================================
   PAGE — light configurator: model → powertrain & trim → colour → accessories → summary & quote.
   Versions and list prices come from the importer price list (SP.MODELS); colours and dealer
   accessories are demo data. Integration point: GET /api/catalog/{model} (versions, colours,
   options) · POST /api/leads (type = configuration, payload = configuration below).
   ===================================================================== */
(function () {
  const SP = window.SP; SP.pages = SP.pages || {};
  const t = SP.t, L = v => SP.L(v), I = SP.icon, esc = SP.esc, eur = v => SP.eur(v);

  SP.pages.configurator = function () {
    const pv = SP.version(SP.param('v')), pm = SP.model(SP.param('m'));
    const s = { step: pm || pv ? 2 : 1, m: pv ? pv.variant.family.id : pm ? pm.id : null, v: pv ? pv.variant.id : null, x: pv ? pv.id : null, c: null, acc: [], down: 20, months: 60, loc: 'pantelimon' };
    const steps = ['cfg.s1', 'cfg.s2', 'cfg.s3', 'cfg.s4', 'cfg.s5'];
    const model = () => SP.model(s.m), variant = () => model() && model().variants.find(x => x.id === s.v), version = () => SP.version(s.x);
    const palette = () => model() ? model().palette : SP.COLORS;
    const color = () => palette().find(c => c.id === s.c) || palette()[0];
    const fits = a => { const m = model(), x = version(); if (!m || !x) return false; if (a.fits === 'all') return true; if (a.fits === 'cars') return m.seg !== 'pro'; return a.fits.includes(m.seg === 'pro' ? 'pro' : x.fuel) || a.fits.includes(x.fuel); };
    const accs = () => SP.ACCESSORIES.filter(fits);
    const total = () => { const x = version(); if (!x) return 0; return x.best + color().price + s.acc.map(id => SP.ACCESSORIES.find(a => a.id === id)).filter(Boolean).reduce((a, b) => a + b.price, 0); };
    const rate = () => SP.monthly(total(), s.down / 100, s.months);

    const html = SP.phead(t('nav.config'), t('cfg.title'), t('cfg.sub')) + '<section class="section section--tight"><div class="container"><ol class="steps cfg__steps">' + steps.map((k, i) => '<li data-st="' + (i + 1) + '"><button type="button" data-go="' + (i + 1) + '"><span>' + (i + 1) + '</span>' + t(k) + '</button></li>').join('') + '</ol>' +
      '<div class="cfg"><div class="cfg__main"><div class="cfg__stage" data-stage></div><div class="panel" data-body></div></div><aside class="cfg__sum panel panel--soft" data-sum></aside></div><p class="note">' + t('cfg.dataNote') + '</p></div></section>';

    function stage() {
      const m = model(); if (!m) return '<div class="cfg__ph">' + I('car') + '<p>' + t('cfg.pick') + '</p></div>';
      const v = variant() || m.variants[0];
      return '<img src="' + ((s.c && SP.colorImg(m, s.c)) || v.cut) + '" alt="' + SP.BRAND.name + ' ' + m.name + '"><p class="cfg__name"><small>' + SP.BRAND.word + '</small>' + (variant() ? variant().name : m.name) + (version() ? ' <span>' + esc(L(version().trim)) + '</span>' : '') + '</p>';
    }
    function body() {
      const m = model();
      if (s.step === 1) return '<h2 class="h4">' + t('cfg.s1') + '</h2><div class="pick">' + SP.MODELS.map(x => '<button type="button" class="pick__m' + (x.id === s.m ? ' is-on' : '') + '" data-pm="' + x.id + '"><img src="' + x.cut + '" alt="" loading="lazy"><strong>' + x.name + '</strong><small>' + SP.fromLabel(x) + '</small></button>').join('') + '</div>';
      if (s.step === 2) {
        const v = variant();
        return '<h2 class="h4">' + t('cfg.s2') + '</h2>' + (m.variants.length > 1 ? '<div class="seg ptabs" role="tablist">' + m.variants.map(x => '<button role="tab" type="button" aria-selected="' + (x.id === s.v) + '" data-pv="' + x.id + '">' + (x.label || x.name) + '<small>' + L(SP.FUEL[x.fuel]) + ' · ' + t('c.from') + ' ' + eur(x.from) + '</small></button>').join('') + '</div>' : '') +
          '<div class="vopts">' + v.versions.map(x => '<label class="vopt' + (x.id === s.x ? ' is-on' : '') + '"><input type="radio" name="ver" value="' + x.id + '"' + (x.id === s.x ? ' checked' : '') + '><span class="vopt__b"><strong>' + esc(L(x.trim)) + '</strong><small>' + esc(L(x.engine)) + '</small><span class="vopt__t">' + SP.fuelChip(x.fuel) + '<em>' + (x.gb === 'auto' ? t('p.auto') : t('p.manual')) + '</em><em>' + x.dr + '</em></span></span><span class="vopt__p">' + (x.promo ? '<s>' + eur(x.list) + '</s>' : '') + '<strong>' + eur(x.best) + '</strong></span></label>').join('') + '</div><span class="err" data-err="ver"></span>';
      }
      if (s.step === 3) return '<h2 class="h4">' + t('cfg.s3') + '</h2><div class="swatches">' + palette().map(c => '<button type="button" class="sw' + (c.id === color().id ? ' is-on' : '') + '" data-c="' + c.id + '"><span style="background:' + c.hex + '"></span>' + (c.img ? '<img src="' + c.img + '" alt="" loading="lazy">' : '') + '<strong>' + L(c.name) + '</strong><small>' + (c.price ? '+ ' + eur(c.price) : t('cfg.std')) + '</small></button>').join('') + '</div>';
      if (s.step === 4) return '<h2 class="h4">' + t('cfg.s4') + '</h2><div class="chkgrid">' + accs().map(a => '<label class="copt copt--chk"><input type="checkbox" name="acc" value="' + a.id + '"' + (s.acc.includes(a.id) ? ' checked' : '') + '><span class="copt__box">' + I('check') + '</span><span class="copt__n">' + L(a.name) + '</span><span class="copt__p">+ ' + eur(a.price) + '</span></label>').join('') + '</div>';
      const svc = SP.LOCATIONS.filter(l => l.brands.includes(SP.BRAND.id) && l.types.includes('sales'));
      return '<h2 class="h4">' + t('cfg.s5') + '</h2><div class="fin"><div class="field"><label for="cf-d">' + t('cfg.down') + ' <b data-dv>' + s.down + '%</b></label><input id="cf-d" type="range" min="0" max="50" step="5" value="' + s.down + '" data-down></div>' +
        '<div class="field"><label for="cf-n">' + t('cfg.months') + '</label><select id="cf-n" data-months>' + [24, 36, 48, 60, 72].map(n => '<option' + (n === s.months ? ' selected' : '') + '>' + n + '</option>').join('') + '</select></div>' +
        '<p class="fin__r">' + t('v.rate') + ' <strong data-rate>' + eur(rate()) + '</strong>/' + t('c.month') + '</p><p class="note">' + t('cfg.finNote') + '</p></div>' +
        '<div class="field field--full"><label for="cf-l">' + t('f.loc') + '</label><select id="cf-l" data-loc>' + svc.map(l => '<option value="' + l.id + '"' + (l.id === s.loc ? ' selected' : '') + '>' + L(l.short) + '</option>').join('') + '</select></div>' +
        SP.leadForm({ type: 'configuration', ctx: s.x, message: true, submit: t('cfg.send') });
    }
    function sum() {
      const m = model(), x = version(), c = color();
      if (!m) return '<h3 class="h4">' + t('cfg.summary') + '</h3><p class="muted">' + t('cfg.pick') + '</p>';
      const row = (k, v, cls) => '<div class="' + (cls || '') + '"><dt>' + k + '</dt><dd>' + v + '</dd></div>';
      const sel = s.acc.map(id => SP.ACCESSORIES.find(a => a.id === id)).filter(Boolean);
      return '<h3 class="h4">' + t('cfg.summary') + '</h3><dl class="sumdl">' + row(t('f.model'), SP.BRAND.name + ' ' + (variant() ? variant().name : m.name)) +
        (x ? row(t('v.version'), esc(L(x.trim)) + '<br><small>' + esc(L(x.engine)) + '</small>') + row(t('p.rec'), eur(x.list)) + (x.promo ? row(t('p.promo'), '− ' + eur(x.list - x.best), 'is-save') : '') + row(t('v.color'), L(c.name) + ' · ' + (c.price ? eur(c.price) : t('cfg.std'))) + sel.map(a => row(L(a.name), eur(a.price))).join('') : '') + '</dl>' +
        (x ? '<div class="sumtot"><span>' + t('cfg.total') + '</span><strong>' + eur(total()) + '</strong><small>' + t('cfg.totalNote') + '</small><small>' + t('v.rate') + ' ' + eur(rate()) + '/' + t('c.month') + '</small></div>' : '') +
        '<div class="btnrow">' + (x ? '<a class="link link--sm" href="preturi.html?m=' + m.id + '">' + t('p.full') + I('arrow') + '</a>' : '') + '<a class="link link--sm" href="stoc.html?m=' + m.id + '">' + t('nav.stock') + ' ' + m.name + I('arrow') + '</a></div>';
    }
    function draw(root) {
      root.querySelectorAll('[data-st]').forEach(li => { const n = +li.dataset.st; li.className = n === s.step ? 'is-on' : n < s.step ? 'is-done' : ''; });
      root.querySelector('[data-stage]').innerHTML = stage();
      const b = root.querySelector('[data-body]');
      b.innerHTML = body() + (s.step < 5 ? '<div class="wiz__nav">' + (s.step > 1 ? '<button class="btn btn--line" data-wp>' + I('arrowL') + t('c.back') + '</button>' : '<span></span>') + (s.step > 1 ? '<button class="btn btn--ink" data-wn>' + t('c.next') + I('arrow') + '</button>' : '') + '</div>' : '<div class="wiz__nav"><button class="btn btn--line" data-wp>' + I('arrowL') + t('c.back') + '</button><span></span></div>');
      root.querySelector('[data-sum]').innerHTML = sum();
      b.querySelectorAll('[data-pm]').forEach(x => x.addEventListener('click', () => { if (s.m !== x.dataset.pm) { s.m = x.dataset.pm; s.v = model().variants[0].id; s.x = null; s.c = null; s.acc = []; } s.step = 2; draw(root); root.querySelector('.cfg').scrollIntoView({ behavior: 'smooth' }); }));
      b.querySelectorAll('[data-pv]').forEach(x => x.addEventListener('click', () => { s.v = x.dataset.pv; s.x = null; draw(root); }));
      b.querySelectorAll('[name="ver"]').forEach(x => x.addEventListener('change', () => { s.x = x.value; s.acc = s.acc.filter(id => fits(SP.ACCESSORIES.find(a => a.id === id))); draw(root); }));
      b.querySelectorAll('[data-c]').forEach(x => x.addEventListener('click', () => { s.c = x.dataset.c; draw(root); }));
      b.querySelectorAll('[name="acc"]').forEach(x => x.addEventListener('change', () => { s.acc = [...b.querySelectorAll('[name="acc"]:checked')].map(y => y.value); root.querySelector('[data-sum]').innerHTML = sum(); }));
      const d = b.querySelector('[data-down]'), n = b.querySelector('[data-months]'), lc = b.querySelector('[data-loc]');
      const upd = () => { b.querySelector('[data-rate]').textContent = eur(rate()); b.querySelector('[data-dv]').textContent = s.down + '%'; root.querySelector('[data-sum]').innerHTML = sum(); };
      if (d) d.addEventListener('input', () => { s.down = +d.value; upd(); });
      if (n) n.addEventListener('change', () => { s.months = +n.value; upd(); });
      if (lc) lc.addEventListener('change', () => { s.loc = lc.value; });
      const f = b.querySelector('form[data-lead]');
      if (f) { f.removeAttribute('data-lead'); f.addEventListener('submit', e => { e.preventDefault(); if (!SP.validate(f)) return; /* Integration point: POST /api/leads (type=configuration, version, colour, accessories, finance, location) */ f.outerHTML = SP.done(t('f.ok'), t('f.okD'), '#' + SP.ref('CFG')); }); }
      const p = b.querySelector('[data-wp]'); if (p) p.addEventListener('click', () => { s.step--; draw(root); });
      const nx = b.querySelector('[data-wn]'); if (nx) nx.addEventListener('click', () => {
        if (s.step === 2 && !s.x) { b.querySelector('[data-err="ver"]').textContent = t('cfg.errVer'); return; }
        if (s.step === 3 && !s.c) s.c = color().id;
        s.step++; draw(root);
      });
      try { history.replaceState(null, '', 'configurator.html' + (s.x ? '?v=' + s.x : s.m ? '?m=' + s.m : '') + (SP.param('lang') ? (s.m ? '&' : '?') + 'lang=' + SP.param('lang') : '')); } catch (e) { }
    }
    return {
      title: t('cfg.title'), html,
      bind(root) {
        if (s.m && !s.v) s.v = model().variants[0].id;
        root.querySelectorAll('[data-go]').forEach(x => x.addEventListener('click', () => { const n = +x.dataset.go; if (n === 1 || (s.m && (n <= 2 || s.x))) { s.step = n; draw(root); } }));
        draw(root);
      }
    };
  };
})();
