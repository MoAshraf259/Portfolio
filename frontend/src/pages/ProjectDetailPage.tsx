import { Link, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { usePortfolio } from '../hooks/usePortfolio';
import { getProjectDiagram, projectSlug } from '../content/projectDiagrams';
import { ProjectDiagram } from '../components/ProjectDiagram';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = usePortfolio();

  const project = useMemo(() => {
    if (!data || !slug) {
      return null;
    }
    return data.projects.find((item) => projectSlug(item) === slug) ?? null;
  }, [data, slug]);

  if (isLoading) {
    return <div className="project-detail project-detail--loading">Loading project…</div>;
  }

  if (error || !data) {
    return <div className="project-detail project-detail--error">Unable to load project data right now.</div>;
  }

  if (!project) {
    return (
      <div className="project-detail project-detail--error">
        <p>We couldn&apos;t find that project.</p>
        <Link className="button button--ghost" to="/">
          Back to portfolio
        </Link>
      </div>
    );
  }

  const diagram = getProjectDiagram(project);

  return (
    <div className="project-detail">
      <header className="project-detail__header">
        <Link className="project-detail__back" to="/">
          ← Back to portfolio
        </Link>
        <div>
          <h1>{project.name}</h1>
          <div className="project-detail__meta">
            <span className={`project-type project-type--${project.type.toLowerCase()}`}>{project.type}</span>
            {project.tags.length > 0 && (
              <div className="project-detail__tags">
                {project.tags.map((tag) => (
                  <span className="tag" key={tag.id}>
                    {tag.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="project-detail__section">
        <h2>Overview</h2>
        <p>{project.description}</p>
        {project.impact && <p className="project-detail__impact">{project.impact}</p>}
      </section>

      {diagram && (
        <section className="project-detail__section">
          <h2>Architecture</h2>
          <p className="project-detail__summary">{diagram.summary}</p>
          <ProjectDiagram diagram={diagram} />
          <div className="project-detail__grid">
            <div>
              <h3>Highlights</h3>
              <ul>
                {diagram.highlights.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Modules</h3>
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
        <section className="project-detail__section">
          <h2>Links</h2>
          <div className="project-detail__links">
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
  );
}
