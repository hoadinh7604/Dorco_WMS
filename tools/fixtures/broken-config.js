App.block('guide', { render: function () { return '<p>ok</p>'; } });
App.data('g', { screens: [] });
App.config({
  project: { code: 'TEST', name: 'Test' },
  languages: [{ code: 'vi', label: 'Việt' }],
  defaultLanguage: 'vi',
  sections: [
    { id: 'ok', type: 'guide', data: 'g', title: 'Có dữ liệu' },
    { id: 'thieu', type: 'guide', data: 'guide', title: 'Thiếu dữ liệu' }
  ]
});
