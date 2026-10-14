#!/usr/bin/env python3
"""Install authentic official EFF Long Wordlist into extension package.
Download https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt
Usage: python3 tools/install_eff_wordlist.py /path/to/eff_large_wordlist.txt
"""
import sys,json,re,pathlib
if len(sys.argv)!=2:
    raise SystemExit("Usage: python3 tools/install_eff_wordlist.py eff_large_wordlist.txt")
source=pathlib.Path(sys.argv[1])
rows=[line.split() for line in source.read_text(encoding='utf-8').splitlines() if line.strip()]
expected=[''.join(str(d) for d in digits) for digits in __import__('itertools').product(range(1,7),repeat=5)]
if len(rows)!=7776 or any(len(r)!=2 or r[0]!=code or re.fullmatch('[a-z]+',r[1]) is None for code,r in zip(expected,rows)):
    raise SystemExit('ERROR: EFF wordlist format/sequence invalid; file unchanged')
words=[r[1] for r in rows]
if len(set(words))!=7776:raise SystemExit('ERROR: EFF wordlist contains duplicate words')
target=pathlib.Path(__file__).resolve().parent.parent/'words.json'
target.write_text(json.dumps(words,separators=(',',':'))+'\n',encoding='utf-8')
print('Installed verified EFF Long Wordlist: 7,776 words. Six-word entropy ≈ 77.55 bits.')
