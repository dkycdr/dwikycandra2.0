import React, { useEffect, useRef } from 'react';
import './projects.css';

const projects = [
  {
    id: 1,
    title: 'AI-Powered Landing Page',
    desc: 'Landing page modern dengan fitur AI chat assistant dan animasi smooth.',
    image: 'project1.jpg',
    tech: ['React', 'Framer Motion', 'TailwindCSS', 'OpenAI'],
    links: { demo: 'https://dkycdr.github.io/dwiky-candra/ai-landing.html', code: '#' }
  },
  {
    id: 2,
    title: 'Career Pods Explorer',
    desc: 'Dashboard real-time dengan visualisasi data interaktif dan theming system.',
    image: 'project2.jpg',
    tech: ['React', 'Node.js', 'Next.js', 'PostgreSQL', 'Socket.io', ],
    links: { demo: 'career-podsv1.vercel.app', code: '#' }
  },
  {
    id: 3,
    title: 'President FoodConnect',
    desc: 'Interface modern untuk platform kursus online dengan video player custom.',
    image: 'project3.jpg',
    tech: ['React', 'Flutter', 'Node.js', 'PostgreSQL'],
    links: { demo: '#', code: '#' }
  },
  {
    id: 4,
    title: 'Social Media Dashboard',
    desc: 'Dashboard media sosial dengan analisis sentiment dan data visualization.',
    image: 'project4.jpg',
    tech: ['Next.js', 'Chart.js', 'TensorFlow.js', 'Socket.io'],
    links: { demo: '#', code: '#' }
  }
];

export default function Projects() {
  const gridRef = useRef(null);

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

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <p className="section-desc">Beberapa proyek terbaik yang telah saya kerjakan menggunakan teknologi modern.</p>
        </div>
        
        <div className="grid" ref={gridRef}>
          {projects.map(p => (
            <div key={p.id} className="card">
              <div className="card-inner">
                <div className="card-front">
                  <div className="card-content">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
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
              <div className="card-shine"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
