import { useEffect } from 'react';
import gsap from 'gsap';
import { useInView } from 'react-intersection-observer';

interface AnimationProps {
  target: React.RefObject<HTMLElement>;
  animation: 'fadeIn' | 'slideUp' | 'stagger';
  delay?: number;
  duration?: number;
  threshold?: number;
  staggerAmount?: number;
  children?: string;
}

export const useAnimation = ({
  target,
  animation,
  delay = 0,
  duration = 0.8,
  threshold = 0.2,
  staggerAmount = 0.1,
  children = ''
}: AnimationProps) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true
  });

  useEffect(() => {
    if (!inView || !target.current) return;

    let tl = gsap.timeline({ delay });

    switch (animation) {
      case 'fadeIn':
        tl.fromTo(
          target.current,
          { opacity: 0 },
          { opacity: 1, duration }
        );
        break;

      case 'slideUp':
        tl.fromTo(
          target.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration, ease: 'power2.out' }
        );
        break;

      case 'stagger':
        if (children && target.current) {
          const elements = target.current.querySelectorAll(children);
          tl.fromTo(
            elements,
            { y: 30, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              stagger: staggerAmount, 
              duration, 
              ease: 'power2.out' 
            }
          );
        }
        break;

      default:
        break;
    }

    return () => {
      tl.kill();
    };
  }, [inView, target, animation, delay, duration, staggerAmount, children]);

  return { ref, inView };
};