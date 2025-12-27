<div align="center">

# Tech Flunky Labs

### AI-Powered Development Studio

[![Live Site](https://img.shields.io/badge/Live-techflunkylabs.com-e0ff00?style=for-the-badge&labelColor=000000)](https://techflunkylabs.com)
[![Cloudflare Pages](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)

**We Build Edge-First Software That Scales**

*From AI-powered platforms to production infrastructure. Complete solutions—code, servers, and everything in between.*

---

[View Site](https://techflunkylabs.com) | [Contact Us](mailto:hello@techflunkylabs.com) | [GitHub](https://github.com/cozyartz)

</div>

---

## What We Build

| Service | Description |
|---------|-------------|
| **Edge-First Applications** | Cloudflare Workers, Pages, D1, R2—sub-100ms global response times |
| **AI Integration** | Claude, GPT-4, Cloudflare AI, custom LLM pipelines and RAG systems |
| **E-Commerce Platforms** | Medusa.js headless commerce with Stripe Connect and multi-vendor support |
| **Server Infrastructure** | Docker, PostgreSQL, Redis on managed VMs with automated backups |
| **MCP & Agent Development** | Custom MCP servers and AI agents that extend LLM capabilities |
| **Full-Stack Web Apps** | React, Next.js, Astro with TypeScript and real-time features |

---

## Tech Stack

<div align="center">

| Frontend | Edge & Serverless | Infrastructure | AI & Automation |
|----------|-------------------|----------------|-----------------|
| Astro | Cloudflare Workers | Ubuntu Server | Claude Code |
| React | Cloudflare Pages | Docker | Claude API |
| Next.js | Cloudflare D1 | PostgreSQL | Cloudflare AI |
| TypeScript | Cloudflare R2 | Redis | OpenAI |
| Tailwind CSS | Cloudflare KV | Nginx | GitHub Actions |
| Framer Motion | Hyperdrive | Cloudflare Tunnels | Cron Jobs |

</div>

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                           EDGE                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   Workers    │  │    Pages     │  │      D1      │           │
│  │  (Edge API)  │  │   (Static)   │  │  (Edge SQL)  │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                    Hyperdrive & Tunnels
                              │
┌─────────────────────────────┴───────────────────────────────────┐
│                          ORIGIN                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │  PostgreSQL  │  │    Redis     │  │    Docker    │           │
│  │  (Primary)   │  │   (Cache)    │  │ (Containers) │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

**Hybrid Edge + Origin Architecture** — Cloudflare for global edge computing, CDN, and security. Dedicated VMs for persistent workloads like PostgreSQL and Docker containers.

---

## This Website

Built with modern web technologies and deployed to the edge:

- **Framework**: [Astro](https://astro.build) with React islands
- **3D Graphics**: React Three Fiber + Three.js
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Hosting**: Cloudflare Pages
- **Domain**: [techflunkylabs.com](https://techflunkylabs.com)

### Features

- Interactive 3D logo with mouse tracking
- Touch/hover interactive cube grid
- Flip cards for services showcase
- Fully responsive design
- Dark theme with electric yellow (#e0ff00) accents

---

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Cloudflare Pages
npm run deploy
```

---

## Project Structure

```
tflabs/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Hero.tsx           # Hero section with 3D logo
│   │   ├── Logo3D.tsx         # Interactive 3D TF letterforms
│   │   ├── Services.tsx       # Flip card services grid
│   │   ├── Projects.tsx       # Featured projects showcase
│   │   ├── WhyCloudflare.tsx  # Cloudflare benefits section
│   │   ├── HowWeWork.tsx      # AI-augmented development
│   │   ├── TechStack.tsx      # Technology categories
│   │   ├── InteractiveDivider.tsx  # Cube grid divider
│   │   ├── HeroCubes.tsx      # 3D interactive cubes
│   │   ├── Contact.tsx        # Contact cards & CTA
│   │   ├── Header.tsx         # Navigation header
│   │   └── Footer.tsx         # Site footer
│   ├── pages/
│   │   └── index.astro  # Main page
│   └── styles/
│       └── global.css   # Global styles & animations
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind configuration
└── wrangler.toml        # Cloudflare deployment config
```

---

## How We Work

**Human + AI Partnership**

We use Claude Code as our AI development partner—not as a replacement for expertise, but as a force multiplier. This means:

- Complex projects delivered in days, not weeks
- Senior-level quality at startup-friendly costs
- Every line reviewed by a human who understands your goals
- Direct communication—no account managers or ticket systems

---

## Contact

Ready to build something amazing?

- **Email**: [hello@techflunkylabs.com](mailto:hello@techflunkylabs.com)
- **GitHub**: [@cozyartz](https://github.com/cozyartz)
- **Website**: [techflunkylabs.com](https://techflunkylabs.com)

---

<div align="center">

**Built with Tech Flunky Labs**

*AI-Augmented Development | Edge-First Architecture | Production Infrastructure*

</div>
