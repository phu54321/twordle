# %%
with open('words.dic', 'r') as rf:
    lines = rf.read().split('\n')
    lines = [l.strip() for l in lines if l]  # newline/ws strip
    lines = [l.lower() for l in lines if l]  # empty line filter


# %%
len(lines)

# %%
lines[:100]
# %%
import re
pattern = re.compile('^([a-z]+)(/.+)?$')
words = []
for l in lines:
    m = pattern.match(l)
    if m:
        words.append(m[1])
# %%
words
# %%
words = set(words)
words = list(words)
words.sort()
# %%
import json
with open('words.json', 'w') as wf:
    wf.write(json.dumps(words, indent=2))

# %%
