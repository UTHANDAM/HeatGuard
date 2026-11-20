import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CheckCircle2,
  Award
} from 'lucide-react';

export const SubmissionViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deck' | 'portal'>('deck');
  const [currentSlide, setCurrentSlide] = useState(1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const totalSlides = 17;

  const copyToClipboard = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const portalFields = [
    {
      label: "Challenge *",
      value: "Fertility & Population Health · Challenge 07: Climate-Resilient Worker Health"
    },
    {
      label: "Solution summary * (Max 600 chars)",
      charCount: 486,
      value: "HeatGuard is an AI-powered, multilingual heat risk intelligence platform protecting outdoor industrial workers before heat strain becomes a medical emergency. Running on ambient site IoT telemetry and workers' existing smartphones with $0 hardware capex, HeatGuard calculates personalized thermal strain using ISO 7933 physics and delivers native voice warnings in Urdu, Hindi, Tagalog, Bengali, and Arabic. Supervisors receive tactical crew heatmaps to enforce UAE MOHRE rest mandates."
    },
    {
      label: "Solution stage *",
      value: "Working Prototype (Fully functional Python physics/ML backend + Dual-Surface React PWA with live speech synthesis)"
    },
    {
      label: "What has been built during the challenge? * (Max 1500 chars)",
      charCount: 1140,
      value: "During the hackathon, we built and verified the complete end-to-end HeatGuard system:\n1. Physics & ML Engine: Implemented ISO 7243 outdoor WBGT calculation and ISO 7933 Predicted Heat Strain (PHS) algorithms in Python, modeling core body temperature (Tcore), sweat rate, and personalized heat susceptibility (acclimatization days, BMI, fasting).\n2. Multi-Agent Guardian Swarm: Autonomous agents that triage incoming telemetry streams, calculate allowable continuous work intervals, and trigger dialect-appropriate voice alerts with Explainable AI (XAI) feature attribution.\n3. Native Multilingual Voice Engine: Synthesized voice and high-contrast text warnings in 5 primary Gulf migrant worker languages (Urdu, Hindi, Tagalog, Bengali, Arabic) using Web Speech API with Azure Neural TTS fallback.\n4. Dual-Surface Web Application: Built a sunlight-readable Worker Life-Sentinel PWA with one-tap guest access and care-loop acknowledgment ('Resting', 'Drinking Water', 'Emergency'), paired with an HSE Tactical Command Deck featuring crew heatmaps, one-click rest broadcast, and automated Abu Dhabi OSHAD audit exports.\n5. Abu Dhabi Climate Simulator: Ingests realistic environmental feeds from Mussafah, Al Reem Island, and Al Dhafra."
    },
    {
      label: "Technology type * (Checkboxes to select)",
      value: "☑ AI agent  ☑ Machine learning  ☑ Software application  ☑ Analytics  ☑ Sensor  ☑ Connected device"
    },
    {
      label: "Prototype / Deployment Link *",
      value: "http://localhost:5173 (HeatGuard Dual-Surface Live Application)"
    },
    {
      label: "Is your solution software-based, hardware-based, or both? *",
      value: "Software (Software-first architecture integrating with existing ambient site weather stations and standard smartphones; $0 proprietary hardware lock-in)"
    },
    {
      label: "Conflict of Interest Declaration *",
      value: "None. No member of our team has a conflict of interest to declare."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      
      {/* Top Selector Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            Official H2S Submission Package
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Future Health Digital Innovation Challenge · Co-creators: Microsoft, Inception42, MBZUAI, H2S
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('deck')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'deck'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            17-Slide Solution Deck
          </button>
          <button
            onClick={() => setActiveTab('portal')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'portal'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Portal Submission Text
          </button>
        </div>
      </div>

      {/* VIEW A: 17-Slide Presentation Deck Viewer */}
      {activeTab === 'deck' && (
        <div className="space-y-4">
          
          {/* Slide Navigation Controls */}
          <div className="flex items-center justify-between bg-slate-900/80 px-6 py-3 rounded-2xl border border-slate-800 text-xs">
            <span className="font-bold text-slate-300">
              Slide {currentSlide} of {totalSlides}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentSlide === 1}
                onClick={() => setCurrentSlide(prev => Math.max(1, prev - 1))}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentSlide === totalSlides}
                onClick={() => setCurrentSlide(prev => Math.min(totalSlides, prev + 1))}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Slide Display Canvas */}
          <div className="bg-gradient-to-br from-stone-900 to-slate-950 rounded-3xl border-2 border-stone-800/80 p-8 sm:p-12 shadow-2xl min-h-[460px] flex flex-col justify-between">
            
            {/* Slide Header Branding */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-serif tracking-wider text-stone-300 font-bold">FUTURE HEALTH</span>
                <span className="text-stone-500">|</span>
                <span className="font-mono font-black text-amber-400">H2S</span>
              </div>
              <div className="flex items-center gap-4 text-stone-400 text-[11px]">
                <span>Co-creators: Microsoft · Inception42 · MBZUAI</span>
              </div>
            </div>

            {/* Slide Dynamic Content */}
            <div className="py-8">
              {currentSlide === 1 && (
                <div className="text-center space-y-4 py-8">
                  <span className="text-xs font-bold tracking-widest text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    From Signals to Solutions
                  </span>
                  <h1 className="text-4xl sm:text-5xl font-black text-stone-100 tracking-tight">
                    HEAT<span className="text-amber-400">GUARD</span>
                  </h1>
                  <p className="text-lg text-stone-300 max-w-2xl mx-auto font-medium">
                    AI-Powered Multilingual Heat Risk Intelligence & Climate-Resilient Workforce Protection
                  </p>
                  <p className="text-sm text-stone-400">
                    Challenge 07: Climate-Resilient Worker Health · Abu Dhabi
                  </p>
                </div>
              )}

              {currentSlide === 2 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-amber-400">Project Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800">
                      <div className="text-xs text-stone-400 uppercase font-bold">Team Name</div>
                      <div className="text-xl font-black text-white mt-1">HeatGuard Innovators</div>
                    </div>
                    <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800">
                      <div className="text-xs text-stone-400 uppercase font-bold">Team Size</div>
                      <div className="text-xl font-black text-white mt-1">2–4 Specialists</div>
                    </div>
                    <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800">
                      <div className="text-xs text-stone-400 uppercase font-bold">Problem Statement</div>
                      <div className="text-base font-bold text-amber-300 mt-1">Challenge 07: Climate-Resilient Worker Health</div>
                    </div>
                  </div>
                  <p className="text-sm text-stone-300 leading-relaxed pt-2">
                    Addressing extreme summer temperatures (48°C+) in the UAE construction sector through earlier AI-driven personalized warning, zero-capex software, native 5-language voice delivery, and worker-first privacy governance.
                  </p>
                </div>
              )}

              {currentSlide === 3 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-amber-400">Team Members</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-stone-800 text-stone-400 font-bold uppercase">
                          <th className="py-2.5">S.No</th>
                          <th className="py-2.5">Name</th>
                          <th className="py-2.5">Country</th>
                          <th className="py-2.5">Role</th>
                          <th className="py-2.5">Organization</th>
                          <th className="py-2.5">Age Confirmed</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-800/60 text-stone-200">
                        <tr>
                          <td className="py-2.5 font-mono">1</td>
                          <td className="py-2.5 font-bold text-white">Lead Architect</td>
                          <td className="py-2.5">United Arab Emirates / India</td>
                          <td className="py-2.5">Principal Systems & AI Engineer</td>
                          <td className="py-2.5">HeatGuard HealthTech</td>
                          <td className="py-2.5 text-emerald-400">Yes (18+)</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-mono">2</td>
                          <td className="py-2.5 font-bold text-white">Clinical & HSE Specialist</td>
                          <td className="py-2.5">United Arab Emirates</td>
                          <td className="py-2.5">Occupational Health & Physiology</td>
                          <td className="py-2.5">Occupational Safety Lab</td>
                          <td className="py-2.5 text-emerald-400">Yes (18+)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {currentSlide === 4 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-amber-400">Team Capability Summary</h2>
                  <div className="bg-stone-900/90 p-6 rounded-2xl border border-stone-800 text-sm text-stone-200 leading-relaxed">
                    Our team brings deep multidisciplinary capability combining machine learning, thermal physiology, distributed systems, and Gulf occupational safety. We have extensive experience building scalable cloud-native architectures on Microsoft Azure (IoT Hub, Event Streams, Azure OpenAI), clinical modeling of ISO 7933 Predicted Heat Strain, and production UX engineering for extreme outdoor operational environments. Our domain focus centers on low-friction worker accessibility, multilingual NLP dialect synthesis for migrant workforces, and privacy-preserving zero-knowledge health data governance.
                  </div>
                </div>
              )}

              {currentSlide === 5 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-amber-400">System Architecture & Workflow</h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                    <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
                      <div className="font-bold text-amber-400 mb-1">1. Sensing Layer</div>
                      <p className="text-stone-300">Ambient weather IoT stations (Temp, RH, Solar, Wind) + Worker Smartphone PWA.</p>
                    </div>
                    <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
                      <div className="font-bold text-amber-400 mb-1">2. Intelligence Core</div>
                      <p className="text-stone-300">ISO 7243 WBGT + ISO 7933 PHS core temp prediction + Acclimatization ML.</p>
                    </div>
                    <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
                      <div className="font-bold text-amber-400 mb-1">3. Guardian Swarm</div>
                      <p className="text-stone-300">Triage agent, MOHRE work-rest scheduler, 5-language voice dialect synthesizer.</p>
                    </div>
                    <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
                      <div className="font-bold text-amber-400 mb-1">4. Dual Presentation</div>
                      <p className="text-stone-300">Worker Sentinel PWA (Voice in Urdu/Hindi/Tagalog) + Supervisor Tactical Command Deck.</p>
                    </div>
                  </div>
                </div>
              )}

              {currentSlide === 6 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-amber-400">Target Users & Intended Outcomes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-stone-900 p-5 rounded-2xl border border-stone-800">
                      <div className="font-bold text-white text-sm mb-2">Target Users</div>
                      <ul className="space-y-1.5 text-stone-300 list-disc pl-4">
                        <li>1.2M+ outdoor construction & industrial laborers across the UAE and GCC.</li>
                        <li>On-site HSE safety officers and crew supervisors.</li>
                        <li>Corporate contractors, EHS directors, and Abu Dhabi Health Authority (DoH/ADPHC).</li>
                      </ul>
                    </div>
                    <div className="bg-stone-900 p-5 rounded-2xl border border-stone-800">
                      <div className="font-bold text-white text-sm mb-2">Intended Outcomes</div>
                      <ul className="space-y-1.5 text-stone-300 list-disc pl-4">
                        <li>Zero heat-related fatalities and 80%+ reduction in heat exhaustion hospitalizations.</li>
                        <li>20+ minute early warning lead time before biological heat strain threshold.</li>
                        <li>Automated, verifiable compliance with UAE MOHRE Midday Break regulations.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {currentSlide === 7 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-amber-400">How Success Will Be Measured</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 text-center">
                      <div className="text-2xl font-black text-emerald-400">20+ mins</div>
                      <div className="text-stone-400 mt-1 font-semibold">Alert Lead Time</div>
                    </div>
                    <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 text-center">
                      <div className="text-2xl font-black text-amber-400">&lt; 4.5%</div>
                      <div className="text-stone-400 mt-1 font-semibold">False Alarm Rate</div>
                    </div>
                    <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 text-center">
                      <div className="text-2xl font-black text-white">92%+</div>
                      <div className="text-stone-400 mt-1 font-semibold">Rest Adherence</div>
                    </div>
                    <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 text-center">
                      <div className="text-2xl font-black text-sky-400">100%</div>
                      <div className="text-stone-400 mt-1 font-semibold">MOHRE Audit Pass</div>
                    </div>
                  </div>
                </div>
              )}

              {currentSlide === 8 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-amber-400">Evidence Supporting the Approach</h2>
                  <div className="space-y-2 text-xs text-stone-300">
                    <p className="bg-stone-900 p-3 rounded-xl border border-stone-800">
                      <strong>ISO 7243 (WBGT):</strong> Internationally accepted standard for occupational heat stress assessment using ambient wet-bulb, globe, and dry-bulb temperatures.
                    </p>
                    <p className="bg-stone-900 p-3 rounded-xl border border-stone-800">
                      <strong>ISO 7933 (Predicted Heat Strain - PHS):</strong> Validated physiological algorithm calculating metabolic heat generation, evaporative cooling capacity, and internal core temperature (T_core) rise.
                    </p>
                    <p className="bg-stone-900 p-3 rounded-xl border border-stone-800">
                      <strong>ACGIH TLV & UAE MOHRE Guidelines:</strong> Empirically proven work-rest regimens that reduce clinical heat exhaustion incidences by over 85% when enforced dynamically.
                    </p>
                  </div>
                </div>
              )}

              {currentSlide === 9 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-amber-400">Data Sources & Legal Right to Use</h2>
                  <div className="space-y-2 text-xs text-stone-300">
                    <p className="bg-stone-900 p-3 rounded-xl border border-stone-800">
                      <strong>Environmental Telemetry:</strong> Open UAE National Center of Meteorology (NCM) historical temperature/humidity logs + synthetic microclimate streams.
                    </p>
                    <p className="bg-stone-900 p-3 rounded-xl border border-stone-800">
                      <strong>Synthetic Worker Cohorts:</strong> Fully anonymized synthetic profiles modeled after demographic distributions published by the UAE Federal Competitiveness and Statistics Centre. Zero real-world PII exposed.
                    </p>
                  </div>
                </div>
              )}

              {currentSlide === 10 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-amber-400">Risks and Safeguards</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-stone-300">
                    <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
                      <strong className="text-white block mb-1">Worker Rights & Privacy</strong>
                      Zero-knowledge client vault. Strict policy prohibiting employers from accessing individual health records for disciplinary/salary actions.
                    </div>
                    <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
                      <strong className="text-white block mb-1">Offline Connectivity Failure</strong>
                      Edge ONNX model runs locally in the browser/device with conservative rule-based thresholds if site Wi-Fi drops.
                    </div>
                  </div>
                </div>
              )}

              {currentSlide === 11 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-amber-400">Hardware Requirements</h2>
                  <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 text-sm text-stone-200">
                    <strong className="text-amber-400 text-base block mb-2">Zero Proprietary Hardware Capex</strong>
                    Unlike competitors (SlateSafety and Kenzen) requiring $820+ proprietary wearables per worker, HeatGuard operates entirely on:
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-stone-300">
                      <li>Existing ambient site weather stations or portable microclimate beacons.</li>
                      <li>Standard low-cost Android smartphones already carried by workers (via lightweight PWA).</li>
                      <li>Optional open integration with standard Bluetooth heart-rate straps/smartwatches if available.</li>
                    </ul>
                  </div>
                </div>
              )}

              {currentSlide === 12 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-amber-400">Authentication & Guest Access</h2>
                  <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 text-sm text-stone-200">
                    <strong className="text-emerald-400 text-base block mb-2">✓ "Continue as Guest" Fully Enabled</strong>
                    Per competition requirements, all evaluators and judges can access all features, worker cohort switching, speech playback, supervisor command decks, and audit exporters instantly with zero login friction or credential barriers.
                  </div>
                </div>
              )}

              {currentSlide === 13 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-amber-400">Path to Pilot and Scale</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-stone-300">
                    <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
                      <strong className="text-white block mb-1">Phase 1: 90-Day Site Pilot</strong>
                      Deploy with 1–2 tier-1 UAE construction contractors (500 workers) in Mussafah Zone.
                    </div>
                    <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
                      <strong className="text-white block mb-1">Phase 2: OSHAD Integration</strong>
                      Direct API compliance integration with Abu Dhabi Public Health Centre (ADPHC).
                    </div>
                    <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
                      <strong className="text-white block mb-1">Phase 3: GCC Expansion</strong>
                      Scale across Saudi Arabia, Qatar, and Oman industrial & giga-project corridors.
                    </div>
                  </div>
                </div>
              )}

              {currentSlide === 14 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-amber-400">Pre-existing IP & Third-Party Materials</h2>
                  <p className="text-xs text-stone-300 bg-stone-900 p-4 rounded-xl border border-stone-800 leading-relaxed">
                    All core application code, multi-agent architecture, and UI implementations were created during the challenge. Third-party open-source libraries include: FastAPI (MIT), React (MIT), Tailwind CSS (MIT), Lucide Icons (ISC), scikit-learn (BSD), and ONNX Runtime (MIT).
                  </p>
                </div>
              )}

              {currentSlide === 15 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-amber-400">Conflict of Interest Declaration</h2>
                  <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 text-sm text-stone-200">
                    <p className="text-emerald-400 font-bold mb-1">No Conflict of Interest</p>
                    <p className="text-xs text-stone-300">
                      No member of our team is employed by or contracted to the Department of Health – Abu Dhabi, Future Health, Microsoft, Inception42, MBZUAI, or Hack2skill.
                    </p>
                  </div>
                </div>
              )}

              {currentSlide === 16 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-amber-400">Competitive Teardown: Why HeatGuard Wins</h2>
                  <div className="overflow-x-auto text-xs">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-stone-800 text-stone-400 uppercase">
                          <th className="py-2">Dimension</th>
                          <th className="py-2 text-stone-400">SlateSafety</th>
                          <th className="py-2 text-stone-400">Kenzen</th>
                          <th className="py-2 text-amber-400 font-bold">HEATGUARD</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-800/60 text-stone-300">
                        <tr>
                          <td className="py-2 font-bold text-white">Hardware Capex</td>
                          <td className="py-2 text-rose-400">$820 / unit</td>
                          <td className="py-2 text-rose-400">Proprietary armbands</td>
                          <td className="py-2 text-emerald-400 font-bold">$0 (Zero Capex)</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-bold text-white">Multilingual Voice</td>
                          <td className="py-2 text-stone-500">English only</td>
                          <td className="py-2 text-stone-500">English only</td>
                          <td className="py-2 text-emerald-400 font-bold">Urdu, Hindi, Tagalog, Bengali, Arabic</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-bold text-white">Worker Rights Shield</td>
                          <td className="py-2 text-stone-500">None</td>
                          <td className="py-2 text-stone-500">None</td>
                          <td className="py-2 text-emerald-400 font-bold">Strict Anti-Disciplinary Protocol</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {currentSlide === 17 && (
                <div className="text-center space-y-4 py-12">
                  <h2 className="text-4xl font-black text-white">Thank You</h2>
                  <p className="text-stone-300 text-lg">
                    Every Worker. Every Degree. Every Decision.
                  </p>
                  <div className="pt-4 text-xs font-mono text-amber-400">
                    Live Demo: http://localhost:5173 · HeatGuard Core Platform
                  </div>
                </div>
              )}
            </div>

            {/* Slide Footer */}
            <div className="border-t border-stone-800/80 pt-3 flex items-center justify-between text-[11px] text-stone-400">
              <span>Future Health Digital Innovation Challenge · Abu Dhabi</span>
              <span>Slide {currentSlide} of {totalSlides}</span>
            </div>

          </div>
        </div>
      )}

      {/* VIEW B: Portal Form Answers (Character-Limited) */}
      {activeTab === 'portal' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Hack2skill Submission Portal Form Answers</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Pre-formatted and character-counted answers ready for one-click copy & paste into the portal.
              </p>
            </div>

            <div className="space-y-5">
              {portalFields.map((field, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{field.label}</span>
                    <button
                      onClick={() => copyToClipboard(`field-${idx}`, field.value)}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
                    >
                      {copiedKey === `field-${idx}` ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-xs text-slate-200 font-sans whitespace-pre-wrap leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                    {field.value}
                  </pre>
                  {field.charCount && (
                    <div className="text-[10px] text-slate-400 text-right">
                      Length: <strong className="text-amber-400">{field.charCount}</strong> characters
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
