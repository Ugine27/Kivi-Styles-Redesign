# WhisPURR (Kivi) — The Invisible Voice Translation Layer

> **Speak naturally. WhisPURR adapts your words to where you are.**  
> An ambient, frictionless OS-level AI translation companion that bridges unstructured human speech and structured digital output, completely eliminating the "editing tax."

---

## 🌟 What is WhisPURR?

**WhisPURR** (formerly Kivi) is designed to sit quietly at the bottom of your desktop environment as a gentle, intelligent companion. When you hold your shortcut, WhisPURR listens, understands your intent and emotional undertones, translates or re-styles your thoughts in real-time, and seamlessly pastes the output directly into whatever application you are using.

Whether drafting quick Slack messages, authoring formal executive proposals, writing terminal commands, or speaking in foreign languages, WhisPURR eliminates the friction of manual re-typing and editing.

---

## ✨ Key Features & Capabilities

### 🎙️ 1. Ambient "Hold to Speak" Voice Dictation
- **Instant Activation**: Simply hold `Alt` (or your customized trigger key) from anywhere in your OS to dictate.
- **Floating Speech Dialogue HUD**: Opens an unobtrusive bottom-floating status bar displaying live audio waveforms, real-time streaming transcripts, and automatic typing into your active window.
- **Copy & Retain**: Immediate one-click clipboard copying and speech history retention.

---

### 🧭 2. Seamless Dual Radial Dials
WhisPURR introduces a fluid, non-linear radial interaction model built specifically for mouse wheel and keyboard gesture workflows:

- **Mode Dial (`Alt + Scroll`)**:
  - Spin seamlessly through **8 Adaptive Tone Profiles**:
    - 🤝 **Formal**: Professional, polished corporate and executive communications.
    - ☕ **Casual**: Natural, friendly, everyday conversational tone.
    - 💻 **Developer**: Structured technical syntax, git commit conventions, CLI commands, and code logic.
    - 🤖 **Prompts**: Well-structured LLM prompting patterns with clear constraints and roles.
    - 📂 **Other Apps**: Context-aware styling optimized for notes, Notion, and productivity tools.
    - 🎓 **Academic**: Empirical, scholarly rigor with elevated vocabulary and structure.
    - ⚡ **Concise**: Brevity-first summaries and bullet points with zero filler words.
    - 💖 **Warm**: Empathetic, appreciative, and supportive communication.
- **Language Dial (`Alt + Right-Click` / `Alt + →`)**:
  - Instant access to **10 World Languages**:
    - 🌐 Auto-Detect (real-time spoken language detection)
    - 🇬🇧 English, 🇮🇳 Hindi, 🇪🇸 Spanish, 🇫🇷 French, 🇩🇪 German
    - 🇯🇵 Japanese, 🇨🇳 Mandarin, 🇮🇹 Italian, 🇵🇹 Portuguese
- **Interactive Dial Customizer**:
  - Clickable chips allow users to curate exactly which modes and languages are showcased on their live dials, reducing clutter to only what you need.

---

### ✨ 3. Expressive Emotion Moods
- **Emotion & Undertone Intelligence**: WhisPURR analyzes conversational nuance, enthusiasm, humor, and emotion in your speech.
- **Dynamic Mood Emojis**: When enabled, adds contextually appropriate, expressive emojis and undertones (e.g., `🙌✨`, `🚀💻`, `💖🌸`) to match your natural energy.
- **Global Moods Switch**: Easily toggle Moods `ON` or `OFF` anytime directly from the Shortcuts panel, Radial Dial simulator, or settings.

---

### 🎨 4. Vibrant Multi-Color Onboarding Tutorial
A 10-slide interactive walkthrough that introduces new users to WhisPURR with a vibrant, playful, yet sophisticated Mac aesthetic:
- **Atmospheric Aura Lighting Mesh**: Ambient glowing orbs of sky blue, coral, sunshine yellow, soft lavender, and mint.
- **3D Tactile Keycaps & Concentric Audio Waves**: Interactive visual guides illustrating keypress mechanics.
- **Interactive Radial Dial Simulator**: Try spinning tone profiles and switching languages with your mousewheel and right-click right inside the tutorial.
- **Tactile Shortcut Cards**: High-contrast, color-coded cards for dictation, tone switching, and language cycling.
- **3 Companion Form Factors**: Choose how WhisPURR visualizes itself on screen:
  - 🔮 **Orb**: Radiant floating sphere with ambient multi-color glow.
  - ✨ **Mini**: Ultra-compact minimalist screen notch.
  - 🌊 **Pill**: Dynamic real-time waveform spectrum bar.
- **Multi-Category Personality Survey**: Color-coded survey slides tailored to Developer Blueprints, Chat Registers, Professional Docs, and Creative Tone.
- **Keyboard-First Navigation**: Smooth navigation with `←`, `→`, `Space`, `[Esc]` to skip, and `[Enter]` to launch.

---

### ⏱️ 5. Dynamic "Time Saved" Milestones
WhisPURR tracks your productivity gains in real-time, translating minutes saved into relatable human activities:
- **5–15 minutes**: *"Enough time for a coffee ☕"*
- **15–30 minutes**: *"Enough time to read a chapter 📖"*
- **30–60 minutes**: *"Enough time to watch an episode 🎬"*
- **1–2 hours**: *"Enough time to watch a movie 🎬"*
- **2–4 hours**: *"Enough time to make 3 presentations 📊"*
- **4+ hours**: *"That's almost half a workday back. ✨"*

---

### 💡 6. Thoughtful UX & Ergonomics
- **Outside-Click & Escape Dismissals**: Info dialogs, modals, and popovers automatically close when clicking outside or pressing `Escape`.
- **High-Contrast Coffee Theme**: Warm cream base (`#fcf9f5` / `#f4ece1`), deep coffee brown typography (`#2b1f1a` / `#3e2723`), and leather/espresso accents for maximum legibility.
- **Bottom-Screen Anchoring**: The companion rests comfortably at the bottom of the display, never obscuring primary work.

---

## ⌨️ Shortcuts Quick Reference

| Action | Shortcut / Gesture | Description |
| :--- | :--- | :--- |
| **Dictate** | `Alt` *(Hold)* | Activates real-time speech dictation HUD |
| **Spin Modes** | `Alt + Scroll` | Spins the Right Dial through 8 tone profiles |
| **Spin Languages** | `Alt + Right-Click` or `Alt + →` | Spins the Left Dial through 10 languages |
| **Toggle Moods** | Click `Moods: ON/OFF` | Enables/disables expressive emotional emojis |
| **Customize Dials** | Click Mode / Lang Chips | Showcases or hides specific modes on dials |
| **Dismiss Popups** | Click Outside or `Esc` | Automatically closes open dialogs |
| **Launch / Confirm**| `Enter ↵` | Confirms modal actions and launches WhisPURR |

---

## 🏗️ Architecture & Technology Stack

- **Frontend Core**: React 18, TypeScript, Vite
- **Styling & Design System**: Tailwind CSS v3 with semantic color palettes (`coral`, `mint`, `lavender`, `cornflower`, `sunshine`, `vibrantOrange`)
- **Typography**: Editorial Serif (`"Editorial New"`, `Editorial`, `Newsreader`) anchored with clean macOS system sans-serif
- **Animations & Physics**: Framer Motion 11 (spring transitions, layout morphing, drag gestures)
- **Icons**: Lucide React
- **Audio & Speech Engine**: Browser Web Speech Recognition API + Web Audio API
- **AI Processing**: Google Gemini API (`gemini-3.7-flash` / `gemini-2.5-flash`) with fallback transformation heuristics

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher)
- [npm](https://www.npmjs.com/) (v9+)
- A [Google Gemini API Key](https://ai.google.dev/) *(optional for AI transformations; offline fallback heuristic included)*

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ugine27/Kivi-Styles-Redesign.git
   cd Kivi-Styles-Redesign
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the `kivi-app` folder:
   ```bash
   cd kivi-app
   cp .env.example .env # or create .env directly
   ```
   Add your Gemini API Key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Launch Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your browser.

   *Alternatively, run the automated Python launcher from the repository root:*
   ```bash
   python whispurrstart.py
   ```

---

## 📁 Repository Structure

```
Kivi-Styles-Redesign/
├── README.md                      # Comprehensive project documentation
├── whispurrstart.py               # Automated launcher & dependency installer
├── docs/
│   ├── Plan.md                    # Core philosophy and architectural roadmap
│   └── Runner.md                  # Development history and design pivots
└── kivi-app/
    ├── index.html                 # App shell and web fonts
    ├── package.json               # Dependencies and build scripts
    ├── tailwind.config.js         # Theme customization and semantic color tokens
    ├── vite.config.ts             # Vite build configuration
    └── src/
        ├── App.tsx                # Top-level application controller
        ├── index.css              # Global styles, theme overrides & utilities
        ├── transformEngine.ts     # Gemini AI prompt transformation pipeline
        ├── useKiviInput.ts        # Keyboard, Alt-detection & speech recognition hook
        └── components/
            ├── Tutorial.tsx       # 10-slide vibrant onboarding & interactive dials
            ├── WhispurrApp.tsx    # Main WhisPURR dashboard, styles & metrics
            ├── MockOS.tsx         # macOS desktop environment simulation
            ├── KiviCatIcon.tsx    # WhisPURR cat mascot SVG icon
            ├── FootprintManager.tsx # Memory footprint and context tracker
            └── styles/
                ├── StylesManager.tsx # Deep tone profile and style customization
                └── MainStylesView.tsx # Quick-access tone matrix
```

---

## 📄 License

This project is licensed under the MIT License — see the repository for details.
