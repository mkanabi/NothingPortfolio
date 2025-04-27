import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const paths = svgRef.current.querySelectorAll('path, line');
    
    gsap.set(paths, {
      strokeDasharray: (index, element) => {
        const length = element.getTotalLength();
        return `${length} ${length}`;
      },
      strokeDashoffset: (index, element) => element.getTotalLength()
    });
    
    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => {
        gsap.to('.loading-screen', {
          opacity: 0,
          duration: 0.5,
          onComplete: onLoadingComplete
        });
      }
    });
    
    tl.to(paths, {
      strokeDashoffset: 0,
      duration: 1.5,
      stagger: 0.2
    })
    .to(paths, {
      filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))',
      duration: 0.3,
      stagger: 0.1
    }, '-=1');
    
    return () => {
      tl.kill();
    };
  }, [onLoadingComplete]);

  return (
    <div className="loading-screen fixed inset-0 bg-black flex items-center justify-center z-50">
      <svg
        ref={svgRef}
        className="w-96 h-96"
        viewBox="0 0 1920 1080"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          className="stroke-white"
          strokeWidth="29"
          strokeLinecap="round"
          strokeMiterlimit="10"
          x1="175"
          y1="538.67"
          x2="371"
          y2="538.67"
          fill="none"
        />
        <path
          className="stroke-white"
          strokeWidth="29"
          strokeLinecap="round"
          strokeMiterlimit="10"
          d="M98.33,539.06h13.33"
          fill="none"
        />
        <line
          className="stroke-white"
          strokeWidth="29"
          strokeLinecap="round"
          strokeMiterlimit="10"
          x1="1582.78"
          y1="695.07"
          x2="1779.72"
          y2="860.08"
          fill="none"
        />
        <path
          className="stroke-white"
          strokeWidth="29"
          strokeLinecap="round"
          strokeMiterlimit="10"
          d="M1609.75,344.12h-42.8c-50.9,0-92.17-41.26-92.17-92.17v-2.38c0-50.9,41.26-92.17,92.17-92.17h179.3c50.9,0,92.17,41.26,92.17,92.17v2.38c0,50.9-38.73,89.63-89.63,89.63"
          fill="none"
        />
        <path
          className="stroke-white"
          strokeWidth="29"
          strokeLinecap="round"
          strokeMiterlimit="10"
          d="M1282.42,905.89c103.67-85.28,152.35-204.25,152.35-348.89v-36.67c0-150.2-66.92-273.48-177.35-358.44l-572-1c-111.05,84.97-180.35,208.9-180.35,359.44v36.67c0,146.58,67.82,277.24,173.73,362.42h267.63"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default LoadingScreen;