/* Lỗi người sửa tay hay gặp — dùng để kiểm thử trang tự kiểm tra. */
App.data('features', { categories: [ { id: 'web', color: 'xanh', label: 'Web',
  groups: [ { title: 'Nhóm', item: [ { vi: 'A', en: 'A', ko: 'A' } ] } ] } ] });
App.data('processes', { lanes: [ { id: 'p1', number: '1', color: 'mau-la', title: 'Quy trình',
  groups: [ { step: [] }, { steps: [ { title: 'B', icon: 'pda', bullets: 'một chuỗi' } ] } ] } ] });
App.data('requirements', { modules: [ { id: 'm', title: 'M', rows: [ { function: 'F', current: 'chuỗi', requirements: [ { plant: 'XX', text: 'T' } ] } ] } ] });
App.config({
  project: { code: 'BAD2', name: 'Bad 2' },
  languages: [ { code: 'vi', label: 'Việt' } ], defaultLanguage: 'vi',
  plants: [ { code: 'HY', name: 'Hưng Yên' } ],
  sections: [
    { id: 'f', type: 'feature-list', data: 'features', title: 'F' },
    { id: 'p', type: 'process-flow', data: 'processes', title: 'P' },
    { id: 'r', type: 'requirement-table', data: 'requirements', title: 'R' }
  ]
});
