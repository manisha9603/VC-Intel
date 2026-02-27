"use client";
import { useState, useEffect,use } from "react";
import { mockCompanies } from "@/lib/mock-data";
import { EnrichmentData } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles, BookmarkPlus, ExternalLink, Clock, Tag, Zap, Globe } from "lucide-react";

const SIGNAL_COLORS: Record<string, string> = {
  hiring: "bg-green-100 text-green-700 border-green-200",
  funding: "bg-blue-100 text-blue-700 border-blue-200",
  product: "bg-purple-100 text-purple-700 border-purple-200",
  press: "bg-yellow-100 text-yellow-700 border-yellow-200",
  partnership: "bg-orange-100 text-orange-700 border-orange-200",
};
export default function CompanyProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const company = mockCompanies.find(c => c.id === id);

  if (!company) notFound();

  const [activeTab, setActiveTab] = useState<"overview" | "signals" | "notes">("overview");
  const [notes, setNotes] = useState("");
  const [enrichData, setEnrichData] = useState<EnrichmentData | null>(null);
  const [enrichLoading, setEnrichLoading] = useState(false);
  const [enrichError, setEnrichError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem(`enrich_${company.id}`);
    if (cached) setEnrichData(JSON.parse(cached));
    const savedNotes = localStorage.getItem(`notes_${company.id}`);
    if (savedNotes) setNotes(savedNotes);
    const lists = JSON.parse(localStorage.getItem("vc_lists") || "[]");
    setSaved(lists.some((l: any) => l.companyIds?.includes(company.id)));
  }, [company.id]);

  const handleEnrich = async () => {
    setEnrichLoading(true);
    setEnrichError("");
    try {
      const res = await fetch("/api/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: company.website, companyName: company.name })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.detail || data.error);
      setEnrichData(data);
      localStorage.setItem(`enrich_${company.id}`, JSON.stringify(data));
    } catch (e: any) {
      setEnrichError(e.message || "Enrichment failed");
    } finally {
      setEnrichLoading(false);
    }
  };

  const saveNote = () => {
    localStorage.setItem(`notes_${company.id}`, notes);
    alert("Note saved!");
  };

  const saveToList = () => {
    const listName = prompt("Save to list (enter list name):") || "Default";
    const lists = JSON.parse(localStorage.getItem("vc_lists") || "[]");
    const existing = lists.find((l: any) => l.name === listName);
    if (existing) {
      if (!existing.companyIds.includes(company.id)) existing.companyIds.push(company.id);
    } else {
      lists.push({ id: Date.now().toString(), name: listName, companyIds: [company.id], createdAt: new Date().toISOString() });
    }
    localStorage.setItem("vc_lists", JSON.stringify(lists));
    setSaved(true);
    alert(`Saved to "${listName}"!`);
  };

  const tabs = ["overview", "signals", "notes"] as const;

  return (
    <div className="p-6 max-w-4xl">
      {/* Back */}
      <Link href="/companies" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-5">
        <ArrowLeft size={14} /> Back to Companies
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
            <Badge variant="outline">{company.stage}</Badge>
          </div>
          <p className="text-gray-500 max-w-xl">{company.description}</p>
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
            <span>📍 {company.location}</span>
            <span>👥 {company.employees}</span>
            <span>📅 Founded {company.founded}</span>
            <span>💰 {company.fundingTotal}</span>
            <a href={company.website} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:underline">
              <Globe size={12} /> Website
            </a>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={saveToList}
            className={`flex items-center gap-2 px-3 py-2 text-sm border rounded-lg transition-colors ${saved ? "bg-blue-50 border-blue-200 text-blue-700" : "border-gray-200 hover:bg-gray-50"}`}>
            <BookmarkPlus size={14} /> {saved ? "Saved" : "Save"}
          </button>
          <button onClick={handleEnrich} disabled={enrichLoading}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors">
            <Sparkles size={14} />
            {enrichLoading ? "Enriching..." : enrichData ? "Re-enrich" : "✨ Enrich"}
          </button>
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {company.tags.map(tag => (
          <span key={tag} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">{tag}</span>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200 mb-6">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
              activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-800"
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Company Info</h3>
            <dl className="space-y-2 text-sm">
              {[["Sector", company.sector], ["Stage", company.stage], ["Founded", company.founded], ["Employees", company.employees], ["Total Raised", company.fundingTotal]].map(([k, v]) => (
                <div key={String(k)} className="flex justify-between">
                  <dt className="text-gray-500">{k}</dt>
                  <dd className="font-medium text-gray-900">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Latest Signal</h3>
            {company.signals[0] ? (
              <div>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${SIGNAL_COLORS[company.signals[0].type]}`}>
                  {company.signals[0].type}
                </span>
                <p className="text-sm mt-2 text-gray-700">{company.signals[0].text}</p>
                <p className="text-xs text-gray-400 mt-1">{company.signals[0].date}</p>
              </div>
            ) : <p className="text-sm text-gray-400">No signals yet</p>}
          </div>
        </div>
      )}

      {activeTab === "signals" && (
        <div className="space-y-3">
          {company.signals.map((signal, i) => (
            <div key={i} className="flex gap-4 bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex flex-col items-center">
                <span className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${SIGNAL_COLORS[signal.type]}`}>
                  {signal.type}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{signal.text}</p>
                <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1"><Clock size={10} />{signal.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "notes" && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Private Notes</h3>
          <textarea value={notes} onChange={e => setNotes(e.target.value)}
            placeholder="Add your investment thesis notes, meeting notes, follow-up items..."
            className="w-full h-40 text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          <button onClick={saveNote}
            className="mt-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Note
          </button>
        </div>
      )}

      {/* Enrichment Panel */}
      {enrichError && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          ⚠️ {enrichError}
        </div>
      )}

      {enrichLoading && (
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-600">Fetching and analyzing {company.website}...</p>
          </div>
          <div className="mt-4 space-y-2">
            {["Fetching website content", "Extracting key information", "Identifying signals"].map((step, i) => (
              <div key={i} className="h-4 bg-gray-100 rounded animate-pulse" style={{ width: `${70 - i * 10}%` }} />
            ))}
          </div>
        </div>
      )}

      {enrichData && !enrichLoading && (
        <div className="mt-6 bg-white rounded-xl border border-blue-200 overflow-hidden">
          <div className="bg-blue-50 border-b border-blue-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">AI Enrichment</span>
              <span className="text-xs text-blue-500">· {new Date(enrichData.scrapedAt).toLocaleString()}</span>
            </div>
            <button onClick={() => {
              localStorage.removeItem(`enrich_${company.id}`);
              setEnrichData(null);
            }} className="text-xs text-blue-400 hover:text-blue-600">Clear</button>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Summary</h4>
              <p className="text-sm text-gray-800">{enrichData.summary}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">What They Do</h4>
              <ul className="space-y-1">
                {enrichData.whatTheyDo?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-blue-500 mt-0.5">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                <Tag size={11} /> Keywords
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {enrichData.keywords?.map(kw => (
                  <span key={kw} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">{kw}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                <Zap size={11} /> Derived Signals
              </h4>
              <div className="space-y-1.5">
                {enrichData.signals?.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full shrink-0" />
                    <span className="font-medium text-gray-700">{s.type}:</span>
                    <span className="text-gray-600">{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Source</h4>
              <a href={enrichData.sourceUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                <ExternalLink size={11} /> {enrichData.sourceUrl}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}