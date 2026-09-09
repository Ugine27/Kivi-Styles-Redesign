# Development & Migration Scripts

This directory contains historical, one-off utility and migration scripts created during the iterative development and prototyping phases of WhisPURR (Kivi).

These scripts are **not required at runtime** by the core web application (`kivi-app/`). They are preserved here for historical context, reproducibility, and development audit trails.

### Contents
- **`add_*.py`**: Scripts that introduced initial feature skeletons and state hooks (shortcuts, quicklaunch, seamless switching).
- **`fix_*.py`**: One-off layout, hitbox, and CSS correction utilities.
- **`pop_up_cat*.py`**: Iterations exploring radial positioning of the WhisPURR desktop anchor.
- **`convocatcher.py` & `requirements.txt`**: Early Python speech-capture proof of concept developed prior to native browser Web Speech API implementation.
- **`scratch/`**: Historical PR merge review files and diff patches.
