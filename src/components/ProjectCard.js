import React from 'react';

const ProjectCard = ({ title, description, demoLink, codeLink, techStack }) => {

  return (
    <div className="card" ref={cardRef}>
      <div className="card-inner" ref={innerRef}>
        <div className="card-front" ref={frontRef}>
          <div className="card-content">
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="tech-stack">
              {techStack.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            <div className="card-links">
              {demoLink && (
                <a href={demoLink} className="card-link demo" target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
              )}
              {codeLink && (
                <a href={codeLink} className="card-link code" target="_blank" rel="noopener noreferrer">
                  View Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
{
  return (
    <div className="card" ref={cardRef}>
      <div className="card-inner">
        <div className="card-front" ref={frontRef}>
          <div className="card-content">
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="tech-stack">
              {techStack.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            <div className="card-links">
              {demoLink && (
                <a href={demoLink} className="card-link demo" target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
              )}
              {codeLink && (
                <a href={codeLink} className="card-link code" target="_blank" rel="noopener noreferrer">
                  View Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;