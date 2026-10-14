/* Dữ liệu cố tình sai để kiểm thử trang tự kiểm tra. */
App.data('processes', { lanes: [ { id: 'p1', number: '1', color: 'blue', title: { vi: 'Quy trình', en: 'Process' },
  groups: [ { steps: [ { title: 'Bước', icon: 'khong-co-icon', systems: ['WMS'] } ] } ] } ] });
App.data('guide', { screens: [ { id: 's1', title: 'Màn hình', image: 'khong-co-anh.png', steps: ['Một'] } ] });
App.config({
  project: { code: 'BAD', name: 'Bad' },
  languages: [ { code: 'vi', label: 'Việt' }, { code: 'en', label: 'English' }, { code: 'ko', label: '한국어' } ],
  defaultLanguage: 'vi',
  sections: [
    { id: 'a', type: 'process-flow', data: 'processes', title: 'A' },
    { id: 'a', type: 'guide', data: 'guide', title: 'A trùng' },
    { id: 'b', type: 'khong-co-khoi', data: 'processes', title: 'B' },
    { id: 'c', type: 'guide', data: 'thieu', title: 'C' }
  ]
});
