import type { SkillCategory } from '../types/portfolio';

interface SkillGroupsProps {
  skills: SkillCategory[];
}

export function SkillGroups({ skills }: SkillGroupsProps) {
  return (
    <div className="skill-groups">
      {skills.map((group) => (
        <article className="skill-group" key={group.id}>
          <h3 className="skill-group__title">{group.name}</h3>
          <ul>
            {group.skills.map((skill) => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
