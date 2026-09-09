# -*- coding: utf-8 -*-
with open("kivi-app/src/components/MockOS.tsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
in_radial = False
replaced = False

for i, line in enumerate(lines):
    if "{/* NEW RADIAL KIVI CONTROL STRIP */}" in line and not replaced:
        in_radial = True
        new_lines.append(line)
        continue
        
    if in_radial:
        if "{openApp !== 'whispurr' && (" in line:
            new_lines.append(line)
            # Next line is the div to replace
            new_lines.append("""          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ 
              y: (isAltPressed || isLoading || !!activeText) ? -40 : 50, 
              opacity: (isAltPressed || isLoading || !!activeText) ? 1 : 0 
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={`absolute bottom-[-64px] left-1/2 -translate-x-1/2 z-[80] w-64 h-64 flex items-center justify-center rounded-full pointer-events-none`}
            onMouseLeave={() => { setIsHovered(false); setActivePopup(null); }}
          >\n""")
            # Now we need to skip the original div and its className and onMouseLeave
            # Original lines:
            #           <div 
            #             className={`absolute bottom-[-64px] left-1/2 -translate-x-1/2 z-[80] w-64 h-64 flex items-center 
            # justify-center rounded-full ${isHovered ? 'pointer-events-auto' : 'pointer-events-none'}`}
            #             onMouseLeave={() => { setIsHovered(false); setActivePopup(null); }}
            #           >
            continue
        elif "<div" in line and "className={`absolute bottom" in lines[i+1]:
            continue # skip <div
        elif "className={`absolute bottom" in line:
            continue # skip className
        elif "justify-center rounded-full ${isHovered" in line:
            continue # skip wrapped classname
        elif "onMouseLeave={" in line:
            continue # skip onMouseLeave
        elif "          >" in line:
            continue # skip closing bracket of div
            
        elif "className=\"relative w-32 h-32" in line:
            # Found the inner div!
            new_lines.append("""            <div 
              className={`relative w-32 h-32 flex items-center justify-center rounded-full ${(isAltPressed || isLoading || !!activeText) ? 'pointer-events-auto' : 'pointer-events-none'}`}
              onMouseEnter={() => setIsHovered(true)}
            >\n""")
            in_radial = False
            replaced = True
            continue
            
    new_lines.append(line)

# Now we must find where this block closes.
# Let's search from the end backwards for the two closing divs before "{/* FULL SCREEN APPS */}"
for i in range(len(new_lines)-1, -1, -1):
    if "{/* FULL SCREEN APPS */}" in new_lines[i]:
        # Look backwards for the closing div
        for j in range(i-1, -1, -1):
            if "</div>" in new_lines[j]:
                # We need to replace the SECOND to last </div> with </motion.div>
                # Let's see:
                #             </div>
                #           </div>
                #         )}
                #         {/* FULL SCREEN APPS */}
                if "</div>" in new_lines[j-1]:
                    new_lines[j] = new_lines[j].replace("</div>", "</motion.div>")
                    break
        break

with open("kivi-app/src/components/MockOS.tsx", "w", encoding="utf-8") as f:
    f.writelines(new_lines)
