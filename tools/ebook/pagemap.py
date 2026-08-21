import sys, json, pymupdf
pdf = sys.argv[1]; finds = json.loads(sys.argv[2])
doc = pymupdf.open(pdf)
out = {}
for key, needle in finds.items():
    last = None
    for i in range(len(doc)):
        if doc[i].search_for(needle, quads=False):
            last = i + 1  # 1-based within body
    out[key] = last
print(json.dumps(out))
