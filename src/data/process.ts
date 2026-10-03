import { ProcessStep } from '../types';

export const processData: ProcessStep[] = [
  {
    step: '01',
    name: 'Discover',
    duration: 'Week 1 – 2',
    description: 'We immerse ourselves in your business objectives, target audience demographics, competitors, and functional requirements to establish a solid foundation.',
    deliverables: ['Stakeholder Discovery Workshop', 'Brand & Market Audit', 'Technical & Creative Scope']
  },
  {
    step: '02',
    name: 'Strategy',
    duration: 'Week 2 – 3',
    description: 'We formulate the strategic architecture, positioning narrative, visual design direction, and interactive roadmap before touching code or layout.',
    deliverables: ['Creative Direction Deck', 'Information Architecture', 'Spatial & Technical Blueprint']
  },
  {
    step: '03',
    name: 'Concept',
    duration: 'Week 3 – 5',
    description: 'We explore rapid high-fidelity visual and 3D directions, establishing the typographic scale, palette restraint, and core spatial metaphors.',
    deliverables: ['Design Directions & Moodboards', 'Interactive 3D Prototypes', 'Material & Spatial Studies']
  },
  {
    step: '04',
    name: 'Design',
    duration: 'Week 5 – 8',
    description: 'We craft every screen, state, and architectural detail. Complete responsive design systems are built with relentless focus on polish and micro-interactions.',
    deliverables: ['Full Component Library & System', 'Responsive Screen Layouts', 'Motion & Transition Specifications']
  },
  {
    step: '05',
    name: 'Development',
    duration: 'Week 8 – 11',
    description: 'We engineer the experience using modern frameworks, WebGL/Three.js shaders, clean semantic architecture, and responsive performance optimization.',
    deliverables: ['Production TypeScript Codebase', 'Smooth 60fps 3D Graphics Pipeline', 'Cross-browser Accessibility Audits']
  },
  {
    step: '06',
    name: 'Launch',
    duration: 'Week 12',
    description: 'Rigorous QA testing, performance profiling, SEO structuring, and deployment to guarantee flawless execution upon public reveal.',
    deliverables: ['Production Deployment', 'Complete Asset Package', 'Ongoing Evolution Support']
  }
];
