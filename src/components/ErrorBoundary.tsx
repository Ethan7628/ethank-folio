import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleClearCache = async () => {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
    }
    
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map(reg => reg.unregister()));
    }
    
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-foreground">Oops!</h1>
              <p className="text-muted-foreground">
                Something went wrong. This might be due to a cached version of the app.
              </p>
            </div>
            
            {this.state.error && (
              <div className="p-4 bg-destructive/10 rounded-lg text-left">
                <p className="text-sm text-destructive font-mono break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}
            
            <div className="flex flex-col gap-3">
              <Button onClick={this.handleReload} variant="default">
                Reload Page
              </Button>
              <Button onClick={this.handleClearCache} variant="outline">
                Clear Cache & Reload
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
