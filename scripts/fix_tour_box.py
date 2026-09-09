# -*- coding: utf-8 -*-
with open("kivi-app/src/components/WhispurrApp.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old_box = """            <div className="bg-[#1e1e1e] border border-orange-500/30 p-10 rounded-3xl shadow-2xl max-w-lg w-full relative">
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
            </div>"""

new_box = """            <div className="bg-[#f4ece1] border-4 border-[#8d6e63] p-10 rounded-[2rem] shadow-[0_0_80px_rgba(0,0,0,0.8)] max-w-lg w-full relative">
              <div className="absolute -top-6 -left-6 w-14 h-14 bg-[#8d6e63] rounded-full flex items-center justify-center shadow-lg text-[#f4ece1] font-bold text-2xl border-4 border-[#f4ece1]">
                {tourStep + 1}
              </div>
              <h2 className="text-4xl font-serif font-bold text-[#3e2723] mb-4 tracking-tight">{tourSteps[tourStep].title}</h2>
              <p className="text-[#3e2723]/80 text-xl mb-10 leading-relaxed font-sans">{tourSteps[tourStep].text}</p>
              <div className="flex justify-between items-center">
                <button onClick={() => setIsTourActive(false)} className="text-[#3e2723]/40 hover:text-[#3e2723] transition-colors uppercase tracking-widest text-sm font-bold border-b-2 border-transparent hover:border-[#8d6e63] pb-1">Skip Tour</button>
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
                }} className="px-8 py-4 bg-[#3e2723] text-[#f4ece1] font-bold rounded-2xl hover:bg-[#5d4037] transition-all shadow-xl hover:shadow-2xl hover:scale-105 text-lg">
                  {tourStep < tourSteps.length - 1 ? 'Next' : 'Finish'}
                </button>
              </div>
            </div>"""

content = content.replace(old_box, new_box)

with open("kivi-app/src/components/WhispurrApp.tsx", "w", encoding="utf-8") as f:
    f.write(content)
