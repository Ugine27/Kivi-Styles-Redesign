# -*- coding: utf-8 -*-
with open("kivi-app/src/components/MockOS.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace opening div
content = content.replace(
    "className={`absolute bottom-[-64px] left-1/2 -translate-x-1/2 z-[80] w-64 h-64 flex items-center justify-center rounded-full ${isHovered ? 'pointer-events-auto' : 'pointer-events-none'}`}",
    "initial={{ y: 50, opacity: 0 }}\n            animate={{ y: (isAltPressed || isLoading || !!activeText) ? -40 : 50, opacity: (isAltPressed || isLoading || !!activeText) ? 1 : 0 }}\n            transition={{ type: 'spring', stiffness: 350, damping: 25 }}\n            className={`absolute bottom-[-64px] left-1/2 -translate-x-1/2 z-[80] w-64 h-64 flex items-center justify-center rounded-full pointer-events-none`}"
)

# Replace <div to <motion.div for that specific one. It's the one right after {openApp !== 'whispurr' && (
content = content.replace(
    "{openApp !== 'whispurr' && (\n          <div \n            initial={{ y: 50, opacity: 0 }}",
    "{openApp !== 'whispurr' && (\n          <motion.div \n            initial={{ y: 50, opacity: 0 }}"
)

# And replace the closing div. The structure is:
#         {openApp !== 'whispurr' && (
#           <motion.div ...
#             ...
#           </motion.div>
#         )}
# We'll just regex substitute the closing div before "        )}".
import re
content = re.sub(
    r'</div>\n        \)\}',
    r'</motion.div>\n        )}',
    content,
    count=1 # only replace the first occurrence which should be the right one? 
)

# Wait, let's just make sure we replace the right one.
# I will do it carefully.
