"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Package } from "lucide-react";
import { dbService } from "@/lib/database/db";

export default function CreateProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    sku: "",
    categorySlug: "carpets-rugs" as "carpets-rugs" | "handicrafts" | "home-decor",
    categoryName: "Carpets & Rugs",
    subCategory: "Handmade Carpets",
    price: 35000,
    originalPrice: 45000,
    stock: 10,
    badge: "New" as "New" | "Sale" | "Bestseller",
    material: "100% Handspun New Zealand Wool",
    color: "Heritage Maroon & Royal Gold",
    dimensions: "5 ft x 8 ft",
    weight: "12 kg",
    origin: "Bhadohi, India",
    craftsmanship: "Hand-knotted with over 300 KPSI on traditional vertical pit looms.",
    careInstructions: "Professional carpet cleaning only. Vacuum without beater bar.",
    shippingInfo: "Complimentary global courier shipping with insured tracking.",
    shortDescription: "An exceptional hand-knotted heritage piece designed for distinguished interiors.",
    description: "Handcrafted over 150 days by generational master weavers, this piece combines historical motif design with sumptuous texture and rich natural dyes.",
    imageUrl: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1000&q=80",
  });

  const [created, setCreated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    dbService.createProduct({
      slug,
      name: form.name,
      sku: form.sku,
      categorySlug: form.categorySlug,
      categoryName:
        form.categorySlug === "carpets-rugs"
          ? "Carpets & Rugs"
          : form.categorySlug === "handicrafts"
          ? "Handicrafts"
          : "Home Decor",
      subCategory: form.subCategory,
      price: Number(form.price),
      originalPrice: Number(form.originalPrice),
      rating: 5.0,
      reviewCount: 1,
      stock: Number(form.stock),
      badge: form.badge,
      isFeatured: true,
      isBestseller: form.badge === "Bestseller",
      isNew: form.badge === "New",
      material: form.material,
      color: form.color,
      dimensions: form.dimensions,
      weight: form.weight,
      origin: form.origin,
      craftsmanship: form.craftsmanship,
      careInstructions: form.careInstructions,
      shippingInfo: form.shippingInfo,
      shortDescription: form.shortDescription,
      description: form.description,
      images: [form.imageUrl],
      sizes: ["Standard Dimension", "Custom Loom Sizing Available"],
      colors: [form.color],
    });

    setCreated(true);
    setTimeout(() => {
      router.push("/admin/products");
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
        <Link
          href="/admin/products"
          className="text-xs text-[#7A0D2E] hover:underline flex items-center gap-1 font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Products</span>
        </Link>
        <span className="text-xs font-bold uppercase tracking-wider text-[#D4A437]">
          Master Catalog Authoring
        </span>
      </div>

      <div className="bg-white rounded-xl border border-[#D4A437]/30 p-6 sm:p-8 shadow-xs">
        {created ? (
          <div className="text-center py-12 space-y-3">
            <CheckCircle className="w-14 h-14 text-green-700 mx-auto" />
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              Piece Successfully Registered
            </h2>
            <p className="text-xs text-neutral-500">Redirecting to product inventory...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">
              Add New Luxury Heirloom Piece
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-neutral-800 block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Kashmiri Silk Medallion Rug"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-800 block mb-1">SKU Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CG-RUG-SLK-011"
                  value={form.sku}
                  onChange={(e) => setForm({ ...form, sku: e.target.value })}
                  className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-800 block mb-1">Primary Category *</label>
                <select
                  value={form.categorySlug}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      categorySlug: e.target.value as any,
                      categoryName:
                        e.target.value === "carpets-rugs"
                          ? "Carpets & Rugs"
                          : e.target.value === "handicrafts"
                          ? "Handicrafts"
                          : "Home Decor",
                    })
                  }
                  className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E] font-medium"
                >
                  <option value="carpets-rugs">Carpets & Rugs</option>
                  <option value="handicrafts">Handicrafts</option>
                  <option value="home-decor">Home Decor</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-neutral-800 block mb-1">Subcategory *</label>
                <input
                  type="text"
                  required
                  value={form.subCategory}
                  onChange={(e) => setForm({ ...form, subCategory: e.target.value })}
                  className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-800 block mb-1">Retail Price (INR) *</label>
                <input
                  type="number"
                  required
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-800 block mb-1">Original Price (INR)</label>
                <input
                  type="number"
                  value={form.originalPrice}
                  onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value) })}
                  className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-800 block mb-1">Initial Stock Units *</label>
                <input
                  type="number"
                  required
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                  className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-800 block mb-1">Collection Badge</label>
                <select
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value as any })}
                  className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                >
                  <option value="New">New Arrival</option>
                  <option value="Sale">Sale Collection</option>
                  <option value="Bestseller">Bestseller</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-neutral-800 block mb-1">High-Res Image URL *</label>
                <input
                  type="url"
                  required
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-neutral-800 block mb-1">Short Summary *</label>
              <input
                type="text"
                required
                value={form.shortDescription}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
              />
            </div>

            <div>
              <label className="font-semibold text-neutral-800 block mb-1">Full Editorial Description *</label>
              <textarea
                rows={3}
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#7A0D2E] text-white py-3 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-[#6B0B28] transition-colors shadow-md"
            >
              Publish to CRAFTTECH GLOBAL Master Catalog
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

