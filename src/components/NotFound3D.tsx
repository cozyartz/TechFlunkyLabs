import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, RoundedBox, MeshDistortMaterial } from '@react-three/drei';
import type { Mesh, Group } from 'three';
import * as THREE from 'three';

// Floating glitch cube that follows cursor
function GlitchCube({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.015;
      // Glitch effect when hovered
      if (hovered) {
        meshRef.current.position.x = position[0] + (Math.random() - 0.5) * 0.1;
        meshRef.current.position.y = position[1] + (Math.random() - 0.5) * 0.1;
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color={hovered ? '#e0ff00' : '#1a1a1a'}
          emissive={hovered ? '#e0ff00' : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0}
          metalness={0.9}
          roughness={0.1}
          wireframe={hovered}
        />
      </mesh>
    </Float>
  );
}

// 3D "4" digit made of boxes
function Digit4({ isActive }: { isActive: boolean }) {
  const barThickness = 0.18;
  const depth = 0.12;

  return (
    <group>
      {/* Vertical left bar (upper part) */}
      <mesh position={[-0.4, 0.35, 0]}>
        <boxGeometry args={[barThickness, 0.7, depth]} />
        <meshStandardMaterial
          color="#e0ff00"
          emissive="#e0ff00"
          emissiveIntensity={isActive ? 1 : 0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Horizontal bar */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.0, barThickness, depth]} />
        <meshStandardMaterial
          color="#e0ff00"
          emissive="#e0ff00"
          emissiveIntensity={isActive ? 1 : 0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Vertical right bar (full height) */}
      <mesh position={[0.4, 0, 0]}>
        <boxGeometry args={[barThickness, 1.4, depth]} />
        <meshStandardMaterial
          color="#e0ff00"
          emissive="#e0ff00"
          emissiveIntensity={isActive ? 1 : 0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

// 3D "0" digit made of boxes
function Digit0({ isActive }: { isActive: boolean }) {
  const barThickness = 0.18;
  const depth = 0.12;

  return (
    <group>
      {/* Top bar */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.7, barThickness, depth]} />
        <meshStandardMaterial
          color="#e0ff00"
          emissive="#e0ff00"
          emissiveIntensity={isActive ? 1 : 0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Bottom bar */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[0.7, barThickness, depth]} />
        <meshStandardMaterial
          color="#e0ff00"
          emissive="#e0ff00"
          emissiveIntensity={isActive ? 1 : 0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Left bar */}
      <mesh position={[-0.35, 0, 0]}>
        <boxGeometry args={[barThickness, 1.2, depth]} />
        <meshStandardMaterial
          color="#e0ff00"
          emissive="#e0ff00"
          emissiveIntensity={isActive ? 1 : 0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Right bar */}
      <mesh position={[0.35, 0, 0]}>
        <boxGeometry args={[barThickness, 1.2, depth]} />
        <meshStandardMaterial
          color="#e0ff00"
          emissive="#e0ff00"
          emissiveIntensity={isActive ? 1 : 0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

// Main 404 numbers with distortion effect
function Number404() {
  const groupRef = useRef<Group>(null);
  const { pointer } = useThree();
  const [activeDigit, setActiveDigit] = useState<number | null>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Smooth follow cursor
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.3,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.2,
        0.05
      );
    }
  });

  const spacing = 2.2;

  return (
    <group ref={groupRef}>
      {/* First 4 */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <group position={[-spacing, 0, 0]}>
          <mesh
            onPointerOver={() => setActiveDigit(0)}
            onPointerOut={() => setActiveDigit(null)}
          >
            <RoundedBox args={[1.8, 2.4, 0.4]} radius={0.15} smoothness={4}>
              <MeshDistortMaterial
                color="#0a0a0a"
                metalness={0.8}
                roughness={0.2}
                distort={activeDigit === 0 ? 0.15 : 0}
                speed={4}
              />
            </RoundedBox>
          </mesh>
          <group position={[0, 0, 0.25]} scale={1.2}>
            <Digit4 isActive={activeDigit === 0} />
          </group>
          {activeDigit === 0 && (
            <mesh position={[0, 0, -0.3]}>
              <planeGeometry args={[2.5, 3]} />
              <meshBasicMaterial color="#e0ff00" transparent opacity={0.1} />
            </mesh>
          )}
        </group>
      </Float>

      {/* 0 */}
      <Float speed={1.8} rotationIntensity={0.1} floatIntensity={0.2}>
        <group position={[0, 0, 0]}>
          <mesh
            onPointerOver={() => setActiveDigit(1)}
            onPointerOut={() => setActiveDigit(null)}
          >
            <RoundedBox args={[1.8, 2.4, 0.4]} radius={0.15} smoothness={4}>
              <MeshDistortMaterial
                color="#0a0a0a"
                metalness={0.8}
                roughness={0.2}
                distort={activeDigit === 1 ? 0.15 : 0}
                speed={4}
              />
            </RoundedBox>
          </mesh>
          <group position={[0, 0, 0.25]} scale={1.2}>
            <Digit0 isActive={activeDigit === 1} />
          </group>
          {activeDigit === 1 && (
            <mesh position={[0, 0, -0.3]}>
              <planeGeometry args={[2.5, 3]} />
              <meshBasicMaterial color="#e0ff00" transparent opacity={0.1} />
            </mesh>
          )}
        </group>
      </Float>

      {/* Second 4 */}
      <Float speed={2.1} rotationIntensity={0.1} floatIntensity={0.2}>
        <group position={[spacing, 0, 0]}>
          <mesh
            onPointerOver={() => setActiveDigit(2)}
            onPointerOut={() => setActiveDigit(null)}
          >
            <RoundedBox args={[1.8, 2.4, 0.4]} radius={0.15} smoothness={4}>
              <MeshDistortMaterial
                color="#0a0a0a"
                metalness={0.8}
                roughness={0.2}
                distort={activeDigit === 2 ? 0.15 : 0}
                speed={4}
              />
            </RoundedBox>
          </mesh>
          <group position={[0, 0, 0.25]} scale={1.2}>
            <Digit4 isActive={activeDigit === 2} />
          </group>
          {activeDigit === 2 && (
            <mesh position={[0, 0, -0.3]}>
              <planeGeometry args={[2.5, 3]} />
              <meshBasicMaterial color="#e0ff00" transparent opacity={0.1} />
            </mesh>
          )}
        </group>
      </Float>
    </group>
  );
}

// Scattered particles that react to mouse
function ParticleField() {
  const particlesRef = useRef<Group>(null);
  const { pointer } = useThree();

  const particles = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
      ] as [number, number, number],
      scale: Math.random() * 0.08 + 0.02,
    })),
  []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;

      // Particles react to mouse
      particlesRef.current.position.x = pointer.x * 0.5;
      particlesRef.current.position.y = pointer.y * 0.3;
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.scale, 8, 8]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? '#e0ff00' : '#333'}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

// Orbiting rings
function OrbitRings() {
  const ring1Ref = useRef<Mesh>(null);
  const ring2Ref = useRef<Mesh>(null);
  const ring3Ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = state.clock.elapsedTime * 0.4;
      ring2Ref.current.rotation.x = Math.PI / 4;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = -state.clock.elapsedTime * 0.25;
      ring3Ref.current.rotation.x = -Math.PI / 3;
    }
  });

  return (
    <group>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[4, 0.02, 16, 100]} />
        <meshBasicMaterial color="#e0ff00" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[4.5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#e0ff00" transparent opacity={0.2} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#e0ff00" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

// Broken/glitch effect cubes scattered around
function BrokenCubes() {
  const cubePositions: [number, number, number][] = [
    [-5, 3, -2],
    [5, -2, -3],
    [-4, -3, -1],
    [6, 2, -4],
    [-6, 0, -2],
    [4, 4, -3],
    [-3, -4, -2],
    [7, -1, -5],
  ];

  return (
    <group>
      {cubePositions.map((pos, i) => (
        <GlitchCube key={i} position={pos} />
      ))}
    </group>
  );
}

export default function NotFound3D() {
  return (
    <div className="w-full h-[60vh] md:h-[70vh]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#e0ff00" />
        <spotLight
          position={[0, 10, 5]}
          angle={0.5}
          penumbra={1}
          intensity={1}
          color="#e0ff00"
        />

        <Number404 />
        <ParticleField />
        <OrbitRings />
        <BrokenCubes />
      </Canvas>
    </div>
  );
}
