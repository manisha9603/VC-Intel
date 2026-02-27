export interface Company {
  id: string;
  name: string;
  website: string;
  stage: string;
  sector: string;
  location: string;
  founded: number;
  employees: string;
  description: string;
  tags: string[];
  fundingTotal: string;
  lastActivity: string;
  signals: Signal[];
}

export interface Signal {
  date: string;
  type: "hiring" | "funding" | "product" | "press" | "partnership";
  text: string;
}

export interface EnrichmentData {
  summary: string;
  whatTheyDo: string[];
  keywords: string[];
  signals: { type: string; text: string }[];
  sourceUrl: string;
  scrapedAt: string;
}

export interface SavedList {
  id: string;
  name: string;
  companyIds: string[];
  createdAt: string;
}

export interface SavedSearch {
  id: string;
  name: string;
  query: string;
  stage: string;
  sector: string;
  savedAt: string;
}