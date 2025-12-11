import React, { useState, useEffect, memo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, MessageSquare, Play, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { CV_PATH } from '@/config/constants';



const HeroSectionComponent: React.FC = memo(() => {
  const { theme } = useTheme();
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [text, setText] = useState('');
  const [cvDialogOpen, setCvDialogOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(true);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
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
        "Hello! How are you? I'm Ethan Kusasirakwe, a software developer and creative technologist specializing in full-stack development and innovative digital solutions."
      );
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.lang = 'en-US';
      utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'en-US') ;
      utterance.volume = 1;

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

  // const downloadCV = () => {
  // const link = document.createElement('a');
  // link.href = CV_PATH;
  // link.download = 'Kusasirakwe_Ethan_Developer_CV_v1.pdf';
  // link.target = '_blank';
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);
  // };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32">
      <div className="container mx-auto relative z-10 max-w-4xl">
        <div className="text-center space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Enhanced Avatar with Holographic Effect */}
          <div className="relative mx-auto w-40 h-40 sm:w-44 sm:h-44 lg:w-48 lg:h-48 mb-6 sm:mb-8 lg:mb-10">
            <div 
              className={`w-full h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent p-1 cursor-pointer ${isSpinning ? 'animate-spin-slow' : ''}`}
              onClick={() => setIsSpinning(!isSpinning)}
              onDoubleClick={() => setImageDialogOpen(true)}
            >
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <img
                  src={theme === 'dark' ? "/uploads/darktheme.JPG" : "/uploads/790aa63d-8736-498b-b561-e0884f2609a7.png"}
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
          <div className="space-y-3 sm:space-y-5">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-tech font-bold text-gradient-professional animate-professional-slide-in professional-heading px-2">
              ETHAN KUSASIRAKWE
            </h1>
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-muted-foreground animate-slide-up px-4 anim-delay-200 font-medium tracking-wide">
              Software Developer • Creative Technologist • Digital Innovation Specialist
            </p>
          </div>

          {/* Animated Tagline */}
          <div className="min-h-[3rem] sm:min-h-[4rem] flex items-center justify-center animate-professional-fade-in px-4 anim-delay-400">
            <p className="text-xs sm:text-base md:text-lg lg:text-xl text-primary font-medium text-center professional-body leading-relaxed">
              {text}
              <span className="animate-ping text-primary ml-1">|</span>
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center animate-slide-up px-4 anim-delay-600 max-w-2xl mx-auto pt-4">
            <Button
              variant="gradient"
              size="lg"
              className="rounded-full w-full sm:w-auto"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              View My Work
            </Button>

            <Button
            // onClick={downloadCV}
              variant="outline"
              size="lg"
              className="rounded-full w-full sm:w-auto"
              asChild
            >
              <a href={CV_PATH} download="Kusasirakwe_Ethan_Developer_CV_v1.pdf">
                <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Download CV
              </a>
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full w-full sm:w-auto border border-muted-foreground/20 hover:border-primary"
            >
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Get In Touch
            </Button>
          </div>
        </div>
      </div>

      {/* Full Image Dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="sm:max-w-md md:max-w-lg p-2">
          <img
            src={theme === 'dark' ? "/uploads/darktheme.JPG" : "/uploads/790aa63d-8736-498b-b561-e0884f2609a7.png"}
            alt="Ethan Kusasirakwe"
            className="w-full h-auto rounded-lg object-cover"
          />
        </DialogContent>
      </Dialog>
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
