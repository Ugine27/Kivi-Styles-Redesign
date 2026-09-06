# -*- coding: utf-8 -*-
import re

with open("kivi-app/src/components/MockOS.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add the double tap useEffect inside MockOS
double_tap_code = """
  // Global Double Tap logic for Quicklaunch
  useEffect(() => {
    let lastTap = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      const savedShortcut = localStorage.getItem('whispurr_quicklaunch') || 'Alt';
      let key = e.key;
      if (key === ' ') key = 'Space';
      else if (key === 'Control') key = 'Ctrl';
      else if (key === 'Meta') key = 'Cmd';
      if (key.length === 1) key = key.toUpperCase();

      if (key === savedShortcut) {
        const now = Date.now();
        if (now - lastTap < 400) {
          // Double tap detected!
          setOpenApp('whispurr');
          lastTap = 0;
        } else {
          lastTap = now;
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
"""

content = re.sub(
    r'(const \[isHovered, setIsHovered\] = useState\(false\);)',
    r'\1\n' + double_tap_code,
    content
)

with open("kivi-app/src/components/MockOS.tsx", "w", encoding="utf-8") as f:
    f.write(content)
