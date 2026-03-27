import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorDetails = null;
      try {
        if (this.state.error?.message) {
          errorDetails = JSON.parse(this.state.error.message);
        }
      } catch (e) {
        // Not a JSON error
      }

      return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8 text-center">
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-8 animate-pulse">
            <AlertTriangle size={48} />
          </div>
          
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-4">Something went wrong</h1>
          <p className="text-gray-500 text-lg font-medium max-w-md mb-12 leading-relaxed">
            We encountered an unexpected error. Our team has been notified and we're working on a fix.
          </p>

          {errorDetails && (
            <div className="w-full max-w-2xl bg-red-500/5 border border-red-500/10 p-6 rounded-3xl mb-12 text-left">
              <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-4">Error Details</p>
              <pre className="text-xs text-gray-400 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {JSON.stringify(errorDetails, null, 2)}
              </pre>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-orange-500 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20"
            >
              <RefreshCcw size={18} />
              RELOAD APP
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
            >
              <Home size={18} />
              GO HOME
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
