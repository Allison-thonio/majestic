import { useEffect, useRef } from 'react';

export function useScrollAnimations() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all reveal elements
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach((el) => observer.observe(el));

    // Handle stagger children
    const staggerContainers = document.querySelectorAll('.stagger');
    staggerContainers.forEach((container) => {
      const children = container.children;
      Array.from(children).forEach((child, index) => {
        (child as HTMLElement).style.setProperty('--stagger-index', index.toString());
      });
    });

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}

export function useHeroParallax() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const heroBg = document.querySelector('.hero-bg');
      if (heroBg) {
        const parallaxSpeed = 0.3;
        (heroBg as HTMLElement).style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
