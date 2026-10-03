import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'brand-identity',
    number: '01',
    title: 'Brand Identity',
    tagline: 'Distinctive visual systems that give brands a clear and memorable presence.',
    description: 'We develop cohesive brand worlds spanning typography, spatial guidelines, iconography, motion principles, and comprehensive design systems built to scale across physical and digital mediums.',
    deliverables: [
      'Comprehensive Visual Identity & Logo Systems',
      'Editorial Typography & Color Geometry',
      'Brand Guidelines & Asset Libraries',
      'Art Direction & Photography Standards'
    ],
    techStack: ['Figma', 'Illustrator', 'Motion Principles', 'Design Tokens']
  },
  {
    id: 'ui-ux-design',
    number: '02',
    title: 'UI/UX Design',
    tagline: 'Refined digital interfaces engineered for clarity and effortless flow.',
    description: 'From complex enterprise software to bespoke digital flagships, we craft interfaces that eliminate friction, balance aesthetic distinction with functional intuition, and reward user engagement.',
    deliverables: [
      'Interactive Prototypes & Micro-interactions',
      'Design Systems & Reusable Component Architectures',
      'User Journey & Information Architecture',
      'Multi-device Responsive Frameworks'
    ],
    techStack: ['Figma', 'Protopie', 'Linear', 'Design Systems']
  },
  {
    id: 'web-engineering',
    number: '03',
    title: 'Web Design & Engineering',
    tagline: 'Fast, responsive, modern digital platforms built with precision.',
    description: 'We build production web experiences with fluid motion, instant response times, accessible markup, and uncompromising typographic hierarchy that set brands apart.',
    deliverables: [
      'Full-Stack Web Applications & Marketing Sites',
      'Fluid Page Transitions & Scroll Mechanics',
      'Headless CMS & API Integration',
      'SEO Architecture & Core Web Vitals Optimization'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Motion']
  },
  {
    id: 'three-d-spatial',
    number: '04',
    title: '3D & Spatial Experiences',
    tagline: 'Tactile interactive spatial elements that push browser boundaries.',
    description: 'We integrate real-time 3D geometry, custom materials, interactive lighting, and physics into digital spaces to produce immersion that traditional 2D web cannot match.',
    deliverables: [
      'Real-Time WebGL & Three.js Interactive Canvases',
      'Procedural 3D Geometry & Material Shaders',
      'Architectural Digital Twin Walkthroughs',
      'Interactive 3D Product Viewers & Configurator Docks'
    ],
    techStack: ['Three.js', 'GLSL', 'WebGL', 'Blender', 'WebXR']
  },
  {
    id: 'architecture-spatial',
    number: '05',
    title: 'Spatial & Architectural Design',
    tagline: 'Harmonious physical and digital environments designed with purpose.',
    description: 'We orchestrate proportions, material tactility, light, and architectural massing to create physical interior sanctuaries and high-end residential & commercial spaces.',
    deliverables: [
      'Spatial Zoning & Architectural Layouts',
      'Photorealistic 3D Spatial Visualizations',
      'Material Schedules & Custom Joinery Design',
      'Atmospheric Lighting & Acoustic Studies'
    ],
    techStack: ['CAD', 'Rhino', 'V-Ray', '3D Studio']
  },
  {
    id: 'creative-strategy',
    number: '06',
    title: 'Creative Direction & Strategy',
    tagline: 'Clear positioning and artistic direction for forward-thinking brands.',
    description: 'We clarify the fundamental narrative of your company, aligning market positioning with unmistakable aesthetic execution that commands respect in crowded markets.',
    deliverables: [
      'Market Positioning & Creative Roadmaps',
      'Tone of Voice & Narrative Architecture',
      'Campaign Art Direction & Launch Strategy',
      'Design Audit & Strategic Evolution'
    ],
    techStack: ['Creative Direction', 'Storytelling', 'Strategy']
  }
];
