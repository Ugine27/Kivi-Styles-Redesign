# -*- coding: utf-8 -*-
with open("kivi-app/src/components/WhispurrApp.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Fix onComplete
old_oncomplete = "<Tutorial onComplete={() => setShowTutorial(false)} />"
new_oncomplete = "<Tutorial onComplete={() => { setShowTutorial(false); setIsTourActive(true); }} />"
content = content.replace(old_oncomplete, new_oncomplete)

# 2. Fix getSidebarItemClass unused variable
old_func = """  const getSidebarItemClass = (id: string, baseClass: string, isActive: boolean) => {
    let classes = baseClass;
    if (isTourActive) {
      if (currentTourId === id) {
        classes += ' ring-2 ring-orange-500 ring-offset-4 ring-offset-[#0f0f0f] relative z-[9999] bg-[#1a1a1a] scale-105 shadow-xl opacity-100';
      } else {
        classes += ' opacity-20 pointer-events-none grayscale blur-[1px]';
      }
    }
    return classes;
  };"""

new_func = """  const getSidebarItemClass = (id: string, baseClass: string) => {
    let classes = baseClass;
    if (isTourActive) {
      if (currentTourId === id) {
        classes += ' ring-2 ring-orange-500 ring-offset-4 ring-offset-[#0f0f0f] relative z-[9999] bg-[#1a1a1a] scale-105 shadow-xl opacity-100';
      } else {
        classes += ' opacity-20 pointer-events-none grayscale blur-[1px]';
      }
    }
    return classes;
  };"""
content = content.replace(old_func, new_func)

# Fix the function calls in classNames
content = content.replace(", activeTab === 'Home')", ")")
content = content.replace(", activeTab === 'History')", ")")
content = content.replace(", activeTab === tab.name)", ")")
content = content.replace(", isSettingsOpen)", ")")
content = content.replace(", showCatFactPopup)", ")")

# 3. Inject Overlay
overlay_code = """      <AnimatePresence>
        {isTourActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[1000] bg-black/60 backdrop-blur-md flex items-center justify-center p-12"
          >
            <div className="bg-[#1e1e1e] border border-orange-500/30 p-10 rounded-3xl shadow-2xl max-w-lg w-full relative">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg text-black font-bold text-xl">
                {tourStep + 1}
              </div>
              <h2 className="text-4xl font-serif text-orange-400 mb-4">{tourSteps[tourStep].title}</h2>
              <p className="text-white/80 text-xl mb-10 leading-relaxed font-serif italic">{tourSteps[tourStep].text}</p>
              <div className="flex justify-between items-center">
                <button onClick={() => setIsTourActive(false)} className="text-white/40 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">Skip Tour</button>
                <button onClick={() => {
                  if (tourStep < tourSteps.length - 1) {
                    setTourStep(s => s + 1);
                    // Open Profile / CatFact specifically if we hit those steps, else set tab
                    const nextId = tourSteps[tourStep + 1].id;
                    if (nextId === 'Profile') {
                      setIsSettingsOpen(true);
                      setShowCatFactPopup(false);
                    } else if (nextId === 'CatFacts') {
                      setIsSettingsOpen(false);
                      setShowCatFactPopup(true);
                    } else {
                      setIsSettingsOpen(false);
                      setShowCatFactPopup(false);
                      setActiveTab(nextId);
                    }
                  } else {
                    setIsTourActive(false);
                    setIsSettingsOpen(false);
                    setShowCatFactPopup(false);
                    setActiveTab('Home');
                  }
                }} className="px-8 py-3 bg-orange-500 text-black font-bold rounded-xl hover:bg-orange-400 transition-colors shadow-lg">
                  {tourStep < tourSteps.length - 1 ? 'Next' : 'Finish'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
"""

old_main_area = """      {/* Main Content Area */}

      <div className="flex-1 flex flex-col overflow-hidden relative pt-10">"""
new_main_area = old_main_area + "\n" + overlay_code
content = content.replace(old_main_area, new_main_area)

with open("kivi-app/src/components/WhispurrApp.tsx", "w", encoding="utf-8") as f:
    f.write(content)
