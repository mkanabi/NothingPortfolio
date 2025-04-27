import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { Lightbulb } from 'lucide-react';

const About: React.FC = () => {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (inView) {
      const tl = gsap.timeline();
      
      tl.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      )
      .fromTo(
        contentRef.current?.querySelectorAll('p'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.2 },
        '-=0.4'
      );
    }
  }, [inView]);

  return (
    <section id="about" className="section" ref={sectionRef}>
      <h2 ref={headingRef} className="section-title">About Me</h2>
      
      <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            Throughout my journey from a creative technical specialist to an award-winning storyteller, 
            I've been driven by an insatiable curiosity and passion for blending design, technology, 
            and storytelling in unique ways.
          </p>
          
          <p className="text-lg leading-relaxed">
            My technical background gives me a unique perspective on creative challenges, allowing me 
            to bridge the gap between design aspirations and technical realities. I approach each project 
            with both analytical precision and creative intuition, creating solutions that are both 
            innovative and practical.
          </p>
          
          <p className="text-lg leading-relaxed">
            I'm particularly fascinated by the intersection of technology and culture, which led me to 
            create projects like Wishesaz (Wordle in Kurdish) that combine technical skills with cultural 
            preservation and accessibility.
          </p>
        </div>
        
        <div className="bg-gray-100 p-8 rounded-lg">
          <div className="flex items-center mb-6">
            <Lightbulb className="w-8 h-8 text-primary mr-4" />
            <h3 className="text-xl font-semibold">My Philosophy</h3>
          </div>
          
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="inline-block w-4 h-4 bg-primary mt-1 mr-3"></span>
              <p><strong>Curiosity-driven:</strong> I believe the best ideas come from asking "what if?" and exploring uncharted territories.</p>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-4 h-4 bg-primary mt-1 mr-3"></span>
              <p><strong>Human-centered:</strong> Technology should serve people, not the other way around.</p>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-4 h-4 bg-primary mt-1 mr-3"></span>
              <p><strong>Cross-disciplinary:</strong> The most innovative solutions emerge at the intersection of different fields.</p>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-4 h-4 bg-primary mt-1 mr-3"></span>
              <p><strong>Culturally grounded:</strong> Our backgrounds shape our perspectives and can be a source of unique insights.</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;