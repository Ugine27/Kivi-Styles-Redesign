import os
import subprocess
import base64

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS_DIR = os.path.join(ROOT_DIR, "docs")
PROTO_DIR = os.path.join(ROOT_DIR, "prototype")
BRAIN_DIR = "/Users/eugenemercy/.gemini/antigravity-cli/brain/f34b4d58-b31f-467a-87e1-195a75aac4c5"

os.makedirs(DOCS_DIR, exist_ok=True)
os.makedirs(PROTO_DIR, exist_ok=True)

CHROME_BIN = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

def to_base64_img(path):
    if not os.path.exists(path):
        return ""
    with open(path, "rb") as f:
        data = base64.b64encode(f.read()).decode("utf-8")
        return f"data:image/png;base64,{data}"

def render_pdf(html_content, output_path, landscape=False):
    tmp_html = f"/tmp/{os.path.basename(output_path)}.html"
    with open(tmp_html, "w", encoding="utf-8") as f:
        f.write(html_content)
    
    cmd = [
        CHROME_BIN,
        "--headless=new",
        "--no-pdf-header-footer",
        f"--print-to-pdf={output_path}",
    ]
    if landscape:
        # For landscape we configure via @page in CSS
        pass
    cmd.append(f"file://{tmp_html}")
    
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if os.path.exists(tmp_html):
        os.remove(tmp_html)
    print(f"Generated: {output_path} ({os.path.getsize(output_path)} bytes)")

# 1. Product Positioning Statement PDF
positioning_html = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>WhisPURR - Product Positioning Statement</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
  @page {
    size: A4 portrait;
    margin: 18mm 16mm;
  }
  * { box-sizing: border-box; }
  body {
    font-family: 'Inter', -apple-system, sans-serif;
    color: #2b1f1a;
    background: #fcf9f5;
    line-height: 1.55;
    font-size: 13.5px;
    margin: 0;
  }
  .header {
    border-bottom: 2px solid #e8d5c4;
    padding-bottom: 14px;
    margin-bottom: 22px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .brand-badge {
    display: inline-block;
    background: #0284c7;
    color: white;
    font-size: 11px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 999px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 8px;
  }
  h1 {
    font-family: 'Newsreader', serif;
    font-size: 32px;
    font-weight: 600;
    color: #2b1f1a;
    margin: 0 0 4px 0;
    letter-spacing: -0.02em;
  }
  .subtitle {
    font-family: 'Newsreader', serif;
    font-style: italic;
    color: #8d6e63;
    font-size: 16px;
    margin: 0;
  }
  .meta-right {
    text-align: right;
    font-size: 11px;
    color: #795548;
    font-family: 'JetBrains Mono', monospace;
  }
  h2 {
    font-family: 'Newsreader', serif;
    font-size: 20px;
    font-weight: 600;
    color: #3e2723;
    margin: 20px 0 8px 0;
    border-bottom: 1px solid #ebdcd0;
    padding-bottom: 4px;
  }
  p { margin: 0 0 10px 0; }
  .callout-box {
    background: #ffffff;
    border: 1.5px solid #0284c7;
    border-radius: 12px;
    padding: 14px 18px;
    margin: 16px 0;
    box-shadow: 0 4px 12px rgba(2, 132, 199, 0.06);
  }
  .callout-orange {
    border-color: #ea580c;
    background: #fffcf9;
    box-shadow: 0 4px 12px rgba(234, 88, 12, 0.06);
  }
  .callout-title {
    font-weight: 700;
    color: #0284c7;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 6px;
  }
  .callout-title-orange {
    color: #c2410c;
  }
  .statement-text {
    font-family: 'Newsreader', serif;
    font-size: 16px;
    line-height: 1.5;
    color: #2b1f1a;
  }
  .statement-text strong {
    color: #0284c7;
    font-weight: 600;
  }
  .quote-body {
    font-family: 'Newsreader', Georgia, serif;
    font-size: 14.5px;
    line-height: 1.6;
    color: #431407;
    font-style: italic;
    margin: 0;
  }
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin: 14px 0;
  }
  .card {
    background: white;
    border: 1px solid #e5d5c5;
    border-radius: 10px;
    padding: 12px 14px;
  }
  .card h3 {
    margin: 0 0 6px 0;
    font-size: 13.5px;
    font-weight: 700;
    color: #3e2723;
  }
  .card p {
    margin: 0;
    font-size: 12.5px;
    color: #5d4037;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 14px 0;
    font-size: 12px;
  }
  th, td {
    padding: 8px 10px;
    text-align: left;
    border-bottom: 1px solid #e8d5c4;
  }
  th {
    background: #f4ece1;
    color: #3e2723;
    font-weight: 700;
    font-size: 11.5px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  tr:nth-child(even) td {
    background: #fbf8f4;
  }
  .check { color: #16a34a; font-weight: 700; }
  .cross { color: #dc2626; font-weight: 700; }
  .tag {
    display: inline-block;
    background: #f4ece1;
    color: #5d4037;
    border: 1px solid #dfcebf;
    padding: 2px 7px;
    border-radius: 6px;
    font-size: 11px;
    font-family: 'JetBrains Mono', monospace;
  }
</style>
</head>
<body>

<div class="header">
  <div>
    <div class="brand-badge">Product Positioning</div>
    <h1>WhisPURR (Kivi)</h1>
    <p class="subtitle">The Ambient, Invisible Voice Translation Layer</p>
  </div>
  <div class="meta-right">
    <div>VERSION 2.0</div>
    <div>PRODUCT DESIGN</div>
    <div>SEPTEMBER 2026</div>
  </div>
</div>

<h2>1. Executive Summary & Market Problem</h2>

<div class="callout-box callout-orange">
  <div class="callout-title callout-title-orange">The Kivi Product Positioning Statement</div>
  <p class="quote-body">
    “Kivi is a bridge between what you want to say and how you need to say it. It is made for people who constantly switch between WhatsApp, email, client messages, and AI tools, each needing a different tone and format. This means always interrupting your workflow to type and reformat. Kivi tries to solve this problem. It saves time and lowers the mental burden. Talk the way you normally do, and Kivi changes your words to fit the app or website you are using. It does not speak or act on behalf of you. It simply makes sharing your thoughts quicker and less frustrating. It is always there, without feeling like another app, another step, or another burden.”
  </p>
</div>

<p>
  Human speech operates at <strong>140–160 words per minute</strong>, nearly 4× faster than the average typing speed of 40 words per minute. However, voice dictation has historically suffered from an immense <em>"editing tax"</em>: traditional speech-to-text engines produce verbatim, raw transcriptions full of filler words, false starts, awkward syntax, and inappropriate registers.
</p>
<p>
  Users spend more time editing and cleaning transcriptions in destination apps than if they had typed from scratch. <strong>WhisPURR eliminates the editing tax</strong> by acting as an ambient, OS-level translation companion that captures natural speech, restructures and polishes it in real-time according to contextual tone and language, and directly types the output into the active window.
</p>

<div class="callout-box">
  <div class="callout-title">The Geoffrey Moore Positioning Framework</div>
  <div class="statement-text">
    <strong>For</strong> fast-moving knowledge workers, software engineers, and global communicators<br>
    <strong>Who</strong> suffer from typing fatigue, cognitive context switching, and the editing tax of raw dictation,<br>
    <strong>WhisPURR</strong> is an ambient, desktop voice-to-structured-text OS companion<br>
    <strong>That</strong> effortlessly adapts unscripted human thoughts into application-perfect output with zero editing required.<br>
    <strong>Unlike</strong> raw speech-to-text engines (Apple Dictation, standard Whisper CLI) and heavyweight modal transcription apps,<br>
    <strong>Our Product</strong> features dual radial gesture dials for instantaneous tone/language switching, emotional undertone intelligence, and a persistent bottom-anchored companion that stays quietly in the background.
  </div>
</div>

<h2>2. Core User Personas & Pain Points</h2>
<div class="grid-2">
  <div class="card">
    <h3>👨‍💻 The Engineering Lead</h3>
    <p><strong>Pain Point:</strong> Constantly switching between high-level architecture thoughts, Slack discussions, terminal bash commands, and git commits.<br>
    <strong>WhisPURR Value:</strong> Developer Mode formats code blocks, git conventions, and technical acronyms instantly without breaking flow.</p>
  </div>
  <div class="card">
    <h3>👩‍💼 The Executive / Product Manager</h3>
    <p><strong>Pain Point:</strong> High-volume async communication where tone matters: formal for leadership, casual for team channels, concise for quick decisions.<br>
    <strong>WhisPURR Value:</strong> Alt + Scroll spins between Formal, Casual, and Concise tone profiles in under 300 milliseconds.</p>
  </div>
  <div class="card">
    <h3>🌐 The Bilingual / Global Creator</h3>
    <p><strong>Pain Point:</strong> Brainstorming in one language while drafting in another; complex keyboard input method switching.<br>
    <strong>WhisPURR Value:</strong> Dual radial dial with Alt + Right-Click shifts between 10 world languages with real-time streaming translation.</p>
  </div>
  <div class="card">
    <h3>✍️ The Deep-Focus Writer</h3>
    <p><strong>Pain Point:</strong> The cursor blinking at a blank page creates cognitive paralysis; hands get fatigued during long writing sessions.<br>
    <strong>WhisPURR Value:</strong> Hold Alt and stream stream-of-consciousness thoughts; WhisPURR synthesizes coherent prose into Notion or Docs.</p>
  </div>
</div>

<h2>3. Competitive Differentiation Matrix</h2>
<table>
  <thead>
    <tr>
      <th>Dimension</th>
      <th>WhisPURR</th>
      <th>Apple Dictation</th>
      <th>Wispr Flow</th>
      <th>AudioPen</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Zero-Tax Restructuring</strong></td>
      <td class="check">✓ Real-time LLM polish</td>
      <td class="cross">✗ Verbatim only</td>
      <td class="check">✓ Basic rewording</td>
      <td class="check">✓ Summary only</td>
    </tr>
    <tr>
      <td><strong>Dual Radial Dials</strong></td>
      <td class="check">✓ Modes + Langs on wheel</td>
      <td class="cross">✗ None</td>
      <td class="cross">✗ None</td>
      <td class="cross">✗ None</td>
    </tr>
    <tr>
      <td><strong>Emotion & Mood Nuance</strong></td>
      <td class="check">✓ Expressive Moods (✨/off)</td>
      <td class="cross">✗ None</td>
      <td class="cross">✗ None</td>
      <td class="cross">✗ None</td>
    </tr>
    <tr>
      <td><strong>Direct In-App Typing</strong></td>
      <td class="check">✓ Native OS hook injection</td>
      <td class="check">✓ Native insertion</td>
      <td class="check">✓ Insertion</td>
      <td class="cross">✗ Separate web app</td>
    </tr>
    <tr>
      <td><strong>Visual Delight & Presence</strong></td>
      <td class="check">✓ Tactile, vibrant Mac craft</td>
      <td class="cross">✗ Utility microphone icon</td>
      <td class="tag">Minimal bar</td>
      <td class="tag">Browser tab</td>
    </tr>
  </tbody>
</table>

<h2>4. Key Value Propositions</h2>
<ul>
  <li><strong>Instantaneous Fluidity:</strong> Hold Alt to speak, release to paste. No separate windows to navigate or copy-paste loops.</li>
  <li><strong>Semantic Dexterity:</strong> 8 distinct tone profiles engineered to eliminate rewriting across different corporate registers.</li>
  <li><strong>Emotional Undertone Intelligence:</strong> Speech communicates feeling; WhisPURR senses enthusiasm, warmth, or directness and enhances prose accordingly.</li>
  <li><strong>Quiet Companionship:</strong> Resting unobtrusively at the bottom edge, WhisPURR is a trusted, friendly presence that empowers rather than distracts.</li>
</ul>

</body>
</html>
"""

# 2. Product Vision & Roadmap PDF
vision_html = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>WhisPURR - Product Vision & Strategic Roadmap</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
  @page {
    size: A4 portrait;
    margin: 18mm 16mm;
  }
  * { box-sizing: border-box; }
  body {
    font-family: 'Inter', -apple-system, sans-serif;
    color: #2b1f1a;
    background: #fcf9f5;
    line-height: 1.55;
    font-size: 13.5px;
    margin: 0;
  }
  .header {
    border-bottom: 2px solid #e8d5c4;
    padding-bottom: 14px;
    margin-bottom: 22px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .brand-badge {
    display: inline-block;
    background: #9333ea;
    color: white;
    font-size: 11px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 999px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 8px;
  }
  h1 {
    font-family: 'Newsreader', serif;
    font-size: 32px;
    font-weight: 600;
    color: #2b1f1a;
    margin: 0 0 4px 0;
    letter-spacing: -0.02em;
  }
  .subtitle {
    font-family: 'Newsreader', serif;
    font-style: italic;
    color: #8d6e63;
    font-size: 16px;
    margin: 0;
  }
  .meta-right {
    text-align: right;
    font-size: 11px;
    color: #795548;
    font-family: 'JetBrains Mono', monospace;
  }
  h2 {
    font-family: 'Newsreader', serif;
    font-size: 20px;
    font-weight: 600;
    color: #3e2723;
    margin: 20px 0 8px 0;
    border-bottom: 1px solid #ebdcd0;
    padding-bottom: 4px;
  }
  p { margin: 0 0 10px 0; }
  .vision-quote {
    background: #ffffff;
    border-left: 4px solid #9333ea;
    border-radius: 0 12px 12px 0;
    padding: 14px 18px;
    margin: 16px 0;
    font-family: 'Newsreader', serif;
    font-size: 17px;
    font-style: italic;
    color: #3e2723;
    box-shadow: 0 4px 12px rgba(147, 51, 234, 0.05);
  }
  .pillar-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
    margin: 16px 0;
  }
  .pillar-card {
    background: white;
    border: 1px solid #e5d5c5;
    border-radius: 10px;
    padding: 14px;
    border-top: 3px solid #0284c7;
  }
  .pillar-card:nth-child(2) { border-top-color: #f43f5e; }
  .pillar-card:nth-child(3) { border-top-color: #9333ea; }
  .pillar-card h3 {
    margin: 0 0 6px 0;
    font-size: 14px;
    font-weight: 700;
    color: #2b1f1a;
  }
  .pillar-card p {
    margin: 0;
    font-size: 12px;
    color: #5d4037;
    line-height: 1.45;
  }
  .timeline {
    margin: 18px 0;
    position: relative;
    padding-left: 20px;
    border-left: 2px solid #e0d0c0;
  }
  .timeline-item {
    position: relative;
    margin-bottom: 16px;
  }
  .timeline-item::before {
    content: '';
    position: absolute;
    left: -26px;
    top: 3px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #0284c7;
    border: 2px solid #fcf9f5;
  }
  .timeline-item.active::before { background: #16a34a; }
  .timeline-item.future::before { background: #9333ea; }
  .timeline-title {
    font-weight: 700;
    font-size: 13.5px;
    color: #2b1f1a;
  }
  .timeline-badge {
    display: inline-block;
    font-size: 10px;
    font-family: 'JetBrains Mono', monospace;
    padding: 1px 6px;
    border-radius: 4px;
    margin-left: 6px;
    background: #e8f5e9;
    color: #1b5e20;
    font-weight: 600;
  }
  .timeline-item.future .timeline-badge {
    background: #f3e8ff;
    color: #6b21a8;
  }
  .timeline-desc {
    font-size: 12.5px;
    color: #5d4037;
    margin-top: 3px;
  }
</style>
</head>
<body>

<div class="header">
  <div>
    <div class="brand-badge">Product Vision</div>
    <h1>WhisPURR (Kivi)</h1>
    <p class="subtitle">Architectural Blueprint & Strategic Evolution</p>
  </div>
  <div class="meta-right">
    <div>ROADMAP 2026–2027</div>
    <div>DESIGN STRATEGY</div>
    <div>DEEPMIND STANDARDS</div>
  </div>
</div>

<div class="vision-quote">
  "The ultimate input device is not a glass pane or plastic keys—it is the human voice unconstrained by formatting anxiety. WhisPURR transforms the computer from a transcription recorder into an active, empathetic thinking partner."
</div>

<h2>1. Core Product Vision</h2>
<p>
  Computers have demanded that humans conform to their physical keyboard interfaces for over half a century. While language models have unlocked profound comprehension, the primary bottleneck in knowledge work remains the physical act of typing, correcting, and formatting text across fragmented windows.
</p>
<p>
  <strong>WhisPURR's North Star</strong> is to make voice the default, preferred modality for 80% of daily digital knowledge creation. Not by forcing users into a massive standalone app, but by existing as an invisible, context-aware OS layer that understands where you are, who you are talking to, and how you want to be heard.
</p>

<h2>2. The Three Architectural Pillars</h2>
<div class="pillar-grid">
  <div class="pillar-card">
    <h3>1. Ambient Non-Intrusiveness</h3>
    <p>WhisPURR never steals window focus or clutters taskbars. It rests as a quiet companion, springing to life only when invoked with tactile key combinations.</p>
  </div>
  <div class="pillar-card">
    <h3>2. Expressive Fluidity</h3>
    <p>Interactions leverage organic, muscle-memory gestures: mousewheel spin for radial dials, right-click for language pivots, and emotional undertone detection.</p>
  </div>
  <div class="pillar-card">
    <h3>3. Zero-Tax Direct Output</h3>
    <p>Speech is never output raw. It is syntactically adapted, punctuated, and styled for the destination app before a single letter touches the screen.</p>
  </div>
</div>

<h2>3. Strategic Multi-Phase Roadmap</h2>
<div class="timeline">
  <div class="timeline-item active">
    <div class="timeline-title">
      Phase 1: Interactive Desktop Simulation (Current State)
      <span class="timeline-badge">COMPLETED & VERIFIED</span>
    </div>
    <div class="timeline-desc">
      Full web-based macOS MockOS environment with native Web Speech API recognition, Google Gemini Flash transformation engine, dual radial dials with wheel navigation, 10-slide vibrant onboarding tutorial, and dynamic Time Saved human milestones.
    </div>
  </div>

  <div class="timeline-item future">
    <div class="timeline-title">
      Phase 2: Native macOS Background Daemon (Q4 2026)
      <span class="timeline-badge">UPCOMING</span>
    </div>
    <div class="timeline-desc">
      Transition from web prototype to native Rust/Tauri + Swift application. Global low-level keyboard interception via <code>CGEventTap</code>, native macOS Accessibility API window typing, menu bar daemon, and on-device whisper.cpp fallback for zero-latency offline dictation.
    </div>
  </div>

  <div class="timeline-item future">
    <div class="timeline-title">
      Phase 3: Autonomous Contextual Awareness (Q1 2027)
      <span class="timeline-badge">FUTURE MILESTONE</span>
    </div>
    <div class="timeline-desc">
      Dynamic active-app introspection: automatically switching to Developer mode when VS Code or Terminal is focused, Casual mode in Slack/WhatsApp, and Formal in Mail. Cloud sync for custom vocabulary, team dictionary macros, and personalized style profiles.
    </div>
  </div>
</div>

<h2>4. Measurable Success Metrics</h2>
<ul>
  <li><strong>Time Saved / Cognitive Efficiency:</strong> Target average of 45+ minutes saved per active user daily, tracked and celebrated via real-time human milestones.</li>
  <li><strong>Word Error Rate & Edit Rate:</strong> Post-dictation manual keystroke edits reduced to &lt; 4% of total generated text.</li>
  <li><strong>Dial Adoption:</strong> Over 70% of speech sessions utilizing deliberate tone profile selections via radial gesture controls.</li>
  <li><strong>Physical Well-being:</strong> Significant reduction in reported repetitive strain injury (RSI) and keyboard fatigue among heavy writers.</li>
</ul>

</body>
</html>
"""

# 3. Permanent Screens Reference Deck PDF
# Load high-res images
img_s0 = to_base64_img(f"{BRAIN_DIR}/vibrant_slide0_intro.png")
img_s1 = to_base64_img(f"{BRAIN_DIR}/vibrant_slide1_speak.png")
img_s2_modes = to_base64_img(f"{BRAIN_DIR}/vibrant_slide2_dials_modes.png")
img_s2_langs = to_base64_img(f"{BRAIN_DIR}/vibrant_slide2_dials_langs.png")
img_s3 = to_base64_img(f"{BRAIN_DIR}/vibrant_slide3_shortcuts.png")
img_s4 = to_base64_img(f"{BRAIN_DIR}/vibrant_slide4_companion.png")
img_s6 = to_base64_img(f"{BRAIN_DIR}/vibrant_slide6_survey_coral.png")
img_s9 = to_base64_img(f"{BRAIN_DIR}/vibrant_slide9_launch.png")
img_time = to_base64_img(f"{BRAIN_DIR}/time_saved_casual_1h42m.png")

screens_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>WhisPURR - Permanent Screen Reference</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
  @page {{
    size: A4 landscape;
    margin: 12mm 14mm;
  }}
  * {{ box-sizing: border-box; }}
  body {{
    font-family: 'Inter', -apple-system, sans-serif;
    color: #2b1f1a;
    background: #fcf9f5;
    margin: 0;
  }}
  .slide {{
    page-break-after: always;
    height: 180mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }}
  .slide:last-child {{
    page-break-after: avoid;
  }}
  .header {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid #e8d5c4;
    padding-bottom: 6px;
    margin-bottom: 10px;
  }}
  .title-group h2 {{
    margin: 0;
    font-family: 'Newsreader', serif;
    font-size: 22px;
    color: #2b1f1a;
  }}
  .title-group p {{
    margin: 2px 0 0 0;
    font-size: 11px;
    color: #8d6e63;
    font-family: 'JetBrains Mono', monospace;
  }}
  .badge {{
    background: #0284c7;
    color: white;
    font-size: 10px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 999px;
    text-transform: uppercase;
  }}
  .content-box {{
    flex: 1;
    display: flex;
    gap: 16px;
    align-items: center;
    overflow: hidden;
  }}
  .img-wrapper {{
    flex: 2;
    background: white;
    border: 1px solid #e0d0c0;
    border-radius: 12px;
    padding: 6px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 145mm;
  }}
  .img-wrapper img {{
    max-width: 100%;
    max-height: 135mm;
    object-fit: contain;
    border-radius: 8px;
  }}
  .desc-wrapper {{
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }}
  .desc-card {{
    background: white;
    border: 1px solid #e8d5c4;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 11.5px;
  }}
  .desc-card h4 {{
    margin: 0 0 4px 0;
    color: #0284c7;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }}
  .desc-card p {{
    margin: 0;
    color: #5d4037;
    line-height: 1.4;
  }}
  .footer {{
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: #8d6e63;
    border-top: 1px solid #ebdcd0;
    padding-top: 4px;
    font-family: 'JetBrains Mono', monospace;
  }}
</style>
</head>
<body>

<!-- Slide 1: Welcome & Overview -->
<div class="slide">
  <div class="header">
    <div class="title-group">
      <h2>01 / Meet WhisPURR — Onboarding Welcome</h2>
      <p>COMPONENT: Tutorial.tsx (Slide 0) · AESTHETIC: Multi-Color Ambient Mesh Aura</p>
    </div>
    <div class="badge">AURA SYSTEM</div>
  </div>
  <div class="content-box">
    <div class="img-wrapper"><img src="{img_s0}" alt="Slide 0" /></div>
    <div class="desc-wrapper">
      <div class="desc-card">
        <h4>Ambient Light Mesh</h4>
        <p>Luminous blur mesh composed of sky blue, coral, sunshine yellow, and mint ambient orbs that establish visual energy from the moment the app opens.</p>
      </div>
      <div class="desc-card">
        <h4>Gradient Typography</h4>
        <p>Hero headline clipped from bright sky blue into indigo, balanced against deep coffee brown typography for optimal reading contrast.</p>
      </div>
      <div class="desc-card">
        <h4>Tactile Pill Indicators</h4>
        <p>Highlighting core tenets: ⚡ Fast, 🌊 Flexible, 🕊️ Quietly There, and ✨ Emotion Moods with dedicated semantic color treatments.</p>
      </div>
    </div>
  </div>
  <div class="footer"><span>WHISPURR PRODUCT DESIGN ASSIGNMENT</span><span>PERMANENT SCREEN REFERENCE</span></div>
</div>

<!-- Slide 2: Hold Alt to Speak -->
<div class="slide">
  <div class="header">
    <div class="title-group">
      <h2>02 / Hold to Speak Dictation HUD</h2>
      <p>COMPONENT: Tutorial.tsx (Slide 1) · INTERACTION: Global Alt Key Hook</p>
    </div>
    <div class="badge">VOICE HUD</div>
  </div>
  <div class="content-box">
    <div class="img-wrapper"><img src="{img_s1}" alt="Slide 1" /></div>
    <div class="desc-wrapper">
      <div class="desc-card">
        <h4>3D Alt Keycap</h4>
        <p>Tactile blue keycap with glossy top reflection and shadow rendering, providing intuitive muscle-memory guidance for dictation invocation.</p>
      </div>
      <div class="desc-card">
        <h4>Pulsing Mic Orb</h4>
        <p>Radiant microphone button enveloped by concentric ripple animations to signal active microphone listening state.</p>
      </div>
      <div class="desc-card">
        <h4>Floating Speech Dialogue</h4>
        <p>Simulated bottom-docked speech HUD displaying real-time animated bouncing audio waveforms, live text preview, and quick-copy action.</p>
      </div>
    </div>
  </div>
  <div class="footer"><span>WHISPURR PRODUCT DESIGN ASSIGNMENT</span><span>PERMANENT SCREEN REFERENCE</span></div>
</div>

<!-- Slide 3: Radial Dials Modes -->
<div class="slide">
  <div class="header">
    <div class="title-group">
      <h2>03 / Seamless Radial Dials — Tone Mode Selector</h2>
      <p>COMPONENT: Tutorial.tsx (Slide 2 - Modes) · INTERACTION: Alt + Mouse Wheel</p>
    </div>
    <div class="badge">RADIAL DIALS</div>
  </div>
  <div class="content-box">
    <div class="img-wrapper"><img src="{img_s2_modes}" alt="Slide 2 Modes" /></div>
    <div class="desc-wrapper">
      <div class="desc-card">
        <h4>Live Simulator</h4>
        <p>Interactive radial arc allowing users to practice mouse wheel spinning through 8 tone profiles right inside the onboarding flow.</p>
      </div>
      <div class="desc-card">
        <h4>Moods Switch</h4>
        <p>Coral-accented toggle switch enabling/disabling emotional emoji injection and undertone intelligence on the fly.</p>
      </div>
      <div class="desc-card">
        <h4>Chip Customization</h4>
        <p>Dynamic chip selector allowing users to pin or unpin specific tone profiles to customize their live radial carousel.</p>
      </div>
    </div>
  </div>
  <div class="footer"><span>WHISPURR PRODUCT DESIGN ASSIGNMENT</span><span>PERMANENT SCREEN REFERENCE</span></div>
</div>

<!-- Slide 4: Radial Dials Languages -->
<div class="slide">
  <div class="header">
    <div class="title-group">
      <h2>04 / Seamless Radial Dials — Language Selector</h2>
      <p>COMPONENT: Tutorial.tsx (Slide 2 - Languages) · INTERACTION: Alt + Right-Click / Alt + →</p>
    </div>
    <div class="badge">WORLD LANGUAGES</div>
  </div>
  <div class="content-box">
    <div class="img-wrapper"><img src="{img_s2_langs}" alt="Slide 2 Languages" /></div>
    <div class="desc-wrapper">
      <div class="desc-card">
        <h4>Left Arc Orientation</h4>
        <p>Flipping to the Languages dial maps items along the left radial curve with distinct indigo/purple visual branding.</p>
      </div>
      <div class="desc-card">
        <h4>10 Supported Languages</h4>
        <p>Real-time translation across English, Hindi, Spanish, French, German, Japanese, Mandarin, Italian, Portuguese, and Auto-Detect.</p>
      </div>
      <div class="desc-card">
        <h4>Real-Time Output Strip</h4>
        <p>Live translated sample preview dynamically demonstrates multilingual speech outputs as the wheel is spun.</p>
      </div>
    </div>
  </div>
  <div class="footer"><span>WHISPURR PRODUCT DESIGN ASSIGNMENT</span><span>PERMANENT SCREEN REFERENCE</span></div>
</div>

<!-- Slide 5: Desktop Shortcuts -->
<div class="slide">
  <div class="header">
    <div class="title-group">
      <h2>05 / Pick Your Paws — Shortcuts Architecture</h2>
      <p>COMPONENT: Tutorial.tsx (Slide 3) · ARCHITECTURE: Three-Tier Control Model</p>
    </div>
    <div class="badge">SHORTCUTS</div>
  </div>
  <div class="content-box">
    <div class="img-wrapper"><img src="{img_s3}" alt="Slide 3" /></div>
    <div class="desc-wrapper">
      <div class="desc-card">
        <h4>Sky Blue: Hold to Talk</h4>
        <p>Instant voice typing trigger with dedicated Alt keycap display, reinforcing core dictation behavior.</p>
      </div>
      <div class="desc-card">
        <h4>Coral: Mode Dial</h4>
        <p>Alt + Scroll mapping for immediate spinning across 8 contextual tone profiles without opening an app window.</p>
      </div>
      <div class="desc-card">
        <h4>Mint: Language Dial</h4>
        <p>Alt + Right-Click mapping providing zero-latency switching between 10 world languages.</p>
      </div>
    </div>
  </div>
  <div class="footer"><span>WHISPURR PRODUCT DESIGN ASSIGNMENT</span><span>PERMANENT SCREEN REFERENCE</span></div>
</div>

<!-- Slide 6: Companion Form Factors -->
<div class="slide">
  <div class="header">
    <div class="title-group">
      <h2>06 / Shape Your Companion — Visual Form Factors</h2>
      <p>COMPONENT: Tutorial.tsx (Slide 4) · CUSTOMIZATION: Desktop Anchor Presets</p>
    </div>
    <div class="badge">COMPANION FORMS</div>
  </div>
  <div class="content-box">
    <div class="img-wrapper"><img src="{img_s4}" alt="Slide 4" /></div>
    <div class="desc-wrapper">
      <div class="desc-card">
        <h4>The Orb (Default)</h4>
        <p>Radiant floating sphere with ambient multi-color glow, providing a warm, playful desktop mascot presence.</p>
      </div>
      <div class="desc-card">
        <h4>The Mini</h4>
        <p>Ultra-compact minimalist screen notch designed for users who want zero screen footprint while working.</p>
      </div>
      <div class="desc-card">
        <h4>The Pill</h4>
        <p>Dynamic spectrum bar displaying real-time audio waveform activity and status indicators across the display bottom.</p>
      </div>
    </div>
  </div>
  <div class="footer"><span>WHISPURR PRODUCT DESIGN ASSIGNMENT</span><span>PERMANENT SCREEN REFERENCE</span></div>
</div>

<!-- Slide 7: Personality Surveys -->
<div class="slide">
  <div class="header">
    <div class="title-group">
      <h2>07 / Category Personality Surveys</h2>
      <p>COMPONENT: Tutorial.tsx (Slides 5–8) · ADAPTATION: Domain Tone Presets</p>
    </div>
    <div class="badge">ONBOARDING SURVEY</div>
  </div>
  <div class="content-box">
    <div class="img-wrapper"><img src="{img_s6}" alt="Slide 6 Survey" /></div>
    <div class="desc-wrapper">
      <div class="desc-card">
        <h4>Chat Registers (Coral)</h4>
        <p>Customizing how WhisPURR adapts speech for fast-twitch workplace channels like Slack, Teams, and Discord (Clear vs. Casual).</p>
      </div>
      <div class="desc-card">
        <h4>Developer Blueprints (Sky)</h4>
        <p>Choosing code comment verbosity, terminal command structuring, and technical prompt syntax.</p>
      </div>
      <div class="desc-card">
        <h4>Interactive Cards</h4>
        <p>Selection rings, glowing checkmark pills, and live text preview cards that instantly react to user choices.</p>
      </div>
    </div>
  </div>
  <div class="footer"><span>WHISPURR PRODUCT DESIGN ASSIGNMENT</span><span>PERMANENT SCREEN REFERENCE</span></div>
</div>

<!-- Slide 8: Launch Screen & Time Saved -->
<div class="slide">
  <div class="header">
    <div class="title-group">
      <h2>08 / Ready to Pounce & Time Saved Milestones</h2>
      <p>COMPONENTS: Tutorial.tsx (Slide 9) & WhispurrApp.tsx (Time Saved UI)</p>
    </div>
    <div class="badge">FINAL EXPERIENCE</div>
  </div>
  <div class="content-box">
    <div class="img-wrapper"><img src="{img_s9}" alt="Slide 9 Launch" /></div>
    <div class="desc-wrapper">
      <div class="desc-card">
        <h4>Launch WhisPURR CTA</h4>
        <p>Radiant sky-to-indigo launch button with the WhisPURR cat avatar and keyboard shortcut [Enter ↵] trigger.</p>
      </div>
      <div class="desc-card">
        <h4>Shortcut Reminder Pills</h4>
        <p>Color-coded reminder badges for dictation, modes dial, language dial, and expressive emotion moods.</p>
      </div>
      <div class="desc-card">
        <h4>Dynamic Time Saved</h4>
        <p>Real-time metrics translating saved minutes into human activities (e.g. coffee break, reading a chapter, watching a movie, half a workday back).</p>
      </div>
    </div>
  </div>
  <div class="footer"><span>WHISPURR PRODUCT DESIGN ASSIGNMENT</span><span>PERMANENT SCREEN REFERENCE</span></div>
</div>

</body>
</html>
"""

print("Rendering PDFs via headless Chrome...")
render_pdf(positioning_html, os.path.join(DOCS_DIR, "product-positioning.pdf"))
render_pdf(vision_html, os.path.join(DOCS_DIR, "product-vision.pdf"))
render_pdf(screens_html, os.path.join(PROTO_DIR, "screens.pdf"), landscape=True)
print("All 3 submission PDFs generated successfully!")
