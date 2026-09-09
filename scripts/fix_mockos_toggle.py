# -*- coding: utf-8 -*-
with open("kivi-app/src/components/MockOS.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# First revert all of them back
content = content.replace("setOpenApp(prev => prev === 'whispurr' ? null : 'whispurr');", "setOpenApp('whispurr');")

# Now specifically find the double tap block and replace it
double_tap_block_old = """      if (key === savedShortcut) {
        const now = Date.now();
        if (now - lastTap < 400) {
          // Double tap detected!
          setOpenApp('whispurr');
          lastTap = 0;"""

double_tap_block_new = """      if (key === savedShortcut) {
        const now = Date.now();
        if (now - lastTap < 400) {
          // Double tap detected!
          setOpenApp(prev => prev === 'whispurr' ? null : 'whispurr');
          lastTap = 0;"""

content = content.replace(double_tap_block_old, double_tap_block_new)

with open("kivi-app/src/components/MockOS.tsx", "w", encoding="utf-8") as f:
    f.write(content)
