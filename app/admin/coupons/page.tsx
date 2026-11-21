"use client";

import React, { useState } from "react";
import { Ticket, Plus, CheckCircle, Trash2 } from "lucide-react";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([
    {
      code: "HERITAGE10",
      type: "PERCENTAGE",
      discount: "10%",
      minOrder: "$100",
      used: 38,
      status: "ACTIVE",
    },
    {
      code: "ROYAL20",
      type: "PERCENTAGE",
      discount: "20%",
      minOrder: "$500",
      used: 14,
      status: "ACTIVE",
    },
    {
      code: "FREESHIP",
      type: "FREE_SHIPPING",
      discount: "Free Air Courier",
      minOrder: "$0",
      used: 92,
      status: "ACTIVE",
    },
  ]);

  const [newCode, setNewCode] = useState("");
  const [newVal, setNewVal] = useState("15");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;
    setCoupons([
      ...coupons,
      {
        code: newCode.toUpperCase().trim(),
        type: "PERCENTAGE",
        discount: `${newVal}%`,
        minOrder: "$150",
        used: 0,
        status: "ACTIVE",
      },
    ]);
    setNewCode("");
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-neutral-200">
        <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">Promotional Vouchers & Coupons</h1>
        <p className="text-xs text-neutral-500">Configure promotional discount codes, VIP patron vouchers, and free shipping triggers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Coupon Form */}
        <div className="bg-white rounded-xl border border-[#D4A437]/30 p-6 shadow-xs space-y-4 text-xs h-fit">
          <h3 className="font-serif font-bold text-base text-[#1A1A1A]">Generate VIP Voucher</h3>
          <form onSubmit={handleCreate} className="space-y-3">
            <div>
              <label className="font-semibold block mb-1">Coupon Code *</label>
              <input
                type="text"
                required
                placeholder="e.g. FESTIVE25"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2 uppercase font-mono font-bold"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">Percentage Value (%) *</label>
              <input
                type="number"
                required
                value={newVal}
                onChange={(e) => setNewVal(e.target.value)}
                className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#7A0D2E] text-white py-2.5 rounded font-bold uppercase tracking-wider text-xs hover:bg-[#6B0B28]"
            >
              Activate Voucher
            </button>
          </form>
        </div>

        {/* List of Active Coupons */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#D4A437]/30 overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF5EE] border-b border-neutral-200 text-neutral-600 uppercase tracking-wider">
                <th className="p-3.5">Code</th>
                <th className="p-3.5">Benefit</th>
                <th className="p-3.5">Redemptions</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {coupons.map((c) => (
                <tr key={c.code} className="hover:bg-[#FAF5EE]/50">
                  <td className="p-3.5 font-mono font-bold text-[#7A0D2E]">{c.code}</td>
                  <td className="p-3.5 font-medium">{c.discount}</td>
                  <td className="p-3.5 text-neutral-600">{c.used} used</td>
                  <td className="p-3.5">
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-[10px] font-bold">
                      {c.status}
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

