import React from 'react';
import { ShieldAlert, Activity, Users, SunMedium, MapPin, Sparkles, Cpu } from 'lucide-react';
import type { EnvironmentalTelemetry } from '../types';

interface HeaderProps {
  currentView: 'landing' | 'worker' | 'supervisor' | 'agents';
  onViewChange: (view: 'landing' | 'worker' | 'supervisor' | 'agents') => void;
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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/90 border-b border-slate-800/60 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          
          {/* Brand Logo & Compact Status Badge */}
          <div 
            onClick={() => onViewChange('landing')}
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <ShieldAlert className="w-4.5 h-4.5 text-amber-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white">
                HEAT<span className="text-amber-400">GUARD</span>
              </span>
              <span className="hidden xl:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Live IoT · OSHAD CoP 11.0
              </span>
            </div>
          </div>

          {/* Compact Telemetry & Microclimate Pill */}
          <div className="hidden lg:flex items-center gap-2.5 bg-slate-900/70 px-3 py-1 rounded-full border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <select
                value={selectedSite}
                onChange={(e) => onSiteChange(e.target.value)}
                className="bg-transparent text-slate-100 font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value="mussafah" className="bg-slate-900">Mussafah (Industrial)</option>
                <option value="al_reem" className="bg-slate-900">Al Reem (Coastal)</option>
                <option value="al_dhafra" className="bg-slate-900">Al Dhafra (Solar)</option>
              </select>
            </div>

            {telemetry && (
              <div className="flex items-center gap-2.5 pl-2.5 border-l border-slate-800 text-[11px]">
                <span className="text-slate-400">
                  Amb: <strong className="text-slate-100">{telemetry.ambient_temp_c}°C</strong>
                </span>
                <span className="text-slate-400">
                  WBGT: <strong className={telemetry.calculated_wbgt_c && telemetry.calculated_wbgt_c >= 32 ? "text-red-400" : "text-amber-400"}>
                    {telemetry.calculated_wbgt_c || 33.8}°C
                  </strong>
                </span>
                <span className="text-slate-400">
                  RH: <strong className="text-slate-100">{telemetry.relative_humidity_pct}%</strong>
                </span>
              </div>
            )}

            {/* Micro-Slider for Heatwave Testing */}
            <div className="flex items-center gap-1.5 pl-2.5 border-l border-slate-800 text-[11px]">
              <SunMedium className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <input
                type="range"
                min="0.9"
                max="1.3"
                step="0.05"
                value={heatWave}
                onChange={(e) => onHeatWaveChange(parseFloat(e.target.value))}
                className="w-14 accent-amber-500 cursor-pointer h-1"
                title={`Heatwave: ${heatWave.toFixed(2)}x`}
              />
              <span className={`font-mono font-bold ${heatWave > 1.15 ? "text-red-400" : "text-amber-400"}`}>
                {heatWave.toFixed(2)}x
              </span>
            </div>
          </div>

          {/* Navigation Tabs (4 Core Product Surfaces) */}
          <nav className="flex items-center bg-slate-900/60 p-0.5 rounded-lg border border-slate-800/80">
            <button
              onClick={() => onViewChange('landing')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                currentView === 'landing'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">3D</span>
            </button>
            <button
              onClick={() => onViewChange('worker')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                currentView === 'worker'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Worker PWA</span>
              <span className="sm:hidden">Worker</span>
            </button>
            <button
              onClick={() => onViewChange('supervisor')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                currentView === 'supervisor'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Supervisor</span>
              <span className="sm:hidden">Fleet</span>
            </button>
            <button
              onClick={() => onViewChange('agents')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                currentView === 'agents'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Swarm & RAG</span>
              <span className="sm:hidden">Swarm</span>
            </button>
          </nav>

        </div>
      </div>
    </header>
  );
};
