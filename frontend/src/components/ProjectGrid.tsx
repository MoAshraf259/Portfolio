import type { Project } from '../types/portfolio';

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
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
        </article>
      ))}
    </div>
  );
}
