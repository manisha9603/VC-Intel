import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY !});

export async function POST(req: NextRequest) {
  const { url, companyName } = await req.json();

  if (!url || !companyName) {
    return NextResponse.json({ error: "Missing url or companyName" }, { status: 400 });
  }

  try {
    // Fetch the website
    const webRes = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; research-agent/1.0; +https://vcintel.app)",
        "Accept": "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(10000),
    });

    const html = await webRes.text();
    // Strip HTML, collapse whitespace, limit size
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 6000);

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `You are a VC analyst. Analyze this content scraped from ${companyName}'s website (${url}).

Extract and return ONLY a JSON object with these exact fields:
{
  "summary": "1-2 sentence description of what the company does",
  "whatTheyDo": ["bullet 1", "bullet 2", "bullet 3", "bullet 4"],
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "signals": [
    {"type": "signal type", "text": "description of the signal"}
  ]
}

For signals, infer things like: active hiring, recent product launch, changelog present, blog activity, pricing page exists, open source presence, etc.

Website content:
${text}

Return ONLY the JSON, no other text.`
      }]
    });

    const content = response.content[0].type === "text" ? response.content[0].text : "{}";
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const extracted = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    return NextResponse.json({
      ...extracted,
      sourceUrl: url,
      scrapedAt: new Date().toISOString(),
    });

  } catch (err: any) {
    console.error("Enrich error:", err);
    return NextResponse.json(
      { error: "Enrichment failed", detail: err.message },
      { status: 500 }
    );
  }
}
