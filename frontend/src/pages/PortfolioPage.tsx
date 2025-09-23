import { HeaderNav } from '../components/HeaderNav';
import { Hero } from '../components/Hero';
import { Section } from '../components/Section';
import { ExperienceTimeline } from '../components/ExperienceTimeline';
import { ProjectGrid } from '../components/ProjectGrid';
import { SkillGroups } from '../components/SkillGroups';
import { EducationList } from '../components/EducationList';
import { CertificationList } from '../components/CertificationList';
import { CourseList } from '../components/CourseList';
import { ContactForm } from '../components/ContactForm';
import { usePortfolio } from '../hooks/usePortfolio';

const sections = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'courses', label: 'Courses' },
  { id: 'contact', label: 'Contact' },
];

export function PortfolioPage() {
  const { data, isLoading, error } = usePortfolio();

  if (isLoading) {
    return <div className="loader">Loading portfolio...</div>;
  }

  if (error || !data) {
    return <div className="error-state">Unable to load the portfolio at this time.</div>;
  }

  const { profile, experiences, projects, skills, education, certifications, courses } = data;

  return (
    <div className="app-shell">
      <HeaderNav sections={sections} name={profile.name} />
      <main className="main-content">
        <Hero profile={profile} />
        <Section
          id="experience"
          eyebrow="Professional Journey"
          title="Experience"
          description="DevOps leadership and embedded engineering work spanning cloud-native platforms, GPU-ready machine learning pipelines, and mission-critical automotive systems."
        >
          <ExperienceTimeline experiences={experiences} />
        </Section>
        <Section
          id="projects"
          eyebrow="Highlighted Work"
          title="Projects & Platforms"
          description="High-impact initiatives ranging from GitOps-driven infrastructure to embedded systems with over-the-air firmware delivery."
        >
          <ProjectGrid projects={projects} />
        </Section>
        <Section
          id="skills"
          eyebrow="Core Expertise"
          title="Technical Skills"
          description="A balanced toolkit across cloud infrastructure, automation, observability, embedded development, and communication protocols."
        >
          <SkillGroups skills={skills} />
        </Section>
        <Section
          id="education"
          eyebrow="Foundations"
          title="Education"
          description="Formal engineering background and intensive training programs focused on embedded systems and automation."
        >
          <EducationList items={education} />
        </Section>
        <Section
          id="certifications"
          eyebrow="Continuous Learning"
          title="Certifications"
        >
          <CertificationList items={certifications} />
        </Section>
        <Section
          id="courses"
          eyebrow="Recent Courses"
          title="Specialized Training"
        >
          <CourseList items={courses} />
        </Section>
        <Section
          id="contact"
          eyebrow="Let's Connect"
          title="Ready to build reliable platforms"
          description="Share your challenge and I'll outline how automation, observability, and robust infrastructure can help."
        >
          <ContactForm />
        </Section>
      </main>
      <footer className="footer">(c) {new Date().getFullYear()} {profile.name}. Built with Node.js, React, and Docker.</footer>
    </div>
  );
}
