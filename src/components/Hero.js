import React, { useEffect, useState } from 'react';
import './hero.css';
import { FiGithub, FiCode, FiLayout, FiZap, FiArrowRight } from 'react-icons/fi';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className="hero-grid">
          {/* Left side */}
          <div className="hero-text">
            <div className={`hero-badge ${isVisible ? 'visible' : ''}`}>
              <FiGithub />
              Available for Projects
            </div>
            
            <h1 className={`hero-heading ${isVisible ? 'visible' : ''}`}>
              Building Beautiful <br/>
              Digital Experiences<br/>
              with React
            </h1>
            
            <p className={`hero-bio ${isVisible ? 'visible' : ''}`}>
              Hi, I'm Dwiky. A passionate Front-End Developer based in Jakarta, Indonesia.
              I specialize in crafting modern, performant, and user-friendly interfaces
              using React and cutting-edge web technologies. Currently studying at President
              University while working on freelance projects.
            </p>
            
            <div className={`hero-stats ${isVisible ? 'visible' : ''}`}>
              <div className="stat">
                <span className="stat-number">2+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">10+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
            </div>
            
            <div className={`hero-links ${isVisible ? 'visible' : ''}`}>
              <a href="#projects" className="hero-link primary">
                View Projects <FiArrowRight />
              </a>
              <a href="#contact" className="hero-link secondary">
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right side */}
          <div className={`hero-cards ${isVisible ? 'visible' : ''}`}>
            <div className="floating-card skill">
              <div className="skill-icon">
                <FiCode />
              </div>
              <div className="skill-text">
                <h4>Clean Code</h4>
                <p>Modern & Maintainable</p>
              </div>
            </div>

            <div className="floating-card skill">
              <div className="skill-icon">
                <FiLayout />
              </div>
              <div className="skill-text">
                <h4>UI/UX Focus</h4>
                <p>Beautiful & Intuitive</p>
              </div>
            </div>

            <div className="floating-card skill">
              <div className="skill-icon">
                <FiZap />
              </div>
              <div className="skill-text">
                <h4>Performance</h4>
                <p>Fast & Optimized</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
