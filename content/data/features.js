/* content/data/features.js — Danh sách tính năng.
 *
 * Cấu trúc: categories → groups → items.
 *  - Thêm một tính năng: chép một dòng trong "items" và sửa chữ ở 3 ngôn ngữ.
 *    Số thứ tự (STT) và các ô thống kê tự tính, không cần sửa.
 *  - Nhóm tích hợp có thêm direction: 'SAP→WMS' hoặc 'WMS→SAP', và api: tên API (hiện thành cột API).
 *  - link: 'quy-trinh' hiện liên kết sang mục Sơ đồ quy trình.
 */
App.data('features', { categories: [
  {
    "id": "web",
    "color": "blue",
    "label": { "vi": "WMS Web", "en": "WMS Web", "ko": "WMS 웹" },
    "description": { "vi": "Chức năng trên phần mềm WMS (máy tính)", "en": "Functions in the WMS software (desktop)", "ko": "WMS 소프트웨어 기능 (PC)" },
    "groups": [
      {
        "title": { "vi": "Master data", "en": "Master Data", "ko": "기준정보" },
        "items": [
          { "vi": "Khai báo đối tác (khách hàng)", "en": "Partner (Customer) Setup", "ko": "고객(거래처) 등록" },
          { "vi": "Khai báo đối tác (NCC)", "en": "Partner (Vender) Setup", "ko": "공급업체 등록" },
          { "vi": "Khai báo mặt hàng", "en": "Item Setup", "ko": "품목 등록" },
          { "vi": "Tra cứu mặt hàng", "en": "Item Lookup", "ko": "품목 조회" },
          { "vi": "Khai báo kho", "en": "Warehouse Setup", "ko": "창고 등록" },
          { "vi": "Khai báo vị trí kho", "en": "Warehouse Location Setup", "ko": "창고 로케이션 등록" }
        ]
      },
      {
        "title": { "vi": "Tem QR", "en": "QR Code Label", "ko": "QR 라벨" },
        "items": [
          { "vi": "Phát hành nhãn Nguyên vật liệu (Có SO)", "en": "Raw Material Label Printing (with SO)", "ko": "원자재 라벨 발행 (SO 포함)" },
          { "vi": "Phát hành nhãn thành phẩm (Lot có ngày sản xuất)", "en": "Finished Goods Label Printing (Lot with Production Date)", "ko": "완제품 라벨 발행 (생산일자 포함 LOT)" },
          { "vi": "Tách/gộp barcode", "en": "Barcode Split/Merge", "ko": "바코드 분할/병합" }
        ]
      },
      {
        "title": { "vi": "Quy trình nguyên vật liệu", "en": "Raw Material Process", "ko": "원자재 프로세스" },
        "link": "quy-trinh",
        "items": [
          { "vi": "Yêu cầu nhập Nguyên vật liệu", "en": "Raw Material Receipt Request", "ko": "원자재 입고 요청" },
          { "vi": "Lập phiếu nhập Nguyên vật liệu", "en": "Create Raw Material Receipt", "ko": "원자재 입고전표 작성" },
          { "vi": "Yêu cầu trả lại NCC", "en": "Return to Supplier Request", "ko": "공급업체 반품 요청" },
          { "vi": "Lập phiếu trả hàng NCC", "en": "Create Supplier Return Note", "ko": "공급업체 반품전표 작성" },
          { "vi": "Yêu cầu xuất Nguyên vật liệu (xuất sản xuất, tiêu hao)", "en": "Raw Material Issue Request (Production Issue, Consumption)", "ko": "원자재 출고 요청 (생산 출고, 소모)" },
          { "vi": "Lập phiếu xuất Nguyên vật liệu", "en": "Create Raw Material Issue Note", "ko": "원자재 출고전표 작성" },
          { "vi": "Yêu cầu trả lại Nguyên vật liệu từ chuyền", "en": "Raw Material Return from Line Request", "ko": "라인 원자재 반납 요청" },
          { "vi": "Nhập kho Trả về từ chuyền", "en": "Receipt of Returns from Line", "ko": "라인 반납품 입고" }
        ]
      },
      {
        "title": { "vi": "Quy trình gia công", "en": "Subcontracting Process", "ko": "외주가공 프로세스" },
        "link": "quy-trinh",
        "items": [
          { "vi": "Yêu cầu xuất đi gia công", "en": "Subcontracting Outbound Request", "ko": "외주가공 출고 요청" },
          { "vi": "Lập phiếu xuất đi  gia công", "en": "Subcontracting Outbound Slip", "ko": "외주가공 출고전표 작성" },
          { "vi": "Yêu cầu nhập hàng gia công về", "en": "Subcontracted Goods Receipt Request", "ko": "외주가공품 입고 요청" },
          { "vi": "Nhập kho hàng gia công về", "en": "Subcontracted Goods Receipt", "ko": "외주가공품 입고" }
        ]
      },
      {
        "title": { "vi": "Quy trình thành phẩm", "en": "Finished Goods Process", "ko": "완제품 프로세스" },
        "items": [
          { "vi": "Yêu cầu nhập kho Thành phẩm", "en": "Finished Goods Receipt Request", "ko": "완제품 입고 요청" },
          { "vi": "Lập phiếu nhập thành phẩm", "en": "Create Finished Goods Receipt", "ko": "완제품 입고전표 작성" },
          { "vi": "Yêu cầu xuất hàng", "en": "Shipment Request", "ko": "출하 요청" },
          { "vi": "Lập phiếu xuất hàng", "en": "Create Shipment Note", "ko": "출하전표 작성" },
          { "vi": "Yêu cầu trả hàng", "en": "Return Request", "ko": "반품 요청" },
          { "vi": "Lập phiếu trả hàng", "en": "Create Return Note", "ko": "반품전표 작성" }
        ]
      },
      {
        "title": { "vi": "Chuyển kho", "en": "Warehouse Transfer", "ko": "창고 이동" },
        "items": [
          { "vi": "Yêu cầu chuyển kho", "en": "Warehouse Transfer Request", "ko": "창고 이동 요청" },
          { "vi": "Lập phiếu chuyển kho", "en": "Create Warehouse Transfer Note", "ko": "창고 이동전표 작성" }
        ]
      },
      {
        "title": { "vi": "NV khác", "en": "Other Transactions", "ko": "기타 거래" },
        "items": [
          { "vi": "Lập phiếu hủy tồn kho", "en": "Create Inventory Disposal Note", "ko": "재고 폐기전표 작성" },
          { "vi": "Lập phiếu nhập khác", "en": "Create Other Receipt Note", "ko": "기타 입고전표 작성" },
          { "vi": "Lập phiếu Xuất khác", "en": "Create Other Issue Note", "ko": "기타 출고전표 작성" }
        ]
      },
      {
        "title": { "vi": "Kiểm kê", "en": "Stocktaking", "ko": "재고실사" },
        "items": [
          { "vi": "Quét kiểm kê (app di động)", "en": "Stocktaking Scan (Mobile App)", "ko": "재고실사 스캔 (모바일 앱)" },
          { "vi": "So sánh kết quả kiểm kê", "en": "Stocktaking Result Comparison", "ko": "재고실사 결과 비교" },
          { "vi": "Điều chỉnh tồn theo barcode", "en": "Inventory Adjustment by Barcode", "ko": "바코드별 재고 조정" },
          { "vi": "Chốt tồn kho", "en": "Inventory Closing", "ko": "재고 마감" }
        ]
      },
      {
        "title": { "vi": "Tiện ích bổ sung", "en": "Additional Utilities", "ko": "추가 기능" },
        "items": [
          { "vi": "Nâng cấp FIFO", "en": "FIFO Upgrade", "ko": "FIFO 고도화" },
          { "vi": "Quản lý Lot / hạn sử dụng", "en": "Lot / Expiry Date Management", "ko": "LOT / 유효기간 관리" },
          { "vi": "Cảnh báo tồn Min/Max", "en": "Min/Max Inventory Alert", "ko": "재고 Min/Max 알림" },
          { "vi": "Kiểm soát duyệt xuất kho", "en": "Warehouse Issue Approval Control", "ko": "출고 승인 관리" }
        ]
      },
      {
        "title": { "vi": "Kiểm tra tồn", "en": "Inventory Inquiry", "ko": "재고 조회" },
        "items": [
          { "vi": "Tra tồn kho (theo mã hàng/đối tác/PO/Lot)", "en": "Inventory Lookup (by Item Code/Partner/PO/Lot)", "ko": "재고 조회 (품목코드/거래처/PO/LOT별)" },
          { "vi": "Tra barcode (theo mã hàng/barcode/đối tác/PO/Lot)", "en": "Barcode Lookup (by Item Code/Barcode/Partner/PO/Lot)", "ko": "바코드 조회 (품목코드/바코드/거래처/PO/LOT별)" },
          { "vi": "Lịch sử barcode", "en": "Barcode History", "ko": "바코드 이력" },
          { "vi": "Giám sát tồn theo vị trí", "en": "Inventory Monitoring by Location", "ko": "로케이션별 재고 모니터링" },
          { "vi": "Tra tồn kho (theo giao dịch & phiếu)", "en": "Inventory Lookup (by Transaction & Document)", "ko": "재고 조회 (거래 및 전표별)" },
          { "vi": "Báo cáo tồn kho thể hiện ngày nhập và xuất mới nhất", "en": "The inventory report displays the latest receipt date and latest issue date", "ko": "최근 입고일·출고일 표시 재고 보고서" }
        ]
      }
    ]
  },
  {
    "id": "app",
    "color": "green",
    "label": { "vi": "Mobile App / PDA", "en": "Mobile App / PDA", "ko": "모바일 앱 / PDA" },
    "description": { "vi": "Chức năng trên thiết bị cầm tay tại kho", "en": "Functions on handheld devices in the warehouse", "ko": "창고 휴대 단말기 기능" },
    "groups": [
      {
        "title": { "vi": "Thao tác trên app", "en": "App operations", "ko": "앱 작업" },
        "items": [
          { "vi": "Nhập kho Nguyên vật liệu", "en": "Raw Material Receipt", "ko": "원자재 입고" },
          { "vi": "Xuất kho Trả lại nhà cung cấp", "en": "Return to Supplier Issue", "ko": "공급업체 반품 출고" },
          { "vi": "Xuất kho Nguyên vật liệu cho chuyền", "en": "Raw Material Issue to Line", "ko": "라인 원자재 출고" },
          { "vi": "Nhập kho trả lại từ chuyền", "en": "Receipt of Returns from Line", "ko": "라인 반납품 입고" },
          { "vi": "Nhập kho thành phẩm", "en": "Finished Goods Receipt", "ko": "완제품 입고" },
          { "vi": "Xuất kho thành phẩm", "en": "Finished Goods Issue", "ko": "완제품 출고" },
          { "vi": "Nhập kho hàng bán bị trả lại", "en": "Receipt of Sales Returns", "ko": "판매 반품 입고" },
          { "vi": "Chuyển kho", "en": "Warehouse Transfer", "ko": "창고 이동" },
          { "vi": "Lập phiếu hủy tồn kho", "en": "Create Inventory Disposal Note", "ko": "재고 폐기전표 작성" },
          { "vi": "Lập phiếu nhập khác", "en": "Create Other Receipt Note", "ko": "기타 입고전표 작성" },
          { "vi": "Lập phiếu Xuất khác", "en": "Create Other Issue Note", "ko": "기타 출고전표 작성" },
          { "vi": "Kiểm kê", "en": "Stocktaking", "ko": "재고실사" },
          { "vi": "Gộp/tách barcode", "en": "Barcode Merge/Split", "ko": "바코드 병합/분할" },
          { "vi": "Kiểm tra tồn kho", "en": "Inventory Check", "ko": "재고 확인" }
        ]
      }
    ]
  },
  {
    "id": "api",
    "color": "purple",
    "label": { "vi": "Tích hợp ERP (SAP) ⇄ WMS", "en": "ERP (SAP) ⇄ WMS integration", "ko": "ERP (SAP) ⇄ WMS 연동" },
    "description": { "vi": "Dữ liệu đồng bộ giữa SAP và WMS", "en": "Data synchronized between SAP and WMS", "ko": "SAP와 WMS 간 동기화 데이터" },
    "groups": [
      {
        "title": { "vi": "Danh sách API tích hợp", "en": "Integration API list", "ko": "연동 API 목록" },
        "items": [
          { "vi": "Master data: công ty", "en": "Master Data: Company", "ko": "기준정보: 회사", "direction": "SAP→WMS", "api": "/api/Company/Create" },
          { "vi": "Master data: kho", "en": "Master Data: Warehouses", "ko": "기준정보: 창고", "direction": "SAP→WMS", "api": "/api/Warehouse/Create" },
          { "vi": "Master data: đối tác (NCC/khách hàng)", "en": "Master Data: Partners (Supplier/Customer)", "ko": "기준정보: 거래처 (공급업체/고객)", "direction": "SAP→WMS", "api": "/api/Partner/Create" },
          { "vi": "Master data: loại hàng", "en": "Master Data: Item Types", "ko": "기준정보: 품목 유형", "direction": "SAP→WMS", "api": "/api/itemType/Create" },
          { "vi": "Master data: nhóm hàng", "en": "Master Data: Item Groups", "ko": "기준정보: 품목 그룹", "direction": "SAP→WMS", "api": "/api/itemGroup/Create" },
          { "vi": "Master data: mặt hàng", "en": "Master Data: Items", "ko": "기준정보: 품목", "direction": "SAP→WMS", "api": "/api/GoodsAndSupplies/Create" },
          { "vi": "Phiếu nhập kho nguyên vật liệu", "en": "Raw Material Receipt Note", "ko": "원자재 입고전표", "direction": "WMS→SAP", "api": "/api/MaterialReceiptResult/Create" },
          { "vi": "Phiếu xuất kho trả lại hàng nhà cung cấp", "en": "Supplier Return Issue Note", "ko": "공급업체 반품 출고전표", "direction": "WMS→SAP", "api": "/api/PurchaseReturn/Create" },
          { "vi": "Yêu cầu xuất kho Nguyên vật liệu", "en": "Raw Material Issue Request", "ko": "원자재 출고 요청", "direction": "SAP→WMS", "api": "/api/MaterialExportRequest/Create" },
          { "vi": "Kết quả xuất kho Nguyên vật liệu", "en": "Raw Material Issue Result", "ko": "원자재 출고 결과", "direction": "WMS→SAP", "api": "/api/MaterialExportResult/Create" },
          { "vi": "Yêu cầu trả lại Nguyên vật liệu từ chuyền", "en": "Raw Material Return from Line Request", "ko": "라인 원자재 반납 요청", "direction": "SAP→WMS", "api": "/api/MaterialReturnFromLineRequest/Create" },
          { "vi": "Nhập kho Trả về từ chuyền", "en": "Receipt of Returns from Line", "ko": "라인 반납품 입고", "direction": "WMS→SAP", "api": "/api/MaterialReturnFromLineReceipt/Create" },
          { "vi": "Phiếu xuất kho hàng đi gia công", "en": "Subcontracting Delivery Slip", "ko": "외주가공 출고전표", "direction": "WMS→SAP", "api": "/api/MaterialIssueForProcessing/Create" },
          { "vi": "Phiếu nhập kho hàng gia công về", "en": "Subcontracted Goods Receipt Note", "ko": "외주가공품 입고전표", "direction": "WMS→SAP", "api": "/api/MaterialReceiptFromProcessing/Create" },
          { "vi": "Yêu cầu nhập kho Thành phẩm", "en": "Finished Goods Receipt Request", "ko": "완제품 입고 요청", "direction": "SAP→WMS", "api": "/api/FinishedGoodsReceiptRequest/Create" },
          { "vi": "Kết quả nhập kho Thành phẩm", "en": "Finished Goods Receipt Result", "ko": "완제품 입고 결과", "direction": "WMS→SAP", "api": "/api/FinishedGoodsReceiptResult/Create" },
          { "vi": "Lệnh giao hàng", "en": "Delivery Order", "ko": "출하 지시", "direction": "SAP→WMS", "api": "/api/DeliveryOrder" },
          { "vi": "Yêu cầu HBTL", "en": "Sales Return Receipt Request", "ko": "판매 반품 입고 요청", "direction": "SAP→WMS", "api": "/api/SalesReturnRequest/Create" },
          { "vi": "Kết quả xuất kho Thành phẩm", "en": "Finished Goods Issue Result", "ko": "완제품 출고 결과", "direction": "WMS→SAP", "api": "/api/FinishedGoodsExportResult/Create" },
          { "vi": "Kết quả nhập HBTL", "en": "Sales Return Receipt Result", "ko": "판매 반품 입고 결과", "direction": "WMS→SAP", "api": "/api/SalesReturnResult/Create" },
          { "vi": "Kết quả chuyển kho", "en": "Warehouse Transfer Result", "ko": "창고 이동 결과", "direction": "WMS→SAP", "api": "/api/TransferWarehouseResult/Create" },
          { "vi": "Kết quả kiểm kê (theo kho & mã hàng)", "en": "Stocktaking Result (by Warehouse & Item Code)", "ko": "재고실사 결과 (창고 및 품목코드별)", "direction": "WMS→SAP", "api": "/api/StockCheckingResult/Create" },
          { "vi": "Điều chỉnh tồn kho", "en": "Inventory Adjustment", "ko": "재고 조정", "direction": "WMS→SAP", "api": "/api/StockAdjustment/Create" },
          { "vi": "Kiểm tra tồn kho", "en": "Inventory Check", "ko": "재고 확인", "direction": "WMS→SAP", "api": "/api/GetStockChecking" },
          { "vi": "Tồn kho hằng ngày", "en": "Daily Inventory", "ko": "일일 재고", "direction": "WMS→SAP", "api": "/api/GetDailyStock" },
          { "vi": "Chốt tồn cuối tháng", "en": "Month-End Inventory Closing", "ko": "월말 재고 마감", "direction": "WMS→SAP", "api": "/api/MonthlyStockClosing/Create" }
        ]
      }
    ]
  }
] });
