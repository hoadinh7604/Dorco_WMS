# Thiết kế: Template sổ tay nghiệp vụ WMS (áp dụng đầu tiên cho DORCO)

- **Ngày:** 14/10/2026
- **Trạng thái:** Chờ duyệt
- **Nguồn hiện tại:** `index.html` (bản `index_3.html`) — trang 1 file gồm 3 mục: Sơ đồ quy trình kho, Danh sách tính năng, Requirements (Xác nhận); 3 ngôn ngữ vi / en / ko.

## 1. Mục tiêu & phạm vi

### 1.1 Mục tiêu
Tách trang 1 file hiện tại thành một **template tĩnh, nhiều file, có cấu trúc rõ ràng**, để:

1. Thêm / sửa nội dung (quy trình, tính năng, yêu cầu) **chỉ bằng cách sửa file dữ liệu**, không đụng code giao diện.
2. Thêm **mục mới** (ví dụ 04 · Hướng dẫn màn hình, 05 · Danh sách API) bằng 1 file dữ liệu + 1 dòng cấu hình + 1 dòng nạp file trong `index.html` (bắt buộc vì chạy được ở `file://`).
3. **Dùng lại cho dự án khác**: mỗi dự án là **một repo riêng, độc lập**, tạo từ repo template.
4. Thêm **ngôn ngữ thứ 4** trở đi mà không sửa code.
5. Làm mới giao diện theo **phương án C – Tài liệu cao cấp (Editorial)**.

### 1.2 Người cập nhật nội dung
- Người dùng nghiệp vụ (BA) tự sửa file dữ liệu bằng trình soạn thảo văn bản.
- Claude cập nhật theo yêu cầu.
- **Không** yêu cầu cài đặt, không có lệnh build.

### 1.3 Ràng buộc bắt buộc
| # | Ràng buộc | Hệ quả thiết kế |
|---|---|---|
| R1 | Bấm đúp `index.html` trên máy phải xem được (giao thức `file://`) | Không dùng `fetch()` đọc JSON; không dùng `<script type="module">`. Dữ liệu và code nạp bằng `<script src>` thường, đăng ký vào biến toàn cục `App`. |
| R2 | Deploy được GitHub Pages (kể cả đường dẫn thư mục con) và Netlify | Mọi đường dẫn là tương đối, không bắt đầu bằng `/`. |
| R3 | Không bước build | HTML/CSS/JS thuần, không framework, không npm cho phần chạy trên web. |
| R4 | Giữ đủ nội dung bản hiện tại | 8 quy trình (đúng số bước), 90 tính năng, 28 dòng yêu cầu, đủ 3 ngôn ngữ. |

### 1.4 Ngoài phạm vi
Giao diện điện thoại, chế độ tối, trang danh sách nhiều dự án, chuyển Excel → dữ liệu tự động, CI chạy kiểm thử trên GitHub, chỉnh sửa nội dung trực tiếp trên trang.

## 2. Cấu trúc repo

```
<ten-du-an>-wms-handbook/        ← 1 repo = 1 dự án (tạo từ repo template)
├── index.html                   ← trang chính: nạp core/ rồi content/, gọi App.start()
├── check.html                   ← trang tự kiểm tra nội dung (bấm đúp mở)
├── 404.html                     ← chuyển về index.html
├── netlify.toml                 ← publish ".", không có lệnh build
├── .nojekyll                    ← cho GitHub Pages
├── README.md                    ← hướng dẫn tiếng Việt (sửa nội dung, thêm mục, thêm ngôn ngữ, deploy)
├── core/                        ← KHUNG — giống hệt template, không sửa riêng từng dự án
│   ├── VERSION                  ← ví dụ 1.0.0
│   ├── fonts/                   ← Be Vietnam Pro, Source Serif 4 (woff2)
│   ├── css/
│   │   ├── tokens.css           ← màu, chữ, khoảng cách, bo góc, màu 8 quy trình
│   │   ├── base.css             ← reset, kiểu chữ, @font-face
│   │   ├── layout.css           ← menu trái, thanh trên, vùng nội dung
│   │   ├── components.css       ← nút, nhãn, ô tìm kiếm, bảng, thẻ, chip
│   │   ├── blocks/              ← CSS riêng từng khối (tiền tố class riêng)
│   │   └── print.css
│   └── js/
│       ├── app.js               ← App, khởi động, menu, điều hướng #hash, lỗi
│       ├── i18n.js              ← ngôn ngữ, t(), nhớ lựa chọn, ?lang=
│       ├── util.js              ← esc(), norm() không dấu, highlight()
│       ├── icons.js             ← bộ icon SVG dùng chung
│       └── blocks/
│           ├── process-flow.js
│           ├── feature-list.js
│           ├── requirement-table.js
│           └── guide.js
├── content/                     ← PHẦN RIÊNG CỦA DỰ ÁN — chỉ sửa ở đây
│   ├── config.js                ← tên dự án, ngôn ngữ, danh sách mục menu
│   ├── theme.css                ← (tuỳ chọn) ghi đè màu / logo theo khách
│   ├── i18n/ vi.js · en.js · ko.js   ← chữ giao diện
│   ├── data/
│   │   ├── processes.js
│   │   ├── features.js
│   │   └── requirements.js
│   └── assets/                  ← logo, ảnh chụp màn hình
├── tools/                       ← công cụ kiểm thử, không liên kết từ trang
│   ├── tests/                   ← Playwright + pytest: kiểm thử tự động
│   └── parity_check.py          ← đối chiếu nội dung bản cũ / bản mới
└── docs/superpowers/specs/      ← tài liệu thiết kế
```

**Nâng cấp khung cho dự án cũ:** chép đè thư mục `core/` từ template. `core/` và `content/` tách biệt hoàn toàn nên an toàn. Kiểm tra `core/VERSION` để biết phiên bản.

## 3. Mô hình dữ liệu

### 3.1 Chữ đa ngôn ngữ
Mọi chữ hiển thị trong `content/` dùng một trong hai dạng:
- Chuỗi thường `'Kiểm kê'` → hiểu là tiếng Việt, dùng cho mọi ngôn ngữ.
- Đối tượng `{ vi: 'Kiểm kê', en: 'Stocktaking', ko: '재고실사' }`.

`t(x)` trả về bản theo ngôn ngữ đang chọn; thiếu thì trả về `vi`; thiếu cả `vi` thì trả về chuỗi rỗng và ghi cảnh báo console.

### 3.2 `content/config.js`
```js
App.config({
  project: { code: 'DORCO', name: 'DORCO WMS',
             tagline: { vi: 'Quy trình kho & tính năng hệ thống', en: '…', ko: '…' },
             eyebrow: { vi: 'Sổ tay nghiệp vụ · WMS', en: '…', ko: '…' } },
  languages: [ { code: 'vi', label: 'Việt' }, { code: 'en', label: 'English' }, { code: 'ko', label: '한국어' } ],
  defaultLanguage: 'vi',
  plants: [ { code: 'HY', name: 'Hưng Yên' }, { code: 'HN', name: 'Hà Nam' } ],   // tuỳ chọn
  sections: [
    { id: 'quy-trinh',  type: 'process-flow',      data: 'processes',    title: { vi: 'Sơ đồ quy trình kho', … } },
    { id: 'tinh-nang',  type: 'feature-list',      data: 'features',     title: { vi: 'Danh sách tính năng', … } },
    { id: 'yeu-cau',    type: 'requirement-table', data: 'requirements', title: { vi: 'Requirements (Xác nhận)', … } }
  ]
});
```
(Dấu `…` trong các ví dụ ở mục 3 chỉ là rút gọn cho dễ đọc.)

Thứ tự trong `sections` = thứ tự menu, số thứ tự 01, 02, 03 tự sinh. Mỗi mục có thể có `eyebrow`, `intro` (đoạn mô tả đầu trang).

### 3.3 Dữ liệu `process-flow` (`content/data/processes.js`)
```js
App.data('processes', {
  title, subtitle,                          // tiêu đề sơ đồ
  lanes: [{
    id: 'p4', number: '4', color: 'teal',   // color: khoá trong tokens.css
    title, subtitle,
    layout: 'stack' | 'row',                // nhiều nhóm: xếp chồng hay cùng hàng
    groups: [{
      label,                                // vd 'A. Xuất bán thành phẩm'; bỏ trống nếu chỉ 1 nhóm
      steps: [{
        title, icon: 'pda',                 // icon: khoá trong core/js/icons.js
        systems: ['PDA','WMS','SAP','MANUAL'], // nhãn nơi thực hiện; nhãn tự do dạng { label }
        bullets: [ text | { sync: text } ], // { sync } = dòng đồng bộ (màu tím, ⇄)
        cases:   [ { tag: 'A', text } ],    // ô nhánh A/B
        optional: true                      // viền nét đứt
      }]
    }]
  }],
  panels: { integration, notes, legend }    // 3 khung cuối sơ đồ
});
```
Bổ sung khi triển khai:
- `lane.numbering: 'group' | 'lane'` — mặc định `'group'` (mỗi nhóm đánh số lại từ 1); `'lane'` đánh số liên tục qua các nhóm (dùng cho 3 quy trình NVL).
- `group.connector: 'solid' | 'dashed' | 'none'` — mũi tên nối vào nhóm khi `layout: 'row'`; `group.color` ghi đè màu làn (nhánh hàng NG màu đỏ).
- `step.wide: true` — ô rộng hơn; `cases[].alert` — dòng cảnh báo màu đỏ trong ô nhánh (ví dụ hàng NG).
- `systems` nhận chuỗi `'SAP' | 'WMS' | 'PDA' | 'MANUAL'` hoặc `{ label, sys }` cho nhãn tự do (vd `{ label: 'BP Mua', sys: 'MANUAL' }`).
- `panels = { integration: { title, systems: [{key, icon, name, text}], links: [{top, bottom}] }, notes: { title, items }, legend: { title, flows: [{color, dashed} | {sync: true}, text], swatches: [{color, text}], systemsNote, manualLabel } }`.

Số bước tự đánh; mũi tên giữa các bước tự vẽ.

### 3.4 Dữ liệu `feature-list` (`content/data/features.js`)
```js
App.data('features', {
  categories: [{ id: 'web', color: 'blue', label, description,
    groups: [{ title, link: 'quy-trinh',         // link tuỳ chọn tới mục khác
      items: [{ vi, en, ko, direction: 'SAP→WMS' }] }] }]
});
```
Số thứ tự (STT) tự đánh liên tục 1…n trên toàn danh sách; ô thống kê đầu trang tự đếm.

### 3.5 Dữ liệu `requirement-table` (`content/data/requirements.js`)
```js
App.data('requirements', {
  modules: [{ id: 'md', title,
    rows: [{ function: title,
      current:      [ { plant: 'HY'|'HN'|'', text } ],   // Hiện trạng
      requirements: [ { plant, text } ] }] }]           // Yêu cầu
});
```
Bảng 4 cột: STT | Phân hệ (gộp ô theo phân hệ) | Chức năng | Nội dung yêu cầu nghiệp vụ (2 khối Hiện trạng / Yêu cầu). Nhãn nhà máy lấy từ `config.plants` (mặc định rỗng — dự án khác có thể không có nhà máy).

### 3.6 Dữ liệu `guide` (cho mục 04 sau này)
```js
App.data('guide', { screens: [{ id, title, image: 'content/assets/…png', purpose,
  steps: [ text ], notes: [ text ] }] });
```
Khối này được làm sẵn ở mức tối thiểu (ảnh + các bước + ghi chú) để chứng minh khả năng mở rộng; chưa có dữ liệu DORCO.

### 3.7 Chữ giao diện (`content/i18n/<lang>.js`)
```js
App.strings('vi', { prev: '‹ Trước', next: 'Tiếp ›', print: 'In phần này', search: 'Tìm…', … });
```
Template cung cấp sẵn bộ vi / en / ko đầy đủ khoá. Thêm ngôn ngữ: thêm vào `config.languages`, thêm file `i18n/<code>.js`, nạp trong `index.html`, bổ sung khoá `<code>` dần trong dữ liệu.

## 4. Cách khung hoạt động

### 4.1 Khởi động
`index.html` nạp theo thứ tự: CSS core → `content/theme.css` → `core/js/util.js, i18n.js, icons.js, app.js, blocks/*.js` → `content/config.js` → `content/i18n/*.js` → `content/data/*.js` → `App.start()`.

`App.data(name, obj)`, `App.config(obj)`, `App.strings(lang, obj)`, `App.block(type, def)` chỉ ghi vào sổ đăng ký; `App.start()` mới dựng giao diện.

### 4.2 Khối hiển thị
```js
App.block('feature-list', {
  render(data, ctx) { return htmlString; },   // ctx: { t, lang, section, strings, util }
  mount(el, data, ctx) { /* gắn sự kiện tìm kiếm / lọc (tuỳ chọn) */ }
});
```
Mỗi khối dùng tiền tố class riêng (`pf-`, `fl-`, `rt-`, `gd-`) để không đụng nhau. Khung chỉ dựng mục đang mở; đổi ngôn ngữ hoặc đổi mục thì dựng lại mục đó.

### 4.3 Điều hướng
- `#<id>` mở mục; `#<id>--<anchor>` mở mục và cuộn tới phần con (vd `#tinh-nang--api`).
- Hash không tồn tại → mục đầu tiên.
- Menu, Trước / Tiếp, breadcrumb sinh từ `config.sections`. Mục có phần con (nhóm tính năng) hiện menu con.

### 4.4 Đa ngôn ngữ
- Ưu tiên: `?lang=` trên URL → `localStorage` → `config.defaultLanguage`.
- `localStorage` bọc try/catch; lỗi thì bỏ qua.
- Đặt `<html lang>`; với `ko` dùng `word-break: keep-all`.

### 4.5 Tìm kiếm
`util.norm()` bỏ dấu tiếng Việt (gồm đ → d), chữ thường. Tìm trên mọi ngôn ngữ của bản ghi. `util.highlight()` tô vàng phần khớp ở ngôn ngữ đang hiển thị.

### 4.6 In
"In phần này" in mục đang mở. `print.css` ẩn menu, thanh trên, bộ lọc. Sơ đồ quy trình: A3 ngang, thu nhỏ vừa trang. Bảng: A4 ngang, không cắt ngang một dòng.

### 4.7 Xử lý lỗi
- Mục khai báo nhưng thiếu dữ liệu hoặc sai `type` → hiện ô thông báo trong mục đó: "Thiếu dữ liệu `guide` — kiểm tra file content/data/guide.js đã được nạp trong index.html". Các mục khác chạy bình thường.
- Lỗi trong `render` của một khối được bắt lại, hiện thông báo tương tự, không làm hỏng cả trang.
- Khi khởi động, console liệt kê: bản dịch thiếu theo ngôn ngữ, icon không tồn tại, màu không tồn tại.

## 5. Giao diện — Phương án C (Editorial)

### 5.1 Hướng
Cẩm nang in đẹp, thân thiện, đọc lâu không mỏi. Tham chiếu: `phuong-an-giao-dien.html`, khối C.

### 5.2 Token chính (`tokens.css`)
| Nhóm | Giá trị |
|---|---|
| Nền trang / thẻ | `#faf7f2` / `#ffffff`; nền phụ `#efe7dc` |
| Chữ / chữ phụ | `#2a2420` / `#7b6f66` |
| Nhấn chính / tiêu đề phụ | `#7a3e2a` (nâu đỏ) |
| Đồng bộ (sync) | `#b4532a` |
| Màu 8 quy trình | 8 màu trầm, cùng độ sáng, đủ tương phản chữ trắng (WCAG AA) — định nghĩa `--lane-1` … `--lane-8` và khoá màu `teal, indigo, …` |
| Chữ tiêu đề | Source Serif 4 (700) |
| Chữ nội dung | Be Vietnam Pro (400/500/600) |
| Bo góc | thẻ 12px, khung làn 16px, chip 999px |
| Bóng | `0 1px 0 #eadfd0, 0 8px 24px rgba(80,50,30,.06)` |

Mỗi dự án có thể ghi đè token trong `content/theme.css`.

### 5.3 Thành phần thống nhất
Một kiểu duy nhất cho: thẻ bước, chip hệ thống (SAP / WMS / PDA / Thủ công), nhãn nhà máy, nhãn nhánh A/B, nút, nhóm nút ngôn ngữ, ô tìm kiếm, chip lọc, bảng, ô thống kê, thông báo lỗi.

### 5.4 Áp dụng cho từng khối
- **Sơ đồ quy trình:** mỗi làn là một khối thẻ trắng bo 16px; tiêu đề làn = số tròn màu quy trình + tên chữ có chân; các bước là thẻ nền phụ bo 12px, nối bằng mũi tên mảnh; nhóm A/B có nhãn và đường viền nét đứt màu làn. Ba khung cuối (Tích hợp hệ thống, Lưu ý chính, Chú thích) cùng kiểu thẻ.
- **Danh sách tính năng / Requirements:** bảng nền trắng bo 12px, tiêu đề cột nền phụ, dòng phân cách mảnh; nhãn "Hiện trạng" (xám) và "Yêu cầu" (màu nhấn).
- **Thu nhỏ sơ đồ vừa màn hình** giữ như hiện tại (nút "Xem kích thước thật").

## 6. Deploy

| Nền tảng | Cách làm |
|---|---|
| Máy cá nhân | Bấm đúp `index.html` |
| GitHub Pages | Đẩy repo → Settings → Pages → `main` / `(root)`; `.nojekyll` có sẵn |
| Netlify | Kéo thả thư mục, hoặc nối repo GitHub (tự deploy khi đẩy) — `netlify.toml`: không build, publish `.`; quy tắc redirect trả 404 cho `/tools/*` và `/docs/*` |

Phông chữ đóng gói trong `core/fonts/` (giấy phép SIL OFL), không phụ thuộc mạng.

GitHub Pages không loại trừ được thư mục khi không build, nên `tools/` và `docs/` vẫn truy cập được nếu biết đường dẫn; hai thư mục này không chứa dữ liệu nhạy cảm. Khi kéo thả lên Netlify, có thể bỏ hai thư mục này khỏi bản kéo thả.

## 7. Kiểm thử & nghiệm thu

1. **`check.html`** (người dùng; chuyển tới `index.html?check` để luôn dùng đúng danh sách file của trang chính): liệt kê mục thiếu dữ liệu, mã trùng, bản dịch thiếu theo ngôn ngữ, ảnh thiếu, icon/màu không tồn tại. Chạy trước mỗi lần deploy.
2. **`tools/tests/`** (Claude, `python3 -m pytest`): Playwright mở trang qua `file://` và qua HTTP server; với mỗi mục × mỗi ngôn ngữ: không có lỗi console, khối hiển thị có nội dung, tìm kiếm trả kết quả; chụp ảnh lưu `tools/screenshots/`.
3. **`tools/parity_check.py`** (chuyển đổi): so bản cũ `index_3.html` với bản mới — số làn 8, số bước từng nhóm, 90 tính năng, 28 dòng yêu cầu, và toàn bộ chữ ở 3 ngôn ngữ trùng khớp (bỏ qua khác biệt khoảng trắng).

**Điều kiện nghiệm thu:** cả 3 kiểm tra đạt; trang chạy được ở `file://`, Netlify và GitHub Pages thư mục con; thêm một mục mẫu `guide` chỉ bằng 1 file dữ liệu + 1 dòng config và hiển thị đúng.

## 8. Chuyển đổi nội dung hiện tại

Nội dung lấy từ bản đang dùng (`index_3.html` / các nguồn đã dựng nó) và chuyển sang `content/data/*.js`:
- 3 quy trình NVL đang viết cứng HTML → chuyển thành dữ liệu `lanes` như 5 quy trình còn lại.
- Danh sách tính năng 90 dòng, nhóm và bản dịch ko giữ nguyên.
- Bảng Requirements 28 dòng giữ nguyên.
- Toàn bộ bản dịch en / ko giữ nguyên; chữ giao diện chuyển vào `content/i18n/`.

Nếu người dùng có chỉnh sửa riêng trong `index_3.html` khác bản Claude giữ, cần cung cấp file đó trước khi chuyển đổi.
