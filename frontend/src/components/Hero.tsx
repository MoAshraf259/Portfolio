import type { Profile } from '../types/portfolio';

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  return (
    <section className="hero" id="about">
      <div className="hero__content">
        <span className="hero__eyebrow">{profile.headline}</span>
        <h1 className="hero__title">{profile.name}</h1>
        <p className="hero__summary">{profile.summary}</p>
        <div className="hero__actions">
          {profile.linkedin && (
            <a className="button button--primary" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
          {profile.github && (
            <a className="button button--ghost" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          <a className="button button--ghost" href="#contact">
            Contact
          </a>
        </div>
        <div className="hero__meta">
          <span>{profile.location}</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          {profile.phone && <span>{profile.phone}</span>}
        </div>
      </div>
    </section>
  );
}
