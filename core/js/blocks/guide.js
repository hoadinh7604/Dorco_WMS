/* core/js/blocks/guide.js — khối "Hướng dẫn màn hình".
 * Dữ liệu: { screens: [{ id, title, image?, purpose?, steps: [text], notes?: [text] }] }
 * image: đường dẫn tính từ index.html, ví dụ 'content/assets/nhap-kho.png'.
 */
(function (App) {
  'use strict';
  App.block('guide', {
    render: function (data, ctx) {
      var u = ctx.util, t = ctx.t, ui = ctx.ui;
      return '<div class="gd-list">' + (data.screens || []).map(function (s) {
        var img = s.image
          ? '<figure class="gd-fig"><img class="gd-img" src="' + u.esc(s.image) + '" alt="' + u.esc(t(s.title)) + '" data-src="' + u.esc(s.image) + '"></figure>'
          : '';
        return '<section class="gd-screen" id="gd-' + u.esc(s.id) + '" data-anchor="' + u.esc(s.id) + '">' +
          '<div class="gd-text"><h2>' + u.esc(t(s.title)) + '</h2>' +
          (s.purpose ? '<p class="gd-purpose">' + u.esc(t(s.purpose)) + '</p>' : '') +
          '<ol class="gd-steps">' + (s.steps || []).map(function (x) { return '<li class="gd-step">' + u.esc(t(x)) + '</li>'; }).join('') + '</ol>' +
          (s.notes && s.notes.length ? '<div class="gd-notes"><b>' + u.esc(ui('gd_notes')) + '</b><ul>' +
            s.notes.map(function (x) { return '<li>' + u.esc(t(x)) + '</li>'; }).join('') + '</ul></div>' : '') +
          '</div>' + img + '</section>';
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
