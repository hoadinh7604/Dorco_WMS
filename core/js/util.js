/* core/js/util.js — tiện ích dùng chung (không phụ thuộc file khác). */
(function (App) {
  'use strict';
  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ESC[c]; });
  }

  /* Bỏ dấu một ký tự (giữ độ dài 1 → 0..n ký tự), không gộp khoảng trắng. */
  function foldChar(c) {
    return c.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
  }

  /* Chuẩn hoá để tìm kiếm: bỏ dấu, đ→d, chữ thường, gộp khoảng trắng. */
  function norm(s) {
    return foldChar(String(s == null ? '' : s)).replace(/\s+/g, ' ').trim();
  }

  /* Tô sáng phần khớp q (q đã norm) trong text; trả HTML đã escape. */
  function highlight(text, q) {
    text = String(text == null ? '' : text);
    if (!q) return esc(text);
    var folded = '', map = [];
    for (var i = 0; i < text.length; i++) {
      var f = foldChar(text[i]);
      for (var k = 0; k < f.length; k++) { folded += f[k]; map.push(i); }
    }
    var at = folded.indexOf(q);
    if (at < 0) return esc(text);
    var start = map[at], end = map[at + q.length - 1] + 1;
    return esc(text.slice(0, start)) + '<mark>' + esc(text.slice(start, end)) + '</mark>' + esc(text.slice(end));
  }

  /* Gộp mọi ngôn ngữ của một chữ (chuỗi thường hoặc { vi, en, ko, ... }) để tìm kiếm. */
  function textAll(x) {
    if (x == null) return '';
    if (typeof x !== 'object') return String(x);
    return Object.keys(x).map(function (k) { return x[k]; }).join(' ');
  }

  App.util = { esc: esc, norm: norm, highlight: highlight, textAll: textAll };
})(window.App = window.App || {});
