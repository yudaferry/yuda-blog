import type { Metadata } from "next";
import TerminalHeader from '../../components/organisms/TerminalHeader';
import SkillsSection from '../../components/organisms/SkillsSection';
import TimelineSection from '../../components/organisms/TimelineSection';
import ProjectsSection from '../../components/organisms/ProjectsSection';
import { profileData } from '../../data/profileData';

export const metadata: Metadata = {
  title: "Profile - Yuda Ferry Mahendra",
  description: "Professional profile and CV of Yuda Ferry Mahendra - Software Architect & Team Lead Engineer",
};

export default function ProfilePage() {
  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 print:min-h-0">
      {/* Terminal-style CV Layout */}
      <div className="w-full bg-gray-100 dark:bg-gray-900 print:shadow-none shadow-2xl print:overflow-visible overflow-hidden print:max-w-none print:border-0">
        <TerminalHeader contact={profileData.contact} />

        {/* Professional Summary - Full Width */}
        <section className="bg-gray-800 dark:bg-gray-700 print:bg-white print:border print:border-gray-300 p-6 mx-8 mt-8 mb-8 rounded border border-gray-600 print:break-inside-avoid print:order-1 print:mx-4 print:mt-6 print:mb-6">
          <h2 className="text-gray-100 print:text-gray-800 text-xl font-bold mb-6 font-mono">
            <span className="text-blue-500 print:text-gray-600"># </span>Professional Summary
          </h2>
          <p className="text-gray-200 print:text-gray-700 leading-relaxed">
            {profileData.professionalSummary}
          </p>
        </section>

        {/* Main Content Grid - Web: 3-column, Print: Single column with reordered sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 print:gap-4 print:p-4 print:block print:space-y-6">

          {/* Career Timeline - Web: Main column, Print: Second */}
          <div className="lg:col-span-2 print:order-2">
            <TimelineSection timeline={profileData.timeline} />
          </div>

          {/* Skills Section - Web: Sidebar, Print: Third */}
          <aside className="lg:col-span-1 print:order-3">
            <SkillsSection skillCategories={profileData.skillCategories} />

            {/* Education Section - Web: Sidebar, Print: Fourth */}
            <section className="bg-gray-800 dark:bg-gray-700 print:bg-white print:border print:border-gray-300 p-6 rounded border border-gray-600 mt-8 print:mt-6 print:break-inside-avoid print:order-4">
              <h2 className="text-gray-100 print:text-gray-800 text-xl font-bold mb-6 font-mono">
                <span className="text-blue-500 print:text-gray-600"># </span>Education
              </h2>
              <div>
                <div className="text-gray-100 print:text-gray-800 font-semibold mb-2">
                  {profileData.education.degree}
                </div>
                <div className="text-gray-400 print:text-gray-600 mb-2">
                  {profileData.education.institution} • {profileData.education.year}
                </div>
                <div className="text-gray-200 print:text-gray-700 text-sm">
                  {profileData.education.description}
                </div>
              </div>
            </section>
          </aside>

          {/* Notable Projects - Web: Main column, Print: Fifth */}
          <div className="lg:col-span-2 print:break-before-page print:order-5">
            <ProjectsSection projects={profileData.projects} />
          </div>
        </div>
      </div>
    </div>
  );
}