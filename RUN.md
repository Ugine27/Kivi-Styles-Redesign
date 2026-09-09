# Running Whispurr Locally

A quick sequence to clone, install dependencies, and start the Whispurr interactive prototype:

```bash
git clone https://github.com/Ugine27/Kivi-Styles-Redesign.git
cd Kivi-Styles-Redesign/kivi-app
npm install
npm run dev
```

---

## 1. Requirements

The Whispurr interactive prototype is built with **React 18**, **TypeScript**, and **Vite 5**. To run the prototype locally, ensure your system meets the following environment requirements:

- **Node.js**: `v18.0.0` or higher (tested on `v26.8.1`; Vite 5 requires Node.js `18.0.0+` or `20.0.0+`)
- **npm**: `v9.0.0` or higher (tested on `v11.19.0`)

> **Note on Python**: Python is **not** required to run the core web application. However, if you choose to use the optional one-click root helper script (`whispurrstart.py`), **Python 3.8+** (tested on `v3.13.9`) is supported using only standard library modules.

---

## 2. Install dependencies

Navigate to the `kivi-app` application directory and install the project dependencies:

```bash
cd kivi-app
npm install
```

*Alternatively, from the repository root directory, you can run:*
```bash
npm --prefix kivi-app install
```

---

## 3. Start the prototype

Start the local Vite development server:

```bash
npm run dev
```

*Alternatively, from the repository root directory, you can run:*
```bash
npm --prefix kivi-app run dev
```

### Optional: One-Click Python Launcher
From the repository root directory, you can also launch using the included startup script:
```bash
python3 whispurrstart.py
```
*(This script verifies `npm`, installs any missing dependencies inside `kivi-app`, launches the Vite development server, and automatically opens your default browser).*

---

## 4. Open the prototype

Once the Vite server is running, open your web browser and navigate to:

```
http://localhost:5173/
```

### What to Expect:
- The browser will load the **Whispurr MockOS** interactive desktop simulation.
- You can interact with the bottom desktop bar, hold the `Alt` key (or trigger button) to simulate ambient voice dictation, explore the dual radial dials (`Alt + Scroll` for Modes, `Alt + →` for Languages), and walk through the 10-slide onboarding tutorial.
