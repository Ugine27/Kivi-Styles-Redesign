# Change Runner (Timelog)

This document tracks every single change made to the project.

## Log

- **2026-09-03 17:58** - Initialized repository, created README, .gitignore, and docs (Plan.md and Runner.md).
- **2026-09-03 18:30** - Copied the latest committed `convocatcher.py` and `requirements.txt` from the ConvoCatcher repository to the Kivi Styles Redesign repository.
- **2026-09-03 20:43** - Created and committed the Vite + React (TypeScript) frontend prototype (`kivi-app/`), including Mock OS canvas, HUD, and deterministic transformation engine.

- **[Implementation]**: Fully integrated \webkitSpeechRecognition\ API natively tuned with \interimResults\ for live transcription. Replaced dummy logic layer with native fetch to \gemini-3.7-flash\ using debounced API calls for real-time translation styling.
- **[Configuration]**: Added \.env\ file for VITE_GEMINI_API_KEY.

- **[Documentation]**: Rewrote README.md to provide clear instructions on how to install and run the React prototype using npm, bypassing the old Python requirements.txt architecture.
- **[UX]**: Removed Maximize buttons, centered taskbar, drastically reduced Gemini debounce for instant typing, added keyboard navigation, and refined the 3-degree scale.
- **[Version Control]**: Committed and pushed the stable MVP to the remote repository.
