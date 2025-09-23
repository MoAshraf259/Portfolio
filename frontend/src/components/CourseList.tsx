import type { Course } from '../types/portfolio';

type CourseListProps = {
  items: Course[];
};

export function CourseList({ items }: CourseListProps) {
  return (
    <ul className="course-list">
      {items.map((item) => (
        <li className="course-card" key={item.id}>
          <strong>{item.name}</strong>
          <span className="education-card__meta">
            <span>{item.provider}</span>
            {item.link && (
              <a href={item.link} target="_blank" rel="noreferrer">
                View
              </a>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
