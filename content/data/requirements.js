/* content/data/requirements.js — Requirements: hiện trạng & yêu cầu nghiệp vụ.
 *
 * Cấu trúc: modules (Phân hệ) → rows (Chức năng) → current (Hiện trạng) / requirements (Yêu cầu).
 *  - Mỗi ý: { plant: 'HY' | 'HN' | '', text: { vi, en, ko } }
 *    plant phải là mã trong "plants" của content/config.js; để '' nếu áp dụng chung.
 *  - STT và ô Phân hệ (gộp dòng) tự tính.
 */
App.data('requirements', { modules: [
  {
    "id": "md",
    "title": { "vi": "Danh mục (Master data)", "en": "Master data", "ko": "기준정보" },
    "rows": [
      {
        "function": { "vi": "Tổ chức kho", "en": "Warehouse structure", "ko": "창고 구성" },
        "current": [
          {
            "plant": "HY",
            "text": { "vi": "Dorco Vina (2000) có 4 kho: 5000 thành phẩm, 1000 Nguyên vật liệu/BTP, 5900 hàng bán trả lại, 9000 hàng lỗi.", "en": "Dorco Vina (2000) has 4 warehouses: 5000 finished goods, 1000 raw/semi-finished, 5900 sales returns, 9000 defective.", "ko": "Dorco Vina(2000) 창고 4개: 5000 완제품, 1000 원자재/반제품, 5900 판매 반품, 9000 불량품." }
          },
          {
            "plant": "HN",
            "text": { "vi": "2 công ty Vina (2000) và Living (2100), 2 nhà máy Hà Nam A/B và kho thuê ngoài 5010 (BTP, thành phẩm).", "en": "2 companies, Vina (2000) and Living (2100), 2 plants (Ha Nam A/B) and an external warehouse 5010 (semi-finished, finished goods).", "ko": "법인 2개 Vina(2000)·Living(2100), 공장 2개(하남 A/B), 외부 임차창고 5010(반제품·완제품)." }
          },
          {
            "plant": "HN",
            "text": { "vi": "Vina – HN A: 1003 Nguyên vật liệu/BTP/NPL, 3013 kho SX (BTP), 3903 kho SX lắp ráp Thành phẩm, 5003 Thành phẩm, 5900 Thành phẩm trả lại, 9003 hàng lỗi. HN B: 1004 Nguyên vật liệu/BTP (tầng 2), 3004 kho SX Nguyên vật liệu/BTP (tầng 1), 5004 Thành phẩm.", "en": "Vina – HN A: 1003 raw/semi/sub-materials, 3013 production (semi-finished), 3903 assembly production, 5003 FG, 5900 FG returns, 9003 defective. HN B: 1004 raw/semi (floor 2), 3004 production raw/semi (floor 1), 5004 FG.", "ko": "Vina – 하남 A: 1003 원자재/반제품/부자재, 3013 생산(반제품), 3903 조립 생산, 5003 완제품, 5900 완제품 반품, 9003 불량. 하남 B: 1004 원자재/반제품(2층), 3004 생산 원자재/반제품(1층), 5004 완제품." }
          },
          {
            "plant": "HN",
            "text": { "vi": "Living – HN A: 1000 Nguyên vật liệu/BTP/NPL, 3000 kho SX (Nguyên vật liệu, BTP, Thành phẩm), 5000 Thành phẩm. HN B: 1004 Nguyên vật liệu (tầng 1), 3004 kho SX Nguyên vật liệu/BTP, 5004 Thành phẩm (tầng 1), 9000 hàng lỗi.", "en": "Living – HN A: 1000 raw/semi/sub-materials, 3000 production (raw, semi, FG), 5000 FG. HN B: 1004 raw (floor 1), 3004 production raw/semi, 5004 FG (floor 1), 9000 defective.", "ko": "Living – 하남 A: 1000 원자재/반제품/부자재, 3000 생산(원자재·반제품·완제품), 5000 완제품. 하남 B: 1004 원자재(1층), 3004 생산 원자재/반제품, 5004 완제품(1층), 9000 불량." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Đồng bộ danh mục công ty và kho từ SAP sang WMS.", "en": "Sync the company and warehouse master from SAP to WMS.", "ko": "법인·창고 기준정보를 SAP에서 WMS로 연동." }
          }
        ]
      },
      {
        "function": { "vi": "Vị trí kho", "en": "Storage locations", "ko": "로케이션" },
        "current": [
          {
            "plant": "",
            "text": { "vi": "Kho bố trí giá kệ nhiều tầng (A1, A2, B1, B2…), mỗi kệ chia khoang vị trí dạng A1-1-3, A1-002.", "en": "Multi-level racks (A1, A2, B1, B2…), each split into bins such as A1-1-3, A1-002.", "ko": "다단 랙(A1, A2, B1, B2…), 랙별 A1-1-3, A1-002 형식 로케이션." }
          },
          {
            "plant": "",
            "text": { "vi": "SAP không quản lý vị trí.", "en": "SAP does not manage locations.", "ko": "SAP는 로케이션을 관리하지 않음." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Vị trí chỉ quản lý trên WMS; kết quả đồng bộ sang SAP không kèm thông tin vị trí.", "en": "Locations are managed in WMS only; results synced to SAP carry no location data.", "ko": "로케이션은 WMS에서만 관리, SAP 연동 결과에는 로케이션 정보 미포함." }
          },
          {
            "plant": "HN",
            "text": { "vi": "Hà Nam A quản lý vị trí; Hà Nam B chỉ cần quản lý theo kho.", "en": "Ha Nam A manages locations; Ha Nam B only needs warehouse-level control.", "ko": "하남 A는 로케이션 관리, 하남 B는 창고 단위 관리만 필요." }
          }
        ]
      },
      {
        "function": { "vi": "Danh mục mặt hàng", "en": "Item master", "ko": "품목 기준정보" },
        "current": [
          {
            "plant": "",
            "text": { "vi": "Mã hàng quản lý trên SAP: 1 Material tương ứng 1 Checklist; Size/dimensions không bắt buộc. Không phân hạng hàng A/B/C.", "en": "Items are managed in SAP: 1 Material = 1 Checklist; Size/dimensions optional. No A/B/C grading.", "ko": "품목은 SAP에서 관리: Material 1개 = Checklist 1개, Size/dimensions 선택. A/B/C 등급 없음." }
          },
          {
            "plant": "",
            "text": { "vi": "Nguyên vật liệu đóng theo box / bó / bao trên pallet, xuất theo pallet, thùng, bó, bao, cái, kg, cuộn. Thành phẩm: thùng in số lượng, theo dõi theo cái và pallet.", "en": "Raw materials are packed in boxes / bundles / bags on pallets and issued by pallet, box, bundle, bag, piece, kg or roll. Finished goods: boxes printed with quantity, tracked by piece and pallet.", "ko": "원자재는 박스·묶음·포대 단위로 팔레트 적재, 팔레트·박스·묶음·포대·개·kg·롤 단위 출고. 완제품: 수량 인쇄 박스, 개·팔레트 단위 관리." }
          },
          {
            "plant": "",
            "text": { "vi": "Không theo dõi hạn sử dụng, chỉ theo dõi ngày nhập; hàng tồn trên 6 tháng thì xuất hủy.", "en": "No expiry tracking, only receipt dates; stock older than 6 months is disposed.", "ko": "유효기간 미관리, 입고일만 관리. 6개월 초과 재고는 폐기." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Đồng bộ danh mục mặt hàng từ SAP sang WMS.", "en": "Sync the item master from SAP to WMS.", "ko": "품목 기준정보를 SAP에서 WMS로 연동." }
          },
          {
            "plant": "",
            "text": { "vi": "WMS lưu ngày nhập của từng tem để theo dõi hàng tồn lâu.", "en": "WMS stores the receipt date of each label to track aged stock.", "ko": "WMS는 라벨별 입고일을 저장해 장기 재고 추적." }
          },
          {
            "plant": "HN",
            "text": { "vi": "Hàng chế xuất (miễn thuế) để khu vực riêng và có thông tin phân biệt với hàng không miễn thuế.", "en": "Export-processing (duty-free) goods are stored separately and flagged apart from taxable goods.", "ko": "수출가공(면세) 물품은 별도 구역 보관 및 과세 물품과 구분 정보 관리." }
          }
        ]
      },
      {
        "function": { "vi": "Đối tác & loại giao dịch", "en": "Partners & transaction types", "ko": "거래처 및 거래 유형" },
        "current": [
          {
            "plant": "",
            "text": { "vi": "Khách hàng, nhà cung cấp và loại giao dịch kho (MvT) quản lý trên SAP; MvT đang dùng gồm 101 (nhập mua) và 311 (chuyển kho).", "en": "Customers, suppliers and warehouse movement types (MvT) are managed in SAP; MvT in use include 101 (purchase receipt) and 311 (transfer).", "ko": "고객, 공급업체, 창고 이동유형(MvT)은 SAP에서 관리. 사용 중인 MvT: 101(구매 입고), 311(창고 이동)." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Đồng bộ danh mục đối tác, loại giao dịch và loại phiếu kho từ SAP sang WMS; map loại giao dịch SAP với nghiệp vụ trên WMS.", "en": "Sync partners, transaction types and document types from SAP to WMS; map SAP movement types to WMS transactions.", "ko": "거래처, 거래 유형, 전표 유형을 SAP에서 WMS로 연동하고 SAP 이동유형을 WMS 업무에 매핑." }
          },
          {
            "plant": "HN",
            "text": { "vi": "Cần xác nhận: SAP có tạo nhà máy (plant) không; khách hàng và NCC dùng chung một danh mục hay tách riêng; cùng một khách có đơn ở cả 2000 và 2100 thì dùng một hay hai mã.", "en": "To confirm: whether SAP defines plants; whether customers and suppliers share one master; whether a customer ordering from both 2000 and 2100 has one code or two.", "ko": "확인 필요: SAP 플랜트 정의 여부, 고객·공급업체 기준정보 통합 여부, 2000·2100 양쪽 주문 고객의 코드 1개/2개 여부." }
          }
        ]
      }
    ]
  },
  {
    "id": "lbl",
    "title": { "vi": "Tem nhãn", "en": "Labels", "ko": "라벨" },
    "rows": [
      {
        "function": { "vi": "Tem nguyên vật liệu", "en": "Raw material labels", "ko": "원자재 라벨" },
        "current": [
          {
            "plant": "",
            "text": { "vi": "Nguyên vật liệu có tem pallet và tem box. Tem NCC gồm Batch no (BP Mua yêu cầu NCC in), mã hàng theo Size/dimensions (không phải mã nào cũng có), Material (mã SAP).", "en": "Raw materials carry pallet and box labels. Supplier labels show batch no. (requested by Purchasing), item code by size/dimensions (not always present) and Material (SAP code).", "ko": "원자재는 팔레트·박스 라벨 부착. 공급업체 라벨: Batch no(구매부서 요청), Size/dimensions 기준 품목코드(일부만), Material(SAP 코드)." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Tem QR định danh mặt hàng và số lượng; 1 pallet chỉ 1 loại hàng.", "en": "QR labels identify item and quantity; 1 pallet holds only 1 item.", "ko": "QR 라벨로 품목·수량 식별, 팔레트 1개 = 품목 1종." }
          },
          {
            "plant": "",
            "text": { "vi": "Thông tin trên tem: ngày sản xuất, NCC, order, checklist, mã hàng, tên hàng; ngày nhập lưu theo định danh tem, không cần in.", "en": "Label data: production date, supplier, order, checklist, item code, item name; receipt date stored against the label, not printed.", "ko": "라벨 정보: 생산일, 공급업체, 오더, 체크리스트, 품목코드, 품목명. 입고일은 라벨 식별값으로 저장(인쇄 불필요)." }
          },
          {
            "plant": "HY",
            "text": { "vi": "Nguyên vật liệu nhập khẩu đặt theo SO: lệnh nhập có SO, tem Nguyên vật liệu gắn SO; QC trả hàng về kho theo SO.", "en": "Imported materials ordered per SO: the receipt order carries the SO, labels are linked to it, and QC returns goods per SO.", "ko": "SO별 수입 원자재: 입고 지시에 SO 포함, 라벨에 SO 연결, QC는 SO별로 창고 반납." }
          },
          {
            "plant": "",
            "text": { "vi": "Hỗ trợ tách tem khi xuất dở bó, BTP dở dùng hoặc chia hàng theo SO. Hướng xử lý: tem phát hành chỉ định danh mặt hàng, số lượng gán khi nhập trên app.", "en": "Support label splitting for partial bundles, partially used semi-finished goods or SO splits. Approach: issued labels identify the item only; quantity is assigned on the app at receipt.", "ko": "부분 묶음, 반제품 잔량, SO 분할 시 라벨 분할 지원. 방안: 발행 라벨은 품목만 식별, 수량은 입고 시 앱에서 지정." }
          },
          {
            "plant": "HN",
            "text": { "vi": "Dùng chung mẫu tem với Hưng Yên.", "en": "Use the same label templates as Hung Yen.", "ko": "흥옌과 동일한 라벨 양식 사용." }
          }
        ]
      },
      {
        "function": { "vi": "Tem thành phẩm", "en": "Finished goods labels", "ko": "완제품 라벨" },
        "current": [
          {
            "plant": "",
            "text": { "vi": "BP Sản xuất dán tem theo pallet; thùng in sẵn số lượng.", "en": "Production labels per pallet; boxes are printed with the quantity.", "ko": "생산부서가 팔레트 단위 라벨 부착, 박스에 수량 인쇄." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Thông tin trên tem: mã hàng, tên hàng, ngày sản xuất, lô, Batch no (tùy yêu cầu khách, dùng in lên bao bì), SO.", "en": "Label data: item code, name, production date, lot, batch no. (per customer, printed on packaging), SO.", "ko": "라벨 정보: 품목코드, 품목명, 생산일, LOT, Batch no(고객 요청 시, 포장 인쇄용), SO." }
          },
          {
            "plant": "",
            "text": { "vi": "BP Sản xuất in tem trên WMS; đề xuất dán tem theo thùng và gộp tem theo pallet.", "en": "Production prints labels in WMS; proposal: label each box and merge into a pallet label.", "ko": "생산부서가 WMS에서 라벨 발행, 박스별 부착 후 팔레트 라벨로 병합 제안." }
          },
          {
            "plant": "",
            "text": { "vi": "Đồng nhất mẫu tem thành phẩm giữa Hưng Yên và Hà Nam.", "en": "Standardize finished goods labels across Hung Yen and Ha Nam.", "ko": "흥옌·하남 완제품 라벨 양식 통일." }
          }
        ]
      },
      {
        "function": { "vi": "Tra cứu mã vạch", "en": "Barcode lookup", "ko": "바코드 조회" },
        "current": [],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Khi quét barcode, hiển thị thêm thông tin đơn hàng, ngày nhập và vị trí.", "en": "Barcode scans also show the order, receipt date and location.", "ko": "바코드 스캔 시 주문, 입고일, 로케이션 추가 표시." }
          }
        ]
      }
    ]
  },
  {
    "id": "nvl",
    "title": { "vi": "Nguyên vật liệu", "en": "Raw materials", "ko": "원자재" },
    "rows": [
      {
        "function": { "vi": "Nhập nguyên vật liệu", "en": "Raw material receipt", "ko": "원자재 입고" },
        "current": [
          {
            "plant": "",
            "text": { "vi": "BP Sản xuất tạo PR → BP Mua tạo PO gửi NCC kèm kế hoạch giao hàng mong muốn → NCC gửi lịch giao dự kiến sát ngày.", "en": "Production raises a PR → Purchasing issues the PO with a desired delivery plan → the supplier sends the expected schedule close to the date.", "ko": "생산부서 PR 생성 → 구매부서가 희망 납기와 함께 PO 발행 → 공급업체가 납품 직전 예정 일정 송부." }
          },
          {
            "plant": "",
            "text": { "vi": "BP Mua gửi kho kế hoạch nhập theo tháng và theo ngày qua email (file Excel). Hàng nhập khẩu: XNK gửi văn phòng kho tờ khai và kế hoạch nhập hàng.", "en": "Purchasing emails monthly and daily receipt plans (Excel) to the warehouse. Imports: Import/Export sends the declaration and receipt plan to the warehouse office.", "ko": "구매부서가 월간·일간 입고 계획(엑셀)을 이메일로 창고에 송부. 수입품은 수출입팀이 신고서와 입고 계획을 창고 사무실에 송부." }
          },
          {
            "plant": "",
            "text": { "vi": "Hàng về khu tập kết kèm phiếu giao của NCC → BP nhập kho kiểm đếm theo kế hoạch ngày → QC kiểm tra, đóng dấu OK/NG → hàng OK lên kệ, hàng NG chuyển khu NG.", "en": "Goods arrive at the staging area with the supplier slip → the receiving team counts against the daily plan → QC inspects and stamps OK/NG → OK goods go to racks, NG goods to the NG area.", "ko": "공급업체 전표와 함께 집결 구역 도착 → 입고 담당이 일일 계획 기준 검수 → QC 검사 후 OK/NG 날인 → 합격품은 랙, 불량품은 NG 구역." }
          },
          {
            "plant": "",
            "text": { "vi": "BP nhập kho chuyển phiếu lên văn phòng kho → văn phòng kho nhập SAP theo số lượng thực nhận.", "en": "The receiving team passes the slip to the warehouse office → the office posts the actual received quantity in SAP.", "ko": "입고 담당이 전표를 창고 사무실에 전달 → 사무실이 실입고 수량으로 SAP 입력." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "BP Mua tạo lệnh nhập hàng hằng ngày trên hệ thống thay cho email, cho phép import; lệnh có quy cách thùng để tính số tem cần in.", "en": "Purchasing creates daily receipt orders in the system instead of email, with import support; box specs on the order drive the label count.", "ko": "구매부서가 이메일 대신 시스템에서 일일 입고 지시 생성(업로드 지원), 지시의 박스 규격으로 라벨 수량 산출." }
          },
          {
            "plant": "",
            "text": { "vi": "In tem QR trên WMS: NCC dán trước khi giao (Hưng Yên đang áp dụng) hoặc kho dán khi hàng về (Hà Nam lựa chọn).", "en": "Print QR labels in WMS: the supplier attaches them before delivery (Hung Yen) or the warehouse does on arrival (Ha Nam to choose).", "ko": "WMS에서 QR 라벨 발행: 공급업체 납품 전 부착(흥옌 적용) 또는 입고 시 창고 부착(하남 선택)." }
          },
          {
            "plant": "",
            "text": { "vi": "Kho quét QR nhập tại khu tập kết, hàng chờ QC; OK lên vị trí, NG chuyển khu NG chờ xuất trả.", "en": "The warehouse scans QR at the staging area while goods await QC; OK goods to locations, NG goods to the NG area awaiting return.", "ko": "집결 구역에서 QR 스캔 입고, QC 대기. 합격품은 로케이션, 불량품은 NG 구역에서 반품 대기." }
          },
          {
            "plant": "",
            "text": { "vi": "Hệ thống tự sinh phiếu nhập kho; văn phòng kho kiểm tra, duyệt trên WMS và đồng bộ sang SAP.", "en": "The system creates the receipt note; the warehouse office reviews and approves it in WMS, then it syncs to SAP.", "ko": "시스템이 입고전표 자동 생성, 창고 사무실이 WMS에서 검토·승인 후 SAP 연동." }
          }
        ]
      },
      {
        "function": { "vi": "Vật tư tiêu hao", "en": "Consumables", "ko": "소모품" },
        "current": [
          {
            "plant": "",
            "text": { "vi": "Nhập về và xuất dùng ngay.", "en": "Received and used immediately.", "ko": "입고 즉시 사용." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Không theo dõi tồn kho trên hệ thống.", "en": "Not tracked in system stock.", "ko": "시스템 재고 미관리." }
          }
        ]
      },
      {
        "function": { "vi": "Trả Nguyên vật liệu cho nhà cung cấp", "en": "Return to supplier", "ko": "공급업체 반품" },
        "current": [
          {
            "plant": "",
            "text": { "vi": "Luôn phát sinh sau khi đã nhập kho trên hệ thống. QC phát hiện hàng không đạt → báo BP Mua → BP Mua quyết định trả, báo NCC đến lấy → báo văn phòng kho qua email / Zalo → kho xuất trả.", "en": "Always after the goods are received in the system. QC finds non-conforming goods → informs Purchasing → Purchasing decides to return and asks the supplier to collect → notifies the warehouse office by email / Zalo → the warehouse ships the return.", "ko": "항상 시스템 입고 후 발생. QC 불합격 확인 → 구매부서 통보 → 구매부서가 반품 결정, 공급업체 회수 요청 → 이메일/Zalo로 창고 사무실 통보 → 창고 반품 출고." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Tạo yêu cầu trả hàng trên WMS từ phiếu nhập kho, tick chọn dòng hàng cần trả; không cần phê duyệt.", "en": "Create the return request in WMS from the receipt note by ticking the lines to return; no approval needed.", "ko": "WMS에서 입고전표 기반으로 반품 라인 체크해 반품 요청 생성, 승인 불필요." }
          },
          {
            "plant": "",
            "text": { "vi": "Xuất trả trên app / web, đồng bộ phiếu xuất về SAP.", "en": "Ship the return via app / web and sync the issue note to SAP.", "ko": "앱/웹으로 반품 출고, 출고전표 SAP 연동." }
          },
          {
            "plant": "HN",
            "text": { "vi": "Cần chốt bộ phận tạo yêu cầu trả NCC trên WMS (Hưng Yên: BP Mua).", "en": "Decide who creates supplier return requests in WMS (Hung Yen: Purchasing).", "ko": "WMS 공급업체 반품 요청 생성 부서 확정 필요(흥옌: 구매부서)." }
          }
        ]
      },
      {
        "function": { "vi": "Xuất Nguyên vật liệu cho sản xuất", "en": "Material issue to production", "ko": "생산 원자재 출고" },
        "current": [
          {
            "plant": "",
            "text": { "vi": "BP Sản xuất tạo phiếu yêu cầu trên SAP (MvT 311), in ra mang xuống kho → kho xuất hàng → phụ trách xuất nhập nộp phiếu → văn phòng kho nhập phiếu xuất vào SAP.", "en": "Production creates the request in SAP (MvT 311), prints it and brings it to the warehouse → the warehouse issues → the handler submits the slip → the office posts the issue in SAP.", "ko": "생산부서가 SAP에서 요청 생성(MvT 311) 후 출력해 창고 전달 → 창고 출고 → 담당자 전표 제출 → 사무실이 SAP에 출고 입력." }
          },
          {
            "plant": "",
            "text": { "vi": "Số lượng thực xuất có thể ít hơn hoặc nhiều hơn yêu cầu.", "en": "The actual issued quantity may be lower or higher than requested.", "ko": "실제 출고 수량은 요청보다 적거나 많을 수 있음." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Yêu cầu xuất từ SAP đồng bộ sang WMS; kho xuất bằng PDA theo yêu cầu, cho phép xuất lẻ pallet, hệ thống trừ dần số lượng trên tem.", "en": "Requests sync from SAP to WMS; the warehouse issues by PDA, partial pallets allowed, with remaining quantity deducted on the label.", "ko": "SAP 요청이 WMS로 연동, PDA로 출고, 팔레트 부분 출고 가능, 라벨 잔량 차감." }
          },
          {
            "plant": "",
            "text": { "vi": "Xuất nhiều hơn yêu cầu: BP Sản xuất sửa yêu cầu trên SAP, đồng bộ lại sang WMS rồi mới xuất.", "en": "Issuing more than requested: Production edits the SAP request, it re-syncs to WMS, then the issue proceeds.", "ko": "요청 초과 출고 시 생산부서가 SAP 요청 수정·재연동 후 출고." }
          },
          {
            "plant": "",
            "text": { "vi": "Phiếu xuất tự sinh, văn phòng kho duyệt trên WMS và đồng bộ sang SAP.", "en": "The issue note is auto-created, approved by the office in WMS and synced to SAP.", "ko": "출고전표 자동 생성, 사무실이 WMS에서 승인 후 SAP 연동." }
          }
        ]
      },
      {
        "function": { "vi": "Trả Nguyên vật liệu thừa từ chuyền", "en": "Surplus material return from line", "ko": "라인 잔여 원자재 반납" },
        "current": [
          {
            "plant": "",
            "text": { "vi": "BP Sản xuất tạo phiếu yêu cầu trả trên SAP (MvT 311, đảo kho nhập – xuất), in ra, mang hàng và phiếu sang kho, ký xác nhận → văn phòng kho nhập SAP. Có thể trả nguyên kiện hoặc dở kiện.", "en": "Production creates the return request in SAP (MvT 311, source and destination reversed), prints it, brings goods and slip to the warehouse and signs → the office posts it in SAP. Full or partial packs.", "ko": "생산부서가 SAP에서 반납 요청 생성(MvT 311, 입출고 창고 반대), 출력 후 물품과 함께 창고에 전달·서명 → 사무실 SAP 입력. 완포장 또는 부분 포장." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Yêu cầu trả đồng bộ từ SAP sang WMS; hàng dở kiện thì BP Sản xuất in tem mới trên WMS và dán.", "en": "Return requests sync from SAP to WMS; for partial packs, Production prints and attaches new labels from WMS.", "ko": "반납 요청 SAP → WMS 연동, 부분 포장은 생산부서가 WMS에서 새 라벨 발행·부착." }
          },
          {
            "plant": "",
            "text": { "vi": "Kho quét PDA nhập hàng trả lại; phiếu nhập tự sinh, văn phòng kho duyệt và đồng bộ sang SAP.", "en": "The warehouse scans returns in by PDA; the receipt note is auto-created, approved and synced to SAP.", "ko": "창고가 PDA로 반납 입고, 입고전표 자동 생성·승인 후 SAP 연동." }
          }
        ]
      }
    ]
  },
  {
    "id": "gc",
    "title": { "vi": "Gia công", "en": "Outsourcing", "ko": "외주가공" },
    "rows": [
      {
        "function": { "vi": "Xuất hàng đi gia công", "en": "Outsourcing issue", "ko": "외주가공 출고" },
        "current": [
          {
            "plant": "",
            "text": { "vi": "BP Sản xuất tạo PR → BP Mua tạo PO gia công trên SAP → BP Mua hoặc BP Sản xuất gửi email yêu cầu kho xuất Nguyên vật liệu / BTP cho đơn gia công → kho xuất hàng (mã xuất A).", "en": "Production raises a PR → Purchasing creates the outsourcing PO in SAP → Purchasing or Production emails the warehouse to issue materials / semi-finished goods → the warehouse ships (issue code A).", "ko": "생산부서 PR → 구매부서가 SAP 외주 PO 생성 → 구매 또는 생산부서가 이메일로 출고 요청 → 창고 출고(출고 코드 A)." }
          },
          {
            "plant": "HN",
            "text": { "vi": "BP Mua / BP Sản xuất chỉ gửi email, không tạo yêu cầu trên SAP.", "en": "Purchasing / Production only send emails, without SAP requests.", "ko": "구매·생산부서가 이메일만 발송, SAP 요청 미생성." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Tạo yêu cầu xuất đi gia công trên WMS dựa trên PR / PO gia công.", "en": "Create outsourcing issue requests in WMS based on the outsourcing PR / PO.", "ko": "외주 PR/PO 기준으로 WMS에서 외주 출고 요청 생성." }
          },
          {
            "plant": "",
            "text": { "vi": "Cho phép xuất lẻ thùng thao tác đơn giản, không phải tách tem; trừ dần số lượng trên tem.", "en": "Allow simple partial-box issues without splitting labels; remaining quantity deducted on the label.", "ko": "라벨 분할 없이 박스 부분 출고 간편 처리, 라벨 잔량 차감." }
          },
          {
            "plant": "",
            "text": { "vi": "Phiếu xuất tự sinh sau khi quét PDA, văn phòng kho duyệt và đồng bộ sang SAP.", "en": "The issue note is created after PDA scanning, approved by the office and synced to SAP.", "ko": "PDA 스캔 후 출고전표 자동 생성, 사무실 승인 후 SAP 연동." }
          },
          {
            "plant": "HN",
            "text": { "vi": "Cần chốt bộ phận tạo yêu cầu xuất đi gia công trên WMS.", "en": "Decide which department creates outsourcing issue requests in WMS.", "ko": "WMS 외주 출고 요청 생성 부서 확정 필요." }
          }
        ]
      },
      {
        "function": { "vi": "Nhập hàng gia công về", "en": "Outsourcing receipt", "ko": "외주가공품 입고" },
        "current": [
          {
            "plant": "",
            "text": { "vi": "Khi gia công xong, BP Mua / BP Sản xuất gửi kho kế hoạch nhận hàng → hàng về cửa kho, kho nhập hàng (mã nhập B). Mọi trường hợp gia công đều có mã xuất và mã nhập.", "en": "When processing is done, Purchasing / Production send the receiving plan → goods arrive and the warehouse receives them (receipt code B). Every outsourcing case has both an issue and a receipt code.", "ko": "가공 완료 시 구매·생산부서가 입고 계획 송부 → 입고 시 창고 입고(입고 코드 B). 모든 외주는 출고·입고 코드 보유." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Yêu cầu nhập hàng gia công về đồng bộ sang WMS; in tem mới cho hàng nhận về.", "en": "The outsourcing receipt request is synced to WMS; new labels are printed for received goods.", "ko": "외주 입고 요청 WMS 연동, 입고품 새 라벨 발행." }
          },
          {
            "plant": "",
            "text": { "vi": "Kho quét PDA nhập; phiếu nhập tự sinh, văn phòng kho duyệt và đồng bộ sang SAP.", "en": "The warehouse receives by PDA; the receipt note is auto-created, approved and synced to SAP.", "ko": "PDA 입고, 입고전표 자동 생성·승인 후 SAP 연동." }
          },
          {
            "plant": "HN",
            "text": { "vi": "Cần chốt bộ phận tạo yêu cầu nhập hàng gia công về trên WMS.", "en": "Decide which department creates outsourcing receipt requests in WMS.", "ko": "WMS 외주 입고 요청 생성 부서 확정 필요." }
          }
        ]
      }
    ]
  },
  {
    "id": "tp",
    "title": { "vi": "Thành phẩm", "en": "Finished goods", "ko": "완제품" },
    "rows": [
      {
        "function": { "vi": "Nhập kho thành phẩm", "en": "Finished goods receipt", "ko": "완제품 입고" },
        "current": [
          {
            "plant": "",
            "text": { "vi": "BP Sản xuất tạo phiếu yêu cầu nhập kho Thành phẩm trên SAP theo số lượng đã QC đạt (Hà Nam: Tcode ZPPR082), in Delivery Note và mang hàng sang kho → kho kiểm số lượng rồi nhập. Có trường hợp nhập lẻ theo box.", "en": "Production creates the FG receipt request in SAP with QC-passed quantity (Ha Nam: Tcode ZPPR082), prints the delivery note and brings the goods → the warehouse checks quantity and receives. Partial boxes occur.", "ko": "생산부서가 QC 합격 수량으로 SAP 완제품 입고 요청 생성(하남: Tcode ZPPR082), Delivery Note 출력 후 물품 전달 → 창고 수량 확인 후 입고. 박스 단위 부분 입고 있음." }
          },
          {
            "plant": "",
            "text": { "vi": "Sai số lượng trên phiếu: BP Sản xuất sửa lệnh trên SAP, in lại rồi mới nhập.", "en": "Wrong quantity on the slip: Production corrects it in SAP and reprints before receipt.", "ko": "전표 수량 오류 시 생산부서가 SAP 수정·재출력 후 입고." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Yêu cầu nhập Thành phẩm đồng bộ từ SAP sang WMS; BP Sản xuất phát hành tem Thành phẩm trên WMS và dán vào hàng.", "en": "FG receipt requests sync from SAP to WMS; Production issues FG labels in WMS and attaches them.", "ko": "완제품 입고 요청 SAP → WMS 연동, 생산부서가 WMS에서 완제품 라벨 발행·부착." }
          },
          {
            "plant": "",
            "text": { "vi": "Kho quét tem nhập; phiếu nhập tự sinh, xác nhận để tăng tồn và đồng bộ kết quả sang SAP.", "en": "The warehouse scans labels in; the receipt note is auto-created, confirmed to increase stock and synced to SAP.", "ko": "라벨 스캔 입고, 입고전표 자동 생성·확정 시 재고 증가, SAP 연동." }
          }
        ]
      },
      {
        "function": { "vi": "Ghép pallet thành phẩm", "en": "Finished goods pallet merging", "ko": "완제품 팔레트 병합" },
        "current": [
          {
            "plant": "HY",
            "text": { "vi": "Hàng Việt Nam có trường hợp ghép pallet.", "en": "Vietnam goods sometimes require merging pallets.", "ko": "베트남 물량은 팔레트 병합 사례 있음." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Hỗ trợ gộp / tách barcode để ghép pallet và cập nhật tem pallet.", "en": "Support barcode merge / split to combine pallets and update pallet labels.", "ko": "바코드 병합·분할로 팔레트 병합 및 팔레트 라벨 갱신 지원." }
          }
        ]
      },
      {
        "function": { "vi": "Giao hàng thành phẩm", "en": "Finished goods delivery", "ko": "완제품 출하" },
        "current": [
          {
            "plant": "HY",
            "text": { "vi": "HQ tạo Inter SO → tạo PO cho plant 2000 → BP Sản xuất kiểm tra hàng thuộc nhà máy, tạo Vina SO và xác nhận mã hàng. Sale Hàn Quốc gửi file kế hoạch giao; NV kho kiểm tra ngày xuất, tồn kho và lịch sản xuất; XNK xác nhận container và thời gian giao.", "en": "HQ creates the Inter SO → a PO to plant 2000 → Production checks plant ownership, creates the Vina SO and confirms items. Korean sales sends the delivery plan; warehouse staff check dates, stock and production schedule; Import/Export confirms container and timing.", "ko": "본사 Inter SO 생성 → 플랜트 2000 PO 생성 → 생산부서가 공장 품목 확인 후 Vina SO 생성·품목 확정. 한국 영업이 출하 계획 송부, 창고가 출고일·재고·생산 일정 확인, 수출입팀이 컨테이너·일정 확인." }
          },
          {
            "plant": "HY",
            "text": { "vi": "NV kho lập lệnh xuất bằng Excel, in gửi bộ phận xuất kho thực hiện; giao nhiều lần cho một SO.", "en": "Warehouse staff prepare issue orders in Excel and print them for the shipping team; multiple deliveries per SO.", "ko": "창고가 엑셀로 출고 지시 작성·출력해 출고 담당에 전달, SO당 분할 출하." }
          },
          {
            "plant": "HN",
            "text": { "vi": "Bán trong nước: XNK gửi kế hoạch giao trước 1–2 ngày (Excel); văn phòng kho in kế hoạch cho bộ phận giao nhận, giao khi xe khách đến, sau đó nhập kết quả lên hệ thống.", "en": "Domestic: Import/Export sends the plan 1–2 days ahead (Excel); the office prints it for the shipping team, ships when the customer truck arrives, then posts results.", "ko": "국내 판매: 수출입팀이 1~2일 전 출하 계획(엑셀) 송부, 사무실이 출력해 배송 담당에 전달, 고객 차량 도착 시 출하 후 결과 입력." }
          },
          {
            "plant": "HN",
            "text": { "vi": "Xuất khẩu: nhận kế hoạch tháng từ kinh doanh quốc tế; văn phòng kho kiểm tra tồn và lịch sản xuất, gửi XNK; XNK book container và lịch xuất; kho giao hàng rồi nhập kết quả.", "en": "Export: monthly plan from international sales; the office checks stock and production schedule and informs Import/Export; Import/Export books containers and schedule; the warehouse ships and posts results.", "ko": "수출: 해외영업 월간 계획 수신, 사무실이 재고·생산 일정 확인 후 수출입팀 전달, 수출입팀 컨테이너 예약·일정 확정, 창고 출하 후 결과 입력." }
          },
          {
            "plant": "",
            "text": { "vi": "Giao theo pallet, thùng hoặc bó; SAP quản lý đơn vị cái. Có xuất quà tặng kèm hàng bán (quà nhập như mua Nguyên vật liệu).", "en": "Shipped by pallet, box or bundle; SAP uses pieces. Gifts are shipped with sales (gifts received like purchased materials).", "ko": "팔레트·박스·묶음 단위 출하, SAP는 개 단위 관리. 판매 시 사은품 동반 출고(사은품은 원자재 구매처럼 입고)." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Đồng bộ đơn bán hàng nội bộ (Vina SO) từ SAP sang WMS.", "en": "Sync the internal sales order (Vina SO) from SAP to WMS.", "ko": "내부 판매오더(Vina SO)를 SAP에서 WMS로 연동." }
          },
          {
            "plant": "",
            "text": { "vi": "Kho lập lệnh giao hàng trên WMS từ SO, giao nhiều lần cho một SO, theo pallet hoặc lẻ thùng; gán mã vạch cho từng mã hàng.", "en": "The warehouse creates delivery orders in WMS from the SO, with multiple deliveries per SO, by pallet or partial box; barcodes assigned per item.", "ko": "창고가 SO 기준 WMS 출하 지시 생성, SO당 분할 출하, 팔레트·박스 단위, 품목별 바코드 지정." }
          },
          {
            "plant": "",
            "text": { "vi": "Quét tem giao hàng; phiếu giao tự sinh, xác nhận để giảm tồn và đồng bộ kết quả sang SAP.", "en": "Scan labels to ship; the delivery note is auto-created, confirmed to reduce stock and synced to SAP.", "ko": "라벨 스캔 출하, 출하전표 자동 생성·확정 시 재고 감소, SAP 연동." }
          }
        ]
      },
      {
        "function": { "vi": "Hàng bán bị trả lại", "en": "Sales returns", "ko": "판매 반품" },
        "current": [
          {
            "plant": "",
            "text": { "vi": "Công ty mẹ gửi email đơn hàng trả về → XNK làm tờ khai thông quan → kho lập PO trả hàng trên SAP (Tcode VL10C) và nhập vào kho 5900 (Hưng Yên: tạo PO nháp, XNK kiểm tra, thông quan xong mới put PO). Hàng thực tế về không ghi nhận trên SAP.", "en": "HQ emails the return order → Import/Export files the customs declaration → the warehouse creates the return PO in SAP (Tcode VL10C) into warehouse 5900 (Hung Yen: draft PO checked by Import/Export, posted after clearance). Physical arrival is not recorded in SAP.", "ko": "본사 반품 주문 이메일 → 수출입팀 통관 신고 → 창고가 SAP 반품 PO(Tcode VL10C) 생성, 5900 창고 입고(흥옌: 임시 PO 작성 → 수출입팀 확인 → 통관 후 PO 처리). 실물 입고는 SAP 미기록." }
          },
          {
            "plant": "",
            "text": { "vi": "Tái sử dụng: Hưng Yên chuyển 5900 → 3000, Hà Nam 5900 → 3903. Tái xuất: Hưng Yên 5900 → 5000, Hà Nam 5900 → 5003.", "en": "Reuse: Hung Yen moves 5900 → 3000, Ha Nam 5900 → 3903. Re-export: Hung Yen 5900 → 5000, Ha Nam 5900 → 5003.", "ko": "재사용: 흥옌 5900 → 3000, 하남 5900 → 3903. 재수출: 흥옌 5900 → 5000, 하남 5900 → 5003." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Đồng bộ PO trả hàng từ SAP thành yêu cầu trả hàng trên WMS, hoặc tạo từ phiếu giao hàng đã lập / thủ công.", "en": "Sync the SAP return PO into a WMS return request, or create it from an existing delivery note / manually.", "ko": "SAP 반품 PO를 WMS 반품 요청으로 연동하거나 기존 출하전표 기반/수동 생성." }
          },
          {
            "plant": "",
            "text": { "vi": "Nhận hàng vào kho hàng trả lại ở vị trí tạm, xác nhận phiếu để tăng tồn và đồng bộ sang SAP; khi hàng thực tế về, quét tem chuyển sang vị trí thực tế.", "en": "Receive into the returns warehouse at a temporary location, confirm to increase stock and sync to SAP; when goods physically arrive, scan labels to move them to the actual location.", "ko": "반품 창고 임시 로케이션으로 입고, 전표 확정 시 재고 증가·SAP 연동, 실물 도착 시 라벨 스캔으로 실제 로케이션 이동." }
          },
          {
            "plant": "",
            "text": { "vi": "Trả không nguyên pallet thì in tem mới; trả nguyên pallet thì dùng tem cũ.", "en": "Partial-pallet returns get new labels; full pallets keep their existing labels.", "ko": "부분 팔레트 반품은 새 라벨, 전체 팔레트는 기존 라벨 사용." }
          }
        ]
      }
    ]
  },
  {
    "id": "oth",
    "title": { "vi": "Nghiệp vụ kho khác", "en": "Other warehouse transactions", "ko": "기타 창고 업무" },
    "rows": [
      {
        "function": { "vi": "Xuất khác (mẫu, hủy)", "en": "Other issues (samples, disposal)", "ko": "기타 출고 (샘플·폐기)" },
        "current": [
          {
            "plant": "",
            "text": { "vi": "Xuất mẫu: SX hoặc QA đề xuất → phụ trách xuất nhập kho xuất hàng → chuyển chứng từ lên văn phòng kho nhập hệ thống.", "en": "Samples: Production or QA requests → the warehouse handler issues → documents go to the office for posting.", "ko": "샘플 출고: 생산 또는 QA 요청 → 창고 담당 출고 → 증빙을 사무실에 전달해 시스템 입력." }
          },
          {
            "plant": "",
            "text": { "vi": "Xuất hủy: hàng NG (SX, QA yêu cầu), hàng tồn lâu (SX yêu cầu; Hà Nam kho kiểm tra theo ngày nhập), hủy do đơn hàng bị cancel (kinh doanh yêu cầu). Tất cả đều qua phê duyệt.", "en": "Disposal: NG goods (Production, QA), aged stock (Production; in Ha Nam the warehouse checks receipt dates), cancelled orders (Sales). All require approval.", "ko": "폐기 출고: 불량품(생산·QA 요청), 장기 재고(생산 요청, 하남은 창고가 입고일 확인), 주문 취소(영업 요청). 모두 승인 필요." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Yêu cầu xuất mẫu / xuất hủy tạo trên SAP và đồng bộ sang WMS, kèm thông tin cost center.", "en": "Sample / disposal requests are created in SAP and synced to WMS with the cost center.", "ko": "샘플·폐기 출고 요청을 SAP에서 생성해 코스트센터 정보와 함께 WMS로 연동." }
          },
          {
            "plant": "",
            "text": { "vi": "Quét tem hàng xuất; phiếu xuất tự sinh, xác nhận để giảm tồn và đồng bộ sang SAP.", "en": "Scan labels to issue; the issue note is auto-created, confirmed to reduce stock and synced to SAP.", "ko": "라벨 스캔 출고, 출고전표 자동 생성·확정 시 재고 감소, SAP 연동." }
          }
        ]
      },
      {
        "function": { "vi": "Nhập khác & đổi thông tin tồn", "en": "Other receipts & stock info changes", "ko": "기타 입고 및 재고 정보 변경" },
        "current": [
          {
            "plant": "",
            "text": { "vi": "Hiện không phát sinh nghiệp vụ nhập khác và đổi thông tin tồn. Tem Nguyên vật liệu sai thì trả lại nhà cung cấp.", "en": "No other-receipt or stock-info-change transactions today. Wrong material labels are returned to the supplier.", "ko": "현재 기타 입고·재고 정보 변경 업무 없음. 원자재 라벨 오류 시 공급업체 반품." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Hỗ trợ nhập khác trên WMS khi phát sinh: lập yêu cầu, in tem, quét nhập, xác nhận và đồng bộ sang SAP.", "en": "Support other receipts in WMS when needed: request, label, scan in, confirm and sync to SAP.", "ko": "필요 시 WMS 기타 입고 지원: 요청, 라벨 발행, 스캔 입고, 확정 후 SAP 연동." }
          }
        ]
      },
      {
        "function": { "vi": "Chuyển kho", "en": "Warehouse transfer", "ko": "창고 이동" },
        "current": [
          {
            "plant": "HN",
            "text": { "vi": "Chuyển giữa hai kho (cùng hoặc khác nhà máy) đều phải có yêu cầu trên SAP, sau đó kho thực hiện chuyển.", "en": "Transfers between warehouses (same or different plant) always require an SAP request before the warehouse moves goods.", "ko": "창고 간 이동(동일·타 공장)은 항상 SAP 요청 후 창고가 이동." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Lập yêu cầu chuyển kho (kho nguồn – đích, lý do, người phụ trách, mặt hàng, số lượng); quét gán tem thực tế cho từng dòng hàng.", "en": "Create the transfer request (source – destination, reason, person in charge, items, quantities); scan and assign actual labels to each line.", "ko": "창고 이동 요청 생성(출발·도착 창고, 사유, 담당자, 품목, 수량), 라인별 실제 라벨 스캔·지정." }
          },
          {
            "plant": "",
            "text": { "vi": "Duyệt phiếu: giảm tồn tại kho nguồn, tăng tồn tại kho đích, đồng bộ kết quả sang SAP.", "en": "Approve the note: stock decreases at source, increases at destination, and results sync to SAP.", "ko": "전표 승인 시 출발 창고 재고 감소, 도착 창고 재고 증가, SAP 연동." }
          }
        ]
      },
      {
        "function": { "vi": "Chuyển vị trí trong kho", "en": "Location move within a warehouse", "ko": "창고 내 로케이션 이동" },
        "current": [
          {
            "plant": "HY",
            "text": { "vi": "Phụ trách kho chủ động sắp xếp vị trí tối ưu, không có lệnh từ bộ phận nào.", "en": "The warehouse lead rearranges locations on their own, without orders from other departments.", "ko": "창고 담당자가 타 부서 지시 없이 자율적으로 로케이션 최적화." }
          },
          {
            "plant": "HN",
            "text": { "vi": "BP Kho chủ động chuyển hàng, ghi vị trí cũ – mới lên phiếu giấy, nộp văn phòng theo dõi bằng Excel.", "en": "The warehouse moves goods and writes old – new locations on paper slips, tracked by the office in Excel.", "ko": "창고가 자율 이동 후 이전·신규 로케이션을 종이 전표에 기록, 사무실이 엑셀로 관리." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Thực hiện trên app: quét vị trí nguồn, tem hàng và vị trí đích; hệ thống tự lập phiếu, văn phòng kho xem và duyệt.", "en": "Done on the app: scan source location, goods label and destination; the system creates the note and the office reviews and approves.", "ko": "앱에서 출발 로케이션·물품 라벨·도착 로케이션 스캔, 시스템이 전표 생성, 사무실 확인·승인." }
          },
          {
            "plant": "",
            "text": { "vi": "Không đồng bộ sang SAP (SAP không quản lý vị trí).", "en": "Not synced to SAP (SAP does not manage locations).", "ko": "SAP 미연동(SAP는 로케이션 미관리)." }
          }
        ]
      }
    ]
  },
  {
    "id": "inv",
    "title": { "vi": "Kiểm kê & tồn kho", "en": "Stocktaking & inventory", "ko": "재고실사 및 재고" },
    "rows": [
      {
        "function": { "vi": "Kiểm kê", "en": "Stocktaking", "ko": "재고실사" },
        "current": [
          {
            "plant": "HY",
            "text": { "vi": "Kho kiểm kê cuối tháng, kế toán kiểm kê theo quý. In báo cáo tồn tại ngày kiểm kê, đếm và ghi phiếu; sai lệch thì kiểm tra lại và ghi lý do. Cần điều chỉnh thì email xin phê duyệt → kế toán tạo phiếu nhập khác / xuất khác trên SAP.", "en": "The warehouse counts at month-end; accounting counts quarterly. Print the stock report for the count date, count and record; recheck variances and record reasons. Adjustments need email approval → accounting creates other receipt / issue documents in SAP.", "ko": "창고는 월말, 회계는 분기별 실사. 실사일 재고 보고서 출력 후 실사·기록, 차이 재확인 및 사유 입력. 조정 시 이메일 승인 → 회계가 SAP에서 기타 입고/출고 생성." }
          },
          {
            "plant": "HN",
            "text": { "vi": "In tồn trên SAP → kiểm thực tế, điền phiếu dán ở từng pallet → văn phòng kho nhập số lượng kiểm kê vào SAP. Chênh lệch không tìm được nguyên nhân thì BP Sản xuất điều chỉnh trên SAP.", "en": "Print SAP stock → count physically and fill slips attached to each pallet → the office enters counted quantities in SAP. Unexplained variances are adjusted in SAP by Production.", "ko": "SAP 재고 출력 → 실물 실사 후 팔레트별 전표 부착 → 사무실이 실사 수량 SAP 입력. 원인 불명 차이는 생산부서가 SAP에서 조정." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Kiểm kê trên WMS: chốt số tồn theo tháng, quét tem bằng PDA, tổng hợp và so sánh kết quả.", "en": "Stocktaking in WMS: freeze monthly stock, scan labels by PDA, summarize and compare results.", "ko": "WMS 실사: 월별 재고 마감, PDA 라벨 스캔, 결과 집계·비교." }
          },
          {
            "plant": "",
            "text": { "vi": "Duyệt điều chỉnh tồn: hệ thống tự tạo phiếu nhập / xuất điều chỉnh và đồng bộ sang SAP.", "en": "Approve adjustments: the system creates adjustment receipt / issue notes and syncs them to SAP.", "ko": "조정 승인 시 시스템이 조정 입고·출고 전표 생성 후 SAP 연동." }
          },
          {
            "plant": "",
            "text": { "vi": "Cần chốt bộ phận chịu trách nhiệm xác nhận điều chỉnh trên WMS.", "en": "Decide which department confirms adjustments in WMS.", "ko": "WMS 조정 확정 담당 부서 확정 필요." }
          }
        ]
      },
      {
        "function": { "vi": "FIFO", "en": "FIFO", "ko": "FIFO" },
        "current": [
          {
            "plant": "",
            "text": { "vi": "Nguyên vật liệu và thành phẩm theo đơn thì xuất theo đơn (Nguyên vật liệu đóng gói mua theo đơn, thành phẩm xuất theo đơn mua).", "en": "Order-specific materials and finished goods are issued by order (packaging bought per order, FG shipped per purchase order).", "ko": "주문 전용 원자재·완제품은 주문별 출고(포장재는 주문별 구매, 완제품은 구매 주문별 출고)." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Hàng không theo đơn (đặc biệt bán thành phẩm): hệ thống gợi ý lô xuất theo FIFO trên lệnh xuất.", "en": "Non-order goods (especially semi-finished): the system suggests FIFO lots on the issue order.", "ko": "비주문품(특히 반제품): 출고 지시에서 FIFO LOT 추천." }
          }
        ]
      },
      {
        "function": { "vi": "Cảnh báo tồn Min/Max", "en": "Min/Max alerts", "ko": "Min/Max 알림" },
        "current": [
          {
            "plant": "",
            "text": { "vi": "Ít dùng.", "en": "Rarely used.", "ko": "사용 빈도 낮음." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Hiện tại chưa cần.", "en": "Not needed for now.", "ko": "현재 불필요." }
          }
        ]
      }
    ]
  },
  {
    "id": "rpt",
    "title": { "vi": "Báo cáo", "en": "Reports", "ko": "보고서" },
    "rows": [
      {
        "function": { "vi": "Báo cáo tồn kho", "en": "Stock reports", "ko": "재고 보고서" },
        "current": [
          {
            "plant": "",
            "text": { "vi": "Đang dùng báo cáo tồn kho trên SAP.", "en": "Stock reports from SAP are used today.", "ko": "현재 SAP 재고 보고서 사용." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Báo cáo tồn kho theo mẫu SAP, bổ sung thêm trường theo yêu cầu.", "en": "Stock report following the SAP layout with additional fields.", "ko": "SAP 양식 기반 재고 보고서에 요청 항목 추가." }
          },
          {
            "plant": "",
            "text": { "vi": "Tồn theo vị trí: tìm vị trí ra mặt hàng và tìm mặt hàng ra vị trí.", "en": "Stock by location: location → items and item → locations.", "ko": "로케이션별 재고: 로케이션 → 품목, 품목 → 로케이션." }
          },
          {
            "plant": "",
            "text": { "vi": "Tồn lâu theo ngày nhập hoặc ngày sản xuất (ví dụ hàng nhập quá 6 tháng).", "en": "Aged stock by receipt or production date (e.g. received over 6 months ago).", "ko": "입고일·생산일 기준 장기 재고(예: 입고 6개월 초과)." }
          },
          {
            "plant": "",
            "text": { "vi": "Ngày mua / nhập gần nhất của tất cả Nguyên vật liệu.", "en": "Latest purchase / receipt date for all materials.", "ko": "전 원자재 최근 구매/입고일." }
          }
        ]
      },
      {
        "function": { "vi": "Báo cáo chứng từ Nguyên vật liệu", "en": "Material document report", "ko": "원자재 전표 보고서" },
        "current": [],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "Báo cáo chứng từ nhập xuất Nguyên vật liệu, lọc theo nhà cung cấp, PO hoặc yêu cầu xuất của sản xuất.", "en": "Material receipt / issue document report filtered by supplier, PO or production issue request.", "ko": "공급업체, PO, 생산 출고 요청별 원자재 입출고 전표 보고서." }
          }
        ]
      }
    ]
  },
  {
    "id": "org",
    "title": { "vi": "Phân công thực hiện", "en": "Responsibilities", "ko": "업무 분담" },
    "rows": [
      {
        "function": { "vi": "Phân công tạo yêu cầu trên hệ thống", "en": "Who creates requests", "ko": "요청 생성 담당" },
        "current": [
          {
            "plant": "",
            "text": { "vi": "Nhập Thành phẩm và xuất Nguyên vật liệu do BP Sản xuất yêu cầu; nhập Nguyên vật liệu do BP Mua; xuất thành phẩm do kinh doanh.", "en": "FG receipts and material issues are requested by Production; material receipts by Purchasing; FG shipments by Sales.", "ko": "완제품 입고·원자재 출고는 생산부서, 원자재 입고는 구매부서, 완제품 출고는 영업 요청." }
          }
        ],
        "requirements": [
          {
            "plant": "",
            "text": { "vi": "BP Sản xuất: tạo yêu cầu xuất Nguyên vật liệu, trả Nguyên vật liệu thừa, nhập thành phẩm, xuất BTP đi gia công trên SAP (đồng bộ WMS); in tem thành phẩm và Nguyên vật liệu thừa trên WMS.", "en": "Production: creates material issue, surplus return, FG receipt and outsourcing issue requests in SAP (synced to WMS); prints FG and surplus labels in WMS.", "ko": "생산부서: SAP에서 원자재 출고, 잔여 반납, 완제품 입고, 반제품 외주 출고 요청 생성(WMS 연동), WMS에서 완제품·잔여품 라벨 발행." }
          },
          {
            "plant": "",
            "text": { "vi": "BP Mua: tạo lệnh nhập Nguyên vật liệu hằng ngày, yêu cầu trả NCC, yêu cầu xuất đi gia công; in tem Nguyên vật liệu gửi NCC dán trước khi giao.", "en": "Purchasing: creates daily material receipt orders, supplier returns and outsourcing issue requests; prints material labels for suppliers to attach before delivery.", "ko": "구매부서: 일일 원자재 입고 지시, 공급업체 반품, 외주 출고 요청 생성, 납품 전 부착용 원자재 라벨 발행." }
          },
          {
            "plant": "",
            "text": { "vi": "BP Kho: lập lệnh giao hàng từ SO, thực hiện nhập xuất bằng PDA; văn phòng kho kiểm tra và duyệt phiếu trên WMS.", "en": "Warehouse: creates delivery orders from SOs and performs receipts / issues by PDA; the warehouse office reviews and approves notes in WMS.", "ko": "창고: SO 기반 출하 지시 생성, PDA 입출고 수행, 창고 사무실이 WMS 전표 검토·승인." }
          },
          {
            "plant": "HN",
            "text": { "vi": "Cần chốt bộ phận tạo yêu cầu nhập Nguyên vật liệu, trả NCC, xuất / nhập gia công và xác nhận điều chỉnh kiểm kê (hiện chỉ trao đổi qua email).", "en": "Decide who creates material receipt, supplier return, outsourcing issue / receipt requests and confirms stocktaking adjustments (currently email only).", "ko": "원자재 입고, 공급업체 반품, 외주 출고·입고 요청 생성 및 실사 조정 확정 담당 부서 결정 필요(현재 이메일만 사용)." }
          }
        ]
      }
    ]
  }
] });
