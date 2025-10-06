
import React, { useEffect, useState } from 'react';

export const ProductionLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide the HTML loading screen immediately
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
};
