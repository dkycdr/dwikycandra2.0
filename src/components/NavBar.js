import React, { useEffect, useState, useRef } from 'react';
import './navbar.css';

export default function NavBar(){
  const [active, setActive] = useState('hero');
  const navRef = useRef(null);
  const [hl, setHl] = useState({left:0,width:0,opacity:0});
  const [activeHl, setActiveHl] = useState({left:0,width:0,opacity:0});

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    function update() {
      const nav = navRef.current;
      if (!nav) return setActiveHl({left:0,width:0,opacity:0});
      const activeEl = nav.querySelector('a.active');
      if (!activeEl) return setActiveHl({left:0,width:0,opacity:0});
      const navRect = nav.getBoundingClientRect();
      const r = activeEl.getBoundingClientRect();
      const left = r.left - navRect.left + nav.scrollLeft;
      const width = r.width;
      setActiveHl({left, width, opacity:1});
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [active]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    let leaveTimer = null;
    let isHovering = false;

    function onMouseEnter(){
      if (!isHovering) {
        // Start hover from active position
        setHl({left: activeHl.left, width: activeHl.width, opacity:0});
        isHovering = true;
      }
    }

    function onMouseMove(e){
      const target = e.target.closest('a');
      if (!target || !nav.contains(target)) return;
      const navRect = nav.getBoundingClientRect();
      const r = target.getBoundingClientRect();
      setHl({left: r.left - navRect.left + nav.scrollLeft, width: r.width, opacity:1});
      if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
    }

    function onLeave(){
      isHovering = false;
      leaveTimer = setTimeout(()=>{
        setHl({left: activeHl.left, width: activeHl.width, opacity:0});
      }, 150);
    }

    nav.addEventListener('mouseenter', onMouseEnter);
    nav.addEventListener('mousemove', onMouseMove);
    nav.addEventListener('mouseleave', onLeave);
    return () => {
      nav.removeEventListener('mouseenter', onMouseEnter);
      nav.removeEventListener('mousemove', onMouseMove);
      nav.removeEventListener('mouseleave', onLeave);
      if (leaveTimer) clearTimeout(leaveTimer);
    }
  }, [activeHl]);

  return (
    <header className="site-nav">
      <div className="container nav-inner">
        <div className="brand" aria-hidden={false}>
          {/* Animated brand: multi-layer with glowing accent */}
          <div className="brand-inner">
            <div className="brand-bg"></div>
            <div className="brand-text">
              <span className="glitch-text" data-text="Dwiky">Dwiky</span>
            </div>
            <div className="brand-accent">
              <span className="float-text">Dev</span>
              <span className="glow"></span>
            </div>
          </div>
        </div>
        <nav ref={navRef}>
          <span className="nav-highlight-active" style={{left: activeHl.left, width: activeHl.width, opacity: activeHl.opacity}} />
          <span className="nav-highlight-hover" style={{left: hl.left, width: hl.width, opacity: hl.opacity}} />
          <a className={active==='about' ? 'active': ''} href="#about">About</a>
          <a className={active==='projects' ? 'active': ''} href="#projects">Projects</a>
          <a className={active==='team' ? 'active': ''} href="#team">Team</a>
          <a className={active==='contact' ? 'active': ''} href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}
