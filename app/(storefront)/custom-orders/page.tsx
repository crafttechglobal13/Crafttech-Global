"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Ruler, CheckCircle, Palette, Sparkles, ShieldCheck } from "lucide-react";
import { dbService } from "@/lib/database/db";

export default function CustomOrdersPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Carpets & Rugs",
    width: "",
    length: "",
    unit: "feet",
    material: "Handspun New Zealand Wool & Mulberry Silk",
    color: "Heritage Maroon & Royal Navy",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.createEnquiry({
      type: "CUSTOM_ORDER",
      name: form.name,
      email: form.email,
      phone: form.phone,
      status: "NEW",
      details: {
        category: form.category,
        dimensions: `${form.width} x ${form.length} ${form.unit}`,
        material: form.material,
        color: form.color,
        notes: form.notes,
      },
    });
    setSubmitted(true);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner */}
      <div className="relative h-72 sm:h-80 bg-[#1A1A1A] flex items-center justify-center text-center text-white px-4 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1400&q=80"
          alt="Artisan loom"
          fill
          className="object-cover brightness-[0.4]"
        />
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A437]">
            Bespoke Atelier Commission
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold">
            Custom Product & Size Enquiry
          </h1>
          <p className="text-xs sm:text-sm text-[#F7F0E6]/85">
            Weave your architectural vision into reality. Commission custom-dimensioned rugs, bespoke Nakashi brass sculptures, and hand-embroidered textiles.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white/85 rounded-xl border border-[#D4A437]/40 p-6 sm:p-10 shadow-sm space-y-6">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle className="w-16 h-16 text-green-700 mx-auto" />
              <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                Bespoke Commission Received
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
                Our bespoke loom master will review your dimensions, create digital loom renderings, and calculate hand-knotting lead times within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-[#7A0D2E] text-white text-xs px-6 py-2.5 rounded-full font-semibold"
              >
                Submit Another Custom Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Julian Hastings"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="julian@estate.co.uk"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+44 20 7946 0991"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">
                    Category of Interest *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E] font-medium"
                  >
                    <option value="Carpets & Rugs">Carpets & Rugs (Custom Pit Loom Size)</option>
                    <option value="Handicrafts">Handicrafts (Custom Cast Brass Sculpture)</option>
                    <option value="Home Decor">Home Decor (Custom Velvet Embroidered Sets)</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">
                    Required Width *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 12 ft"
                    value={form.width}
                    onChange={(e) => setForm({ ...form, width: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">
                    Required Length *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 18 ft"
                    value={form.length}
                    onChange={(e) => setForm({ ...form, length: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">
                    Preferred Material / Knot Density
                  </label>
                  <input
                    type="text"
                    value={form.material}
                    onChange={(e) => setForm({ ...form, material: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">
                    Preferred Color Palette
                  </label>
                  <input
                    type="text"
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-neutral-800 block mb-1">
                  Architectural Placement & Design Preferences
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your salon, lighting orientation, desired center medallion, border ornamentation, or upload reference references..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#7A0D2E] text-white py-3.5 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-[#6B0B28] transition-colors shadow-md"
              >
                Submit Custom Size Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

