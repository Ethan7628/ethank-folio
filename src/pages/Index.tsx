import { lazy, Suspense, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { SEOHead } from '@/components/enhanced/SEOHead';
import { ScrollProgressIndicator } from '@/components/enhanced/ProgressIndicator';
import { SmoothScroll, MotionCursor, MotionSection, HeroParallax, Interactions, KineticHeadings } from '@/components/motion/MotionLayer';
import { usePageAnalytics } from '@/hooks/useAnalytics';

// Lazy load below-the-fold sections for faster initial paint
const AboutSection = lazy(() => import('@/components/AboutSection').then(m => ({ default: m.AboutSection })));
const SkillsSection = lazy(() => import('@/components/SkillsSection').then(m => ({ default: m.SkillsSection })));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection').then(m => ({ default: m.ProjectsSection })));
const ExperienceSection = lazy(() => import('@/components/ExperienceSection').then(m => ({ default: m.ExperienceSection })));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const ContactSection = lazy(() => import('@/components/ContactSection').then(m => ({ default: m.ContactSection })));
const TechScene = lazy(() => import('@/components/motion/TechScene'));
const Footer = lazy(() => import('@/components/Footer').then(m => ({ default: m.Footer })));

// Minimal section loader
const SectionLoader = memo(() => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse bg-muted/20 rounded-lg w-full max-w-4xl h-32 mx-4"></div>
  </div>
));
SectionLoader.displayName = 'SectionLoader';

const Index = memo(() => {
  usePageAnalytics('home');

  return (
    <ThemeProvider>
      <Helmet>
        <link rel="canonical" href="https://ethans-future-folio.lovable.app/" />
        <meta property="og:url" content="https://ethans-future-folio.lovable.app/" />
      </Helmet>
      <SEOHead />
      <ScrollProgressIndicator />
      <SmoothScroll />
      <MotionCursor />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <Suspense fallback={null}><TechScene /></Suspense>
      </div>
      <Interactions />
      <KineticHeadings />
      <div className="relative z-10 min-h-screen text-foreground">
        <Navigation />
        <main>
          <div id="home">
            <HeroParallax><HeroSection /></HeroParallax>
          </div>
          <Suspense fallback={<SectionLoader />}>
            <MotionSection><AboutSection /></MotionSection>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <MotionSection><SkillsSection /></MotionSection>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <MotionSection><ProjectsSection /></MotionSection>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <MotionSection><ExperienceSection /></MotionSection>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <MotionSection><TestimonialsSection /></MotionSection>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <MotionSection><ContactSection /></MotionSection>
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </ThemeProvider>
  );
});

Index.displayName = 'Index';

export default Index;
