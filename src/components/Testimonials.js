import React from 'react';
import './testimonials.css';

const items = [
  { 
    text: "Clean code, consistent quality. Always delivers practical solutions.", 
    who: "Bootcamp Mentor" 
  },
  { 
    text: "Clear communication, proactive problem-solving. Great to work with.", 
    who: "Team Member" 
  },
  { 
    text: "Exceeded expectations. On time, professional, high quality.", 
    who: "Client" 
  },
  { 
    text: "Responsive UI, intuitive design. Works perfectly across devices.", 
    who: "Beta User" 
  }
];

export default function Testimonials() {
  return (
    <section className="testimonials" aria-label="Testimoni">
      <div className="container">
        <h3>Client Feedback</h3>
        <div className="testi-marquee" role="list">
          <div className="testi-track">
            {items.concat(items).map((it, idx) => (
              <div key={idx} className="testi-item" role="listitem">
                <div className="quote-icon">"</div>
                <p className="testi-text">{it.text}</p>
                <div className="testi-who">{it.who}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
