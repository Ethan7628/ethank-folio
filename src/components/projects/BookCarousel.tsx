import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Volume2, X, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface BookProject {
  id: string; title: string; description: string; longDescription: string; image: string;
  tech: string[]; category: string; liveUrl: string; githubUrl: string; features: string[]; status: string;
}

/** Book cover with spine + page edges, built in CSS 3D. */
const BookCover = ({ p, active }: { p: BookProject; active: boolean }) => (
  <div className="relative h-full w-full [transform-style:preserve-3d]">
    {/* page block (right edge) */}
    <div className="absolute right-0 top-[2%] h-[96%] w-[22px] origin-right bg-gradient-to-r from-muted to-card [transform:rotateY(90deg)_translateZ(0)]"
      style={{ backgroundImage: 'repeating-linear-gradient(90deg, hsl(var(--muted)) 0 1px, hsl(var(--card)) 1px 3px)' }} />
    {/* back cover */}
    <div className="absolute inset-0 rounded-r-md bg-card [transform:translateZ(-22px)]" />
    {/* front cover */}
    <div className="absolute inset-0 overflow-hidden rounded-r-md rounded-l-sm border border-primary/40 bg-card shadow-[0_30px_60px_-20px_hsl(var(--primary)/0.55)]">
      <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
      <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-background/80 to-transparent" />
      <div className="absolute left-3 top-3 font-mono text-[10px] tracking-[0.3em] text-primary">// {p.category.toUpperCase()}</div>
      <div className="absolute inset-x-4 bottom-5">
        <h3 className="font-tech text-xl sm:text-2xl font-bold leading-tight text-foreground">{p.title}</h3>
        <div className="mt-2 h-0.5 w-10 bg-primary" />
        {active && <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><BookOpen className="h-3 w-3" /> Tap to open</p>}
      </div>
    </div>
  </div>
);

/** Opened book: cover swings open, pages flip. */
const OpenBook = ({ p, onClose }: { p: BookProject; onClose: () => void }) => {
  const [page, setPage] = useState(0);
  const speak = () => { if ('speechSynthesis' in window) speechSynthesis.speak(new SpeechSynthesisUtterance(`This is ${p.title}. ${p.description}`)); };
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') setPage(x => Math.min(1, x + 1)); if (e.key === 'ArrowLeft') setPage(x => Math.max(0, x - 1)); };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [onClose]);

  const pages = [
    <div key="a" className="space-y-3">
      <p className="font-mono text-[10px] tracking-[0.3em] text-primary">CHAPTER 01 // OVERVIEW</p>
      <h3 className="font-tech text-2xl font-bold text-foreground">{p.title}</h3>
      <Badge variant={p.status === 'Completed' ? 'success' : 'info'}>{p.status}</Badge>
      <p className="text-sm text-muted-foreground">{p.description}</p>
      <p className="text-sm text-muted-foreground">{p.longDescription}</p>
    </div>,
    <div key="b" className="space-y-4">
      <p className="font-mono text-[10px] tracking-[0.3em] text-primary">CHAPTER 02 // BUILD</p>
      <div className="flex flex-wrap gap-2">{p.tech.map(t => <Badge key={t} variant="info" className="text-xs">{t}</Badge>)}</div>
      <ul className="space-y-1 text-sm text-muted-foreground">{p.features.map(f => <li key={f}>▹ {f}</li>)}</ul>
      <div className="flex flex-wrap gap-2 pt-2">
        <Button variant="gradient" size="sm" onClick={() => window.open(p.liveUrl, '_blank')}><ExternalLink className="mr-2 h-4 w-4" />Live Demo</Button>
        <Button variant="outline" size="icon" aria-label={`View ${p.title} source on GitHub`} onClick={() => window.open(p.githubUrl, '_blank')}><Github className="h-4 w-4" /></Button>
        <Button variant="outline" size="icon" aria-label={`Listen to ${p.title}`} onClick={speak}><Volume2 className="h-4 w-4" /></Button>
      </div>
    </div>,
  ];

  return (
    <motion.div className="fixed inset-0 z-[90] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} role="dialog" aria-modal aria-label={p.title}>
      <button aria-label="Close book" onClick={onClose} className="absolute right-4 top-4 rounded-full border border-border p-2 text-foreground hover:border-primary"><X className="h-5 w-5" /></button>
      <div className="relative w-full max-w-3xl [perspective:2200px]" onClick={e => e.stopPropagation()}>
        <motion.div className="relative grid min-h-[440px] grid-cols-1 md:grid-cols-2 [transform-style:preserve-3d]"
          initial={{ scale: 0.6, rotateX: 20, y: 60 }} animate={{ scale: 1, rotateX: 0, y: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 18 }}>
          {/* left page: image (inside of cover) */}
          <div className="relative hidden overflow-hidden rounded-l-lg border border-primary/30 bg-card md:block">
            <img src={p.image} alt="" className="h-full w-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-background/70" />
            <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.3em] text-primary">EK // {p.id.toUpperCase()}</div>
          </div>
          {/* right page with flipping content */}
          <div className="relative overflow-hidden rounded-lg md:rounded-l-none border border-primary/30 bg-card p-6 [transform-style:preserve-3d]">
            <AnimatePresence mode="wait">
              <motion.div key={page} initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.45 }} style={{ transformOrigin: 'left center' }}>{pages[page]}</motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-6 bottom-4 flex items-center justify-between text-xs text-muted-foreground">
              <button aria-label="Previous page" disabled={page === 0} onClick={() => setPage(0)} className="disabled:opacity-30"><ChevronLeft className="h-5 w-5" /></button>
              <span className="font-mono">{page + 1} / 2</span>
              <button aria-label="Next page" disabled={page === 1} onClick={() => setPage(1)} className="disabled:opacity-30"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>
          {/* front cover swinging open from the spine */}
          <motion.div className="pointer-events-none absolute inset-y-0 left-0 hidden w-full overflow-hidden rounded-lg border border-primary/40 bg-card md:left-1/2 md:block md:w-1/2"
            style={{ transformOrigin: 'left center', backfaceVisibility: 'hidden' }}
            initial={{ rotateY: 0 }} animate={{ rotateY: -178 }} transition={{ delay: 0.25, duration: 1.1, ease: [0.65, 0, 0.35, 1] }}>
            <img src={p.image} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <h3 className="absolute bottom-6 left-5 font-tech text-2xl font-bold text-foreground">{p.title}</h3>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

/** Round 3D coverflow: active book centered, others fade around the ring. */
export const BookCarousel = ({ projects }: { projects: BookProject[] }) => {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<BookProject | null>(null);
  const n = projects.length;
  const touch = useRef<number | null>(null);
  useEffect(() => { setActive(0); }, [n]);
  const go = (d: number) => setActive(a => (a + d + n) % n);
  if (!n) return null;

  return (
    <div className="relative">
      <div className="relative mx-auto h-[380px] sm:h-[440px] [perspective:1600px] select-none"
        onTouchStart={e => (touch.current = e.touches[0].clientX)}
        onTouchEnd={e => { if (touch.current == null) return; const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); touch.current = null; }}>
        <div className="absolute left-1/2 top-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        {projects.map((p, i) => {
          let off = i - active; if (off > n / 2) off -= n; if (off < -n / 2) off += n;
          const abs = Math.abs(off); const visible = abs <= 3;
          const angle = off * 32;
          return (
            <motion.button key={p.id} type="button" aria-label={off === 0 ? `Open ${p.title}` : `Show ${p.title}`}
              data-cursor={off === 0 ? 'view' : undefined}
              className="absolute left-1/2 top-1/2 h-[300px] w-[210px] sm:h-[340px] sm:w-[240px] -ml-[105px] -mt-[150px] sm:-ml-[120px] sm:-mt-[170px] [transform-style:preserve-3d] focus:outline-none"
              animate={{
                x: `${Math.sin((angle * Math.PI) / 180) * 120}%`,
                z: (Math.cos((angle * Math.PI) / 180) - 1) * 520,
                rotateY: -angle * 1.2, opacity: visible ? (off === 0 ? 1 : 0.55 - abs * 0.12) : 0,
                filter: off === 0 ? 'blur(0px)' : `blur(${abs * 1.5}px)`,
              }}
              whileHover={off === 0 ? { y: -10, rotateY: -12 } : undefined}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              style={{ zIndex: 50 - abs, pointerEvents: visible ? 'auto' : 'none' }}
              onClick={() => (off === 0 ? setOpen(p) : setActive(i))}>
              <BookCover p={p} active={off === 0} />
            </motion.button>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-center gap-6">
        <Button variant="outline" size="icon" className="rounded-full" aria-label="Previous project" onClick={() => go(-1)}><ChevronLeft className="h-4 w-4" /></Button>
        <span className="min-w-[70px] text-center font-mono text-sm text-muted-foreground">{String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
        <Button variant="outline" size="icon" className="rounded-full" aria-label="Next project" onClick={() => go(1)}><ChevronRight className="h-4 w-4" /></Button>
      </div>
      <AnimatePresence>{open && <OpenBook p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </div>
  );
};
