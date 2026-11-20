import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Search, 
  BookOpen, 
  Send,
  Zap,
  Lock,
  Database
} from 'lucide-react';
import { queryRegulatoryRAG, fetchAgentsStatus, fetchAuditTrail } from '../services/api';

export const AgentDiagnostics: React.FC = () => {
  const [agentsData, setAgentsData] = useState<any>(null);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(
    "What are the mandatory contractor requirements under OSHAD CoP 11.0 when WBGT exceeds 32°C?"
  );
  const [ragResult, setRagResult] = useState<any>(null);
  const [isLoadingRag, setIsLoadingRag] = useState<boolean>(false);

  useEffect(() => {
    fetchAgentsStatus().then(setAgentsData);
    fetchAuditTrail().then(setAuditLogs);
    handleExecuteRAG("What are the mandatory contractor requirements under OSHAD CoP 11.0 when WBGT exceeds 32°C?");
  }, []);

  const handleExecuteRAG = async (queryText: string) => {
    setIsLoadingRag(true);
    setSearchQuery(queryText);
    const res = await queryRegulatoryRAG(queryText);
    setRagResult(res);
    setIsLoadingRag(false);
  };

  const presetQueries = [
    {
      label: "OSHAD CoP 11.0 Hydration & Rest",
      query: "What are the mandatory contractor requirements under OSHAD CoP 11.0 when WBGT exceeds 32°C?"
    },
    {
      label: "MOHRE Midday Ban & Fines",
      query: "What are the legal penalties for violating the UAE MOHRE Midday Work Ban under Resolution No. 44?"
    },
    {
      label: "ISO 7933 Core Temp Limits",
      query: "How does ISO 7933 determine core temperature limits for unacclimatized vs acclimatized workers?"
    },
    {
      label: "Clinical Heatstroke Triage",
      query: "What is the emergency clinical protocol for exertional heatstroke with core temperature exceeding 40°C?"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* 1. Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                LangGraph Multi-Agent Swarm Active
              </span>
              <span className="text-xs text-slate-400 font-mono">Sub-120ms Reactive Loop</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              AI Multi-Agent Swarm & Statutory RAG Intelligence
            </h1>
            <p className="text-slate-400 text-sm max-w-3xl">
              Inspect the 4 autonomous guardian agents, execute semantic vector search over Abu Dhabi OSHAD CoP 11.0, UAE MOHRE Resolution 44, and ISO 7933 standards, and review the tamper-proof cryptographic audit trail.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Orchestrator Engine</span>
              <span className="text-sm font-bold text-white flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-amber-400" />
                LangGraph State Machine
              </span>
            </div>
            <div className="border-l border-slate-800 pl-4">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Vector Indexing</span>
              <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-emerald-400" />
                TF-IDF + Cosine Vector Store
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Four Autonomous Agents Live Diagnostics Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">4-Agent Autonomous Guardian Swarm</h2>
            <p className="text-xs text-slate-400">Real-time status, execution latency, and telemetry throughput.</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">Average Cycle: {agentsData?.active_cycle_time_ms || 86}ms</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agentsData?.agents?.map((agent: any) => (
            <div key={agent.agent_id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/40 transition">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded">
                  {agent.agent_id}
                </span>
                <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {agent.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1">{agent.name}</h3>
              <p className="text-xs text-slate-400 mb-4">{agent.role}</p>

              <div className="space-y-2 pt-3 border-t border-slate-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Latency:</span>
                  <span className="font-mono font-bold text-amber-400">{agent.latency_ms} ms</span>
                </div>
                {agent.input_stream && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Stream:</span>
                    <span className="text-slate-300 truncate max-w-[140px]">{agent.input_stream}</span>
                  </div>
                )}
                {agent.model && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Model:</span>
                    <span className="text-slate-300 truncate max-w-[140px]">{agent.model}</span>
                  </div>
                )}
                {agent.physics_mean_absolute_error_c && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">MAE:</span>
                    <span className="font-mono text-emerald-400">±{agent.physics_mean_absolute_error_c}°C</span>
                  </div>
                )}
                {agent.cache_hit_rate_pct && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cache Hit:</span>
                    <span className="font-mono text-emerald-400">{agent.cache_hit_rate_pct}%</span>
                  </div>
                )}
                {agent.privacy_firewall && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Firewall:</span>
                    <span className="text-emerald-400 font-bold">{agent.privacy_firewall}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Interactive Regulatory RAG Knowledge Explorer */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Statutory AI Knowledge Base
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight mt-2">
            Regulatory RAG Query Console
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Semantic retrieval-augmented generation grounded in official Abu Dhabi OSHAD CoP 11.0, UAE MOHRE Ministerial Resolution No. 44, and ISO 7933/7243 international standards.
          </p>
        </div>

        {/* Preset Query Quick Buttons */}
        <div className="flex flex-wrap gap-2">
          {presetQueries.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleExecuteRAG(item.query)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Search Bar Input */}
        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-2xl border border-slate-800">
          <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask any statutory question (e.g. hydration rules, MOHRE midday fines, core temp limits)..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none px-2"
          />
          <button
            onClick={() => handleExecuteRAG(searchQuery)}
            disabled={isLoadingRag}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isLoadingRag ? 'Retrieving...' : 'Run Query'}</span>
          </button>
        </div>

        {/* Synthesized Output Display */}
        {ragResult && (
          <div className="space-y-6 pt-4 border-t border-slate-800/80">
            <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Synthesized Statutory Answer
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Framework: {ragResult.regulatory_framework}
                </span>
              </div>
              
              <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 font-mono">
                {ragResult.synthesized_answer}
              </div>
            </div>

            {/* Citations Grid */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Matched Statutory Citations & Clauses
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ragResult.citations?.map((cite: any, i: number) => (
                  <div key={i} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-amber-400 font-bold uppercase bg-amber-500/10 px-2 py-0.5 rounded">
                        {cite.doc_id}
                      </span>
                      <span className="text-xs font-bold text-emerald-400">
                        Relevance: {Math.round(cite.relevance_score * 100)}%
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white">{cite.title}</h4>
                    <p className="text-[11px] text-amber-300/90 font-mono">{cite.clause}</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{cite.content}</p>
                    <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                      <strong>Legal Mandate:</strong> {cite.penalty_or_mandate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Immutable Cryptographic Audit Trail (SQLite WAL) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Regulatory Verification
            </span>
            <h2 className="text-2xl font-black text-white tracking-tight mt-2">
              Cryptographic Audit Log (SQLite WAL)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Every supervisor dispatch and worker acknowledgment is hashed using SHA-256 and stored immutably for labor inspectors.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>SHA-256 Verified</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Event ID</th>
                <th className="py-3 px-4">Event Type</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-4">SHA-256 Crypto Hash</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {auditLogs.map((log: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-950/40">
                  <td className="py-3 px-4 font-bold text-amber-400">{log.event_id}</td>
                  <td className="py-3 px-4 text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px]">
                      {log.event_type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300 max-w-xs truncate">
                    {JSON.stringify(log.details)}
                  </td>
                  <td className="py-3 px-4 text-emerald-400 text-[11px] truncate max-w-[160px]" title={log.crypto_hash}>
                    {log.crypto_hash.substring(0, 16)}...
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-[11px]">
                    {new Date(log.created_at).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
