"""Fixtures dùng chung cho kiểm thử Playwright.

open_page(rel_path, query='', block_storage=False) mở trang qua file:// (mặc định)
hoặc qua HTTP khi đặt biến môi trường WMS_BASE=http.
"""
import functools, http.server, os, socketserver, threading
from pathlib import Path
import pytest
from playwright.sync_api import sync_playwright

REPO = Path(__file__).resolve().parent.parent
BLOCK_STORAGE = """
Object.defineProperty(window, 'localStorage', {get(){ throw new Error('blocked'); }});
"""

@pytest.fixture(scope='session')
def repo():
    return REPO

@pytest.fixture(scope='session')
def _browser():
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        yield b
        b.close()

@pytest.fixture(scope='session')
def http_base():
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(REPO))
    class Quiet(handler.func):
        def log_message(self, *a): pass
    srv = socketserver.TCPServer(('127.0.0.1', 0), functools.partial(Quiet, directory=str(REPO)))
    t = threading.Thread(target=srv.serve_forever, daemon=True); t.start()
    yield f'http://127.0.0.1:{srv.server_address[1]}/'
    srv.shutdown()

@pytest.fixture
def page(_browser):
    ctx = _browser.new_context(viewport={'width': 1600, 'height': 1000})
    p = ctx.new_page()
    yield p
    ctx.close()

@pytest.fixture
def open_page(_browser, http_base):
    contexts = []
    def _open(rel_path, query='', block_storage=False):
        ctx = _browser.new_context(viewport={'width': 1600, 'height': 1000})
        contexts.append(ctx)
        if block_storage:
            ctx.add_init_script(BLOCK_STORAGE)
        p = ctx.new_page()
        p.set_default_timeout(5000)
        p.errors = []
        p.on('pageerror', lambda e: p.errors.append(str(e)))
        p.on('console', lambda m: m.type == 'error' and p.errors.append(m.text))
        if os.environ.get('WMS_BASE') == 'http':
            url = http_base + rel_path + query
        else:
            url = (REPO / rel_path).as_uri() + query
        p.goto(url)
        p.wait_for_load_state('load')
        return p
    yield _open
    for c in contexts: c.close()
