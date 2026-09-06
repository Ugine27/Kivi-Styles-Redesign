# -*- coding: utf-8 -*-
import re

with open("kivi-app/src/useKiviInput.ts", "r", encoding="utf-8") as f:
    content = f.read()

seamless_logic = """
  // Handle Seamless Switch (Alt + Arrow / Scroll)
  useEffect(() => {
    if (!isAltPressed) return;
    
    const seamlessEnabled = localStorage.getItem('whispurr_seamless_switch') !== 'false';
    if (!seamlessEnabled) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setModeState(prev => {
        const idx = MODES.indexOf(prev as Mode);
        if (idx === -1) return MODES[0];
        let next = prev;
        if (e.deltaY > 0) next = MODES[(idx + 1) % MODES.length];
        else next = MODES[(idx - 1 + MODES.length) % MODES.length];
        localStorage.setItem('whispurr_mode', next);
        return next;
      });
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setModeState(prev => {
          const idx = MODES.indexOf(prev as Mode);
          if (idx === -1) return MODES[0];
          const next = MODES[(idx - 1 + MODES.length) % MODES.length];
          localStorage.setItem('whispurr_mode', next);
          return next;
        });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setModeState(prev => {
          const idx = MODES.indexOf(prev as Mode);
          if (idx === -1) return MODES[0];
          const next = MODES[(idx + 1) % MODES.length];
          localStorage.setItem('whispurr_mode', next);
          return next;
        });
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAltPressed]);
"""

content = re.sub(
    r'(const handleKeyUp = \(e: KeyboardEvent\) => \{[^\}]+\};)',
    r'\1\n' + seamless_logic,
    content
)

with open("kivi-app/src/useKiviInput.ts", "w", encoding="utf-8") as f:
    f.write(content)
