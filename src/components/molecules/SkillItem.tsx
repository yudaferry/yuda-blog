'use client';

import { useEffect, useState } from 'react';
import type { Skill } from '../types/profile';

interface SkillItemProps {
  skill: Skill;
  showProgress?: boolean;
}

export default function SkillItem({ skill, showProgress = true }: SkillItemProps) {
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    if (showProgress && skill.progress) {
      const timer = setTimeout(() => {
        setProgressWidth(skill.progress || 0);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [skill.progress, showProgress]);

  if (!showProgress) {
    return (
      <div className="bg-gray-700 dark:bg-gray-600 print:bg-white print:border print:border-gray-300 p-3 rounded text-center border border-gray-600 transition-all duration-300 hover:border-gray-400 hover:-translate-y-1 hover:shadow-lg text-sm text-gray-100 print:text-gray-800 print:hover:translate-y-0 print:shadow-none">
        {skill.name}
      </div>
    );
  }

  return (
    <div className="bg-gray-700 dark:bg-gray-600 print:bg-white print:border print:border-gray-300 p-4 rounded border-l-2 border-blue-500 print:border-l-gray-600 mb-4 transition-all duration-300 hover:bg-gray-600 hover:translate-x-1 print:hover:translate-x-0 print:hover:bg-white">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-100 print:text-gray-800 font-semibold">{skill.name}</span>
        {skill.years && (
          <span className="text-xs text-gray-400 print:text-gray-600">{skill.years}</span>
        )}
      </div>
      {skill.progress && (
        <div className="bg-gray-600 print:bg-gray-300 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 print:bg-gray-600 rounded-full transition-all duration-2000 ease-out relative"
            style={{ width: `${progressWidth}%` }}
          >
            <div className="absolute top-0 right-0 w-1 h-full bg-white bg-opacity-30 animate-pulse print:hidden" />
          </div>
        </div>
      )}
    </div>
  );
}