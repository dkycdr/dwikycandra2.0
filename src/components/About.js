import React, { useEffect, useRef } from 'react';
import './about.css';
import Stats from './Stats';
import Testimonials from './Testimonials';

export default function About() {
  const skillsRef = useRef(null);

  useEffect(() => {
    // animate skill bars when section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.skill-bar > div');
            bars.forEach((b) => {
              const pct = b.getAttribute('data-percent');
              b.style.width = pct;
            });
          }
        });
      },
      { threshold: 0.25 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="about" id="about">
        <div className="container">
          <h2>Tentang Saya</h2>
          <p>
            Halo — saya Dwiky, mahasiswa President University dan front-end developer. Saya suka membuat antarmuka bersih yang terasa cepat
            dan enak digunakan. Selain frontend, saya sedang mempelajari area Gen AI dan aplikasi praktisnya pada produk web.
          </p>

          <div className="about-grid">
            <div className="bio">
              <h3>Info Lengkap</h3>
              <p>
                Saat ini saya menempuh studi di President University (S1). Saya mengikuti bootcamp Indosat Ooredoo IDCamp 2025
                (kelas Gen AI Engineering) untuk memperdalam pemahaman tentang model generatif dan integrasinya ke aplikasi web.
              </p>
              <p>
                Saya berfokus pada React, UI responsif, dan pengoptimalan performa. Saya juga memiliki pengalaman membangun API
                sederhana dengan Node.js dan melakukan eksperimen kecil dengan Python untuk prototyping ML.
              </p>
              <ul>
                <li>Mahasiswa: President University</li>
                <li>Bootcamp: IDCamp 2025 — Gen AI Engineering</li>
                <li>Platform Pelatihan: Beberapa kursus di Udemy (front-end & React)</li>
                <li>Pendidikan non-formal: Cuy University — mentor: Dea Afrizal (kursus praktis dan project-based)</li>
                <li>Availability: Ketersediaan freelance / kolaborasi: akhir pekan & setelah jam kuliah</li>
              </ul>
            </div>

            <div className="skills" ref={skillsRef}>
              <h3>Skills & tingkat percaya diri</h3>
              <div className="skill">
                <div className="skill-row"><span>HTML/CSS</span><span>90%</span></div>
                <div className="skill-bar"><div data-percent="90%" style={{width:'6%'}}></div></div>
              </div>
              <div className="skill">
                <div className="skill-row"><span>JavaScript</span><span>85%</span></div>
                <div className="skill-bar"><div data-percent="85%" style={{width:'6%'}}></div></div>
              </div>
              <div className="skill">
                <div className="skill-row"><span>React.js</span><span>88%</span></div>
                <div className="skill-bar"><div data-percent="88%" style={{width:'6%'}}></div></div>
              </div>
              <div className="skill">
                <div className="skill-row"><span>Node.js</span><span>70%</span></div>
                <div className="skill-bar"><div data-percent="70%" style={{width:'6%'}}></div></div>
              </div>
              <div className="skill">
                <div className="skill-row"><span>Python (AI/ML)</span><span>75%</span></div>
                <div className="skill-bar"><div data-percent="75%" style={{width:'6%'}}></div></div>
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

