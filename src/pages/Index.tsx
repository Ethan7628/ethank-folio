import { lazy, Suspense, memo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { SEOHead } from '@/components/enhanced/SEOHead';
import { ScrollProgressIndicator } from '@/components/enhanced/ProgressIndicator';
import { usePageAnalytics } from '@/hooks/useAnalytics';

// Lazy load below-the-fold sections for faster initial paint
const AboutSection = lazy(() => import('@/components/AboutSection').then(m => ({ default: m.AboutSection })));
const SkillsSection = lazy(() => import('@/components/SkillsSection').then(m => ({ default: m.SkillsSection })));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection').then(m => ({ default: m.ProjectsSection })));
const ExperienceSection = lazy(() => import('@/components/ExperienceSection').then(m => ({ default: m.ExperienceSection })));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const ContactSection = lazy(() => import('@/components/ContactSection').then(m => ({ default: m.ContactSection })));
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
    <HelmetProvider>
      <ThemeProvider>
        <SEOHead />
        <ScrollProgressIndicator />
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <main>
            <div id="home">
              <HeroSection />
            </div>
            <Suspense fallback={<SectionLoader />}>
              <AboutSection />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <SkillsSection />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <ProjectsSection />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <ExperienceSection />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <TestimonialsSection />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <ContactSection />
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
});

Index.displayName = 'Index';

export default Index;
