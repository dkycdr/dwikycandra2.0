import React, { useEffect, useRef } from 'react';
import './stats.css';

function useCountUp(ref, to, duration = 1200) {
  useEffect(() => {
    let start = 0;
    const el = ref.current;
    if (!el) return;
    const stepTime = Math.max(Math.floor(duration / to), 10);
    const timer = setInterval(() => {
      start += 1;
      el.textContent = start;
      if (start >= to) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [ref, to, duration]);
}

export default function Stats() {
  const projectsRef = useRef(null);
  const clientsRef = useRef(null);
  const hoursRef = useRef(null);

  useCountUp(projectsRef, 12, 1000);
  useCountUp(clientsRef, 6, 1000);
  useCountUp(hoursRef, 1200, 1200);

  return (
    <section className="stats" aria-label="Statistics">
      <div className="container stats-grid">
        <div className="stat">
          <div className="stat-num" ref={projectsRef}>0</div>
          <div className="stat-label">Project</div>
        </div>
        <div className="stat">
          <div className="stat-num" ref={clientsRef}>0</div>
          <div className="stat-label">Client / Collaboration</div>
        </div>
        <div className="stat">
          <div className="stat-num" ref={hoursRef}>0</div>
          <div className="stat-label">Hours of Coding</div>
        </div>
      </div>
    </section>
  );
}
