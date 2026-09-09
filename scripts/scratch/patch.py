import re

with open('kivi-app/src/components/WhispurrApp.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

with open('scratch/WhispurrApp-pr.txt', 'r', encoding='utf-8') as f:
    pr_content = f.read()

# Extract Home Chat state and logic
home_logic_match = re.search(r'(  // Home Voice-to-Text Chat Box State.*?)(  // Dictionary State)', pr_content, re.DOTALL)
if not home_logic_match:
    print("Could not find home logic")
    exit(1)
home_logic = home_logic_match.group(1)

# Inject into WhispurrApp.tsx
content = content.replace('  // Dictionary State', home_logic + '  // Dictionary State')

# Extract Home Chat UI
ui_match = re.search(r'(                  {/\* Voice-to-Text Chat Box \*/}.*?)(                <div className={`w-\[320px\] \${glassPanel})', pr_content, re.DOTALL)
if not ui_match:
    print("Could not find UI")
    exit(1)
ui = ui_match.group(1)

# Replace the Grid inside Home Tab with the UI
content = re.sub(r'                  <div className="grid grid-cols-2 gap-6">.*?                  </div>\n', lambda m: ui, content, flags=re.DOTALL)

with open('kivi-app/src/components/WhispurrApp.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patched WhispurrApp.tsx successfully.")
