import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { Briefcase } from 'lucide-react';

interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  description: string;
}

const Experience: React.FC = () => {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const headingRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  
  const experiences: ExperienceItem[] = [
    {
      company: 'LC Waikiki',
      position: 'Creative Specialist',
      period: '2022 - Present',
      description: 'Led creative strategy and content development for marketing campaigns, resulting in increased brand engagement and customer acquisition.'
    },
    {
      company: 'Sharp Vision',
      position: 'Technical Consultant',
      period: '2020 - 2022',
      description: 'Provided technical expertise for creative projects, bridging the gap between design objectives and technical implementation.'
    },
    {
      company: 'Kurdistan Arts & Culture NGO',
      position: 'Creative Director',
      period: '2019 - 2020',
      description: 'Directed creative initiatives to preserve and promote Kurdish culture through innovative digital experiences and storytelling.'
    },
    {
      company: 'Helsinki Foundation for Human Rights',
      position: 'Digital Content Strategist',
      period: '2017 - 2019',
      description: 'Developed compelling digital narratives to raise awareness about human rights issues and engage diverse audiences.'
    },
    {
      company: 'Freelance',
      position: 'Creative Technologist',
      period: '2015 - 2017',
      description: 'Collaborated with various clients to create unique digital experiences that combined technical expertise with creative storytelling.'
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
        itemsRef.current?.querySelectorAll('.experience-item'),
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
    <section id="experience" className="section bg-gray-100" ref={sectionRef}>
      <h2 ref={headingRef} className="section-title">Experience</h2>
      
      <div ref={itemsRef} className="mt-12 space-y-8">
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className="experience-item bg-white p-6 rounded-lg shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div className="flex items-center mb-3 md:mb-0">
                <Briefcase className="w-5 h-5 text-primary mr-3" />
                <h3 className="text-xl font-semibold">{exp.company}</h3>
              </div>
              <span className="inline-block px-3 py-1 bg-accent-light text-primary text-sm font-medium rounded-full">
                {exp.period}
              </span>
            </div>
            
            <h4 className="text-lg font-medium text-gray-700 mb-3">{exp.position}</h4>
            <p className="text-gray-600">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;