
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/enhanced/SEOHead';
import { ScrollProgressIndicator } from '@/components/enhanced/ProgressIndicator';
import { usePageAnalytics } from '@/hooks/useAnalytics';

const Index = () => {
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
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <TestimonialsSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default Index;
