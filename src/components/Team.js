import React from 'react';
import './team.css';
import { FiGithub, FiGlobe } from 'react-icons/fi';
import teamMember1 from '../images/team-member-1.jpg';
import teamMember2 from '../images/team-member-2.png';
import teamMember3 from '../images/team-member-3.jpg';

export default function Team() {
  const teamMembers = [
    {
      id: 1,
      name: 'Zaky Purwana',
      role: 'Frontend Developer',
      image: teamMember1,
      bio: 'I trust him to deliver quality code on time. A reliable and skilled developer.',
      links: {
        github: 'https://github.com/zeekkk246',
        portfolio: 'https://zeekkk246.github.io/portfolio/'
      }
    },
    {
      id: 2,
      name: 'Nico Johannes Sirait',
      role: 'Backend Developer',
      image: teamMember2,
      bio: 'A backend wizard who ensures our applications run smoothly and efficiently.',
      links: {
        github: 'https://github.com/nicoyhnnssiraitt',
        portfolio: 'https://nicoyhnnssiraitt.github.io/portfolio'
      }
    },
    {
      id: 3,
      name: 'Rivaldo Haryono',
      role: 'DevOps Engineer',
      image: teamMember3,
      bio: 'Expert in deploying and maintaining our infrastructure with ease.',
      links: {
        github: 'https://github.com/xenscreww',
        portfolio: 'https://xenscreww.github.io/portfolio'
      }
    },
    // Tambah lebih banyak team members di sini
  ];

  return (
    <section className="team" id="team">
      <div className="container">
        <h2>Team & Collaboration</h2>
        <p className="team-subtitle">
          Working with amazing people to build incredible projects
        </p>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-card-image">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-member-photo"
                  onError={(e) => {
                    e.target.style.backgroundColor = '#9b59ff';
                    e.target.style.backgroundImage = 'linear-gradient(135deg, #9b59ff, #6432ff)';
                    e.target.style.width = '100%';
                    e.target.style.height = '100%';
                    e.target.style.display = 'flex';
                    e.target.style.alignItems = 'center';
                    e.target.style.justifyContent = 'center';
                    e.target.style.color = '#fff';
                    e.target.style.fontSize = '32px';
                    e.target.style.fontWeight = 'bold';
                    e.target.textContent = member.name.split(' ')[0][0];
                  }}
                />
              </div>

              <div className="team-card-content">
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>

                <div className="team-links">
                  {member.links.github && (
                    <a
                      href={member.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="team-link"
                      title="GitHub Profile"
                    >
                      <FiGithub />
                    </a>
                  )}
                  {member.links.portfolio && (
                    <a
                      href={member.links.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="team-link"
                      title="Portfolio"
                    >
                      <FiGlobe />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
