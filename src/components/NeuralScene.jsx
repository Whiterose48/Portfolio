import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Neural network node
function NeuralNode({ position, color, speed = 1, distort = 0.3 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
    }
  });

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 16, 16]} position={position} scale={0.3}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.6}
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

// Connection lines between nodes
function Connections({ nodes }) {
  const linesRef = useRef();

  const lineGeometry = useMemo(() => {
    const points = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = new THREE.Vector3(...nodes[i]).distanceTo(new THREE.Vector3(...nodes[j]));
        if (dist < 5) {
          points.push(new THREE.Vector3(...nodes[i]), new THREE.Vector3(...nodes[j]));
        }
      }
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [nodes]);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={lineGeometry}>
      <lineBasicMaterial color="#4facfe" transparent opacity={0.15} />
    </lineSegments>
  );
}

// Floating particles
function Particles({ count = 50 }) {
  const meshRef = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10],
        speed: 0.2 + Math.random() * 0.5,
      });
    }
    return temp;
  }, [count]);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      pos[i * 3] = p.position[0];
      pos[i * 3 + 1] = p.position[1];
      pos[i * 3 + 2] = p.position[2];
    });
    return pos;
  }, [particles, count]);

  useFrame((state) => {
    if (meshRef.current) {
      const positionsAttr = meshRef.current.geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        positionsAttr.array[i * 3 + 1] += Math.sin(state.clock.elapsedTime * particles[i].speed + i) * 0.002;
      }
      positionsAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#00f5ff" size={0.04} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// Central glowing orb
function CentralOrb() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05);
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <Sphere ref={meshRef} args={[1.2, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#0066ff"
          transparent
          opacity={0.35}
          distort={0.4}
          speed={3}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
      {/* Inner glow */}
      <Sphere args={[0.8, 24, 24]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#4facfe" transparent opacity={0.15} />
      </Sphere>
    </Float>
  );
}

// Scene composition
function Scene() {
  const groupRef = useRef();

  const nodePositions = useMemo(() => [
    [-3, 2, -1],
    [3, 1, -2],
    [-2, -2, 1],
    [2.5, -1.5, -1],
    [-1, 3, -2],
    [1, -3, 0],
    [-3.5, 0, -1.5],
    [3.5, 2.5, -0.5],
    [0, 2.5, -3],
    [-2, -0.5, 2],
    [2, 0.5, 1.5],
    [-1.5, 1.5, 1],
  ], []);

  const nodeColors = ['#4facfe', '#00f2fe', '#667eea', '#764ba2', '#f093fb', '#00f5ff'];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      // Mouse follow
      const mouseX = state.pointer.x * 0.3;
      const mouseY = state.pointer.y * 0.2;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY * 0.1, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, mouseX * 0.05, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <CentralOrb />
      {nodePositions.map((pos, i) => (
        <NeuralNode
          key={i}
          position={pos}
          color={nodeColors[i % nodeColors.length]}
          speed={0.5 + (i % 3) * 0.3}
          distort={0.2 + (i % 4) * 0.1}
        />
      ))}
      <Connections nodes={nodePositions} />
      <Particles count={80} />
    </group>
  );
}

export default function NeuralScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#4facfe" />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#764ba2" />
        <Scene />
      </Canvas>
    </div>
  );
}
