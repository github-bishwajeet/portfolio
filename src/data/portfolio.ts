export const featuredProjects: {
  title: string;
  description: string;
  tags: string[];
  stack: string[];
  gradient: string;
  accent: string;
  href?: string;
}[] = [
  {
    title: "Studio Jadu · AIDA",
    description:
      "AI enabled story, image, and video workflows for independent creators. Creative tooling wired to production systems.",
    tags: ["AI product", "Fullstack"],
    stack: ["Laravel", "Vue", "AI APIs"],
    gradient: "linear-gradient(145deg, #0f172a 0%, #1e1b4b 45%, #312e81 100%)",
    accent: "linear-gradient(135deg, #818cf8, #c084fc)",
  },
  {
    title: "Clunker Busters",
    description:
      "Multi sided vehicle inspection platform connecting customers, inspectors, and ops. Booking to payouts.",
    tags: ["Marketplace", "Field ops"],
    stack: ["Laravel", "APIs", "Redis"],
    gradient: "linear-gradient(145deg, #111827 0%, #064e3b 50%, #115e59 100%)",
    accent: "linear-gradient(135deg, #34d399, #2dd4bf)",
  },
  {
    title: "Chattle",
    description:
      "Open source Laravel chat widget with admin panel for customer support.",
    tags: ["Open source", "Realtime"],
    stack: ["Laravel", "Vue", "WebSockets"],
    gradient: "linear-gradient(145deg, #0c0a09 0%, #1c1917 40%, #44403c 100%)",
    accent: "linear-gradient(135deg, #fb923c, #f472b6)",
    href: "https://github.com/github-bishwajeet/chattle",
  },
];

export const projects = [
  {
    title: "Studio Jadu · AIDA",
    description:
      "AI enabled story, image, and video workflows for independent creators. Creative tooling wired to production systems.",
    tags: ["AI product", "Fullstack", "Current"],
    meta: "2025 to Present",
  },
  {
    title: "Clunker Busters",
    description:
      "Multi sided vehicle inspection platform connecting customers, inspectors, and ops. Booking to payouts.",
    tags: ["Marketplace", "Field ops", "APIs"],
    meta: "TheCodeWork",
  },
  {
    title: "Ridebase",
    description:
      "Two wheeler rental operations for customers, partners, and runners. Fleet, handovers, and payments.",
    tags: ["Rental ops", "Marketplace", "Laravel"],
    meta: "TheCodeWork",
  },
  {
    title: "MDware partnership",
    description:
      "Multi year commerce experiences, enterprise integrations, and tooling for a Lightspeed partner in Belgium.",
    tags: ["Integrations", "Commerce", "Long term"],
    meta: "Belgium · 6 yrs",
  },
  {
    title: "Doutedesk",
    description:
      "Led web product and REST APIs for a digital office platform. Integrations, deploy, and monitoring.",
    tags: ["SaaS", "APIs", "Project lead"],
    meta: "2020 to 2021",
  },
  {
    title: "Bright Edutech / Edustuffs",
    description:
      "Learning platforms for regional networks. Video delivery and school workflows at scale.",
    tags: ["EdTech", "Video", "Web + Android"],
    meta: "Education",
  },
  {
    title: "Horeka",
    description:
      "B2B quick commerce for perishable restaurant supply. Daily lists, standing reorders, delivery.",
    tags: ["B2B", "Supply chain", "Mobile"],
    meta: "Ongoing",
  },
  {
    title: "Ellacare",
    description:
      "Care operations product work spanning scheduling, provider workflows, and reliable backends.",
    tags: ["HealthTech", "Operations"],
    meta: "Product",
  },
  {
    title: "Simply Detail & Home Cleaning",
    description:
      "On demand home service experiences. Booking, scheduling, and partner ops.",
    tags: ["On demand", "Marketplace"],
    meta: "Services",
  },
  {
    title: "Chattle",
    description:
      "Open source Laravel chat widget with admin panel for customer support.",
    tags: ["Open source", "Laravel", "Realtime"],
    meta: "GitHub",
    href: "https://github.com/github-bishwajeet/chattle",
  },
];

export const experience = [
  {
    company: "Studio Jadu",
    role: "Senior Software Engineer",
    when: "Aug 2025 to Present · Bengaluru",
    body: "Shipping AI powered filmmaking and storytelling tools across story creation, image generation, video workflows, and the platforms that connect them.",
  },
  {
    company: "TheCodeWork",
    role: "Software Engineer (SDE III) · Project lead",
    when: "Jun 2021 to Jul 2025 · Bengaluru",
    body: "End to end product development for startups and enterprises. Architecture, fullstack delivery, sprint ownership, and multi project client coordination.",
  },
  {
    company: "Doutedesk",
    role: "Senior Software Engineer · Project lead",
    when: "Aug 2020 to May 2021 · Gurugram",
    body: "Owned web app and REST API development for mobile, third party integrations, testing, deployment, and production monitoring.",
  },
  {
    company: "Earlier roles",
    role: "Laravel / PHP engineering",
    when: "2019 to 2020",
    body: "Mentored freshers on Laravel, and built multi vendor event management, ERP, and e commerce courier systems.",
  },
];

export const strengths = [
  {
    title: "Distributed systems",
    description:
      "Service boundaries, retries, and consistency patterns so products stay reliable as load and teams grow.",
    accent: "violet",
  },
  {
    title: "Microservices",
    description:
      "Domain oriented services with clear APIs, auth, and observability instead of one fragile monolith.",
    accent: "blue",
  },
  {
    title: "Queuing systems",
    description:
      "Redis and async workers for media jobs, webhooks, notifications, and anything that must leave the request path.",
    accent: "cyan",
  },
  {
    title: "AI product engineering",
    description:
      "Creative AI workflows at Studio Jadu. Story, image, and video systems that stay reliable under real usage.",
    accent: "emerald",
  },
  {
    title: "Integrations",
    description:
      "Third party services, payments, and enterprise connectors wired through events and idempotent handlers.",
    accent: "orange",
  },
  {
    title: "End to end ownership",
    description:
      "Architecture, APIs, UI, and release. Features taken from idea to production without dropping the thread.",
    accent: "rose",
  },
  {
    title: "Team native delivery",
    description:
      "Slack, Jira, reviews, and demos. Fit product team rhythms and keep stakeholders clear.",
    accent: "pink",
  },
  {
    title: "Select collaborations",
    description:
      "Occasionally open to well scoped product partnerships when the problem and working style fit.",
    accent: "indigo",
  },
];

export const stack = {
  Languages: ["PHP", "JavaScript", "TypeScript", "Java", "SQL"],
  Systems: [
    "Microservices",
    "Distributed systems",
    "Event driven",
    "Job queues",
    "Redis",
    "Webhooks",
  ],
  Backend: ["Laravel", "Node.js", "Spring Boot", "REST APIs", "MySQL", "AWS"],
  Frontend: ["Vue.js", "React", "Tailwind CSS", "Next.js", "PWA"],
};
