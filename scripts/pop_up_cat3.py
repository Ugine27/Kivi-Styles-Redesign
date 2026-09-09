# -*- coding: utf-8 -*-
import re

with open("kivi-app/src/components/MockOS.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# We want to replace the div after "NEW RADIAL KIVI CONTROL STRIP" and before "onMouseLeave"
old_block_pattern = r"\{openApp !== 'whispurr' && \(\s*<div\s+className=\{`absolute bottom-\[-64px\] left-1/2 -translate-x-1/2 z-\[80\] w-64 h-64 flex items-center[\s\S]*?`\}\s*onMouseLeave=\{[^\}]+\}\s*>\s*<div\s+className=.\"relative w-32 h-32 flex items-center justify-center rounded-full pointer-events-auto.\"\s*onMouseEnter=\{[^\}]+\}\s*>"

new_block = """{openApp !== 'whispurr' && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ 
              y: (isAltPressed || isLoading || !!activeText) ? -40 : 50, 
              opacity: (isAltPressed || isLoading || !!activeText) ? 1 : 0 
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={`absolute bottom-[-64px] left-1/2 -translate-x-1/2 z-[80] w-64 h-64 flex items-center justify-center rounded-full pointer-events-none`}
            onMouseLeave={() => { setIsHovered(false); setActivePopup(null); }}
          >
            <div 
              className={`relative w-32 h-32 flex items-center justify-center rounded-full ${(isAltPressed || isLoading || !!activeText) ? 'pointer-events-auto' : 'pointer-events-none'}`}
              onMouseEnter={() => setIsHovered(true)}
            >"""

content = re.sub(old_block_pattern, new_block, content)

# Now we need to replace the closing </div> of that block with </motion.div>.
# Let's see what the structure is. It ends with:
#                 {openApp === 'whispurr' && <WhispurrApp mode={mode} setMode={setMode} />}
#               </div>
#             </div> (Wait, what is the closing tag structure?)

