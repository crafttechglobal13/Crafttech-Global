"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Building2, CheckCircle, ShieldCheck, Mail, Phone, Globe } from "lucide-react";
import { dbService } from "@/lib/database/db";

export default function BulkOrdersPage() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    country: "United States",
    category: "Carpets & Rugs",
    estimatedQuantity: 50,
    requirements: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.createEnquiry({
      type: "BULK_ORDER",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      status: "NEW",
      details: {
        businessName: formData.businessName,
        country: formData.country,
        category: formData.category,
        estimatedQuantity: formData.estimatedQuantity,
        requirements: formData.requirements,
      },
    });
    setSubmitted(true);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner */}
      <div className="relative h-72 sm:h-80 bg-[#0D2D5B] flex items-center justify-center text-center text-white px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#D4A437_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A437]">
            Corporate & Hospitality Trade
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold">
            Bulk & Commercial Enquiries
          </h1>
          <p className="text-xs sm:text-sm text-[#F7F0E6]/85">
            Partnering with luxury boutique hotels, royal embassies, corporate headquarters, and architectural interior designers worldwide.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white/85 rounded-xl border border-[#D4A437]/40 p-6 sm:p-10 shadow-sm space-y-6">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle className="w-16 h-16 text-green-700 mx-auto" />
              <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                Commercial Enquiry Received
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
                Our Trade & Institutional Director will contact you within 24 hours with wholesale pricing catalogs, sample swatches, and logistics schedules.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-[#7A0D2E] text-white text-xs px-6 py-2.5 rounded-full font-semibold"
              >
                Submit Another Trade Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">
                    Company / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. St. Regis Resorts"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="trade@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">
                    Direct Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">
                    Destination Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">
                    Product Interest Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E] font-medium"
                  >
                    <option value="Carpets & Rugs">Carpets & Rugs (Hospitality / Suites)</option>
                    <option value="Handicrafts">Handicrafts (Corporate Brass Gifting)</option>
                    <option value="Home Decor">Home Decor (Cushions & Soft Furnishings)</option>
                    <option value="Mixed Curated Order">Mixed Curated Architectural Order</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">
                    Estimated Quantity *
                  </label>
                  <input
                    type="number"
                    min={10}
                    required
                    value={formData.estimatedQuantity}
                    onChange={(e) => setFormData({ ...formData, estimatedQuantity: Number(e.target.value) })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-neutral-800 block mb-1">
                  Project Scope & Custom Specifications *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail room layout specifications, desired weave knot density, custom hotel crest embossing, required delivery timeline..."
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#7A0D2E] text-white py-3.5 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-[#6B0B28] transition-colors shadow-md"
              >
                Submit Trade & Bulk Enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

