import { useEffect } from 'react';
import type { Project } from '../types/portfolio';
import type { ProjectDiagram } from '../content/projectDiagrams';
import { ProjectDiagram as Diagram } from './ProjectDiagram';

type Props = {
  project: Project;
  diagram: ProjectDiagram | null;
  onClose: () => void;
};

export function ProjectDetailModal({ project, diagram, onClose }: Props) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <div className="project-modal__backdrop" onClick={onClose} aria-hidden="true" />
      <div className="project-modal__dialog">
        <header className="project-modal__header">
          <div>
            <h3 id="project-modal-title">{project.name}</h3>
            {project.type && <span className="project-modal__type">{project.type}</span>}
          </div>
          <button className="button button--ghost" type="button" onClick={onClose}>
            Close
          </button>
        </header>
        <div className="project-modal__body">
          <section className="project-modal__section">
            <h4>Overview</h4>
            <p>{project.description}</p>
            {project.impact && <p className="project-modal__impact">{project.impact}</p>}
          </section>

          {diagram && (
            <section className="project-modal__section">
              <h4>Architecture Map</h4>
              <p className="project-modal__summary">{diagram.summary}</p>
              <Diagram diagram={diagram} />
              <div className="project-modal__grid">
                <div>
                  <h5>Highlights</h5>
                  <ul>
                    {diagram.highlights.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5>Modules</h5>
                  <ul>
                    {diagram.modules.map((module) => (
                      <li key={module.nodeId}>
                        <strong>{module.title}:</strong> {module.detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {(project.githubUrl || project.externalUrl) && (
            <section className="project-modal__section">
              <h4>Links</h4>
              <div className="project-modal__links">
                {project.githubUrl && (
                  <a className="button button--ghost" href={project.githubUrl} target="_blank" rel="noreferrer">
                    GitHub Repository
                  </a>
                )}
                {project.externalUrl && (
                  <a className="button button--ghost" href={project.externalUrl} target="_blank" rel="noreferrer">
                    Live Demo / Docs
                  </a>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
