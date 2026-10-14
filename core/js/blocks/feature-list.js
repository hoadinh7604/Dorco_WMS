/* core/js/blocks/feature-list.js — khối "Danh sách tính năng".
 * Dữ liệu: { categories: [{ id, color, label, description, groups: [{ title, link?, items: [{vi,en,ko,direction?}] }] }] }
 */
(function (App) {
  'use strict';
  var state = {};   // bộ lọc theo từng mục: { q, cat }
  var SECOND = { vi: 'en', en: 'vi', ko: 'en' };

  /* chữ của một tính năng ở mọi ngôn ngữ (bỏ trường direction) — item có thể là chuỗi thường */
  function itemText(it, u) {
    if (!it || typeof it !== 'object') return u.textAll(it);
    var copy = {};
    Object.keys(it).forEach(function (k) { if (k !== 'direction') copy[k] = it[k]; });
    return u.textAll(copy);
  }

  function count(cat) {
    return cat.groups.reduce(function (n, g) { return n + g.items.length; }, 0);
  }

  function table(data, ctx, st) {
    var u = ctx.util, t = ctx.t, ui = ctx.ui, q = u.norm(st.q), lang = ctx.lang;
    var lang2 = SECOND[lang] || 'en', no = 0, shown = 0, html = '';
    data.categories.forEach(function (cat) {
      var body = '', n = 0;
      cat.groups.forEach(function (g) {
        var gText = u.textAll(g.title);
        var rows = '';
        g.items.forEach(function (it) {
          no++;
          if (st.cat !== 'all' && st.cat !== cat.id) return;
          if (q && u.norm(itemText(it, u) + ' ' + gText).indexOf(q) < 0) return;
          n++;
          rows += '<tr class="fl-row"><td class="fl-no">' + no + '</td><td>' + u.highlight(t(it), q) +
            '</td><td class="fl-second">' + u.highlight(typeof it === 'object' ? (it[lang2] || '') : '', q) + '</td>' +
            (it && it.direction ? '<td class="fl-dir-cell"><span class="fl-dir" data-dir="' + u.esc(it.direction) + '">' +
              u.esc(it.direction.replace('→', ' → ')) + '</span></td>' : '') + '</tr>';
        });
        if (!rows) return;
        var hasDir = g.items.some(function (it) { return it && it.direction; });
        body += '<div class="fl-group"><h3 class="fl-group-t">' + u.esc(t(g.title)) +
          '<span class="fl-group-sub">' + u.esc(typeof g.title === 'object' ? (g.title[lang2] || '') : '') + '</span>' +
          (g.link ? '<a class="fl-link" href="#' + u.esc(g.link) + '">' + u.esc(ui('fl_see')) + '</a>' : '') + '</h3>' +
          '<table class="app-table fl-table"><thead><tr><th class="fl-no">' + u.esc(ui('fl_no')) + '</th><th>' + u.esc(ui('fl_fn')) +
          '</th><th class="fl-second">' + u.esc(ui('fl_fn2')) + '</th>' + (hasDir ? '<th>' + u.esc(ui('fl_dir')) + '</th>' : '') +
          '</tr></thead><tbody>' + rows + '</tbody></table></div>';
      });
      if (!n) return;
      shown += n;
      html += '<section class="fl-cat" id="fl-' + u.esc(cat.id) + '" data-anchor="' + u.esc(cat.id) + '" style="--fl-c:var(--pf-' + u.esc(cat.color) + ')">' +
        '<header class="fl-cat-hd"><div><h2>' + u.esc(t(cat.label)) + '</h2><p>' + u.esc(t(cat.description)) + '</p></div>' +
        '<span class="fl-cat-n">' + n + ' ' + u.esc(ui('fl_count')) + '</span></header>' + body + '</section>';
    });
    return html + (shown ? '' : '<p class="app-empty">' + u.esc(ui('fl_none')) + '</p>');
  }

  App.block('feature-list', {
    render: function (data, ctx) {
      var u = ctx.util, t = ctx.t, ui = ctx.ui;
      var st = state[ctx.section.id] = state[ctx.section.id] || { q: '', cat: 'all' };
      if (ctx.sub) st.cat = 'all';
      var total = data.categories.reduce(function (n, c) { return n + count(c); }, 0);
      var kpis = '<div class="app-kpis"><div class="app-kpi fl-kpi"><b>' + total + '</b><span>' + u.esc(ui('fl_total')) + '</span></div>' +
        data.categories.map(function (c) {
          return '<div class="app-kpi fl-kpi" style="--fl-c:var(--pf-' + u.esc(c.color) + ')"><b>' + count(c) + '</b><span>' + u.esc(t(c.label)) + '</span></div>';
        }).join('') + '</div>';
      var chips = '<button type="button" class="app-chip fl-chip' + (st.cat === 'all' ? ' is-on' : '') + '" data-cat="all">' + u.esc(ui('all')) + '</button>' +
        data.categories.map(function (c) {
          return '<button type="button" class="app-chip fl-chip' + (st.cat === c.id ? ' is-on' : '') + '" data-cat="' + u.esc(c.id) + '">' + u.esc(t(c.label)) + '</button>';
        }).join('');
      return kpis + '<div class="app-filters"><input type="search" class="app-search fl-search" placeholder="' + u.esc(ui('fl_search')) +
        '" value="' + u.esc(st.q) + '">' + chips + '</div><div class="fl-list">' + table(data, ctx, st) + '</div>';
    },
    mount: function (el, data, ctx) {
      var st = state[ctx.section.id], list = el.querySelector('.fl-list');
      function redraw() { list.innerHTML = table(data, ctx, st); }
      el.querySelector('.fl-search').addEventListener('input', function (e) { st.q = e.target.value; redraw(); });
      el.querySelector('.app-filters').addEventListener('click', function (e) {
        var b = e.target.closest('.fl-chip'); if (!b) return;
        st.cat = b.getAttribute('data-cat');
        el.querySelectorAll('.fl-chip').forEach(function (x) { x.classList.toggle('is-on', x === b); });
        redraw();
      });
    }
  });
})(window.App = window.App || {});
