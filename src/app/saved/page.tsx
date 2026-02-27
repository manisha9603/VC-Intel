"use client";
import { useState, useEffect } from "react";
import { SavedSearch } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Trash2, Search } from "lucide-react";

export default function SavedPage() {
  const [searches, setSearches] = useState<SavedSearch[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("vc_saved_searches");
    if (stored) setSearches(JSON.parse(stored));
  }, []);

  const deleteSearch = (id: string) => {
    const updated = searches.filter(s => s.id !== id);
    setSearches(updated);
    localStorage.setItem("vc_saved_searches", JSON.stringify(updated));
  };

  const runSearch = (s: SavedSearch) => {
    const params = new URLSearchParams();
    if (s.query) params.set("q", s.query);
    router.push(`/companies?${params.toString()}`);
  };

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Saved Searches</h1>
      {searches.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center">
          <Search size={24} className="text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">No saved searches yet.</p>
          <p className="text-gray-400 text-xs mt-1">Go to Companies, apply filters, then click "Save Search".</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {searches.map(s => (
            <div key={s.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">{s.name}</p>
                <div className="flex gap-2 mt-1 text-xs text-gray-500">
                  {s.query && <span>Query: "{s.query}"</span>}
                  {s.stage !== "All" && <span>Stage: {s.stage}</span>}
                  {s.sector !== "All" && <span>Sector: {s.sector}</span>}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Saved {new Date(s.savedAt).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => runSearch(s)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Search size={12} /> Run
                </button>
                <button onClick={() => deleteSearch(s.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1.5">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}