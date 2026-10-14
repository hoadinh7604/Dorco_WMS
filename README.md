# Sổ tay nghiệp vụ DORCO WMS
 
Trang tĩnh trình bày **sơ đồ quy trình kho**, **danh sách tính năng** và **yêu cầu nghiệp vụ** của dự án DORCO WMS, có 3 ngôn ngữ (Việt / English / 한국어).

- Không cần cài đặt, không có bước build.
- Xem trên máy: bấm đúp `index.html`.
- Xem trên mạng: GitHub Pages hoặc Netlify (xem mục 4).

```
index.html      trang chính
check.html      trang tự kiểm tra nội dung (chạy trước mỗi lần deploy)
core/           KHUNG — giống nhau ở mọi dự án, không sửa riêng
content/        NỘI DUNG — phần riêng của dự án, chỉ sửa ở đây
  config.js       tên dự án, ngôn ngữ, nhà máy, danh sách mục trên menu
  theme.css       (tuỳ chọn) đổi màu / phông
  i18n/           chữ giao diện: vi.js, en.js, ko.js
  data/           dữ liệu từng mục: processes.js, features.js, requirements.js
  assets/         ảnh (logo, ảnh chụp màn hình)
tools/          kiểm thử tự động (không cần cho người dùng)
docs/           tài liệu thiết kế
```

Chữ trong `content/` viết theo hai cách:

- Chuỗi thường: `'Kiểm kê'`, dùng chung cho mọi ngôn ngữ.
- Theo từng ngôn ngữ: `{ vi: 'Kiểm kê', en: 'Stocktaking', ko: '재고실사' }`. Thiếu bản dịch nào thì trang hiện tiếng Việt.

Sửa file bằng Notepad, VS Code hay bất kỳ trình soạn thảo nào; nhớ lưu với mã hoá **UTF-8**.

---

## 1. Sửa nội dung có sẵn

### Thêm một tính năng 

Mở `content/data/features.js`, tìm đúng nhóm, chép một dòng trong `items` rồi sửa chữ:

```js
{ "vi": "Tra cứu mặt hàng", "en": "Item Lookup", "ko": "품목 조회" },
{ "vi": "Tính năng mới", "en": "New feature", "ko": "새 기능" },
```

Số thứ tự (STT) và các ô thống kê tự tính lại.

### Thêm một bước vào quy trình

Mở `content/data/processes.js`, tìm quy trình (`"number": "4"`…), chép một khối bước trong `steps` rồi sửa:

```js
{
  "title": { "vi": "Quét tem nhập kho", "en": "Scan to receive", "ko": "라벨 스캔 입고" },
  "icon": "pda",
  "systems": ["PDA"],
  "bullets": [
    { "vi": "Quét tem nhãn thành phẩm", "en": "Scan finished goods labels", "ko": "완제품 라벨 스캔" },
    { "sync": { "vi": "Đồng bộ kết quả sang SAP", "en": "Results synced to SAP", "ko": "결과 SAP 연동" } }
  ]
}
```

- `{ "sync": … }` là dòng đồng bộ hệ thống (màu cam, có ký hiệu ⇄).
- Số bước và mũi tên tự vẽ.
- Danh sách icon và các trường khác có ở chú thích đầu file.

### Thêm một dòng yêu cầu

Mở `content/data/requirements.js`, chép một khối trong `rows` của đúng phân hệ. Mỗi ý có `plant` là `"HY"`, `"HN"` hoặc `""` (áp dụng chung).

## 2. Thêm mục mới vào menu

Ví dụ thêm mục **04 · Hướng dẫn màn hình**:

1. Tạo file `content/data/guide.js`:

   ```js
   App.data('guide', { screens: [
     { id: 'nhap-kho', title: { vi: 'Nhập kho bằng PDA', en: 'Receiving with PDA', ko: 'PDA 입고' },
       image: 'content/assets/nhap-kho.png',
       purpose: { vi: 'Quét tem để nhập hàng vào kho.', en: 'Scan labels to receive goods.', ko: '라벨을 스캔해 입고합니다.' },
       steps: [ { vi: 'Mở chức năng Nhập kho', en: 'Open Receiving', ko: '입고 기능 열기' } ] }
   ] });
   ```

2. Trong `index.html`, thêm dòng nạp file ngay dưới các dòng `content/data/...`:

   ```html
   <script src="content/data/guide.js"></script>
   ```

3. Trong `content/config.js`, thêm vào cuối `sections`:

   ```js
   { id: 'huong-dan', type: 'guide', data: 'guide', title: { vi: 'Hướng dẫn màn hình', en: 'Screen guide', ko: '화면 가이드' } }
   ```

Các loại khối có sẵn (`type`):

| type | Dùng cho |
|---|---|
| `process-flow` | sơ đồ quy trình |
| `feature-list` | danh sách tính năng |
| `requirement-table` | bảng hiện trạng & yêu cầu |
| `guide` | hướng dẫn màn hình có ảnh |

## 3. Thêm ngôn ngữ (ví dụ tiếng Nhật `ja`)

1. Chép `content/i18n/en.js` thành `content/i18n/ja.js`. Đổi `App.strings('en'` thành `App.strings('ja'` rồi dịch phần chữ bên phải.
2. Nạp file trong `index.html`: `<script src="content/i18n/ja.js"></script>`.
3. Thêm `{ code: 'ja', label: '日本語' }` vào `languages` trong `content/config.js`.
4. Bổ sung dần `ja: '…'` trong các file dữ liệu. Chỗ nào chưa dịch sẽ hiện tiếng Việt, và `check.html` liệt kê các chỗ còn thiếu.

## 4. Deploy

Trước khi deploy, mở `check.html`: trang phải báo **0 lỗi**. Cảnh báo thiếu bản dịch không chặn deploy.

**GitHub Pages**

1. Đẩy code lên GitHub.
2. Vào repo → **Settings → Pages**.
3. Source: *Deploy from a branch*, Branch: `main`, Folder: `/ (root)` → **Save**.
4. Sau 1–2 phút, trang có tại `https://<tai-khoan>.github.io/<ten-repo>/`.

**Netlify**

- Cách 1: vào app.netlify.com/drop, kéo thả cả thư mục (có thể bỏ `tools/` và `docs/`).
- Cách 2: *Add new site → Import from GitHub*, chọn repo. Không cần lệnh build, thư mục publish là `.`. Từ đó mỗi lần đẩy code lên là trang tự cập nhật.

## 5. Nâng cấp khung (`core/`)

Khi repo template có bản `core/` mới: chép đè cả thư mục `core/` vào dự án. Không đụng tới `content/`. Xem phiên bản khung trong `core/VERSION`.

Nếu bản mới có thêm khối hay file CSS / JS mới, so lại `index.html` của template để thêm các dòng nạp file tương ứng.

## 6. Kiểm thử tự động (dành cho người phát triển)

Cần Python 3, `pytest` và Playwright:

```bash
python3 -m pytest -q                       # mở trang qua file://
WMS_BASE=http python3 -m pytest -q         # mở trang qua HTTP server
python3 -m tools.parity_check              # đối chiếu với bản cũ tools/reference/legacy-index.html
```
