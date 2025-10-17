import React, { useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

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
  return (
    <div className="App">
      <NavBar />
      <Hero />
      <main>
        <About />
        <Projects />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="container">© {new Date().getFullYear()} Dwiky — Built with React</div>
      </footer>
    </div>
  );
}

export default App;
