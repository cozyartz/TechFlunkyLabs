import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text3D, Center, Float, MeshTransmissionMaterial } from '@react-three/drei';
import type { Mesh, Group } from 'three';

function TFLogo() {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      // Slow auto-rotation
      groupRef.current.rotation.y += 0.003;
      // Subtle floating effect
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        {/* Main cube body - black */}
        <RoundedBox args={[2.2, 2.2, 2.2]} radius={0.3} smoothness={4}>
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.9}
            roughness={0.1}
          />
        </RoundedBox>

        {/* Electric yellow edges/wireframe effect */}
        <RoundedBox args={[2.25, 2.25, 2.25]} radius={0.32} smoothness={4}>
          <meshBasicMaterial
            color="#e0ff00"
            wireframe
            transparent
            opacity={0.6}
          />
        </RoundedBox>

        {/* T letter - front face */}
        <group position={[-0.45, 0.1, 1.15]}>
          {/* T horizontal bar */}
          <mesh position={[0.2, 0.4, 0]}>
            <boxGeometry args={[0.8, 0.18, 0.08]} />
            <meshStandardMaterial
              color="#e0ff00"
              emissive="#e0ff00"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* T vertical bar */}
          <mesh position={[0.2, -0.1, 0]}>
            <boxGeometry args={[0.18, 0.8, 0.08]} />
            <meshStandardMaterial
              color="#e0ff00"
              emissive="#e0ff00"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* F letter - front face */}
        <group position={[0.35, 0.1, 1.15]}>
          {/* F vertical bar */}
          <mesh position={[0, -0.1, 0]}>
            <boxGeometry args={[0.18, 0.8, 0.08]} />
            <meshStandardMaterial
              color="#e0ff00"
              emissive="#e0ff00"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* F top horizontal bar */}
          <mesh position={[0.25, 0.4, 0]}>
            <boxGeometry args={[0.68, 0.18, 0.08]} />
            <meshStandardMaterial
              color="#e0ff00"
              emissive="#e0ff00"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* F middle horizontal bar */}
          <mesh position={[0.15, 0.05, 0]}>
            <boxGeometry args={[0.48, 0.14, 0.08]} />
            <meshStandardMaterial
              color="#e0ff00"
              emissive="#e0ff00"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Glowing orbs at corners */}
        {[
          [-1.1, 1.1, 1.1],
          [1.1, 1.1, 1.1],
          [-1.1, -1.1, 1.1],
          [1.1, -1.1, 1.1],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#e0ff00"
              emissive="#e0ff00"
              emissiveIntensity={2}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function ParticleField() {
  const particlesRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.03;
    }
  });

  const particles = Array.from({ length: 50 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
    ] as [number, number, number],
    scale: Math.random() * 0.03 + 0.01,
  }));

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.scale, 8, 8]} />
          <meshBasicMaterial color="#e0ff00" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

export default function Logo3D() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#e0ff00" />
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#e0ff00"
        />
        <TFLogo />
        <ParticleField />
      </Canvas>
    </div>
  );
}
