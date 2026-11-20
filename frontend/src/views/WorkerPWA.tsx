import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  AlertTriangle,
  Heart,
  Droplets,
  Clock,
  Sparkles,
  Info,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  Languages
} from 'lucide-react';
import type { WorkerProfile, HeatRiskAssessment, MultilingualAlertPayload, EnvironmentalTelemetry, LanguageCode } from '../types';
import { evaluateWorkerRisk, acknowledgeAlert } from '../services/api';

interface WorkerPWAProps {
  workers: WorkerProfile[];
  telemetry: EnvironmentalTelemetry | null;
  selectedSite: string;
  heatWave: number;
}

export const WorkerPWA: React.FC<WorkerPWAProps> = ({
  workers,
  selectedSite,
  heatWave
}) => {
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>(workers[0]?.worker_id || 'WRK-101');
  const [activeWorker, setActiveWorker] = useState<WorkerProfile | null>(null);
  const [assessment, setAssessment] = useState<HeatRiskAssessment | null>(null);
  const [alert, setAlert] = useState<MultilingualAlertPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [ackStatus, setAckStatus] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode | null>(null);

  const availableLanguages: Array<{ code: LanguageCode; label: string; nativeName: string }> = [
    { code: 'english', label: 'English', nativeName: 'English' },
    { code: 'urdu', label: 'Urdu', nativeName: 'اردو' },
    { code: 'hindi', label: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'arabic', label: 'Arabic', nativeName: 'العربية' },
    { code: 'tagalog', label: 'Tagalog', nativeName: 'Filipino' },
    { code: 'bengali', label: 'Bengali', nativeName: 'বাংলা' }
  ];

  useEffect(() => {
    loadWorkerData(selectedWorkerId, selectedLanguage);
  }, [selectedWorkerId, selectedSite, heatWave, selectedLanguage]);

  const loadWorkerData = async (workerId: string, langOverride: LanguageCode | null) => {
    setLoading(true);
    setAckStatus(null);
    try {
      const data = await evaluateWorkerRisk(workerId, selectedSite, heatWave, langOverride || undefined);
      setActiveWorker(data.worker);
      setAssessment(data.assessment);
      setAlert(data.alert);
    } catch (err) {
      console.error('Failed to evaluate worker data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeakAlert = () => {
    if (!alert) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = alert.voice_script_phonetic || alert.localized_headline;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      // Attempt language matching
      if (alert.language === 'hindi') utterance.lang = 'hi-IN';
      else if (alert.language === 'arabic') utterance.lang = 'ar-SA';
      else if (alert.language === 'urdu') utterance.lang = 'ur-PK';
      else if (alert.language === 'bengali') utterance.lang = 'bn-BD';
      else if (alert.language === 'tagalog') utterance.lang = 'fil-PH';
      else utterance.lang = 'en-US';

      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Web Speech synthesis not supported on this browser.");
    }
  };

  const handleAcknowledge = async (action: string) => {
    if (!alert) return;
    setAckStatus(action);
    await acknowledgeAlert(alert.alert_id, action);
  };

  const getSeverityColor = (sev: string) => {
    switch (sev) {
      case 'EMERGENCY':
        return 'bg-rose-950 border-rose-500 text-rose-300';
      case 'RED':
        return 'bg-red-950 border-red-500 text-red-300';
      case 'AMBER':
        return 'bg-amber-950 border-amber-500 text-amber-300';
      case 'YELLOW':
        return 'bg-yellow-950 border-yellow-500 text-yellow-300';
      default:
        return 'bg-emerald-950 border-emerald-500 text-emerald-300';
    }
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'EMERGENCY':
        return 'bg-rose-500 text-white animate-pulse';
      case 'RED':
        return 'bg-red-500 text-white';
      case 'AMBER':
        return 'bg-amber-500 text-slate-950 font-bold';
      case 'YELLOW':
        return 'bg-yellow-400 text-slate-950 font-bold';
      default:
        return 'bg-emerald-500 text-white';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      
      {/* Worker Selector Strip for Hackathon Demo Walkthrough */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Demo Worker Cohort (Switch Person & Default Language)
            </h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            One-Tap Guest Mode Active
          </span>
        </div>

        {/* Worker Profiles Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {workers.map((w) => (
            <button
              key={w.worker_id}
              onClick={() => {
                setSelectedWorkerId(w.worker_id);
                setSelectedLanguage(null); // Reset override so it uses worker's native language
              }}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                selectedWorkerId === w.worker_id
                  ? 'bg-amber-500/15 border-amber-500 shadow-md shadow-amber-500/10'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-white truncate">{w.name}</div>
              <div className="text-[11px] text-amber-400 font-semibold uppercase">{w.preferred_language}</div>
              <div className="text-[10px] text-slate-400 truncate">
                {w.acclimatization_days <= 3 ? '⚠️ Day ' + w.acclimatization_days + ' New' : w.acclimatization_days + 'd Veteran'}
              </div>
            </button>
          ))}
        </div>

        {/* Explicit Language Switcher Bar */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Languages className="w-4 h-4 text-amber-400" />
            <span>Instant Language Switcher:</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {availableLanguages.map((lang) => {
              const isSelected = (selectedLanguage === lang.code) || (!selectedLanguage && activeWorker?.preferred_language === lang.code);
              return (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-950 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  {lang.label} ({lang.nativeName})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main High-Contrast Sentinel Card */}
      {loading ? (
        <div className="bg-slate-900 rounded-3xl p-12 text-center border border-slate-800">
          <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-400 font-medium">Calculating physiological thermal strain...</p>
        </div>
      ) : activeWorker && assessment && alert ? (
        <div className={`rounded-3xl border-2 p-6 md:p-8 shadow-2xl transition-all ${getSeverityColor(assessment.severity)}`}>
          
          {/* Top Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`px-3 py-1 rounded-lg text-xs font-black tracking-widest uppercase ${getSeverityBadge(assessment.severity)}`}>
                  {assessment.severity} HEAT STRAIN WARNING
                </span>
                <span className="text-xs text-slate-400 font-medium bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
                  {alert.language.toUpperCase()} VOICE SENTINEL
                </span>
                {alert.language !== 'english' && (
                  <span className="text-[11px] text-amber-300/80 font-mono">
                    (English subtitle below)
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                {activeWorker.name}
              </h1>
              <p className="text-xs text-slate-400">
                Age {activeWorker.age} · BMI {activeWorker.bmi} · {activeWorker.current_task_intensity.toUpperCase()} Task Exertion · {activeWorker.acclimatization_days} Days in UAE
              </p>
              
              {/* Provenance & Privacy Assurance Bar */}
              <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-slate-800/60 text-[11px]">
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Measured: On-site Calibrated WBGT Sensor
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                  Worker Privacy Charter: Zero Disciplinary Use · Data Minimization Active
                </span>
              </div>
            </div>

            {/* Audio Voice Player Button */}
            <button
              onClick={handleSpeakAlert}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm shadow-xl transition-all ${
                isPlayingAudio
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-amber-500/20'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 animate-bounce" />}
              <span>{isPlayingAudio ? "Playing Voice..." : "🔊 Play Voice Alert"}</span>
            </button>
          </div>

          {/* Localized Headline & Native Dialect Voice Script */}
          <div className="mt-6 bg-slate-950/70 rounded-2xl p-5 border border-slate-800/80 space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <div className="space-y-1 w-full">
                {/* Localized Text */}
                <h3 className="text-xl font-black text-white sunlight-readable">
                  {alert.localized_headline}
                </h3>
                <p className="text-base text-slate-200 leading-relaxed font-medium">
                  {alert.localized_body_text}
                </p>

                {/* Phonetic Pronunciation Guide */}
                <div className="pt-2 text-xs font-mono text-amber-300/90 italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  Phonetic Voice Speech: "{alert.voice_script_phonetic}"
                </div>

                {/* English Subtitle Box (Shown when a foreign language is active) */}
                {alert.language !== 'english' && alert.english_headline && (
                  <div className="pt-2 text-xs text-slate-300 bg-slate-900/90 p-3 rounded-xl border border-slate-700/60 space-y-0.5">
                    <span className="font-bold text-amber-400 uppercase text-[10px] tracking-wider block">
                      🇬🇧 English Translation:
                    </span>
                    <div className="font-semibold text-white">{alert.english_headline}</div>
                    <div className="text-slate-300">{alert.english_body_text}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Core Physiological Metrics Grid (ISO 7933 Predicted Heat Strain) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center">
              <Heart className="w-5 h-5 text-rose-400 mx-auto mb-1.5" />
              <div className="text-xs text-slate-400">Core Temp (Tcore)</div>
              <div className="text-2xl font-black text-white mt-0.5">
                {assessment.predicted_core_temp_c}°C
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {assessment.predicted_core_temp_c >= 38.5 ? "⚠️ Above Safety Limit" : "Nominal (<38.0°C)"}
              </div>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center">
              <Droplets className="w-5 h-5 text-sky-400 mx-auto mb-1.5" />
              <div className="text-xs text-slate-400">Sweat Fluid Loss</div>
              <div className="text-2xl font-black text-white mt-0.5">
                {assessment.sweat_rate_liters_per_hr} <span className="text-sm font-semibold">L/hr</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Need: {assessment.recommended_water_intake_ml_hr} mL/hr
              </div>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center">
              <Clock className="w-5 h-5 text-amber-400 mx-auto mb-1.5" />
              <div className="text-xs text-slate-400">Max Work Remaining</div>
              <div className="text-2xl font-black text-white mt-0.5">
                {assessment.max_allowable_continuous_work_mins} <span className="text-sm font-semibold">mins</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Shade Rest: {assessment.required_rest_in_shade_mins} mins
              </div>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center">
              <Sparkles className="w-5 h-5 text-emerald-400 mx-auto mb-1.5" />
              <div className="text-xs text-slate-400">Early Warning Lead</div>
              <div className="text-2xl font-black text-white mt-0.5">
                {assessment.lead_time_minutes_before_heat_strain} <span className="text-sm font-semibold">mins</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Fires Before Clinical Failure
              </div>
            </div>
          </div>

          {/* Actionable Instruction Checklist in Native Language + English */}
          <div className="mt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400" />
              Mandatory Prescribed Actions (MOHRE Safety Protocol)
            </h4>
            <div className="space-y-2">
              {alert.localized_action_instructions.map((act, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-sm font-medium text-slate-200">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span>{act}</span>
                  </div>

                  {alert.language !== 'english' && alert.english_action_instructions && alert.english_action_instructions[idx] && (
                    <span className="text-xs text-slate-400 italic sm:border-l sm:border-slate-800 sm:pl-3">
                      EN: {alert.english_action_instructions[idx]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Explainable AI (XAI) Attribution Box */}
          <div className="mt-6 bg-slate-950/90 rounded-2xl p-5 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Explainable AI (XAI) Risk Factor Attribution
                </h4>
              </div>
              <span className="text-xs text-slate-400">
                Primary Driver: <strong className="text-amber-400">{assessment.primary_risk_driver}</strong>
              </span>
            </div>

            <div className="space-y-3">
              {assessment.xai_breakdown.map((factor, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-semibold">{factor.factor_name}</span>
                    <span className="text-amber-400 font-mono font-bold">{factor.contribution_pct}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, factor.contribution_pct)}%` }}
                    ></div>
                  </div>
                  <p className="text-[11px] text-slate-400">{factor.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* One-Tap Worker Acknowledgment Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-800/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 text-center">
              One-Tap Response (Closes Care Loop to Supervisor)
            </h4>

            {ackStatus ? (
              <div className="bg-emerald-950/80 border border-emerald-500/50 p-4 rounded-2xl text-center flex items-center justify-center gap-2 text-emerald-300 font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Acknowledged as "{ackStatus}". Supervisor Command Deck Updated.</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleAcknowledge('RESTING')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3.5 px-4 rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-95"
                >
                  🟢 I Am Resting in Shade
                </button>
                <button
                  onClick={() => handleAcknowledge('NEED_WATER')}
                  className="bg-sky-600 hover:bg-sky-500 text-white font-black py-3.5 px-4 rounded-xl text-sm transition-all shadow-lg active:scale-95"
                >
                  💧 I Am Drinking Water
                </button>
                <button
                  onClick={() => handleAcknowledge('EMERGENCY')}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-black py-3.5 px-4 rounded-xl text-sm transition-all shadow-lg shadow-rose-600/20 active:scale-95"
                >
                  🚨 Emergency: Call Medic
                </button>
              </div>
            )}
          </div>

          {/* Worker Privacy & Rights Guarantee Footer */}
          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Worker-First Privacy Active: Employer has zero access to individual health metrics or disciplinary use.</span>
          </div>

        </div>
      ) : null}

    </div>
  );
};
