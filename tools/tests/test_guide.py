def test_guide_extension(open_page):
    p = open_page('tools/fixtures/guide-demo.html', query='#huong-dan')
    p.wait_for_selector('.gd-screen')
    p.wait_for_timeout(300)                              # chờ ảnh lỗi được xử lý
    assert p.locator('.gd-screen').count() == 2 and p.locator('.gd-step').count() == 5
    assert p.locator('.gd-noimg').count() == 1           # màn hình 2 trỏ tới ảnh không tồn tại
    assert p.locator('#app-nav a[data-section]').count() == 4
