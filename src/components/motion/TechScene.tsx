import { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const readPrimary = () => {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '217 91% 65%';
  const [h, s, l] = v.split(/\s+/).map(parseFloat);
  return new THREE.Color().setHSL(h / 360, s / 100, l / 100);
};

const pointer = { x: 0, y: 0 };

function Core({ color }: { color: THREE.Color }) {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const rings = useRef<THREE.Group>(null);
  useFrame((s, d) => {
    const dt = Math.min(d, 0.05);
    if (outer.current) { outer.current.rotation.y += dt * 0.25; outer.current.rotation.x += dt * 0.1; }
    if (inner.current) { inner.current.rotation.y -= dt * 0.6; inner.current.rotation.z += dt * 0.3; }
    if (rings.current) { rings.current.rotation.z += dt * 0.15; }
    s.camera.position.x += (pointer.x * 1.2 - s.camera.position.x) * 0.04;
    s.camera.position.y += (pointer.y * 0.8 - s.camera.position.y) * 0.04;
    s.camera.lookAt(0, 0, 0);
  });
  return (
    <Float speed={1.4} floatIntensity={1.2} rotationIntensity={0.4}>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.9, 1]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh ref={inner}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.45} metalness={0.8} roughness={0.2} flatShading />
      </mesh>
      <group ref={rings}>
        {[2.6, 3.1].map((r, i) => (
          <mesh key={r} rotation={[Math.PI / 2.4 + i * 0.6, i * 0.8, 0]}>
            <torusGeometry args={[r, 0.008, 8, 160]} />
            <meshBasicMaterial color={color} transparent opacity={0.5} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function DataField({ color }: { color: THREE.Color }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const n = 900, p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 4 + Math.random() * 6, t = Math.random() * Math.PI * 2, f = Math.acos(2 * Math.random() - 1);
      p.set([r * Math.sin(f) * Math.cos(t), r * Math.sin(f) * Math.sin(t), r * Math.cos(f)], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(p, 3));
    return g;
  }, []);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += Math.min(d, 0.05) * 0.03; });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color={color} size={0.035} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

export default function TechScene() {
  const [color, setColor] = useState(() => readPrimary());
  useEffect(() => {
    const obs = new MutationObserver(() => setColor(readPrimary()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    const move = (e: PointerEvent) => { pointer.x = e.clientX / innerWidth * 2 - 1; pointer.y = -(e.clientY / innerHeight * 2 - 1); };
    addEventListener('pointermove', move);
    return () => { obs.disconnect(); removeEventListener('pointermove', move); };
  }, []);
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7.5], fov: 50 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={40} color={color} />
      <pointLight position={[-4, -2, 2]} intensity={15} />
      <Core color={color} />
      <DataField color={color} />
    </Canvas>
  );
}
