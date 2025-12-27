import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { Group, Mesh } from 'three';

// Create extruded T shape
function TLetter({ position }: { position: [number, number, number] }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    // T shape - top bar
    s.moveTo(-0.6, 0.8);
    s.lineTo(0.6, 0.8);
    s.lineTo(0.6, 0.55);
    s.lineTo(0.15, 0.55);
    s.lineTo(0.15, -0.8);
    s.lineTo(-0.15, -0.8);
    s.lineTo(-0.15, 0.55);
    s.lineTo(-0.6, 0.55);
    s.lineTo(-0.6, 0.8);
    return s;
  }, []);

  const extrudeSettings = useMemo(() => ({
    steps: 1,
    depth: 0.2,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.03,
    bevelSegments: 3,
  }), []);

  return (
    <mesh position={position} castShadow receiveShadow>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshStandardMaterial
        color="#000000"
        metalness={0.95}
        roughness={0.05}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

// Create extruded F shape
function FLetter({ position }: { position: [number, number, number] }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    // F shape
    s.moveTo(-0.4, 0.8);
    s.lineTo(0.5, 0.8);
    s.lineTo(0.5, 0.55);
    s.lineTo(-0.1, 0.55);
    s.lineTo(-0.1, 0.15);
    s.lineTo(0.35, 0.15);
    s.lineTo(0.35, -0.1);
    s.lineTo(-0.1, -0.1);
    s.lineTo(-0.1, -0.8);
    s.lineTo(-0.4, -0.8);
    s.lineTo(-0.4, 0.8);
    return s;
  }, []);

  const extrudeSettings = useMemo(() => ({
    steps: 1,
    depth: 0.2,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.03,
    bevelSegments: 3,
  }), []);

  return (
    <mesh position={position} castShadow receiveShadow>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshStandardMaterial
        color="#000000"
        metalness={0.95}
        roughness={0.05}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

// Glowing ring around the logo
function GlowRing() {
  const ringRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <torusGeometry args={[2.2, 0.02, 16, 100]} />
      <meshBasicMaterial color="#e0ff00" transparent opacity={0.8} />
    </mesh>
  );
}

// Orbiting particles
function OrbitingParticles() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const particles = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * Math.PI * 2,
      radius: 2.5,
      size: 0.04 + Math.random() * 0.03,
      speed: 0.5 + Math.random() * 0.5,
    })), []);

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(p.angle) * p.radius,
            (Math.random() - 0.5) * 0.5,
            Math.sin(p.angle) * p.radius,
          ]}
        >
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshBasicMaterial color="#e0ff00" />
        </mesh>
      ))}
    </group>
  );
}

// Mouse follower component
function MouseFollower({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<Group>(null);
  const { viewport } = useThree();
  const mousePos = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      mousePos.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // Calculate target rotation based on mouse position
      targetRotation.current.y = mousePos.current.x * 0.5;
      targetRotation.current.x = mousePos.current.y * 0.3;

      // Smooth interpolation
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

function TFLogo() {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle breathing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      groupRef.current.scale.setScalar(hovered ? scale * 1.1 : scale);
    }
  });

  return (
    <MouseFollower>
      <group
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* T letter */}
        <TLetter position={[-0.7, 0, 0]} />

        {/* F letter */}
        <FLetter position={[0.6, 0, 0]} />

        {/* Yellow accent line connecting T and F */}
        <mesh position={[0, -0.9, 0.1]}>
          <boxGeometry args={[2.2, 0.08, 0.08]} />
          <meshStandardMaterial
            color="#e0ff00"
            emissive="#e0ff00"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Glowing dot accent */}
        <mesh position={[0, 0.9, 0.15]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#e0ff00"
            emissive="#e0ff00"
            emissiveIntensity={2}
          />
        </mesh>

        {/* Subtle glow ring */}
        <GlowRing />

        {/* Orbiting particles */}
        <OrbitingParticles />
      </group>
    </MouseFollower>
  );
}

export default function Logo3D() {
  return (
    <div className="w-full h-[400px] md:h-[500px] cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting for sleek metallic look */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-5, 5, -5]} intensity={0.6} color="#e0ff00" />
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#e0ff00" />
        <spotLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" angle={0.5} penumbra={1} />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* Allow user to drag and spin the logo */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          rotateSpeed={0.5}
        />

        <TFLogo />
      </Canvas>
    </div>
  );
}
