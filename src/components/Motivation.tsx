import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { Quote } from 'lucide-react';

const Motivation: React.FC = () => {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const headingRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (inView) {
      const tl = gsap.timeline();
      
      tl.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
      .fromTo(
        quoteRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.3'
      );
    }
  }, [inView]);

  return (
    <section id="motivation" className="section bg-gray-100" ref={sectionRef}>
      <h2 ref={headingRef} className="section-title">Why Nothing?</h2>
      
      <div 
        ref={quoteRef}
        className="mt-12 bg-white p-8 md:p-12 rounded-lg shadow-sm relative overflow-hidden"
      >
        <Quote className="absolute top-6 left-6 w-12 h-12 text-accent-light opacity-20" />
        
        <div className="relative">
          <p className="text-lg md:text-xl leading-relaxed">
            I am deeply inspired by Nothing's vision of making technology feel human again. 
            As a creative strategist, I am passionate about crafting stories that don't just inform — they move people. 
            I believe in breaking conventions, blending design with emotion, and redefining how brands speak. 
            Joining Nothing would allow me to channel my curiosity, creativity, and technical expertise into 
            building a brand voice that the world will remember.
          </p>
          
          <div className="mt-8 text-right">
            <span className="inline-block w-16 h-1 bg-primary mb-4"></span>
            <p className="text-lg font-semibold">Mohammed Kanabi</p>
          </div>
        </div>
        
        {/* Abstract design elements */}
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-light opacity-10 rounded-full"></div>
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary opacity-5 rounded-full"></div>
      </div>
    </section>
  );
};

export default Motivation;