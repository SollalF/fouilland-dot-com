import { Icons } from "@/components/icons";
import { siteConfig } from "@/data/site";

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
  skills: [
    "Python",
    "Generative AI",
    "Flask",
    "Next.js",
    "Jinja2",
    "Tailwind",
    "MongoDB",
    "Cosmos DB",
    "Redis",
    "Azure",
    "DigitalOcean",
    "Langchain",
    "OpenAI",
    "Claude",
    "Qwen",
    "Gemini",
    "Next.js",
    "Typescript",
    "Docker",
    "Vite",
  ],
  navbar: siteConfig.mainNav.map((item) => ({
    href: item.url,
    icon: item.icon,
    label: item.title,
  })),
  contact: {
    tel: "+85270742069",
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
