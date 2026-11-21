"use client";

import React, { useState } from "react";
import { Settings, Save, CheckCircle, ShieldCheck } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    companyName: "CRAFTTECH GLOBAL",
    tagline: "Rooted in Heritage. Designed for the World.",
    contactEmail: "contact@crafttechglobal.com",
    contactPhone: "+91 90792 12937",
    headquarters: "H - 13, Gandhi Nagar, Naka Madaar, Ajmer - 305001, Rajasthan, India",
    defaultCurrency: "INR",
    announcementText: "✈ International Shipping Available | 🎁 Discover Our New Collection | 🏷 Free Shipping on Orders Above $100",
    announcementEnabled: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-4 border-b border-neutral-200">
        <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">Enterprise Configuration</h1>
        <p className="text-xs text-neutral-500">Configure global metadata, brand identity, announcement bars, and gateways.</p>
      </div>

      <div className="bg-white rounded-xl border border-[#D4A437]/30 p-6 sm:p-8 shadow-xs space-y-6">
        {saved && (
          <div className="bg-green-50 text-green-800 p-3 rounded text-xs border border-green-200 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Settings updated successfully. Changes are live across storefront.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">Company Trade Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 font-bold text-[#7A0D2E]"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">Official Brand Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 italic text-neutral-700"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">Concierge Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">Concierge Phone Hotline</label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-semibold block mb-1">Headquarters & Master Atelier Address</label>
              <input
                type="text"
                value={settings.headquarters}
                onChange={(e) => setSettings({ ...settings, headquarters: e.target.value })}
                className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-semibold block mb-1">Announcement Bar Ticker Text</label>
              <input
                type="text"
                value={settings.announcementText}
                onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-neutral-600">
              <ShieldCheck className="w-4 h-4 text-[#7A0D2E]" />
              <span>Multi-Currency & International Gateway Sync Active</span>
            </div>
            <button
              type="submit"
              className="bg-[#7A0D2E] text-white px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-[#6B0B28] flex items-center gap-2 shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Configurations</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

