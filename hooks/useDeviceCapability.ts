'use client';

import { useMemo } from 'react';
import { useMediaQuery } from './useMediaQuery';

export type QualityTier = 'high' | 'medium' | 'low';

export function useDeviceCapability(): QualityTier {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  return useMemo(() => {
    if (isMobile) return 'low';
    if (isTablet) return 'medium';
    return 'high';
  }, [isMobile, isTablet]);
}
