import SkillItem from '../molecules/SkillItem';
import type { SkillCategory } from '../types/profile';

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

export default function SkillsSection({ skillCategories }: SkillsSectionProps) {
  return (
    <section className="bg-gray-800 dark:bg-gray-700 print:bg-white print:border print:border-gray-300 p-6 rounded border border-gray-600 transition-all duration-300 hover:bg-gray-700 hover:border-gray-500 print:break-inside-avoid print:mt-8">
      <h2 className="text-gray-100 print:text-gray-800 text-xl font-bold mb-6 font-mono">
        <span className="text-blue-500 print:text-gray-600"># </span>Skills & Toolkit
      </h2>

      <div className="space-y-6 print:space-y-4">
        {skillCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className={`mb-6 print:mb-4 ${category.title === 'Additional Technologies' ? 'print:break-before-page print:pt-8' : 'print:break-inside-avoid'}`}>
            <h3 className="text-blue-400 print:text-gray-600 text-lg mb-4 font-semibold font-mono">
              <span className="text-gray-100 print:text-gray-800">## </span>{category.title}
            </h3>

            {category.type === 'progress' ? (
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem key={skillIndex} skill={skill} showProgress={true} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem key={skillIndex} skill={skill} showProgress={false} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}