import TechTag from '../atoms/TechTag';
import TranslatedText from '../atoms/TranslatedText';
import type { TimelineItem } from '../types/profile';

interface TimelineSectionProps {
  timeline: TimelineItem[];
}

export default function TimelineSection({ timeline }: TimelineSectionProps) {
  return (
    <section className="bg-gray-800 dark:bg-gray-700 print:bg-white print:border print:border-gray-300 p-6 rounded border border-gray-600 print:break-inside-avoid print:mt-8">
      <h2 className="text-gray-100 print:text-gray-800 text-xl font-bold mb-6 font-mono">
        <span className="text-blue-500 print:text-gray-600"># </span>
        <TranslatedText translationKey="timeline.title" namespace="profile" />
      </h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 transform -translate-x-1/2 hidden md:block print:hidden" />

        <div className="space-y-12 print:space-y-6">
          {timeline.map((item, index) => (
            <div key={index} className="relative print:break-inside-avoid">
              {/* Year badge */}
              <div className="absolute left-1/2 top-0 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold z-10 hidden md:block print:hidden">
                {item.year}
              </div>

              {/* Timeline dot */}
              <div className="absolute left-1/2 top-8 w-4 h-4 bg-blue-500 border-4 border-gray-800 dark:border-gray-700 rounded-full transform -translate-x-1/2 z-10 hidden md:block print:hidden" />

              {/* Content */}
              <div className={`w-full md:w-5/12 print:w-full ${index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:pr-8'} print:ml-0 print:pl-0 print:pr-0`}>
                <div className="bg-gray-700 dark:bg-gray-600 print:bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl print:shadow-none print:hover:translate-y-0 border border-gray-600 print:border print:border-gray-300 print:mb-4">
                  {/* Mobile year - Show in print too */}
                  <div className="md:hidden print:block bg-gradient-to-r from-blue-500 to-blue-600 print:bg-gray-600 text-white print:text-white px-3 py-1 rounded-full text-sm font-bold mb-4 w-fit">
                    {item.year}
                  </div>

                  <h3 className="text-gray-100 print:text-gray-800 text-lg font-semibold mb-2">
                    {item.title}
                  </h3>
                  <div className="text-gray-400 print:text-gray-600 text-sm mb-4">
                    {item.company}
                  </div>
                  <p className="text-gray-200 print:text-gray-700 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech, techIndex) => (
                      <TechTag key={techIndex}>{tech}</TechTag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}