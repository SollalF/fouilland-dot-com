import { Icons } from "@/components/icons";
import { siteConfig } from "@/data/site";
import { Skill } from "@/components/skill-category";
import React from "react";

// Define skill categories
export const SKILL_CATEGORIES = {
  WEB: "Web",
  APPLICATION: "Application",
  DATABASE: "Database",
  CLOUD: "Cloud",
  AI: "AI",
  DEVOPS: "DevOps",
  OTHERS: "Others",
} as const;

// Define skill ratings explanation
export const SKILL_RATINGS_EXPLANATION = [
  {
    level: 1,
    description:
      "I&apos;ve tried it or haven&apos;t used it in at least 3 years.",
  },
  {
    level: 2,
    description:
      "I&apos;ve used it a little or haven&apos;t used it in at least a year.",
  },
  {
    level: 3,
    description:
      "I&apos;ve got a good grasp of it and can make something decent with it.",
  },
  {
    level: 4,
    description:
      "I&apos;ve used it multiple times and can get a project done with it by myself.",
  },
  {
    level: 5,
    description:
      "I use this almost every day! They&apos;re usually my technologies of choice when creating my own projects.",
  },
];

// Define categorized skills with ratings
export const SKILLS_DATA: Record<string, Skill[]> = {
  [SKILL_CATEGORIES.WEB]: [
    {
      name: "HTML",
      rating: 5,
      icon: <i className="cib-html5 text-orange-600" />,
    },
    {
      name: "CSS",
      rating: 5,
      icon: <i className="cib-css3 text-blue-500" />,
    },
    {
      name: "JavaScript",
      rating: 4,
      icon: <i className="cib-javascript text-yellow-400" />,
    },
    {
      name: "TypeScript",
      rating: 5,
      icon: <i className="cib-typescript text-blue-600" />,
    },
    {
      name: "Next.js",
      rating: 3,
      icon: <i className="cib-next-js text-black dark:text-white" />,
    },
    {
      name: "React",
      rating: 2,
      icon: <i className="cib-react text-cyan-400" />,
    },
    {
      name: "Tailwind",
      rating: 4,
      icon: <i className="cil-code text-cyan-500" />,
    },
  ],
  [SKILL_CATEGORIES.APPLICATION]: [
    {
      name: "Python",
      rating: 5,
      icon: <i className="cib-python text-yellow-500" />,
    },
    {
      name: "Flask",
      rating: 4,
      icon: <i className="cib-flask text-black dark:text-white" />,
    },
    {
      name: "Node.js",
      rating: 3,
      icon: <i className="cib-node-js text-green-600" />,
    },
    {
      name: "Docker",
      rating: 1,
      icon: <i className="cib-docker text-blue-600" />,
    },
  ],
  [SKILL_CATEGORIES.DATABASE]: [
    {
      name: "MongoDB",
      rating: 2,
      icon: <i className="cib-mongodb text-green-600" />,
    },
    {
      name: "Cosmos DB",
      rating: 3,
      icon: <i className="cib-microsoft text-blue-600" />,
    },
    {
      name: "Redis",
      rating: 3,
      icon: <i className="cib-redis text-red-600" />,
    },
  ],
  [SKILL_CATEGORIES.CLOUD]: [
    {
      name: "Azure",
      rating: 4,
      icon: <i className="cil-code text-blue-700" />,
    },
    {
      name: "DigitalOcean",
      rating: 5,
      icon: <i className="cil-code text-blue-500" />,
    },
  ],
  [SKILL_CATEGORIES.AI]: [
    {
      name: "OpenAI",
      rating: 5,
      icon: <i className="cil-code text-teal-600" />,
    },
    {
      name: "Claude",
      rating: 3,
      icon: <i className="cil-code text-violet-600" />,
    },
    {
      name: "Langchain",
      rating: 2,
      icon: <i className="cib-python text-emerald-500" />,
    },
    {
      name: "Qwen",
      rating: 1,
      icon: <i className="cil-code text-blue-600" />,
    },
    {
      name: "Gemini",
      rating: 3,
      icon: <i className="cib-google text-blue-600" />,
    },
  ],
  [SKILL_CATEGORIES.DEVOPS]: [
    {
      name: "Git",
      rating: 4,
      icon: <i className="cib-git text-orange-600" />,
    },
    {
      name: "GitHub Actions",
      rating: 3,
      icon: <i className="cib-github text-gray-800 dark:text-white" />,
    },
    {
      name: "Pytest",
      rating: 3,
      icon: <i className="cib-python text-yellow-500" />,
    },
  ],
  [SKILL_CATEGORIES.OTHERS]: [
    {
      name: "Jira",
      rating: 4,
      icon: <i className="cib-jira text-blue-600" />,
    },
    {
      name: "Monday.com",
      rating: 3,
      icon: <i className="cil-code text-blue-600" />,
    },
  ],
};

export const DATA = {
  name: siteConfig.name,
  initials: "SF",
  url: siteConfig.url,
  location: "Causeway Bay, Hong Kong",
  locationLink: "https://www.google.com/maps/place/causewaybay",
  description: siteConfig.description,
  summary:
    "Full Stack Developer with a knack for crafting cutting-edge web and Gen AI applications. Adept at managing cross-functional teams to successfully achieve project milestones. Proficient in utilizing a wide range of technologies, from Flask and Node.js for robust backend development to AI integration with OpenAI, Azure, and Vertex APIs. Adept at leveraging advanced database solutions and high-availability hosting services to deliver excellence.",
  avatarUrl: siteConfig.logo.src,
  skills: Object.values(SKILLS_DATA).flatMap((skills) =>
    skills.map((skill) => skill.name),
  ),
  navbar: siteConfig.mainNav.map((item) => ({
    href: item.url,
    icon: item.icon,
    label: item.title,
  })),
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/SollalF",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/sollal-fouilland-861a5a1b4/",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Solomon Learning Group",
      href: "https://solomonlearning.com",
      badges: [],
      location: "Hong Kong",
      title: "Full Stack Developer (Gen AI)",
      logoUrl: "/solomon_logo.png",
      start: "April 2024",
      end: "Present",
      description:
        "Created goodclass.ai, a full-stack AI education platform with Flask backend, HTML/Typescript frontend, and Cosmos DB. Led backend development on Azure and DigitalOcean using S3 Storage, CosmoDB, MongoDB, Redis, and Auth0. Localized in 20+ languages using PyBabel and DeepL. Designed AI chatbot with Langchain integrating OpenAI, Claude, Qwen, Gemini, DALL-E, and Flux APIs. Managed team of 7 using Jira and Monday.com with agile methodologies. Implemented CI/CD with GitHub Actions and ensured code quality with Pytest, pre-commit hooks, formatters, and linters. Conducted load testing with JMeter and implemented Telemetry for performance tracking.",
    },
  ],
  education: [
    {
      school: "The Hong Kong Polytechnic University",
      href: "https://www.polyu.edu.hk",
      degree: "Bachelor of Science in Computer Science",
      logoUrl: "/polyu_logo.ppm",
      start: "2019",
      end: "2024",
    },
  ],
  projects: [],
  hackathons: [],
  internships: [
    {
      company: "The Hong Kong Polytechnic University",
      href: "https://www.polyu.edu.hk",
      badges: [],
      location: "Hong Kong",
      title: "Web Developer",
      logoUrl: "/polyu.png",
      start: "November 2022",
      end: "December 2022",
      description:
        "Learned Sitecore and the specific assets created for the Hong Kong Polytechnic University. Implemented a web page for the Food Science and Nutrition department using the style guidelines provided.",
    },
    {
      company: "Radiance Tech Ltd",
      href: "https://radiancetech.hk",
      badges: [],
      location: "Hong Kong",
      title: "AR/VR Unity Developer",
      logoUrl: "/radiance.png",
      start: "2022",
      end: "2023",
      description:
        "In charge of VR Development for educational games. Coordinated communication between clients, developers, and external workers to bring projects to completion. Made content and design decisions to maximize customer satisfaction despite the unfamiliarity of the constraints of VR development to most clients.",
    },
  ],
  activities: [
    {
      organization: "PolyHack/GDSC Hong Kong",
      role: "Co-Organiser",
      start: "October 2021",
      end: "May 2023",
      description:
        "Executive Committee then Vice President of the PolyU Google Developers Club. Organized PolyHack, a global hackathon with 1000+ participants that aims to convene both tech and non-tech participants for a gathering of ideas. Managed a team of 20+ people over 2 years to organize 2 instances of the event. Developed partnerships with sponsors and mentors to provide participants with support and a HKD 500k total sponsorship fund for operations and prizes.",
    },
  ],
  languages: [
    {
      language: "French",
      proficiency: "Native speaker",
    },
    {
      language: "English",
      proficiency: "Native speaker",
    },
    {
      language: "Spanish",
      proficiency: "B2",
    },
  ],
} as const;
