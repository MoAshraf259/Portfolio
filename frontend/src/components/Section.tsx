import type { PropsWithChildren, ReactNode } from 'react';

interface SectionProps extends PropsWithChildren {
  id: string;
  title: string;
  eyebrow?: ReactNode;
  description?: ReactNode;
}

export function Section({ id, title, eyebrow, description, children }: SectionProps) {
  return (
    <section id={id} className="section">
      <div className="section__header">
        {eyebrow && <span className="section__eyebrow">{eyebrow}</span>}
        <h2 className="section__title">{title}</h2>
        {description && <p className="section__description">{description}</p>}
      </div>
      {children}
    </section>
  );
}
