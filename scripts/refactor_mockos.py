# -*- coding: utf-8 -*-
import re

with open("kivi-app/src/components/MockOS.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Import KiviCatIcon
if "import KiviCatIcon" not in content:
    content = content.replace(
        "import WhispurrApp from './WhispurrApp';",
        "import WhispurrApp from './WhispurrApp';\nimport KiviCatIcon from './KiviCatIcon';"
    )

# 2. Replace CurrentAppIcon Whispurr
content = content.replace(
    "if (openApp === 'whispurr') return <Cat className=\"w-4 h-4 text-orange-400\" />;",
    "if (openApp === 'whispurr') return <KiviCatIcon className=\"w-4 h-4 text-orange-400\" />;"
)

# 3. Replace Pinned App Cat
content = content.replace(
    "<Cat className=\"w-5 h-5 text-orange-400\" />\n                          <span className=\"font-medium text-sm\">WhisPURR Settings</span>",
    "<KiviCatIcon className=\"w-5 h-5 text-orange-400\" />\n                          <span className=\"font-medium text-sm\">WhisPURR Settings</span>"
)

# 4. Replace Taskbar Cat
content = content.replace(
    "className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${(openApp as string) === 'whispurr' ? 'bg-white/10 border-b-2 border-orange-400' : 'hover:bg-white/10'}`}\n              >\n                 <Cat className=\"w-5 h-5 text-orange-400\" />\n              </div>",
    "className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${(openApp as string) === 'whispurr' ? 'bg-white/10 border-b-2 border-orange-400' : 'hover:bg-white/10'}`}\n              >\n                 <KiviCatIcon className=\"w-5 h-5 text-orange-400\" />\n              </div>"
)

# 5. Move Floating Context UI to center
content = content.replace(
    "className=\"absolute bottom-16 left-1/2 -translate-x-1/2 w-[320px] glass-panel p-4 flex flex-col gap-3 z-20 shadow-2xl border border-orange-500/30 rounded-2xl\"",
    "className=\"absolute top-1/2 -translate-y-[120px] left-1/2 -translate-x-1/2 w-[320px] glass-panel p-4 flex flex-col gap-3 z-20 shadow-2xl border border-orange-500/30 rounded-2xl\""
)

# 6. Make the Radial Menu wrapper popup in the center
old_radial = """        {openApp !== 'whispurr' && (
          <div 
            className={`absolute bottom-[-64px] left-1/2 -translate-x-1/2 z-[80] w-64 h-64 flex items-center justify-center rounded-full ${isHovered ? 'pointer-events-auto' : 'pointer-events-none'}`}
            onMouseLeave={() => { setIsHovered(false); setActivePopup(null); }}
          >
            <div 
              className="relative w-32 h-32 flex items-center justify-center rounded-full pointer-events-auto"
              onMouseEnter={() => setIsHovered(true)}
            >"""
            
new_radial = """        {openApp !== 'whispurr' && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: (isAltPressed || isLoading || !!activeText) ? 1 : 0.9, 
              opacity: (isAltPressed || isLoading || !!activeText) ? 1 : 0 
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[80] w-64 h-64 flex items-center justify-center rounded-full pointer-events-none`}
            onMouseLeave={() => { setIsHovered(false); setActivePopup(null); }}
          >
            <div 
              className={`relative w-32 h-32 flex items-center justify-center rounded-full ${(isAltPressed || isLoading || !!activeText) ? 'pointer-events-auto' : 'pointer-events-none'}`}
              onMouseEnter={() => setIsHovered(true)}
            >"""

content = content.replace(old_radial, new_radial)

# 7. Update the Central Cat icon
old_cat_btn = """            {/* Central Cat */}
            <div 
              onClick={(e) => { 
                if (e.detail === 1 && toggleListening) toggleListening(); 
                if (e.detail === 2) setOpenApp('whispurr'); 
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 shadow-2xl relative z-10 ${
                isAltPressed || isLoading 
                  ? 'bg-black/90 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-110'
                  : 'bg-gradient-to-br from-[#2a2a2a] to-[#111] hover:from-[#333] hover:to-[#1a1a1a] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
              }`}
            >
              <Cat className={`text-gray-300 transition-all duration-500 ${
                isLoading ? 'w-4 h-4 animate-pulse text-white' : (isAltPressed ? 'w-4 h-4 text-white' : 'w-4 h-4 opacity-80')
              }`} />
            </div>"""

new_cat_btn = """            {/* Central Cat */}
            <div 
              onClick={(e) => { 
                if (e.detail === 1 && toggleListening) toggleListening(); 
                if (e.detail === 2) setOpenApp(prev => prev === 'whispurr' ? null : 'whispurr'); 
              }}
              className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 shadow-2xl relative z-10 overflow-hidden border-2 ${
                isAltPressed || isLoading 
                  ? 'border-[#8d6e63] shadow-[0_0_30px_rgba(141,110,99,0.5)] scale-110'
                  : 'border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)]'
              }`}
            >
              <KiviCatIcon className={`w-full h-full object-cover transition-all duration-500 ${
                isLoading ? 'animate-pulse opacity-100' : (isAltPressed ? 'opacity-100' : 'opacity-80 hover:opacity-100')
              }`} />
            </div>"""
            
content = content.replace(old_cat_btn, new_cat_btn)

# 8. Replace the closing div with motion.div
old_close = """                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* FULL SCREEN APPS */}"""

new_close = """                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* FULL SCREEN APPS */}"""

content = content.replace(old_close, new_close)

with open("kivi-app/src/components/MockOS.tsx", "w", encoding="utf-8") as f:
    f.write(content)
