import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroThermalGlobeProps {
  heatWaveIntensity?: number;
}

export const HeroThermalGlobe: React.FC<HeroThermalGlobeProps> = ({
  heatWaveIntensity = 1.05
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Dimensions
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Group to hold all 3D objects for mouse rotation
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Central Core: High-poly Sphere with dynamic color
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 4);
    const coreMat = new THREE.MeshBasicMaterial({
      color: heatWaveIntensity > 1.15 ? 0xef4444 : 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    // 2. Inner Glowing Thermal Nucleus
    const nucleusGeo = new THREE.SphereGeometry(1.15, 32, 32);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: heatWaveIntensity > 1.15 ? 0xd97706 : 0xfbbf24,
      transparent: true,
      opacity: 0.65
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    globeGroup.add(nucleusMesh);

    // 3. Orbital Latitude/Longitude Thermal Shield Rings
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.015, 16, 100), ringMat);
    ring1.rotation.x = Math.PI / 3;
    globeGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.015, 16, 100), ringMat);
    ring2.rotation.y = Math.PI / 4;
    globeGroup.add(ring2);

    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.012, 16, 100), ringMat);
    ring3.rotation.z = Math.PI / 6;
    globeGroup.add(ring3);

    // 4. Volumetric Solar Ember Particle Field
    const particleCount = 650;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xf59e0b); // Amber
    const color2 = new THREE.Color(0xef4444); // Crimson
    const color3 = new THREE.Color(0x38bdf8); // Sky cooling

    for (let i = 0; i < particleCount; i++) {
      // Swirling spherical cloud
      const radius = 2.0 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = Math.random() > 0.3 ? (Math.random() > 0.5 ? color1 : color2) : color3;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    globeGroup.add(particles);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
      mouseY = -(((event.clientY - rect.top) / height) * 2 - 1);

      targetRotationY = mouseX * 0.5;
      targetRotationX = mouseY * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!mount) return;
      const newWidth = mount.clientWidth;
      const newHeight = mount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous subtle rotation
      coreMesh.rotation.y = elapsedTime * 0.15;
      coreMesh.rotation.x = elapsedTime * 0.08;

      nucleusMesh.rotation.y = -elapsedTime * 0.1;

      ring1.rotation.z = elapsedTime * 0.06;
      ring2.rotation.x = -elapsedTime * 0.05;
      ring3.rotation.y = elapsedTime * 0.04;

      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = Math.sin(elapsedTime * 0.1) * 0.05;

      // Smooth mouse damping
      globeGroup.rotation.y += (targetRotationY - globeGroup.rotation.y) * 0.05;
      globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [heatWaveIntensity]);

  return (
    <div className="relative w-full h-[440px] md:h-[540px] flex items-center justify-center overflow-hidden">
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Atmospheric Radial Gradient Glow Backdrop (Layers AI depth) */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
      <div className="absolute w-[360px] h-[360px] rounded-full bg-amber-500/15 blur-3xl pointer-events-none -z-10" />

      {/* Floating Tactical HUD Labels around 3D core */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-none hidden sm:block">
        <div className="bg-slate-950/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-amber-500/30 text-[11px] font-mono text-amber-300 shadow-xl flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          <span>SOLAR THERMAL DOME: 920 W/m² IRRADIANCE</span>
        </div>
      </div>

      <div className="absolute top-6 right-6 z-20 pointer-events-none hidden sm:block">
        <div className="bg-slate-950/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-red-500/30 text-[11px] font-mono text-red-300 shadow-xl flex items-center gap-2">
          <span>ISO 7933 PHS PHYSICS MODEL ACTIVE</span>
        </div>
      </div>
    </div>
  );
};
