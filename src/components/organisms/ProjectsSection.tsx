import ProjectItem from '../molecules/ProjectItem';
import TranslatedText from '../atoms/TranslatedText';
import type { Project } from '../types/profile';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="bg-gray-800 dark:bg-gray-700 print:bg-white print:border print:border-gray-300 p-6 rounded border border-gray-600 print:break-inside-avoid print:mt-8">
      <h2 className="text-gray-100 print:text-gray-800 text-xl font-bold mb-6 font-mono">
        <span className="text-blue-500 print:text-gray-600"># </span>
        <TranslatedText translationKey="projects.title" namespace="profile" />
      </h2>

      <div className="space-y-6 print:space-y-4">
        {projects.map((project, index) => (
          <ProjectItem key={index} project={project} />
        ))}
      </div>
    </section>
  );
}