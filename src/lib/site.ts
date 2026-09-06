export const profile = {
  name: 'Nirvair Singh',
  role: 'Senior Product / UX Designer',
  email: 'nirvair.cheema@gmail.com',
  phone: '+91 9675645504',
  // Self-hosted rather than a Drive link: opens as the PDF itself, works on
  // networks that block Drive, and the filename is what lands in the
  // recruiter's Downloads folder.
  cvUrl: '/nirvair-singh-cv.pdf',
  linkedinUrl: 'https://www.linkedin.com/in/nirvair-cheema-61121458',
  location: 'Gurugram, India',
}

export const navLinks = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
]

export const heroCopy = {
  eyebrow: 'Senior Product / UX Designer',
  headline: 'Turning complex systems into simple, scalable digital products.',
  supporting:
    'Senior Product / UX Designer working across complex B2B products, design systems, conversion experiences and AI-assisted design workflows.',
}

export const selectedWorkCopy = {
  heading: 'Products, systems and experiences I’ve shaped.',
  supporting: 'A selection of product, systems and growth work across complex digital experiences.',
}

export const toolsSectionCopy = {
  eyebrow: 'Tools I Work With',
  heading: 'The stack behind the work.',
  supporting: 'Design, prototyping and implementation tools I work in day to day.',
}

export const tools = [
  'Figma',
  'Figma Make',
  'Framer',
  'Claude Code',
  'Figma MCP',
  'GitHub',
  'HTML',
  'CSS',
  'Bootstrap 5',
  'JavaScript',
]

export const about = {
  eyebrow: 'About',
  headline: 'I work on products where complexity has accumulated.',
  bio: [
    'My role is usually to bring structure back into the experience — untangling the flows, hierarchy and patterns that grew unevenly as a product scaled.',
    'That means spending as much time on information architecture, edge cases and conversion behaviour as on the interface itself, and staying close enough to implementation that a design decision survives the handoff.',
  ],
  stats: [
    { value: '12+ years', label: 'in design' },
    { value: '7.5+ years', label: 'focused on UI/UX & digital product design' },
  ],
  timeline: [
    { period: '2014–2018', detail: 'Publishing, graphic design and production QA.' },
    { period: '2019', detail: 'Responsive web and UI/UX design across multiple industries.' },
    {
      period: '2019–Present',
      detail: 'B2B product UX, design systems, CRO and AI-assisted design workflows.',
    },
  ],
  recognition: ['Star Performer', 'Ken Celestial Outstanding Performance', 'Go the Extra Mile'],
}

export const capabilities = [
  'Product Design',
  'UX Strategy',
  'Design Systems',
  'UX Research',
  'CRO',
  'Responsive Design',
  'Interaction Design',
  'Prototyping',
  'Accessibility',
  'Design QA',
]

export const howIWorkIntro = {
  eyebrow: 'How I Work',
  title: 'Systems thinking, not a process diagram.',
  supporting:
    'Product design begins by understanding the system around the interface — the users, the business, and the technical and organisational constraints already in place — before a single screen gets drawn.',
}

export const howIWork = [
  {
    step: '01',
    title: 'Understand',
    detail: 'Business goals, user needs, requirements and constraints.',
  },
  {
    step: '02',
    title: 'Research & Frame',
    detail: 'Research, competitor analysis, insights and problem definition.',
  },
  {
    step: '03',
    title: 'Structure',
    detail: 'User flows, IA, hierarchy and wireframes.',
  },
  {
    step: '04',
    title: 'Design for Clarity & Scale',
    detail: 'High-fidelity UI, responsive behaviour and system thinking.',
  },
  {
    step: '05',
    title: 'Prototype & Validate',
    detail: 'Interaction, feedback and usability considerations.',
  },
  {
    step: '06',
    title: 'Ship, Review & Improve',
    detail: 'Developer collaboration, QA, implementation review and iteration.',
  },
]

export const aiWorkflow = {
  eyebrow: 'AI Assistant Workflow',
  heading: 'From design to production',
  supporting:
    'A connected workflow for moving design decisions into tested, production-ready interfaces.',
  aura: {
    name: 'Project Aura',
    label: 'Connected design-to-build workflow',
    // Aura is a Claude Code configuration/orchestration system, not a
    // Figma -> MCP -> Claude Code pipeline. Order is meaningful.
    stages: [
      { name: 'CLAUDE.md', detail: 'Identity, rules and routing', icon: 'file' },
      { name: 'Task Routing', detail: 'Classifies and selects the workflow', icon: 'route' },
      {
        name: 'Workflows + Skills + Memory',
        detail: 'Playbooks and persistent project context',
        icon: 'workflow',
      },
      { name: 'Agents', detail: 'aura-mech · aura-builder · aura-qa', icon: 'agents' },
      { name: 'Design System / Build', detail: 'Aligned to the design system', icon: 'system' },
      { name: 'Figma Update', detail: 'Design updated back in Figma', icon: 'figma' },
      { name: 'Controlled Output', detail: 'Approved, production-ready result', icon: 'output' },
    ],
    note: 'Once the workflow is configured and executed, outputs can be refined through the design system, updated in Figma, and prepared as controlled production-ready output.',
  },
  loop: {
    name: 'Loop Engineering',
    label: 'Agent-assisted visual QA',
    agents: [
      {
        name: 'Loop Analyzer',
        detail: 'Understands the reference and identifies what needs to match',
        icon: 'analyze',
      },
      { name: 'Loop Builder', detail: 'Builds or updates the interface', icon: 'build' },
      { name: 'Loop Visual QA', detail: 'Renders and compares the output', icon: 'qa' },
    ],
    cycle: ['Reference', 'Spec', 'Build', 'Render', 'Compare', 'Fix', 'Repeat'],
    /** Index the dashed return connector points back to. */
    returnToIndex: 2,
    microCopy: 'Iterate for higher quality',
  },
}

export const impactCopy = {
  eyebrow: 'Design Impact, Beyond the Interface',
  heading: 'What changed beyond the final screen.',
  supporting:
    'How the work improved scale, consistency, performance and delivery — not just the interface.',
}

export const impact = [
  {
    label: 'Scale',
    detail: 'Moved manual workflows toward more scalable systems.',
    from: 'Manual',
    to: 'Scalable',
    icon: 'scale',
  },
  {
    label: 'Consistency',
    detail: 'Created shared patterns across a growing product ecosystem.',
    from: 'Fragmented',
    to: 'Shared',
    icon: 'consistency',
  },
  {
    label: 'Performance',
    detail: 'Reduced friction across important user journeys.',
    from: 'Friction',
    to: 'Clearer',
    icon: 'performance',
  },
  {
    label: 'Delivery',
    detail: 'Brought design and implementation closer together.',
    from: 'Handoff',
    to: 'Connected',
    icon: 'delivery',
  },
]

export const footerCopy = {
  eyebrow: 'Start a conversation',
  headline: 'Have a complex product problem?',
  subhead: "Let's make it simpler.",
}

export const contactCopy = {
  heading: 'Start a conversation',
  supporting: "Tell me what you're working on — I read every message myself.",
  success: "Thanks — that's sent. I'll reply from " + profile.email + '.',
  error: "That didn't send. Please try again, or email me directly at " + profile.email + '.',
}
