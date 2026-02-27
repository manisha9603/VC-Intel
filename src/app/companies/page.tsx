"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { mockCompanies, STAGES, SECTORS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SavedSearch } from "@/lib/types";
import Link from "next/link";
import { ArrowUpDown, Bookmark, ExternalLink } from "lucide-react";

const SIGNAL_COLORS: Record<string, string> = {
  hiring: "bg-green-100 text-green-700",
  funding: "bg-blue-100 text-blue-700",
  product: "bg-purple-100 text-purple-700",
  press: "bg-yellow-100 text-yellow-700",
  partnership: "bg-orange-100 text-orange-700",
};

function CompaniesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [stage, setStage] = useState("All");
  const [sector, setSector] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const PER_PAGE = 10;

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearch(q);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return mockCompanies
      .filter(c => {
        const q = search.toLowerCase();
        const matchSearch = !q || c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some(t => t.toLowerCase().includes(q));
        const matchStage = stage === "All" || c.stage === stage;
        const matchSector = sector === "All" || c.sector === sector;
        return matchSearch && matchStage && matchSector;
      })
      .sort((a, b) => {
        const av = a[sortBy as keyof typeof a] ?? "";
        const bv = b[sortBy as keyof typeof b] ?? "";
        const cmp = String(av).localeCompare(String(bv));
        return sortDir === "asc" ? cmp : -cmp;
      });
  }, [search, stage, sector, sortBy, sortDir]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const toggleSort = (col: string) => {
    if (sortBy === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("asc"); }
  };

  const saveSearch = () => {
    const name = prompt("Name this search:");
    if (!name) return;
    const searches: SavedSearch[] = JSON.parse(localStorage.getItem("vc_saved_searches") || "[]");
    searches.push({ id: Date.now().toString(), name, query: search, stage, sector, savedAt: new Date().toISOString() });
    localStorage.setItem("vc_saved_searches", JSON.stringify(searches));
    alert("Search saved!");
  };

  const addSelectedToList = () => {
    const listName = prompt("Add to list (enter list name):");
    if (!listName) return;
    const lists = JSON.parse(localStorage.getItem("vc_lists") || "[]");
    const existing = lists.find((l: any) => l.name === listName);
    if (existing) {
      existing.companyIds = [...new Set([...existing.companyIds, ...selected])];
    } else {
      lists.push({ id: Date.now().toString(), name: listName, companyIds: selected, createdAt: new Date().toISOString() });
    }
    localStorage.setItem("vc_lists", JSON.stringify(lists));
    alert(`Added ${selected.length} companies to "${listName}"`);
    setSelected([]);
  };

  const toggleSelect = (id: string) =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const SortHeader = ({ col, label }: { col: string; label: string }) => (
    <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer select-none hover:text-gray-800"
      onClick={() => toggleSort(col)}>
      <span className="flex items-center gap-1">{label}<ArrowUpDown size={12} /></span>
    </th>
  );

  return (
    <div className="p-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
          <p className="text-sm text-gray-500 mt-0.5">{filtered.length} companies found</p>
        </div>
        <div className="flex gap-2">
          {selected.length > 0 && (
            <button onClick={addSelectedToList}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Add {selected.length} to list
            </button>
          )}
          <button onClick={saveSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
            <Bookmark size={14} /> Save Search
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        <Input placeholder="Search companies, tags, descriptions..."
          value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="max-w-sm" />
        <select value={stage} onChange={e => { setStage(e.target.value); setPage(1); }}
          className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          {STAGES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={sector} onChange={e => { setSector(e.target.value); setPage(1); }}
          className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          {SECTORS.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="pb-3 pt-3 pl-4 text-left w-8">
                <input type="checkbox"
                  checked={selected.length === paginated.length && paginated.length > 0}
                  onChange={e => setSelected(e.target.checked ? paginated.map(c => c.id) : [])}
                  className="rounded" />
              </th>
              <SortHeader col="name" label="Company" />
              <SortHeader col="stage" label="Stage" />
              <SortHeader col="sector" label="Sector" />
              <SortHeader col="location" label="Location" />
              <SortHeader col="fundingTotal" label="Funding" />
              <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Signals</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginated.map(company => (
              <tr key={company.id} className={`hover:bg-gray-50 transition-colors ${selected.includes(company.id) ? "bg-blue-50" : ""}`}>
                <td className="pl-4 py-3">
                  <input type="checkbox" checked={selected.includes(company.id)}
                    onChange={() => toggleSelect(company.id)} className="rounded" />
                </td>
                <td className="py-3 pr-4">
                  <Link href={`/companies/${company.id}`}
                    className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    {company.name}
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5 max-w-xs truncate">{company.description}</p>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {company.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <Badge variant="outline" className="text-xs">{company.stage}</Badge>
                </td>
                <td className="py-3 pr-4 text-sm text-gray-700">{company.sector}</td>
                <td className="py-3 pr-4 text-sm text-gray-500">{company.location}</td>
                <td className="py-3 pr-4 text-sm font-semibold text-gray-900">{company.fundingTotal}</td>
                <td className="py-3 pr-4">
                  {company.signals[0] && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${SIGNAL_COLORS[company.signals[0].type]}`}>
                      {company.signals[0].type}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2 mt-4">
          <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
          <div className="flex gap-1 ml-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)}
                className={`w-8 h-8 text-sm rounded-lg ${page === i + 1 ? "bg-blue-600 text-white" : "border border-gray-200 hover:bg-gray-50"}`}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CompaniesPage() {
  return <Suspense><CompaniesContent /></Suspense>;
}