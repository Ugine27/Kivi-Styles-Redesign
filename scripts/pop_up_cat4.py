# -*- coding: utf-8 -*-
with open("kivi-app/src/components/MockOS.tsx", "r", encoding="utf-8") as f:
    content = f.read()

start_idx = content.find("{/* NEW RADIAL KIVI CONTROL STRIP */}")
end_idx = content.find("{/* Subtle Hover Glow Backdrop */}")

if start_idx != -1 and end_idx != -1:
    old_str = content[start_idx:end_idx]
    
    new_str = """{/* NEW RADIAL KIVI CONTROL STRIP */}
        {openApp !== 'whispurr' && (
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
            >
              """
    content = content.replace(old_str, new_str)
    
    # Now fix closing tags. The structure is 2 closing divs after openApp === 'whispurr' check.
    # Let's find the end of this block.
    # It ends with:
    #                   </div>
    #                 )}
    #   
    #                 {openApp === 'whispurr' && <WhispurrApp mode={mode} setMode={setMode} />}
    #               </div>
    #             </div>
    #           )}
    #         </AnimatePresence>
    #       </div>
    #     );
    #   });
    # wait, openApp === 'whispurr' is handled OUTSIDE the radial menu! The radial menu ends MUCH earlier!
    # Let's check where the radial menu ends.
    
    with open("kivi-app/src/components/MockOS.tsx", "w", encoding="utf-8") as f:
        f.write(content)
