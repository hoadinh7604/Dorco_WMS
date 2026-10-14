def test_guide_extension(open_page):
    p = open_page('tools/fixtures/guide-demo.html', query='#huong-dan')
    p.wait_for_selector('.gd-screen')
    p.wait_for_timeout(300)                              # chờ ảnh lỗi được xử lý
    assert p.locator('.gd-screen').count() == 2 and p.locator('.gd-step').count() == 5
    assert p.locator('.gd-noimg').count() == 1           # màn hình 2 trỏ tới ảnh không tồn tại
    assert p.locator('#app-nav a[data-section]').count() == 5   # 4 mục của DORCO + 1 mục thêm trong fixture

def test_solution_section(open_page):
    p = open_page('index.html', query='#giai-phap--master-data')
    p.wait_for_selector('.gd-screen')
    assert p.locator('#app-nav a[data-section]').count() == 4
    assert p.locator('.gd-group[data-anchor="master-data"] h2').inner_text().startswith('4.1')
    assert p.locator('.gd-screen img.gd-img').count() == 1          # ảnh có thật, không bị thay bằng khung lỗi
    assert p.evaluate("document.querySelector('img.gd-img').naturalWidth") > 1000
    assert p.locator('.gd-screen .gd-step').count() >= 5
