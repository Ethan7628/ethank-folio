import { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

const readPrimary = () => {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '221 83% 53%';
  const [h, s, l] = v.split(/\s+/).map(parseFloat);
  return new THREE.Color().setHSL(h / 360, s / 100, l / 100);
};

// Shared input state written by listeners, read in useFrame (no React re-renders).
const input = { x: 0, y: 0, scroll: 0 };

const hasWebGL = () => {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
};

function Core({ color }: { color: THREE.Color }) {
  const root = useRef<THREE.Group>(null);
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const rings = useRef<THREE.Group>(null);
  useFrame((s, d) => {
    const dt = Math.min(d, 0.05), k = input.scroll;
    if (outer.current) { outer.current.rotation.y += dt * 0.25; outer.current.rotation.x += dt * 0.1; }
    if (inner.current) { inner.current.rotation.y -= dt * 0.6; inner.current.rotation.z += dt * 0.3; }
    if (rings.current) rings.current.rotation.z += dt * 0.15;
    if (root.current) {
      // Journey: core drifts right and back as you scroll through the page
      const tx = Math.sin(k * Math.PI * 2) * 2.6, ty = -k * 1.5, tz = -k * 3;
      root.current.position.x += (tx - root.current.position.x) * 0.05;
      root.current.position.y += (ty - root.current.position.y) * 0.05;
      root.current.position.z += (tz - root.current.position.z) * 0.05;
      root.current.rotation.x = k * Math.PI * 1.5;
    }
    s.camera.position.x += (input.x * 1.2 - s.camera.position.x) * 0.04;
    s.camera.position.y += (input.y * 0.8 - s.camera.position.y) * 0.04;
    s.camera.lookAt(0, 0, 0);
  });
  return (
    <group ref={root}>
      <Float speed={1.4} floatIntensity={1.2} rotationIntensity={0.4}>
        <mesh ref={outer}>
          <icosahedronGeometry args={[1.9, 1]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.38} />
        </mesh>
        <mesh ref={inner}>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial color="#c7cfdc" emissive={color} emissiveIntensity={0.35} metalness={1} roughness={0.15} flatShading />
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
    </group>
  );
}

/** Floating metallic shapes scattered in depth, each with its own parallax. */
function Shards({ count }: { count: number }) {
  const items = useMemo(() => Array.from({ length: count }, (_, i) => ({
    pos: [(Math.random() - 0.5) * 14, (Math.random() - 0.5) * 9, -2 - Math.random() * 6] as [number, number, number],
    kind: i % 3, s: 0.15 + Math.random() * 0.35, depth: 0.5 + Math.random(),
  })), [count]);
  const group = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (!group.current) return;
    group.current.children.forEach((c, i) => {
      c.rotation.x += Math.min(d, 0.05) * 0.3; c.rotation.y += Math.min(d, 0.05) * 0.2;
      c.position.y = items[i].pos[1] + input.scroll * 8 * items[i].depth;
    });
  });
  return (
    <group ref={group}>
      {items.map((it, i) => (
        <mesh key={i} position={it.pos} scale={it.s}>
          {it.kind === 0 ? <boxGeometry /> : it.kind === 1 ? <torusKnotGeometry args={[0.6, 0.2, 64, 8]} /> : <tetrahedronGeometry />}
          <meshStandardMaterial color="#b8c2d3" metalness={1} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
}

function DataField({ color, count }: { color: THREE.Color; count: number }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 7, t = Math.random() * Math.PI * 2, f = Math.acos(2 * Math.random() - 1);
      p.set([r * Math.sin(f) * Math.cos(t), r * Math.sin(f) * Math.sin(t), r * Math.cos(f)], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(p, 3));
    return g;
  }, [count]);
  useEffect(() => () => geo.dispose(), [geo]);
  useFrame((_, d) => { if (ref.current) { ref.current.rotation.y += Math.min(d, 0.05) * 0.03; ref.current.rotation.x = input.scroll * 0.8; } });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color={color} size={0.035} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

/** Lighting shifts hue gradually through the page. */
function Lights({ color }: { color: THREE.Color }) {
  const key = useRef<THREE.PointLight>(null);
  const tmp = useMemo(() => new THREE.Color(), []);
  useFrame(() => {
    if (!key.current) return;
    const hsl = { h: 0, s: 0, l: 0 }; color.getHSL(hsl);
    key.current.color.copy(tmp.setHSL((hsl.h + input.scroll * 0.08) % 1, hsl.s, hsl.l));
  });
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight ref={key} position={[4, 4, 4]} intensity={50} />
      <pointLight position={[-5, -2, 2]} intensity={12} color="#c7d2fe" />
      <Environment resolution={64}>
        <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} />
        <Lightformer intensity={1.5} color="#3b82f6" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
      </Environment>
    </>
  );
}

export default function TechScene() {
  const [color, setColor] = useState(() => readPrimary());
  const [ok] = useState(hasWebGL);
  const mobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  useEffect(() => {
    const obs = new MutationObserver(() => setColor(readPrimary()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    const move = (e: PointerEvent) => { input.x = e.clientX / innerWidth * 2 - 1; input.y = -(e.clientY / innerHeight * 2 - 1); };
    const scroll = () => { const m = document.documentElement.scrollHeight - innerHeight; input.scroll = m > 0 ? scrollY / m : 0; };
    addEventListener('pointermove', move); addEventListener('scroll', scroll, { passive: true }); scroll();
    return () => { obs.disconnect(); removeEventListener('pointermove', move); removeEventListener('scroll', scroll); };
  }, []);
  if (!ok) return <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.2),transparent_70%)]" />;
  return (
    <Canvas dpr={mobile ? [1, 1.25] : [1, 1.5]} frameloop={reduced ? 'demand' : 'always'}
      camera={{ position: [0, 0, 7.5], fov: 50 }} gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
      className="opacity-75">
      <Lights color={color} />
      <Core color={color} />
      <Shards count={mobile ? 6 : 14} />
      <DataField color={color} count={mobile ? 350 : 900} />
    </Canvas>
  );
}
