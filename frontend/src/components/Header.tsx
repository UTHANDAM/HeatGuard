import React from 'react';
import { ShieldAlert, Activity, Users, FileText, SunMedium, MapPin, Sparkles, Cpu } from 'lucide-react';
import type { EnvironmentalTelemetry } from '../types';

interface HeaderProps {
  currentView: 'landing' | 'worker' | 'supervisor' | 'agents' | 'submission';
  onViewChange: (view: 'landing' | 'worker' | 'supervisor' | 'agents' | 'submission') => void;
  telemetry: EnvironmentalTelemetry | null;
  selectedSite: string;
  onSiteChange: (site: string) => void;
  heatWave: number;
  onHeatWaveChange: (val: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  telemetry,
  selectedSite,
  onSiteChange,
  heatWave,
  onHeatWaveChange
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 gap-3">
          
          {/* Logo & Platform Tagline */}
          <div 
            onClick={() => onViewChange('landing')}
            className="flex items-center space-x-3 cursor-pointer select-none"
          >
            <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/30 flex items-center justify-center">
              <ShieldAlert className="w-7 h-7 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black tracking-tight text-white">HEAT<span className="text-amber-400">GUARD</span></span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Azure IoT Live · OSHAD CoP 11.0 (v4.0)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Earlier Detection · Faster Action · Safer Workforce (Zero Hardware Capex)
              </p>
            </div>
          </div>

          {/* Environmental Telemetry Pill & Site Selector */}
          <div className="flex flex-wrap items-center gap-3 bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 font-medium text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={selectedSite}
                onChange={(e) => onSiteChange(e.target.value)}
                className="bg-transparent text-slate-100 font-semibold focus:outline-none cursor-pointer border-b border-slate-700 pb-0.5"
              >
                <option value="mussafah" className="bg-slate-900">Mussafah Zone 4 (Industrial)</option>
                <option value="al_reem" className="bg-slate-900">Al Reem Island (Coastal)</option>
                <option value="al_dhafra" className="bg-slate-900">Al Dhafra (Desert Solar)</option>
              </select>
            </div>

            {telemetry && (
              <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
                <span className="text-slate-400">
                  Ambient: <strong className="text-white">{telemetry.ambient_temp_c}°C</strong>
                </span>
                <span className="text-slate-400">
                  WBGT: <strong className={telemetry.calculated_wbgt_c && telemetry.calculated_wbgt_c >= 32 ? "text-red-400 font-bold" : "text-amber-400"}>
                    {telemetry.calculated_wbgt_c || 33.8}°C
                  </strong>
                </span>
                <span className="text-slate-400">
                  RH: <strong className="text-slate-200">{telemetry.relative_humidity_pct}%</strong>
                </span>
              </div>
            )}

            {/* Heatwave Simulation Slider */}
            <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
              <SunMedium className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-slate-400 hidden sm:inline">Stress:</span>
              <input
                type="range"
                min="0.9"
                max="1.3"
                step="0.05"
                value={heatWave}
                onChange={(e) => onHeatWaveChange(parseFloat(e.target.value))}
                className="w-16 accent-amber-500 cursor-pointer"
                title={`Heatwave Intensity: ${heatWave}x`}
              />
              <span className={`font-mono text-xs font-bold ${heatWave > 1.15 ? "text-red-400" : "text-amber-400"}`}>
                {heatWave.toFixed(2)}x
              </span>
            </div>
          </div>

          {/* Navigation Mode Switcher */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => onViewChange('landing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                currentView === 'landing'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">3D Experience</span>
              <span className="sm:hidden">3D</span>
            </button>
            <button
              onClick={() => onViewChange('worker')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                currentView === 'worker'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Worker PWA</span>
            </button>
            <button
              onClick={() => onViewChange('supervisor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                currentView === 'supervisor'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Supervisor Deck</span>
            </button>
            <button
              onClick={() => onViewChange('agents')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                currentView === 'agents'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>AI Swarm & RAG</span>
            </button>
            <button
              onClick={() => onViewChange('submission')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                currentView === 'submission'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>H2S Pitch Deck</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
