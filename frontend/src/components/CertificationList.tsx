import type { Certification } from '../types/portfolio';
import { formatDate } from '../utils/date';

type CertificationListProps = {
  items: Certification[];
};

export function CertificationList({ items }: CertificationListProps) {
  return (
    <ul className="certification-list">
      {items.map((item) => (
        <li className="certification-card" key={item.id}>
          <strong>{item.name}</strong>
          <span className="education-card__meta">
            <span>{item.issuer}</span>
            {item.issueDate && <span>{formatDate(item.issueDate)}</span>}
          </span>
          {item.credentialUrl && (
            <a className="button button--ghost" href={item.credentialUrl} target="_blank" rel="noreferrer">
              Credential
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
