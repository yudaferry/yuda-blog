import type { ProfileData } from '../components/types/profile';

export const profileData: ProfileData = {
  contact: {
    name: "Yuda Ferry Mahendra",
    role: "Software Architect & Team Lead Engineer",
    location: "Surabaya, East Java, Indonesia",
    email: "me@yudaferry.my.id",
    linkedin: "linkedin.com/in/yudaferry",
    github: "github.com/yudaferry",
    telegram: "@yudaferry",
    instagram: "instagram.com/yudaferrymahendra",
    x: "x.com/yuda_ferry",
    experienceYears: `${new Date().getFullYear() - 2010}+`,
    specialization: "Real-time Offline-first Architecture"
  },

  skillCategories: [
    {
      title: "Core Expertise",
      type: "progress",
      skills: [
        {
          name: "Node.js",
          years: `${new Date().getFullYear() - 2011}+ (since 2011)`,
          progress: 95
        },
        {
          name: "ReactJS",
          years: `${new Date().getFullYear() - 2017}+ (since 2017)`,
          progress: 85
        },
        {
          name: "MongoDB",
          years: `${new Date().getFullYear() - 2019}+ (since 2019)`,
          progress: 85
        }
      ]
    },
    {
      title: "Additional Technologies",
      type: "grid",
      skills: [
        { name: "AWS Services" },
        { name: "Docker" },
        { name: "Leadership" },
        { name: "Team management" },
        { name: "Task management" },
        { name: "Electron" },
        { name: "Flutter" },
        { name: "Visual FoxPro" },
      ]
    }
  ],

  education: {
    degree: "Bachelor of Computer Science",
    institution: 'UPN "Veteran" Jawa Timur',
    year: "2013",
    description: "Focused on Computer Science fundamentals, software engineering principles, and system architecture"
  },

  professionalSummary: "Software Architect and Team Lead Engineer with 14+ years of progressive growth since 2010. Specializing in architecting and implementing real-time offline-first architecture using Node.js, MongoDB, React Native, and modern web technologies. Since 2019, I've been managing, mentoring, and guiding teams of junior and experienced engineers. Proven track record of leading large-scale POS and F&B digital products, from system design to deployment.",

  timeline: [
    {
      year: "2019 - Present",
      title: "Project Manager",
      company: "PT. WISANIN ARTHA JAYA",
      description: "Leading development of large-scale POS app and F&B digital ordering systems. Managing team of 15 people. Architecting technology stack decisions, database design, UI/UX planning, and implementing real-time offline-first architecture. ",
      technologies: ["Team Leadership", "Node.js", "AWS Services", "React Native", "ReactJS", "Electron"]
    },
    {
      year: "2015 - 2019",
      title: "System Analyst/Programmer",
      company: "PT. Kedawung Setia Corrugated Carton Box",
      description: "Managed existing Visual FoxPro 9 systems and researched modern technologies for manufacturing industry. Developed Android applications with Java, explored hybrid development with Ionic and Angular. Built high-availability server infrastructure with Heartbeat and DRBD, and created automation solutions including Telegram BOT servers with Node.js.",
      technologies: ["Visual FoxPro 9", "Android Java", "Ionic", "Angular", "Node.js", "High Availability"]
    },
    {
      year: "2015 - 2015",
      title: "Full-Stack Developer",
      company: "TWMG (The Website Marketing Group)",
      description: "Create simple web profile for ambertile company using Drupal",
      technologies: ["Drupal"]
    },
    {
      year: "2011 - 2015",
      title: "Software Engineer",
      company: "PT. ITProvent",
      description: "Expanded expertise from Node.js backend development. Gained foundational experience in server-side JavaScript.",
      technologies: ["Node.js", "CouchDB"]
    },
    {
      year: "2010 - 2011",
      title: "Web Programmer",
      company: "Web Expert",
      description: "Create a few website with PHP, Html, Css, Javascript. Sometimes using Codeigniter and Cake PHP",
      technologies: ["PHP", "Codeigniter", "Cake PHP"]
    }
  ],

  projects: [
    {
      title: "POS & F&B Digital Ordering System",
      meta: "MongoDB Realm • Node.js • React Native • ReactJS • Electron",
      description: "Leading the architecture and development of comprehensive POS application and F&B digital ordering system. Designed real-time offline-first architecture, technology stack selection, database design, and UI/UX planning. Full-stack solution supporting mobile POS and desktop ordering management.",
      technologies: ["Real-time Architecture", "Offline-first", "Cross-platform", "Team Leadership"]
    },
    {
      title: "High Availability Server Infrastructure",
      meta: "Centos 7 • Heartbeat • DRBD • Linux • System Administration",
      description: "Researched and implemented active-passive server infrastructure using Heartbeat and DRBD technologies. Built fault-tolerant system ensuring continuous uptime and automatic failover capabilities for critical manufacturing operations and data integrity.",
      technologies: ["High Availability", "Fault Tolerance", "System Administration", "Infrastructure"]
    },
    {
      title: "Production Machine Monitoring App",
      meta: "Android Java • Manufacturing Industry",
      description: "Developed Android application to monitor production machine performance and quantity for manufacturing operations. Created real-time monitoring system to track machine efficiency, output metrics, and operational status, improving production oversight and decision-making processes.",
      technologies: ["Android Development", "Real-time Monitoring", "Manufacturing", "Performance Analytics"]
    },
    {
      title: "Telegram Bot Automation",
      meta: "Node.js • Telegram API • Inter-departmental Communication",
      description: "Built Telegram server BOT using Node.js to automate communication and workflows between different company departments. Streamlined internal processes, notifications, and data sharing across teams, improving operational efficiency and reducing manual communication overhead.",
      technologies: ["Bot Development", "Process Automation", "Inter-departmental", "Workflow Optimization"]
    },
    {
      title: "REST API Backend server",
      meta: "Node.js • CoudhDB",
      description: "Developed REST API services for multiple enterprise clients including JJTEL, BAF (Bussan Auto Finance), and TRANSVISION.",
      technologies: ["Nodejs", "CouchDB"]
    }
  ]
};
