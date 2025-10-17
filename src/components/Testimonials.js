import React from 'react';
import './testimonials.css';

const items = [
  { text: 'Dwiky cepat memahami UI dan memberikan solusi rapi.', who: 'Mentor Bootcamp' },
  { text: 'Kerja sama lancar dan komunikasi jelas, recommended!', who: 'Rekan Tim' },
  { text: 'Proyek selesai sesuai deadline dan kualitas baik.', who: 'Klien' },
  { text: 'Antarmuka responsif dan aksesibel — enak dipakai.', who: 'Pengguna Beta' },
];

export default function Testimonials() {
  return (
    <section className="testimonials" aria-label="Testimoni">
      <div className="container">
        <h3>Testimoni</h3>
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
