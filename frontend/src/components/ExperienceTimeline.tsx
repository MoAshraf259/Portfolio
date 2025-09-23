import type { Experience } from '../types/portfolio';
import { formatDateRange } from '../utils/date';

type ExperienceTimelineProps = {
  experiences: Experience[];
};

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <ul className="timeline">
      {experiences.map((experience) => (
        <li className="timeline__item" key={experience.id}>
          <div className="timeline__marker" />
          <article className="timeline__card">
            <header className="timeline__title">
              <span className="timeline__role">{experience.role}</span>
              <span className="timeline__company">@ {experience.company}</span>
            </header>
            <div className="timeline__meta">
              <span>{formatDateRange(experience.startDate, experience.endDate)}</span>
              {experience.location && <span>{experience.location}</span>}
              {experience.employmentType && <span>{experience.employmentType}</span>}
            </div>
            <ul className="timeline__bullets">
              {experience.highlights.map((highlight) => (
                <li key={highlight.id}>{highlight.description}</li>
              ))}
            </ul>
          </article>
        </li>
      ))}
    </ul>
  );
}
