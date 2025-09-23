import type { Education } from '../types/portfolio';
import { formatDateRange } from '../utils/date';

type EducationListProps = {
  items: Education[];
};

export function EducationList({ items }: EducationListProps) {
  return (
    <ul className="education-list">
      {items.map((item) => (
        <li className="education-card" key={item.id}>
          <div className="education-card__header">
            <span className="education-card__degree">{item.degree}</span>
            <span className="education-card__meta">{formatDateRange(item.startDate ?? null, item.endDate ?? null)}</span>
          </div>
          <span>{item.institution}</span>
          <div className="education-card__meta">
            {item.fieldOfStudy && <span>{item.fieldOfStudy}</span>}
            {item.location && <span>{item.location}</span>}
          </div>
          {item.details && <p className="section__description">{item.details}</p>}
        </li>
      ))}
    </ul>
  );
}
