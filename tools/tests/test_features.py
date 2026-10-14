def test_counts(open_page):
    p = open_page('index.html', query='#tinh-nang')
    assert p.locator('tr.fl-row').count() == 90
    assert p.locator('.fl-kpi b').all_inner_texts() == ['90', '46', '14', '30']
    assert p.locator('tr.fl-row td:first-child').all_inner_texts()[:3] == ['1', '2', '3']

def test_search_accents(open_page):            # Review Focus 4
    p = open_page('index.html', query='#tinh-nang')
    counts = []
    for q in ['kiem ke', 'KIỂM KÊ', 'Kiểm kê']:
        p.fill('input.fl-search', q)
        counts.append(p.locator('tr.fl-row').count())
    assert counts[0] == counts[1] == counts[2] == 6

def test_filter_and_sub(open_page):
    p = open_page('index.html', query='#tinh-nang--api')
    assert p.evaluate("document.getElementById('fl-api').getBoundingClientRect().top < 200")
    p.click('.fl-chip[data-cat=app]')
    assert p.locator('tr.fl-row').count() == 14

def test_unknown_sub(open_page):               # Review Focus 1
    p = open_page('index.html', query='#tinh-nang--khong-co')
    assert p.locator('tr.fl-row').count() == 90 and p.errors == []

def test_ko_and_escape(open_page):             # Review Focus 3
    p = open_page('index.html', query='?lang=ko#tinh-nang')
    assert '기준정보' in p.inner_text('.fl-cat >> nth=0')
    p.evaluate("App.data('features').categories[0].groups[0].items[0].vi='<b>&x'")
    p.click('#app-langs [data-lang=vi]')
    p.wait_for_selector('html[lang=vi]')
    assert '<b>&x' in p.inner_text('tr.fl-row >> nth=0')
