import functools, http.server, socketserver, threading
import pytest
from tools.conftest import REPO

# --- Important 1: 404.html không được lặp vô hạn ---
@pytest.fixture
def server_404():
    class H(http.server.SimpleHTTPRequestHandler):
        hits = []
        def __init__(s, *a, **k): super().__init__(*a, directory=str(REPO), **k)
        def log_message(s, *a): pass
        def send_head(s):
            H.hits.append(s.path)
            path = s.translate_path(s.path)
            import os
            if not os.path.exists(path):
                body = (REPO / '404.html').read_bytes()
                s.send_response(404); s.send_header('Content-Type', 'text/html; charset=utf-8')
                s.send_header('Content-Length', str(len(body))); s.end_headers()
                import io; return io.BytesIO(body)
            return super().send_head()
    srv = socketserver.TCPServer(('127.0.0.1', 0), H)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    yield f'http://127.0.0.1:{srv.server_address[1]}', H.hits
    srv.shutdown()

def test_404_no_loop(server_404, page):
    base, hits = server_404
    page.goto(base + '/a/b')
    page.wait_for_timeout(1500)
    docs = [h for h in hits if '.' not in h.rsplit('/', 1)[-1]]   # chỉ tính các lần tải trang
    assert docs == ['/a/b', '/'], docs
    assert page.evaluate('location.pathname') == '/'

# --- Important 2: hash hỏng (%) ---
def test_malformed_hash(open_page):
    p = open_page('index.html', query='#%')
    assert p.locator('section.app-page').get_attribute('data-section') == 'quy-trinh'
    p.click('#app-nav a[data-section=yeu-cau]')
    p.wait_for_selector('section.app-page[data-section=yeu-cau]')

# --- Important 3: check bắt lỗi cấu trúc, màu, nhà máy ---
def test_check_structure_color_plant(open_page):
    p = open_page('tools/fixtures/check-bad2.html')
    p.wait_for_selector('#check-summary[data-done]')
    errs = p.evaluate("App.check().errors")
    kinds = [e['kind'] for e in errs]
    assert kinds.count('bad-structure') >= 4
    assert 'unknown-color' in kinds and 'unknown-plant' in kinds

def test_render_error_names_data(open_page):
    p = open_page('tools/fixtures/check-bad2.html', query='?run#f')
    assert 'features' in p.inner_text('.app-error') and 'check.html' in p.inner_text('.app-error')

# --- Important 4: in sơ đồ khổ A3 ngang, bảng A4 ngang ---
def test_print_page_sizes(open_page):
    from pypdf import PdfReader
    import io
    for sec, want in [('quy-trinh', (1190.5, 841.9)), ('yeu-cau', (841.9, 595.3))]:
        p = open_page('index.html', query='#' + sec)
        pdf = PdfReader(io.BytesIO(p.pdf(prefer_css_page_size=True)))
        box = pdf.pages[0].mediabox
        assert abs(float(box.width) - want[0]) < 3 and abs(float(box.height) - want[1]) < 3, sec
    p = open_page('index.html', query='#quy-trinh')
    p.emulate_media(media='print')
    w = p.evaluate("document.querySelector('.pf-sheet').getBoundingClientRect().width")
    assert w <= 1512

# --- Important 5: tính năng viết dạng chuỗi thường vẫn tìm được ---
def test_plain_string_item_search(open_page):
    p = open_page('index.html', query='#tinh-nang')
    p.evaluate("App.data('features').categories[0].groups[0].items.push('Kiểm kê chuỗi thường'); App.data('features').categories[0].groups[0].title='Nhóm chuỗi'; App.go('#tinh-nang--web')")
    p.fill('input.fl-search', 'kiem ke chuoi')
    assert p.locator('tr.fl-row').count() == 1
    p.fill('input.fl-search', 'nhom chuoi')
    assert p.locator('tr.fl-row').count() == 7

# --- Important 6 (nâng từ Minor 4): thông báo thiếu dữ liệu nhắc lỗi cú pháp ---
def test_missing_data_mentions_syntax(open_page):
    p = open_page('tools/fixtures/broken.html', query='#thieu')
    assert 'cú pháp' in p.inner_text('.app-error')
