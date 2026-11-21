"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AlertTriangle, CheckCircle, Package } from "lucide-react";
import { dbService } from "@/lib/database/db";

export default function AdminInventoryPage() {
  const [products, setProducts] = useState(dbService.getProducts());

  const handleUpdateStock = (id: string, delta: number) => {
    const prod = dbService.getProductById(id);
    if (prod) {
      const newStock = Math.max(0, prod.stock + delta);
      dbService.updateProduct(id, { stock: newStock });
      setProducts([...dbService.getProducts()]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-neutral-200">
        <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">Inventory & Stock Control</h1>
        <p className="text-xs text-neutral-500">Live atelier stock levels, low-stock threshold alerts, and reorder triggers.</p>
      </div>

      <div className="bg-white rounded-xl border border-[#D4A437]/30 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF5EE] border-b border-neutral-200 text-neutral-600 uppercase tracking-wider">
                <th className="p-3.5">Heirloom Piece</th>
                <th className="p-3.5">SKU</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Stock Level</th>
                <th className="p-3.5 text-right">Quick Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {products.map((p) => {
                const isLow = p.stock <= 10;
                return (
                  <tr key={p.id} className="hover:bg-[#FAF5EE]/50 transition-colors">
                    <td className="p-3.5 flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded overflow-hidden border">
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                      </div>
                      <span className="font-serif font-bold text-xs text-[#1A1A1A]">{p.name}</span>
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-neutral-600">{p.sku}</td>
                    <td className="p-3.5 text-neutral-700">{p.categoryName}</td>
                    <td className="p-3.5">
                      {isLow ? (
                        <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                          <AlertTriangle className="w-3 h-3" /> Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                          <CheckCircle className="w-3 h-3" /> In Stock
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-center font-bold text-sm text-[#1A1A1A]">
                      {p.stock} units
                    </td>
                    <td className="p-3.5 text-right space-x-1">
                      <button
                        onClick={() => handleUpdateStock(p.id, -1)}
                        className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded font-bold"
                      >
                        -1
                      </button>
                      <button
                        onClick={() => handleUpdateStock(p.id, 5)}
                        className="px-2.5 py-1 bg-[#7A0D2E] text-white hover:bg-[#6B0B28] rounded font-bold"
                      >
                        +5
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

