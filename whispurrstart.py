import os
import subprocess
import sys
import webbrowser
import time
import threading

def start_react_app():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    app_dir = os.path.join(root_dir, 'kivi-app')
    
    if not os.path.exists(app_dir):
        print(f"Error: Could not find '{app_dir}'. Make sure you are in the correct folder.")
        sys.exit(1)

    print("--- WhisPURR (Kivi) Startup Script ---")
    
    try:
        subprocess.run(['npm', '--version'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True, shell=True)
    except Exception:
        print("Error: 'npm' is not found. Please ensure Node.js is installed.")
        sys.exit(1)

    node_modules = os.path.join(app_dir, 'node_modules')
    if not os.path.exists(node_modules):
        print("node_modules not found. Running 'npm install'...")
        subprocess.run(['npm', 'install'], cwd=app_dir, shell=True)

    print("Starting Kivi MockOS (React App)...")
    
    try:
        def open_browser():
            time.sleep(3)
            webbrowser.open('http://localhost:5173/')
        
        threading.Thread(target=open_browser, daemon=True).start()
        
        subprocess.run(['npm', 'run', 'dev'], cwd=app_dir, shell=True)
    except KeyboardInterrupt:
        print("\nShutting down WhisPURR...")

if __name__ == '__main__':
    start_react_app()
