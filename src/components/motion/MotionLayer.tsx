import { useEffect, useRef, type ReactNode } from 'react';
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

/** Soft glowing cursor follower (desktop only). */
export const MotionCursor = () => {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });
  const scale = useMotionValue(1);
  const sScale = useSpring(scale, { stiffness: 300, damping: 20 });
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || prefersReduced()) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      scale.set((e.target as HTMLElement).closest('a,button,[role="button"]') ? 2.4 : 1);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y, scale]);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-5 w-5 rounded-full border border-primary bg-primary/20 mix-blend-difference md:block"
      style={{ x: sx, y: sy, scale: sScale, translateX: '-50%', translateY: '-50%' }}
    />
  );
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
