"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Trash2, Edit, AlertCircle } from "lucide-react";
import { dbService } from "@/lib/database/db";
import { useCurrency } from "@/lib/currency/currencyContext";

export default function AdminProductsPage() {
  const { formatPrice } = useCurrency();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [productsList, setProductsList] = useState(dbService.getProducts());

  const filtered = productsList.filter((p) => {
    if (selectedCat !== "all" && p.categorySlug !== selectedCat) return false;
    if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase()) && !p.sku.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you wish to remove this product from the master catalog?")) {
      dbService.deleteProduct(id);
      setProductsList(dbService.getProducts());
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">Product Management</h1>
          <p className="text-xs text-neutral-500">Add, edit, or adjust inventory for all master catalog heirlooms.</p>
        </div>
        <Link
          href="/admin/products/create"
          className="bg-[#7A0D2E] text-white text-xs font-semibold px-4 py-2.5 rounded-md hover:bg-[#6B0B28] flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-[#D4A437]/30 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search by title, SKU, or material..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded py-2 pl-8 pr-3 text-xs focus:outline-none focus:border-[#7A0D2E]"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-500">Category:</span>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-1.5 text-xs font-medium focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="carpets-rugs">Carpets & Rugs</option>
            <option value="handicrafts">Handicrafts</option>
            <option value="home-decor">Home Decor</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#D4A437]/30 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF5EE] border-b border-neutral-200 text-neutral-600 uppercase tracking-wider">
                <th className="p-3.5">Product</th>
                <th className="p-3.5">SKU</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Stock</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-[#FAF5EE]/50 transition-colors">
                  <td className="p-3.5 flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded overflow-hidden border flex-shrink-0">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                    </div>
                    <div>
                      <span className="font-serif font-bold text-xs text-[#1A1A1A] block">
                        {product.name}
                      </span>
                      {product.badge && (
                        <span className="inline-block bg-[#7A0D2E] text-white text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3.5 font-mono text-[11px] text-neutral-600">{product.sku}</td>
                  <td className="p-3.5 text-neutral-700 font-medium">{product.categoryName}</td>
                  <td className="p-3.5 font-bold text-[#7A0D2E]">{formatPrice(product.price)}</td>
                  <td className="p-3.5">
                    <span
                      className={`font-semibold ${
                        product.stock <= 5 ? "text-red-700 flex items-center gap-1" : "text-neutral-700"
                      }`}
                    >
                      {product.stock <= 5 && <AlertCircle className="w-3.5 h-3.5" />}
                      {product.stock} units
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <Link
                      href={`/products/${product.slug}`}
                      target="_blank"
                      className="text-[#0D2D5B] hover:underline font-semibold"
                    >
                      View Live
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800 ml-2"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

