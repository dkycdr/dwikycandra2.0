import React, { useEffect, useRef, useState } from 'react';
import './about.css';
import Stats from './Stats';
import Testimonials from './Testimonials';
import ProfilePhoto from './ProfilePhoto';

export default function About() {
  const skillsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Animate skill bars
            setTimeout(() => {
              const bars = entry.target.querySelectorAll('.skill-bar');
              bars.forEach((bar) => {
                const percent = bar.getAttribute('data-percent');
                bar.style.setProperty('--skill-width', `${percent}%`);
              });
            }, 100);
          }
        });
      },
      { threshold: 0.25 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <>
      <section className="about" id="about">
        <div className="container">
          <h2>About Me</h2>
          <p>
            Hello — I'm Dwiky, a student at President University and a front-end developer.
            I enjoy building clean interfaces that feel fast and pleasant to use.
            Beyond frontend, I'm currently exploring Generative AI and its practical applications in web products.
          </p>

          <ProfilePhoto />

          <div className="about-grid">
            <div className="bio">
              <h3>Full Information</h3>
              <p>
                I am pursuing my Bachelor’s degree at President University.
                I joined the Indosat Ooredoo IDCamp 2025 bootcamp (Gen AI Engineering track)
                to deepen my understanding of generative models and their integration into web applications.
              </p>
              <p>
                My primary focus is on React.js, responsive UI design, and performance optimization. I also have solid experience building RESTful APIs with Node.js and experimenting with Python for ML prototyping.
              </p>

              <div className="info-grid">
                <div className="info-card">
                  <span className="info-label">Education</span>
                  <p>President University</p>
                </div>
                <div className="info-card">
                  <span className="info-label">Focus Area</span>
                  <p>Full Stack Web Dev & AI</p>
                </div>
                <div className="info-card">
                  <span className="info-label">Mentorship</span>
                  <p>Self-learner — Tech Community</p>
                </div>
                <div className="info-card">
                  <span className="info-label">Availability</span>
                  <p>Freelance & weekends</p>
                </div>
              </div>

              <div className="courses-section">
                <h4>Professional Courses</h4>
                <div className="courses-list">
                  <div className="course-item">
                    <span className="course-name">Pijak in Collaboration with IBM SkillsBuild</span>
                    <span className="course-type">AI Course</span>
                  </div>
                  <div className="course-item">
                    <span className="course-name">ID Camp 2025</span>
                    <span className="course-type">Generative AI Engineering</span>
                  </div>
                  <div className="course-item">
                    <span className="course-name">Coding Camp 2026 by DBS Foundation</span>
                    <span className="course-type">Full Stack Web Development</span>
                  </div>
                  <div className="course-item">
                    <span className="course-name">AWS Backend Academy</span>
                    <span className="course-type">Cloud Backend Development</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="skills" ref={skillsRef}>
              <h3>Skills & Confidence Level</h3>
              
              {/* Frontend Skills */}
              <div className="skill-category">
                <h4>Frontend Development</h4>
                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">HTML/CSS</span>
                    <span className="skill-percent">90%</span>
                  </div>
                  <div className="skill-bar" data-percent="90"></div>
                </div>

                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">JavaScript (ES6+)</span>
                    <span className="skill-percent">85%</span>
                  </div>
                  <div className="skill-bar" data-percent="85"></div>
                </div>

                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">React.js</span>
                    <span className="skill-percent">88%</span>
                  </div>
                  <div className="skill-bar" data-percent="88"></div>
                </div>

                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">Responsive Design</span>
                    <span className="skill-percent">92%</span>
                  </div>
                  <div className="skill-bar" data-percent="92"></div>
                </div>
              </div>

              {/* Backend Skills */}
              <div className="skill-category">
                <h4>Backend Development</h4>
                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">Node.js</span>
                    <span className="skill-percent">70%</span>
                  </div>
                  <div className="skill-bar" data-percent="70"></div>
                </div>

                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">Express.js</span>
                    <span className="skill-percent">50%</span>
                  </div>
                  <div className="skill-bar" data-percent="50"></div>
                </div>  

                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">PostgreSQL</span>
                    <span className="skill-percent">70%</span>
                  </div>
                  <div className="skill-bar" data-percent="70"></div>
                </div>
              </div>

              {/* Other Skills */}
              <div className="skill-category">
                <h4>AI/ML & Other</h4>
                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">Python (AI/ML)</span>
                    <span className="skill-percent">75%</span>
                  </div>
                  <div className="skill-bar" data-percent="75"></div>
                </div>

                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">Git & Version Control</span>
                    <span className="skill-percent">80%</span>
                  </div>
                  <div className="skill-bar" data-percent="80"></div>
                </div>

                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">UI/UX Design Thinking</span>
                    <span className="skill-percent">78%</span>
                  </div>
                  <div className="skill-bar" data-percent="78"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Stats />
      <Testimonials />
    </>
  );
}

