import { Component, ReactNode } from 'react';
import i18n from '../lib/i18n';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      const t = i18n.t.bind(i18n);
      return (
        <div className="min-h-screen bg-beige flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <h1 className="font-display text-4xl font-bold text-dark-text mb-4">
              {t('error', { ns: 'common' })}
            </h1>
            <p className="font-sans text-dark-text/60 text-sm mb-8 leading-relaxed">
              {t('errorBoundary.message', { ns: 'common' })}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="font-sans text-[10px] tracking-[0.3em] uppercase bg-dark-text text-white px-8 py-4 hover:bg-bronze transition-colors duration-300"
            >
              {t('errorBoundary.refresh', { ns: 'common' })}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
