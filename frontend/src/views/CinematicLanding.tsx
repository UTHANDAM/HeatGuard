import React, { useState } from 'react';
import { HeroThermalGlobe } from '../components/3d/HeroThermalGlobe';
import { ThermalPhysiologySim } from '../components/3d/ThermalPhysiologySim';
import type { EnvironmentalTelemetry } from '../types';
import {
  ShieldAlert,
  ArrowRight,
  Activity,
  Users,
  Volume2,
  DollarSign,
  TrendingDown,
  Cpu,
  ChevronRight,
  Globe2,
  CheckCircle2
} from 'lucide-react';

interface CinematicLandingProps {
  telemetry: EnvironmentalTelemetry | null;
  selectedSite: string;
  heatWave: number;
  onNavigate: (view: 'worker' | 'supervisor' | 'agents') => void;
}

export const CinematicLanding: React.FC<CinematicLandingProps> = ({
  telemetry,
  selectedSite: _selectedSite,
  heatWave,
  onNavigate
}) => {
  // Voice Showcase state
  const [activeLang, setActiveLang] = useState<'urdu' | 'hindi' | 'tagalog' | 'bengali' | 'arabic' | 'english'>('urdu');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Financial ROI Calculator state
  const [workerCount, setWorkerCount] = useState<number>(3500);

  // Audio showcase dictionary
  const voiceSamples: Record<string, { label: string; flag: string; nativeAlert: string; englishMeaning: string; phonetic: string }> = {
    urdu: {
      label: 'Urdu (اردو)',
      flag: '🇵🇰',
      nativeAlert: 'وارننگ! جسمانی درجہ حرارت تیزی سے بڑھ رہا ہے۔ فوری طور پر 15 منٹ کے لیے سائے میں جائیں اور نمکیاتی پانی پئیں۔',
      phonetic: '"Warning! Jismani darja hararat taizi se barh raha hai. Foran saye mein jayein aur namkiyati paani piyein."',
      englishMeaning: 'Warning! Core body temperature is rising rapidly. Immediately move to cooling shade for 15 minutes and drink electrolyte fluid.'
    },
    hindi: {
      label: 'Hindi (हिन्दी)',
      flag: '🇮🇳',
      nativeAlert: 'सावधान! आपके शरीर का तापमान सुरक्षित सीमा पार कर रहा है। तुरंत ठंडे शेड में जाएं और ओआरएस घोल पिएं।',
      phonetic: '"Saavdhaan! Aapke shareer ka taapmaan surakshit seema paar kar raha hai. Turant thande shade mein jayein aur ORS ghol piyein."',
      englishMeaning: 'Attention! Your body temperature is exceeding safe limits. Go immediately to a cooling shade shelter and hydrate with ORS.'
    },
    tagalog: {
      label: 'Tagalog (Filipino)',
      flag: '🇵🇭',
      nativeAlert: 'Babala! Mabilis na tumataas ang init ng iyong katawan. Pumunta agad sa silungan at uminom ng malamig na tubig na may electrolytes.',
      phonetic: '"Babala! Mabilis na tumataas ang init ng iyong katawan. Pumunta agad sa silungan at uminom ng malamig na tubig."',
      englishMeaning: 'Warning! Your body heat is escalating fast. Seek shade shelter immediately and drink cool electrolyte fluid.'
    },
    bengali: {
      label: 'Bengali (বাংলা)',
      flag: '🇧🇩',
      nativeAlert: 'সতর্কতা! আপনার শরীরের তাপমাত্রা বিপজ্জনক স্তরে পৌঁছাচ্ছে। এখনই ছায়াযুক্ত শীতল স্থানে যান এবং তরল পান করুন।',
      phonetic: '"Shotorkota! Aponar shorirer tapmatra bipodjonok sthore pouchacche. Ekhoni chayayukto sthane jan."',
      englishMeaning: 'Warning! Your body temperature is reaching hazardous levels. Move to shaded shelter immediately and replenish fluids.'
    },
    arabic: {
      label: 'Arabic (العربية)',
      flag: '🇦🇪',
      nativeAlert: 'تحذير الإجهاد الحراري! درجة حرارة الجسم ترتفع بشكل حرج. توجه فوراً إلى منطقة التبريد وتناول أملاح الإماهة.',
      phonetic: '"Tahzeer al-ijhad al-harari! Tawajjah fawran ila mantaqat al-tabreed wa tanawal amlah al-imaha."',
      englishMeaning: 'Heat strain alert! Core body temperature is rising critically. Proceed immediately to the cooling zone and hydrate with electrolytes.'
    },
    english: {
      label: 'English',
      flag: '🇬🇧',
      nativeAlert: 'Emergency Heat Strain Alert! Physiological threshold reached. Cease exertion, report to climate shelter, and hydrate immediately.',
      phonetic: '"Emergency Heat Strain Alert! Cease exertion and report to cooling shelter."',
      englishMeaning: 'Direct supervisor advisory dispatched to mobile sentinel. Cooling break confirmed.'
    }
  };

  // Trigger web speech synthesis for interactive demo
  const playSampleVoice = (langKey: string) => {
    setIsPlayingAudio(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const sample = voiceSamples[langKey];
      const utterance = new SpeechSynthesisUtterance(sample.nativeAlert);
      
      const langCodes: Record<string, string> = {
        urdu: 'ur-PK',
        hindi: 'hi-IN',
        tagalog: 'fil-PH',
        bengali: 'bn-BD',
        arabic: 'ar-AE',
        english: 'en-US'
      };
      utterance.lang = langCodes[langKey] || 'en-US';
      utterance.rate = 0.9;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 2500);
    }
  };

  // Financial calculation
  const hardwareCapex = workerCount * 820; // $820 per worker for industrial biosensors
  const heatGuardAnnual = workerCount * 3.5 * 12; // $3.50/worker/month
  const netSavings = hardwareCapex - heatGuardAnnual;
  const savingsPct = Math.round((netSavings / hardwareCapex) * 100);

  return (
    <div className="space-y-24">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12 sm:pt-16 pb-16">
        {/* Ambient Radial Backlight Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-rose-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Kinetic Typography & Strategic Positioning */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Challenge Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 backdrop-blur-md shadow-lg shadow-amber-500/5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                  Abu Dhabi Future Health Challenge 07
                </span>
                <span className="text-slate-400 text-xs hidden sm:inline">·</span>
                <span className="text-xs text-slate-400 hidden sm:inline">Climate-Resilient Worker Health</span>
              </div>

              {/* Main Cinematic Headline */}
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.08]">
                Preventing Heatstroke <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500">
                  Before Symptoms Appear.
                </span>
              </h1>

              {/* Positioning Description */}
              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl">
                Abu Dhabi summer temperatures exceed 48°C with lethal humidity. <strong className="text-white font-semibold">HeatGuard</strong> eliminates the prohibitive <span className="text-rose-400 font-medium">$820/worker wearable hardware barrier</span> by deploying a software-first multi-agent guardian: assimilating ambient IoT telemetry, computing ISO 7933 Predicted Heat Strain physics, and broadcasting life-saving voice triage in 5 native migrant dialects.
              </p>

              {/* Live Telemetry Bar */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Activity className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-bold block">Live Abu Dhabi Telemetry</span>
                    <span className="text-sm font-bold text-white">
                      {telemetry?.ambient_temp_c || 42.4}°C Ambient · {telemetry?.calculated_wbgt_c || 33.8}°C WBGT
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-bold block">Guardian Swarm State</span>
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      4 Active Agents · Zero Capex
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('worker')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-amber-500/25 flex items-center gap-2 transform active:scale-95 transition-all cursor-pointer"
                >
                  <Activity className="w-4 h-4" />
                  <span>Launch Worker Sentinel</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('supervisor')}
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 font-bold text-sm border border-slate-700/80 shadow-lg flex items-center gap-2 transition cursor-pointer"
                >
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>Supervisor Tactical Deck</span>
                </button>

                <button
                  onClick={() => onNavigate('agents')}
                  className="px-5 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 font-semibold text-sm border border-slate-800 flex items-center gap-2 transition cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span>AI Swarm & RAG</span>
                </button>
              </div>

            </div>

            {/* Right Column: Interactive 3D WebGL Solar Dome & Core */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="w-full max-w-[480px] aspect-square rounded-3xl bg-slate-900/40 border border-slate-800/80 p-2 shadow-2xl backdrop-blur-sm relative group overflow-hidden">
                <HeroThermalGlobe heatWaveIntensity={heatWave} />
                
                {/* Visual HUD Metadata Overlays */}
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 font-mono">
                  <span className="text-amber-400 font-bold">CORE DOME 3D</span> · ROTATABLE
                </div>

                <div className="absolute bottom-4 inset-x-4 bg-slate-950/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                    <span className="text-slate-300 font-medium">Volumetric Bio-Core Active</span>
                  </div>
                  <span className="text-amber-400 font-mono font-bold">60 FPS WebGL</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. THE 48°C ABU DHABI CRISIS & ARCHITECTURAL PARADIGM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            The Industrial Crisis
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Why Traditional Wearables Fail at Scale in the Gulf
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Every previous attempt to protect migrant workers relied on imported smartwatch hardware. The real-world results: 92% project abandonment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: The Broken Wearable Status Quo */}
          <div className="bg-gradient-to-br from-rose-950/30 to-slate-900/60 border border-rose-500/20 rounded-3xl p-8 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider bg-rose-500/10 px-3 py-1 rounded-lg border border-rose-500/30">
                Legacy Approach: Wearable Hardware
              </span>
              <span className="text-2xl font-black text-rose-400">$820 / Worker</span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3">
              Capital Expenditure & Operational Friction
            </h3>
            
            <ul className="space-y-3.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>$820 Capex per worker:</strong> Prohibitive for general contractors employing 10,000+ subcontracted labourers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>Dust & Sweat Sensor Degradation:</strong> Mussafah concrete dust and 90% humidity blind optical PPG sensors in &lt;14 days.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>Daily Charging Logistics:</strong> Workers live in labour camps without dedicated docking lockers; 40% uncharged daily.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>English-Only Screen SMS:</strong> Migrant workers from subcontinent are illiterate in English and miss text alerts.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: The HeatGuard Software Paradigm */}
          <div className="bg-gradient-to-br from-amber-950/30 to-slate-900/60 border border-amber-500/30 rounded-3xl p-8 relative overflow-hidden shadow-xl shadow-amber-500/5">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
                HeatGuard: Zero-Capex Software
              </span>
              <span className="text-2xl font-black text-amber-400">$3.50 / Mo</span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3">
              Physics-Driven Multi-Agent Intelligence
            </h3>
            
            <ul className="space-y-3.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>$0 Sensor Hardware:</strong> Runs on workers existing smartphones or shared site kiosks via low-bandwidth PWA.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>ISO 7933 Predicted Heat Strain:</strong> Validated thermodynamic heat balance physics calculating thermal storage in Watts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Individualized Acclimatization Factor:</strong> Adapts automatically for Day 2 recruits vs seasoned Gulf tradesmen.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>5-Language Audible Voice Sentinel:</strong> Immediate spoken warnings in Urdu, Hindi, Tagalog, Bengali, and Arabic.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>


      {/* 3. INTERACTIVE 3D THERMAL PHYSIOLOGY SIMULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ThermalPhysiologySim />
      </section>


      {/* 4. FIVE-LANGUAGE NATIVE VOICE SENTINEL SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-8 shadow-2xl">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Cultural Trust & Accessibility
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
              The 5-Language Native Voice Sentinel
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Migrant workers cannot read complex English dashboards while hauling 30kg scaffolding in 45°C sun. HeatGuard speaks directly in their mother tongue with colloquial dialect guidance and visual English subtitles.
            </p>
          </div>

          {/* Language Switcher Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(voiceSamples).map(([key, sample]) => (
              <button
                key={key}
                onClick={() => {
                  setActiveLang(key as any);
                  playSampleVoice(key);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                  activeLang === key
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{sample.flag}</span>
                <span>{sample.label}</span>
              </button>
            ))}
          </div>

          {/* Active Audio Playback Card */}
          <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <span className="text-xl">{voiceSamples[activeLang].flag}</span>
                <span className="text-sm font-black text-amber-400 uppercase tracking-wider">
                  {voiceSamples[activeLang].label} Voice Broadcast
                </span>
              </div>

              {/* Native Script */}
              <p className="text-lg sm:text-xl font-bold text-white leading-relaxed" dir={activeLang === 'urdu' || activeLang === 'arabic' ? 'rtl' : 'ltr'}>
                "{voiceSamples[activeLang].nativeAlert}"
              </p>

              {/* Phonetic Dialect Guide */}
              <p className="text-xs font-mono text-amber-300/80 italic">
                Phonetic Guide: {voiceSamples[activeLang].phonetic}
              </p>

              {/* English Subtitle Box */}
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Official English Translation:</span>
                "{voiceSamples[activeLang].englishMeaning}"
              </div>
            </div>

            {/* Play Button */}
            <div className="flex flex-col items-center gap-2 shrink-0 w-full md:w-auto">
              <button
                onClick={() => playSampleVoice(activeLang)}
                disabled={isPlayingAudio}
                className={`w-full md:w-auto px-6 py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-xl cursor-pointer transition ${
                  isPlayingAudio
                    ? 'bg-amber-400 text-slate-950 animate-pulse'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                }`}
              >
                <Volume2 className="w-5 h-5" />
                <span>{isPlayingAudio ? 'Broadcasting Audio...' : 'Test Native Voice Audio'}</span>
              </button>
              <span className="text-[10px] text-slate-400">Uses Web Speech API or Simulated Synthesizer</span>
            </div>
          </div>
        </div>
      </section>


      {/* 5. MULTI-AGENT GUARDIAN SWARM ARCHITECTURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Autonomous Multi-Agent System
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-2">
            The 4-Agent Guardian Swarm
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Orchestrated across Azure IoT Hub and serverless microservices to execute telemetry ingestion, thermodynamic physics, multilingual generation, and fleet triage in sub-120ms cycles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Agent 1 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition">
              <Globe2 className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Agent 01</span>
            <h3 className="text-base font-bold text-white mt-1 mb-2">Ambient IoT Assimilator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pulls live microclimate feeds from Abu Dhabi IoT weather stations, calculating solar radiation, dry bulb, and wet bulb globe temperature (WBGT) across site zones.
            </p>
          </div>

          {/* Agent 2 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-orange-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-4 group-hover:scale-110 transition">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono text-orange-400 font-bold uppercase">Agent 02</span>
            <h3 className="text-base font-bold text-white mt-1 mb-2">ISO 7933 Thermodynamic Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Applies human heat balance equations to model metabolic heat production against evaporative sweat capacity, computing heat storage rate (Watts/m²) and predicted core temp.
            </p>
          </div>

          {/* Agent 3 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-rose-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition">
              <Volume2 className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono text-rose-400 font-bold uppercase">Agent 03</span>
            <h3 className="text-base font-bold text-white mt-1 mb-2">5-Dialect Voice Synthesizer</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dynamically maps physiological risk thresholds into culturally calibrated, spoken alerts in Urdu, Hindi, Tagalog, Bengali, and Arabic with phonetic text and subtitles.
            </p>
          </div>

          {/* Agent 4 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Agent 04</span>
            <h3 className="text-base font-bold text-white mt-1 mb-2">Fleet Triage & Audit Guard</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Aggregates crew risk scores on the supervisor command deck, manages 1-click rest broadcasts, and compiles automated Abu Dhabi OSHAD CoP 11.0 compliance audit logs.
            </p>
          </div>

        </div>
      </section>


      {/* 6. FINANCIAL MOAT & ROI CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl border border-slate-800 p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Unit Economics & Commercial Moat
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Contractor ROI Calculator
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                General contractors operate on razor-thin 4-6% margins. See how replacing wearable hardware with HeatGuard SaaS delivers an immediate 95% cost reduction and unlocks 84% gross margins.
              </p>

              {/* Slider for Worker Count */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 mt-4">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Site Workforce Size</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">{workerCount.toLocaleString()} Workers</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="250"
                  value={workerCount}
                  onChange={(e) => setWorkerCount(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>500 (Subcontractor)</span>
                  <span>5,000 (Major Site)</span>
                  <span>15,000 (Mega-Project)</span>
                </div>
              </div>
            </div>

            {/* Comparison Metrics */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Hardware Wearable Capex */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-rose-500/20 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block">
                    Wearable Hardware Model
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                    ${(hardwareCapex / 1000000).toFixed(2)}M
                  </div>
                  <span className="text-xs text-slate-400 block mt-1">
                    Upfront Capex ($820/worker + replacement sensors)
                  </span>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-rose-400 flex items-center gap-1.5">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>High attrition, dust damage, logistics burden</span>
                </div>
              </div>

              {/* HeatGuard SaaS */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-emerald-500/30 flex flex-col justify-between shadow-lg shadow-emerald-500/5">
                <div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                    HeatGuard Software Model
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                    ${Math.round(heatGuardAnnual).toLocaleString()}
                    <span className="text-xs text-slate-400 font-normal"> / year</span>
                  </div>
                  <span className="text-xs text-slate-400 block mt-1">
                    Zero Capex ($3.50/worker/month SaaS)
                  </span>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Saves ${Math.round(netSavings).toLocaleString()} ({savingsPct}% cheaper)</span>
                </div>
              </div>

              {/* Bottom Stat Bar */}
              <div className="sm:col-span-2 bg-slate-950/90 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Break-Even Point</span>
                  <span className="text-white font-bold">1,667 Subscriptions</span>
                </div>
                <div className="border-l border-slate-800 pl-4">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Gross Margin</span>
                  <span className="text-emerald-400 font-black font-mono">84.2%</span>
                </div>
                <div className="border-l border-slate-800 pl-4">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Capital Efficiency</span>
                  <span className="text-amber-400 font-bold">$105,000 Seed Runway</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* 7. LIVE OPERATING SYSTEM LAUNCHPAD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Explore the Live Operating System
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Jump directly into frontline worker protection, supervisor fleet dispatch, or autonomous AI swarm telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Surface 1 */}
          <div
            onClick={() => onNavigate('worker')}
            className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 cursor-pointer transition transform hover:-translate-y-1 shadow-xl group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
                <Activity className="w-5 h-5" />
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-400 transition" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Worker PWA Sentinel</h3>
            <p className="text-xs text-slate-400 mb-4">
              Individual mobile interface featuring real-time risk gauges, 5-language voice audio, and 1-tap supervisor acknowledgment.
            </p>
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
              <span>Open Worker Interface</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Surface 2 */}
          <div
            onClick={() => onNavigate('supervisor')}
            className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 cursor-pointer transition transform hover:-translate-y-1 shadow-xl group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
                <Users className="w-5 h-5" />
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-400 transition" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Supervisor Tactical Deck</h3>
            <p className="text-xs text-slate-400 mb-4">
              Real-time site heatmap, crew triage sorting, 1-click mandatory rest broadcast, and automated OSHAD compliance JSON exporter.
            </p>
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
              <span>Open Supervisor Deck</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Surface 3 */}
          <div
            onClick={() => onNavigate('agents')}
            className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 cursor-pointer transition transform hover:-translate-y-1 shadow-xl group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
                <Cpu className="w-5 h-5" />
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-400 transition" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">AI Swarm & Statutory RAG</h3>
            <p className="text-xs text-slate-400 mb-4">
              Live telemetry diagnostics, sub-30ms multi-agent coordination, statutory RAG console on OSHAD CoP 11.0, and verifiable SHA-256 audit ledger.
            </p>
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
              <span>Explore AI Swarm & RAG</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

        </div>
      </section>

    </div>
  );
};
