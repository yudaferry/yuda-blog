import TechTag from '../atoms/TechTag';
import type { Project } from '../types/profile';

interface ProjectItemProps {
  project: Project;
}

export default function ProjectItem({ project }: ProjectItemProps) {
  return (
    <div className="bg-gray-700 dark:bg-gray-600 print:bg-white print:border print:border-gray-300 p-6 rounded border-l-4 border-blue-500 print:border-l-gray-600 mb-6 print:mb-4 transition-all duration-300 hover:bg-gray-600 hover:translate-x-2 hover:shadow-lg border border-gray-600 print:break-inside-avoid print:hover:translate-x-0 print:shadow-none print:hover:bg-white">
      <h3 className="text-gray-100 print:text-gray-800 text-lg font-semibold mb-2">
        {project.title}
      </h3>
      <div className="text-gray-400 print:text-gray-600 text-sm mb-4">
        {project.meta}
      </div>
      <p className="text-gray-200 print:text-gray-700 mb-4 leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech, index) => (
          <TechTag key={index}>{tech}</TechTag>
        ))}
      </div>
    </div>
  );
}