import React, { useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Team from './components/Team';
import Contact from './components/Contact';
import Cube3D from './components/Cube3D';
import ChatBot from './components/ChatBot';
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';

function App() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            // keep it visible once seen? we'll remove so effect can repeat
            entry.target.classList.remove('in-view');
          }
        });
      },
      { threshold: 0.25 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // 3D Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 30 - 15;
      const mouseY = (e.clientY / window.innerHeight) * 30 - 15;
      document.documentElement.style.setProperty('--mouse-x', `${mouseX}deg`);
      document.documentElement.style.setProperty('--mouse-y', `${mouseY}deg`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="App">
      <Cube3D />
      <NavBar />
      <Hero />
      <main>
        <About />
        <Projects />
        <Team />
        <Contact />
      </main>
      <ChatBot />
      <footer className="site-footer">
        <div className="container">
          <div className="footer-content">
            <div>© {new Date().getFullYear()} Dwiky — Built with React</div>
            <div className="social-links">
              <a href="https://github.com/dkycdr" target="_blank" rel="noopener noreferrer" title="GitHub" className="social-link">
                <FiGithub />
              </a>
              <a href="https://linkedin.com/in/dwiky-candra" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="social-link">
                <FiLinkedin />
              </a>
              <a href="https://instagram.com/dky_cdr" target="_blank" rel="noopener noreferrer" title="Instagram" className="social-link">
                <FiInstagram />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
