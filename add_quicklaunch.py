# -*- coding: utf-8 -*-
import re

with open("kivi-app/src/components/WhispurrApp.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add state for quicklaunch
state_code = """  const [talkShortcut, setTalkShortcut] = useState('Fn');
  const [isRecordingShortcut, setIsRecordingShortcut] = useState(false);
  const [quicklaunchShortcut, setQuicklaunchShortcut] = useState(() => localStorage.getItem('whispurr_quicklaunch') || 'Alt');
  const [isRecordingQuicklaunch, setIsRecordingQuicklaunch] = useState(false);

  useEffect(() => {
    if (isRecordingShortcut) {
      const handleKeyDown = (e: KeyboardEvent) => {
        e.preventDefault();
        e.stopPropagation();
        let key = e.key;
        if (key === ' ') key = 'Space';
        else if (key === 'Control') key = 'Ctrl';
        else if (key === 'Meta') key = 'Cmd';
        if (key.length === 1) key = key.toUpperCase();
        setTalkShortcut(key);
        setIsRecordingShortcut(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isRecordingShortcut]);

  useEffect(() => {
    if (isRecordingQuicklaunch) {
      const handleKeyDown = (e: KeyboardEvent) => {
        e.preventDefault();
        e.stopPropagation();
        let key = e.key;
        if (key === ' ') key = 'Space';
        else if (key === 'Control') key = 'Ctrl';
        else if (key === 'Meta') key = 'Cmd';
        if (key.length === 1) key = key.toUpperCase();
        setQuicklaunchShortcut(key);
        localStorage.setItem('whispurr_quicklaunch', key);
        setIsRecordingQuicklaunch(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isRecordingQuicklaunch]);
"""

old_state = """  const [talkShortcut, setTalkShortcut] = useState('Fn');
  const [isRecordingShortcut, setIsRecordingShortcut] = useState(false);

  useEffect(() => {
    if (isRecordingShortcut) {
      const handleKeyDown = (e: KeyboardEvent) => {
        e.preventDefault();
        e.stopPropagation();
        let key = e.key;
        if (key === ' ') key = 'Space';
        else if (key === 'Control') key = 'Ctrl';
        else if (key === 'Meta') key = 'Cmd';
        
        // Capitalize single letters or format others
        if (key.length === 1) key = key.toUpperCase();
        
        setTalkShortcut(key);
        setIsRecordingShortcut(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isRecordingShortcut]);"""

content = content.replace(old_state, state_code)


# 2. Add UI for quicklaunch
old_ui = """                  <div className={`mt-4 ${glassPanel} p-8`}>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xl font-bold text-white tracking-tight">Talk to WhisPURR</span>
                        <span className="text-[15px] text-white/50">Hold this key to transcribe your words into text</span>
                      </div>
                      <button 
                        onClick={() => setIsRecordingShortcut(true)}
                        className={`min-w-[120px] px-6 py-4 rounded-xl border-2 font-mono text-base tracking-wider font-bold transition-all shadow-md ${
                          isRecordingShortcut 
                            ? 'bg-orange-500/20 text-orange-400 border-orange-500 animate-pulse' 
                            : 'bg-[#1a1a1a] text-white/80 border-white/10 hover:border-orange-500/50 hover:bg-[#222]'
                        }`}
                      >
                        {isRecordingShortcut ? 'Press a key...' : talkShortcut}
                      </button>
                    </div>
                  </div>"""

new_ui = """                  <div className={`mt-4 ${glassPanel} p-8 flex flex-col gap-6`}>
                    <div className="flex items-center justify-between pb-6 border-b border-white/5">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xl font-bold text-white tracking-tight">Talk to WhisPURR</span>
                        <span className="text-[15px] text-white/50">Hold this key to transcribe your words into text</span>
                      </div>
                      <button 
                        onClick={() => setIsRecordingShortcut(true)}
                        className={`min-w-[120px] px-6 py-4 rounded-xl border-2 font-mono text-base tracking-wider font-bold transition-all shadow-md ${
                          isRecordingShortcut 
                            ? 'bg-orange-500/20 text-orange-400 border-orange-500 animate-pulse' 
                            : 'bg-[#1a1a1a] text-white/80 border-white/10 hover:border-orange-500/50 hover:bg-[#222]'
                        }`}
                      >
                        {isRecordingShortcut ? 'Press a key...' : talkShortcut}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xl font-bold text-white tracking-tight">Quicklaunch</span>
                        <span className="text-[15px] text-white/50">Double tap this key to Launch WhisPURR</span>
                      </div>
                      <button 
                        onClick={() => setIsRecordingQuicklaunch(true)}
                        className={`min-w-[120px] px-6 py-4 rounded-xl border-2 font-mono text-base tracking-wider font-bold transition-all shadow-md ${
                          isRecordingQuicklaunch 
                            ? 'bg-orange-500/20 text-orange-400 border-orange-500 animate-pulse' 
                            : 'bg-[#1a1a1a] text-white/80 border-white/10 hover:border-orange-500/50 hover:bg-[#222]'
                        }`}
                      >
                        {isRecordingQuicklaunch ? 'Press a key...' : quicklaunchShortcut}
                      </button>
                    </div>
                  </div>"""

content = content.replace(old_ui, new_ui)

with open("kivi-app/src/components/WhispurrApp.tsx", "w", encoding="utf-8") as f:
    f.write(content)
