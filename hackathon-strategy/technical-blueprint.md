# 🛡️ HEATGUARD — TECHNICAL BLUEPRINT & SYSTEM ARCHITECTURE
## Principal Architecture & Engineering Specification
### Target: Future Health Digital Innovation Challenge (Abu Dhabi)
### Problem Statement: Challenge 07 — Climate-Resilient Worker Health

---

## 1. Executive Product Definition

| Dimension | Specification |
|---|---|
| **Product Name** | **HeatGuard** |
| **System Category** | AI-Powered Multilingual Heat Risk Intelligence & Workforce Protection Platform |
| **Primary End-Users** | 1. Outdoor Migrant Construction & Industrial Workers (Urdu, Hindi, Tagalog, Bengali, Arabic)<br>2. On-Site HSE Supervisors & Safety Officers<br>3. Corporate HSE Directors & Abu Dhabi Health Authority (DoH/OSHAD) Regulators |
| **Core Value Proposition** | Zero Heat Fatalities. Zero Hardware Capex ($0 vs $820+ competitors). Native Voice-First Multilingual Warnings. Real-Time Explainable AI (XAI) Early Warning 20+ Minutes Before Clinical Strain. |
| **Sponsor Alignment** | Microsoft Azure IoT & OpenAI Native · Inception42 Applied AI · MBZUAI Clinical-AI Rigor |

---

## 2. End-to-End System Architecture

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              FIELD & SENSING LAYER                                     │
│  ┌────────────────────────┐  ┌────────────────────────┐  ┌───────────────────────────┐ │
│  │ Ambient Weather Station│  │ Portable Site Beacon   │  │ Worker Smartphone PWA     │ │
│  │ (Temp, Humidity, Solar)│  │ (Micro-climate Sensors)│  │ (Self-Report & Hydration) │ │
│  └───────────┬────────────┘  └───────────┬────────────┘  └─────────────┬─────────────┘ │
└──────────────┼───────────────────────────┼─────────────────────────────┼───────────────┘
               ▼                           ▼                             ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                      INGESTION & STREAM PROCESSING (Azure Native)                      │
│  • Azure IoT Hub / Event Hub Telemetry Ingestion (MQTT / HTTPS)                        │
│  • Time-Series Event Buffer & Anomaly Cleansing (Windowed rolling averages)            │
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                      INTELLIGENCE & MULTI-AGENT GUARDIAN CORE                          │
│                                                                                        │
│   ┌────────────────────────┐    ┌────────────────────────┐   ┌───────────────────────┐ │
│   │ 1. Physics Engine      │    │ 2. Predictive ML Model │   │ 3. XAI Attribution    │ │
│   │ ISO 7243 WBGT +        │───►│ Personalized Thermal   │──►│ Dynamic Risk Factors  │ │
│   │ ISO 7933 Heat Strain   │    │ Tolerance Classifier   │   │ (SHAP-style weights)  │ │
│   └────────────────────────┘    └────────────────────────┘   └───────────────────────┘ │
│                                              │                                         │
│                                              ▼                                         │
│   ┌──────────────────────────────────────────────────────────────────────────────────┐ │
│   │ 4. Autonomous Guardian Agent Swarm                                               │ │
│   │  • Triage Agent: Real-time risk threshold evaluation                             │ │
│   │  • Escalation Agent: MOHRE/OSHA Work-Rest cycle calculator                       │ │
│   │  • Dialect Synthesis Agent: Azure OpenAI + Web Speech 5-Language Generator       │ │
│   └──────────────────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                            DUAL-SURFACE PRESENTATION LAYER                             │
│                                                                                        │
│   ┌─────────────────────────────────────────┐ ┌──────────────────────────────────────┐ │
│   │ SURFACE A: Worker Life-Sentinel PWA     │ │ SURFACE B: HSE Tactical Command Deck │ │
│   │ • High-Contrast Direct Sunlight UI      │ │ • Live Crew Thermal Risk Map         │ │
│   │ • One-Tap Guest Access (No barriers)    │ │ • Early Warning Telemetry Timeline   │ │
│   │ • Native Audio Voice in 5 Languages     │ │ • Automated Dispatch of Rest Breaks  │ │
│   │ • Worker-First Zero-Surveillance Vault  │ │ • OSHAD/MOHRE Regulatory Audit Logs  │ │
│   └─────────────────────────────────────────┘ └──────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Technology Stack Selection & Rationale

| Layer | Chosen Technology | Architectural Justification |
|---|---|---|
| **Backend Framework** | **Python 3.11 + FastAPI** | High-performance asynchronous execution, native scientific computing (NumPy, SciPy), automatic OpenAPI/Swagger documentation, instant WebSockets for live telemetry. |
| **Physics & Math** | **ISO 7243 / ISO 7933 PHS Algorithms** | Clinically validated thermal strain equations used by international labor organizations. Avoids "black box" hallucination. |
| **Machine Learning** | **Scikit-Learn / XGBoost + ONNX Runtime** | Lightweight, interpretable gradient boosting for personal thermal tolerance. ONNX model enables **client-side offline inference** when site WiFi drops. |
| **Agent & NLP Core** | **Azure OpenAI / Multi-Agent Guardian Orchestration** | Context-aware alert phrasing, culturally empathetic tone, and instant multilingual formatting (Urdu, Hindi, Tagalog, Bengali, Arabic). |
| **Speech Engine** | **Web Speech API + Azure Neural TTS Fallback** | Zero-latency, zero-cost audio synthesis in the browser for extreme outdoor environments where workers cannot read screens in the sun. |
| **Frontend Framework** | **React 18 + Vite + TypeScript + Tailwind CSS** | Ultra-responsive, sub-second hot reload, robust type safety, lightweight bundle (<150KB gzip) critical for low-tier Android phones on 3G networks. |
| **Component System** | **Lucide Icons + Custom High-Contrast Tokens** | Tailored for 100,000 lux desert sunlight legibility with distinct colorblind-safe alert states. |
| **Database & Cache** | **SQLite (Dev) / Azure Cosmos DB (Prod Schema)** | Zero-config, ACID-compliant local development with complete JSON document schema parity for cloud deployment. |

---

## 4. The 5 Dialects of Protection (Linguistic Moat)

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ Alert Level: ORANGE (High Heat Risk Warning - 43.5°C Ambient, WBGT 33.2°C)           │
├───────────┬──────────────────────────────────────────────────────────────────────────┤
│ Language  │ Synthesized Voice Script & Text Notification                             │
├───────────┼──────────────────────────────────────────────────────────────────────────┤
│ Urdu      │ "خبردار! آپ کے جسم کا درجہ حرارت تیزی سے بڑھ رہا ہے۔ براہ کرم 15 منٹ     │
│           │ کے لیے سائے میں آرام کریں اور پانی پیئیں۔"                                │
├───────────┼──────────────────────────────────────────────────────────────────────────┤
│ Hindi     │ "सावधान! आपके शरीर का तापमान बढ़ रहा है। कृपया 15 मिनट के लिए छांव में   │
│           │ आराम करें और ठंडा पानी पिएं।"                                            │
├───────────┼──────────────────────────────────────────────────────────────────────────┤
│ Tagalog   │ "Babala! Mabilis na tumataas ang init ng iyong katawan. Mangyaring       │
│           │ magpahinga sa lilim ng 15 minuto at uminom ng tubig."                    │
├───────────┼──────────────────────────────────────────────────────────────────────────┤
│ Bengali   │ "সতর্কতা! আপনার শরীরের তাপমাত্রা দ্রুত বাড়ছে। অনুগ্রহ করে ১৫ মিনিটের     │
│           │ জন্য ছায়ায় বিশ্রাম নিন এবং জল পান করুন।"                               │
├───────────┼──────────────────────────────────────────────────────────────────────────┤
│ Arabic    │ "تحذير! حرارة جسمك ترتفع بسرعة. يُرجى التوجه إلى منطقة الظل والراحة لمدة │
│           │ 15 دقيقة وشرب الماء فوراً."                                              │
└───────────┴──────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Development Roadmap & Milestone Breakdown

- **Milestone 1: Project Scaffolding & Data Contracts** (Backend + Frontend base + TypeScript types)
- **Milestone 2: Clinical Physics & Machine Learning Risk Engine** (ISO 7243 WBGT, ISO 7933 PHS, XAI Attribution)
- **Milestone 3: Abu Dhabi IoT Desert Climate Simulator** (Mussafah Industrial & Al Reem Island dynamic weather streams)
- **Milestone 4: Guardian Multi-Agent Core & 5-Language Voice Engine** (Triage, Escalation, Speech generation)
- **Milestone 5: Worker PWA (Personal Sentinel)** (Direct sunlight UI, guest mode, audio playback, acknowledgment loop)
- **Milestone 6: HSE Supervisor Command Deck** (Crew heatmap, zone monitoring, rest dispatch, OSHAD audit exporter)
- **Milestone 7: Integration & End-to-End Verification** (Full automated pipeline test)
- **Milestone 8: Official H2S Submission Package** (17-Slide Solution Deck + Character-limited submission form)
