export const SITE = {
  name: 'John Patrick Agustin',
  description:
    'Senior engineer and tech lead (Go, React, TypeScript). I build production systems and grow the teams that run them.',
  availability: 'Currently available for part-time, contract, and full-time work.',
  timezone: 'GMT+8, in step with most of Asia-Pacific and flexible with hours for teams in Europe and the US.',
  email: 'agustin.johnpatrick@gmail.com',
  linkedin: 'https://www.linkedin.com/in/agustinjohnpatrick',
  github: 'https://github.com/jp-agustin',
};

export const WAYS = [
  { title: 'Hands-on tech lead', text: 'Lead a team or project while writing code: architecture, delivery, team process, mentoring, and working with product.' },
  { title: 'Senior engineering', text: 'Join your team as a senior engineer: Go, Node.js, React, TypeScript; event-driven systems; frontend architecture.' },
  { title: 'AI and platform work', text: 'AI-assisted development setup for teams, and cost and performance optimization for production systems.' },
];

// Dates are YYYY-MM. Roles are newest first. `earlier` entries render as compact one-line rows; `work` links case studies.
export const HISTORY = [
  {
    company: 'Ailytics',
    about: 'AI video safety monitoring',
    location: 'Singapore',
    mode: 'Remote',
    roles: [{ title: 'Lead Frontend Engineer', start: '2026-01', end: '2026-06' }],
  },
  {
    company: 'Freelance',
    mode: 'Remote, part-time',
    work: [{ slug: 'on-prem-vision-ai', label: 'Drone inspection AI, cloud to on-prem' }],
    roles: [{ title: 'Software Engineer & Tech Consultant', start: '2025-08', end: '2025-12' }],
  },
  {
    company: 'Ninja Van',
    about: 'logistics across Southeast Asia',
    location: 'Singapore',
    mode: 'Onsite',
    work: [
      { slug: 'notification-costs', label: 'Notification costs' },
      { slug: 'founding-engineer-to-em', label: 'Founding engineer to EM' },
      { slug: 'chat-notifications-rearchitecture', label: 'Notification throughput' },
    ],
    roles: [
      { title: 'Engineering Manager / Tech Lead', team: 'Platforms and Shared Services', start: '2023-01', end: '2025-10' },
      { title: 'Senior Software Engineer', team: 'Tooling and Automation', start: '2021-07', end: '2022-12' },
      { title: 'Software Engineer', team: 'Tooling and Automation', start: '2020-12', end: '2021-06' },
    ],
  },
  {
    company: 'Avetics',
    location: 'Singapore',
    mode: 'Onsite',
    earlier: true,
    roles: [{ title: 'Drone Platform Lead Developer', start: '2019-07', end: '2020-11' }],
  },
  {
    company: 'Ethical Prospecting',
    location: 'Melbourne',
    mode: 'Onsite',
    earlier: true,
    roles: [{ title: 'Full-Stack Software Developer', start: '2018-09', end: '2019-06' }],
  },
  {
    company: 'Nokia',
    location: 'Quezon City, Philippines',
    mode: 'Onsite',
    earlier: true,
    roles: [{ title: '5G R&D Engineer', start: '2017-07', end: '2018-03' }],
  },
];
