import { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const readPrimary = () => {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '221 83% 53%';
  const [h, s, l] = v.split(/\s+/).map(parseFloat);
  return new THREE.Color().setHSL(h / 360, s / 100, l / 100);
};
const input = { x: 0, y: 0, scroll: 0 };
const hasWebGL = () => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } };

/** Canvas texture of a code editor panel. */
function codeTexture(title: string, lines: string[], accent: string) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 320;
  const g = c.getContext('2d')!;
  g.fillStyle = 'rgba(6,18,48,0.92)'; g.fillRect(0, 0, 512, 320);
  g.strokeStyle = accent; g.lineWidth = 3; g.strokeRect(2, 2, 508, 316);
  g.fillStyle = 'rgba(37,99,235,0.25)'; g.fillRect(0, 0, 512, 40);
  ['#ef4444', '#f59e0b', '#22c55e'].forEach((col, i) => { g.fillStyle = col; g.beginPath(); g.arc(22 + i * 22, 20, 7, 0, 7); g.fill(); });
  g.fillStyle = '#cbd5e1'; g.font = '600 18px monospace'; g.fillText(title, 100, 27);
  g.font = '20px monospace';
  const palette = ['#60a5fa', '#e2e8f0', '#a5b4fc', '#7dd3fc', '#94a3b8'];
  lines.forEach((l, i) => { g.fillStyle = '#475569'; g.fillText(String(i + 1).padStart(2), 14, 78 + i * 32); g.fillStyle = palette[i % palette.length]; g.fillText(l, 52, 78 + i * 32); });
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}

const SNIPPETS: [string, string[]][] = [
  ['App.tsx', ['export const App = () => (', '  <Router>', '    <Dashboard user={me} />', '  </Router>', ');', '']],
  ['server.ts', ['app.get("/api/projects",', '  auth, async (req, res) => {', '  const rows = await db', '    .from("projects");', '  res.json(rows);', '});']],
  ['schema.sql', ['CREATE TABLE users (', '  id uuid PRIMARY KEY,', '  email text UNIQUE,', '  role app_role', ');', 'SELECT * FROM users;']],
  ['deploy.yml', ['jobs:', '  build:', '    runs-on: ubuntu', '    steps:', '      - run: npm ci', '      - run: npm run build']],
  ['api.ts', ['const res = await fetch(', '  `${API}/auth/login`,', '  { method: "POST" }', ');', 'return res.json();', '']],
];

/** The full stack: Frontend → API → Database, with data packets flowing between layers. */
function Stack({ color }: { color: THREE.Color }) {
  const root = useRef<THREE.Group>(null);
  const packets = useRef<THREE.Group>(null);
  const leds = useRef<THREE.Mesh[]>([]);
  const ui = useMemo(() => codeTexture('localhost:3000', ['<Hero />', '<Projects />', '<Contact />', 'useQuery(api)', ''], '#2563eb'), []);
  useEffect(() => () => ui.dispose(), [ui]);
  const P = 14;
  useFrame((s, d) => {
    const dt = Math.min(d, 0.05), k = input.scroll, t = s.clock.elapsedTime;
    if (root.current) {
      const tx = 2.4 + Math.sin(k * Math.PI * 2) * -4.6, ty = -k * 1.2;
      root.current.position.x += (tx - root.current.position.x) * 0.05;
      root.current.position.y += (ty - root.current.position.y) * 0.05;
      root.current.rotation.y += dt * 0.18;
    }
    packets.current?.children.forEach((m, i) => {
      const up = i % 2 === 0, p = ((t * 0.35 + i / P) % 1);
      const y = up ? -2.1 + p * 4.2 : 2.1 - p * 4.2, a = (i / P) * Math.PI * 2;
      m.position.set(Math.cos(a) * 0.35, y, Math.sin(a) * 0.35);
    });
    leds.current.forEach((m, i) => { (m.material as THREE.MeshBasicMaterial).opacity = 0.3 + 0.7 * (Math.sin(t * 4 + i * 1.7) > 0 ? 1 : 0.2); });
    s.camera.position.x += (input.x * 1.2 - s.camera.position.x) * 0.04;
    s.camera.position.y += (input.y * 0.8 - s.camera.position.y) * 0.04;
    s.camera.lookAt(0, 0, 0);
  });
  return (
    <group ref={root} scale={0.85}>
      <Float speed={1.2} floatIntensity={0.6} rotationIntensity={0.15}>
        {/* Frontend: browser window */}
        <group position={[0, 2.1, 0]}>
          <RoundedBox args={[2.6, 1.6, 0.08]} radius={0.06}>
            <meshStandardMaterial color="#0b1d4d" metalness={0.6} roughness={0.3} />
          </RoundedBox>
          <mesh position={[0, 0, 0.05]}><planeGeometry args={[2.5, 1.5]} /><meshBasicMaterial map={ui} toneMapped={false} /></mesh>
          <mesh position={[0, 0, -0.05]} rotation-y={Math.PI}><planeGeometry args={[2.5, 1.5]} /><meshBasicMaterial map={ui} toneMapped={false} /></mesh>
        </group>
        {/* API: server rack */}
        {[0.35, 0, -0.35].map((y, i) => (
          <group key={y} position={[0, y, 0]}>
            <RoundedBox args={[1.9, 0.28, 1.1]} radius={0.04}>
              <meshStandardMaterial color="#9aa6bb" metalness={1} roughness={0.25} />
            </RoundedBox>
            {[0, 1, 2].map(j => (
              <mesh key={j} position={[-0.75 + j * 0.12, 0, 0.56]} ref={el => { if (el) leds.current[i * 3 + j] = el; }}>
                <sphereGeometry args={[0.03, 8, 8]} /><meshBasicMaterial color={j === 2 ? '#22c55e' : color} transparent />
              </mesh>
            ))}
            <mesh position={[0.35, 0, 0.56]}><planeGeometry args={[0.9, 0.06]} /><meshBasicMaterial color={color} transparent opacity={0.6} /></mesh>
          </group>
        ))}
        {/* Database: stacked disks */}
        {[-1.6, -1.95, -2.3].map(y => (
          <mesh key={y} position={[0, y, 0]}>
            <cylinderGeometry args={[0.75, 0.75, 0.3, 48]} />
            <meshStandardMaterial color="#c7cfdc" emissive={color} emissiveIntensity={0.15} metalness={1} roughness={0.2} />
          </mesh>
        ))}
        {/* Connection beam + packets */}
        <mesh><cylinderGeometry args={[0.012, 0.012, 4.4, 6]} /><meshBasicMaterial color={color} transparent opacity={0.5} /></mesh>
        <group ref={packets}>
          {Array.from({ length: P }, (_, i) => (
            <mesh key={i}><boxGeometry args={[0.07, 0.07, 0.07]} /><meshBasicMaterial color={i % 2 ? '#a5b4fc' : color} toneMapped={false} /></mesh>
          ))}
        </group>
        <mesh rotation-x={Math.PI / 2} position={[0, -2.6, 0]}><torusGeometry args={[1.4, 0.008, 8, 120]} /><meshBasicMaterial color={color} transparent opacity={0.5} /></mesh>
      </Float>
    </group>
  );
}

/** Floating code panels (frontend, backend, SQL, CI) scattered in depth. */
function CodePanels({ count }: { count: number }) {
  const items = useMemo(() => Array.from({ length: count }, (_, i) => {
    const [title, lines] = SNIPPETS[i % SNIPPETS.length];
    return {
      tex: codeTexture(title, lines, i % 2 ? '#3b82f6' : '#1d4ed8'),
      pos: [((i % 2 ? 1 : -1) * (3 + Math.random() * 4)), (Math.random() - 0.5) * 9, -3 - Math.random() * 5] as [number, number, number],
      rot: (Math.random() - 0.5) * 0.6, depth: 0.5 + Math.random(), s: 0.9 + Math.random() * 0.6,
    };
  }), [count]);
  useEffect(() => () => items.forEach(i => i.tex.dispose()), [items]);
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    group.current?.children.forEach((c, i) => {
      const it = items[i];
      c.position.y = it.pos[1] + input.scroll * 8 * it.depth + Math.sin(clock.elapsedTime * 0.5 + i) * 0.15;
      c.rotation.y = it.rot + Math.sin(clock.elapsedTime * 0.3 + i) * 0.1;
    });
  });
  return (
    <group ref={group}>
      {items.map((it, i) => (
        <mesh key={i} position={it.pos} scale={[1.6 * it.s, 1 * it.s, 1]}>
          <planeGeometry /><meshBasicMaterial map={it.tex} transparent opacity={0.55} toneMapped={false} side={THREE.DoubleSide} />
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
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(p, 3)); return g;
  }, [count]);
  useEffect(() => () => geo.dispose(), [geo]);
  useFrame((_, d) => { if (ref.current) { ref.current.rotation.y += Math.min(d, 0.05) * 0.03; ref.current.rotation.x = input.scroll * 0.8; } });
  return <points ref={ref} geometry={geo}><pointsMaterial color={color} size={0.03} sizeAttenuation transparent opacity={0.6} /></points>;
}

function Lights({ color }: { color: THREE.Color }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 4, 4]} intensity={50} color={color} />
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
      camera={{ position: [0, 0, 8], fov: 50 }} gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
      className="opacity-75" data-scene-ready>
      <Lights color={color} />
      <Stack color={color} />
      <CodePanels count={mobile ? 3 : 7} />
      <DataField color={color} count={mobile ? 300 : 800} />
    </Canvas>
  );
}
