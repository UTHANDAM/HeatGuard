# HeatGuard

- **What it is:** An AI-powered, multilingual heat risk intelligence platform that delivers personalized, real-time heat danger warnings to outdoor construction workers before heat strain becomes a medical emergency.
- **Who it is for:** Outdoor and industrial workers (construction, logistics) in UAE/Abu Dhabi — primarily migrant workers speaking Urdu, Hindi, Tagalog, Bengali, Arabic — and their supervisors and HSE departments.
- **What it sells, at what price:** B2B SaaS platform — AED 50/worker/month (approx. USD 14/worker/month). A 1,000-worker construction site = AED 50,000/month.
- **Where and how:** Online (PWA for workers, web dashboard for supervisors). Sold directly to construction companies, logistics firms, and industrial operators in UAE. No proprietary hardware — integrates with existing environmental sensors and optionally with consumer wearables (Apple Watch, Garmin).
- **Budget and constraints:** Hackathon prototype built in 36–48 hours. Azure cloud stack (Microsoft is co-creator of the hackathon). Team of 2–4 engineers.
- **Core differentiators:**
  1. Personalized AI risk model — same temperature, different risk for different workers based on acclimatization, age, BMI, health flags
  2. Multilingual voice + text alerts in 5 languages: Arabic, Urdu, Hindi, Tagalog, Bengali
  3. Worker-first governance — data cannot be used for disciplinary/employment decisions
  4. Offline-resilient edge operation — ONNX fallback when connectivity fails
  5. XAI (explainable AI) — worker and supervisor sees WHY the alert fired
- **Market:** UAE construction sector employs ~1.2M workers. UAE summer temperatures exceed 48°C. Heat illness is a known occupational crisis. UAE Ministry of HR enforces outdoor work bans June–September.
- **Technology:** Azure IoT Hub, Azure Stream Analytics, Azure OpenAI GPT-4o, FastAPI backend, React PWA, Power BI dashboards, ONNX edge fallback, Azure Cognitive Services (Translator + TTS).
