import i18n from 'i18next';
import type { ProfileData } from '../components/types/profile';

export function getTranslatedProfileData(): ProfileData {
  const currentYear = new Date().getFullYear();
  const diffYear = currentYear - 2010;
  const nodejsYear = currentYear - 2011;
  const reactYear = currentYear - 2017;

  // Get translated data from i18n
  const getT = (key: string) => {
    if (!i18n.isInitialized) return key;
    return i18n.t(key, { ns: 'profile-data' }) || key;
  };

  return {
    contact: {
      name: getT('contact.name'),
      role: getT('contact.role'),
      location: getT('contact.location'),
      email: "me@yudaferry.my.id",
      linkedin: "linkedin.com/in/yudaferry",
      github: "github.com/yudaferry",
      telegram: "@yudaferry",
      instagram: "instagram.com/yudaferrymahendra",
      x: "x.com/yuda_ferry",
      experienceYears: `${diffYear}+`,
      specialization: getT('contact.specialization')
    },

    skillCategories: [
      {
        title: getT('skillCategories.0.title'),
        type: "progress",
        skills: [
          {
            name: "Node.js",
            years: `${nodejsYear}+ (${getT('skillCategories.0.skills.0.years')})`,
            progress: 95
          },
          {
            name: "ReactJS",
            years: `${reactYear}+ (${getT('skillCategories.0.skills.1.years')})`,
            progress: 85
          },
          {
            name: "MongoDB",
            years: `${currentYear - 2019}+ (${getT('skillCategories.0.skills.2.years')})`,
            progress: 85
          }
        ]
      },
      {
        title: getT('skillCategories.1.title'),
        type: "grid",
        skills: [
          { name: getT('skillCategories.1.skills.0.name') },
          { name: getT('skillCategories.1.skills.1.name') },
          { name: getT('skillCategories.1.skills.2.name') },
          { name: getT('skillCategories.1.skills.3.name') },
          { name: getT('skillCategories.1.skills.4.name') },
          { name: getT('skillCategories.1.skills.5.name') },
          { name: getT('skillCategories.1.skills.6.name') },
          { name: getT('skillCategories.1.skills.7.name') },
        ]
      }
    ],

    education: {
      degree: getT('education.degree'),
      institution: getT('education.institution'),
      year: getT('education.year'),
      description: getT('education.description')
    },

    professionalSummary: getT('professionalSummary'),

    timeline: [
      {
        year: getT('timeline.0.year'),
        title: getT('timeline.0.title'),
        company: getT('timeline.0.company'),
        description: getT('timeline.0.description'),
        technologies: ["Team Leadership", "Node.js", "AWS Services", "React Native", "ReactJS", "Electron"]
      },
      {
        year: getT('timeline.1.year'),
        title: getT('timeline.1.title'),
        company: getT('timeline.1.company'),
        description: getT('timeline.1.description'),
        technologies: ["Visual FoxPro 9", "Android Java", "Ionic", "Angular", "Node.js", "High Availability"]
      },
      {
        year: getT('timeline.2.year'),
        title: getT('timeline.2.title'),
        company: getT('timeline.2.company'),
        description: getT('timeline.2.description'),
        technologies: ["Drupal"]
      },
      {
        year: getT('timeline.3.year'),
        title: getT('timeline.3.title'),
        company: getT('timeline.3.company'),
        description: getT('timeline.3.description'),
        technologies: ["Node.js", "CouchDB"]
      },
      {
        year: getT('timeline.4.year'),
        title: getT('timeline.4.title'),
        company: getT('timeline.4.company'),
        description: getT('timeline.4.description'),
        technologies: ["PHP", "Codeigniter", "Cake PHP"]
      }
    ],

    projects: [
      {
        title: getT('projects.0.title'),
        meta: getT('projects.0.meta'),
        description: getT('projects.0.description'),
        technologies: ["Real-time Architecture", "Offline-first", "Cross-platform", "Team Leadership"]
      },
      {
        title: getT('projects.1.title'),
        meta: getT('projects.1.meta'),
        description: getT('projects.1.description'),
        technologies: ["High Availability", "Fault Tolerance", "System Administration", "Infrastructure"]
      },
      {
        title: getT('projects.2.title'),
        meta: getT('projects.2.meta'),
        description: getT('projects.2.description'),
        technologies: ["Android Development", "Real-time Monitoring", "Manufacturing", "Performance Analytics"]
      },
      {
        title: getT('projects.3.title'),
        meta: getT('projects.3.meta'),
        description: getT('projects.3.description'),
        technologies: ["Bot Development", "Process Automation", "Inter-departmental", "Workflow Optimization"]
      },
      {
        title: getT('projects.4.title'),
        meta: getT('projects.4.meta'),
        description: getT('projects.4.description'),
        technologies: ["Nodejs", "CouchDB"]
      }
    ]
  };
}