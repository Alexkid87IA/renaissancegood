import { Component, ReactNode } from 'react';
import i18n from '../lib/i18n';

interface Props {
  children: ReactNode;
  fallbackLevel?: 'page' | 'app';
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  private handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const t = i18n.t.bind(i18n);
      const isChunkError = this.state.error?.message?.includes('Failed to load') ||
        this.state.error?.message?.includes('dynamically imported module') ||
        this.state.error?.message?.includes('Loading chunk');
      const level = this.props.fallbackLevel || 'app';

      return (
        <div className={`${level === 'app' ? 'min-h-screen' : 'min-h-[60vh]'} bg-beige flex items-center justify-center px-6`}>
          <div className="max-w-md text-center">
            <h1 className="font-display text-4xl font-bold text-dark-text mb-4">
              {t('error', { ns: 'common', defaultValue: 'Oops' })}
            </h1>
            <p className="font-sans text-dark-text/60 text-sm mb-8 leading-relaxed">
              {isChunkError
                ? t('errorBoundary.chunkMessage', { ns: 'common', defaultValue: 'Une mise à jour est disponible. Veuillez rafraîchir la page.' })
                : t('errorBoundary.message', { ns: 'common', defaultValue: 'Une erreur inattendue s\'est produite.' })
              }
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={this.handleReload}
                className="font-sans text-[10px] tracking-[0.3em] uppercase bg-dark-text text-white px-8 py-4 hover:bg-bronze transition-colors duration-300"
              >
                {t('errorBoundary.refresh', { ns: 'common', defaultValue: 'Rafraîchir' })}
              </button>
              <button
                onClick={this.handleGoHome}
                className="font-sans text-[10px] tracking-[0.3em] uppercase border border-dark-text text-dark-text px-8 py-4 hover:bg-dark-text hover:text-white transition-colors duration-300"
              >
                {t('errorBoundary.home', { ns: 'common', defaultValue: 'Accueil' })}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
