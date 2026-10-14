/* core/js/i18n.js — ngôn ngữ, bản dịch, chữ giao diện. */
(function (App) {
  'use strict';
  var KEY = 'wms-lang';
  var current = 'vi', codes = ['vi'], fallback = 'vi';
  App._strings = App._strings || {};
  App.missing = [];

  function store(get, val) {
    try {
      if (get) return window.localStorage.getItem(KEY);
      window.localStorage.setItem(KEY, val);
    } catch (e) { /* localStorage bị chặn: bỏ qua */ }
    return null;
  }

  App.strings = function (lang, obj) {
    var t = App._strings[lang] = App._strings[lang] || {};
    for (var k in obj) t[k] = obj[k];
  };

  App.t = function (x) {
    if (x == null) return '';
    if (typeof x !== 'object') return String(x);
    if (x[current] != null) return x[current];
    if (x[fallback] != null) {
      App.missing.push({ lang: current, sample: x[fallback] });
      return x[fallback];
    }
    App.missing.push({ lang: current, sample: JSON.stringify(x) });
    return '';
  };

  App.ui = function (key) {
    var s = App._strings[current], f = App._strings[fallback];
    if (s && s[key] != null) return s[key];
    if (f && f[key] != null) return f[key];
    return key;
  };

  App.lang = function () { return current; };

  App.setLang = function (code) {
    if (codes.indexOf(code) < 0) code = fallback;
    current = code;
    store(false, code);
    document.documentElement.lang = code;
    document.dispatchEvent(new CustomEvent('app:lang', { detail: code }));
  };

  App.initLang = function (config) {
    codes = (config.languages || [{ code: 'vi' }]).map(function (l) { return l.code; });
    fallback = config.defaultLanguage || codes[0];
    var fromUrl = null;
    try { fromUrl = new URLSearchParams(location.search).get('lang'); } catch (e) {}
    var pick = [fromUrl, store(true), fallback].filter(function (c) { return c && codes.indexOf(c) >= 0; })[0];
    current = pick || fallback;
    document.documentElement.lang = current;
  };
})(window.App = window.App || {});
