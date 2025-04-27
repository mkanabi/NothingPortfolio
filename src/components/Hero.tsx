import React, { useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PhoneModel from './PhoneModel';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      nameRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
    .fromTo(
      taglineRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.6'
    )
    .fromTo(
      descriptionRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.6'
    )
    .fromTo(
      btnRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.4'
    );
    
    // Parallax effect on scroll
    gsap.to(heroRef.current, {
      backgroundPositionY: '30%',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

// 3D Model smooth scroll animation
gsap.to(modelRef.current, {

});

  }, []);

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center bg-secondary px-4 sm:px-6 md:px-8 pt-16"
    >
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto w-full">
        <div className="text-left">
          <h1 
            ref={nameRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 text-primary"
          >
            Mohammed Kanabi
          </h1>
          
          <p 
            ref={taglineRef}
            className="text-xl sm:text-2xl font-medium tracking-tight mb-6 text-primary-light"
          >
            Creative Strategist | Storyteller | Tech Enthusiast
          </p>
          
          <p 
            ref={descriptionRef}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-10"
          >
            Blending creativity, strategy, and technical warmth to redefine storytelling.
          </p>
          
          <a
            ref={btnRef}
            href="#about"
            className="inline-block btn group"
          >
            Discover my work
            <ArrowDown className="inline-block ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
          </a>
        </div>

   <div ref={modelRef} className="h-[1000px] w-full">
  <Canvas
    camera={{ position: [0, 0, 20], fov: 20 }}
    className="w-full h-full"
  >

    {/* Soft ambient light */}
    <ambientLight intensity={0.3} />

    {/* Key light */}
    <directionalLight
      position={[5, 5, 5]}
      intensity={6.2}
      castShadow
    />

    {/* Fill light */}
    <directionalLight
      position={[-5, 2, 5]}
      intensity={0.7}
    />



    {/* Back light / Rim light */}
    <directionalLight
      position={[0, 5, -5]}
      intensity={0.5}
    />

    <Suspense fallback={null}>
      <PhoneModel />
    </Suspense>

    <OrbitControls 
      enableZoom={false}
      autoRotate
      autoRotateSpeed={4}
    />
  </Canvas>
</div>

      </div>
      
      {/* Grid overlay for aesthetic */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-accent-light/20"></div>
        ))}
      </div>
    </section>
  );
};

export default Hero;