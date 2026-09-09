# -*- coding: utf-8 -*-
with open("kivi-app/src/components/MockOS.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Fix the Radial Menu wrapper
old_radial = """        {openApp !== 'whispurr' && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: "50%" }}
            animate={{ 
              scale: (isAltPressed || isLoading || !!activeText) ? 1 : 0.9, 
              opacity: (isAltPressed || isLoading || !!activeText) ? 1 : 0,
              y: "50%"
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={`absolute bottom-[24px] left-1/2 -translate-x-1/2 z-[80] w-64 h-64 flex items-center justify-center rounded-full pointer-events-none`}"""

new_radial = """        {openApp !== 'whispurr' && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ 
              scale: (isAltPressed || isLoading || !!activeText) ? 1 : 0.9, 
              opacity: (isAltPressed || isLoading || !!activeText) ? 1 : 0,
              y: (isAltPressed || isLoading || !!activeText) ? 0 : 10
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={`absolute bottom-[64px] left-1/2 -translate-x-1/2 z-[80] w-64 h-64 flex items-center justify-center rounded-full pointer-events-none`}"""

content = content.replace(old_radial, new_radial)

# Fix the text bubble
old_bubble = "className=\"absolute bottom-[100px] left-1/2 -translate-x-1/2 w-[320px] glass-panel p-4 flex flex-col gap-3 z-[90] shadow-2xl border border-orange-500/30 rounded-2xl\""
new_bubble = "className=\"absolute bottom-[330px] left-1/2 -translate-x-1/2 w-[320px] glass-panel p-4 flex flex-col gap-3 z-[90] shadow-2xl border border-orange-500/30 rounded-2xl\""

content = content.replace(old_bubble, new_bubble)

with open("kivi-app/src/components/MockOS.tsx", "w", encoding="utf-8") as f:
    f.write(content)
