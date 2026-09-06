# -*- coding: utf-8 -*-
with open("kivi-app/src/components/MockOS.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old_wrapper = """        {openApp !== 'whispurr' && (
          <div 
            className={`absolute bottom-[-64px] left-1/2 -translate-x-1/2 z-[80] w-64 h-64 flex items-center justify-center rounded-full ${isHovered ? 'pointer-events-auto' : 'pointer-events-none'}`}
            onMouseLeave={() => { setIsHovered(false); setActivePopup(null); }}
          >
            <div 
              className="relative w-32 h-32 flex items-center justify-center rounded-full pointer-events-auto"
              onMouseEnter={() => setIsHovered(true)}
            >"""

new_wrapper = """        {openApp !== 'whispurr' && (
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

content = content.replace(old_wrapper, new_wrapper)

with open("kivi-app/src/components/MockOS.tsx", "w", encoding="utf-8") as f:
    f.write(content)
