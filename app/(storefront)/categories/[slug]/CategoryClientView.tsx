"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Ruler } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { dbService } from "@/lib/database/db";
import { CATEGORIES_DATA } from "@/lib/database/data";

export default function CategoryClientView({ slug }: { slug: string }) {
  const category = CATEGORIES_DATA.find((c) => c.slug === slug);
  const [selectedSub, setSelectedSub] = useState<string>("all");

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center px-4">
        <h1 className="font-serif text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="text-sm text-neutral-600 mb-6">
          The requested category does not exist in our catalog.
        </p>
        <Link
          href="/shop"
          className="bg-[#7A0D2E] text-white px-6 py-2.5 rounded-full text-xs font-semibold"
        >
          Browse All Collections
        </Link>
      </div>
    );
  }

  const categoryProducts = dbService
    .getProducts()
    .filter((p) => p.categorySlug === category.slug)
    .filter((p) => {
      if (selectedSub === "all") return true;
      return p.subCategory?.toLowerCase().includes(selectedSub.toLowerCase());
    });

  return (
    <div className="space-y-12 pb-16">
      {/* Category Hero Banner */}
      <section className="relative h-[360px] sm:h-[420px] bg-[#1A1A1A] flex items-center justify-center text-center overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover brightness-[0.55]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        <div className="relative z-10 max-w-3xl px-4 sm:px-6 space-y-3 text-white">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A437]">
            {category.tagline}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-wide">
            {category.name}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#F7F0E6]/90 max-w-xl mx-auto leading-relaxed">
            {category.description}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Subcategories Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#D4A437]/20">
          <button
            onClick={() => setSelectedSub("all")}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedSub === "all"
                ? "bg-[#7A0D2E] text-white shadow-sm"
                : "bg-white/80 text-neutral-700 hover:bg-[#FAF5EE] border border-[#D4A437]/30"
            }`}
          >
            All {category.name} ({categoryProducts.length})
          </button>
          {category.subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSub(sub)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSub === sub
                  ? "bg-[#7A0D2E] text-white shadow-sm"
                  : "bg-white/80 text-neutral-700 hover:bg-[#FAF5EE] border border-[#D4A437]/30"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Custom Carpet Notice for Carpets & Rugs */}
        {category.slug === "carpets-rugs" && (
          <div className="bg-[#FAF5EE] border border-[#D4A437]/50 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#7A0D2E] text-white rounded-full">
                <Ruler className="w-5 h-5 text-[#D4A437]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#1A1A1A]">
                  Require Bespoke Custom Dimensions or Architectural Sizing?
                </h4>
                <p className="text-xs text-neutral-600">
                  Our master weavers weave custom pit-loom carpets to your exact palace or salon specifications.
                </p>
              </div>
            </div>
            <Link
              href="/custom-orders"
              className="bg-[#7A0D2E] text-white text-xs font-semibold px-5 py-2.5 rounded-full whitespace-nowrap hover:bg-[#6B0B28] transition-colors"
            >
              Submit Custom Size Request →
            </Link>
          </div>
        )}

        {/* Products Grid */}
        {categoryProducts.length === 0 ? (
          <div className="text-center py-16 bg-white/50 rounded border border-dashed border-[#D4A437]/40">
            <p className="font-serif text-lg text-[#1A1A1A]">No pieces found in this subcategory.</p>
            <button
              onClick={() => setSelectedSub("all")}
              className="mt-3 text-xs text-[#7A0D2E] font-semibold underline"
            >
              Show all {category.name}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

