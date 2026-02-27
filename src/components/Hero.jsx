import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// ─── DATA ────────────────────────────────────────────────────────────────────
const typingTitles = [
  'Building Neural Architectures',
  'Scaling AI to Production',
  'Optimizing for Real-World Impact',
  'Designing Intelligent Systems',
];

const labMetrics = [
  { number: '47+', label: 'AI Models Deployed' },
  { number: '99.2%', label: 'Uptime SLA' },
  { number: '2.4B', label: 'Tokens Processed' },
  { number: '18ms', label: 'Avg Latency' },
];

// ─── THREE.JS SCENE ──────────────────────────────────────────────────────────
function useThreeScene(canvasRef) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 2.2, 7);
    camera.lookAt(0, 0, 0);

    // ════════════════════════════════════════════
    // 1. INFINITE GRID FLOOR (perspective 3D)
    // ════════════════════════════════════════════
    const gridMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(0,0) } },
      vertexShader: `
        varying vec2 vUv;
        varying float vDist;
        void main() {
          vUv = uv;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vDist = length(worldPos.xz);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec2 vUv;
        varying float vDist;

        float grid(vec2 p, float size) {
          vec2 g = abs(fract(p / size - 0.5) - 0.5) / fwidth(p / size);
          return min(g.x, g.y);
        }

        void main() {
          vec2 p = vUv * 60.0 - 30.0;

          // Moving pulse from centre
          float pulse = sin(vDist * 0.35 - uTime * 1.2) * 0.5 + 0.5;

          float g1 = 1.0 - clamp(grid(p, 1.0), 0.0, 1.0);
          float g2 = 1.0 - clamp(grid(p, 5.0), 0.0, 1.0);

          float fade = 1.0 - smoothstep(10.0, 28.0, vDist);
          float lineBrightness = (g1 * 0.5 + g2 * 0.9) * fade;

          // Colour: violet → indigo glow on pulse
          vec3 baseCol = vec3(0.28, 0.15, 0.7);
          vec3 pulseCol = vec3(0.6, 0.45, 1.0);
          vec3 col = mix(baseCol, pulseCol, pulse * g2 * fade * 0.6);

          gl_FragColor = vec4(col, lineBrightness * 0.55);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });

    const gridGeo = new THREE.PlaneGeometry(60, 60, 1, 1);
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    gridMesh.rotation.x = -Math.PI / 2;
    gridMesh.position.y = -2.5;
    scene.add(gridMesh);

    // ════════════════════════════════════════════
    // 2. CENTRAL PULSING ORB (icosahedron)
    // ════════════════════════════════════════════
    const orbGeo = new THREE.IcosahedronGeometry(1.1, 4);
    const orbMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPos;
        void main() {
          vNormal = normal;
          vPos = position;
          float disp = sin(position.x * 3.0 + uTime * 1.5)
                     * cos(position.y * 3.0 + uTime * 1.1)
                     * sin(position.z * 3.0 + uTime * 0.9) * 0.12;
          vec3 p = position + normal * disp;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPos;
        void main() {
          vec3 viewDir = normalize(cameraPosition - vPos);
          float fresnel = pow(1.0 - clamp(dot(vNormal, viewDir), 0.0, 1.0), 2.5);
          float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
          vec3 inner = vec3(0.2, 0.1, 0.55);
          vec3 outer = vec3(0.65, 0.5, 1.0);
          vec3 col = mix(inner, outer, fresnel);
          col += vec3(0.3, 0.2, 0.5) * pulse * fresnel * 0.5;
          gl_FragColor = vec4(col, fresnel * 0.75 + 0.08);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.position.set(0, 0.3, -1.5);
    scene.add(orb);

    // Wireframe shell around orb
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0.55, 0.4, 1.0),
      wireframe: true,
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
    });
    const wireOrb = new THREE.Mesh(new THREE.IcosahedronGeometry(1.35, 2), wireMat);
    wireOrb.position.copy(orb.position);
    scene.add(wireOrb);

    // ════════════════════════════════════════════
    // 3. ORBITING RINGS around the orb
    // ════════════════════════════════════════════
    const rings = [];
    const ringAngles = [0, Math.PI / 3, -Math.PI / 3];
    const ringSpeeds = [0.4, -0.3, 0.55];
    ringAngles.forEach((angle, i) => {
      const rGeo = new THREE.TorusGeometry(1.7 + i * 0.25, 0.008 + i * 0.003, 3, 128);
      const rMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.5 + i * 0.05, 0.35, 1.0),
        transparent: true,
        opacity: 0.35 - i * 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const ring = new THREE.Mesh(rGeo, rMat);
      ring.position.copy(orb.position);
      ring.rotation.x = angle;
      ring.rotation.z = angle * 0.5;
      scene.add(ring);
      rings.push({ mesh: ring, speed: ringSpeeds[i], axis: new THREE.Vector3(Math.sin(angle), Math.cos(angle * 0.7), 0.3).normalize() });
    });

    // ════════════════════════════════════════════
    // 4. VOLUMETRIC LIGHT BEAMS (from below)
    // ════════════════════════════════════════════
    const beams = [];
    const beamPositions = [[-2.5, 0], [0, 0], [2.5, 0], [-1.3, -1.5], [1.3, -1.5]];
    beamPositions.forEach(([bx, bz], i) => {
      const bGeo = new THREE.CylinderGeometry(0.04, 0.35, 6.0, 8, 1, true);
      const bMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uPhase: { value: i * 1.3 } },
        vertexShader: `
          varying float vY;
          void main() {
            vY = position.y;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform float uPhase;
          varying float vY;
          void main() {
            float pulse = sin(uTime * 1.4 + uPhase) * 0.5 + 0.5;
            float fade = (vY + 3.0) / 6.0;
            fade = clamp(fade, 0.0, 1.0);
            vec3 col = mix(vec3(0.4, 0.25, 0.9), vec3(0.7, 0.55, 1.0), fade);
            gl_FragColor = vec4(col, fade * pulse * 0.18);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });
      const beam = new THREE.Mesh(bGeo, bMat);
      beam.position.set(bx, -1.5, bz - 2);
      scene.add(beam);
      beams.push(beam);
    });

    // ════════════════════════════════════════════
    // 5. FLOATING PARTICLES (depth layers)
    // ════════════════════════════════════════════
    const particleCount = 200;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pSizes = new Float32Array(particleCount);
    const pSpeeds = new Float32Array(particleCount);
    const pPhases = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pPos[i*3]   = (Math.random() - 0.5) * 18;
      pPos[i*3+1] = (Math.random() - 0.5) * 10;
      pPos[i*3+2] = (Math.random() - 0.5) * 8 - 2;
      pSizes[i]  = 0.03 + Math.random() * 0.09;
      pSpeeds[i] = 0.2 + Math.random() * 0.6;
      pPhases[i] = Math.random() * Math.PI * 2;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('aSize',    new THREE.BufferAttribute(pSizes, 1));
    pGeo.setAttribute('aSpeed',   new THREE.BufferAttribute(pSpeeds, 1));
    pGeo.setAttribute('aPhase',   new THREE.BufferAttribute(pPhases, 1));

    const pMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(0,0) } },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        attribute float aSize;
        attribute float aSpeed;
        attribute float aPhase;
        varying float vAlpha;
        void main() {
          vec3 pos = position;
          pos.y += sin(uTime * aSpeed + aPhase) * 0.12;
          pos.x += cos(uTime * aSpeed * 0.6 + aPhase) * 0.06;
          vec2 toMouse = uMouse - pos.xy;
          float d = length(toMouse);
          if (d < 2.0) pos.xy -= normalize(toMouse) * (2.0 - d) * 0.25;
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * (280.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
          vAlpha = 0.25 + 0.55 * (sin(uTime * aSpeed + aPhase) * 0.5 + 0.5);
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;
          float s = pow(1.0 - d * 2.0, 2.5);
          gl_FragColor = vec4(0.6, 0.45, 1.0, s * vAlpha);
        }
      `,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ════════════════════════════════════════════
    // 6. NEURAL CONNECTION LINES (between particles)
    // ════════════════════════════════════════════
    const pVecs = [];
    for (let i = 0; i < particleCount; i++) pVecs.push(new THREE.Vector3(pPos[i*3], pPos[i*3+1], pPos[i*3+2]));
    const lineArr = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i+1; j < particleCount; j++) {
        if (pVecs[i].distanceTo(pVecs[j]) < 2.0) {
          lineArr.push(pVecs[i].x, pVecs[i].y, pVecs[i].z, pVecs[j].x, pVecs[j].y, pVecs[j].z);
        }
      }
    }
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lineArr), 3));
    scene.add(new THREE.LineSegments(lGeo, new THREE.LineBasicMaterial({
      color: new THREE.Color(0.4, 0.3, 0.9),
      transparent: true, opacity: 0.06,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })));

    // ════════════════════════════════════════════
    // 7. DISTANT GALAXY PLANE (background depth)
    // ════════════════════════════════════════════
    const galaxyCount = 3000;
    const gGeo = new THREE.BufferGeometry();
    const gPos = new Float32Array(galaxyCount * 3);
    const gSizes = new Float32Array(galaxyCount);
    for (let i = 0; i < galaxyCount; i++) {
      const r = 8 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.5;
      gPos[i*3]   = r * Math.cos(theta) * Math.cos(phi);
      gPos[i*3+1] = r * Math.sin(phi) * 2;
      gPos[i*3+2] = r * Math.sin(theta) * Math.cos(phi) - 15;
      gSizes[i] = 0.01 + Math.random() * 0.04;
    }
    gGeo.setAttribute('position', new THREE.BufferAttribute(gPos, 3));
    gGeo.setAttribute('aSize',    new THREE.BufferAttribute(gSizes, 1));
    const gMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute float aSize;
        uniform float uTime;
        varying float vA;
        void main() {
          vA = 0.3 + 0.5 * fract(sin(dot(position.xy, vec2(12.9898,78.233))) * 43758.5453 + uTime * 0.2);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (200.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying float vA;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          if (length(uv) > 0.5) discard;
          gl_FragColor = vec4(0.7, 0.65, 1.0, vA * 0.6);
        }
      `,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const galaxy = new THREE.Points(gGeo, gMat);
    scene.add(galaxy);

    // ── Handlers ──
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ── Animate ──
    let t = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      t += 0.007;

      gridMat.uniforms.uTime.value = t;
      orbMat.uniforms.uTime.value = t;
      pMat.uniforms.uTime.value = t;
      pMat.uniforms.uMouse.value.set(mouseRef.current.x * 7, mouseRef.current.y * 4);
      gMat.uniforms.uTime.value = t;
      beams.forEach(b => { b.material.uniforms.uTime.value = t; });

      // Orb slow rotation + bob
      orb.rotation.y += 0.004;
      orb.rotation.x += 0.002;
      orb.position.y = 0.3 + Math.sin(t * 0.8) * 0.12;
      wireOrb.rotation.y -= 0.003;
      wireOrb.rotation.z += 0.002;
      wireOrb.position.y = orb.position.y;

      // Rings orbit
      rings.forEach(({ mesh, speed, axis }) => {
        mesh.rotateOnAxis(axis, speed * 0.012);
        mesh.position.y = orb.position.y;
      });

      // Camera parallax
      camera.position.x += (mouseRef.current.x * 0.6 - camera.position.x) * 0.035;
      camera.position.y += (2.2 + mouseRef.current.y * 0.35 - camera.position.y) * 0.035;
      camera.lookAt(0, 0, 0);

      // Galaxy slow drift
      galaxy.rotation.y += 0.0003;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [canvasRef]);
}

// ─── TYPING HOOK ─────────────────────────────────────────────────────────────
function useTyping(titles) {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = titles[idx];
    if (!deleting && display === current) {
      const t = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (deleting && display === '') {
      setDeleting(false);
      setIdx((p) => (p + 1) % titles.length);
      return;
    }
    const speed = deleting ? 30 : 65;
    const t = setTimeout(() => {
      setDisplay(deleting
        ? current.substring(0, display.length - 1)
        : current.substring(0, display.length + 1)
      );
    }, speed);
    return () => clearTimeout(t);
  }, [display, idx, deleting, titles]);

  return display;
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const canvasRef = useRef(null);
  const typedText = useTyping(typingTitles);
  const [visible, setVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useThreeScene(canvasRef);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;600;700&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Deep Space Indigo Galaxy palette ── */
        :root {
          --bg:        #06040f;
          --bg-mid:    #0a0820;
          --accent:    #a78bfa;
          --accent2:   #818cf8;
          --accent3:   #c4b5fd;
          --glow:      rgba(139,92,246,0.35);
          --glow-soft: rgba(99,102,241,0.15);
          --text:      rgba(255,255,255,0.92);
          --text-dim:  rgba(200,195,230,0.38);
          --mono:      'Space Mono', monospace;
          --sans:      'Outfit', sans-serif;
        }

        .hero-root {
          position: relative; min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          background: radial-gradient(ellipse 140% 100% at 50% 0%,
            #120b2e 0%, #0c0820 30%, #06040f 65%, #030208 100%);
          font-family: var(--sans);
        }

        /* Galaxy star-dust layer */
        .hero-root::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.55) 0%, transparent 100%),
            radial-gradient(1px 1px at 28% 72%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 35%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 75% 85%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 88% 22%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 42% 60%, rgba(255,255,255,0.45) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 65% 12%, rgba(167,139,250,0.7) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 20% 50%, rgba(167,139,250,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 90% 65%, rgba(129,140,248,0.6) 0%, transparent 100%),
            radial-gradient(2px 2px at 35% 10%, rgba(196,181,253,0.5) 0%, transparent 100%),
            radial-gradient(2px 2px at 80% 40%, rgba(167,139,250,0.45) 0%, transparent 100%);
          pointer-events: none;
          animation: twinkle 8s ease-in-out infinite alternate;
        }
        @keyframes twinkle {
          0%   { opacity: 0.6; }
          50%  { opacity: 1; }
          100% { opacity: 0.7; }
        }

        .hero-canvas { position: absolute; inset: 0; width: 100%; height: 100%; }

        .overlay-radial {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 70% 55% at 50% 38%,
              rgba(109,40,217,0.13) 0%, rgba(67,56,202,0.06) 50%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 20% 80%,
              rgba(139,92,246,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 35% 35% at 80% 15%,
              rgba(99,102,241,0.08) 0%, transparent 60%);
        }
        .overlay-vignette {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 110% 110% at 50% 50%, transparent 35%, rgba(6,4,15,0.8) 100%);
        }
        .overlay-top { position: absolute; top: 0; left: 0; right: 0; height: 200px; background: linear-gradient(to bottom, #06040f, transparent); pointer-events: none; }
        .overlay-bottom { position: absolute; bottom: 0; left: 0; right: 0; height: 220px; background: linear-gradient(to top, #06040f, transparent); pointer-events: none; }

        /* Fine dot-grid texture */
        .scanlines {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(139,92,246,0.06) 1px, transparent 1px);
          background-size: 36px 36px;
        }

        .corner-tl { position: absolute; top: 28px; left: 28px; width: 56px; height: 56px; border-top: 1px solid rgba(167,139,250,0.25); border-left: 1px solid rgba(167,139,250,0.25); pointer-events: none; z-index: 5; }
        .corner-br { position: absolute; bottom: 28px; right: 28px; width: 56px; height: 56px; border-bottom: 1px solid rgba(167,139,250,0.25); border-right: 1px solid rgba(167,139,250,0.25); pointer-events: none; z-index: 5; }

        /* Nebula drifting blobs */
        .ambient-particle { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(1px); }
        .ap1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(109,40,217,0.07) 0%, transparent 65%); top: -10%; left: -8%; animation: driftA 20s ease-in-out infinite; }
        .ap2 { width: 380px; height: 380px; background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%); top: 50%; right: -5%; animation: driftB 24s ease-in-out infinite; }
        .ap3 { width: 280px; height: 280px; background: radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 65%); bottom: 10%; left: 15%; animation: driftA 16s ease-in-out infinite reverse; }
        @keyframes driftA { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-20px) scale(1.05); } 66% { transform: translate(-20px,15px) scale(0.97); } }
        @keyframes driftB { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(-30px,25px) scale(1.03); } 66% { transform: translate(20px,-12px) scale(0.98); } }

        /* Data streams — purple tint */
        .data-stream { position: absolute; width: 1px; background: linear-gradient(to bottom, transparent, rgba(167,139,250,0.2), transparent); pointer-events: none; animation: streamFlow 4s linear infinite; }
        .ds1 { height: 120px; left: 15%; top: -120px; animation-duration: 5s; }
        .ds2 { height: 80px; left: 42%; top: -80px; animation-delay: 1.5s; animation-duration: 4s; }
        .ds3 { height: 160px; right: 20%; top: -160px; animation-delay: 3s; animation-duration: 6s; }
        .ds4 { height: 100px; left: 70%; top: -100px; animation-delay: 0.8s; animation-duration: 4.5s; }
        @keyframes streamFlow { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(110vh); opacity: 0; } }

        /* ── Layout ── */
        .hero-content { position: relative; z-index: 10; max-width: 900px; margin: 0 auto; padding: 0 24px; text-align: center; }

        .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.9s cubic-bezier(.2,.8,.3,1), transform 0.9s cubic-bezier(.2,.8,.3,1); }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: 0.15s; } .d2 { transition-delay: 0.4s; } .d3 { transition-delay: 0.65s; }
        .d4 { transition-delay: 0.85s; } .d5 { transition-delay: 1.05s; } .d6 { transition-delay: 1.25s; }

        /* Badge */
        .lab-badge {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 7px 18px; border-radius: 100px;
          border: 1px solid rgba(167,139,250,0.22);
          background: rgba(109,40,217,0.08); backdrop-filter: blur(20px);
          margin-bottom: 36px;
          box-shadow: 0 0 28px rgba(139,92,246,0.12), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .ping-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); position: relative; box-shadow: 0 0 8px var(--accent); }
        .ping-dot::after { content: ''; position: absolute; inset: -4px; border-radius: 50%; background: rgba(167,139,250,0.4); animation: pingAnim 1.8s ease-out infinite; }
        @keyframes pingAnim { 0% { transform: scale(0.8); opacity: 0.9; } 100% { transform: scale(2.6); opacity: 0; } }
        .badge-text { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--accent); font-weight: 400; }

        /* Headline — Outfit Light/Bold mix */
        .headline { font-size: clamp(38px,7.5vw,80px); font-weight: 200; line-height: 1.05; letter-spacing: -0.02em; margin-bottom: 26px; font-family: var(--sans); }
        .hl-white { color: var(--text); font-weight: 300; }
        .hl-bold { color: var(--text); font-weight: 700; }
        .hl-gradient {
          background: linear-gradient(130deg, #c4b5fd 0%, #a78bfa 30%, #818cf8 65%, #6ee7f7 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          font-weight: 700;
          filter: drop-shadow(0 0 32px rgba(167,139,250,0.45));
        }
        .hl-dim { color: rgba(200,195,230,0.28); font-weight: 200; }

        /* Typing */
        .typing-wrap { font-family: var(--mono); font-size: clamp(12px,1.8vw,15px); color: rgba(200,195,230,0.3); margin-bottom: 22px; min-height: 26px; letter-spacing: 0.02em; }
        .typing-prompt { color: rgba(167,139,250,0.4); }
        .typing-text { color: var(--accent3); font-weight: 400; }
        .typing-cursor { display: inline-block; width: 2px; height: 1em; background: var(--accent); margin-left: 2px; vertical-align: text-bottom; animation: blink 0.9s step-end infinite; box-shadow: 0 0 8px var(--accent); }
        @keyframes blink { 50% { opacity: 0; } }

        /* Description */
        .desc { font-size: clamp(13px,1.5vw,15px); line-height: 1.9; color: var(--text-dim); max-width: 540px; margin: 0 auto 44px; font-weight: 300; letter-spacing: 0.015em; }

        /* CTAs */
        .cta-wrap { display: flex; justify-content: center; gap: 14px; margin-bottom: 72px; flex-wrap: wrap; }
        .btn-primary {
          position: relative; padding: 13px 30px; border-radius: 12px;
          font-family: var(--sans); font-size: 12px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #06040f; text-decoration: none; overflow: hidden;
          background: linear-gradient(130deg, #c4b5fd, #a78bfa 45%, #818cf8);
          box-shadow: 0 0 28px rgba(139,92,246,0.5), 0 6px 24px rgba(99,102,241,0.35);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary::before { content: ''; position: absolute; inset: 0; background: linear-gradient(130deg, rgba(255,255,255,0.2), transparent 60%); }
        .btn-primary:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 0 48px rgba(139,92,246,0.75), 0 10px 36px rgba(99,102,241,0.5); }

        .btn-secondary {
          padding: 13px 30px; border-radius: 12px;
          font-family: var(--sans); font-size: 12px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(200,195,230,0.55); text-decoration: none;
          border: 1px solid rgba(167,139,250,0.15);
          background: rgba(109,40,217,0.06); backdrop-filter: blur(20px);
          transition: all 0.25s;
        }
        .btn-secondary:hover { border-color: rgba(167,139,250,0.4); color: var(--accent3); background: rgba(109,40,217,0.12); transform: translateY(-2px); box-shadow: 0 0 24px rgba(139,92,246,0.12); }

        /* Metrics */
        .metrics-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; max-width: 820px; margin: 0 auto; }
        @media (max-width: 640px) { .metrics-grid { grid-template-columns: repeat(2,1fr); } }

        .metric-card {
          position: relative; padding: 22px 18px; border-radius: 18px;
          border: 1px solid rgba(167,139,250,0.1);
          background: rgba(109,40,217,0.05); backdrop-filter: blur(28px);
          overflow: hidden; transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          animation: floatY 7s ease-in-out infinite;
        }
        .metric-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(167,139,250,0.35), transparent); }
        .metric-card::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.05), transparent); pointer-events: none; }
        .metric-card:hover { border-color: rgba(167,139,250,0.3); transform: translateY(-6px) !important; box-shadow: 0 20px 55px rgba(0,0,0,0.5), 0 0 35px rgba(139,92,246,0.1); }
        @keyframes floatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }

        .metric-num { font-family: var(--mono); font-size: clamp(20px,2.6vw,26px); font-weight: 400; background: linear-gradient(130deg, #c4b5fd, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 8px; display: block; letter-spacing: -0.02em; }
        .metric-label { font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(200,195,230,0.28); font-family: var(--mono); }

        /* Scroll */
        .scroll-indicator { position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 10; }
        .scroll-label { font-family: var(--mono); font-size: 8px; letter-spacing: 0.45em; color: rgba(167,139,250,0.2); text-transform: uppercase; }
        .scroll-line { width: 1px; height: 44px; background: linear-gradient(to bottom, rgba(167,139,250,0.5), transparent); animation: scrollPulse 2.2s ease-in-out infinite; }
        @keyframes scrollPulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
      `}</style>

      <section className="hero-root">
        <canvas ref={canvasRef} className="hero-canvas" />

        <div className="overlay-radial" />
        <div className="overlay-vignette" />
        <div className="overlay-top" />
        <div className="overlay-bottom" />
        <div className="scanlines" />
        <div className="corner-tl" />
        <div className="corner-br" />

        <div className="ambient-particle ap1" />
        <div className="ambient-particle ap2" />
        <div className="ambient-particle ap3" />
        <div className="data-stream ds1" />
        <div className="data-stream ds2" />
        <div className="data-stream ds3" />
        <div className="data-stream ds4" />

        <div className="hero-content" style={{ transform: `translateY(${scrollY * 0.18}px)` }}>

          <div className={`fade-up d1 ${visible ? 'visible' : ''}`} style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="lab-badge">
              <div className="ping-dot" />
              <span className="badge-text">AI Research Lab</span>
            </div>
          </div>

          <h1 className={`headline fade-up d2 ${visible ? 'visible' : ''}`}>
            <span className="hl-white">Architecting </span>
            <span className="hl-gradient">Intelligent</span>
            <br />
            <span className="hl-dim">Systems </span>
            <span className="hl-bold">for </span>
            <span className="hl-gradient">Real-World</span>
            <br />
            <span className="hl-bold">Impact</span>
          </h1>

          <div className={`typing-wrap fade-up d3 ${visible ? 'visible' : ''}`}>
            <span className="typing-prompt">{'> '}</span>
            <span className="typing-text">{typedText}</span>
            <span className="typing-cursor" />
          </div>

          <p className={`desc fade-up d4 ${visible ? 'visible' : ''}`}>
            Designing and deploying production-grade AI systems —
            from scalable data pipelines to optimization engines —
            engineered for measurable business performance.
          </p>

          <div className={`cta-wrap fade-up d5 ${visible ? 'visible' : ''}`}>
            <a href="/projects" className="btn-primary">Explore Projects</a>
            <a href="/architecture" className="btn-secondary">System Architecture</a>
          </div>

          <div className={`metrics-grid fade-up d6 ${visible ? 'visible' : ''}`}>
            {labMetrics.map((m, i) => (
              <div key={i} className="metric-card" style={{ animationDelay: `${i * 0.35}s` }}>
                <span className="metric-num">{m.number}</span>
                <span className="metric-label">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-indicator">
          <span className="scroll-label">Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>
    </>
  );
}