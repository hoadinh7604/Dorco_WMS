/* core/js/blocks/process-flow.js — khối "Sơ đồ quy trình".
 * Dữ liệu: xem chú thích đầu file content/data/processes.js.
 */
(function (App) {
  'use strict';
  var fitOn = true;

  function sysChip(s, ctx) {
    var u = ctx.util;
    if (typeof s === 'string') return '<span class="app-sys" data-sys="' + u.esc(s) + '">' + u.esc(s === 'MANUAL' ? ctx.t(ctx.manualLabel) : s === 'KIOSK' ? 'Kiosk' : s) + '</span>';
    return '<span class="app-sys" data-sys="' + u.esc(s.sys || 'MANUAL') + '">' + u.esc(ctx.t(s.label)) + '</span>';
  }

  function step(st, n, ctx) {
    var u = ctx.util, t = ctx.t;
    var cls = 'pf-step' + (st.optional ? ' pf-optional' : '') + (st.wide ? ' pf-wide' : '');
    var bullets = (st.bullets || []).map(function (b) {
      return b && b.sync ? '<li class="pf-sync">' + u.esc(t(b.sync)) + '</li>' : '<li>' + u.esc(t(b)) + '</li>';
    }).join('');
    var cases = (st.cases || []).map(function (c) {
      return '<div class="pf-case" data-tag="' + u.esc(c.tag) + '"><b>' + u.esc(c.tag) + '</b> ' + u.esc(t(c.text)) +
        (c.alert ? '<span class="pf-alert">' + u.esc(t(c.alert)) + '</span>' : '') + '</div>';
    }).join('');
    // Nhãn nhà máy: bước không có ô HY/HN riêng thì áp dụng cho mọi nhà máy (hoặc ghi rõ st.plants).
    var codes = ((ctx.config && ctx.config.plants) || []).map(function (pl) { return pl.code; });
    var tagged = (st.cases || []).some(function (c) { return codes.indexOf(c.tag) >= 0; });
    var plants = st.plants || (tagged ? [] : codes);
    var ptags = plants.length ? '<span class="pf-plants">' + plants.map(function (c) { return '<b>' + u.esc(c) + '</b>'; }).join('') + '</span>' : '';
    return '<article class="' + cls + '"><header class="pf-step-hd"><span class="pf-num">' + n + '</span><h4>' + u.esc(t(st.title)) + '</h4></header>' +
      '<div class="pf-meta">' + ctx.icon(st.icon) + '<div class="pf-sys">' + (st.systems || []).map(function (s) { return sysChip(s, ctx); }).join('') + '</div></div>' + ptags +
      (bullets ? '<ul>' + bullets + '</ul>' : '') + cases + '</article>';
  }

  function lane(l, ctx) {
    var u = ctx.util, t = ctx.t, n = 0;
    var wOf = function (g) { return g.steps.reduce(function (w, s) { return w + (s.wide ? 1.7 : 1); }, 0); };
    var groups = l.groups.map(function (g, gi) {
      if ((l.numbering || 'group') === 'group') n = 0;
      var side = l.layout === 'side', cols = l.cols || 4;
      var steps = g.steps.map(function (s, si) {
        n++;
        var sep = si === 0 ? '' : (side && gi === 0 && si % cols === 0)
          ? '<span class="pf-wrap" aria-hidden="true"><i></i><i></i></span>'
          : '<span class="pf-arrow" aria-hidden="true"></span>';
        return sep + step(s, n, ctx);
      }).join('');
      var col = g.color ? 'var(--pf-' + u.esc(g.color) + ')' : 'var(--pf-c)';
      var conn = (gi > 0 && (l.layout === 'row' || l.layout === 'side') && (g.connector || 'solid') !== 'none')
        ? '<span class="pf-arrow pf-arrow-' + u.esc(g.connector || 'solid') + '" style="--pf-a:' + col + '" aria-hidden="true"></span>' : '';
      var weight = wOf(g);
      return conn + '<div class="pf-group' + (g.label ? ' pf-labeled' : '') + (g.aside ? ' pf-aside' : '') + '" style="--pf-g:' + col + ';--pf-w:' + weight + '">' +
        (g.label ? '<p class="pf-group-label">' + u.esc(t(g.label)) + (g.sublabel ? '<span>' + u.esc(t(g.sublabel)) + '</span>' : '') + '</p>' : '') + '<div class="pf-steps">' + steps + '</div></div>';
    }).join('');
    return '<section class="pf-lane" data-lane="' + u.esc(l.number) + '" style="--pf-c:var(--pf-' + u.esc(l.color) + ')">' +
      '<header class="pf-lane-hd"><span class="pf-lane-num">' + u.esc(l.number) + '</span><div><h3>' + u.esc(t(l.title)) + '</h3>' +
      (l.subtitle ? '<p>' + u.esc(t(l.subtitle)) + '</p>' : '') + '</div></header>' +
      '<div class="pf-body pf-' + (l.layout === 'row' || l.layout === 'side' ? l.layout : 'stack') + '" style="--pf-cols:' + (l.cols || 4) + '">' + groups + '</div>' +
      (l.note ? '<p class="pf-note">* ' + u.esc(t(l.note)) + '</p>' : '') + '</section>';
  }

  function panels(pn, ctx) {
    if (!pn) return '';
    var u = ctx.util, t = ctx.t, out = '';
    if (pn.integration) {
      var sys = pn.integration.systems || [], links = pn.integration.links || [], row = '';
      sys.forEach(function (s, i) {
        row += '<div class="pf-sysbox" data-sys="' + u.esc(s.key) + '">' + ctx.icon(s.icon) + '<strong>' + u.esc(t(s.name)) + '</strong><span>' + u.esc(t(s.text)) + '</span></div>';
        if (links[i]) row += '<div class="pf-link"><span>' + u.esc(t(links[i].top)) + '</span><i aria-hidden="true"></i><span>' + u.esc(t(links[i].bottom)) + '</span></div>';
      });
      out += '<div class="pf-panel pf-integration"><h3>' + u.esc(t(pn.integration.title)) + '</h3><div class="pf-sysrow">' + row + '</div></div>';
    }
    if (pn.notes) {
      out += '<div class="pf-panel pf-notes"><h3>' + u.esc(t(pn.notes.title)) + '</h3><ul>' +
        pn.notes.items.map(function (x) { return '<li>' + u.esc(t(x)) + '</li>'; }).join('') + '</ul></div>';
    }
    if (pn.legend) {
      var lg = pn.legend;
      var flows = (lg.flows || []).map(function (f) {
        return '<li>' + (f.sync ? '<span class="pf-lg-sync">⇄</span>' : '<span class="pf-lg-arrow' + (f.dashed ? ' is-dashed' : '') + '" style="--pf-a:var(--pf-' + u.esc(f.color) + ')"></span>') + u.esc(t(f.text)) + '</li>';
      }).join('');
      var sw = (lg.swatches || []).map(function (s) {
        return '<li><span class="pf-lg-sw" style="--pf-a:var(--pf-' + u.esc(s.color) + ')"></span>' + u.esc(t(s.text)) + '</li>';
      }).join('');
      var chips = lg.systemsNote ? '<p class="pf-lg-sys">' + ['SAP', 'WMS', 'PDA', 'KIOSK'].map(function (s) { return sysChip(s, ctx); }).join('') + ' ' + u.esc(t(lg.systemsNote)) + '</p>' : '';
      out += '<div class="pf-panel pf-legend"><h3>' + u.esc(t(lg.title)) + '</h3><ul class="pf-lg">' + flows + sw + '</ul>' + chips + '</div>';
    }
    return '<div class="pf-panels">' + out + '</div>';
  }

  function fit(el) {
    var sheet = el.querySelector('.pf-sheet'), sc = el.querySelector('.pf-scroll'), btn = el.querySelector('#pf-fit');
    if (!sheet || !sc) return;
    sheet.style.zoom = 1;
    var z = Math.min(1, (sc.clientWidth - 2) / sheet.offsetWidth);
    sheet.style.zoom = fitOn ? z : 1;
    btn.textContent = App.ui(fitOn ? 'pf_fit_on' : 'pf_fit_off');
  }

  App.block('process-flow', {
    render: function (data, ctx) {
      var u = ctx.util, t = ctx.t;
      ctx.manualLabel = (data.panels && data.panels.legend && data.panels.legend.manualLabel) || 'Manual';
      return '<div class="pf-toolbar"><button type="button" class="app-btn" id="pf-fit"></button><span>' + u.esc(ctx.ui('pf_fit_hint')) + '</span></div>' +
        '<div class="pf-scroll"><div class="pf-sheet">' +
        (data.title ? '<header class="pf-head"><h2>' + u.esc(t(data.title)) + '</h2>' + (data.subtitle ? '<p>' + u.esc(t(data.subtitle)) + '</p>' : '') + '</header>' : '') +
        data.lanes.map(function (l) { return lane(l, ctx); }).join('') + panels(data.panels, ctx) + '</div></div>';
    },
    mount: function (el) {
      el.querySelector('#pf-fit').addEventListener('click', function () { fitOn = !fitOn; fit(el); });
      fit(el);
      if (!App._pfResize) {
        App._pfResize = true;
        window.addEventListener('resize', function () {
          var cur = document.querySelector('.app-block .pf-sheet');
          if (cur) fit(cur.closest('.app-block'));
        });
      }
    }
  });
})(window.App = window.App || {});
