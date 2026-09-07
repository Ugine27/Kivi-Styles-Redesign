with open(r'C:\Users\ragha\Kivi Styles Redesign\kivi-app\src\components\WhispurrApp.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

modal_html = """    <AnimatePresence>
        {showQuickEditModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-2xl bg-[#1a110e] border border-[#5d4037]/60 rounded-2xl shadow-2xl p-6"
            >
              <h2 className="text-xl font-bold text-orange-200 mb-4 flex items-center gap-2">
                <Pencil className="w-5 h-5 text-orange-400" />
                Quick Edit (Last Sentence)
              </h2>
              <textarea
                autoFocus
                value={quickEditText}
                onChange={(e) => setQuickEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    saveQuickEdit();
                  }
                  if (e.key === 'Escape') {
                    setShowQuickEditModal(false);
                  }
                }}
                className="w-full h-32 bg-black/40 border border-orange-500/30 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-orange-500/80 resize-none shadow-inner"
              />
              <div className="flex justify-between items-center mt-4 text-xs text-white/40">
                <span>Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded border border-white/20 font-mono">Enter</kbd> to save</span>
                <div className="flex gap-3">
                  <button onClick={() => setShowQuickEditModal(false)} className="px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">Cancel</button>
                  <button onClick={saveQuickEdit} className="px-6 py-2 rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all">Save Changes</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
"""

code = code.replace("  return (\n", "  return (\n    <>\n" + modal_html)
code = code.replace("    </div>\n  );\n}", "    </div>\n    </>\n  );\n}")

with open(r'C:\Users\ragha\Kivi Styles Redesign\kivi-app\src\components\WhispurrApp.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
