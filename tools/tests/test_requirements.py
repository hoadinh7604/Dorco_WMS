def test_rows_and_modules(open_page):
    p = open_page('index.html', query='#yeu-cau')
    assert p.locator('tr.rt-row').count() == 28
    assert p.locator('td.rt-module').count() == 9
    assert p.locator('table.rt-table th').all_inner_texts() == ['STT', 'Phân hệ', 'Chức năng', 'Nội dung yêu cầu nghiệp vụ']

def test_filter_module(open_page):
    p = open_page('index.html', query='#yeu-cau')
    p.click('.rt-chip[data-mod=tp]')
    assert p.locator('tr.rt-row').count() == 4

def test_plants_from_config(open_page):
    p = open_page('index.html', query='#yeu-cau')
    assert set(p.locator('.rt-plant').all_inner_texts()) == {'HY', 'HN'}

def test_search_en(open_page):
    p = open_page('index.html', query='?lang=en#yeu-cau')
    p.fill('input.rt-search', 'gia cong')
    assert p.locator('tr.rt-row').count() == 3
