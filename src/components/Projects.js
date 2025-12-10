import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import TiltedCard from './TiltedCard';
import './projects.css';

const projects = [
  {
    id: 1,
    title: 'AI-Powered Landing Page',
    desc: 'A modern landing page featuring an AI chat assistant and smooth animations.',
    image: 'project1.jpg',
    tech: ['React', 'Framer Motion', 'TailwindCSS', 'OpenAI'],
    links: { demo: 'https://dkycdr.github.io/dwiky-candra/ai-landing.html', code: '#' },
    role: 'Personal Project',
    jobDesc: 'Full ownership of project design and implementation. Responsible for UI/UX design, component architecture, API integration with OpenAI, and deployment.'
  },
  {
    id: 2,
    title: 'Career Pods Explorer',
    desc: 'Career Pods help President University students with career guidance, skill-building, mentorship, events, and easy access to resources.',
    image: 'project2.jpg',
    tech: ['React', 'Node.js', 'Next.js', 'PostgreSQL', 'Socket.io',],
    links: { demo: 'https://career-podsv1.vercel.app', code: '#' },
    role: 'Project Manager',
    jobDesc: 'Led cross-functional team coordinating development timeline, feature prioritization, and stakeholder communication. Managed sprint cycles, conducted code reviews, and ensured project delivery within deadlines.'
  },
  {
    id: 3,
    title: 'President FoodConnect',
    desc: 'President FoodConnect is a platform connecting students with local food vendors, offering seamless ordering and delivery services.',
    image: 'project3.jpg',
    tech: ['React', 'Next.js', 'Flutter', 'Node.js', 'PostgreSQL'],
    links: { demo: '#', code: '#' },
    role: 'Project Manager',
    jobDesc: 'Oversaw end-to-end project coordination between frontend and backend teams. Responsible for requirements gathering, timeline management, risk mitigation, and final product delivery coordination.'
  },
  {
    id: 4,
    title: 'Z Studio',
    desc: 'Z Studio is a creative service platform offering video editing, web design, and logo creation for clients seeking professional digital solutions.',
    image: 'project4.jpg',
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Socket.io'],
    links: { demo: '#', code: '#' },
    role: 'Fullstack Developer',
    jobDesc: 'Developed both frontend and backend components. Built responsive UI with React/Next.js, implemented real-time features using Socket.io, designed database schemas, and created RESTful APIs for client management and service delivery.'
  },
  {
    id: 5,
    title: 'Digital Notes',
    desc: 'Digital Notes is a personal project for managing notes with real-time collaboration features.',
    image: 'project5.jpg',
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    links: { demo: 'https://digital-notes-beige.vercel.app', code: '#' },
    role: 'Personal Project',
    jobDesc: 'Designed and implemented a note-taking application with real-time collaboration. Developed frontend using React/Next.js, backend with Node.js, and integrated WebSocket for live updates. Focused on user authentication, note sharing, and responsive design.'
  }
];

export default function Projects() {
  const gridRef = useRef(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = gridRef.current?.querySelectorAll('.card') || [];
    cards.forEach((card, idx) => {
      card.style.setProperty('--delay', `${idx * 0.1}s`);
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedRole) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedRole]);

  // Handle modal close with animation
  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedRole(null);
      setIsClosing(false);
    }, 400); // Match animation duration
  };

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <p className="section-desc">A selection of my top projects showcasing modern technology.</p>
        </div>

        <div className="grid" ref={gridRef}>
          {projects.map(p => (
            <TiltedCard
              key={p.id}
              imageSrc=""
              altText=""
              captionText=""
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={3}
              scaleOnHover={1.008}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <div className="card">
                  <div className="card-inner">
                    <div className="card-front">
                      <div className="card-content">
                        <h3>{p.title}</h3>
                        <p>{p.desc}</p>
                        <div 
                          className="role-badge" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRole(p);
                          }}
                          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                        >
                          {p.role}
                        </div>
                        <div className="tech-stack">
                          {p.tech.map(tech => (
                            <span key={tech} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="card-links">
                      <a href={p.links.demo} className="card-link demo">Live Demo</a>
                      <a href={p.links.code} className="card-link code">View Code</a>
                    </div>
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </div>

      {/* Role Modal - Rendered via Portal to body */}
      {selectedRole && createPortal(
        <div 
          className={`role-modal-overlay ${isClosing ? 'closing' : ''}`} 
          onClick={handleCloseModal}
        >
          <div className="role-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              ✕
            </button>

            <div className="role-modal-header">
              <h2>{selectedRole.title}</h2>
              <p className="role-title">{selectedRole.role}</p>
            </div>

            <div className="role-modal-content">
              <h3>Job Description & Responsibilities</h3>
              <p>{selectedRole.jobDesc}</p>

              <div className="role-details">
                <h4>Project Details</h4>
                <p><strong>Technologies:</strong> {selectedRole.tech.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
