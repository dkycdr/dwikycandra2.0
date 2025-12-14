import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import TiltedCard from './TiltedCard';
import './projects.css';

const projects = [
  {
    id: 2,
    title: 'Career Pods Explorer',
    desc: 'Full-stack career guidance platform serving 500+ President University students. Reduced career resource discovery time by 60% through intelligent categorization and real-time mentorship matching.',
    image: 'project2.jpg',
    tech: ['React', 'Node.js', 'Next.js', 'PostgreSQL', 'Socket.io'],
    links: { demo: 'https://career-podsv1.vercel.app', code: '#' },
    role: 'Project Manager & Lead Developer',
    jobDesc: 'Led 4-person cross-functional team through full SDLC. Architected scalable PostgreSQL database schema handling 500+ user profiles and 1000+ career resources. Implemented real-time WebSocket connections for instant mentorship notifications. Reduced page load time from 3.2s to 1.1s through code splitting and lazy loading. Managed sprint cycles using Agile methodology, conducted code reviews, and delivered MVP 2 weeks ahead of schedule.',
    size: 'large' // Bento: span 2 columns
  },
  {
    id: 3,
    title: 'President FoodConnect',
    desc: 'Multi-platform food ordering system processing 200+ daily orders across campus. Achieved 95% order accuracy rate and reduced average delivery time by 40% through optimized vendor-student matching algorithm.',
    image: 'project3.jpg',
    tech: ['React', 'Next.js', 'Flutter', 'Node.js', 'PostgreSQL'],
    links: { demo: '#', code: '#' },
    role: 'Project Manager & Backend Architect',
    jobDesc: 'Coordinated 6-person team across web (React/Next.js) and mobile (Flutter) platforms. Designed and implemented RESTful API architecture handling 200+ concurrent requests with 99.5% uptime. Built real-time order tracking system using WebSockets, reducing customer support inquiries by 35%. Architected PostgreSQL database with optimized indexing strategies, achieving sub-100ms query response times. Implemented JWT-based authentication system securing 800+ user accounts. Delivered production-ready MVP in 12 weeks with zero critical bugs post-launch.',
    size: 'large' // Bento: span 2 columns
  },
  {
    id: 4,
    title: 'Z Studio',
    desc: 'Full-stack creative services platform managing 50+ client projects. Automated project workflow reducing administrative overhead by 45% and improved client communication response time by 60%.',
    image: 'project4.jpg',
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Socket.io'],
    links: { demo: '#', code: '#' },
    role: 'Full-Stack Developer',
    jobDesc: 'Architected end-to-end TypeScript application with strict type safety, reducing runtime errors by 80%. Implemented real-time client-designer collaboration system using Socket.io, enabling instant feedback on 100+ design iterations. Built custom file upload system handling 50MB+ assets with progress tracking and automatic compression. Designed RESTful API with Express.js serving 15+ endpoints with comprehensive error handling. Integrated Stripe payment gateway processing $10K+ in transactions. Optimized bundle size from 2.1MB to 450KB through code splitting and tree shaking, achieving 90+ Lighthouse performance score.',
    size: 'medium' // Bento: span 2 columns
  },
  {
    id: 1,
    title: 'AI-Powered Landing Page',
    desc: 'A modern landing page featuring an AI chat assistant and smooth animations.',
    image: 'project1.jpg',
    tech: ['React', 'Framer Motion', 'TailwindCSS', 'OpenAI'],
    links: { demo: 'https://dkycdr.github.io/dwiky-candra/ai-landing.html', code: '#' },
    role: 'Personal Project',
    jobDesc: 'Full ownership of project design and implementation. Responsible for UI/UX design, component architecture, API integration with OpenAI, and deployment.',
    size: 'small' // Bento: span 1 column
  },
  {
    id: 5,
    title: 'Digital Notes',
    desc: 'Digital Notes is a personal project for managing notes with real-time collaboration features.',
    image: 'project5.jpg',
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    links: { demo: 'https://digital-notes-beige.vercel.app', code: '#' },
    role: 'Personal Project',
    jobDesc: 'Designed and implemented a note-taking application with real-time collaboration. Developed frontend using React/Next.js, backend with Node.js, and integrated WebSocket for live updates. Focused on user authentication, note sharing, and responsive design.',
    size: 'small' // Bento: span 1 column
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
            <div key={p.id} className="project-wrapper" data-size={p.size}>
              <TiltedCard
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
                        <a href={p.links.demo} className="card-link demo" target="_blank" rel="noopener noreferrer">
                          <svg className="link-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                          <span>Live Demo</span>
                        </a>
                        <a href={p.links.code} className="card-link code" target="_blank" rel="noopener noreferrer">
                          <svg className="link-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                          </svg>
                          <span>View Code</span>
                        </a>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
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
