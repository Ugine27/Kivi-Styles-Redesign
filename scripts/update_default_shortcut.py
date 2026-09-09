# -*- coding: utf-8 -*-
with open("kivi-app/src/components/WhispurrApp.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    "const [quicklaunchShortcut, setQuicklaunchShortcut] = useState(() => localStorage.getItem('whispurr_quicklaunch') || 'Alt');",
    "const [quicklaunchShortcut, setQuicklaunchShortcut] = useState(() => localStorage.getItem('whispurr_quicklaunch') || 'Ctrl');"
)

with open("kivi-app/src/components/WhispurrApp.tsx", "w", encoding="utf-8") as f:
    f.write(content)

with open("kivi-app/src/components/MockOS.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    "const savedShortcut = localStorage.getItem('whispurr_quicklaunch') || 'Alt';",
    "const savedShortcut = localStorage.getItem('whispurr_quicklaunch') || 'Ctrl';"
)

with open("kivi-app/src/components/MockOS.tsx", "w", encoding="utf-8") as f:
    f.write(content)
