import { useMemo, useState } from 'react';
import type { Project } from '../types/portfolio';
import { getProjectDiagram } from '../content/projectDiagrams';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedProject = useMemo(() => projects.find((project) => project.id === selectedId) ?? null, [projects, selectedId]);
  const selectedDiagram = useMemo(() => (selectedProject ? getProjectDiagram(selectedProject) : null), [selectedProject]);

  return (
    <>
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.id}>
            <header>
              <h3>{project.name}</h3>
              <p className="section__description">{project.description}</p>
            </header>
            {project.impact && <p className="section__description">{project.impact}</p>}
            <div className="project-card__tags">
              {project.tags.map((tag) => (
                <span className="tag" key={tag.id}>
                  {tag.label}
                </span>
              ))}
            </div>
            <div className="project-card__actions">
              <button className="button button--primary" type="button" onClick={() => setSelectedId(project.id)}>
                View system graph
              </button>
              {(project.githubUrl || project.externalUrl) && (
                <div className="project-card__links">
                  {project.githubUrl && (
                    <a className="button button--ghost" href={project.githubUrl} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  )}
                  {project.externalUrl && (
                    <a className="button button--ghost" href={project.externalUrl} target="_blank" rel="noreferrer">
                      View
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
      {selectedProject && (
        <ProjectDetailModal project={selectedProject} diagram={selectedDiagram} onClose={() => setSelectedId(null)} />
      )}
    </>
  );
}
