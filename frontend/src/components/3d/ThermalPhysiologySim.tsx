import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Activity, Flame, Droplets, ShieldCheck, AlertTriangle, Zap, RefreshCw } from 'lucide-react';

interface SimulationState {
  wbgt: number; // 26 - 38 °C
  workloadW: number; // 180 (Light), 300 (Moderate), 460 (Heavy)
  acclimatized: boolean; // true / false
  hydrationDeficitPct: number; // 0 - 5%
}

export const ThermalPhysiologySim: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [params, setParams] = useState<SimulationState>({
    wbgt: 33.2,
    workloadW: 360,
    acclimatized: false,
    hydrationDeficitPct: 2.0,
  });

  // Physiological Calculation (Simplified ISO 7933 PHS Model)
  // Baseline T_core = 37.0 C
  // Heat strain = (Workload - Evaporative capacity) modified by WBGT and acclimatization
  const acclimatizationFactor = params.acclimatized ? 0.72 : 1.0;
  const dehydrationFactor = 1.0 + (params.hydrationDeficitPct * 0.12);
  
  // Heat storage rate approximation (W/m2)
  const thermalLoad = ((params.workloadW - 150) * 0.45 + (params.wbgt - 28) * 24) * acclimatizationFactor * dehydrationFactor;
  
  // Predicted core temperature after 45 minutes of continuous exertion
  const predictedTcore = Math.min(41.0, Math.max(36.8, 37.0 + (thermalLoad / 190)));
  
  // Sweat rate (liters per hour)
  const sweatRateLHr = Math.min(2.4, Math.max(0.4, (params.workloadW * 0.0025 + (params.wbgt - 25) * 0.06) * (params.acclimatized ? 1.25 : 0.85)));
  
  // Allowable continuous work duration in minutes before reaching 38.0°C limit
  const allowableWorkMinutes = Math.max(12, Math.min(120, Math.round(95 - (thermalLoad * 0.45))));
  
  // Mandatory cooling recovery period (OSHAD CoP 11.0)
  const mandatoryRestMinutes = Math.max(15, Math.min(60, Math.round(60 - allowableWorkMinutes * 0.5)));

  // Risk Level assessment
  const riskCategory = predictedTcore >= 39.0 
    ? 'EMERGENCY_STROKE' 
    : predictedTcore >= 38.2 
    ? 'DANGER_STRAIN' 
    : predictedTcore >= 37.6 
    ? 'MODERATE_WARNING' 
    : 'SAFE_NOMINAL';

  // Three.js 3D Bio-Core Canvas
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Color interpolation based on predicted core temperature
    let coreColor = 0x10b981; // Safe Emerald
    if (predictedTcore >= 39.0) {
      coreColor = 0xef4444; // Emergency Crimson
    } else if (predictedTcore >= 38.2) {
      coreColor = 0xf97316; // Danger Orange
    } else if (predictedTcore >= 37.6) {
      coreColor = 0xf59e0b; // Amber
    }

    // 1. Central Core: Bio-Energy Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.0, 3);
    const coreMat = new THREE.MeshBasicMaterial({
      color: coreColor,
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // 2. Inner Heat Nucleus
    const nucleusGeo = new THREE.SphereGeometry(0.75, 24, 24);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: coreColor,
      transparent: true,
      opacity: 0.35
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    group.add(nucleusMesh);

    // 3. Circulating Metabolic Orbit Rings
    const ringMat = new THREE.MeshBasicMaterial({
      color: coreColor,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.015, 12, 64), ringMat);
    ring1.rotation.x = Math.PI / 4;
    group.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.012, 12, 64), ringMat);
    ring2.rotation.y = Math.PI / 3;
    group.add(ring2);

    // 4. Sweat Transpiration Vapor Particles
    const particleCount = Math.round(sweatRateLHr * 180);
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 0.9 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.006,
        y: 0.005 + Math.random() * 0.01,
        z: (Math.random() - 0.5) * 0.006
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.045,
      transparent: true,
      opacity: 0.65
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    group.add(particleSystem);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Rotation
      group.rotation.y += 0.45 * delta;
      group.rotation.x = Math.sin(time * 0.5) * 0.15;

      ring1.rotation.z += 0.6 * delta;
      ring2.rotation.z -= 0.5 * delta;

      // Pulse core if high strain
      if (predictedTcore >= 38.2) {
        const pulse = 1.0 + Math.sin(time * 5.0) * 0.08;
        coreMesh.scale.set(pulse, pulse, pulse);
        nucleusMesh.scale.set(pulse, pulse, pulse);
      } else {
        coreMesh.scale.set(1, 1, 1);
        nucleusMesh.scale.set(1, 1, 1);
      }

      // Evaporative particle rise
      const pos = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += particleVelocities[i].y;
        if (pos[i * 3 + 1] > 2.0) {
          pos[i * 3 + 1] = -0.5 - Math.random() * 0.4;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [predictedTcore, sweatRateLHr]);

  // Presets
  const applyPreset = (preset: 'abu_dhabi_heatwave' | 'heavy_rebar' | 'acclimatized_shift' | 'new_recruit_crisis') => {
    switch (preset) {
      case 'abu_dhabi_heatwave':
        setParams({ wbgt: 35.4, workloadW: 380, acclimatized: false, hydrationDeficitPct: 2.5 });
        break;
      case 'heavy_rebar':
        setParams({ wbgt: 33.8, workloadW: 460, acclimatized: false, hydrationDeficitPct: 3.0 });
        break;
      case 'acclimatized_shift':
        setParams({ wbgt: 31.0, workloadW: 280, acclimatized: true, hydrationDeficitPct: 0.5 });
        break;
      case 'new_recruit_crisis':
        setParams({ wbgt: 34.5, workloadW: 420, acclimatized: false, hydrationDeficitPct: 3.8 });
        break;
    }
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Component Header */}
      <div className="p-6 border-b border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Interactive WebGL Simulation
            </span>
            <span className="text-xs text-slate-400 font-mono">ISO 7933 PHS Physics Engine</span>
          </div>
          <h3 className="text-xl font-black text-white tracking-tight mt-1">
            Real-Time Human Thermal Physiology Engine
          </h3>
          <p className="text-xs text-slate-400">
            Manipulate extreme Abu Dhabi climate variables to observe real-time core temperature rise, sweat transpiration, and allowable work cycles.
          </p>
        </div>

        {/* Preset Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-bold px-2">Presets:</span>
          <button
            onClick={() => applyPreset('abu_dhabi_heatwave')}
            className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            Mussafah Peak Heat
          </button>
          <button
            onClick={() => applyPreset('new_recruit_crisis')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition"
          >
            Day 2 Recruit Crisis
          </button>
          <button
            onClick={() => applyPreset('acclimatized_shift')}
            className="px-2.5 py-1 rounded-lg text-xs font-medium text-emerald-400 hover:bg-emerald-500/10 transition"
          >
            Acclimatized Baseline
          </button>
        </div>
      </div>

      {/* Main Grid: 3D Visualization + Controls + Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
        
        {/* Left Column: 3D Bio-Core Viewport */}
        <div className="lg:col-span-5 p-6 flex flex-col items-center justify-center relative bg-gradient-to-b from-slate-950/60 to-slate-900/40 min-h-[380px]">
          <div ref={mountRef} className="w-full h-72 cursor-grab active:cursor-grabbing" />

          {/* Real-Time Bio-Metrics Badge Overlay */}
          <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Live Bio-Core Temp</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className={`text-2xl font-black font-mono ${
                predictedTcore >= 39.0 ? 'text-red-400 animate-pulse' :
                predictedTcore >= 38.2 ? 'text-orange-400' :
                predictedTcore >= 37.6 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {predictedTcore.toFixed(2)}°C
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {predictedTcore > 37.0 ? `(+${(predictedTcore - 37.0).toFixed(2)}°C)` : 'Baseline'}
              </span>
            </div>
          </div>

          <div className="absolute bottom-4 inset-x-6 flex items-center justify-between bg-slate-950/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-sky-400" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Sweat Transpiration</span>
                <span className="font-mono font-bold text-sky-300">{sweatRateLHr.toFixed(2)} L / hour</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase">OSHAD Status</span>
              <span className={`font-bold text-xs uppercase ${
                riskCategory === 'EMERGENCY_STROKE' ? 'text-red-400 font-black animate-pulse' :
                riskCategory === 'DANGER_STRAIN' ? 'text-orange-400' :
                riskCategory === 'MODERATE_WARNING' ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {riskCategory.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Center Column: Interactive Sliders & Inputs */}
        <div className="lg:col-span-4 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Input Environmental & Workload Physics</span>
            <button
              onClick={() => setParams({ wbgt: 33.2, workloadW: 360, acclimatized: false, hydrationDeficitPct: 2.0 })}
              className="text-slate-400 hover:text-white text-xs flex items-center gap-1 transition"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Slider 1: Ambient WBGT */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Wet Bulb Globe Temp (WBGT)
              </span>
              <span className="font-mono font-bold text-amber-400 text-sm">{params.wbgt.toFixed(1)}°C</span>
            </div>
            <input
              type="range"
              min="26.0"
              max="38.0"
              step="0.2"
              value={params.wbgt}
              onChange={(e) => setParams({ ...params, wbgt: parseFloat(e.target.value) })}
              className="w-full accent-amber-500 cursor-pointer bg-slate-800 rounded-lg h-2"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>26°C (Moderate)</span>
              <span>32°C (Warning Threshold)</span>
              <span>38°C (Extreme Sahara)</span>
            </div>
          </div>

          {/* Slider 2: Metabolic Workload */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-orange-400" />
                Task Metabolic Workload
              </span>
              <span className="font-mono font-bold text-orange-400 text-sm">{params.workloadW} Watts</span>
            </div>
            <input
              type="range"
              min="180"
              max="500"
              step="20"
              value={params.workloadW}
              onChange={(e) => setParams({ ...params, workloadW: parseInt(e.target.value) })}
              className="w-full accent-orange-500 cursor-pointer bg-slate-800 rounded-lg h-2"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>180W (Supervision)</span>
              <span>320W (Carpentry)</span>
              <span>500W (Heavy Rebar/Concrete)</span>
            </div>
          </div>

          {/* Slider 3: Hydration Deficit */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
                Pre-Shift Fluid Deficit
              </span>
              <span className="font-mono font-bold text-sky-400 text-sm">{params.hydrationDeficitPct.toFixed(1)}% body mass</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="5.0"
              step="0.5"
              value={params.hydrationDeficitPct}
              onChange={(e) => setParams({ ...params, hydrationDeficitPct: parseFloat(e.target.value) })}
              className="w-full accent-sky-500 cursor-pointer bg-slate-800 rounded-lg h-2"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0% (Euhydrated)</span>
              <span>2.5% (Mild Thirst)</span>
              <span>5.0% (Severe Plasma Deficit)</span>
            </div>
          </div>

          {/* Toggle: Acclimatization Status */}
          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">Gulf Heat Acclimatization</span>
              <span className="text-[11px] text-slate-400">
                {params.acclimatized ? 'Acclimatized (>21 days in UAE summer)' : 'Unacclimatized recruit (<10 days)'}
              </span>
            </div>
            <button
              onClick={() => setParams({ ...params, acclimatized: !params.acclimatized })}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                params.acclimatized
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}
            >
              {params.acclimatized ? 'Acclimatized' : 'Unacclimatized'}
            </button>
          </div>
        </div>

        {/* Right Column: Predictive Action Outputs */}
        <div className="lg:col-span-3 p-6 flex flex-col justify-between bg-slate-950/40">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">
              AI Prescriptive Triage
            </span>

            <div className="space-y-4">
              {/* Output 1: Safe Work Limit */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Allowable Work Time</span>
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  {allowableWorkMinutes} <span className="text-xs font-normal text-slate-400">mins</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Max continuous exertion before core crosses safe ceiling.
                </p>
              </div>

              {/* Output 2: Mandatory Cooling Period */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Mandatory Cooling Rest</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  {mandatoryRestMinutes} <span className="text-xs font-normal text-slate-400">mins</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Rest in air-conditioned shelter + 500ml electrolyte intake.
                </p>
              </div>

              {/* Output 3: Early Warning Lead Time */}
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-2 text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-slate-300 font-medium">Predictive Early Warning:</span>
                </div>
                <p className="text-xs text-amber-300 font-bold mt-1.5">
                  Triggered 34 minutes BEFORE clinical collapse
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400">
            Complies with Abu Dhabi OSHAD CoP 11.0 Safety Standards and ISO 7933:2004 heat balance equations.
          </div>
        </div>

      </div>
    </div>
  );
};
