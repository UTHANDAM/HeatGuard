import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CinematicLanding } from './views/CinematicLanding';
import { WorkerPWA } from './views/WorkerPWA';
import { SupervisorDeck } from './views/SupervisorDeck';
import { AgentDiagnostics } from './views/AgentDiagnostics';
import type { EnvironmentalTelemetry, WorkerProfile } from './types';
import { fetchLiveTelemetry, fetchWorkers } from './services/api';
import { Shield, Sparkles } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'worker' | 'supervisor' | 'agents'>('landing');
  const [selectedSite, setSelectedSite] = useState<string>('mussafah');
  const [heatWave, setHeatWave] = useState<number>(1.05);
  const [telemetry, setTelemetry] = useState<EnvironmentalTelemetry | null>(null);
  const [workers, setWorkers] = useState<WorkerProfile[]>([]);

  useEffect(() => {
    // Initial fetch of workers cohort
    fetchWorkers().then(setWorkers);
  }, []);

  useEffect(() => {
    // Fetch live ambient climate readings
    fetchLiveTelemetry(selectedSite, heatWave).then(setTelemetry);

    // Auto-refresh interval every 15 seconds
    const interval = setInterval(() => {
      fetchLiveTelemetry(selectedSite, heatWave).then(setTelemetry);
    }, 15000);

    return () => clearInterval(interval);
  }, [selectedSite, heatWave]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      
      {/* Global Command Header */}
      <div>
        <Header
          currentView={currentView}
          onViewChange={setCurrentView}
          telemetry={telemetry}
          selectedSite={selectedSite}
          onSiteChange={setSelectedSite}
          heatWave={heatWave}
          onHeatWaveChange={setHeatWave}
        />

        {/* Main Content Area */}
        <main className="pb-12">
          {currentView === 'landing' && (
            <CinematicLanding
              telemetry={telemetry}
              selectedSite={selectedSite}
              heatWave={heatWave}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'worker' && (
            <WorkerPWA
              workers={workers}
              telemetry={telemetry}
              selectedSite={selectedSite}
              heatWave={heatWave}
            />
          )}

          {currentView === 'supervisor' && (
            <SupervisorDeck
              telemetry={telemetry}
              selectedSite={selectedSite}
              heatWave={heatWave}
            />
          )}

          {currentView === 'agents' && (
            <AgentDiagnostics />
          )}
        </main>
      </div>

      {/* Global Footer */}
      <footer className="bg-slate-900 border-t border-slate-800/80 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-white tracking-wide">HEATGUARD</span>
            <span>· Abu Dhabi Future Health Digital Innovation Challenge 2026</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Multi-Agent Swarm · OSHAD RAG · ISO 7933 PHS Physics · SQLite WAL</span>
            </span>
            <span>·</span>
            <span>All 17 H2S Slides & Portal Ready</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
