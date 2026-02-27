"use client";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, List, Bookmark, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/companies", icon: Building2, label: "Companies" },
  { href: "/lists", icon: List, label: "Lists" },
  { href: "/saved", icon: Bookmark, label: "Saved Searches" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [globalSearch, setGlobalSearch] = useState("");

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        document.getElementById("global-search")?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      router.push(`/companies?q=${encodeURIComponent(globalSearch.trim())}`);
      setGlobalSearch("");
    }
  };

  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-50 font-sans overflow-hidden">
        <aside className="w-56 bg-white border-r border-gray-200 flex flex-col p-4 shrink-0">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">VCIntel</span>
          </div>

          <form onSubmit={handleSearch} className="mb-6">
            <input
              id="global-search"
              value={globalSearch}
              onChange={e => setGlobalSearch(e.target.value)}
              placeholder='Search... (press /)'
              className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </form>

          <nav className="flex flex-col gap-1">
            {navItems.map(({ href, icon: Icon, label }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link key={href} href={href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}>
                  <Icon size={15} />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-gray-500">/</kbd> to search</p>
          </div>
        </aside>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}