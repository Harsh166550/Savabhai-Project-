# S D DESIGN STUDIO — Official Website

A production-ready website and 3D architectural experience engineered for **S D DESIGN STUDIO**.

**Interior Design • Architecture • Turnkey Projects**  
*Tagline: "Designing Spaces. Defining Lifestyles."*

---

## 1. Overview & Architectural Direction

- **Brand**: S D DESIGN STUDIO
- **Palette**: Warm White (`#F8F7F4`), Light Gray (`#F1F1EF`), Architectural Stone Border (`#DDDDD8`), Muted Charcoal (`#777777`), Primary Text (`#151515`), Deep Black (`#0B0B0B`).
- **Typography**: Plus Jakarta Sans (Primary UI & Prose), Playfair Display (Editorial accents & quotes), Syne (Architectural display titles), JetBrains Mono (Data & metadata).
- **Core Capabilities**:
  1. **Interior Design**: Luxury residences, apartments, penthouses, villas, and commercial workspaces.
  2. **Architecture**: Planning, facade & elevation design, space planning, working drawings.
  3. **Turnkey Projects**: Single-point accountability from civil modifications to final white-glove handover.
  4. **Custom Furniture**: Tailored joinery and statement pieces designed to belong to the space.

---

## 2. Structure & Sections

1. **Floating Navigation Bar**: Minimalist card with S D DESIGN STUDIO wordmark, centered section links, and quick project booking CTA.
2. **Hero Section & 3D Architectural Scene**:
   - 3D interactive minimal contemporary interior with cantilevered sculptural steps, architectural column, stone floor, warm sun daylight, and material preset toggles (*Warm Stone*, *Travertine*, *Concrete*).
   - "Designing Spaces. Defining Lifestyles." headline with supporting statement and quick action triggers.
3. **Introduction**: *"Design That Feels Personal."*
4. **About Us**: Who We Are, Design Philosophy, Our Approach, Quality Craftsmanship, and End-to-End Service, culminating in the architectural creed:
   - *Every line has a purpose.*
   - *Every material has a story.*
   - *Every space has an identity.*
5. **Philosophy**: *"Less Noise. More Character."* with luxury balance principles.
6. **Why S D DESIGN STUDIO**: *"Where Design Meets Detail."* (6 Pillars: Personalized Design, Functional Luxury, Attention to Detail, Quality Craftsmanship, End-to-End Service, Timeless Aesthetics).
7. **Services**: Complete Design. Seamless Execution (4 expandable cards with deliverables and material specs).
8. **Sectors**:
   - Residential Design (*Your Home. Your Story.*) with dedicated spaces (Living, Bedrooms, Kitchens, Pooja Rooms, Home Offices, Entertainment).
   - Commercial Design (*Designed for Business. Created for Impact.*) with office, retail, showroom, and hospitality typologies.
   - Turnkey Projects (*One Team. One Responsibility. One Seamless Experience.*).
9. **Projects**: *"Spaces We Have Shaped."* with categories (All, Residential, Commercial, Turnkey).
10. **Case Study Detail Pages**: Complete architectural case studies including Concept, Space Planning, Materials, Furniture, Lighting, Execution, Final Result, and Plate Inspection Lightbox.
11. **Design Process**: *"From First Idea to Final Detail."* with a 6-stage vertical timeline (Discover, Concept, Visualize, Develop, Execute, Deliver).
12. **FAQ Accordion**: 6 comprehensive client questions answered.
13. **Instagram Curated Section**: Follow our work with plate studies.
14. **Contact & Project Enquiry Engine**: Validated booking form with project types, budget ranges, timeline selectors, location, and copyable studio contact information.
15. **Footer & Legal**: Full copyright, legal dialogs (Privacy Policy, Terms & Conditions), and 404 handler.

---

## 3. Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundling**: Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + Architectural CSS Variables
- **3D Graphics**: Three.js (Procedural geometries, PBR MeshStandardMaterials, PCFSoftShadowMap, ACESFilmicToneMapping)
- **Icons**: Lucide React

---

## 4. How to Update Data

All content is cleanly organized in `src/data/`:
- `siteConfig.ts`: Contact details, addresses, phone numbers, social handles, and company statements.
- `services.ts`: The 4 core service pillars, deliverables, and materials.
- `projects.ts`: Built commissions, case study narratives, and gallery items.
- `faq.ts`: Common client questions and responses.

---

## 5. Development & Deployment

```bash
# Install dependencies
npm install

# Run dev server (Port 3000)
npm run dev

# Build for production
npm run build
```

---

© 2026 S D DESIGN STUDIO. All Rights Reserved.
