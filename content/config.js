/* content/config.js — cấu hình dự án.
 *
 * Thêm một mục mới vào menu:
 *   1. Tạo file dữ liệu content/data/<ten>.js  (gọi App.data('<ten>', {...}))
 *   2. Nạp file đó trong index.html (dòng <script src="content/data/<ten>.js">)
 *   3. Thêm một dòng vào "sections" bên dưới: { id, type, data: '<ten>', title }
 *      type là loại khối: 'process-flow' | 'feature-list' | 'requirement-table' | 'guide'
 * Chữ có thể viết thường ('Kho') hoặc theo ngôn ngữ ({ vi: 'Kho', en: 'Warehouse', ko: '창고' }).
 */
App.config({
  project: {
    code: 'DORCO',
    name: 'DORCO WMS',
    eyebrow: { vi: 'Sổ tay nghiệp vụ · WMS', en: 'WMS operations handbook', ko: 'WMS 업무 매뉴얼' },
    tagline: { vi: 'Quy trình kho & tính năng hệ thống', en: 'Warehouse processes & system features', ko: '창고 프로세스 및 시스템 기능' },
    footer:  { vi: 'Sổ tay nghiệp vụ DORCO WMS', en: 'DORCO WMS operations handbook', ko: 'DORCO WMS 업무 매뉴얼' }
  },

  languages: [
    { code: 'vi', label: 'Việt' },
    { code: 'en', label: 'English' },
    { code: 'ko', label: '한국어' }
  ],
  defaultLanguage: 'vi',

  /* Nhà máy — dùng cho nhãn HY / HN trong bảng yêu cầu. Bỏ trống nếu dự án không chia nhà máy. */
  plants: [
    { code: 'HY', name: { vi: 'Hưng Yên', en: 'Hung Yen', ko: '흥옌' } },
    { code: 'HN', name: { vi: 'Hà Nam', en: 'Ha Nam', ko: '하남' } }
  ],

  sections: [
    {
      id: 'quy-trinh', type: 'process-flow', data: 'processes',
      title:   { vi: 'Sơ đồ quy trình kho', en: 'Warehouse process flow', ko: '창고 프로세스 흐름도' },
      heading: { vi: 'Sơ đồ quy trình nghiệp vụ kho', en: 'Warehouse business process flow', ko: '창고 업무 프로세스 흐름도' },
      eyebrow: { vi: 'Quy trình nghiệp vụ', en: 'Business process', ko: '업무 프로세스' },
      intro: {
        vi: 'Tổng hợp từ khảo sát: 8 nhóm quy trình kho (Nguyên vật liệu, gia công, thành phẩm, bán hàng, chuyển kho, kiểm kê…) và điểm tích hợp SAP – WMS – PDA.',
        en: 'From the survey: 8 warehouse process groups (materials, outsourcing, finished goods, sales, transfers, stocktaking…) and SAP – WMS – PDA integration.',
        ko: '조사 결과 8개 창고 프로세스 그룹(원자재, 외주가공, 완제품, 판매, 이동, 재고실사 등)과 SAP – WMS – PDA 연동.'
      }
    },
    {
      id: 'tinh-nang', type: 'feature-list', data: 'features',
      title:   { vi: 'Danh sách tính năng', en: 'Feature list', ko: '기능 목록' },
      heading: { vi: 'Danh sách tính năng DORCO WMS', en: 'DORCO WMS feature list', ko: 'DORCO WMS 기능 목록' },
      eyebrow: { vi: 'Phạm vi hệ thống', en: 'System scope', ko: '시스템 범위' },
      intro: {
        vi: 'Các chức năng trên WMS Web, ứng dụng di động / PDA và các điểm tích hợp dữ liệu giữa SAP (ERP) và WMS.',
        en: 'Functions on WMS Web, the mobile app / PDA, and data integration points between SAP (ERP) and WMS.',
        ko: 'WMS 웹, 모바일 앱 / PDA 기능 및 SAP(ERP)와 WMS 간 데이터 연동 항목.'
      },
      subs: [
        { id: 'web', title: { vi: 'WMS Web', en: 'WMS Web', ko: 'WMS 웹' } },
        { id: 'app', title: { vi: 'Mobile App / PDA', en: 'Mobile App / PDA', ko: '모바일 앱 / PDA' } },
        { id: 'api', title: { vi: 'Tích hợp ERP (SAP) ⇄ WMS', en: 'ERP (SAP) ⇄ WMS integration', ko: 'ERP (SAP) ⇄ WMS 연동' } }
      ]
    },
    {
      id: 'yeu-cau', type: 'requirement-table', data: 'requirements',
      title:   { vi: 'Requirements (Xác nhận)', en: 'Requirements (Confirmation)', ko: '요구사항 (확인)' },
      heading: { vi: 'Tổng hợp hiện trạng & yêu cầu nghiệp vụ', en: 'Current processes & business requirements', ko: '현행 프로세스 및 업무 요구사항' },
      eyebrow: { vi: 'Requirements (Confirmation)', en: 'Requirements (Confirmation)', ko: '요구사항 (확인)' },
      intro: {
        vi: 'Tổng hợp từ khảo sát tại Hưng Yên (02 – 05/2026) và Hà Nam (10/2026): quy trình quản lý kho hiện tại và yêu cầu nghiệp vụ khi triển khai WMS, sắp xếp theo phân hệ.',
        en: 'Compiled from surveys at Hung Yen (02 – 05/2026) and Ha Nam (10/2026): current warehouse processes and business requirements for the WMS rollout, organized by module.',
        ko: '흥옌(2026/02 – 05)·하남(2026/10) 조사 기반: 현행 창고 관리 프로세스와 WMS 도입 업무 요구사항을 모듈별로 정리.'
      }
    }
  ]
});
