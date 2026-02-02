'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function getServerSnapshot() {
  return false;
}

export function useReducedMotion(): boolean {
  const subscribe = (callback: () => void) => {
    const media = window.matchMedia(QUERY);
    media.addEventListener('change', callback);
    return () => media.removeEventListener('change', callback);
  };

  const getSnapshot = () => {
    return window.matchMedia(QUERY).matches;
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
