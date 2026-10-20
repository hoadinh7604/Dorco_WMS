import re

EXPECT = {'1': [8, 3], '2': [3, 4], '3': [3, 3], '4': [4], '5': [4, 5], '6': [4, 3], '7': [4, 5], '8': [4]}
VI_CHARS = '[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]'

def test_lanes_and_steps(open_page):
    p = open_page('index.html', query='#quy-trinh')
    got = p.evaluate("""[...document.querySelectorAll('.pf-lane')].reduce((o,l)=>(o[l.dataset.lane]=
        [...l.querySelectorAll('.pf-group')].map(g=>g.querySelectorAll('.pf-step').length),o),{})""")
    assert got == EXPECT

def test_numbering(open_page):
    p = open_page('index.html', query='#quy-trinh')
    assert p.locator('.pf-lane[data-lane="1"] .pf-num').all_inner_texts() == [str(i) for i in range(1, 12)]
    assert p.locator('.pf-lane[data-lane="5"] .pf-group').nth(1).locator('.pf-num').all_inner_texts() == ['1', '2', '3', '4', '5']

def test_row_layout_and_cases(open_page):
    p = open_page('index.html', query='#quy-trinh')
    g = p.locator('.pf-lane[data-lane="6"] .pf-group')
    assert abs(g.nth(0).bounding_box()['y'] - g.nth(1).bounding_box()['y']) < 2
    assert p.locator('.pf-lane[data-lane="1"] .pf-case').count() == 5
    assert p.locator('.pf-lane[data-lane="5"] .pf-optional').count() == 1

def test_all_languages_no_vietnamese_leak(open_page):
    for lang in ['en', 'ko']:
        p = open_page('index.html', query=f'?lang={lang}#quy-trinh')
        assert p.locator('.pf-step').count() == 57
        assert not re.search(VI_CHARS, p.inner_text('.app-page'), re.I)
