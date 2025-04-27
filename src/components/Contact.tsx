import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  
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
        { y: 0, opacity: 1, duration: 0.6 }
      )
      .fromTo(
        contentRef.current?.querySelectorAll('.contact-item'),
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
  
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <section id="contact" className="section" ref={sectionRef}>
      <h2 ref={headingRef} className="section-title">Get In Touch</h2>
      
      <div 
        ref={contentRef}
        className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
          
          <div className="space-y-6">
            <div 
              className="contact-item flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
              onClick={() => copyToClipboard('mkanabi@protonmail.com', 'email')}
            >
              <div className="flex-shrink-0 p-3 bg-gray-100 rounded-full mr-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">mkanabi@protonmail.com</p>
                
                {copied === 'email' && (
                  <span className="text-sm text-green-600 mt-1 block">Copied to clipboard!</span>
                )}
              </div>
            </div>
            
            <div 
              className="contact-item flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
              onClick={() => copyToClipboard('+9647503371759', 'phone')}
            >
              <div className="flex-shrink-0 p-3 bg-gray-100 rounded-full mr-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">+9647503371759</p>
                
                {copied === 'phone' && (
                  <span className="text-sm text-green-600 mt-1 block">Copied to clipboard!</span>
                )}
              </div>
            </div>
            
            <div className="contact-item flex items-center gap-4 mt-6">
              <a 
                href="https://github.com/mohammedkanabi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 rounded-full transition-colors hover:bg-primary hover:text-white"
                aria-label="GitHub Profile"
              >
                <Github className="w-6 h-6" />
              </a>
              
              <a 
                href="https://linkedin.com/in/mohammedkanabi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 rounded-full transition-colors hover:bg-primary hover:text-white"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-100 p-8 rounded-lg relative overflow-hidden">
          <h3 className="text-xl font-semibold mb-6 contact-item">Let's Connect</h3>
          
          <p className="mb-6 contact-item">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          
          <p className="contact-item">
            Whether you're a company looking to innovate, a fellow creative seeking collaboration, or simply want to say hello, 
            I'd love to hear from you. Let's create something remarkable together.
          </p>
          
          <a 
            href="mailto:mkanabi@protonmail.com" 
            className="mt-8 inline-block btn contact-item"
          >
            Send me a message
          </a>
          
          {/* Abstract design elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary opacity-5 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent-light opacity-10 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Contact;