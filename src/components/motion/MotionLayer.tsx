import { useEffect, useRef, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Smooth inertial scrolling for the whole page. */
export const SmoothScroll = () => {
  useEffect(() => {
    if (prefersReduced()) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let id = 0;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const el = document.querySelector(a.getAttribute('href')!);
      if (el) { e.preventDefault(); lenis.scrollTo(el as HTMLElement, { offset: -64 }); }
    };
    document.addEventListener('click', onClick);
    return () => { cancelAnimationFrame(id); document.removeEventListener('click', onClick); lenis.destroy(); };
  }, []);
  return null;
};

/** Futuristic cursor: dot + trailing ring, grows on links, shows VIEW on project cards. */
export const MotionCursor = () => {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 180, damping: 22 });
  const ry = useSpring(y, { stiffness: 180, damping: 22 });
  const ringScale = useSpring(1, { stiffness: 300, damping: 22 });
  const [mode, setMode] = useState<'idle' | 'link' | 'view'>('idle');
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || prefersReduced()) return;
    setOn(true);
    document.documentElement.classList.add('has-cursor');
    const move = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      const t = e.target as HTMLElement;
      const m = t.closest('[data-cursor="view"]') ? 'view' : t.closest('a,button,[role="button"],input,textarea') ? 'link' : 'idle';
      setMode(m);
      ringScale.set(m === 'view' ? 2.6 : m === 'link' ? 1.6 : 1);
    };
    window.addEventListener('mousemove', move);
    return () => { window.removeEventListener('mousemove', move); document.documentElement.classList.remove('has-cursor'); };
  }, [x, y, ringScale]);
  if (!on) return null;
  return (
    <>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[101] h-1.5 w-1.5 rounded-full bg-primary"
        style={{ x, y, translateX: '-50%', translateY: '-50%', opacity: mode === 'view' ? 0 : 1 }} />
      <motion.div aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] flex h-9 w-9 items-center justify-center rounded-full border border-primary/70 backdrop-blur-[2px]"
        style={{ x: rx, y: ry, scale: ringScale, translateX: '-50%', translateY: '-50%', backgroundColor: mode === 'view' ? 'hsl(var(--primary) / 0.85)' : 'transparent' }}>
        {mode === 'view' && <span className="text-[5px] font-semibold tracking-[0.2em] text-primary-foreground">VIEW</span>}
      </motion.div>
    </>
  );
};

/** Delegated 3D tilt ([data-tilt]) and magnetic pull (buttons in #home, [data-magnetic]). */
export const Interactions = () => {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || prefersReduced()) return;
    let tilted: HTMLElement | null = null, mag: HTMLElement | null = null;
    const reset = (el: HTMLElement | null) => { if (el) el.style.transform = ''; };
    const move = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const tilt = t.closest<HTMLElement>('[data-tilt]');
      if (tilt !== tilted) { reset(tilted); tilted = tilt; }
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transition = 'transform 0.15s ease-out';
        tilt.style.transform = `perspective(900px) rotateX(${-py * 10}deg) rotateY(${px * 12}deg) translateZ(0) scale(1.02)`;
        tilt.querySelectorAll<HTMLElement>('img').forEach(img => {
          img.style.transition = 'transform 0.2s ease-out';
          img.style.transform = `scale(1.08) translate(${px * -10}px, ${py * -10}px)`;
        });
      }
      const m = t.closest<HTMLElement>('[data-magnetic], #home button');
      if (m !== mag) { reset(mag); mag = m; }
      if (m) {
        const r = m.getBoundingClientRect();
        m.style.transition = 'transform 0.2s ease-out';
        m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      }
    };
    const leave = () => {
      if (tilted) { tilted.style.transition = 'transform 0.5s ease'; reset(tilted); tilted.querySelectorAll<HTMLElement>('img').forEach(i => (i.style.transform = '')); }
      reset(mag); tilted = mag = null;
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerleave', leave);
    const out = (e: PointerEvent) => { if (!e.relatedTarget) leave(); else if (tilted && !tilted.contains(e.relatedTarget as Node)) { const t = tilted; t.style.transition = 'transform 0.5s ease'; reset(t); t.querySelectorAll<HTMLElement>('img').forEach(i => (i.style.transform = '')); tilted = null; } };
    document.addEventListener('pointerout', out);
    return () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); document.removeEventListener('pointerout', out); };
  }, []);
  return null;
};

/** Scroll-linked reveal: section rises, unblurs and scales in as it enters. */
export const MotionSection = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.6'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const y = useTransform(p, [0, 1], [80, 0]);
  const opacity = useTransform(p, [0, 1], [0.15, 1]);
  const scale = useTransform(p, [0, 1], [0.96, 1]);
  const filter = useTransform(p, [0, 1], ['blur(8px)', 'blur(0px)']);
  if (prefersReduced()) return <div>{children}</div>;
  return (
    <motion.div ref={ref} style={{ y, opacity, scale, filter }} className="will-change-transform">
      {children}
    </motion.div>
  );
};

/** Hero parallax: content drifts and fades as the user scrolls away. */
export const HeroParallax = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  return (
    <motion.div ref={ref} style={prefersReduced() ? undefined : { y, opacity }}
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
};
