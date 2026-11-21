"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { dbService } from "@/lib/database/db";

function SearchContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(queryParam);

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  const searchResults = dbService.getProducts({ search: searchTerm });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Search Header Form */}
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A437]">
          Global Atelier Search
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
          Search Our Collections
        </h1>

        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product name, silk, wool, brass, cushion, sku..."
            className="w-full bg-white border-2 border-[#D4A437]/60 rounded-full py-3 pl-12 pr-4 text-xs sm:text-sm text-[#1A1A1A] focus:outline-none focus:border-[#7A0D2E] shadow-sm"
          />
          <SearchIcon className="w-5 h-5 text-[#7A0D2E] absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Results Header */}
      <div className="pb-3 border-b border-[#D4A437]/30 flex justify-between items-center text-xs text-neutral-600">
        <span>
          Showing {searchResults.length} results {searchTerm && <span>for &ldquo;{searchTerm}&rdquo;</span>}
        </span>
      </div>

      {/* Results Grid */}
      {searchResults.length === 0 ? (
        <div className="text-center py-16 bg-white/50 rounded border border-dashed border-[#D4A437]/40 space-y-3">
          <p className="font-serif text-lg text-[#1A1A1A]">No pieces found matching &ldquo;{searchTerm}&rdquo;</p>
          <p className="text-xs text-neutral-500">
            Try searching for &quot;Persian Rug&quot;, &quot;Brass Elephant&quot;, &quot;Cushion&quot;, or &quot;Jute&quot;.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {searchResults.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Searching Catalog...</div>}>
      <SearchContent />
    </Suspense>
  );
}
