# -*- coding: utf-8 -*-
with open("kivi-app/src/components/WhispurrApp.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old_desc = "Double tap this key to Launch WhisPURR"
new_desc = "Double tap this key to open or close WhisPURR"

content = content.replace(old_desc, new_desc)

with open("kivi-app/src/components/WhispurrApp.tsx", "w", encoding="utf-8") as f:
    f.write(content)
