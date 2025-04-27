import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-secondary py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold tracking-tighter">
              Mohammed Kanabi
            </h2>
            <p className="mt-2 text-accent-dark">
              Creative Strategist | Storyteller | Tech Enthusiast
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm text-accent-dark">
              &copy; {currentYear} Mohammed Kanabi. All rights reserved.
            </p>
            <p className="text-sm text-accent-dark mt-1">
              Designed with &hearts; for Nothing
            </p>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <nav className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
            <a href="#about" className="text-sm text-accent hover:text-secondary transition-colors">About</a>
            <a href="#experience" className="text-sm text-accent hover:text-secondary transition-colors">Experience</a>
            <a href="#skills" className="text-sm text-accent hover:text-secondary transition-colors">Skills</a>
            <a href="#projects" className="text-sm text-accent hover:text-secondary transition-colors">Projects</a>
            <a href="#contact" className="text-sm text-accent hover:text-secondary transition-colors">Contact</a>
          </nav>
          
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-sm text-accent hover:text-secondary transition-colors"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;