# -*- coding: utf-8 -*-
import re

with open("kivi-app/src/components/WhispurrApp.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Import Keyboard
content = content.replace(
    "import { PanelLeftClose", 
    "import { PanelLeftClose, Keyboard"
)

# 2. Add State
state_code = """  const [talkShortcut, setTalkShortcut] = useState('Fn');
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
  }, [isRecordingShortcut]);
"""

content = re.sub(
    r'(const \[showTutorial, setShowTutorial\] = useState[^;]+;)',
    r'\1\n' + state_code,
    content
)

# 3. Add to Secondary Settings Sidebar
content = content.replace(
    "{ name: 'Settings', icon: Settings },",
    "{ name: 'Settings', icon: Settings },\n                  { name: 'Shortcuts', icon: Keyboard },"
)

# 4. Add Tab Content
shortcuts_tab_code = """            {activeTab === 'Shortcuts' && (
              <motion.div key="shortcuts" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-4 flex gap-4">
                <div className="flex-1 flex flex-col gap-6 max-w-4xl mx-auto">
                  <div className="px-2 mt-4">
                    <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Keyboard Shortcuts</h1>
                    <p className="text-white/50 text-sm">Customize how you interact with WhisPURR via your keyboard.</p>
                  </div>
                  
                  <div className={`mt-4 ${glassPanel} p-8`}>
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
                  </div>
                </div>
              </motion.div>
            )}
"""

content = content.replace(
    "{activeTab === 'Theme' && (",
    shortcuts_tab_code + "\n            {activeTab === 'Theme' && ("
)


with open("kivi-app/src/components/WhispurrApp.tsx", "w", encoding="utf-8") as f:
    f.write(content)
