# Project Plan

This document outlines the overarching architecture, design philosophy, and future roadmap for the WhisPURR (Kivi) Styles Redesign project.

## Core Philosophy
Kivi is an ambient, frictionless OS-level AI translation layer that sits between unstructured human speech and structured digital output, eliminating the "editing tax." It acts as a permanent desktop companion—quiet, unobtrusive, and highly intelligent.

## Current Architecture
The repository contains the **MockOS Prototype**, a web-based React (Vite) application simulating Kivi's native OS integration.

### Key Components:
1. **The Radial Control Strip (`MockOS.tsx`)**:
   - A non-linear, bottom-centered radial cluster replacing traditional linear toolbars.
   - Anchored by the Kivi Cat icon.
   - Expanding hover zones reveal contextual controls: Active App detection, Styles overriding, and Meeting Notes toggle.

2. **The First-Launch Tutorial (`Tutorial.tsx`)**:
   - A premium, full-screen 11-slide onboarding experience.
   - Educates users on the core interactions (`fn` activation, `fn + ^` degree shifting).
   - Simulates the onboarding Style Survey across various domains (Developer, Personal, Work).
   - Persists state in `localStorage` to ensure it only runs on first launch.

3. **The Styles Dashboard (`WhispurrApp.tsx`)**:
   - A heavy glassmorphism UI offering deep customization.
   - **6 Semantic Modes**: Work Messaging, Personal Messaging, Email, Developer, Prompting, Other Apps.
   - **Script Engine**: A toggle for Native vs. Romanized output.
   - **Custom Rules & Dictionary**: Allows users to enforce personal formatting and phonetic corrections.

4. **The Transformation Engine (`transformEngine.ts`)**:
   - Leverages `gemini-3.7-flash` via the Gemini API.
   - Maps the 6 semantic modes, transcription input, and degree toggles into strict system prompts.

5. **Design System & Typography**:
   - Fully unified under the **Editorial Font** (Newsreader/PP Editorial New) for a highly polished, magazine-like premium feel.
   - Dark mode aesthetic utilizing `neutral-900`, `amber-500` (orange), and `emerald-500` accents.

## Roadmap / Next Steps
- [ ] **Electron/Tauri Migration**: Transition the React MockOS into a native desktop application to achieve actual system-wide hook integration.
- [ ] **Persistent AI Profiles**: Sync Custom Rules and Dictionary macros via a backend database (e.g., Supabase).
- [ ] **Context-Aware Styling**: Dynamically detect the active window (e.g., VS Code vs. Slack) and auto-switch the Kivi mode without user intervention.
