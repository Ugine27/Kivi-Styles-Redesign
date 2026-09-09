# -*- coding: utf-8 -*-
import re

# 1. Update WhispurrApp.tsx
with open("kivi-app/src/components/WhispurrApp.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    "const [talkShortcut, setTalkShortcut] = useState('Fn');",
    "const [talkShortcut, setTalkShortcut] = useState(() => localStorage.getItem('whispurr_talk') || 'Alt');"
)

content = content.replace(
    "setTalkShortcut(key);",
    "setTalkShortcut(key);\n        localStorage.setItem('whispurr_talk', key);"
)

with open("kivi-app/src/components/WhispurrApp.tsx", "w", encoding="utf-8") as f:
    f.write(content)

# 2. Update useKiviInput.ts
with open("kivi-app/src/useKiviInput.ts", "r", encoding="utf-8") as f:
    input_content = f.read()

old_key_logic = """  // Handle Alt key down/up
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Alt' && !e.repeat) {
        setIsAltPressed(true);
        setTranscript('');
        setTranslatedText('');
        try {
          recognitionRef.current?.start();
        } catch (err) {
          // Already started
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Alt') {
        setIsAltPressed(false);
        try {
          recognitionRef.current?.stop();
        } catch (err) {
          // Already stopped
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);"""

new_key_logic = """  // Handle Talk key down/up
  useEffect(() => {
    const formatKey = (eKey: string) => {
      let key = eKey;
      if (key === ' ') key = 'Space';
      else if (key === 'Control') key = 'Ctrl';
      else if (key === 'Meta') key = 'Cmd';
      if (key.length === 1) key = key.toUpperCase();
      return key;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const savedShortcut = localStorage.getItem('whispurr_talk') || 'Alt';
      if (formatKey(e.key) === savedShortcut && !e.repeat) {
        setIsAltPressed(true);
        setTranscript('');
        setTranslatedText('');
        try {
          recognitionRef.current?.start();
        } catch (err) {
          // Already started
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const savedShortcut = localStorage.getItem('whispurr_talk') || 'Alt';
      if (formatKey(e.key) === savedShortcut) {
        setIsAltPressed(false);
        try {
          recognitionRef.current?.stop();
        } catch (err) {
          // Already stopped
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);"""

if old_key_logic in input_content:
    input_content = input_content.replace(old_key_logic, new_key_logic)
else:
    # Use regex if exact match fails
    input_content = re.sub(
        r'// Handle Alt key down/up.*?\}, \[\]\);',
        new_key_logic,
        input_content,
        flags=re.DOTALL
    )

with open("kivi-app/src/useKiviInput.ts", "w", encoding="utf-8") as f:
    f.write(input_content)

