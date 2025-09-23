type HeaderNavProps = {
  sections: { id: string; label: string }[];
  name: string;
};

export function HeaderNav({ sections, name }: HeaderNavProps) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <span className="site-header__brand">{name}</span>
        <nav>
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
