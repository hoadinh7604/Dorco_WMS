/* core/js/app.js — sổ đăng ký, khung trang, điều hướng #hash, xử lý lỗi.
 *
 * Các file khác chỉ gọi:
 *   App.config({...})            cấu hình dự án (content/config.js)
 *   App.data('ten', {...})       dữ liệu một mục (content/data/*.js)
 *   App.strings('vi', {...})     chữ giao diện (content/i18n/*.js)
 *   App.block('loai', {render, mount})   khối hiển thị (core/js/blocks/*.js)
 * rồi index.html gọi App.start().
 */
(function (App) {
  'use strict';
  var u = App.util;
  App._config = null;
  App._data = {};
  App._blocks = {};

  App.config = function (obj) { App._config = obj; };
  App.data = function (name, obj) {
    if (arguments.length < 2) return App._data[name];
    App._data[name] = obj;
  };
  App.block = function (type, def) { App._blocks[type] = def; };

  function fill(tpl, vars) {
    return String(tpl).replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; });
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function sections() { return (App._config && App._config.sections) || []; }

  function parseHash() {
    var raw = (location.hash || '').replace(/^#/, ''), h;
    try { h = decodeURIComponent(raw); } catch (e) { h = raw; }   // hash hỏng (vd '#%') → dùng nguyên văn
    var parts = h.split('--');
    var list = sections();
    var sec = list.filter(function (s) { return s.id === parts[0]; })[0] || list[0];
    var sub = sec && sec.id === parts[0] ? (parts[1] || '') : '';
    return { section: sec, sub: sub };
  }

  App.go = function (hash) {
    if (location.hash === hash) render(); else location.hash = hash;
  };

  /* ---------- khung trang ---------- */
  function shell() {
    var c = App._config, p = c.project || {};
    var nav = sections().map(function (s, i) {
      var subs = (s.subs || []).map(function (sb) {
        return '<a class="app-nav-sub" href="#' + u.esc(s.id) + '--' + u.esc(sb.id) + '" data-sub="' + u.esc(sb.id) +
          '" data-parent="' + u.esc(s.id) + '">' + u.esc(App.t(sb.title)) + '</a>';
      }).join('');
      return '<a class="app-nav-link" href="#' + u.esc(s.id) + '" data-section="' + u.esc(s.id) + '">' +
        '<span class="app-nav-num">' + pad(i + 1) + '</span><span>' + u.esc(App.t(s.title)) + '</span></a>' + subs;
    }).join('');
    var langs = (c.languages || []).map(function (l) {
      return '<button type="button" data-lang="' + u.esc(l.code) + '">' + u.esc(l.label || l.code) + '</button>';
    }).join('');
    document.getElementById('app').innerHTML =
      '<aside class="app-side">' +
        '<div class="app-brand">' +
          (p.eyebrow ? '<span class="app-brand-eyebrow">' + u.esc(App.t(p.eyebrow)) + '</span>' : '') +
          '<strong class="app-brand-name">' + u.esc(App.t(p.name)) + '</strong>' +
          (p.tagline ? '<span class="app-brand-tag">' + u.esc(App.t(p.tagline)) + '</span>' : '') +
        '</div>' +
        '<nav id="app-nav" aria-label="' + u.esc(App.ui('nav_contents')) + '">' +
          '<p class="app-nav-h">' + u.esc(App.ui('nav_contents')) + '</p>' + nav + '</nav>' +
        (p.footer ? '<p class="app-foot">' + u.esc(App.t(p.footer)) + '</p>' : '') +
      '</aside>' +
      '<div class="app-main">' +
        '<header class="app-top">' +
          '<div id="app-crumb" class="app-crumb"></div>' +
          (langs ? '<div id="app-langs" class="app-langs" role="group">' + langs + '</div>' : '') +
          '<button type="button" id="app-prev" class="app-btn">' + u.esc(App.ui('prev')) + '</button>' +
          '<button type="button" id="app-next" class="app-btn">' + u.esc(App.ui('next')) + '</button>' +
          '<button type="button" id="app-print" class="app-btn">' + u.esc(App.ui('print')) + '</button>' +
        '</header>' +
        '<main id="app-content" class="app-content"></main>' +
      '</div>';

    var langsEl = document.getElementById('app-langs');
    if (langsEl) langsEl.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-lang]');
      if (b) App.setLang(b.getAttribute('data-lang'));
    });
    document.getElementById('app-prev').addEventListener('click', function () { step(-1); });
    document.getElementById('app-next').addEventListener('click', function () { step(1); });
    document.getElementById('app-print').addEventListener('click', function () { window.print(); });
  }

  function step(d) {
    var list = sections(), cur = parseHash().section, i = list.indexOf(cur) + d;
    if (i >= 0 && i < list.length) location.hash = '#' + list[i].id;
  }

  /* ---------- dựng mục đang mở ---------- */
  function errorBox(msg) {
    return '<div class="app-error" role="alert">' + u.esc(msg) + '</div>';
  }

  function render() {
    var st = parseHash(), sec = st.section, list = sections();
    var content = document.getElementById('app-content');
    if (!sec) { content.innerHTML = errorBox(App.ui('err_no_sections')); return; }
    var i = list.indexOf(sec);

    document.querySelectorAll('#app-nav [data-section]').forEach(function (a) {
      a.classList.toggle('is-on', a.getAttribute('data-section') === sec.id);
    });
    document.querySelectorAll('#app-nav [data-sub]').forEach(function (a) {
      a.classList.toggle('is-on', a.getAttribute('data-parent') === sec.id && a.getAttribute('data-sub') === st.sub);
    });
    document.querySelectorAll('#app-langs button').forEach(function (b) {
      b.classList.toggle('is-on', b.getAttribute('data-lang') === App.lang());
    });
    document.getElementById('app-prev').disabled = i <= 0;
    document.getElementById('app-next').disabled = i >= list.length - 1;
    var p = App._config.project || {};
    document.getElementById('app-crumb').innerHTML =
      '<span>' + u.esc(App.t(p.name)) + '</span><span class="app-crumb-sep" aria-hidden="true">›</span><b>' + u.esc(App.t(sec.title)) + '</b>';
    document.title = App.t(sec.title) + ' – ' + App.t(p.name);

    var head = '<header class="app-page-hd">' +
      (sec.eyebrow ? '<p class="app-page-eyebrow">' + u.esc(App.t(sec.eyebrow)) + '</p>' : '') +
      '<h1>' + u.esc(App.t(sec.heading || sec.title)) + '</h1>' +
      (sec.intro ? '<p class="app-page-intro">' + u.esc(App.t(sec.intro)) + '</p>' : '') + '</header>';
    content.innerHTML = '<section class="app-page" data-section="' + u.esc(sec.id) + '" data-type="' + u.esc(sec.type) + '">' + head + '<div class="app-block"></div></section>';
    var el = content.querySelector('.app-block');

    var block = App._blocks[sec.type];
    var data = App._data[sec.data];
    if (!block) { el.innerHTML = errorBox(fill(App.ui('err_unknown_type'), { type: sec.type })); return; }
    if (data == null) { el.innerHTML = errorBox(fill(App.ui('err_missing_data'), { name: sec.data })); return; }
    var ctx = { t: App.t, ui: App.ui, lang: App.lang(), util: u, icon: App.icon, config: App._config, section: sec, sub: st.sub };
    try {
      el.innerHTML = block.render(data, ctx);
      if (block.mount) block.mount(el, data, ctx);
    } catch (err) {
      el.innerHTML = errorBox(fill(App.ui('err_block'), { msg: err && err.message, file: 'content/data/' + sec.data + '.js' }));
      if (window.console) console.error(err);
      return;
    }
    if (st.sub) {
      var target = el.querySelector('[data-anchor="' + st.sub.replace(/"/g, '') + '"]');
      if (target) target.scrollIntoView(); else window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }

  function warnMissing() {
    if (!window.console) return;
    if (App.missing.length) {
      var by = {};
      App.missing.forEach(function (m) { (by[m.lang] = by[m.lang] || []).push(m.sample); });
      console.warn('[WMS] Thiếu bản dịch:', by);
    }
    if (App.missingIcons.length) console.warn('[WMS] Icon không tồn tại:', App.missingIcons);
    if (App.check) {
      var r = App.check();
      if (r.errors.length) console.warn('[WMS] Lỗi nội dung (mở check.html để xem):', r.errors);
    }
  }

  App.start = function () {
    if (!App._config) {
      document.getElementById('app').innerHTML = errorBox('Thiếu content/config.js — chưa gọi App.config(...)');
      return;
    }
    if (App.renderCheck && /[?&]check\b/.test(location.search)) { App.renderCheck(); return; }
    App.initLang(App._config);
    shell();
    render();
    warnMissing();
    window.addEventListener('hashchange', render);
    document.addEventListener('app:lang', function () { shell(); render(); });
  };
})(window.App = window.App || {});
