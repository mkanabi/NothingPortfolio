import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Awards from './components/Awards';
import Motivation from './components/Motivation';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!isLoading) {
      const cursor = document.createElement('div');
      cursor.className = 'custom-cursor';
      document.body.appendChild(cursor);
      
      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: 'power2.out'
        });
      };
      
      document.addEventListener('mousemove', moveCursor);
      
      return () => {
        document.removeEventListener('mousemove', moveCursor);
        document.body.removeChild(cursor);
      };
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <div className="bg-secondary text-primary min-h-screen overflow-x-hidden">
          <Header />
          <main>
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Awards />
            <Motivation />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;