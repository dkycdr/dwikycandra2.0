import React from 'react';
import './testimonials.css';

const items = [
  { 
    text: "Dwiky consistently delivers high-quality solutions with practical, actionable insights. His work is exceptionally clean and maintains consistency across all projects.", 
    who: "Bootcamp Mentor" 
  },
  { 
    text: "Working with Dwiky has been seamless. His communication is clear, proactive problem-solving is exceptional, and collaboration is highly professional.", 
    who: "Team Member" 
  },
  { 
    text: "The deliverables exceeded our expectations, completed on schedule, and demonstrated outstanding professionalism throughout the engagement.", 
    who: "Client" 
  },
  { 
    text: "The UI/UX implementation is responsive, intuitive, and provides excellent cross-device compatibility. Truly impressive technical execution.", 
    who: "Beta User" 
  }
];

export default function Testimonials() {
  return (
    <section className="testimonials" aria-label="Testimoni">
      <div className="container">
        <h3>What People Say?</h3>
        <div className="testi-marquee" role="list">
          <div className="testi-track">
            {items.concat(items).map((it, idx) => (
              <div key={idx} className="testi-item" role="listitem">
                <p className="testi-text">“{it.text}”</p>
                <div className="testi-who">— {it.who}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
