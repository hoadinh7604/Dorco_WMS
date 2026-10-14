/* Dữ liệu mẫu cho khối guide (chỉ dùng trong kiểm thử). */
/* Đường dẫn ảnh tính từ trang HTML đang mở (ở dự án thật: 'content/assets/<ten-anh>.png'). */
App.data('guide', { screens: [
  { id: 'nhap-kho', title: { vi: 'Nhập kho bằng PDA', en: 'Receiving with PDA', ko: 'PDA 입고' },
    image: 'sample.png',
    purpose: { vi: 'Quét tem để nhập hàng vào kho.', en: 'Scan labels to receive goods.', ko: '라벨을 스캔해 입고합니다.' },
    steps: [ { vi: 'Mở chức năng Nhập kho', en: 'Open Receiving', ko: '입고 기능 열기' },
             { vi: 'Quét tem pallet', en: 'Scan the pallet label', ko: '팔레트 라벨 스캔' },
             { vi: 'Bấm Xác nhận', en: 'Tap Confirm', ko: '확인 누르기' } ],
    notes: [ { vi: 'Tem phải còn nguyên.', en: 'Labels must be intact.', ko: '라벨이 손상되지 않아야 합니다.' } ] },
  { id: 'duyet', title: { vi: 'Duyệt phiếu trên WMS', en: 'Approve notes in WMS', ko: 'WMS 전표 승인' },
    image: 'khong-co-anh.png',
    steps: [ { vi: 'Chọn phiếu chờ duyệt', en: 'Select a pending note', ko: '승인 대기 전표 선택' },
             { vi: 'Bấm Duyệt', en: 'Click Approve', ko: '승인 클릭' } ] }
] });
