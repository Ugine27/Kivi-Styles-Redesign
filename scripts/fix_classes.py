# -*- coding: utf-8 -*-
with open("kivi-app/src/components/WhispurrApp.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Home
old_home = "className={`flex items-center py-3 rounded-xl cursor-pointer transition-all ${isSidebarOpen ? 'gap-4 px-4 mx-4' : 'gap-0 justify-center mx-4'} ${activeTab === 'Home' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}"
new_home = "className={getSidebarItemClass('Home', `flex items-center py-3 rounded-xl cursor-pointer transition-all ${isSidebarOpen ? 'gap-4 px-4 mx-4' : 'gap-0 justify-center mx-4'} ${activeTab === 'Home' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm' : 'text-white/50 hover:bg-white/5 hover:text-white'}`, activeTab === 'Home')}"
content = content.replace(old_home, new_home)

# History
old_hist = "className={`flex items-center py-3 rounded-xl cursor-pointer transition-all ${isSidebarOpen ? 'gap-4 px-4 mx-4' : 'gap-0 justify-center mx-4'} ${activeTab === 'History' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}"
new_hist = "className={getSidebarItemClass('History', `flex items-center py-3 rounded-xl cursor-pointer transition-all ${isSidebarOpen ? 'gap-4 px-4 mx-4' : 'gap-0 justify-center mx-4'} ${activeTab === 'History' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm' : 'text-white/50 hover:bg-white/5 hover:text-white'}`, activeTab === 'History')}"
content = content.replace(old_hist, new_hist)

# Mapped Tabs
old_map = "className={`flex items-center py-3 rounded-xl cursor-pointer transition-all shrink-0 ${isSidebarOpen ? 'gap-4 px-4 mx-4' : 'gap-0 justify-center mx-4'} ${activeTab === tab.name ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}"
new_map = "className={getSidebarItemClass(tab.name, `flex items-center py-3 rounded-xl cursor-pointer transition-all shrink-0 ${isSidebarOpen ? 'gap-4 px-4 mx-4' : 'gap-0 justify-center mx-4'} ${activeTab === tab.name ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm' : 'text-white/50 hover:bg-white/5 hover:text-white'}`, activeTab === tab.name)}"
content = content.replace(old_map, new_map)

# Profile
old_prof = "className={`flex items-center py-3 px-3 rounded-xl cursor-pointer transition-all ${isSettingsOpen ? 'bg-white/10 shadow-inner' : 'hover:bg-white/5'} ${isSidebarOpen ? 'gap-3' : 'gap-0 justify-center'}`}"
new_prof = "className={getSidebarItemClass('Profile', `flex items-center py-3 px-3 rounded-xl cursor-pointer transition-all ${isSettingsOpen ? 'bg-white/10 shadow-inner' : 'hover:bg-white/5'} ${isSidebarOpen ? 'gap-3' : 'gap-0 justify-center'}`, isSettingsOpen)}"
content = content.replace(old_prof, new_prof)

# Cat Facts
old_cat = "className={`flex items-center py-3 px-3 rounded-xl cursor-pointer transition-all ${showCatFactPopup ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm' : 'text-white/50 hover:bg-white/5 hover:text-white'} ${isSidebarOpen ? 'gap-3' : 'gap-0 justify-center'}`}"
new_cat = "className={getSidebarItemClass('CatFacts', `flex items-center py-3 px-3 rounded-xl cursor-pointer transition-all ${showCatFactPopup ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm' : 'text-white/50 hover:bg-white/5 hover:text-white'} ${isSidebarOpen ? 'gap-3' : 'gap-0 justify-center'}`, showCatFactPopup)}"
content = content.replace(old_cat, new_cat)

# Customize header
old_cust = "className={`mt-6 mb-2 text-xs font-bold text-white/30 uppercase tracking-widest h-5 transition-all ${isSidebarOpen ? 'px-8' : 'px-0 text-center w-full shrink-0'}`}"
new_cust = "className={`mt-6 mb-2 text-xs font-bold text-white/30 uppercase tracking-widest h-5 transition-all ${isSidebarOpen ? 'px-8' : 'px-0 text-center w-full shrink-0'} ${isTourActive ? 'opacity-20 blur-[1px]' : ''}`}"
content = content.replace(old_cust, new_cust)


with open("kivi-app/src/components/WhispurrApp.tsx", "w", encoding="utf-8") as f:
    f.write(content)
