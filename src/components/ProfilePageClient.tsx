'use client';

import { useState, useEffect } from 'react';
import TerminalHeader from './organisms/TerminalHeader';
import SkillsSection from './organisms/SkillsSection';
import TimelineSection from './organisms/TimelineSection';
import ProjectsSection from './organisms/ProjectsSection';
import TranslatedText from './atoms/TranslatedText';
import { getTranslatedProfileData } from '../data/translatedProfileData';
import { profileData } from '../data/profileData';
import i18n from 'i18next';

export default function ProfilePageClient() {
  const [translatedData, setTranslatedData] = useState(profileData);

  useEffect(() => {
    const updateData = () => {
      if (i18n.isInitialized) {
        setTranslatedData(getTranslatedProfileData());
      }
    };

    updateData();

    const handleLanguageChange = () => {
      updateData();
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 print:min-h-0">
      {/* Terminal-style CV Layout */}
      <div className="w-full bg-gray-100 dark:bg-gray-900 print:shadow-none shadow-2xl print:overflow-visible overflow-hidden print:max-w-none print:border-0">
        <TerminalHeader contact={translatedData.contact} />

        {/* Professional Summary - Full Width */}
        <section className="bg-gray-800 dark:bg-gray-700 print:bg-white print:border print:border-gray-300 p-6 mx-8 mt-8 mb-8 rounded border border-gray-600 print:break-inside-avoid print:order-1 print:mx-4 print:mt-6 print:mb-6">
          <h2 className="text-gray-100 print:text-gray-800 text-xl font-bold mb-6 font-mono">
            <span className="text-blue-500 print:text-gray-600"># </span>
            <TranslatedText translationKey="summary.title" namespace="profile" />
          </h2>
          <p className="text-gray-200 print:text-gray-700 leading-relaxed">
            {translatedData.professionalSummary}
          </p>
        </section>

        {/* Main Content Grid - Web: 3-column, Print: Single column with reordered sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 print:gap-4 print:p-4 print:block print:space-y-6">

          {/* Career Timeline - Web: Main column, Print: Second */}
          <div className="lg:col-span-2 print:order-2">
            <TimelineSection timeline={translatedData.timeline} />
          </div>

          {/* Skills Section - Web: Sidebar, Print: Third */}
          <aside className="lg:col-span-1 print:order-3">
            <SkillsSection skillCategories={translatedData.skillCategories} />

            {/* Education Section - Web: Sidebar, Print: Fourth */}
            <section className="bg-gray-800 dark:bg-gray-700 print:bg-white print:border print:border-gray-300 p-6 rounded border border-gray-600 mt-8 print:mt-6 print:break-inside-avoid print:order-4">
              <h2 className="text-gray-100 print:text-gray-800 text-xl font-bold mb-6 font-mono">
                <span className="text-blue-500 print:text-gray-600"># </span>
                <TranslatedText translationKey="education.title" namespace="profile" />
              </h2>
              <div>
                <div className="text-gray-100 print:text-gray-800 font-semibold mb-2">
                  {translatedData.education.degree}
                </div>
                <div className="text-gray-400 print:text-gray-600 mb-2">
                  {translatedData.education.institution} • {translatedData.education.year}
                </div>
                <div className="text-gray-200 print:text-gray-700 text-sm">
                  {translatedData.education.description}
                </div>
              </div>
            </section>
          </aside>

          {/* Notable Projects - Web: Main column, Print: Fifth */}
          <div className="lg:col-span-2 print:break-before-page print:order-5">
            <ProjectsSection projects={translatedData.projects} />
          </div>
        </div>
      </div>
    </div>
  );
}