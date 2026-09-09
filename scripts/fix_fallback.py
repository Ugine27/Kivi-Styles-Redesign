# -*- coding: utf-8 -*-
with open("kivi-app/src/components/WhispurrApp.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old_str = "!['Home', 'History', 'Dictionary', 'ShortHand', 'ScratchPad', 'Context', 'Theme', 'Tutorial'].includes(activeTab)"
new_str = "!['Home', 'History', 'Dictionary', 'ShortHand', 'ScratchPad', 'Context', 'Theme', 'Tutorial', 'Shortcuts'].includes(activeTab)"

content = content.replace(old_str, new_str)

with open("kivi-app/src/components/WhispurrApp.tsx", "w", encoding="utf-8") as f:
    f.write(content)
