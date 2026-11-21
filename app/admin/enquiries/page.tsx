"use client";

import React, { useState } from "react";
import { MessageSquare, CheckCircle, Mail, Phone, Clock, FileText } from "lucide-react";
import { dbService, EnquiryRecord } from "@/lib/database/db";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState(dbService.getEnquiries());
  const [filterType, setFilterType] = useState<string>("ALL");

  const filtered = enquiries.filter((e) => {
    if (filterType !== "ALL" && e.type !== filterType) return false;
    return true;
  });

  const handleStatusChange = (id: string, newStatus: EnquiryRecord["status"]) => {
    dbService.updateEnquiryStatus(id, newStatus);
    setEnquiries([...dbService.getEnquiries()]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">
            Trade & Bespoke Enquiries
          </h1>
          <p className="text-xs text-neutral-500">
            Review custom rug size commissions, hotel bulk requests, and client concierge messages.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-200 text-xs">
        {["ALL", "CUSTOM_ORDER", "BULK_ORDER", "WHOLESALE", "CONTACT"].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
              filterType === t
                ? "bg-[#7A0D2E] text-white"
                : "bg-white text-neutral-700 hover:bg-[#FAF5EE] border border-neutral-200"
            }`}
          >
            {t.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Enquiries Grid */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-[#D4A437]/40">
            <p className="font-serif text-base text-neutral-700">No enquiries found.</p>
          </div>
        ) : (
          filtered.map((enq) => (
            <div
              key={enq.id}
              className="bg-white rounded-xl border border-[#D4A437]/30 p-5 sm:p-6 shadow-xs space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-sm text-[#7A0D2E]">
                    {enq.name}
                  </span>
                  <span className="bg-[#0D2D5B] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    {enq.type.replace("_", " ")}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={enq.status}
                    onChange={(e) => handleStatusChange(enq.id, e.target.value as any)}
                    className="bg-[#FAF5EE] border border-[#D4A437]/50 rounded px-2.5 py-1 text-xs font-bold text-[#7A0D2E] focus:outline-none"
                  >
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="QUOTED">QUOTED</option>
                    <option value="CONVERTED">CONVERTED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                  <span className="text-neutral-400 text-[11px]">
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Details table */}
              <div className="bg-[#FAF5EE] p-4 rounded-lg border border-[#D4A437]/20 text-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="font-semibold text-neutral-500 block">Contact Info:</span>
                  <span className="font-medium text-[#1A1A1A] block">{enq.email}</span>
                  <span className="text-neutral-600">{enq.phone}</span>
                </div>
                {enq.details.businessName && (
                  <div>
                    <span className="font-semibold text-neutral-500 block">Organization:</span>
                    <span className="font-medium text-[#1A1A1A]">{enq.details.businessName}</span>
                    <span className="text-neutral-600 block">Country: {enq.details.country}</span>
                  </div>
                )}
                {enq.details.dimensions && (
                  <div>
                    <span className="font-semibold text-neutral-500 block">Dimensions & Material:</span>
                    <span className="font-medium text-[#1A1A1A]">{enq.details.dimensions}</span>
                    <span className="text-neutral-600 block">{enq.details.material}</span>
                  </div>
                )}
                {enq.details.estimatedQuantity && (
                  <div>
                    <span className="font-semibold text-neutral-500 block">Estimated Quantity:</span>
                    <span className="font-bold text-[#7A0D2E]">{enq.details.estimatedQuantity} pieces</span>
                  </div>
                )}
              </div>

              {/* Requirements / Notes */}
              {(enq.details.notes || enq.details.requirements || enq.details.message) && (
                <div className="text-xs text-neutral-700 bg-white p-3 rounded border border-neutral-100">
                  <strong className="block text-neutral-500 text-[11px] uppercase mb-1">
                    Client Requirements:
                  </strong>
                  <p>{enq.details.notes || enq.details.requirements || enq.details.message}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

