import re

with open(r'C:\Users\ragha\Kivi Styles Redesign\kivi-app\src\components\WhispurrApp.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Extract tourSteps outside the component
tour_steps_str = """  const tourSteps = [
    { id: 'Home', title: 'The Home Base', text: 'This is where you monitor WhisPURR’s activity, see live transcription, and access quick controls.' },
    { id: 'History', title: 'Chat Registers', text: 'View all your past dictations and commands. You can always copy or replay what was said.' },
    { id: 'Dictionary', title: 'Your Custom Dictionary', text: 'Teach WhisPURR how to spell unique names, acronyms, and industry-specific jargon.' },
    { id: 'ShortHand', title: 'ShortHand Macros', text: 'Create powerful abbreviations. E.g. "sig" automatically expands to your full email signature.' },
    { id: 'Context', title: 'Global Context', text: 'Tell WhisPURR about your ongoing projects so it completely understands the context of your dictations.' },
    { id: 'ScratchPad', title: 'ScratchPad', text: 'A private space to quickly jot down thoughts or test out your custom styles and rules.' },
    { id: 'Profile', title: 'Your Profile', text: 'Access your account settings, billing, and global preferences here.' },
    { id: 'CatFacts', title: 'Cat Facts', text: 'Because who doesn’t need a random cat fact while they work?' }
  ];"""

# Replace it inside the component
code = code.replace(tour_steps_str, "")

# Add it outside the component, near CAT_FACTS
code = code.replace("let hasShownTutorialThisSession = false;", """let hasShownTutorialThisSession = false;

const TOUR_STEPS = [
  { id: 'Home', title: 'The Home Base', text: 'This is where you monitor WhisPURR’s activity, see live transcription, and access quick controls.' },
  { id: 'History', title: 'Chat Registers', text: 'View all your past dictations and commands. You can always copy or replay what was said.' },
  { id: 'Dictionary', title: 'Your Custom Dictionary', text: 'Teach WhisPURR how to spell unique names, acronyms, and industry-specific jargon.' },
  { id: 'ShortHand', title: 'ShortHand Macros', text: 'Create powerful abbreviations. E.g. "sig" automatically expands to your full email signature.' },
  { id: 'Context', title: 'Global Context', text: 'Tell WhisPURR about your ongoing projects so it completely understands the context of your dictations.' },
  { id: 'ScratchPad', title: 'ScratchPad', text: 'A private space to quickly jot down thoughts or test out your custom styles and rules.' },
  { id: 'Profile', title: 'Your Profile', text: 'Access your account settings, billing, and global preferences here.' },
  { id: 'CatFacts', title: 'Cat Facts', text: 'Because who doesn’t need a random cat fact while they work?' }
];""")

# Replace references to tourSteps with TOUR_STEPS
code = code.replace("tourSteps[tourStep]", "TOUR_STEPS[tourStep]")
code = code.replace("tourSteps.length", "TOUR_STEPS.length")

with open(r'C:\Users\ragha\Kivi Styles Redesign\kivi-app\src\components\WhispurrApp.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
