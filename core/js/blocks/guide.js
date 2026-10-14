/* core/js/blocks/guide.js — khối "Hướng dẫn màn hình" / "Chi tiết giải pháp".
 * Dữ liệu:
 *   { groups: [{ id, title, intro?, screens: [...] }] }      // có nhóm (vd 4.1 Master data)
 *   hoặc { screens: [...] }                                 // không nhóm
 * Một màn hình: { id, title, image?, wide?, purpose?, stepsTitle?, steps: [text], notes?: [text] }
 *   image: đường dẫn tính từ index.html, ví dụ 'content/assets/nhap-kho.png'
 *   wide: true → ảnh rộng toàn khung, phần diễn giải nằm dưới ảnh (hợp với ảnh chụp màn hình ngang)
 */
(function (App) {
  'use strict';

  function screen(s, ctx) {
    var u = ctx.util, t = ctx.t, ui = ctx.ui;
    var img = s.image
      ? '<figure class="gd-fig"><img class="gd-img" src="' + u.esc(s.image) + '" alt="' + u.esc(t(s.title)) + '" data-src="' + u.esc(s.image) + '"></figure>'
      : '';
    return '<section class="gd-screen' + (s.wide ? ' gd-wide' : '') + '" id="gd-' + u.esc(s.id) + '" data-anchor="' + u.esc(s.id) + '">' +
      '<div class="gd-text"><h3>' + u.esc(t(s.title)) + '</h3>' +
      (s.purpose ? '<p class="gd-purpose">' + u.esc(t(s.purpose)) + '</p>' : '') +
      (s.steps && s.steps.length
        ? (s.stepsTitle ? '<p class="gd-steps-t">' + u.esc(t(s.stepsTitle)) + '</p>' : '') +
          '<ol class="gd-steps">' + s.steps.map(function (x) { return '<li class="gd-step">' + u.esc(t(x)) + '</li>'; }).join('') + '</ol>'
        : '') +
      (s.notes && s.notes.length ? '<div class="gd-notes"><b>' + u.esc(ui('gd_notes')) + '</b><ul>' +
        s.notes.map(function (x) { return '<li>' + u.esc(t(x)) + '</li>'; }).join('') + '</ul></div>' : '') +
      '</div>' + img + '</section>';
  }

  App.block('guide', {
    render: function (data, ctx) {
      var u = ctx.util, t = ctx.t;
      var groups = data.groups || [{ screens: data.screens || [] }];
      return '<div class="gd-list">' + groups.map(function (g) {
        var inner = (g.screens || []).map(function (s) { return screen(s, ctx); }).join('');
        if (!g.title) return inner;
        return '<section class="gd-group" id="gd-g-' + u.esc(g.id) + '" data-anchor="' + u.esc(g.id) + '">' +
          '<h2>' + u.esc(t(g.title)) + '</h2>' + (g.intro ? '<p class="gd-group-intro">' + u.esc(t(g.intro)) + '</p>' : '') + inner + '</section>';
      }).join('') + '</div>';
    },
    mount: function (el, data, ctx) {
      el.querySelectorAll('img.gd-img').forEach(function (img) {
        function broken() {
          var box = document.createElement('div');
          box.className = 'gd-noimg';
          box.textContent = ctx.ui('gd_noimg').replace('{path}', img.getAttribute('data-src'));
          img.replaceWith(box);
        }
        if (img.complete && img.naturalWidth === 0) broken(); else img.addEventListener('error', broken);
      });
    }
  });
})(window.App = window.App || {});
