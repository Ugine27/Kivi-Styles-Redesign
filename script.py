with open(r'C:\Users\ragha\Kivi Styles Redesign\kivi-app\src\components\WhispurrApp.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

target = """  const [quicklaunchShortcut, setQuicklaunchShortcut] = useState(() => localStorage.getItem('whispurr_quicklaunch') || 'Ctrl');
  const [isRecordingQuicklaunch, setIsRecordingQuicklaunch] = useState(false);
  const [isSeamlessSwitchEnabled, setIsSeamlessSwitchEnabled] = useState(() => localStorage.getItem('whispurr_seamless_switch') !== 'false');"""

replacement = """  const [quicklaunchShortcut, setQuicklaunchShortcut] = useState(() => localStorage.getItem('whispurr_quicklaunch') || 'Ctrl');
  const [isRecordingQuicklaunch, setIsRecordingQuicklaunch] = useState(false);
  const [quickEditShortcut, setQuickEditShortcut] = useState(() => localStorage.getItem('whispurr_quickedit') || 'Alt + Ctrl');
  const [isRecordingQuickEdit, setIsRecordingQuickEdit] = useState(false);
  const [isSeamlessSwitchEnabled, setIsSeamlessSwitchEnabled] = useState(() => localStorage.getItem('whispurr_seamless_switch') !== 'false');"""

code = code.replace(target, replacement)

target2 = """  }, [isRecordingQuicklaunch]);"""
replacement2 = """  }, [isRecordingQuicklaunch]);

  useEffect(() => {
    if (isRecordingQuickEdit) {
      const handleKeyDown = (e: KeyboardEvent) => {
        e.preventDefault();
        e.stopPropagation();
        let key = e.key;
        if (key === ' ') key = 'Space';
        else if (key === 'Control') key = 'Ctrl';
        else if (key === 'Meta') key = 'Cmd';
        if (key.length === 1) key = key.toUpperCase();
        
        let combo = [];
        if (e.ctrlKey && key !== 'Ctrl') combo.push('Ctrl');
        if (e.altKey && key !== 'Alt') combo.push('Alt');
        if (e.shiftKey && key !== 'Shift') combo.push('Shift');
        combo.push(key);
        
        const finalKey = combo.join(' + ');
        setQuickEditShortcut(finalKey);
        localStorage.setItem('whispurr_quickedit', finalKey);
        setIsRecordingQuickEdit(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isRecordingQuickEdit]);"""

code = code.replace(target2, replacement2)

with open(r'C:\Users\ragha\Kivi Styles Redesign\kivi-app\src\components\WhispurrApp.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
