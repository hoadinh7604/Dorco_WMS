def test_clean(open_page):
    p = open_page('check.html')
    p.wait_for_selector('#check-summary[data-done]')
    assert p.inner_text('#check-summary').startswith('0 lỗi')

def test_bad(open_page):
    p = open_page('tools/fixtures/check-bad.html')
    p.wait_for_selector('#check-summary[data-done]')
    kinds = p.evaluate("App.check().errors.map(e=>e.kind)")
    assert {'missing-data', 'unknown-type', 'duplicate-id', 'missing-icon'} <= set(kinds)
    assert any(w['kind'] == 'missing-translation' for w in p.evaluate("App.check().warnings"))
    assert 'missing-image' in p.evaluate("App._checkImages.map(e=>e.kind)")
