"""Đối chiếu nội dung bản cũ (tools/reference/legacy-index.html) với bản mới (index.html).

In ra các dòng chữ có ở bản cũ nhưng không có ở bản mới, theo từng ngôn ngữ.
Một dòng cũ được coi là còn nếu nó xuất hiện (nguyên cụm) ở bất kỳ đâu trong chữ của bản mới,
nên khác biệt xuống dòng / tách ô không bị tính.
Bỏ qua: dòng rỗng, dòng chỉ có số, STT đầu dòng, khác biệt hoa/thường và khoảng trắng,
và các dòng liệt kê trong tools/parity-allow.txt (thay đổi có chủ đích).
Chạy:  python3 -m tools.parity_check
"""
import re, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
LEGACY = ROOT / 'tools' / 'reference' / 'legacy-index.html'
NEW = ROOT / 'index.html'
ALLOW = ROOT / 'tools' / 'parity-allow.txt'
LANGS = ['vi', 'en', 'ko']
SECTIONS = ['quy-trinh', 'tinh-nang', 'yeu-cau']

def clean(line):
    line = re.sub(r'\s+', ' ', line.replace(' ', ' ')).strip().lower()
    line = re.sub(r'^[\d\s·]+(?=\D)', '', line).strip()          # bỏ STT / dấu · ở đầu dòng
    return '' if not line or re.fullmatch(r'[\d\s.,%()]+', line) else line

def lines(text):
    return {c for c in (clean(x) for x in text.split('\n')) if c}

def collect(page, legacy, lang):
    out = set()
    for sec in SECTIONS:
        if legacy:
            page.goto(LEGACY.as_uri() + '#' + sec)
            page.click(f'#langs [data-l={lang}]')
            page.wait_for_timeout(150)
            out |= lines(page.inner_text(f'#p-{sec}'))
        else:
            page.goto(NEW.as_uri() + f'?lang={lang}#' + sec)
            page.wait_for_selector(f'section.app-page[data-section="{sec}"]')
            out |= lines(page.inner_text('#app-content'))
    return out

def allowed():
    if not ALLOW.exists(): return set()
    res = set()
    for raw in ALLOW.read_text(encoding='utf-8').splitlines():
        text = raw.split('#', 1)[0]
        c = clean(text)
        if c: res.add(c)
    return res

def main():
    allow, missing = allowed(), {}
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        pg = b.new_page(viewport={'width': 1600, 'height': 1000})
        for lang in LANGS:
            old, new = collect(pg, True, lang), collect(pg, False, lang)
            blob = '\n'.join(sorted(new))
            flat = ' '.join(blob.split())
            gone = sorted(x for x in old if x not in allow and x not in flat)
            if gone: missing[lang] = gone
        b.close()
    for lang, gone in missing.items():
        print(f'--- [{lang}] {len(gone)} dòng có ở bản cũ nhưng không thấy ở bản mới:')
        for g in gone: print('   ', g)
    if not missing: print('Khớp nội dung: không thiếu dòng nào (vi, en, ko).')
    return 1 if missing else 0

if __name__ == '__main__':
    sys.exit(main())
