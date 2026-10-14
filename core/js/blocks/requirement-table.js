/* core/js/blocks/requirement-table.js — khối "Bảng yêu cầu".
 * Bảng 4 cột: STT | Phân hệ | Chức năng | Nội dung yêu cầu nghiệp vụ (Hiện trạng / Yêu cầu).
 * Dữ liệu: { modules: [{ id, title, rows: [{ function, current: [{plant,text}], requirements: [{plant,text}] }] }] }
 */
(function (App) {
  'use strict';
  var state = {};


  function rowsHtml(data, ctx, st) {
    var u = ctx.util, t = ctx.t, ui = ctx.ui, q = u.norm(st.q);
    var plants = (ctx.config.plants || []).map(function (p) { return p.code; });
    var flat = [], no = 0;
    data.modules.forEach(function (m) {
      m.rows.forEach(function (r) {
        no++;
        if (st.mod !== 'all' && st.mod !== m.id) return;
        var text = [u.textAll(m.title), u.textAll(r['function'])].concat(
          (r.current || []).concat(r.requirements || []).map(function (b) { return u.textAll(b.text); })).join(' ');
        if (q && u.norm(text).indexOf(q) < 0) return;
        flat.push({ no: no, m: m, r: r });
      });
    });
    function list(items) {
      return '<ul>' + items.map(function (b) {
        var i = plants.indexOf(b.plant);
        return '<li>' + (i >= 0 ? '<span class="app-plant rt-plant" data-i="' + i + '">' + u.esc(b.plant) + '</span> ' : '') +
          u.highlight(t(b.text), q) + '</li>';
      }).join('') + '</ul>';
    }
    var body = flat.map(function (x, i) {
      var first = i === 0 || flat[i - 1].m !== x.m, span = 1;
      if (first) { while (flat[i + span] && flat[i + span].m === x.m) span++; }
      var r = x.r;
      return '<tr class="rt-row"><td class="rt-no">' + x.no + '</td>' +
        (first ? '<td class="rt-module" rowspan="' + span + '">' + u.esc(t(x.m.title)) + '</td>' : '') +
        '<td class="rt-fn">' + u.highlight(t(r['function']), q) + '</td><td class="rt-body">' +
        (r.current && r.current.length ? '<div class="rt-blk"><span class="rt-label rt-cur">' + u.esc(ui('rt_cur')) + '</span>' + list(r.current) + '</div>' : '') +
        (r.requirements && r.requirements.length ? '<div class="rt-blk"><span class="rt-label rt-need">' + u.esc(ui('rt_need')) + '</span>' + list(r.requirements) + '</div>' : '') +
        '</td></tr>';
    }).join('');
    if (!flat.length) return '<p class="app-empty">' + u.esc(ui('rt_none')) + '</p>';
    return '<table class="app-table rt-table"><thead><tr><th class="rt-no">' + u.esc(ui('rt_no')) + '</th><th>' + u.esc(ui('rt_module')) +
      '</th><th>' + u.esc(ui('rt_fn')) + '</th><th>' + u.esc(ui('rt_req')) + '</th></tr></thead><tbody>' + body + '</tbody></table>';
  }

  App.block('requirement-table', {
    render: function (data, ctx) {
      var u = ctx.util, t = ctx.t, ui = ctx.ui;
      var st = state[ctx.section.id] = state[ctx.section.id] || { q: '', mod: 'all' };
      var chips = '<button type="button" class="app-chip rt-chip' + (st.mod === 'all' ? ' is-on' : '') + '" data-mod="all">' + u.esc(ui('rt_all')) + '</button>' +
        data.modules.map(function (m) {
          return '<button type="button" class="app-chip rt-chip' + (st.mod === m.id ? ' is-on' : '') + '" data-mod="' + u.esc(m.id) + '">' + u.esc(t(m.title)) + '</button>';
        }).join('');
      return '<div class="app-filters"><input type="search" class="app-search rt-search" placeholder="' + u.esc(ui('rt_search')) +
        '" value="' + u.esc(st.q) + '">' + chips + '</div><div class="rt-wrap">' + rowsHtml(data, ctx, st) + '</div>';
    },
    mount: function (el, data, ctx) {
      var st = state[ctx.section.id], wrap = el.querySelector('.rt-wrap');
      function redraw() { wrap.innerHTML = rowsHtml(data, ctx, st); }
      el.querySelector('.rt-search').addEventListener('input', function (e) { st.q = e.target.value; redraw(); });
      el.querySelector('.app-filters').addEventListener('click', function (e) {
        var b = e.target.closest('.rt-chip'); if (!b) return;
        st.mod = b.getAttribute('data-mod');
        el.querySelectorAll('.rt-chip').forEach(function (x) { x.classList.toggle('is-on', x === b); });
        redraw();
      });
    }
  });
})(window.App = window.App || {});
