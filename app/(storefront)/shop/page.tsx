"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { dbService } from "@/lib/database/db";
import { CATEGORIES_DATA } from "@/lib/database/data";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialBadge = searchParams.get("badge") || "";
  const initialSub = searchParams.get("sub") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubCategory, setSelectedSubCategory] = useState(initialSub);
  const [selectedBadge, setSelectedBadge] = useState(initialBadge);
  const [sortBy, setSortBy] = useState("featured");
  const [selectedMaterial, setSelectedMaterial] = useState("all");
  const [priceRange, setPriceRange] = useState<number>(60000);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const materials = [
    "all",
    "Wool",
    "Silk",
    "Jute",
    "Brass",
    "Velvet",
    "Sheesham Wood",
    "Cotton Linen",
  ];

  const allProducts = dbService.getProducts();

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.categorySlug !== selectedCategory) {
        return false;
      }
      // Subcategory filter
      if (
        selectedSubCategory &&
        !product.subCategory?.toLowerCase().includes(selectedSubCategory.toLowerCase())
      ) {
        return false;
      }
      // Badge filter
      if (selectedBadge && product.badge !== selectedBadge) {
        return false;
      }
      // Material filter
      if (
        selectedMaterial !== "all" &&
        !product.material.toLowerCase().includes(selectedMaterial.toLowerCase())
      ) {
        return false;
      }
      // Price filter
      if (product.price > priceRange) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === "bestseller") return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      return 0; // featured default
    });
  }, [allProducts, selectedCategory, selectedSubCategory, selectedBadge, selectedMaterial, priceRange, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedSubCategory("");
    setSelectedBadge("");
    setSelectedMaterial("all");
    setPriceRange(60000);
    setSortBy("featured");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="text-center space-y-3 mb-10 pb-6 border-b border-[#D4A437]/25">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A437]">
          CRAFTTECH GLOBAL Collection
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A]">
          {selectedCategory === "all"
            ? "The Complete Collection"
            : CATEGORIES_DATA.find((c) => c.slug === selectedCategory)?.name || "Shop Products"}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto">
          Handcrafted heritage carpets, artisanal brass sculptures, and opulent textiles designed to bring regal soul to your interiors.
        </p>
      </div>

      {/* Main Grid: Sidebar Filters & Product Listing */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden lg:block space-y-6 bg-white/70 p-6 rounded-lg border border-[#D4A437]/30 h-fit sticky top-28 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#7A0D2E]" />
              <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">Filters</h3>
            </div>
            <button
              onClick={clearAllFilters}
              className="text-[11px] text-[#7A0D2E] hover:underline font-medium"
            >
              Reset All
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <h4 className="font-serif font-semibold text-xs text-[#7A0D2E] uppercase tracking-wider">
              Categories
            </h4>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedSubCategory("");
                }}
                className={`block w-full text-left py-1 px-2 rounded transition-colors ${
                  selectedCategory === "all"
                    ? "bg-[#7A0D2E] text-white font-semibold"
                    : "text-neutral-700 hover:bg-[#FAF5EE]"
                }`}
              >
                All Categories ({allProducts.length})
              </button>
              {CATEGORIES_DATA.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setSelectedSubCategory("");
                  }}
                  className={`block w-full text-left py-1 px-2 rounded transition-colors ${
                    selectedCategory === cat.slug
                      ? "bg-[#7A0D2E] text-white font-semibold"
                      : "text-neutral-700 hover:bg-[#FAF5EE]"
                  }`}
                >
                  {cat.name} ({allProducts.filter((p) => p.categorySlug === cat.slug).length})
                </button>
              ))}
            </div>
          </div>

          {/* Badge Filter (Sale, New, Bestseller) */}
          <div className="space-y-2 pt-3 border-t border-neutral-200">
            <h4 className="font-serif font-semibold text-xs text-[#7A0D2E] uppercase tracking-wider">
              Collection Highlights
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {["Sale", "New", "Bestseller"].map((badge) => (
                <button
                  key={badge}
                  onClick={() => setSelectedBadge(selectedBadge === badge ? "" : badge)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                    selectedBadge === badge
                      ? "bg-[#D4A437] text-[#1A1A1A] font-bold border-[#D4A437]"
                      : "border-neutral-300 text-neutral-700 hover:border-[#D4A437]"
                  }`}
                >
                  {badge}
                </button>
              ))}
            </div>
          </div>

          {/* Material Filter */}
          <div className="space-y-2 pt-3 border-t border-neutral-200">
            <h4 className="font-serif font-semibold text-xs text-[#7A0D2E] uppercase tracking-wider">
              Material
            </h4>
            <div className="space-y-1 text-xs">
              {materials.map((m) => (
                <label key={m} className="flex items-center gap-2 cursor-pointer py-0.5 text-neutral-700">
                  <input
                    type="radio"
                    name="material"
                    checked={selectedMaterial === m}
                    onChange={() => setSelectedMaterial(m)}
                    className="accent-[#7A0D2E]"
                  />
                  <span className="capitalize">{m === "all" ? "All Materials" : m}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2 pt-3 border-t border-neutral-200">
            <div className="flex justify-between items-center text-xs">
              <h4 className="font-serif font-semibold text-[#7A0D2E] uppercase tracking-wider">
                Max Price
              </h4>
              <span className="font-bold text-[#1A1A1A]">₹{priceRange.toLocaleString("en-IN")}</span>
            </div>
            <input
              type="range"
              min={3000}
              max={60000}
              step={1000}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#7A0D2E] cursor-pointer"
            />
          </div>
        </aside>

        {/* PRODUCTS LISTING AREA */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Bar: Results Count & Sort Dropdown */}
          <div className="bg-white/70 p-4 rounded-lg border border-[#D4A437]/25 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-neutral-600 font-medium">
              Showing <strong className="text-[#1A1A1A]">{filteredProducts.length}</strong> handcrafted items
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Trigger */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 text-xs font-semibold bg-[#7A0D2E] text-white px-3 py-1.5 rounded"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-neutral-500 font-medium hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-[#D4A437]/50 rounded px-2.5 py-1.5 text-xs font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#7A0D2E]"
                >
                  <option value="featured">Featured Collection</option>
                  <option value="newest">New Releases</option>
                  <option value="bestseller">Best Selling</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Badges */}
          {(selectedCategory !== "all" || selectedBadge || selectedMaterial !== "all" || selectedSubCategory) && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-neutral-500 font-medium">Active:</span>
              {selectedCategory !== "all" && (
                <span className="bg-[#FAF5EE] border border-[#D4A437] text-[#7A0D2E] text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory("all")}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedSubCategory && (
                <span className="bg-[#FAF5EE] border border-[#D4A437] text-[#7A0D2E] text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  Sub: {selectedSubCategory}
                  <button onClick={() => setSelectedSubCategory("")}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedBadge && (
                <span className="bg-[#FAF5EE] border border-[#D4A437] text-[#7A0D2E] text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  Tag: {selectedBadge}
                  <button onClick={() => setSelectedBadge("")}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedMaterial !== "all" && (
                <span className="bg-[#FAF5EE] border border-[#D4A437] text-[#7A0D2E] text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  Material: {selectedMaterial}
                  <button onClick={() => setSelectedMaterial("all")}><X className="w-3 h-3" /></button>
                </span>
              )}
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white/50 rounded-lg border border-dashed border-[#D4A437] space-y-3">
              <p className="font-serif text-lg text-[#1A1A1A]">No products matched your criteria</p>
              <p className="text-xs text-neutral-500">Try adjusting your filters or price slider.</p>
              <button
                onClick={clearAllFilters}
                className="bg-[#7A0D2E] text-white text-xs font-semibold px-5 py-2 rounded-full hover:bg-[#6B0B28]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE FILTER MODAL */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#F7F0E6] h-full shadow-2xl p-6 overflow-y-auto space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-[#D4A437]/30">
              <h3 className="font-serif font-bold text-base text-[#1A1A1A]">Filters</h3>
              <button onClick={() => setIsMobileFilterOpen(false)}>
                <X className="w-6 h-6 text-neutral-700" />
              </button>
            </div>

            <div className="space-y-4">
              <h4 className="font-serif font-semibold text-xs text-[#7A0D2E] uppercase">Categories</h4>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`block w-full text-left py-1 text-xs ${selectedCategory === "all" ? "font-bold text-[#7A0D2E]" : ""}`}
                >
                  All Categories
                </button>
                {CATEGORIES_DATA.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.slug)}
                    className={`block w-full text-left py-1 text-xs ${selectedCategory === c.slug ? "font-bold text-[#7A0D2E]" : ""}`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full bg-[#7A0D2E] text-white py-2.5 rounded font-semibold text-xs uppercase"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading Catalog Collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
