import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Full-screen navigation loader — centered logo + bronze sweep bar.
 * Appears on route change, fades out once the new page renders.
 */
export default function NavigationProgress() {
  const location = useLocation();
  const [phase, setPhase] = useState<'idle' | 'loading' | 'completing' | 'exiting'>('idle');
  const prevPath = useRef(location.pathname);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (prevPath.current === location.pathname) return;
    prevPath.current = location.pathname;

    if (timerRef.current) clearTimeout(timerRef.current);

    // Show loader
    setPhase('loading');

    // After a short delay, start exit sequence
    timerRef.current = setTimeout(() => {
      setPhase('completing');
      timerRef.current = setTimeout(() => {
        setPhase('exiting');
        timerRef.current = setTimeout(() => {
          setPhase('idle');
        }, 500);
      }, 300);
    }, 400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [location.pathname]);

  if (phase === 'idle') return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none"
      style={{
        opacity: phase === 'exiting' ? 0 : 1,
        transition: 'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-beige/80 backdrop-blur-sm"
        style={{
          opacity: phase === 'loading' ? 1 : phase === 'completing' ? 0.6 : 0,
          transition: 'opacity 400ms ease',
        }}
      />

      {/* Center content */}
      <div className="relative flex flex-col items-center">
        {/* Logo */}
        <img
          src="https://renaissance-cdn.b-cdn.net/RENAISSANCE%20TRANSPARENT-Photoroom.png"
          alt="Renaissance"
          className="h-28 sm:h-36 w-auto object-contain mb-10"
          style={{
            opacity: phase === 'loading' ? 1 : 0,
            transform: phase === 'loading' ? 'scale(1)' : 'scale(0.95)',
            transition: 'all 400ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        {/* Bronze sweep bar */}
        <div className="w-32 h-[1.5px] bg-dark-text/8 overflow-hidden rounded-full">
          <div
            className="h-full bg-bronze rounded-full"
            style={{
              animation: phase === 'loading'
                ? 'loadingSweep 1s ease-in-out infinite'
                : 'none',
              width: phase === 'completing' ? '100%' : undefined,
              transition: phase === 'completing' ? 'width 300ms ease-out' : undefined,
            }}
          />
        </div>
      </div>
    </div>
  );
}
