import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { Award } from 'lucide-react';

interface AwardItem {
  title: string;
  organization: string;
  year: string;
  description: string;
}

const Awards: React.FC = () => {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const headingRef = useRef<HTMLHeadingElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  
  const awards: AwardItem[] = [
    {
      title: 'Top Volunteer',
      organization: 'HITEX',
      year: '2023',
      description: 'Recognized for exceptional contributions to technology education initiatives and community engagement.'
    },
    {
      title: 'Best Script Award',
      organization: 'NUHAT Duhok Film Festival',
      year: '2022',
      description: 'Honored for outstanding screenplay that showcased innovative storytelling and cultural significance.'
    },
    {
      title: 'IYLEP Alumni',
      organization: 'Iraqi Young Leaders Exchange Program',
      year: '2020',
      description: 'Selected for prestigious international exchange program fostering leadership and cross-cultural understanding.'
    }
  ];
  
  useEffect(() => {
    if (inView) {
      const tl = gsap.timeline();
      
      tl.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
      .fromTo(
        awardsRef.current?.querySelectorAll('.award-item'),
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.7, 
          stagger: 0.15,
          ease: 'power2.out'
        },
        '-=0.3'
      );
    }
  }, [inView]);

  return (
    <section id="awards" className="section" ref={sectionRef}>
      <h2 ref={headingRef} className="section-title">Awards & Recognition</h2>
      
      <div ref={awardsRef} className="mt-12 space-y-8">
        {awards.map((award, index) => (
          <div 
            key={index} 
            className="award-item flex flex-col md:flex-row items-start gap-6 p-6 bg-white border border-accent-light rounded-lg transition-all duration-300 hover:shadow-md"
          >
            <div className="flex-shrink-0 p-4 bg-gray-100 rounded-full">
              <Award className="w-10 h-10 text-primary" />
            </div>
            
            <div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                <h3 className="text-xl font-semibold">{award.title}</h3>
                <span className="inline-block md:mx-2 h-1 w-1 rounded-full bg-primary hidden md:block"></span>
                <span className="text-gray-600">{award.organization}</span>
                <span className="inline-block px-3 py-1 mt-2 md:mt-0 ml-0 md:ml-3 bg-accent-light text-primary text-sm font-medium rounded-full">
                  {award.year}
                </span>
              </div>
              
              <p className="text-gray-600">{award.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Awards;