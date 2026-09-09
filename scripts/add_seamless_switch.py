# -*- coding: utf-8 -*-
import re

with open("kivi-app/src/components/WhispurrApp.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add State
state_code = """  const [isSeamlessSwitchEnabled, setIsSeamlessSwitchEnabled] = useState(() => localStorage.getItem('whispurr_seamless_switch') !== 'false');"""

content = re.sub(
    r'(const \[isRecordingQuicklaunch, setIsRecordingQuicklaunch\] = useState\(false\);)',
    r'\1\n' + state_code,
    content
)


# 2. Add UI
old_ui = """                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xl font-bold text-white tracking-tight">Quicklaunch</span>
                        <span className="text-[15px] text-white/50">Double tap this key to open or close WhisPURR</span>
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

new_ui = """                    <div className="flex items-center justify-between pb-6 border-b border-white/5">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xl font-bold text-white tracking-tight">Quicklaunch</span>
                        <span className="text-[15px] text-white/50">Double tap this key to open or close WhisPURR</span>
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

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xl font-bold text-white tracking-tight">Seamless Switch</span>
                        <span className="text-[15px] text-white/50">Easily switch between contexts/modes without ever having to open the app</span>
                        <span className="text-xs text-orange-400 font-mono mt-1 uppercase tracking-widest">Shortcut: Arrow Up/Down & Mouse Scroll</span>
                      </div>
                      <button 
                        onClick={() => {
                          const next = !isSeamlessSwitchEnabled;
                          setIsSeamlessSwitchEnabled(next);
                          localStorage.setItem('whispurr_seamless_switch', String(next));
                        }}
                        className={`relative w-[68px] h-[36px] rounded-full transition-colors shadow-inner ${
                          isSeamlessSwitchEnabled ? 'bg-orange-500' : 'bg-white/10'
                        }`}
                      >
                        <div className={`absolute top-1 bottom-1 w-7 bg-white rounded-full transition-transform shadow-md ${
                          isSeamlessSwitchEnabled ? 'left-[36px]' : 'left-1'
                        }`} />
                      </button>
                    </div>
                  </div>"""

content = content.replace(old_ui, new_ui)

with open("kivi-app/src/components/WhispurrApp.tsx", "w", encoding="utf-8") as f:
    f.write(content)
