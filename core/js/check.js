/* core/js/check.js — trang tự kiểm tra nội dung (mở check.html hoặc index.html?check).
 * App.check() → { errors: [...], warnings: [...] }   mỗi mục: { kind, where, detail }
 * Ảnh được kiểm tra bất đồng bộ; kết quả nằm trong App._checkImages.
 */
(function (App) {
  'use strict';
  App._checkImages = [];

  function langs() { return ((App._config && App._config.languages) || [{ code: 'vi' }]).map(function (l) { return l.code; }); }

  function isText(o, codes) {
    if (!o || typeof o !== 'object' || Array.isArray(o)) return false;
    var keys = Object.keys(o);
    return keys.length > 0 && o.vi != null && keys.every(function (k) { return codes.indexOf(k) >= 0; });
  }

  function walk(o, path, fn) {
    fn(o, path);
    if (o && typeof o === 'object') {
      Object.keys(o).forEach(function (k) { walk(o[k], path + (Array.isArray(o) ? '[' + k + ']' : '.' + k), fn); });
    }
  }

  App.check = function () {
    var errors = [], warnings = [], cfg = App._config || {}, codes = langs();
    var secs = cfg.sections || [], seen = {};
    secs.forEach(function (s, i) {
      var where = 'config.sections[' + i + '] (' + s.id + ')';
      if (seen[s.id]) errors.push({ kind: 'duplicate-id', where: where, detail: s.id });
      seen[s.id] = true;
      if (!App._blocks[s.type]) errors.push({ kind: 'unknown-type', where: where, detail: s.type });
      if (App._data[s.data] == null) errors.push({ kind: 'missing-data', where: where, detail: s.data });
    });
    var icons = App.iconNames || [];
    function scan(obj, root) {
      var ids = {};
      walk(obj, root, function (v, path) {
        if (isText(v, codes)) {
          codes.forEach(function (c) {
            if (v[c] == null || v[c] === '') warnings.push({ kind: 'missing-translation', where: path, detail: c + ': ' + v.vi });
          });
        }
        if (v && typeof v === 'object' && !Array.isArray(v)) {
          if (typeof v.icon === 'string' && icons.indexOf(v.icon) < 0) errors.push({ kind: 'missing-icon', where: path, detail: v.icon });
          if (typeof v.id === 'string' && /\.(lanes|screens|categories|modules|groups)\[\d+\]$/.test(path)) {
            var key = path.replace(/\[\d+\]$/, '') + ':' + v.id;
            if (ids[key]) errors.push({ kind: 'duplicate-id', where: path, detail: v.id });
            ids[key] = true;
          }
        }
      });
    }
    scan(cfg, 'config');
    Object.keys(App._data).forEach(function (name) { scan(App._data[name], name); });

    /* cấu trúc dữ liệu theo từng loại khối (lỗi hay gặp khi sửa tay: gõ sai tên trường, chuỗi thay cho danh sách) */
    function arr(v, path, req) {
      if (v == null && !req) return [];
      if (!Array.isArray(v)) { errors.push({ kind: 'bad-structure', where: path, detail: App.ui('ck_need_list') }); return []; }
      return v;
    }
    var SCHEMA = {
      'feature-list': function (d, n) {
        arr(d.categories, n + '.categories', true).forEach(function (c, i) {
          var pc = n + '.categories[' + i + ']';
          arr(c.groups, pc + '.groups', true).forEach(function (g, j) {
            arr(g.items, pc + '.groups[' + j + '].items', true).forEach(function (it, k) {
              if (it && it.direction != null && typeof it.direction !== 'string')
                errors.push({ kind: 'bad-structure', where: pc + '.groups[' + j + '].items[' + k + '].direction', detail: 'SAP→WMS / WMS→SAP' });
            });
          });
        });
      },
      'process-flow': function (d, n) {
        arr(d.lanes, n + '.lanes', true).forEach(function (l, i) {
          var pl = n + '.lanes[' + i + ']';
          arr(l.groups, pl + '.groups', true).forEach(function (g, j) {
            arr(g.steps, pl + '.groups[' + j + '].steps', true).forEach(function (st, k) {
              var ps = pl + '.groups[' + j + '].steps[' + k + ']';
              arr(st.bullets, ps + '.bullets', false); arr(st.cases, ps + '.cases', false); arr(st.systems, ps + '.systems', false);
            });
          });
        });
      },
      'requirement-table': function (d, n) {
        arr(d.modules, n + '.modules', true).forEach(function (m, i) {
          arr(m.rows, n + '.modules[' + i + '].rows', true).forEach(function (r, j) {
            var pr = n + '.modules[' + i + '].rows[' + j + ']';
            arr(r.current, pr + '.current', false); arr(r.requirements, pr + '.requirements', false);
          });
        });
      },
      'guide': function (d, n) {
        function screens(list, p) {
          arr(list, p, true).forEach(function (sc, i) {
            arr(sc.steps, p + '[' + i + '].steps', false); arr(sc.notes, p + '[' + i + '].notes', false);
          });
        }
        if (d.groups != null) arr(d.groups, n + '.groups', true).forEach(function (g, i) { screens(g.screens, n + '.groups[' + i + '].screens'); });
        else screens(d.screens, n + '.screens');
      }
    };
    var checked = {};
    secs.forEach(function (s) {
      var d = App._data[s.data];
      if (d && SCHEMA[s.type] && !checked[s.data]) { checked[s.data] = true; SCHEMA[s.type](d, s.data); }
    });

    /* màu (khoá --pf-<màu> trong tokens.css / theme.css) và mã nhà máy */
    var css = window.getComputedStyle(document.documentElement);
    var plants = (cfg.plants || []).map(function (p) { return p.code; });
    Object.keys(App._data).forEach(function (name) {
      walk(App._data[name], name, function (v, path) {
        if (!v || typeof v !== 'object' || Array.isArray(v)) return;
        if (typeof v.color === 'string' && !css.getPropertyValue('--pf-' + v.color).trim())
          errors.push({ kind: 'unknown-color', where: path, detail: v.color });
        if (typeof v.plant === 'string' && v.plant && plants.indexOf(v.plant) < 0)
          errors.push({ kind: 'unknown-plant', where: path, detail: v.plant });
      });
    });
    return { errors: errors, warnings: warnings };
  };

  function probeImages(done) {
    var list = [];
    Object.keys(App._data).forEach(function (name) {
      walk(App._data[name], name, function (v, path) {
        if (v && typeof v === 'object' && typeof v.image === 'string') list.push({ path: path, src: v.image });
      });
    });
    var left = list.length;
    App._checkImages = [];
    if (!left) return done();
    list.forEach(function (x) {
      var img = new Image();
      img.onload = function () { if (--left === 0) done(); };
      img.onerror = function () {
        App._checkImages.push({ kind: 'missing-image', where: x.path, detail: x.src });
        if (--left === 0) done();
      };
      img.src = x.src;
    });
  }

  App.renderCheck = function () {
    var u = App.util;
    if (App._config) App.initLang(App._config);
    var root = document.getElementById('app');
    root.innerHTML = '<main class="ck"><h1>' + u.esc(App.ui('ck_title')) + '</h1><p id="check-summary" class="ck-summary"></p><div id="check-list"></div></main>';
    probeImages(function () {
      var r = App.check(), errs = r.errors.concat(App._checkImages), warns = r.warnings;
      var sum = document.getElementById('check-summary');
      sum.textContent = App.ui('ck_summary').replace('{e}', errs.length).replace('{w}', warns.length);
      sum.className = 'ck-summary ' + (errs.length ? 'is-bad' : 'is-ok');
      function rows(list, cls) {
        return list.map(function (x) {
          return '<tr class="' + cls + '"><td>' + u.esc(App.ui('ck_' + x.kind.replace(/-/g, '_'))) + '</td><td><code>' + u.esc(x.where) + '</code></td><td>' + u.esc(x.detail) + '</td></tr>';
        }).join('');
      }
      document.getElementById('check-list').innerHTML = (errs.length || warns.length)
        ? '<table class="app-table"><thead><tr><th>' + u.esc(App.ui('ck_kind')) + '</th><th>' + u.esc(App.ui('ck_where')) + '</th><th>' + u.esc(App.ui('ck_detail')) + '</th></tr></thead><tbody>' +
          rows(errs, 'ck-err') + rows(warns, 'ck-warn') + '</tbody></table>'
        : '<p class="app-empty">' + u.esc(App.ui('ck_ok')) + '</p>';
      sum.setAttribute('data-done', '1');
    });
  };
})(window.App = window.App || {});
