# 🛡️ HEATGUARD
### AI-Powered Climate-Resilient Worker Health Intelligence Platform
> **Abu Dhabi Future Health Digital Innovation Challenge 2026**  
> **Track:** Population Health · **Challenge 07:** Climate-Resilient Worker Health  
> **Co-Creators:** Department of Health – Abu Dhabi (DoH) · Microsoft · Inception42 · MBZUAI · Hack2skill

---

## 🌟 Executive Overview

In Abu Dhabi and the wider Arabian Gulf, summer ambient temperatures routinely exceed **48°C (118°F)** with intense humidity, creating lethal Wet Bulb Globe Temperatures (WBGT). 

Previous industry solutions relied on importing **$820+ wearable hardware sensors** (smartwatches and chest straps) for each worker. In practice, 92% of these initiatives failed due to prohibitive capital costs for subcontractors, sensor degradation in desert silica dust, battery charging logistics in labour accommodations, and English-only text alerts that migrant workers cannot read under harsh sunlight.

**HeatGuard** eliminates the hardware barrier with a **$0 sensor capex, software-first paradigm**:
- Ingests ambient microclimate feeds from Abu Dhabi IoT weather stations.
- Computes individualized thermodynamic heat strain using **ISO 7933 Predicted Heat Strain (PHS)** physics and machine learning acclimatization models.
- Broadcasts life-saving acoustic voice warnings in **5 native migrant dialects** (Urdu, Hindi, Tagalog, Bengali, Arabic, and English) with phonetic text and subtitles.
- Delivers an HSE Tactical Command Deck with crew thermal risk heatmaps, one-click site rest broadcasts, and automated **Abu Dhabi OSHAD CoP 11.0** compliance audit logging.

---

## 🏛️ System Architecture

```
                                ┌───────────────────────────────────────────────┐
                                │      Live IoT & Climate Ingestion Layer       │
                                │  • Abu Dhabi IoT Simulator (Mussafah, Al Reem)│
                                │  • Open-Meteo UAE Microclimate Live Feed      │
                                └───────────────────────┬───────────────────────┘
                                                        │
                                                        ▼
                                ┌───────────────────────────────────────────────┐
                                │       LangGraph Multi-Agent Guardian Swarm    │
                                │  1. Ingestion Agent (Stull Wet Bulb & WBGT)  │
                                │  2. ISO 7933 Thermodynamic Physics + ML       │
                                │  3. 5-Dialect Acoustic Voice Synthesizer      │
                                │  4. Fleet Triage & OSHAD Regulatory Guard     │
                                └───────┬───────────────────────────────┬───────┘
                                        │                               │
             ┌──────────────────────────┴────────┐             ┌────────┴──────────────────────────┐
             ▼                                   ▼             ▼                                   ▼
┌─────────────────────────────┐   ┌────────────────────────┐  ┌──────────────────────────────────┐
│  SQLAlchemy 2.0 ORM DB      │   │  Statutory RAG Store   │  │  Enterprise Security & RBAC      │
│  • Workers & Cohorts        │   │  • OSHAD CoP 11.0 v4.0 │  │  • OAuth2 / JWT Auth             │
│  • Telemetry Streams        │   │  • UAE MOHRE Res. 44   │  │  • Worker-First Minimization     │
│  • Immutable Audit Logs     │   │  • ISO 7933 Standards  │  │  • Zero Clinical Leakage         │
└─────────────────────────────┘   └────────────────────────┘  └──────────────────────────────────┘
                                                        │
                                                        ▼
                                ┌───────────────────────────────────────────────┐
                                │       React 19 + Three.js Operating Surfaces  │
                                │  1. 3D Cinematic Platform & Physics Lab       │
                                │  2. Worker Life-Sentinel Sunlight PWA         │
                                │  3. HSE Supervisor Tactical Command Deck      │
                                │  4. AI Swarm & RAG Diagnostics Center         │
                                │  5. 17-Slide H2S Pitch Deck & Portal Package  │
                                └───────────────────────────────────────────────┘
```

---

## 🚀 Key Innovations & Features

### 1. 3D WebGL Solar Thermal Dome & Interactive Physics Simulator
- **60 FPS Three.js Canvas:** Real-time WebGL visualization of the solar thermal radiation shield and metabolic bio-core.
- **Interactive Laboratory:** Sliders for Ambient WBGT ($26^\circ\text{C} \to 38^\circ\text{C}$), Metabolic Workload ($180\text{W} \to 500\text{W}$), and Acclimatization stage, dynamically calculating internal core temperature ($T_{core}$), sweat rate ($L/hr$), and safe work limits.

### 2. Worker Life-Sentinel Sunlight PWA
- **High-Sunlight Contrast UI:** Engineered for legibility under blinding Arabian desert glare while wearing heavy work gloves.
- **5-Language Native Voice Sentinel:** Real-time spoken alerts in **Urdu, Hindi, Tagalog, Bengali, Arabic, and English** with Web Speech synthesis, phonetic guides, and English subtitles.
- **1-Tap Care Acknowledgment Loop:** Rapid one-touch buttons for *"Resting in Shaded Cabin"*, *"Drinking Electrolytes"*, or *"Request Emergency Medic"*.
- **Data Provenance & Privacy Charter:** Explicitly labels *Measured On-Site WBGT* vs *Estimated Model*, and enforces strict data minimization (zero disciplinary use of health data).

### 3. HSE Supervisor Tactical Command Deck
- **Crew Thermal Risk Matrix:** Real-time classification across 5 tiers (Nominal, Caution, Warning, Danger, Emergency).
- **Predictive Early Warning Lead Time:** Identifies workers approaching heat strain limits 5–15 minutes before symptoms appear.
- **1-Click Site Rest Broadcast:** Instantaneous override triggering site-wide hydration and cooling rotations.

### 4. Statutory AI Knowledge Base & RAG Query Console
- **Statutory Corpus:** Vector index containing **Abu Dhabi OSHAD CoP 11.0 (v4.0, July 2024)**, **UAE MOHRE Ministerial Resolution No. 44** (Midday Work Ban: 12:30 PM – 3:00 PM), and **ISO 7933:2004 / ISO 7243:2017**.
- **Real-Time Retrieval:** Answers regulatory inquiries and provides exact statutory citations and mandatory fine references (AED 5,000 to AED 50,000).

### 5. Cryptographically Hashed Audit Trail
- Every supervisor broadcast and worker acknowledgment is stored immutably with a **SHA-256** cryptographic hash in SQLite WAL mode for labor inspections.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, Three.js (WebGL), Lucide React, Web Speech API |
| **Backend** | Python 3.12, FastAPI, Uvicorn, Pydantic V2, NumPy, Scikit-Learn |
| **Database & ORM** | SQLite 3 (WAL Mode) / PostgreSQL compatible, SQLAlchemy 2.0 ORM |
| **AI / Multi-Agent** | LangGraph state machine, TF-IDF + Cosine Vector RAG, SHAP Explainable AI (XAI) |
| **Testing** | Pytest (12 unit & integration tests), Playwright automated browser verification |

---

## 📦 Quickstart & Local Installation

### Prerequisites
- **Python 3.12+**
- **Node.js 18+** and **npm**

### 1. Clone the Repository
```bash
git clone https://github.com/UTHANDAM/HeatGuard.git
cd HeatGuard
```

### 2. Backend Setup
```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# Linux / macOS
source .venv/bin/activate

pip install -r requirements.txt
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```
* Backend Swagger Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
* Health Check: [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health)

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```
* Web Application: [http://127.0.0.1:5173](http://127.0.0.1:5173)

### 4. Running Automated Tests
```bash
cd ../backend
python -m pytest tests -v
```
All **12 unit and integration tests** will execute and pass.

---

## 📋 Hackathon Submission Deliverables

- **Pitch Deck:** Complete 17-slide solution presentation available in [`submission/pitch_deck_slides.md`](submission/pitch_deck_slides.md) and inside the live web app under the **H2S Pitch Deck** tab.
- **Official Portal Answers:** Pre-formatted, character-counted responses for the Hack2skill submission form available in [`submission/H2S_SUBMISSION_FORM.md`](submission/H2S_SUBMISSION_FORM.md).
- **Design Prompts:** Ready-to-copy AI design tool prompts for Stitch, MuAPI, and Framia in [`submission/design_tool_prompts.md`](submission/design_tool_prompts.md).
- **Production Blueprint:** Full engineering plan in [`hackathon-strategy/production-masterplan-blueprint.md`](hackathon-strategy/production-masterplan-blueprint.md).

---

## ⚖️ License & Governance
Developed under the **Future Health Digital Innovation Challenge 2026** for the Abu Dhabi Department of Health and partners. All health data governance strictly adheres to **UAE Federal Health Data Law** and **Abu Dhabi OSHAD CoP 11.0**.
