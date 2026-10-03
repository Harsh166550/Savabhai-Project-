export interface ContactDetails {
  email: string;
  phone: string;
  phoneClean: string;
  address: string;
  studio: string;
  city: string;
  state: string;
  country: string;
  whatsappUrl: string;
  mapsUrl: string;
  availability: string;
}

export const contactDetails: ContactDetails = {
  email: 'sddesignstudio14@gmail.com',
  phone: '+91 906 787 6791',
  phoneClean: '+919067876791',
  address: '402, City Square Complex, Astron Chowk, Near Vikas Pharmacy, Rajkot',
  studio: '402, City Square Complex, Astron Chowk, Near Vikas Pharmacy, Rajkot',
  city: 'Rajkot',
  state: 'Gujarat',
  country: 'India',
  whatsappUrl: 'https://wa.me/919067876791?text=Hello%20SD%20Design%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20project.',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=City+Square+Complex+Astron+Chowk+Near+Vikas+Pharmacy+Rajkot',
  availability: 'Accepting select new commissions for 2026'
};

export const { email, phone, address } = contactDetails;

export const siteConfig = {
  name: 'SD DESIGN STUDIO',
  shortName: 'SD',
  tagline: 'Designing Digital Experiences That Stand Apart.',
  subtext: 'SD Design Studio creates thoughtful digital experiences, visual identities, architectural spaces, and interactive 3D products for ambitious brands.',
  disciplines: 'Digital Products • Brand Identity • Architectural Spaces • 3D Design',
  about: {
    heading: 'We believe good design should be felt before it is understood.',
    p1: 'At SD Design Studio, we operate at the intersection of architecture, digital craft, and 3D design. We design systems and spaces that communicate with clarity, move with intention, and remain memorable long after the interaction.',
    p2: 'By stripping away unnecessary visual noise and focusing on proportion, typography, tactile materials, and functional beauty, we build identities and digital products that endure.',
    principles: [
      {
        title: 'Tactile Architecture',
        desc: 'Proportions, lighting, and materiality calibrated for real emotional impact.'
      },
      {
        title: '3D & Spatial Depth',
        desc: 'Interactive spatial dimensions that elevate products from flat screens into tactile worlds.'
      },
      {
        title: 'Restraint & Clarity',
        desc: 'Material discipline where warm rust tones, light gray spatial envelopes, and mustard accents serve a distinct purpose.'
      }
    ]
  },
  contact: contactDetails,
  social: [
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'Behance', url: 'https://behance.net' },
    { name: 'X / Twitter', url: 'https://twitter.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' }
  ],
  navLinks: [
    { label: 'Work', href: 'work' },
    { label: 'Services', href: 'services' },
    { label: 'About', href: 'about' },
    { label: 'Process', href: 'process' },
    { label: 'Contact', href: 'contact' }
  ]
};
