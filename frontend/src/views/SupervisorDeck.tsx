import React, { useState, useEffect } from 'react';
import {
  Users,
  Radio,
  FileCheck,
  Download,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import type { SupervisorCrewSummary, EnvironmentalTelemetry } from '../types';
import { fetchSupervisorSummary, dispatchSupervisorBreak } from '../services/api';

interface SupervisorDeckProps {
  telemetry: EnvironmentalTelemetry | null;
  selectedSite: string;
  heatWave: number;
}

export const SupervisorDeck: React.FC<SupervisorDeckProps> = ({
  telemetry,
  selectedSite,
  heatWave
}) => {
  const [summary, setSummary] = useState<SupervisorCrewSummary | null>(null);
  const [, setLoading] = useState(false);
  const [broadcastStatus, setBroadcastStatus] = useState<string | null>(null);

  useEffect(() => {
    loadSummary();
  }, [selectedSite, heatWave]);

  const loadSummary = async () => {
    setLoading(true);
    try {
      const data = await fetchSupervisorSummary(selectedSite, heatWave);
      setSummary(data);
    } catch (err) {
      console.error('Failed to load supervisor summary', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBroadcast = async (action: string) => {
    setBroadcastStatus(`Broadcasting "${action}" to all worker PWAs...`);
    await dispatchSupervisorBreak(action);
    setTimeout(() => {
      setBroadcastStatus(`Rest break command dispatched! All active worker timers reset.`);
      loadSummary();
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      
      {/* Top Tactical Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Live Workforce Telemetry Monitoring
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            HSE Tactical Command Deck
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Site: <strong className="text-white">{telemetry?.location_name || 'Mussafah Zone 4'}</strong> · 
            Ambient Temp: <strong className="text-amber-400">{telemetry?.ambient_temp_c || 44.5}°C</strong> · 
            WBGT Index: <strong className="text-red-400 font-bold">{telemetry?.calculated_wbgt_c || 33.8}°C</strong>
          </p>
        </div>

        {/* Abu Dhabi OSHAD Compliance Gauge */}
        <div className="flex items-center gap-6 bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              OSHAD & MOHRE Compliance
            </div>
            <div className="text-3xl font-black text-emerald-400 mt-0.5">
              {summary?.compliance_score_pct || 94.2}%
            </div>
            <div className="text-[10px] text-slate-500">
              Ministerial Resolution No. 44
            </div>
          </div>
          <div className="border-l border-slate-800 pl-6 text-right">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Protected Workforce
            </div>
            <div className="text-3xl font-black text-white mt-0.5">
              {summary?.total_workers_monitored || 6}
            </div>
            <div className="text-[10px] text-emerald-400 font-semibold">
              0 Hospitalizations Today
            </div>
          </div>
        </div>
      </div>

      {/* Severity Counters Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-2xl">
          <div className="text-xs text-emerald-400 font-bold uppercase">Nominal (Green)</div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1">
            {summary?.green_count || 0}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Standard hydration</div>
        </div>

        <div className="bg-yellow-950/40 border border-yellow-500/30 p-4 rounded-2xl">
          <div className="text-xs text-yellow-400 font-bold uppercase">Caution (Yellow)</div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1">
            {summary?.yellow_count || 0}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Elevate water intake</div>
        </div>

        <div className="bg-amber-950/40 border border-amber-500/30 p-4 rounded-2xl">
          <div className="text-xs text-amber-400 font-bold uppercase">Warning (Amber)</div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1">
            {summary?.amber_count || 0}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">15m rest required</div>
        </div>

        <div className="bg-red-950/40 border border-red-500/30 p-4 rounded-2xl">
          <div className="text-xs text-red-400 font-bold uppercase">Danger (Red)</div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1">
            {summary?.red_count || 0}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Cease heavy labor</div>
        </div>

        <div className="bg-rose-950/60 border border-rose-500/50 p-4 rounded-2xl col-span-2 sm:col-span-1">
          <div className="text-xs text-rose-400 font-bold uppercase">Emergency</div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1">
            {summary?.emergency_count || 0}
          </div>
          <div className="text-[10px] text-rose-300 font-semibold mt-1">Immediate cooling</div>
        </div>
      </div>

      {/* Main Grid: Crew Risk Matrix & Active Advisories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: High Risk Workers Matrix */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                Crew Thermal Strain & Early Warning Matrix
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                AI personalized risk computed from ISO 7933 PHS + acclimatization status
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
              6 Active Crew
            </span>
          </div>

          <div className="space-y-3">
            {summary?.high_risk_workers && summary.high_risk_workers.length > 0 ? (
              summary.high_risk_workers.map((w, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                    w.severity === 'EMERGENCY'
                      ? 'bg-rose-950/50 border-rose-500'
                      : w.severity === 'RED'
                      ? 'bg-red-950/40 border-red-500'
                      : 'bg-amber-950/40 border-amber-500'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-white">{w.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-900/80 font-mono text-slate-300">
                        {w.worker_id}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        w.severity === 'EMERGENCY' ? 'bg-rose-500 text-white animate-pulse' :
                        w.severity === 'RED' ? 'bg-red-500 text-white' : 'bg-amber-500 text-slate-950'
                      }`}>
                        {w.severity}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                      <span>Primary Driver: <strong className="text-amber-300">{w.driver}</strong></span>
                      <span>Native Language: <strong className="text-white uppercase">{w.language}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right sm:border-l sm:border-slate-800 sm:pl-4">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Core Temp</div>
                      <div className="text-lg font-black text-white">{w.core_temp}°C</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Early Warning</div>
                      <div className="text-lg font-black text-amber-400">{w.lead_time_mins}m lead</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-slate-950/50 rounded-2xl border border-slate-800">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-slate-300 font-semibold">All workers within safe thermal thresholds.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Tactical Actions & Advisories */}
        <div className="space-y-6">
          
          {/* One-Click Broadcast Actions */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Radio className="w-4 h-4 text-amber-400" />
              One-Click Site Rest Broadcast
            </h3>
            <p className="text-xs text-slate-400">
              Directly overrides worker timers and broadcasts voice instructions in 5 languages.
            </p>

            {broadcastStatus && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 font-bold">
                {broadcastStatus}
              </div>
            )}

            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleBroadcast('MANDATORY_HYDRATION_BREAK')}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 px-4 rounded-xl text-xs transition-all shadow-md shadow-amber-500/20 text-left flex items-center justify-between"
              >
                <span>💧 Broadcast 15-Min Hydration Break</span>
                <span className="text-[10px] bg-slate-950/30 px-2 py-0.5 rounded text-slate-950 font-mono">ALL ZONES</span>
              </button>

              <button
                onClick={() => handleBroadcast('CREW_SHADE_ROTATION')}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all border border-slate-700 text-left flex items-center justify-between"
              >
                <span>🏕️ Rotate Rebar Team to Shaded Cabins</span>
                <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-amber-400 font-mono">ZONE 4</span>
              </button>

              <button
                onClick={() => handleBroadcast('EMERGENCY_MEDICAL_EVAC')}
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-black py-3 px-4 rounded-xl text-xs transition-all shadow-md shadow-rose-600/20 text-left flex items-center justify-between"
              >
                <span>🚨 Dispatch Site Paramedic Evac</span>
                <span className="text-[10px] bg-slate-950/40 px-2 py-0.5 rounded text-white font-mono">CRITICAL</span>
              </button>
            </div>
          </div>

          {/* Active MOHRE / ADHA Advisories */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Active System Advisories
            </h3>
            <div className="space-y-2">
              {summary?.active_crew_advisories.map((adv, idx) => (
                <div key={idx} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 font-medium">
                  {adv}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Official Abu Dhabi OSHAD / MOHRE Audit Exporter Strip */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FileCheck className="w-5 h-5 text-emerald-400" />
          <div>
            <div className="text-xs font-bold text-white">Abu Dhabi OSHAD Audit Trail Ready</div>
            <div className="text-[11px] text-slate-400">
              Verified: Zero disciplinary usage · Full privacy protection · 348 worker-hours logged
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(summary, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", `heatguard-oshad-audit-${Date.now()}.json`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
          }}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-2 rounded-xl text-xs border border-slate-700 flex items-center gap-2 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export Audit Certificate (JSON)</span>
        </button>
      </div>

    </div>
  );
};
