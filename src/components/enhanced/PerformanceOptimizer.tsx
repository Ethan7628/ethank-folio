import React, { memo, useMemo, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { logger } from '@/utils/logger';

// Error Fallback Component
const ErrorFallback: React.FC<{ error: Error; resetErrorBoundary: () => void }> = ({ 
  error, 
  resetErrorBoundary 
}) => (
  <div className="glass-effect rounded-lg p-6 m-4 text-center">
    <h2 className="text-xl font-bold text-destructive mb-2">Oops! Something went wrong</h2>
    <p className="text-muted-foreground mb-4">{error.message}</p>
    <button 
      onClick={resetErrorBoundary}
      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
    >
      Try Again
    </button>
  </div>
);

// Performance HOC
export const withErrorBoundary = <P extends object>(Component: React.ComponentType<P>) => {
  const WrappedComponent = memo((props: P) => (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => {
        logger.error('Component Error:', error);
      }}
    >
      <Component {...props} />
    </ErrorBoundary>
  ));
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

// Lazy Loading Hook
export const useLazyLoad = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// Debounce Hook
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Optimized Image Component
export const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}> = memo(({ src, alt, className, width, height }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setError(true);
  }, []);

  if (error) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground">Image failed to load</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        className={`${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ${className}`}
        loading="lazy"
      />
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';