import subprocess, sys

def test_parity(repo):
    # chạy trong tiến trình riêng: parity_check tự mở Playwright, không dùng chung trình duyệt của pytest
    r = subprocess.run([sys.executable, '-m', 'tools.parity_check'], cwd=repo, capture_output=True, text=True)
    assert r.returncode == 0, r.stdout + r.stderr

def test_print_hides_chrome(open_page):
    p = open_page('index.html', query='#yeu-cau')
    p.emulate_media(media='print')
    assert not p.locator('#app-nav').is_visible() and not p.locator('.rt-search').is_visible()
