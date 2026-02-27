"use client";
import { useState, useEffect } from "react";
import { mockCompanies } from "@/lib/mock-data";
import { SavedList } from "@/lib/types";
import Link from "next/link";
import { Trash2, Download, Plus } from "lucide-react";

export default function ListsPage() {
  const [lists, setLists] = useState<SavedList[]>([]);
  const [activeList, setActiveList] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("vc_lists");
    if (stored) setLists(JSON.parse(stored));
  }, []);

  const save = (updated: SavedList[]) => {
    setLists(updated);
    localStorage.setItem("vc_lists", JSON.stringify(updated));
  };

  const createList = () => {
    const name = prompt("List name:");
    if (!name) return;
    save([...lists, { id: Date.now().toString(), name, companyIds: [], createdAt: new Date().toISOString() }]);
  };

  const deleteList = (id: string) => {
    if (!confirm("Delete this list?")) return;
    save(lists.filter(l => l.id !== id));
    if (activeList === id) setActiveList(null);
  };

  const removeCompany = (listId: string, companyId: string) => {
    save(lists.map(l => l.id === listId ? { ...l, companyIds: l.companyIds.filter(c => c !== companyId) } : l));
  };

  const exportList = (list: SavedList, fmt: "csv" | "json") => {
    const companies = list.companyIds.map(id => mockCompanies.find(c => c.id === id)).filter(Boolean);
    let content: string;
    let filename: string;
    if (fmt === "csv") {
      const headers = ["name", "stage", "sector", "location", "fundingTotal"];
      content = [headers.join(","), ...companies.map(c => headers.map(h => (c as any)[h]).join(","))].join("\n");
      filename = `${list.name}.csv`;
    } else {
      content = JSON.stringify(companies, null, 2);
      filename = `${list.name}.json`;
    }
    const blob = new Blob([content], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  };

  const activeListData = lists.find(l => l.id === activeList);

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Lists</h1>
        <button onClick={createList}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
          <Plus size={14} /> New List
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 shrink-0">
          {lists.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-gray-300 p-6 text-center">
              <p className="text-sm text-gray-500">No lists yet. Create one or save companies from the table.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {lists.map(list => (
                <div key={list.id}
                  onClick={() => setActiveList(list.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                    activeList === list.id ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{list.name}</p>
                    <p className="text-xs text-gray-500">{list.companyIds.length} companies</p>
                  </div>
                  <button onClick={e => { e.stopPropagation(); deleteList(list.id); }}
                    className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main */}
        <div className="flex-1">
          {activeListData ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">{activeListData.name}</h2>
                <div className="flex gap-2">
                  <button onClick={() => exportList(activeListData, "csv")}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                    <Download size={13} /> Export CSV
                  </button>
                  <button onClick={() => exportList(activeListData, "json")}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                    <Download size={13} /> Export JSON
                  </button>
                </div>
              </div>
              {activeListData.companyIds.length === 0 ? (
                <div className="bg-white rounded-xl border border-dashed border-gray-300 p-8 text-center">
                  <p className="text-gray-500 text-sm">No companies yet. Add from the companies table.</p>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                  {activeListData.companyIds.map(id => {
                    const c = mockCompanies.find(co => co.id === id);
                    if (!c) return null;
                    return (
                      <div key={id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                        <div>
                          <Link href={`/companies/${c.id}`} className="font-medium text-gray-900 hover:text-blue-600">{c.name}</Link>
                          <p className="text-xs text-gray-500">{c.stage} · {c.sector} · {c.location}</p>
                        </div>
                        <button onClick={() => removeCompany(activeListData.id, id)}
                          className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center">
              <p className="text-gray-500 text-sm">Select a list to view companies</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}