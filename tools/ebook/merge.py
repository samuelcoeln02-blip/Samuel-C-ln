import sys, pymupdf
cover, body, out = sys.argv[1], sys.argv[2], sys.argv[3]
doc = pymupdf.open(body)                 # body is the base -> its links stay
doc.insert_pdf(pymupdf.open(cover), start_at=0)  # put cover first
doc.save(out, deflate=True, garbage=3)
d = pymupdf.open(out)
tot=0; kinds={}
for i in range(len(d)):
    for l in d[i].get_links():
        tot+=1; k=l.get('kind'); kinds[k]=kinds.get(k,0)+1
# resolve one link target for sanity
first = None
for i in range(len(d)):
    ls=d[i].get_links()
    if ls: first=(i, ls[0].get('nameddest'), ls[0].get('page')); break
print(f"pages={len(d)} links={tot} kinds={kinds} firstlink_on_page={first}")
