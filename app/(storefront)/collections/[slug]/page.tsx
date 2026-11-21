"use client";

import React from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import { dbService } from "@/lib/database/db";

export default function CollectionDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const products = dbService.getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <div className="text-center space-y-2 border-b border-[#D4A437]/30 pb-6">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A437]">
          Curated Editorial
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A] capitalize">
          {slug.replace("-", " ")} Collection
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

