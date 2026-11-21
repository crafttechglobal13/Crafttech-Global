"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES_DATA } from "@/lib/database/data";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-neutral-200">
        <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">Category Hierarchy</h1>
        <p className="text-xs text-neutral-500">Manage master collections, subcategories, and cover photography.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CATEGORIES_DATA.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-xl border border-[#D4A437]/30 overflow-hidden shadow-xs flex flex-col justify-between"
          >
            <div className="relative h-44 w-full bg-neutral-100">
              <Image src={cat.image} alt={cat.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4A437]">
                  {cat.slug}
                </span>
                <h3 className="font-serif font-bold text-lg">{cat.name}</h3>
              </div>
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
              <div>
                <p className="text-neutral-600 text-xs mb-3">{cat.description}</p>
                <div className="space-y-1">
                  <span className="font-bold text-neutral-800 uppercase text-[10px] block">
                    Subcategories ({cat.subcategories.length}):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cat.subcategories.map((sub) => (
                      <span
                        key={sub}
                        className="bg-[#FAF5EE] text-[#7A0D2E] border border-[#D4A437]/30 px-2 py-0.5 rounded text-[11px]"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <Link
                  href={`/categories/${cat.slug}`}
                  target="_blank"
                  className="text-xs font-semibold text-[#7A0D2E] hover:underline"
                >
                  View Category Page →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

