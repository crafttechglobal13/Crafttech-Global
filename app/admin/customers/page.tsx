"use client";

import React from "react";
import { Users, Mail, Phone, MapPin, Award } from "lucide-react";

export default function AdminCustomersPage() {
  const patrons = [
    {
      id: "pat_1",
      name: "Heritage Patron",
      email: "client.1@crafttechglobal.com",
      phone: "+91 98***-00001",
      country: "India",
      ordersCount: 2,
      totalSpend: "₹89,800",
      tier: "Royal Patron",
    },
    {
      id: "pat_2",
      name: "International Connoisseur",
      email: "client.2@crafttechglobal.com",
      phone: "+1 (555) ***-9012",
      country: "United States",
      ordersCount: 3,
      totalSpend: "$1,450.00",
      tier: "Heritage Connoisseur",
    },
    {
      id: "pat_3",
      name: "Architectural Partner",
      email: "trade@crafttechglobal.com",
      phone: "+44 20 ***-0991",
      country: "United Kingdom",
      ordersCount: 1,
      totalSpend: "£399.00",
      tier: "Patron Member",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-neutral-200">
        <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">Patron & Client Directory</h1>
        <p className="text-xs text-neutral-500">Manage registered client profiles, purchase histories, and tier standings.</p>
      </div>

      <div className="bg-white rounded-xl border border-[#D4A437]/30 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF5EE] border-b border-neutral-200 text-neutral-600 uppercase tracking-wider">
                <th className="p-3.5">Patron Name</th>
                <th className="p-3.5">Email & Phone</th>
                <th className="p-3.5">Territory</th>
                <th className="p-3.5">Orders</th>
                <th className="p-3.5">Cumulative Spend</th>
                <th className="p-3.5 text-right">Standing Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {patrons.map((p) => (
                <tr key={p.id} className="hover:bg-[#FAF5EE]/50 transition-colors">
                  <td className="p-3.5 font-serif font-bold text-xs text-[#1A1A1A]">{p.name}</td>
                  <td className="p-3.5">
                    <span className="block text-neutral-800">{p.email}</span>
                    <span className="text-[11px] text-neutral-500">{p.phone}</span>
                  </td>
                  <td className="p-3.5 text-neutral-700 font-medium">{p.country}</td>
                  <td className="p-3.5 font-semibold text-neutral-800">{p.ordersCount} orders</td>
                  <td className="p-3.5 font-bold text-[#7A0D2E]">{p.totalSpend}</td>
                  <td className="p-3.5 text-right">
                    <span className="inline-block bg-[#0D2D5B] text-[#D4A437] font-semibold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                      {p.tier}
                    </span>
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

