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

- **[Demo Mode]**: Modified App.tsx to bypass localStorage checks, ensuring the First-Launch Tutorial overlay now triggers every single time the application is reloaded for continuous demo purposes.

- **[UX Adjustment]**: Moved the First-Launch Tutorial logic out of App.tsx and into MockOS.tsx. The demo now explicitly triggers only when the user opens the WhisPURR App dashboard (e.g., via double-clicking the Kivi Cat). Since it uses local component state, the demo resets every time the page reloads.

- **[UI Addition]**: Added a User Profile icon to the bottom left of the WhisPURR Dashboard sidebar, featuring a responsive collapse animation matching the sidebar's state.

- **[Bug Fix]**: Fixed an overflow issue in the WhisPURR Dashboard where the h-screen utility was causing the bottom of the sidebar (including the new User Profile) to be cropped behind the MockOS taskbar. Changed the root wrapper to h-full to correctly respect the parent window bounding box.

- **[Settings Flow]**: Implemented a dynamic sub-navigation state (ctiveMenu) in the WhisPURR Dashboard. Clicking the User Profile now cleanly swaps the sidebar to a new context containing Settings, User Policy, Theme, Plans & Billing, and Tutorial tabs (with a < Back button to return to the main tools). Added a unified fallback render state for these new tabs.

- **[Settings Flow Iteration]**: Re-architected the Settings UI to use a secondary sliding sidebar. Instead of swapping the primary navigation, clicking the User profile icon now triggers a new side panel that slides out smoothly beside the primary sidebar, displaying the Settings, User Policy, Theme, Plans & Billing, and Tutorial tabs without losing context of the primary navigation.

- **[Frameless Window]**: Removed the top 'Kivi Dashboard' title ribbon specifically for the WhisPURR Dashboard. Converted the OS window controls (Close/Minimize) to float transparently over the app's native header, creating a clean, modern, frameless window experience.

- **[UI Tweak]**: Lowered the Kivi Control Strip to sit closer to the bottom edge of the OS screen, and shrunk the main Kivi Cat floating action button down for a more subtle, less intrusive desktop presence.

- **[UI Tweak]**: Shrank the Kivi Cat icon down to \w-8 h-8\ and positioned the radial strip flush with the bottom of the screen (\ottom-0\) for maximum unobtrusiveness.

- **[Seamless Integration]**: Re-engineered the Radial Control Strip to mount natively inside the MockOS taskbar. The WhisPURR icon in the center of the taskbar is now the literal trigger for the radial cluster. This completely eliminates overlap issues and unifies the app interface with the OS environment perfectly.

- **[UI Tweak]**: Moved the Kivi Control Strip out of the Taskbar and floated it *just above* the Task Ribbon (\ottom-[-64px]\) as requested. Fixed a critical hitbox bug where the invisible \w-64 h-64\ radial container was intercepting clicks meant for the Taskbar apps beneath it by restricting the initial \pointer-events-auto\ strictly to the \w-8 h-8\ Cat trigger icon.

- **[Bug Fix]**: Resolved a JSX parsing error (\Expected corresponding JSX closing tag for <div>\) in MockOS.tsx caused by a trailing fragmented DOM string during the layout extraction.

- **[Video Integration]**: Replaced the static CSS emoji animations for the 'Kitten' (Sleeping) and 'Zoomies' stages in the WhisPURR Dashboard with the newly downloaded high-fidelity MP4 video renders. Implemented \mix-blend-screen\ on the video elements to perfectly key out their backgrounds and blend them into the native UI.

- **[Performance & Optimization]**: Engineered a comprehensive Framer Motion optimization pass across \MockOS.tsx\ and \WhispurrApp.tsx\. Forced hardware acceleration (\	ransform-gpu\) on the main App glass container, and applied explicit \willChange: "transform, opacity\" hint styles to all heavy \motion.div\ satellite popups, radial backgrounds, and tab views to eliminate layout thrashing and drop-frames during complex transition states.

- **[UI Fluidity Fix]**: Fixed the sluggish 'after-effects' on side panel tab switching. Removed the heavy \ilter: blur()\ transitions and the \mode=wait\ AnimatePresence logic. Converted all tab panels to use absolute positioning (\inset-4\) during crossfades with snappy spring physics, allowing tabs to seamlessly dissolve into each other instantly without layout stacking.

- **[Bug Fix]**: Resolved the 'white box' overlap visual glitch on tab switching. The glitch was caused by simultaneous rendering of highly opaque translucent glass layers during crossfade. Restored \mode=wait\ but heavily optimized the physics: old tabs now exit near-instantly (50ms) before the new tab snaps in (150ms), guaranteeing zero DOM overlap while maintaining an ultra-fast feel.

- **[Revert]**: Rolled back the sequential mounting logic (\mode=wait\) on the side panel tabs. Restored the simultaneous \bsolute inset-4\ crossfading implementation as per user request to maintain the instant visual overlap effect during tab switching.

- **[Recovery]**: Re-implemented the User Profile (Mr.Kat orange box) and Secondary Settings Sidebar which were accidentally dropped during the animation rollback.

- **[Recovery & Enhancement]**: Successfully re-implemented the MP4 video elements for 'Stage: Kitten' and 'Stage: Zoomies' that were lost during the rollback. Upgraded the OS Window Manager to render launched apps in true 100vh Full Screen, elevating them to \z-[70]\ to completely cover and obscure the OS Task Ribbon and Kivi Strip, creating a totally immersive app view.

- **[Feature]**: Completely revamped the UI architecture to support dynamic theming. Replaced all hardcoded Tailwind color utilities in \WhispurrApp.tsx\ with scoped CSS custom variables injected via \index.css\. Added a new \Coffee Light\ (Beige & Brown) theme variant alongside the existing \Midnight Dark\ (Black & Orange) variant, which can be fully toggled using the newly built Theme UI located in the 'Theme' tab within the User settings sidebar.

- **[Bug Fix]**: Restored the original rounded, minimalist aesthetic by removing the harsh borders accidentally introduced during the CSS variables migration. Re-mapped the 20% opacity accent borders correctly so they don't render as solid orange lines. Removed the hard 'white lines' from the Theme Selection cards, relying instead on smooth background highlights and rounded-2xl corners to match the core design language.

- **[Rollback]**: Reverted the dual-theme architecture (CSS Variables engine and Light Theme variant) per user request. Restored the native hardcoded Tailwind classes specifically tailored for the pure Midnight Dark (Black & Orange) aesthetic. All other functional upgrades (MP4 Videos, Full Screen MockOS, smooth crossfading animations, and User Profile sidebars) have been carefully preserved.

- **[Bug Fix]**: Re-applied the Radial Control Strip sizing and placement fixes that were lost during the snapshot rollback. The Cat icon is correctly shrunk back to \w-8 h-8\, docked perfectly above the taskbar at \ottom-[-64px]\, and elevated to \z-[80]\ so it remains fully visible and accessible even when apps are launched in Full Screen mode.

- **[Feature]**: Built a sleek, glassmorphic 'Demo / Tutorial' welcome screen that auto-triggers immediately upon launching the WhisPURR app. Features the animated Cat icon with rich radial gradients, explaining how to trigger Kivi (the Alt keybind), matching the core design language.

- **[Feature - Dual Radial Dials]**: Added seamless dual radial dials for both Modes (`Alt + Scroll`) and Languages (`Alt + Right-Click` / `Alt + →`). Included custom chip selectors in Shortcuts and Demo slides allowing users to customize which modes and languages are showcased on their live dials.

- **[Feature - Emotion Moods]**: Integrated expressive emotion moods engine (`whispurr_moods`). Automatically adds expressive, context-aware emojis and tone adjustments to speech based on emotional undertones. Added global toggle switches across the shortcuts dashboard and interactive demo.

- **[UX - Time Saved Human Milestones]**: Added secondary human-relatable activity translations directly beneath the live Time Saved metric (e.g. coffee break, reading a chapter, watching an episode or movie, building presentations, half a workday back), dynamically adapting based on the user's recorded savings.

- **[UI - Contrast & Legibility Pass]**: Darkened all ultra-light text shades and borders across the Coffee theme to guarantee accessibility and effortless readability.

- **[UX - Outside-Click & Escape Dismissals]**: Added global `mousedown` and `Escape` listeners to automatically close info dialogues, popovers, and helper modals when clicking anywhere outside.

- **[Redesign - Vibrant Multi-Color Tutorial]**: Re-engineered the 10-slide tutorial with a rich, multi-color aesthetic (Sky Blue, Coral, Warm Sunshine Yellow, Mint, Soft Lavender, and Coffee Brown). Added a luminous atmospheric mesh aura, 3D tactile sky blue `Alt` keycap, live interactive Radial Dials simulator, tactile shortcut cards, and color-coded onboarding survey slides.
