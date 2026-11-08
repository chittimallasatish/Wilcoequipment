# Wilco Equipment Co. — Industrial Process Piping, Fabrication & Rigging

Official modern web application for **Wilco Equipment Co., Inc.** — high-purity process systems, sanitary orbital welding, custom modular CIP skids, and authorized OEM equipment distribution for the dairy, food, beverage, and pharmaceutical industries since 1987.

## Key Features

- **Interactive Process Flow Blueprint (`InteractiveProcessExplorer`)**:
  - Live animated SVG stainless steel piping schematic with flowing fluid gradient pulses.
  - Interactive clickable hotspots for Sanitary Pumps, Valve Matrixes, Orbital Welded Lines, Modular CIP Skids, and Instrumentation.
- **Online Project RFQ Specifier Modal (`QuoteModal`)**:
  - Interactive multi-parameter engineering RFQ specifier with automated tracking ID (`WILCO-RFQ-XXXXXX`).
- **Interactive Line Card & Brand Search**:
  - Real-time search across 50+ authorized OEM manufacturers (Alfa Laval, Fristam, SPX, Pentair, Bürkert, Spirax Sarco, Endress+Hauser).
  - Quick category filtering with instant match counts.
- **Project Timeline (1987 – Present)**:
  - Vertical scroll-triggered conduit progress line showcasing 35+ years of milestones from founding in Wills Point, TX to next-gen automated flow systems.
- **Technical FAQ & Engineering Knowledge Base**:
  - Direct answers to high-intent engineering questions, ASME Section IX codes, and 3-A Sanitary standards.
- **AI Assistant Chatbot (`gemini-2.5-flash`)**:
  - In-app technical support assistant with pre-configured quick suggestion prompts.
- **Search Engine & Generative Engine Optimization (GEO/AEO/LLMO)**:
  - Canonical metadata, OpenGraph cards, Twitter cards, and Schema.org `@graph` JSON-LD (`Corporation`, `LocalBusiness`, `OfferCatalog`, `FAQPage`).
  - `/public/llms.txt` AI Engine context manifest for Perplexity, ChatGPT Search, Gemini, and Claude.
  - `/public/robots.txt` and `/public/sitemap.xml`.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **AI SDK**: `@google/genai` (Gemini 2.5 Flash)

## Getting Started

### 1. Prerequisites
- Node.js 18+
- npm or pnpm or bun

### 2. Installation
```bash
git clone <your-repo-url>
cd wilco-equipment
npm install
```

### 3. Environment Configuration
Copy the example environment file and add your Gemini API key (optional for chatbot):
```bash
cp .env.example .env
# Edit .env and set GEMINI_API_KEY
```

### 4. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run preview
```

## License
Apache-2.0
