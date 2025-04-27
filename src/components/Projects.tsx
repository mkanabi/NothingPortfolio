import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ExternalLink, X } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  details: string;
}

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const projects: Project[] = [
    {
      title: 'Wishesaz',
      description: 'A Kurdish version of Wordle, bringing the popular word game to Kurdish speakers worldwide.',
      image: 'https://images.pexels.com/photos/957224/pexels-photo-957224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tags: ['Web Development', 'Game Design', 'Language'],
      link: 'https://wishesaz.com',
      details: 'Wishesaz is a Kurdish adaptation of the popular word game Wordle, designed to make language learning engaging and accessible. The project involved creating a database of Kurdish words, implementing game mechanics, and designing an intuitive interface that respects Kurdish linguistic features. The game has helped thousands of Kurdish speakers worldwide connect with their language in a new way.'
    },
    {
      title: 'Kheranus',
      description: 'An online typing and literary challenge platform specifically designed for Kurdish literature.',
      image: 'https://images.pexels.com/photos/4126724/pexels-photo-4126724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tags: ['Web App', 'Education', 'Literature'],
      link: 'https://kheranus.org',
      details: 'Kheranus is an innovative platform that combines typing practice with literary education. The platform presents users with excerpts from classic and contemporary Kurdish literature, helping them improve their typing skills while simultaneously exposing them to important cultural texts. The project includes features such as typing speed tracking, accuracy measurements, and a comprehensive library of Kurdish literary works.'
    },
    {
      title: 'Kurdish Wordlist Repository',
      description: 'An open-source dictionary and language resource for Kurdish dialects and vocabularies.',
      image: 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tags: ['Open Source', 'Language', 'Research'],
      link: 'https://github.com/mkurdhist/wordlist',
      details: 'The Kurdish Wordlist Repository is a comprehensive digital resource that documents vocabulary across various Kurdish dialects. This project addresses the critical need for accessible Kurdish language resources in the digital age. The repository includes word definitions, usage examples, etymological information, and dialect variations. It serves as an essential tool for language researchers, educators, translators, and Kurdish language learners worldwide.'
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
        projectsRef.current?.querySelectorAll('.project-card'),
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2,
          ease: 'power2.out'
        },
        '-=0.3'
      );
    }
  }, [inView]);
  
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
      );
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);
  
  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
  };
  
  const closeProjectDetails = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      onComplete: () => setSelectedProject(null)
    });
  };

  return (
    <section id="projects" className="section bg-gray-100" ref={sectionRef}>
      <h2 ref={headingRef} className="section-title">Projects</h2>
      
      <div 
        ref={projectsRef}
        className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projects.map((project, index) => (
          <div 
            key={index}
            className="project-card bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
            onClick={() => openProjectDetails(project)}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="text-xs px-2 py-1 bg-accent-light text-primary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <button className="text-primary font-medium flex items-center hover-effect">
                View Details
                <ExternalLink className="ml-1 w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div 
            ref={modalRef}
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="h-60 overflow-hidden">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-semibold">{selectedProject.title}</h3>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    closeProjectDetails();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="text-sm px-3 py-1 bg-accent-light text-primary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                {selectedProject.details}
              </p>
              
              {selectedProject.link && (
                <a 
                  href={selectedProject.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn inline-flex items-center"
                >
                  Visit Project
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;