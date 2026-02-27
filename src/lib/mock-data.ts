import { Company } from "./types";

export const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Synthara AI",
    website: "https://anthropic.com",
    stage: "Series A",
    sector: "AI/ML",
    location: "San Francisco, CA",
    founded: 2022,
    employees: "50-100",
    description: "Enterprise AI infrastructure for regulated industries like healthcare and finance.",
    tags: ["AI", "B2B", "Enterprise", "Healthcare"],
    fundingTotal: "$12M",
    lastActivity: "2024-01-15",
    signals: [
      { date: "2024-01-10", type: "hiring", text: "Posted 5 new ML engineer roles" },
      { date: "2024-01-05", type: "funding", text: "Raised $8M Series A led by Sequoia" },
      { date: "2023-12-20", type: "product", text: "Launched v2.0 of their compliance API" }
    ]
  },
  {
    id: "2",
    name: "LoopLogic",
    website: "https://vercel.com",
    stage: "Seed",
    sector: "Dev Tools",
    location: "New York, NY",
    founded: 2023,
    employees: "10-20",
    description: "AI-powered debugging and code review platform for engineering teams.",
    tags: ["DevTools", "AI", "B2B"],
    fundingTotal: "$3.5M",
    lastActivity: "2024-01-12",
    signals: [
      { date: "2024-01-12", type: "product", text: "Shipped GitHub Actions integration" },
      { date: "2024-01-01", type: "hiring", text: "Hiring senior backend engineers" }
    ]
  },
  {
    id: "3",
    name: "Meridian Health",
    website: "https://stripe.com",
    stage: "Series B",
    sector: "HealthTech",
    location: "Boston, MA",
    founded: 2020,
    employees: "100-200",
    description: "Remote patient monitoring platform connecting care teams with real-time vitals data.",
    tags: ["HealthTech", "IoT", "B2B", "SaaS"],
    fundingTotal: "$42M",
    lastActivity: "2024-01-08",
    signals: [
      { date: "2024-01-08", type: "press", text: "Featured in Forbes Health 2024" },
      { date: "2023-12-15", type: "partnership", text: "Partnered with Kaiser Permanente" },
      { date: "2023-11-20", type: "funding", text: "Closed $25M Series B" }
    ]
  },
  {
    id: "4",
    name: "CarbonPath",
    website: "https://notion.so",
    stage: "Seed",
    sector: "CleanTech",
    location: "Austin, TX",
    founded: 2022,
    employees: "10-20",
    description: "Carbon accounting and offset marketplace for mid-market enterprises.",
    tags: ["CleanTech", "ESG", "Marketplace", "B2B"],
    fundingTotal: "$2M",
    lastActivity: "2024-01-14",
    signals: [
      { date: "2024-01-14", type: "product", text: "Launched Scope 3 emissions tracking" },
      { date: "2023-12-01", type: "funding", text: "Pre-seed from Climate Capital" }
    ]
  },
  {
    id: "5",
    name: "FleetMind",
    website: "https://linear.app",
    stage: "Series A",
    sector: "Logistics",
    location: "Chicago, IL",
    founded: 2021,
    employees: "50-100",
    description: "AI dispatch and route optimization for last-mile delivery fleets.",
    tags: ["Logistics", "AI", "SaaS", "B2B"],
    fundingTotal: "$18M",
    lastActivity: "2024-01-11",
    signals: [
      { date: "2024-01-11", type: "hiring", text: "Expanding sales team, 8 open roles" },
      { date: "2023-12-10", type: "partnership", text: "Integration with Samsara fleet management" }
    ]
  },
  {
    id: "6",
    name: "Quorum Analytics",
    website: "https://figma.com",
    stage: "Series B",
    sector: "FinTech",
    location: "London, UK",
    founded: 2019,
    employees: "200-500",
    description: "Institutional-grade alternative data platform for hedge funds and asset managers.",
    tags: ["FinTech", "Data", "B2B", "Enterprise"],
    fundingTotal: "$67M",
    lastActivity: "2024-01-09",
    signals: [
      { date: "2024-01-09", type: "press", text: "Named to FT's top 50 fintech companies" },
      { date: "2023-11-30", type: "product", text: "Launched real-time satellite imagery feed" }
    ]
  },
  {
    id: "7",
    name: "Nursio",
    website: "https://airtable.com",
    stage: "Seed",
    sector: "HealthTech",
    location: "Seattle, WA",
    founded: 2023,
    employees: "1-10",
    description: "AI care coordinator that handles scheduling, referrals, and follow-ups for clinics.",
    tags: ["HealthTech", "AI", "Automation", "SMB"],
    fundingTotal: "$1.8M",
    lastActivity: "2024-01-13",
    signals: [
      { date: "2024-01-13", type: "product", text: "Launched EHR integration with Epic" },
      { date: "2024-01-02", type: "hiring", text: "Hiring first clinical success manager" }
    ]
  },
  {
    id: "8",
    name: "Stackform",
    website: "https://github.com",
    stage: "Pre-seed",
    sector: "Dev Tools",
    location: "Remote",
    founded: 2023,
    employees: "1-10",
    description: "Infrastructure-as-code generation tool that converts architecture diagrams to Terraform.",
    tags: ["DevTools", "Infrastructure", "AI", "Open Source"],
    fundingTotal: "$500K",
    lastActivity: "2024-01-16",
    signals: [
      { date: "2024-01-16", type: "product", text: "Hit 2,000 GitHub stars" },
      { date: "2024-01-10", type: "press", text: "Featured on Hacker News front page" }
    ]
  },
  {
    id: "9",
    name: "Argent Markets",
    website: "https://coinbase.com",
    stage: "Series A",
    sector: "FinTech",
    location: "Miami, FL",
    founded: 2021,
    employees: "50-100",
    description: "Crypto prime brokerage and custody solution for family offices and RIAs.",
    tags: ["FinTech", "Crypto", "B2B", "Enterprise"],
    fundingTotal: "$22M",
    lastActivity: "2024-01-07",
    signals: [
      { date: "2024-01-07", type: "hiring", text: "Hiring compliance and legal team" },
      { date: "2023-12-05", type: "funding", text: "Series A led by a16z crypto" }
    ]
  },
  {
    id: "10",
    name: "Vanta Robotics",
    website: "https://openai.com",
    stage: "Series B",
    sector: "Robotics",
    location: "Pittsburgh, PA",
    founded: 2020,
    employees: "100-200",
    description: "Autonomous inspection robots for industrial facilities and critical infrastructure.",
    tags: ["Robotics", "Industrial", "AI", "Hardware"],
    fundingTotal: "$55M",
    lastActivity: "2024-01-06",
    signals: [
      { date: "2024-01-06", type: "partnership", text: "Signed contract with Chevron" },
      { date: "2023-10-15", type: "funding", text: "Raised $35M Series B" }
    ]
  },
  {
    id: "11",
    name: "Bramble",
    website: "https://shopify.com",
    stage: "Seed",
    sector: "E-commerce",
    location: "Los Angeles, CA",
    founded: 2022,
    employees: "10-20",
    description: "Headless commerce platform with built-in AI merchandising and personalization.",
    tags: ["E-commerce", "AI", "SaaS", "B2B"],
    fundingTotal: "$4M",
    lastActivity: "2024-01-15",
    signals: [
      { date: "2024-01-15", type: "product", text: "Launched A/B testing module" },
      { date: "2023-12-20", type: "hiring", text: "Hiring 3 frontend engineers" }
    ]
  },
  {
    id: "12",
    name: "Celesta Education",
    website: "https://duolingo.com",
    stage: "Series A",
    sector: "EdTech",
    location: "Denver, CO",
    founded: 2021,
    employees: "50-100",
    description: "Adaptive learning platform for K-12 math using spaced repetition and AI tutoring.",
    tags: ["EdTech", "AI", "B2C", "K-12"],
    fundingTotal: "$15M",
    lastActivity: "2024-01-10",
    signals: [
      { date: "2024-01-10", type: "press", text: "Won EdTech Digest's 2024 Cool Tool Award" },
      { date: "2023-11-01", type: "partnership", text: "Partnered with 200+ school districts" }
    ]
  },
  {
    id: "13",
    name: "Skywire Networks",
    website: "https://cloudflare.com",
    stage: "Series B",
    sector: "Infrastructure",
    location: "Dallas, TX",
    founded: 2019,
    employees: "200-500",
    description: "Private 5G network-as-a-service for manufacturing and warehouse environments.",
    tags: ["Infrastructure", "5G", "IoT", "Enterprise"],
    fundingTotal: "$80M",
    lastActivity: "2024-01-04",
    signals: [
      { date: "2024-01-04", type: "partnership", text: "Named preferred partner of Amazon robotics" },
      { date: "2023-09-15", type: "funding", text: "Raised $50M Series B from Tiger Global" }
    ]
  },
  {
    id: "14",
    name: "Fable Legal",
    website: "https://notion.so",
    stage: "Seed",
    sector: "LegalTech",
    location: "Washington, DC",
    founded: 2023,
    employees: "1-10",
    description: "AI contract analysis and negotiation assistant for in-house legal teams.",
    tags: ["LegalTech", "AI", "B2B", "Enterprise"],
    fundingTotal: "$2.5M",
    lastActivity: "2024-01-16",
    signals: [
      { date: "2024-01-16", type: "hiring", text: "Hiring first ML engineer" },
      { date: "2024-01-03", type: "product", text: "Launched SOC 2 Type II certified platform" }
    ]
  },
  {
    id: "15",
    name: "Terrene Farms",
    website: "https://stripe.com",
    stage: "Series A",
    sector: "AgriTech",
    location: "Des Moines, IA",
    founded: 2021,
    employees: "50-100",
    description: "Precision agriculture platform using satellite data and soil sensors to optimize yield.",
    tags: ["AgriTech", "IoT", "AI", "SaaS"],
    fundingTotal: "$11M",
    lastActivity: "2024-01-09",
    signals: [
      { date: "2024-01-09", type: "product", text: "Launched predictive irrigation module" },
      { date: "2023-08-20", type: "funding", text: "Raised $8M Series A from Andreessen" }
    ]
  }
];

export const STAGES = ["All", "Pre-seed", "Seed", "Series A", "Series B"];
export const SECTORS = ["All", "AI/ML", "Dev Tools", "HealthTech", "CleanTech", "Logistics", "FinTech", "Robotics", "E-commerce", "EdTech", "Infrastructure", "LegalTech", "AgriTech"];