import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { Mesh, InstancedMesh } from 'three';

const GRID_X = 40;
const GRID_Z = 20;
const CUBE_SIZE = 0.5;
const SPACING = 0.7;
const ACTIVATION_RADIUS = 4;
const HIDDEN_Y = -2; // Cubes start underground

interface CubeData {
  currentY: number;
  targetY: number;
  scale: number;
  targetScale: number;
  rotation: number;
}

function CubeGrid() {
  const meshRef = useRef<InstancedMesh>(null);
  const { viewport } = useThree();

  const mouse = useRef(new THREE.Vector2(9999, 9999)); // Start offscreen
  const raycaster = useRef(new THREE.Raycaster());
  const planeRef = useRef<Mesh>(null);
  const hoverPoint = useRef(new THREE.Vector3(9999, 0, 9999));

  const activeColor = useMemo(() => new THREE.Color('#e0ff00'), []);

  const cubeData = useMemo<CubeData[]>(() => {
    const data: CubeData[] = [];
    for (let i = 0; i < GRID_X * GRID_Z; i++) {
      data.push({
        currentY: HIDDEN_Y,
        targetY: HIDDEN_Y,
        scale: 0,
        targetScale: 0,
        rotation: 0,
      });
    }
    return data;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorArray = useMemo(() => new Float32Array(GRID_X * GRID_Z * 3), []);

  // Initialize positions (all hidden)
  useEffect(() => {
    if (!meshRef.current) return;

    let i = 0;
    for (let x = 0; x < GRID_X; x++) {
      for (let z = 0; z < GRID_Z; z++) {
        const posX = (x - GRID_X / 2) * SPACING;
        const posZ = (z - GRID_Z / 2) * SPACING;

        dummy.position.set(posX, HIDDEN_Y, posZ);
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);

        // Set initial color (yellow)
        colorArray[i * 3] = activeColor.r;
        colorArray[i * 3 + 1] = activeColor.g;
        colorArray[i * 3 + 2] = activeColor.b;

        i++;
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.geometry.setAttribute(
      'color',
      new THREE.InstancedBufferAttribute(colorArray, 3)
    );
  }, [dummy, colorArray, activeColor]);

  // Mouse move handler
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onMouseLeave = () => {
      mouse.current.set(9999, 9999);
      hoverPoint.current.set(9999, 0, 9999);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  useFrame(({ camera }) => {
    if (!meshRef.current || !planeRef.current) return;

    // Raycast to plane
    raycaster.current.setFromCamera(mouse.current, camera);
    const hits = raycaster.current.intersectObject(planeRef.current);

    if (hits.length > 0) {
      hoverPoint.current.copy(hits[0].point);
    }

    let i = 0;
    for (let x = 0; x < GRID_X; x++) {
      for (let z = 0; z < GRID_Z; z++) {
        const posX = (x - GRID_X / 2) * SPACING;
        const posZ = (z - GRID_Z / 2) * SPACING;

        const dx = posX - hoverPoint.current.x;
        const dz = posZ - hoverPoint.current.z;
        const distance = Math.sqrt(dx * dx + dz * dz);

        const data = cubeData[i];

        // Activate cubes near cursor - pop up from underground
        if (distance < ACTIVATION_RADIUS) {
          const intensity = 1 - distance / ACTIVATION_RADIUS;
          const popHeight = intensity * 1.5; // How high they pop up
          data.targetY = popHeight;
          data.targetScale = 0.5 + intensity * 0.8;
        } else {
          // Hide cubes when not near cursor
          data.targetY = HIDDEN_Y;
          data.targetScale = 0;
        }

        // Smooth interpolation
        data.currentY += (data.targetY - data.currentY) * 0.12;
        data.scale += (data.targetScale - data.scale) * 0.15;

        // Rotate while visible
        if (data.scale > 0.1) {
          data.rotation += 0.02 * data.scale;
        }

        // Update transform
        dummy.position.set(posX, data.currentY, posZ);
        dummy.scale.set(data.scale, data.scale, data.scale);
        dummy.rotation.y = data.rotation;
        dummy.rotation.x = data.rotation * 0.3;
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);

        // Brightness based on height
        const brightness = Math.max(0, Math.min(1, (data.currentY + 1) / 2));
        colorArray[i * 3] = activeColor.r * brightness;
        colorArray[i * 3 + 1] = activeColor.g * brightness;
        colorArray[i * 3 + 2] = activeColor.b * brightness;

        i++;
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.geometry.attributes.color) {
      (meshRef.current.geometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
    }
  });

  return (
    <>
      {/* Invisible plane for raycasting */}
      <mesh ref={planeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} visible={false}>
        <planeGeometry args={[60, 40]} />
        <meshBasicMaterial />
      </mesh>

      {/* Instanced cubes */}
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, GRID_X * GRID_Z]}
        frustumCulled={false}
      >
        <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]}>
          <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
        </boxGeometry>
        <meshStandardMaterial
          vertexColors
          metalness={0.7}
          roughness={0.2}
          emissive="#e0ff00"
          emissiveIntensity={0.3}
        />
      </instancedMesh>
    </>
  );
}

export default function HeroCubes() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 8, 12], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[0, 5, 0]} intensity={1} color="#e0ff00" />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#e0ff00" />

        <CubeGrid />
      </Canvas>
    </div>
  );
}
