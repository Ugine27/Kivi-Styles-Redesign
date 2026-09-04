# Kivi: The Invisible Translation Layer

Kivi is an ambient, invisible OS-level AI translation layer that sits between your unstructured human speech and structured digital output, completely eliminating the "editing tax."

This repository contains the **MockOS Prototype**, a web-based React (Vite) application that perfectly simulates how Kivi operates on a desktop environment. 

## Features
- **Global Keyboard Hook**: Hold `Alt` anywhere in the OS to instantly activate the Kivi mic.
- **Mode Selector HUD**: Scroll or use Up/Down arrows to toggle between PULSE, LEGO, and FLOW modes.
- **Effort Dial**: Use Left/Right arrows to scale the prompt complexity from 1 to 3 degrees.
- **Native Web Speech**: Captures live voice dictation natively in your browser.
- **Gemini Flash Engine**: Rewrites and styles your speech in real-time.

## Prerequisites
*Note: The architecture pivoted from a local Python backend to a frictionless React frontend. You do not need Python or a `requirements.txt`. All dependencies are managed via Node.js.*

- [Node.js](https://nodejs.org/) (v18+)
- A Google Gemini API Key

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd kivi-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure your API Key:**
   Create a `.env` file in the `kivi-app` directory and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the local server:**
   ```bash
   npm run dev
   ```

5. **Experience the MockOS:**
   Open [http://localhost:5173/](http://localhost:5173/) in your browser.
   - **Enter OS Mode**: Click anywhere on the desktop to enter Fullscreen.
   - **Activate Kivi**: Hold `Alt` and speak into your microphone.
   - **Tweak the Engine**: While holding `Alt`, scroll your mouse wheel or press arrow keys to interact with the Mode Selector HUD.
   - **Drop Text**: Release `Alt` to watch Kivi instantly drop perfectly formatted text into your active app.

## Documentation
- [Plan](docs/Plan.md) - The core philosophy and architectural plan.
- [Runner](docs/Runner.md) - Chronological timelog of the prototype's development.
