"use client";

import React, { useState } from "react";
import { Download, BarChart3, TrendingUp, Calendar } from "lucide-react";
import { dbService } from "@/lib/database/db";
import { useCurrency } from "@/lib/currency/currencyContext";

export default function AdminReportsPage() {
  const { formatPrice } = useCurrency();
  const orders = dbService.getOrders();
  const products = dbService.getProducts();

  const handleExportCSV = () => {
    const headers = "Order Number,Customer Name,Email,Country,Status,Payment Method,Total Amount,Date\n";
    const rows = orders
      .map(
        (o) =>
          `"${o.orderNumber}","${o.customerName}","${o.email}","${o.shippingAddress.country}","${o.status}","${o.paymentMethod}",${o.total},"${o.createdAt}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CRAFTTECH_GLOBAL_Sales_Report_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">Sales Analytics & Reports</h1>
          <p className="text-xs text-neutral-500">Generate executive audits, export CSV ledgers, and analyze category performance.</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="bg-[#7A0D2E] text-white text-xs font-semibold px-4 py-2 rounded-md hover:bg-[#6B0B28] flex items-center gap-2 shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>Export Master CSV Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-[#D4A437]/30 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-neutral-500 uppercase">Gross Annual Sales</span>
          <div className="font-serif text-2xl font-bold text-[#7A0D2E]">
            {formatPrice(orders.reduce((sum, o) => sum + o.total, 0) * 12)}
          </div>
          <span className="text-[11px] text-green-700 font-medium">Projected FY 2026</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#D4A437]/30 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-neutral-500 uppercase">Average Order Value</span>
          <div className="font-serif text-2xl font-bold text-[#0D2D5B]">
            {formatPrice(
              orders.length ? orders.reduce((sum, o) => sum + o.total, 0) / orders.length : 0
            )}
          </div>
          <span className="text-[11px] text-neutral-500">Across international markets</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#D4A437]/30 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-neutral-500 uppercase">Total Catalog Items</span>
          <div className="font-serif text-2xl font-bold text-[#1A1A1A]">
            {products.length} Active Master Pieces
          </div>
          <span className="text-[11px] text-neutral-500">100% Verified Single-Brand</span>
        </div>
      </div>
    </div>
  );
}

