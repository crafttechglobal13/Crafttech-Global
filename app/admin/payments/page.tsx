"use client";

import React from "react";
import { CreditCard, CheckCircle, ShieldCheck } from "lucide-react";
import { dbService } from "@/lib/database/db";
import { useCurrency } from "@/lib/currency/currencyContext";

export default function AdminPaymentsPage() {
  const { formatPrice } = useCurrency();
  const orders = dbService.getOrders();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-neutral-200">
        <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">Payment & Settlement Ledger</h1>
        <p className="text-xs text-neutral-500">Live transaction logs from Razorpay, Stripe, and Cash on Delivery.</p>
      </div>

      <div className="bg-white rounded-xl border border-[#D4A437]/30 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF5EE] border-b border-neutral-200 text-neutral-600 uppercase tracking-wider">
                <th className="p-3.5">Transaction ID</th>
                <th className="p-3.5">Order Ref</th>
                <th className="p-3.5">Gateway Provider</th>
                <th className="p-3.5">Settlement Amount</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Settlement Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#FAF5EE]/50 transition-colors">
                  <td className="p-3.5 font-mono text-[11px] font-bold text-[#7A0D2E]">
                    TXN-{ord.id.slice(-6).toUpperCase()}
                  </td>
                  <td className="p-3.5 font-semibold text-[#1A1A1A]">{ord.orderNumber}</td>
                  <td className="p-3.5 font-semibold">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        ord.paymentMethod === "STRIPE"
                          ? "bg-indigo-50 text-indigo-700 font-bold"
                          : ord.paymentMethod === "RAZORPAY"
                          ? "bg-sky-50 text-sky-700 font-bold"
                          : "bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      {ord.paymentMethod}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-[#1A1A1A]">{formatPrice(ord.total)}</td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                      <CheckCircle className="w-3 h-3" /> {ord.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3.5 text-right text-neutral-500">
                    {new Date(ord.createdAt).toLocaleDateString()}
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

