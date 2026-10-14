# Template sổ tay nghiệp vụ WMS — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tách trang 1 file DORCO WMS thành template tĩnh nhiều file (`core/` + `content/`), giao diện phương án C, chạy được ở `file://`, Netlify và GitHub Pages, rồi ghi vào repo `Dorco_WMS` của người dùng.

**Architecture:** HTML/CSS/JS thuần, không build. Mọi file nạp bằng `<script src>` thường và tự đăng ký vào biến toàn cục `App` (`App.config / App.data / App.strings / App.block`); `App.start()` dựng menu, điều hướng `#hash` và gọi khối hiển thị của mục đang mở. Nội dung DORCO được chuyển một lần từ bản build hiện tại sang `content/data/*.js`.

**Tech Stack:** HTML5, CSS (custom properties), JavaScript ES2019 (không module), phông Be Vietnam Pro + Source Serif 4 (woff2, @fontsource). Kiểm thử: Python 3 + pytest + Playwright (Chromium có sẵn tại `/opt/pw-browsers`).

**Spec:** `docs/superpowers/specs/2026-10-14-wms-handbook-template-design.md`

## Global Constraints

- Mở được bằng `file://`: không `fetch()`, không `<script type="module">`, không đường dẫn bắt đầu bằng `/`.
- Không bước build; không npm/framework trong phần chạy trên web.
- Ngôn ngữ: `vi`, `en`, `ko`; mặc định `vi`; thiếu bản dịch → hiện `vi`.
- Ưu tiên chọn ngôn ngữ: `?lang=` → `localStorage['wms-lang']` → `config.defaultLanguage`. Mọi truy cập `localStorage` bọc try/catch.
- Tiền tố class theo khối: `pf-` (process-flow), `fl-` (feature-list), `rt-` (requirement-table), `gd-` (guide). Class khung dùng tiền tố `app-`.
- Token phương án C: nền `#faf7f2`, thẻ `#ffffff`, nền phụ `#efe7dc`, chữ `#2a2420`, chữ phụ `#7b6f66`, nhấn `#7a3e2a`, đồng bộ `#b4532a`; tiêu đề Source Serif 4 700; nội dung Be Vietnam Pro 400/500/600; bo góc thẻ 12px, làn 16px, chip 999px; bóng `0 1px 0 #eadfd0, 0 8px 24px rgba(80,50,30,.06)`.
- Nội dung phải khớp bản nguồn (lựa chọn A): 8 quy trình, 90 tính năng, 28 dòng yêu cầu, đủ 3 ngôn ngữ.
- Không làm: giao diện điện thoại, chế độ tối, trang nhiều dự án, chuyển Excel tự động, CI.

## Review Focus

1. Hash không tồn tại hoặc rỗng (`#abc`, `#tinh-nang--khong-co`) → mở mục đầu tiên / mở mục mà không lỗi; test ở Task 2 và Task 3.
2. `localStorage` bị chặn (chế độ riêng tư, `file://` một số trình duyệt) → trang vẫn chạy, ngôn ngữ mặc định; test ở Task 2.
3. Chữ có ký tự HTML (`<`, `&`, `"`) trong dữ liệu → hiển thị đúng chữ, không chèn HTML; test ở Task 3.
4. Tìm kiếm có dấu / không dấu / chữ hoa (`KIỂM KÊ`, `kiem ke`, `đổi`→`doi`) cho cùng kết quả; test ở Task 3.
5. Một mục khai báo trong `config` nhưng thiếu file dữ liệu hoặc `type` sai → chỉ mục đó báo lỗi, menu và các mục khác vẫn chạy; test ở Task 2.

---

## Cấu trúc file

```
index.html  check.html  404.html  netlify.toml  .nojekyll  README.md
core/VERSION
core/fonts/*.woff2                       Be Vietnam Pro 400/500/600, Source Serif 4 700 (vietnamese + latin)
core/css/tokens.css base.css layout.css components.css print.css
core/css/blocks/process-flow.css feature-list.css requirement-table.css guide.css
core/js/util.js i18n.js icons.js app.js
core/js/blocks/process-flow.js feature-list.js requirement-table.js guide.js
content/config.js  content/theme.css
content/i18n/vi.js en.js ko.js
content/data/processes.js features.js requirements.js
content/assets/                         (trống, .gitkeep)
tools/conftest.py  tools/tests/test_*.py  tools/parity_check.py
tools/fixtures/                         trang và dữ liệu giả cho test lỗi / guide
tools/reference/legacy-index.html      bản nguồn (lựa chọn A) để đối chiếu
docs/superpowers/specs/…  docs/superpowers/plans/…
```

Nơi làm việc: repo git trên cloud `/home/claude/dorco-wms-handbook`. Script chuyển đổi một lần (`/tmp/claude-0/migrate/*.py`) **không commit**; chỉ commit file dữ liệu sinh ra. Task 8 ghi toàn bộ repo vào `D:\project\13. Dorco\Tai lieu gui khach\Dorco-process\Dorco_WMS`.

---

### Task 1: Bộ kiểm thử + `util.js` + `i18n.js`

**Files:**
- Create: `tools/conftest.py`, `tools/tests/test_util_i18n.py`, `tools/fixtures/unit.html`
- Create: `core/js/util.js`, `core/js/i18n.js`
- Create: `pytest.ini` (testpaths = tools/tests)

**Interfaces:**
- Produces (toàn cục, `core/js/util.js`): `window.App = window.App || {}`; `App.util.esc(s: any) -> string` (escape `& < > " '`); `App.util.norm(s: string) -> string` (NFD, bỏ dấu, `đ/Đ`→`d`, chữ thường, gộp khoảng trắng); `App.util.highlight(text: string, q: string /*đã norm*/) -> string` (HTML đã escape, phần khớp bọc `<mark>`).
- Produces (`core/js/i18n.js`): `App.strings(lang: string, obj: object)`; `App.t(x: string | {[lang]: string}) -> string`; `App.ui(key: string) -> string` (tra `App._strings[lang][key]`, thiếu → `vi`, thiếu nữa → `key`); `App.lang() -> string`; `App.setLang(code: string)` (lưu `localStorage['wms-lang']`, đặt `<html lang>`, phát sự kiện `document` `app:lang`); `App.initLang(config)` (thứ tự ưu tiên ở Global Constraints); `App.missing` — mảng `{lang, sample}` ghi lại mỗi lần `t()` phải fallback.
- Produces (`tools/conftest.py`): fixture `repo` (Path gốc repo); fixture `open_page(rel_path: str, query: str = '', block_storage: bool = False) -> Page` mở `file://` (trả kèm `page.errors: list[str]` gom `pageerror` + console error); fixture `http_base` chạy `http.server` ở thư mục gốc trên cổng ngẫu nhiên, trả URL dạng `http://127.0.0.1:<port>/`.

- [ ] **Step 1: Viết test thất bại** — `tools/fixtures/unit.html` nạp `../../core/js/util.js` và `../../core/js/i18n.js`. Test:

```python
def test_norm(open_page):
    p = open_page('tools/fixtures/unit.html')
    assert p.evaluate("App.util.norm('KIỂM KÊ  Đổi')") == 'kiem ke doi'
def test_esc_highlight(open_page):
    p = open_page('tools/fixtures/unit.html')
    assert p.evaluate("App.util.esc('<a&\">')") == '&lt;a&amp;&quot;&gt;'
    assert p.evaluate("App.util.highlight('Kiểm kê <x>', 'kiem')") == '<mark>Kiểm</mark> kê &lt;x&gt;'
def test_t_fallback(open_page):
    p = open_page('tools/fixtures/unit.html')
    p.evaluate("App.initLang({languages:[{code:'vi'},{code:'en'},{code:'ko'}],defaultLanguage:'vi'}); App.setLang('ko')")
    assert p.evaluate("App.t({vi:'Kho', en:'Warehouse'})") == 'Kho'
    assert p.evaluate("App.t('Chuỗi thường')") == 'Chuỗi thường'
    assert p.evaluate("App.missing.length") == 1
def test_lang_priority(open_page):
    p = open_page('tools/fixtures/unit.html', query='?lang=en')
    p.evaluate("App.initLang({languages:[{code:'vi'},{code:'en'}],defaultLanguage:'vi'})")
    assert p.evaluate("App.lang()") == 'en'
def test_storage_blocked(open_page):          # Review Focus 2
    p = open_page('tools/fixtures/unit.html', block_storage=True)
    p.evaluate("App.initLang({languages:[{code:'vi'},{code:'en'}],defaultLanguage:'vi'}); App.setLang('en')")
    assert p.evaluate("App.lang()") == 'en' and p.errors == []
```

`block_storage=True` dùng `page.add_init_script` ghi đè `localStorage` bằng getter ném lỗi.

- [ ] **Step 2: Chạy test, xác nhận thất bại** — `cd /home/claude/dorco-wms-handbook && pytest -q tools/tests/test_util_i18n.py` → FAIL (`App` undefined).
- [ ] **Step 3: Viết `util.js`, `i18n.js`** theo Interfaces. `highlight` tìm vị trí trên chuỗi đã `norm` và cắt chuỗi gốc cùng vị trí (giữ độ dài: norm từng ký tự riêng, không gộp khoảng trắng khi tính vị trí).
- [ ] **Step 4: Chạy test** → 5 passed.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat(core): util, i18n và bộ kiểm thử"`.

---

### Task 2: Khung trang — `app.js`, layout phương án C, cấu hình DORCO, deploy

**Files:**
- Create: `core/js/app.js`, `core/js/icons.js`, `core/VERSION` (`1.0.0`)
- Create: `core/css/tokens.css`, `base.css`, `layout.css`, `components.css`, `print.css`, `core/fonts/*`
- Create: `index.html`, `404.html`, `netlify.toml`, `.nojekyll`, `content/config.js`, `content/theme.css` (rỗng, có chú thích), `content/i18n/vi.js`, `en.js`, `ko.js`, `content/assets/.gitkeep`
- Create: `tools/fixtures/broken.html` (+ `tools/fixtures/broken-config.js`), `tools/tests/test_shell.py`

**Interfaces:**
- Consumes: Task 1.
- Produces (`app.js`): `App.config(obj)`; `App.data(name: string, obj?)` (có `obj` → đăng ký; không có → trả dữ liệu đã đăng ký hoặc `undefined`); `App.block(type: string, def: {render(data, ctx) -> string, mount?(el: Element, data, ctx) -> void})`; `App.start()`; `App.go(hash: string)`. `ctx = {t, ui, lang, util, icon, config, section, sub /* phần sau '--' của hash hoặc '' */}`.
- Produces (`icons.js`): `App.icon(name: string) -> string` (SVG 24×24, `stroke=currentColor`); tên: `plan req print tag box check ret truck pda factory gear db wh sync loc list`; tên lạ → chuỗi rỗng + ghi `App.missingIcons`.
- Produces DOM: `#app-nav` (link `a[data-section]`, mục con `a[data-sub]`), `#app-crumb`, `#app-langs button[data-lang]`, `#app-prev`, `#app-next`, `#app-print`, `#app-content` chứa `section.app-page[data-section=<id>]`; lỗi mục: `.app-error` với chữ `ui('err_missing_data')` thay `{name}`.
- Produces (config): `config.sections[i] = {id, type, data, title, eyebrow?, intro?, subs?: [{id, title}]}`; `config.plants = [{code, name}]`.
- Chữ giao diện tối thiểu trong `content/i18n/*.js` (khoá): `prev next print search_placeholder all err_missing_data err_block nav_contents fit_on fit_off` cùng các khoá của Task 3–6; giá trị vi/en/ko lấy từ `UI` trong `/tmp/claude-0/tr.py` và `build.py` hiện có.

- [ ] **Step 1: Viết test thất bại** (`test_shell.py`):

```python
SECTIONS = ['quy-trinh', 'tinh-nang', 'yeu-cau']
def test_nav_and_default(open_page):
    p = open_page('index.html')
    assert p.locator('#app-nav a[data-section]').evaluate_all('e=>e.map(a=>a.dataset.section)') == SECTIONS
    assert p.locator('section.app-page').get_attribute('data-section') == 'quy-trinh'
def test_unknown_hash(open_page):               # Review Focus 1
    p = open_page('index.html', query='#khong-co')
    assert p.locator('section.app-page').get_attribute('data-section') == 'quy-trinh'
def test_prev_next(open_page):
    p = open_page('index.html', query='#tinh-nang'); p.click('#app-next')
    assert p.evaluate('location.hash') == '#yeu-cau' and p.locator('#app-next').is_disabled()
def test_lang_switch_persists(open_page):
    p = open_page('index.html'); p.click('#app-langs [data-lang=ko]'); p.reload()
    assert p.evaluate('document.documentElement.lang') == 'ko'
def test_broken_section_isolated(open_page):    # Review Focus 5
    p = open_page('tools/fixtures/broken.html', query='#thieu')
    assert 'guide' in p.inner_text('.app-error')
    p.click('#app-nav a[data-section=ok]'); assert p.locator('.app-error').count() == 0
def test_http_and_file(open_page, http_base, page):
    page.goto(http_base + 'index.html'); assert page.locator('#app-nav a').count() >= 3
```

`broken.html` nạp core + `broken-config.js` có 2 mục: `{id:'ok', type:'guide', data:'g'}` (có `App.data('g', {screens:[]})`) và `{id:'thieu', type:'guide', data:'guide'}` (không có dữ liệu). Test này cần khối `guide` → tạm đăng ký khối giả trong fixture: `App.block('guide',{render:()=>'<p>ok</p>'})`.

- [ ] **Step 2: Chạy** `pytest -q tools/tests/test_shell.py` → FAIL.
- [ ] **Step 3: Viết `app.js`, `icons.js`, CSS khung, `index.html`, `content/config.js`, `content/i18n/*.js`.** `index.html` nạp theo đúng thứ tự spec §4.1; `content/config.js` khai báo 3 mục (`process-flow`/`processes`, `feature-list`/`features`, `requirement-table`/`requirements`), `plants` HY/HN, tiêu đề 3 ngôn ngữ lấy từ bản nguồn. Icon SVG copy từ `IC` trong `/tmp/claude-0/patch_sheet.py` và `wms-quy-trinh-nvl.html`. `render` của một khối được bọc try/catch → `.app-error` với `ui('err_block')`. Đổi ngôn ngữ (`app:lang`) → dựng lại mục đang mở. Sau khi dựng mục đầu tiên, nếu `App.missing` hoặc `App.missingIcons` khác rỗng thì `console.warn` một bản tóm tắt (spec §4.7). Phông: `npm pack @fontsource/be-vietnam-pro @fontsource/source-serif-4` trong `/tmp`, chép các file woff2 subset `vietnamese` + `latin` (400/500/600; serif 700) vào `core/fonts/`, khai báo `@font-face` trong `base.css`; tiếng Hàn dùng phông hệ thống (`"Malgun Gothic","Apple SD Gothic Neo","Noto Sans KR"`) và `:lang(ko){word-break:keep-all}`. `netlify.toml`: `[build] publish="."` không có `command`; redirect `/tools/*` và `/docs/*` → `/404.html` status 404. `404.html` chuyển về `index.html` bằng đường dẫn tương đối (`<meta http-equiv="refresh" content="0;url=./">` và link dự phòng).
- [ ] **Step 4: Chạy** → 6 passed; mở `index.html` bằng Playwright, chụp `tools/screenshots/shell.png`, xem bằng Read: menu trái, thanh trên, tông màu C.
- [ ] **Step 5: Commit** — `git commit -m "feat(core): khung trang, điều hướng, ngôn ngữ, giao diện C"`.

---

### Task 3: Khối `feature-list` + dữ liệu `features.js`

**Files:**
- Create: `core/js/blocks/feature-list.js`, `core/css/blocks/feature-list.css`, `content/data/features.js`, `tools/tests/test_features.py`
- Create (không commit): `/tmp/claude-0/migrate/export_features.py`

**Interfaces:**
- Consumes: `App.block`, `ctx`, `App.util.*`, `App.icon`.
- Produces: dữ liệu theo spec §3.4; mỗi `item = {vi, en, ko, direction?: 'SAP→WMS'|'WMS→SAP'}`; `category.id` dùng làm mục con: `config.sections[1].subs = [{id:'web'},{id:'app'},{id:'api'}]` (hash `#tinh-nang--api`). DOM: `.fl-kpi`, `.fl-chip[data-cat]`, `input.fl-search`, `.fl-cat[id=fl-<id>]`, `tr.fl-row`, `.fl-dir`.

- [ ] **Step 1: Viết test thất bại:**

```python
def test_counts(open_page):
    p = open_page('index.html', query='#tinh-nang')
    assert p.locator('tr.fl-row').count() == 90
    assert p.locator('.fl-kpi b').all_inner_texts() == ['90', '46', '14', '30']
    assert p.locator('tr.fl-row td:first-child').all_inner_texts()[:3] == ['1', '2', '3']
def test_search_accents(open_page):            # Review Focus 4
    p = open_page('index.html', query='#tinh-nang')
    counts = []
    for q in ['kiem ke', 'KIỂM KÊ', 'Kiểm kê']:
        p.fill('input.fl-search', q); counts.append(p.locator('tr.fl-row').count())
    assert counts[0] == counts[1] == counts[2] == 6
def test_filter_and_sub(open_page):
    p = open_page('index.html', query='#tinh-nang--api')
    assert p.evaluate("document.getElementById('fl-api').getBoundingClientRect().top < 200")
    p.click('.fl-chip[data-cat=app]'); assert p.locator('tr.fl-row').count() == 14
def test_unknown_sub(open_page):               # Review Focus 1
    p = open_page('index.html', query='#tinh-nang--khong-co')
    assert p.locator('tr.fl-row').count() == 90 and p.errors == []
def test_ko_and_escape(open_page):             # Review Focus 3
    p = open_page('index.html', query='?lang=ko#tinh-nang')
    assert '기준정보' in p.inner_text('.fl-cat')
    p.evaluate("App.data('features').categories[0].groups[0].items[0].vi='<b>&x'; App.go('#tinh-nang')")
    p.click('#app-langs [data-lang=vi]'); assert '<b>&x' in p.inner_text('tr.fl-row >> nth=0')
```

(Số 6 = 4 dòng nhóm Kiểm kê + "Kiểm kê" Mobile + "Kết quả kiểm kê" tích hợp; xác minh lại bằng dữ liệu ở Step 3 và ghi số thật vào test nếu khác.)

- [ ] **Step 2: Chạy** → FAIL.
- [ ] **Step 3:** `export_features.py` đọc `/tmp/claude-0/features.json`, `tr.py` (`FEAT_KO`, `GROUPS`, `CATS`), bỏ dòng gốc số 30 và 56, ghi `content/data/features.js` (có chú thích tiếng Việt đầu file: cách thêm một tính năng). Viết `feature-list.js` / `.css`: ô thống kê, chip lọc, tìm kiếm, bảng theo nhóm, cột thứ 2 là ngôn ngữ phụ (vi→en, en→vi, ko→en), nhãn hướng cho nhóm tích hợp, link "Xem sơ đồ quy trình →" cho nhóm có `link`.
- [ ] **Step 4: Chạy** → 5 passed; chụp `tools/screenshots/features-vi.png`, `-ko.png`, xem.
- [ ] **Step 5: Commit** — `feat: khối danh sách tính năng + dữ liệu DORCO`.

---

### Task 4: Khối `requirement-table` + dữ liệu `requirements.js`

**Files:**
- Create: `core/js/blocks/requirement-table.js`, `core/css/blocks/requirement-table.css`, `content/data/requirements.js`, `tools/tests/test_requirements.py`
- Create (không commit): `/tmp/claude-0/migrate/export_requirements.py`

**Interfaces:**
- Consumes: Task 2 (`config.plants`).
- Produces: dữ liệu theo spec §3.5. DOM: `table.rt-table`, `tr.rt-row`, `td.rt-module[rowspan]`, `.rt-label.rt-cur`, `.rt-label.rt-need`, `.rt-plant`, `.rt-chip[data-mod]`, `input.rt-search`.

- [ ] **Step 1: Viết test thất bại:**

```python
def test_rows_and_modules(open_page):
    p = open_page('index.html', query='#yeu-cau')
    assert p.locator('tr.rt-row').count() == 28
    assert p.locator('td.rt-module').count() == 9
    assert p.locator('table.rt-table th').all_inner_texts() == ['STT', 'Phân hệ', 'Chức năng', 'Nội dung yêu cầu nghiệp vụ']
def test_filter_module(open_page):
    p = open_page('index.html', query='#yeu-cau'); p.click('.rt-chip[data-mod=tp]')
    assert p.locator('tr.rt-row').count() == 4
def test_plants_from_config(open_page):
    p = open_page('index.html', query='#yeu-cau')
    assert set(p.locator('.rt-plant').all_inner_texts()) == {'HY', 'HN'}
def test_search_en(open_page):
    p = open_page('index.html', query='?lang=en#yeu-cau'); p.fill('input.rt-search', 'gia cong')
    assert p.locator('tr.rt-row').count() == 3
```

(Số 3 = các dòng có "gia công" ở bất kỳ ngôn ngữ nào; xác minh bằng dữ liệu ở Step 3 và ghi số thật vào test nếu khác.)

- [ ] **Step 2: Chạy** → FAIL.
- [ ] **Step 3:** `export_requirements.py` đọc `/tmp/claude-0/req2.py` (`PH`, `R`) → `content/data/requirements.js`. Viết khối: STT liên tục, ô Phân hệ gộp theo nhóm liên tiếp sau lọc, khối "Hiện trạng"/"Yêu cầu" (ẩn khối rỗng), nhãn nhà máy chỉ khi `plant` có trong `config.plants`.
- [ ] **Step 4: Chạy** → 4 passed; chụp, xem.
- [ ] **Step 5: Commit** — `feat: khối bảng yêu cầu + dữ liệu DORCO`.

---

### Task 5: Khối `process-flow` + dữ liệu `processes.js`

**Files:**
- Create: `core/js/blocks/process-flow.js`, `core/css/blocks/process-flow.css`, `content/data/processes.js`, `tools/tests/test_processes.py`
- Create (không commit): `/tmp/claude-0/migrate/export_processes.py`

**Interfaces:**
- Consumes: `App.icon`, token màu làn trong `tokens.css`: `--pf-blue --pf-green --pf-orange --pf-red --pf-teal --pf-indigo --pf-purple --pf-cyan --pf-slate` (giá trị trầm theo §5.2, chữ trắng đạt tương phản ≥ 4.5:1).
- Produces: dữ liệu theo spec §3.3, bổ sung 2 trường đã chốt khi lập plan: `lane.numbering: 'lane'|'group'` (mặc định `'group'`; làn 1–3 dùng `'lane'` để đánh số liên tục như bản nguồn) và `group.connector: 'solid'|'dashed'|'none'` (mũi tên vào nhóm khi `layout:'row'`; mặc định `'solid'`; `group.color` tuỳ chọn ghi đè màu làn, dùng cho nhánh NG đỏ). `panels = {integration: {systems:[{key,name,text,icon}], links:[{top,bottom}]}, notes:[text], legend:{flows:[{color,dashed,text}], systems:true}}`. DOM: `.pf-lane[data-lane]`, `.pf-group`, `.pf-step`, `.pf-num`, `.pf-sync`, `.pf-case[data-tag]`, `.pf-step.pf-optional`, `#pf-fit`.
- Thêm vào spec §3.3 hai trường trên (sửa spec trong cùng commit).

- [ ] **Step 1: Viết test thất bại:**

```python
EXPECT = {'1':[6,2], '2':[3,4], '3':[3,3], '4':[4], '5':[4,5], '6':[4,3], '7':[5,5], '8':[4]}
def test_lanes_and_steps(open_page):
    p = open_page('index.html', query='#quy-trinh')
    got = p.evaluate("""[...document.querySelectorAll('.pf-lane')].reduce((o,l)=>(o[l.dataset.lane]=
        [...l.querySelectorAll('.pf-group')].map(g=>g.querySelectorAll('.pf-step').length),o),{})""")
    assert got == EXPECT
def test_numbering(open_page):
    p = open_page('index.html', query='#quy-trinh')
    assert p.locator('.pf-lane[data-lane="1"] .pf-num').all_inner_texts() == [str(i) for i in range(1, 9)]
    assert p.locator('.pf-lane[data-lane="5"] .pf-group >> nth=1').locator('.pf-num').all_inner_texts() == ['1','2','3','4','5']
def test_row_layout_and_cases(open_page):
    p = open_page('index.html', query='#quy-trinh')
    g = p.locator('.pf-lane[data-lane="6"] .pf-group')
    assert abs(g.nth(0).bounding_box()['y'] - g.nth(1).bounding_box()['y']) < 2
    assert p.locator('.pf-lane[data-lane="5"] .pf-case').count() == 4
    assert p.locator('.pf-lane[data-lane="5"] .pf-optional').count() == 1
def test_all_languages_no_vietnamese_leak(open_page):
    for lang in ['en', 'ko']:
        p = open_page('index.html', query=f'?lang={lang}#quy-trinh')
        assert not re.search('[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]',
                             p.inner_text('.app-page'), re.I)
```

- [ ] **Step 2: Chạy** → FAIL.
- [ ] **Step 3:** `export_processes.py`: làn 1–3 parse từ `/tmp/claude-0/wms-quy-trinh-nvl.html` (sau các thay thế trong `patch_sheet.py`) ghép bản dịch từ `S` (`tr.py` + `patch_sheet.py`); làn 4–8 lấy từ `G` trong `/tmp/claude-0/lanes2.py`; panels từ phần "BOTTOM" + `S`. Ghi `content/data/processes.js` có chú thích hướng dẫn thêm bước / làn. Viết khối theo §5.4: thẻ làn bo 16px, nhóm viền nét đứt màu làn, mũi tên mảnh, nút thu vừa màn hình `#pf-fit` (giữ hành vi `zoom` hiện tại).
- [ ] **Step 4: Chạy** → 4 passed; chụp toàn sơ đồ vi/ko, xem từng làn so với bản nguồn.
- [ ] **Step 5: Commit** — `feat: khối sơ đồ quy trình + 8 quy trình DORCO`.

---

### Task 6: Khối `guide` (mở rộng mẫu)

**Files:**
- Create: `core/js/blocks/guide.js`, `core/css/blocks/guide.css`, `tools/fixtures/guide-demo.html`, `tools/fixtures/guide-data.js`, `tools/fixtures/sample.png`, `tools/tests/test_guide.py`

**Interfaces:**
- Produces: dữ liệu theo spec §3.6; DOM `.gd-screen`, `.gd-step`, `img.gd-img`; ảnh lỗi → thay bằng khung `.gd-noimg` chứa đường dẫn ảnh.

- [ ] **Step 1: Test thất bại** — `guide-demo.html` = bản sao `index.html` có thêm đúng 1 dòng nạp `guide-data.js` và config thêm 1 mục `{id:'huong-dan', type:'guide', data:'guide'}`:

```python
def test_guide_extension(open_page):
    p = open_page('tools/fixtures/guide-demo.html', query='#huong-dan')
    assert p.locator('.gd-screen').count() == 2 and p.locator('.gd-step').count() == 5
    assert p.locator('.gd-noimg').count() == 1          # màn hình 2 trỏ tới ảnh không tồn tại
    assert p.locator('#app-nav a[data-section]').count() == 4
```

- [ ] **Step 2: Chạy** → FAIL. **Step 3:** viết khối. **Step 4:** → PASS. **Step 5: Commit** — `feat: khối hướng dẫn màn hình`.

---

### Task 7: `check.html` — trang tự kiểm tra

**Files:**
- Create: `check.html`, `core/js/check.js`, `tools/fixtures/check-bad.html`, `tools/fixtures/bad-data.js`, `tools/tests/test_check.py`

**Interfaces:**
- Consumes: `App._config`, `App._data`, `App._blocks`, `App.missingIcons`, `App.missing`.
- Produces: `App.check() -> {errors: [{kind, where, detail}], warnings: [...]}`; `kind ∈ {'missing-data','unknown-type','duplicate-id','missing-translation','missing-icon','missing-image'}`. `check.html` nạp giống `index.html` rồi hiển thị bảng kết quả + dòng tổng `#check-summary` dạng `"0 lỗi · 0 cảnh báo"`. Thiếu bản dịch là **cảnh báo**, còn lại là **lỗi**. Ảnh kiểm tra bằng `new Image()` (chạy được ở `file://`).

- [ ] **Step 1: Test thất bại:**

```python
def test_clean(open_page):
    p = open_page('check.html'); p.wait_for_selector('#check-summary[data-done]')
    assert p.inner_text('#check-summary').startswith('0 lỗi')
def test_bad(open_page):
    p = open_page('tools/fixtures/check-bad.html'); p.wait_for_selector('#check-summary[data-done]')
    kinds = p.evaluate("App.check().errors.map(e=>e.kind)")
    assert {'missing-data','unknown-type','duplicate-id','missing-icon'} <= set(kinds)
    assert any(w['kind']=='missing-translation' for w in p.evaluate("App.check().warnings"))
```

- [ ] **Step 2–4:** chạy FAIL → viết → PASS. **Step 5: Commit** — `feat: trang tự kiểm tra nội dung`.

---

### Task 8: In ấn, đối chiếu nội dung, README, ghi vào repo người dùng

**Files:**
- Modify: `core/css/print.css`
- Create: `tools/__init__.py`, `tools/reference/legacy-index.html` (copy `/mnt/user-data/outputs/index.html`), `tools/parity_check.py`, `tools/parity-allow.txt`, `tools/tests/test_parity_print.py`, `README.md`
- Modify: spec §2 và §7 — đổi tên `tools/smoke-test.py`, `tools/parity-check.py` thành `tools/tests/` và `tools/parity_check.py` (tên module Python hợp lệ)

**Interfaces:**
- Produces: `parity_check.collect(page, url, lang) -> set[str]` (chữ hiển thị của mọi mục, đã chuẩn hoá khoảng trắng, đã bấm "Tất cả"); `parity_check.main() -> int` (in danh sách chữ có ở bản nguồn mà không có ở bản mới, trừ dòng có trong `parity-allow.txt`; trả 0 khi rỗng).

- [ ] **Step 1: Test thất bại:**

```python
def test_parity():
    from tools.parity_check import main; assert main() == 0
def test_print_hides_chrome(open_page):
    p = open_page('index.html', query='#yeu-cau'); p.emulate_media(media='print')
    assert not p.locator('#app-nav').is_visible() and not p.locator('.rt-search').is_visible()
```

- [ ] **Step 2: Chạy** → FAIL. **Step 3:** viết `parity_check.py` (bản nguồn mở `tools/reference/legacy-index.html`, bấm từng ngôn ngữ, đi qua `#quy-trinh`, `#tinh-nang`, `#yeu-cau`); chỉ đưa vào `parity-allow.txt` những chữ giao diện cố ý đổi (ví dụ nhãn nút), mỗi dòng kèm `# lý do`. Hoàn thiện `print.css` (§4.6). Viết `README.md` tiếng Việt: (1) sửa nội dung — ví dụ thêm 1 tính năng, 1 bước quy trình; (2) thêm mục mới — copy ví dụ `guide`; (3) thêm ngôn ngữ; (4) deploy GitHub Pages / Netlify; (5) nâng cấp `core/`; (6) chạy `check.html` trước khi deploy.
- [ ] **Step 4: Chạy toàn bộ** `pytest -q` → tất cả PASS; chạy thêm toàn bộ test qua `http_base` bằng biến môi trường `WMS_BASE=http` (conftest đổi `open_page` sang HTTP) → PASS.
- [ ] **Step 5: Commit** — `feat: in ấn, đối chiếu nội dung, README`.
- [ ] **Step 6: Ghi vào repo người dùng.** Kiểm tra lại `device_list_dir` thư mục `Dorco_WMS` (nếu có file mới ngoài `index_3.html`, dừng và hỏi). Chép toàn bộ repo (trừ `.git/`, `tools/screenshots/`, `__pycache__/`) sang `/mnt/user-data/outputs/Dorco_WMS/…`, ghi bằng `device_commit_files` vào đúng đường dẫn tương ứng (tối đa 50 file mỗi lần). Không xoá `index_3.html`.
- [ ] **Step 7: Xác minh trên máy người dùng** — `device_list_dir` đệ quy, so số file và kích thước với bản cloud. Gửi người dùng hướng dẫn commit / push:

```bash
cd "D:\project\13. Dorco\Tai lieu gui khach\Dorco-process\Dorco_WMS"
git add -A
git commit -m "Cấu trúc lại sổ tay WMS theo template core/ + content/"
git push -u origin main
```

rồi bật GitHub Pages (Settings → Pages → `main` / `(root)`) → `https://hoadinh7604.github.io/Dorco_WMS/`; gợi ý xoá hoặc giữ `index_3.html`.
