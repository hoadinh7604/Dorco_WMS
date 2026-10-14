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
