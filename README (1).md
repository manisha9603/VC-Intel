# VCIntel — VC Intelligence Interface

A modern venture capital sourcing and discovery platform inspired by Harmonic.ai. Built as a take-home assignment demonstrating a full-stack AI-powered enrichment workflow.

## Live Demo
🔗 **Deployed App:** [https://vc-intel.vercel.app](https://vc-intel.vercel.app)

📦 **GitHub Repo:** [https://github.com/manisha9603/VC-Intel](https://github.com/manisha9603/VC-Intel)

---

## Features

### Core Workflows
- **Company Discovery** — Search, filter by stage/sector, sort columns, paginate results
- **Company Profiles** — Overview, signals timeline, private notes, save to list
- **Lists** — Create named lists, add/remove companies, export as CSV or JSON
- **Saved Searches** — Save and re-run searches with filters, persisted in localStorage
- **Live AI Enrichment** — Click "Enrich" on any profile to fetch and analyze real public website content via Claude AI

### Live Enrichment (server-side)
On any company profile, clicking **✨ Enrich** will:
1. Fetch the company's public website server-side
2. Extract and clean the page content
3. Send it to Claude (claude-sonnet-4-20250514) for analysis
4. Display: summary, what they do, keywords, derived signals, and source URL with timestamp
5. Cache the result in localStorage for instant re-access

### Power User Features
- Press `/` anywhere to focus global search
- Bulk select companies from the table → add to list in one click
- Keyboard-friendly navigation
- Loading skeletons during enrichment
- Export lists as CSV or JSON

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS + shadcn/ui
- **AI:** Anthropic Claude API (`claude-sonnet-4-20250514`)
- **Persistence:** localStorage (lists, saved searches, notes, enrichment cache)
- **Deployment:** Vercel

---

## Setup & Local Development

### 1. Clone the repo
```bash
git clone https://github.com/manisha9603/VC-Intel.git
cd VC-Intel
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the project root:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Get your API key at: https://console.anthropic.com/settings/keys

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Anthropic API key for live enrichment | Yes |

> ⚠️ The API key is only used server-side in `/src/app/api/enrich/route.ts` and is never exposed to the browser.

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── enrich/
│   │       └── route.ts        # Server-side enrichment endpoint
│   ├── companies/
│   │   ├── page.tsx            # Company search + filter + table
│   │   └── [id]/
│   │       └── page.tsx        # Company profile + enrichment
│   ├── lists/
│   │   └── page.tsx            # List management + export
│   ├── saved/
│   │   └── page.tsx            # Saved searches
│   ├── layout.tsx              # Sidebar + global search
│   └── page.tsx                # Redirects to /companies
├── components/
│   └── ui/                     # shadcn/ui components
└── lib/
    ├── mock-data.ts             # 15 seed companies
    ├── types.ts                 # TypeScript interfaces
    └── useLocalStorage.ts      # localStorage hook
```

---

## Enrichment Architecture

```
Browser → POST /api/enrich (server-side)
              ↓
         Fetch public website HTML
              ↓
         Strip tags, clean text
              ↓
         Claude API (summary + fields)
              ↓
         Return JSON to browser
              ↓
         Cache in localStorage
```

The API key never leaves the server. All enrichment happens in the Next.js API route.

---

## Deployment

Deployed on Vercel. To deploy your own instance:

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Add `ANTHROPIC_API_KEY` in Environment Variables
4. Deploy
