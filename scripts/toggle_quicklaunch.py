# -*- coding: utf-8 -*-
with open("kivi-app/src/components/MockOS.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old_logic = "setOpenApp('whispurr');"
new_logic = "setOpenApp(prev => prev === 'whispurr' ? null : 'whispurr');"

content = content.replace(old_logic, new_logic)

with open("kivi-app/src/components/MockOS.tsx", "w", encoding="utf-8") as f:
    f.write(content)
