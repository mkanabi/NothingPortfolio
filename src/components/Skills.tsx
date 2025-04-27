import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { Code, Palette, PenTool } from 'lucide-react';

interface SkillCategory {
  icon: React.ReactNode;
  title: string;
  skills: string[];
}

const Skills: React.FC = () => {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const headingRef = useRef<HTMLHeadingElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  
  const skillCategories: SkillCategory[] = [
    {
      icon: <Palette className="w-8 h-8 text-primary" />,
      title: 'Creative',
      skills: [
        'Adobe Creative Suite',
        'UI/UX Design',
        'Motion Graphics',
        'Brand Strategy',
        'Visual Storytelling',
        'Content Creation'
      ]
    },
    {
      icon: <Code className="w-8 h-8 text-primary" />,
      title: 'Technical',
      skills: [
        'ReactJS',
        'JavaScript',
        'Web Development',
        'IT Systems',
        'Project Management',
        'Data Visualization'
      ]
    },
    {
      icon: <PenTool className="w-8 h-8 text-primary" />,
      title: 'Strategic',
      skills: [
        'Copywriting',
        'Marketing Strategy',
        'Campaign Planning',
        'Social Media Strategy',
        'Content Strategy',
        'Brand Positioning'
      ]
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
        categoriesRef.current?.querySelectorAll('.skill-category'),
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.7, 
          stagger: 0.2,
          ease: 'power2.out'
        },
        '-=0.3'
      );
    }
  }, [inView]);

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <h2 ref={headingRef} className="section-title">Skills</h2>
      
      <div 
        ref={categoriesRef}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {skillCategories.map((category, index) => (
          <div 
            key={index}
            className="skill-category bg-white border border-accent-light p-6 rounded-lg transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-center mb-6">
              {category.icon}
              <h3 className="text-xl font-semibold ml-3">{category.title}</h3>
            </div>
            
            <ul className="space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <li 
                  key={skillIndex}
                  className="skill-item flex items-center"
                >
                  <span className="inline-block w-2 h-2 bg-primary mr-3"></span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-16 p-6 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Languages</h3>
        <div className="flex flex-wrap gap-4">
          <span className="px-4 py-2 bg-white text-primary rounded-full border border-accent-light">English (Fluent)</span>
          <span className="px-4 py-2 bg-white text-primary rounded-full border border-accent-light">Kurdish (Native)</span>
          <span className="px-4 py-2 bg-white text-primary rounded-full border border-accent-light">Arabic (Proficient)</span>
        </div>
      </div>
    </section>
  );
};

export default Skills;