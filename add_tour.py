# -*- coding: utf-8 -*-
import re

with open("kivi-app/src/components/WhispurrApp.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add tour state
tour_state_code = """
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  const tourSteps = [
    { id: 'Home', title: 'The Home Base', text: 'This is where you monitor WhisPURR’s activity, see live transcription, and access quick controls.' },
    { id: 'History', title: 'Chat Registers', text: 'View all your past dictations and commands. You can always copy or replay what was said.' },
    { id: 'Dictionary', title: 'Your Custom Dictionary', text: 'Teach WhisPURR how to spell unique names, acronyms, and industry-specific jargon.' },
    { id: 'ShortHand', title: 'ShortHand Macros', text: 'Create powerful abbreviations. E.g. "sig" automatically expands to your full email signature.' },
    { id: 'Context', title: 'Global Context', text: 'Tell WhisPURR about your ongoing projects so it completely understands the context of your dictations.' },
    { id: 'ScratchPad', title: 'ScratchPad', text: 'A private space to quickly jot down thoughts or test out your custom styles and rules.' },
    { id: 'Profile', title: 'Your Profile', text: 'Access your account settings, billing, and global preferences here.' },
    { id: 'CatFacts', title: 'Cat Facts', text: 'Because who doesn’t need a random cat fact while they work?' }
  ];
  const currentTourId = isTourActive ? tourSteps[tourStep].id : null;
"""

# Find where to insert (after activeTab state)
content = re.sub(
    r'(const \[activeTab, setActiveTab\] = useState\([^)]+\);)', 
    r'\1\n' + tour_state_code, 
    content
)

# 2. Modify Tutorial onComplete
content = re.sub(
    r'onComplete=\{\(\) => setIsTutorialComplete\(true\)\}',
    r'onComplete={() => { setIsTutorialComplete(true); localStorage.setItem("kivi_tutorial_complete", "true"); setIsTourActive(true); }}',
    content
)

# 3. Add the tour overlay inside the main content area (after <div className="flex-1 relative flex flex-col min-w-0 bg-[#0a0a0a]">)
overlay_code = """
        <AnimatePresence>
          {isTourActive && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-12"
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
                      // Optionally switch the tab in the background so it looks cool
                      if (tourStep + 1 < 6) setActiveTab(tourSteps[tourStep + 1].id);
                    } else {
                      setIsTourActive(false);
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

content = re.sub(
    r'(<div className="flex-1 relative flex flex-col min-w-0 bg-\[#0a0a0a\]">)',
    r'\1\n' + overlay_code,
    content
)

# 4. Add the highlighting logic to the sidebar items.
# We need to inject logic into the classNames. 
# It's easier to define a helper function for the sidebar item class:
helper_func = """
  const getSidebarItemClass = (id: string, baseClass: string, isActive: boolean) => {
    let classes = baseClass;
    if (isTourActive) {
      if (currentTourId === id) {
        classes += ' ring-2 ring-orange-500 ring-offset-4 ring-offset-[#0f0f0f] relative z-[9999] bg-[#1a1a1a] scale-105 shadow-xl opacity-100';
      } else {
        classes += ' opacity-20 pointer-events-none grayscale blur-[1px]';
      }
    }
    return classes;
  };
"""

content = re.sub(
    r'(const glassButton = [^;]+;)',
    r'\1\n' + helper_func,
    content
)

# Now replace the items!
# Home
content = re.sub(
    r'(className={`flex items-center py-3 rounded-xl cursor-pointer transition-all \$\{isSidebarOpen \? \'gap-4 px-4 mx-4\' : \'gap-0 justify-center mx-4\'\} \$\{activeTab === \'Home\'.*?\})(`>)',
    r'className={getSidebarItemClass("Home", `flex items-center py-3 rounded-xl cursor-pointer transition-all ${isSidebarOpen ? \'gap-4 px-4 mx-4\' : \'gap-0 justify-center mx-4\'} ${activeTab === \'Home\' ? \'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm\' : \'text-white/50 hover:bg-white/5 hover:text-white\'}`, activeTab === "Home")}\2',
    content
)

# History
content = re.sub(
    r'(className={`flex items-center py-3 rounded-xl cursor-pointer transition-all \$\{isSidebarOpen \? \'gap-4 px-4 mx-4\' : \'gap-0 justify-center mx-4\'\} \$\{activeTab === \'History\'.*?\})(`>)',
    r'className={getSidebarItemClass("History", `flex items-center py-3 rounded-xl cursor-pointer transition-all ${isSidebarOpen ? \'gap-4 px-4 mx-4\' : \'gap-0 justify-center mx-4\'} ${activeTab === \'History\' ? \'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm\' : \'text-white/50 hover:bg-white/5 hover:text-white\'}`, activeTab === "History")}\2',
    content
)

# Mapped items (Dictionary, ShortHand, Context, ScratchPad)
content = re.sub(
    r'(className={`flex items-center py-3 rounded-xl cursor-pointer transition-all shrink-0 \$\{isSidebarOpen \? \'gap-4 px-4 mx-4\' : \'gap-0 justify-center mx-4\'\} \$\{activeTab === tab\.name.*?\})(`>)',
    r'className={getSidebarItemClass(tab.name, `flex items-center py-3 rounded-xl cursor-pointer transition-all shrink-0 ${isSidebarOpen ? \'gap-4 px-4 mx-4\' : \'gap-0 justify-center mx-4\'} ${activeTab === tab.name ? \'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm\' : \'text-white/50 hover:bg-white/5 hover:text-white\'}`, activeTab === tab.name)}\2',
    content
)

# Profile
content = re.sub(
    r'(className={`flex items-center py-3 px-3 rounded-xl cursor-pointer transition-all \$\{isSettingsOpen \? \'bg-white/10 shadow-inner\' : \'hover:bg-white/5\'\} \$\{isSidebarOpen \? \'gap-3\' : \'gap-0 justify-center\'\})(`>)',
    r'className={getSidebarItemClass("Profile", `flex items-center py-3 px-3 rounded-xl cursor-pointer transition-all ${isSettingsOpen ? \'bg-white/10 shadow-inner\' : \'hover:bg-white/5\'} ${isSidebarOpen ? \'gap-3\' : \'gap-0 justify-center\'}`, isSettingsOpen)}\2',
    content
)

# Cat Facts
content = re.sub(
    r'(className={`flex items-center py-3 px-3 rounded-xl cursor-pointer transition-all \$\{showCatFactPopup \? \'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm\' : \'text-white/50 hover:bg-white/5 hover:text-white\'\} \$\{isSidebarOpen \? \'gap-3\' : \'gap-0 justify-center\'\})(`>)',
    r'className={getSidebarItemClass("CatFacts", `flex items-center py-3 px-3 rounded-xl cursor-pointer transition-all ${showCatFactPopup ? \'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm\' : \'text-white/50 hover:bg-white/5 hover:text-white\'} ${isSidebarOpen ? \'gap-3\' : \'gap-0 justify-center\'}`, showCatFactPopup)}\2',
    content
)

# Also apply a fade to the "Customize" header when tour is active and not on the first two steps
content = re.sub(
    r'(className={`mt-6 mb-2 text-xs font-bold text-white/30 uppercase tracking-widest h-5 transition-all \$\{isSidebarOpen \? \'px-8\' : \'px-0 text-center w-full shrink-0\'\})(`>)',
    r'className={`mt-6 mb-2 text-xs font-bold text-white/30 uppercase tracking-widest h-5 transition-all ${isSidebarOpen ? \'px-8\' : \'px-0 text-center w-full shrink-0\'} ${isTourActive ? \'opacity-20 blur-[1px]\' : \'\'}`}\2',
    content
)


with open("kivi-app/src/components/WhispurrApp.tsx", "w", encoding="utf-8") as f:
    f.write(content)
