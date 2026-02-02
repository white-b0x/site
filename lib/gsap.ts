'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let isRegistered = false;

export function registerGSAP() {
  if (typeof window === 'undefined') return;
  if (isRegistered) return;

  gsap.registerPlugin(ScrollTrigger);
  isRegistered = true;
}

export { gsap, ScrollTrigger };
