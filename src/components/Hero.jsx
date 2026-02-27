import { useState, useEffect, Suspense, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';
import { labMetrics, typingTitles } from '../data/portfolioData';

// ==========================================
// 1. 3D Camera Rig (ระบบ Parallax ตามเมาส์)
// ==========================================
function CameraRig() {
  useFrame((state) => {
    // คำนวณตำแหน่งเมาส์และให้กล้องเคลื่อนที่ตามแบบนุ่มนวล (Lerp)
    const targetX = state.pointer.x * 2;
    const targetY = state.pointer.y * 2;
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.lookAt(0, 0, 0); // บังคับกล้องมองไปที่จุดศูนย์กลางเสมอ
  });
  return null;
}

// ==========================================
// 2. 3D Scene Component (ระบบแกนกลาง AI)
// ==========================================
function NeuralCore3D() {
  const coreRef = useRef();

  // ทำให้โมเดลหมุนเองเรื่อยๆ แบบ 3D Transition
  useFrame(() => {
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.003;
      coreRef.current.rotation.x += 0.001;
    }
  });

  return (
    <>
      {/* เรียกใช้ระบบ Parallax */}
      <CameraRig />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} color="#00f2fe" />
      <directionalLight position={[-5, -5, -5]} intensity={2} color="#764ba2" />
      
      <group ref={coreRef}>
        {/* แกนกลางพลังงาน AI (บิดเบี้ยวและลอยได้) */}
        <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
          <Sphere args={[1.8, 64, 64]}>
            <MeshDistortMaterial 
              color="#030014" 
              emissive="#4facfe"
              emissiveIntensity={0.4}
              distort={0.4} 
              speed={2.5} 
              roughness={0.1} 
              metalness={0.9}
              wireframe={true} 
              wireframeLinewidth={2}
            />
          </Sphere>
          {/* ลูกแก้วใสแกนใน */}
          <Sphere args={[1, 32, 32]}>
            <meshBasicMaterial color="#00f2fe" transparent opacity={0.15} />
          </Sphere>
        </Float>
      </group>

      {/* อนุภาคข้อมูล (Data Particles) แบบไหลเวียน */}
      <Sparkles count={400} scale={18} size={2.5} speed={0.4} opacity={0.8} color="#00f5ff" />
      <Sparkles count={250} scale={12} size={4} speed={0.8} opacity={0.4} color="#764ba2" />
    </>
  );
}

// ==========================================
// 3. Main Hero Component
// ==========================================
export default function Hero() {
  // สร้าง Ref เพื่อใช้จับอีเวนต์เมาส์ทั้งหน้าจอ
  const containerRef = useRef();
  
  const [displayText, setDisplayText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing Effect Logic
  useEffect(() => {
    const current = typingTitles[titleIndex];
    const speed = isDeleting ? 30 : 60;

    if (!isDeleting && displayText === current) {
      const t = setTimeout(() => setIsDeleting(true), 2500);
      return () => clearTimeout(t);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTitleIndex((p) => (p + 1) % typingTitles.length);
      return;
    }

    const t = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? current.substring(0, displayText.length - 1)
          : current.substring(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(t);
  }, [displayText, titleIndex, isDeleting]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030014]"
    >
      
      {/* 1. Animated Data Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(79, 172, 254, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79, 172, 254, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,transparent_10%,#030014_90%)] pointer-events-none" />

      {/* 2. 3D Canvas Background */}
      <div className="absolute inset-0 z-0 opacity-80">
        {/* eventSource ผูกกับ containerRef เพื่อให้ทะลุเลเยอร์มารับค่าเมาส์ได้ */}
        <Canvas 
          camera={{ position: [0, 0, 7], fov: 45 }}
          eventSource={containerRef}
          eventPrefix="client"
        >
          <Suspense fallback={null}>
            <NeuralCore3D />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlays & Gradients */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#030014]/50 via-transparent to-[#030014] pointer-events-none" />

      {/* 3. Content - ตั้ง pointer-events-none เพื่อให้เมาส์ทะลุไปหา 3D ยกเว้นตัวปุ่ม */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center mt-12 pointer-events-none">

        {/* Lab Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-3 px-8 py-3 rounded-full backdrop-blur-md border border-[#4facfe]/40 bg-[#4facfe]/10 mb-10 shadow-[0_0_40px_rgba(79,172,254,0.15)] pointer-events-auto"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2fe] opacity-80"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4facfe]"></span>
          </span>
          <span className="text-[#4facfe] text-sm md:text-base tracking-[0.25em] uppercase font-bold">
            Next-Gen AI Research
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-6xl sm:text-7xl md:text-[6rem] lg:text-[7.5rem] font-black leading-[1.05] tracking-tight mb-8 drop-shadow-2xl"
        >
          <span className="text-white">Architecting </span>
          <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-[#4facfe] via-[#00f2fe] to-[#38f9d7] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(79,172,254,0.3)]">
            Intelligent Systems
          </span>
        </motion.h1>

        {/* Typing subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="h-12 text-xl md:text-3xl lg:text-4xl text-[#e0e0e0] mb-10 flex justify-center items-center"
        >
          <span className="text-[#4facfe]/60 mr-3">root@system:~$</span>
          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] font-bold">{displayText}</span>
          <span className="inline-block w-[12px] h-[30px] bg-[#00f2fe] ml-3 animate-pulse" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-white/70 text-base md:text-xl lg:text-2xl max-w-4xl mx-auto mb-16 leading-relaxed font-normal"
        >
          Designing and deploying production-grade AI systems —
          from scalable neural architectures to data optimization engines —
          engineered for measurable business performance.
        </motion.p>

        {/* CTA Buttons - ใส่ pointer-events-auto ให้กดได้ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row justify-center gap-6 mb-28 pointer-events-auto"
        >
          <Link
            to="/projects"
            className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-[#030014] font-bold text-lg md:text-xl tracking-wider overflow-hidden transition-all hover:scale-105 shadow-[0_0_50px_rgba(79,172,254,0.5)]"
          >
            <span className="relative z-10">INITIALIZE PROJECTS</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

          <Link
            to="/architecture"
            className="px-10 py-5 rounded-2xl border-2 border-white/10 text-white hover:border-[#4facfe]/60 hover:bg-[#4facfe]/10 hover:text-[#4facfe] backdrop-blur-xl transition-all text-lg md:text-xl font-bold tracking-wider"
          >
            SYSTEM ARCHITECTURE
          </Link>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto relative pointer-events-auto"
        >
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#4facfe]/40 to-transparent -translate-y-1/2 z-0 hidden md:block" />
          
          {labMetrics.map((m, i) => (
            <div
              key={i}
              className="relative z-10 rounded-3xl p-8 bg-[#030014]/80 backdrop-blur-xl border border-white/10 hover:border-[#00f2fe]/60 hover:bg-white/[0.04] transition-all duration-500 group shadow-lg cursor-default"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#4facfe]/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity" />
              <div className="text-5xl md:text-6xl font-black bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform origin-bottom">
                {m.number}
              </div>
              <div className="text-[#4facfe] text-sm md:text-base uppercase tracking-[0.2em] font-bold">
                {m.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}