SECTIONS = ['quy-trinh', 'tinh-nang', 'yeu-cau']

def test_nav_and_default(open_page):
    p = open_page('index.html')
    assert p.locator('#app-nav a[data-section]').evaluate_all('e=>e.map(a=>a.dataset.section)') == SECTIONS
    assert p.locator('section.app-page').get_attribute('data-section') == 'quy-trinh'

def test_unknown_hash(open_page):               # Review Focus 1
    p = open_page('index.html', query='#khong-co')
    assert p.locator('section.app-page').get_attribute('data-section') == 'quy-trinh'

def test_prev_next(open_page):
    p = open_page('index.html', query='#tinh-nang')
    p.click('#app-next')
    p.wait_for_selector('section.app-page[data-section=yeu-cau]')
    assert p.evaluate('location.hash') == '#yeu-cau' and p.locator('#app-next').is_disabled()

def test_lang_switch_persists(open_page):
    p = open_page('index.html')
    p.click('#app-langs [data-lang=ko]')
    p.reload()
    assert p.evaluate('document.documentElement.lang') == 'ko'

def test_broken_section_isolated(open_page):    # Review Focus 5
    p = open_page('tools/fixtures/broken.html', query='#thieu')
    assert 'guide' in p.inner_text('.app-error')
    p.click('#app-nav a[data-section=ok]')
    p.wait_for_selector('section.app-page[data-section=ok]')
    assert p.locator('.app-error').count() == 0

def test_http_and_file(http_base, page):
    page.goto(http_base + 'index.html')
    assert page.locator('#app-nav a').count() >= 3
