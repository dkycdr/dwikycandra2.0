import React, { useEffect, useRef } from 'react';
import './stats.css';

function useCountUp(ref, to, duration = 1200, suffix = '') {
  useEffect(() => {
    let start = 0;
    const el = ref.current;
    if (!el) return;
    const stepTime = Math.max(Math.floor(duration / to), 10);
    const timer = setInterval(() => {
      start += 1;
      el.textContent = start + suffix;
      if (start >= to) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [ref, to, duration, suffix]);
}

export default function Stats() {
  const projectsRef = useRef(null);
  const techRef = useRef(null);
  const certificatesRef = useRef(null);

  useCountUp(projectsRef, 15, 1000, '+');
  useCountUp(techRef, 12, 1000, '+');
  useCountUp(certificatesRef, 4, 800);

  return (
    <section className="stats" aria-label="Statistics">
      <div className="container stats-grid">
        <div className="stat">
          <div className="stat-num" ref={projectsRef}>0</div>
          <div className="stat-label">Projects Completed</div>
        </div>
        <div className="stat">
          <div className="stat-num" ref={techRef}>0</div>
          <div className="stat-label">Technologies Mastered</div>
        </div>
        <div className="stat">
          <div className="stat-num" ref={certificatesRef}>0</div>
          <div className="stat-label">Professional Certificates</div>
        </div>
      </div>
    </section>
  );
}
