
import React, { useState, useEffect, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Download, MessageSquare, Play, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useTheme } from './ThemeProvider';


const HeroSectionComponent: React.FC = memo(() => {
  const { theme } = useTheme();
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [text, setText] = useState('');
  const fullText = "Transforming ideas into exceptional digital experiences through innovative software solutions.";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const handleVoiceGreeting = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        "Hello! I'm Ethan Kusasirakwe, a software developer and creative technologist specializing in full-stack development and innovative digital solutions."
      );
      utterance.rate = 0.9;
      utterance.pitch = 1;

      if (isVoicePlaying) {
        speechSynthesis.cancel();
        setIsVoicePlaying(false);
      } else {
        speechSynthesis.speak(utterance);
        setIsVoicePlaying(true);
        utterance.onend = () => setIsVoicePlaying(false);
      }
    }
  };

  const downloadCV = () => {
    // Create a professional CV download experience
    const link = document.createElement('a');
    link.href = 'https://docs.google.com/document/d/1A_SAMPLE_CV_LINK/export?format=pdf';
    link.download = 'Ethan_Kusasirakwe_CV_2025.pdf';
    link.target = '_blank';
    
    // Show a professional toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300';
    toast.textContent = 'CV download will begin shortly...';
    document.body.appendChild(toast);
    
    setTimeout(() => {
      link.click();
      document.body.removeChild(toast);
    }, 1000);
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto relative z-10 max-w-4xl">
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Enhanced Avatar with Holographic Effect */}
          <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mb-6 sm:mb-8">
            <div className="w-full h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent p-1 animate-spin-slow">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <img
                  src="/uploads/790aa63d-8736-498b-b561-e0884f2609a7.png"
                  alt="Ethan Kusasirakwe"
                  className="w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover animate-hologram-flicker"
                />
              </div>
            </div>
            {/* Floating Sparkles */}
            <div className="absolute -top-2 -left-2">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 glass-effect rounded-full p-2 sm:p-3 neon-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceGreeting}
                className="rounded-full w-8 h-8 sm:w-12 sm:h-12 p-0 hover:scale-110 transition-transform"
              >
                {isVoicePlaying ? (
                  <VolumeX className="w-4 h-4 sm:w-6 sm:h-6 text-primary animate-pulse" />
                ) : (
                  <Volume2 className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                )}
              </Button>
            </div>
          </div>

          {/* Enhanced Name and Title */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-tech font-bold text-gradient-professional animate-professional-slide-in professional-heading">
              ETHAN KUSASIRAKWE
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground animate-slide-up px-4 anim-delay-200 font-medium tracking-wide">
              Software Developer • Creative Technologist • Digital Innovation Specialist
            </p>
          </div>

          {/* Animated Tagline */}
          <div className="h-12 sm:h-16 flex items-center justify-center animate-professional-fade-in px-4 anim-delay-400">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-primary font-medium text-center professional-body">
              {text}
              <span className="animate-ping text-primary ml-1">|</span>
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-slide-up px-4 anim-delay-600 max-w-2xl mx-auto">
            <Button
              size="lg"
              className="btn-professional-primary px-8 py-4 rounded-full w-full sm:w-auto text-base font-medium"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="w-5 h-5 mr-2" />
              View My Work
            </Button>

            <Button
              size="lg"
              onClick={downloadCV}
              className="btn-professional-outline px-8 py-4 rounded-full w-full sm:w-auto text-base font-medium"
            >
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-muted-foreground/40 text-muted-foreground hover:bg-muted hover:text-foreground hover:border-primary transition-all duration-300 px-8 py-4 rounded-full w-full sm:w-auto text-base font-medium"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSectionComponent.displayName = 'HeroSection';

// Simple error boundary HOC
function withErrorBoundary<P>(Component: React.ComponentType<P>) {
  return function WrappedComponent(props: P) {
    try {
      return <Component {...props} />;
    } catch (error) {
      return <div>Something went wrong.</div>;
    }
  };
}

export const HeroSection = withErrorBoundary(HeroSectionComponent);
