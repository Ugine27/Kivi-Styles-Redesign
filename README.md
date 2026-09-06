# WhisPURR (Kivi) - The Invisible Translation Layer

Kivi (affectionately known as WhisPURR) is an ambient, frictionless OS-level AI translation layer that sits between your unstructured human speech and structured digital output, completely eliminating the "editing tax."

This repository contains the **MockOS Prototype**, a beautifully designed web-based React (Vite) application that perfectly simulates how Kivi operates natively on a desktop environment.

## 🌟 Key Features
- **Premium Editorial Typography**: A gorgeous, magazine-quality dark-mode UI driven by the Editorial font family.
- **First-Launch Onboarding**: A full-screen, 11-slide interactive tutorial guiding users through the Kivi interaction paradigm and Styles Survey.
- **Radial Control Strip**: A non-linear, organic floating desktop UI. The central Kivi Cat expands on hover to reveal Styles, App Context, and Note-taking tools.
- **6 Semantic Modes**: Instantly style your speech for Work Messaging, Personal Messaging, Email, Developer, Prompting, or Other Apps.
- **Script Controls**: Seamlessly toggle between Native script and Romanized transliteration.
- **Native Web Speech & Gemini Engine**: Captures live voice dictation natively in your browser and rewrites it in real-time using `gemini-3.7-flash`.

## 🛠 Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- A Google Gemini API Key

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Kivi-Styles-Redesign
   ```

2. **Configure your API Key:**
   Create a `.env` file in the `kivi-app` directory and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Start the App:**
   We have included an easy-to-use startup script that automatically installs dependencies, starts the server, and opens your browser. Just run:
   ```bash
   python whispurrstart.py
   ```

5. **Experience the Prototype:**
   Open [http://localhost:5173/](http://localhost:5173/) in your browser.
   - **First Launch**: Experience the onboarding survey and tutorial.
   - **Desktop Integration**: Interact with the Radial Kivi Cat at the bottom of the screen.
   - **Activate Kivi**: Hold `Alt` and speak into your microphone to simulate the global OS hook.
   - **Customize**: Double-click the Cat to open the expansive Styles Dashboard.

## 📚 Documentation
- [Plan](docs/Plan.md) - The core philosophy, current architecture, and future roadmap.
- [Runner](docs/Runner.md) - Chronological timelog of the prototype's development and design pivots.
