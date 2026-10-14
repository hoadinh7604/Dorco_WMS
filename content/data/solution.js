/* content/data/solution.js — Chi tiết giải pháp (mục 04).
 *
 * Cấu trúc: groups (4.1 Master data, 4.2 …) → screens (từng màn hình).
 *  - Thêm màn hình: chép một khối trong "screens", đổi id, tiêu đề, ảnh và diễn giải.
 *  - Ảnh để trong content/assets/<nhóm>/<tên>.png; đường dẫn tính từ index.html.
 *  - wide: true → ảnh rộng toàn khung, diễn giải nằm bên dưới.
 */
App.data('solution', { groups: [
  {
    id: 'master-data',
    title: { vi: '4.1 Master data', en: '4.1 Master data', ko: '4.1 기준정보' },
    intro: {
      vi: 'Các danh mục nền của WMS. Dữ liệu được khai báo một lần và dùng lại ở mọi nghiệp vụ nhập, xuất, chuyển kho và kiểm kê.',
      en: 'The base master data of the WMS. It is set up once and reused by every receipt, issue, transfer and stocktaking transaction.',
      ko: 'WMS의 기본 기준정보입니다. 한 번 등록하면 모든 입고·출고·창고 이동·재고실사 업무에서 재사용됩니다.'
    },
    screens: [
      {
        id: 'organization',
        wide: true,
        title: { vi: '1.1 Danh mục cơ cấu tổ chức (Organization)', en: '1.1 Organization structure', ko: '1.1 조직 구조 (Organization)' },
        image: 'content/assets/master-data/organization.png',
        purpose: {
          vi: 'Khai báo cơ cấu tổ chức dạng cây: Công ty → Kho. Mọi phiếu nhập, xuất, chuyển kho trên WMS đều gắn với một nút trong cây này. Đường dẫn: General Setup › Organization Setup › Organization.',
          en: 'Defines the organization as a tree: Company → Warehouse. Every receipt, issue and transfer in the WMS belongs to a node of this tree. Path: General Setup › Organization Setup › Organization.',
          ko: '조직을 회사 → 창고의 트리 구조로 등록합니다. WMS의 모든 입고·출고·이동 전표는 이 트리의 한 노드에 속합니다. 경로: General Setup › Organization Setup › Organization.'
        },
        stepsTitle: { vi: 'Diễn giải màn hình', en: 'Screen walkthrough', ko: '화면 설명' },
        steps: [
          { vi: 'Menu trái: chức năng nằm trong General Setup › Organization Setup, cùng nhóm với Common Code, Location Master, Currency Master, Country và Generation Rules.',
            en: 'Left menu: the function sits under General Setup › Organization Setup, next to Common Code, Location Master, Currency Master, Country and Generation Rules.',
            ko: '왼쪽 메뉴: General Setup › Organization Setup 아래에 있으며 Common Code, Location Master, Currency Master, Country, Generation Rules와 같은 그룹입니다.' },
          { vi: 'Organization Tree (khung trái): hiển thị cây tổ chức, mỗi nút gồm mã trong ngoặc vuông và tên. Ô tìm kiếm lọc theo mã hoặc tên; nút làm mới tải lại cây; nút “+ Add Organization” thêm nút con dưới nút đang chọn.',
            en: 'Organization Tree (left panel): shows the tree; each node has its code in square brackets and its name. The search box filters by code or name; the refresh button reloads the tree; “+ Add Organization” adds a child under the selected node.',
            ko: 'Organization Tree(왼쪽): 조직 트리를 표시하며 각 노드는 대괄호 안의 코드와 이름으로 구성됩니다. 검색창은 코드나 이름으로 필터링하고, 새로고침 버튼은 트리를 다시 불러오며, “+ Add Organization”은 선택한 노드 아래에 하위 노드를 추가합니다.' },
          { vi: 'Cấp 1 – Công ty: [DORCO_CPN] Công ty TNHH Dorco Vina (2000) và [DORCO_LV] Công ty TNHH Dorco Living (2100).',
            en: 'Level 1 – Company: [DORCO_CPN] Dorco Vina Co., Ltd. (2000) and [DORCO_LV] Dorco Living Co., Ltd. (2100).',
            ko: '1레벨 – 회사: [DORCO_CPN] Dorco Vina(2000), [DORCO_LV] Dorco Living(2100).' },
          { vi: 'Cấp 2 – Kho thuộc công ty. Dorco Vina: K01 Kho 1000 (NVL, BTP), K02 Kho 5900 (hàng bán trả lại), K03 Kho 5000 (TP), K04 Kho 9000 (hàng lỗi); các kho 1003, 3013, 3903, 5003, 5900, 9300, 1004, 3004, 5004 và KTN kho thuê ngoài. Dorco Living: kho 1000, 3000, 5000…',
            en: 'Level 2 – Warehouses of the company. Dorco Vina: K01 warehouse 1000 (raw/semi-finished), K02 warehouse 5900 (sales returns), K03 warehouse 5000 (FG), K04 warehouse 9000 (defective); warehouses 1003, 3013, 3903, 5003, 5900, 9300, 1004, 3004, 5004 and KTN external warehouse. Dorco Living: warehouses 1000, 3000, 5000…',
            ko: '2레벨 – 회사 소속 창고. Dorco Vina: K01 1000 창고(원자재·반제품), K02 5900 창고(판매 반품), K03 5000 창고(완제품), K04 9000 창고(불량), 1003·3013·3903·5003·5900·9300·1004·3004·5004 창고 및 KTN 외부 임차창고. Dorco Living: 1000, 3000, 5000 창고 등.' },
          { vi: 'Company Details (khung phải): chọn một nút để xem và sửa thông tin. Company Code là mã định danh, không sửa được; Company Name là tên hiển thị; Organization Type cho biết nút là Công ty hay Kho; Level là cấp trong cây, hệ thống tự tính.',
            en: 'Company Details (right panel): select a node to view and edit it. Company Code is the identifier and cannot be changed; Company Name is the display name; Organization Type tells whether the node is a company or a warehouse; Level is the depth in the tree, calculated by the system.',
            ko: 'Company Details(오른쪽): 노드를 선택하면 정보를 보고 수정할 수 있습니다. Company Code는 식별 코드로 수정할 수 없고, Company Name은 표시 이름, Organization Type은 회사/창고 구분, Level은 트리 내 단계로 시스템이 자동 계산합니다.' },
          { vi: 'Address là địa chỉ của công ty / kho; Status chọn Active (đang dùng) hoặc Inactive (ngừng dùng).',
            en: 'Address is the company / warehouse address; Status is Active (in use) or Inactive (no longer used).',
            ko: 'Address는 회사/창고 주소이며, Status는 Active(사용) 또는 Inactive(사용 중지)를 선택합니다.' },
          { vi: 'Bấm Save để lưu thay đổi, Cancel để bỏ thay đổi đang nhập.',
            en: 'Click Save to keep the changes, Cancel to discard them.',
            ko: 'Save를 누르면 저장되고 Cancel을 누르면 입력 중인 변경이 취소됩니다.' }
        ],
        notes: [
          { vi: 'Danh mục công ty và kho được đồng bộ từ SAP; mã kho trên WMS trùng mã kho trên SAP.',
            en: 'Companies and warehouses are synced from SAP; WMS warehouse codes match the SAP codes.',
            ko: '회사·창고 기준정보는 SAP에서 연동되며, WMS 창고 코드는 SAP 창고 코드와 같습니다.' },
          { vi: 'Vị trí (kệ, khoang) trong từng kho được khai báo riêng ở Location Master và chỉ quản lý trên WMS.',
            en: 'Locations (racks, bins) inside each warehouse are set up separately in Location Master and are managed in WMS only.',
            ko: '각 창고의 로케이션(랙, 칸)은 Location Master에서 별도로 등록하며 WMS에서만 관리합니다.' }
        ]
      }
    ]
  }
] });
