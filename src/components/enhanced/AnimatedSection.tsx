
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-in" | "slide-up" | "slide-left" | "scale-in";
  delay?: number;
  threshold?: number;
}

export const AnimatedSection = ({ 
  children, 
  className, 
  animation = "fade-in",
  delay = 0,
  threshold = 0.1
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold]);

  const animationClasses = {
    "fade-in": "opacity-0 transition-opacity duration-700 data-[visible=true]:opacity-100",
    "slide-up": "opacity-0 translate-y-8 transition-all duration-700 data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0",
    "slide-left": "opacity-0 translate-x-8 transition-all duration-700 data-[visible=true]:opacity-100 data-[visible=true]:translate-x-0",
    "scale-in": "opacity-0 scale-95 transition-all duration-700 data-[visible=true]:opacity-100 data-[visible=true]:scale-100"
  };

  return (
    <div
      ref={ref}
      className={cn(animationClasses[animation], className)}
      data-visible={isVisible}
    >
      {children}
    </div>
  );
};
