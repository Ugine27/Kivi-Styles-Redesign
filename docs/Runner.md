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

- **[Rebrand & UX/UI Overhaul]**: Pivot to "WhisPURR". Removed old 3-mode abstract system. Implemented 6 new semantic modes (Work Messaging, Personal Messaging, Email, Developer, Prompting, Other Apps). Drastically overhauled the UI with heavy Glassmorphism (backdrop blurs, reduced paddings, smaller refined typography, rounded 3xl edges, smooth Framer Motion page transitions).
- **[Styles Drill-Down]**: Built a detailed drill-down view for the Styles tab. Clicking a Mode reveals 3 horizontal preset cards representing the degrees of formality. Integrated interactive checkboxes to select presets. Added 18 contextual examples showing the exact AI output style for each mode and degree.
- **[Custom Rules & Learning]**: Added a Dictionary tab and Shortcuts tab to define macro expansions and fix phonetic accent errors natively using the Web Speech API. Added a Custom Rules text-area beneath the Styles presets to enforce user-specific formatting overrides.

- **[UX/UI Simplication]**: Pared down the Modes back to a strict 3-mode structure (Casual, Professional, Clear) to simplify mental load while scrolling. Converted the 3-degree bar into a 2-degree Script Selection bar (Roman vs Native) to allow explicit control over transliteration output formatting. Updated the OS-level scroll HUD (KiviHUD.tsx), global state mapping (useKiviInput.ts), the LLM System Prompt (	ransformEngine.ts), and the Styles Tab UI (WhispurrApp.tsx) to implement these new semantics.

- **[Notes Mode Workflow]**: Added a 4th mode ('Notes') to the scroll HUD. Mapped 'Notes' to the LLM system prompt to enforce highly-structured bulleted summarization. Engineered a seamless cross-component routing flow: settling the scroll wheel on 'Notes' now instantly launches the WhispurrApp inside the MockOS and auto-navigates to a brand-new Notes UI tab for capturing structured thoughts.

- **[OS Anchor UI]**: Added a persistent, subtle WhisPURR Cat icon anchored to the bottom of the OS. The icon serves as a visual reminder of the engine's presence and seamlessly expands into the glowing, pulsing 'Listening/Thinking' HUD when the Alt key is engaged.
- **[UX/UI Simplication Reverted]**: Restored the 6 semantic modes (Work Messaging, Personal Messaging, Email, Developer, Prompting, Other Apps) and the 3-degree effort bar to the Styles Tab, HUD, and global Kivi engine per user request.

- **[Kivi UI/UX Identity Overhaul]**: Designed and implemented a sleek, minimalist macOS-style floating control strip to serve as Kivi's permanent desktop presence. Replaced the simple Cat anchor with a unified layout featuring: context-aware detected App icon, central active Kivi Cat, compact Styles override popover, and a Quick Notes scratchpad popup. The design is quiet, unobtrusive, and highly functional without requiring full application window traversal.

- **[Radial Cluster Architecture]**: Abandoned the linear pill control strip per user prompt. Re-architected the Kivi desktop anchor into an organic, non-linear radial cluster that reveals satellite controls (App Indicator, Styles Typography, Meeting Notes) exclusively on hover. Updated the interaction model so a single click triggers transcription, and a double click launches the dashboard. Preserved the 6 core Semantic modes in the background engine.

- **[Onboarding Experience]**: Built a full-screen, visually striking 11-slide Tutorial React component (Tutorial.tsx). The tutorial guides new users through the Kivi interaction paradigm (fn key, fn + ^, hotkey choices) and simulates the style preferences survey based on provided user mockups. Mapped local storage (kivi_onboarding_complete) to conditionally render this tutorial as an unskippable overlay on first launch, ensuring complete education of the product mechanics before entering the OS simulator.

- **[Typography Overhaul]**: Switched the entire WhisPURR app to use the 'Editorial' font family (prioritizing 'Editorial New' and 'Editorial', with a Google Fonts fallback to 'Newsreader'). Updated 	ailwind.config.js to map these serif fonts to the default sans and serif families, and injected the stylesheet into index.html. This aligns the UI exactly with the premium, editorial serif aesthetic from the mockup slides.
