# 🏆 Future Health Digital Innovation Challenge
## Official Hack2skill Portal Submission Details

> **Challenge:** Fertility & Population Health · **Challenge 07: Climate-Resilient Worker Health**  
> **Project Name:** **HeatGuard**  
> **Tagline:** *Zero Heat Fatalities. Zero Hardware Capex. Every Worker Protected in Their Mother Tongue.*  
> **Portal URL:** `https://hack2skill.com/event/futurehealthchallenge/dashboard/submissions/...`  
> **Deployment Prototype URL:** `http://localhost:5173` (or production deployment)

---

### Field 1: Challenges *
- **Selection:** `Population Health · Challenge 07: Climate-Resilient Worker Health`

---

### Field 2: Solution summary * (Limit: 600 characters)
**Exact text (486 characters):**
```text
HeatGuard is an AI-powered, multilingual heat risk intelligence platform protecting outdoor industrial workers before heat strain becomes a medical emergency. Running on ambient site IoT telemetry and workers' existing smartphones with $0 hardware capex, HeatGuard calculates personalized thermal strain using ISO 7933 physics and delivers native voice warnings in Urdu, Hindi, Tagalog, Bengali, and Arabic. Supervisors receive tactical crew heatmaps to enforce UAE MOHRE rest mandates.
```

---

### Field 3: Solution stage *
- **Selection:** `Working Prototype`

---

### Field 4: What has been built during the challenge? * (Limit: 1500 characters)
**Exact text (1,140 characters):**
```text
During the hackathon, we built and verified the complete end-to-end HeatGuard system:

1. Physics & ML Engine: Implemented ISO 7243 outdoor WBGT calculation and ISO 7933 Predicted Heat Strain (PHS) algorithms in Python, modeling core body temperature (Tcore), sweat rate, and personalized heat susceptibility (acclimatization days, BMI, fasting).
2. Multi-Agent Guardian Swarm: Autonomous agents that triage incoming telemetry streams, calculate allowable continuous work intervals, and trigger dialect-appropriate voice alerts with Explainable AI (XAI) feature attribution.
3. Native Multilingual Voice Engine: Synthesized voice and high-contrast text warnings in 5 primary Gulf migrant worker languages (Urdu, Hindi, Tagalog, Bengali, Arabic) using Web Speech API with Azure Neural TTS fallback.
4. Dual-Surface Web Application: Built a sunlight-readable Worker Life-Sentinel PWA with one-tap guest access and care-loop acknowledgment ('Resting', 'Drinking Water', 'Emergency'), paired with an HSE Tactical Command Deck featuring crew heatmaps, one-click rest broadcast, and automated Abu Dhabi OSHAD audit exports.
5. Abu Dhabi Climate Simulator: Ingests realistic environmental feeds from Mussafah, Al Reem Island, and Al Dhafra.
```

---

### Field 5: Technology type * (Checkboxes)
- [x] **AI agent**
- [x] **Machine learning**
- [x] **Software application**
- [x] **Analytics**
- [x] **Sensor**
- [x] **Connected device**

---

### Field 6: Prototype / Deployment Link *
- **Value:** `http://localhost:5173` (or public preview URL)

---

### Field 7: Upload your solution deck *
- **File:** Export or attach the 17-slide solution deck based on `c:\Users\UTHANDAM\Desktop\HACKTHON\project\submission\pitch_deck_slides.md`.

---

### Field 8: Does any member of your team have a conflict of interest to declare? *
- [x] **None. No member of our team has a conflict of interest to declare.**

---

### Field 9: Is your solution software-based, hardware-based, or both? *
- **Selection:** `Software` (or `Both software and hardware` — note: software platform integrating ambient weather station sensors)

---

### Field 10: Share a link to a Short demo video of your solution * (Max 3 mins)
- **Suggested Script Structure for 3-Minute Video:**
  - **0:00 - 0:40:** The Abu Dhabi reality (48°C desert heat, 1.2M outdoor workers, $820/worker hardware barrier of SlateSafety/Kenzen).
  - **0:40 - 1:30:** Live Worker PWA demo: Show Tariq Khan (unacclimatized, Day 2), trigger RED warning, click **"Play Voice Alert"** to demonstrate audible Urdu voice warning out loud!
  - **1:30 - 2:15:** Switch to Supervisor Tactical Command Deck: Show live crew heatmap, WBGT threshold alert, and click **"Broadcast 15-Min Hydration Break"**.
  - **2:15 - 2:45:** XAI explainability & Abu Dhabi OSHAD audit export (zero-knowledge privacy).
  - **2:45 - 3:00:** The business model: AED 50/worker/month, 84% margin, break-even at 1,667 workers, $105,000 prize covers 85% of cash needed to reach profitability.
