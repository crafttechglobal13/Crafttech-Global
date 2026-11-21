"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, CheckCircle, Globe } from "lucide-react";
import { dbService } from "@/lib/database/db";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Patron Concierge",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.createEnquiry({
      type: "CONTACT",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      status: "NEW",
      details: {
        subject: formData.subject,
        message: formData.message,
      },
    });
    setSubmitted(true);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Banner */}
      <div className="relative h-64 sm:h-72 bg-[#0D2D5B] flex items-center justify-center text-center text-white px-4">
        <div className="relative z-10 max-w-xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A437]">
            Client Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">
            Contact CRAFTTECH GLOBAL
          </h1>
          <p className="text-xs sm:text-sm text-[#F7F0E6]/80">
            Our luxury advisory team is at your disposal for sizing guidance, bespoke commissions, and order itineraries.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Info Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/80 p-6 rounded-xl border border-[#D4A437]/30 shadow-xs space-y-5">
            <h3 className="font-serif text-xl font-bold text-[#7A0D2E] border-b border-neutral-200 pb-3">
              Headquarters & Ateliers
            </h3>

            <div className="space-y-4 text-xs text-neutral-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#7A0D2E] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1A1A1A]">Master Atelier & Headquarters:</strong>
                  <span className="text-[#7A0D2E] font-bold block">CRAFTTECH GLOBAL</span>
                  <span className="text-neutral-700 block">H - 13, Gandhi Nagar, Naka Madaar</span>
                  <span className="text-neutral-700 block">Ajmer - 305001, Rajasthan, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-[#7A0D2E] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1A1A1A]">International Trade Liaison:</strong>
                  <span>London (Mayfair) • New York (Manhattan) • Dubai (DIFC)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#7A0D2E] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1A1A1A]">Client Services Hotline:</strong>
                  <span>+91 98765 43210 / +1 (800) 492-CRAFT</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#7A0D2E] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1A1A1A]">Official Email:</strong>
                  <span>care@crafttechglobal.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#7A0D2E] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1A1A1A]">Concierge Hours:</strong>
                  <span>Monday – Saturday: 9:00 AM – 8:00 PM IST (GMT +5:30)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white/80 p-6 sm:p-8 rounded-xl border border-[#D4A437]/30 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle className="w-14 h-14 text-green-700 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                Message Delivered to Concierge
              </h3>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                Thank you for reaching out. A senior CRAFTTECH GLOBAL concierge specialist will respond within 4 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-[#7A0D2E] text-white text-xs px-6 py-2 rounded-full font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="font-serif text-xl font-bold text-[#1A1A1A] border-b border-neutral-200 pb-3">
                Send a Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Hastings"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E] font-medium"
                  >
                    <option value="General Patron Concierge">General Patron Concierge</option>
                    <option value="Order Tracking & Transit">Order Tracking & Transit</option>
                    <option value="Bespoke Sizing Assistance">Bespoke Sizing Assistance</option>
                    <option value="Hospitality & Architectural Trade">Hospitality & Architectural Trade</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-neutral-800 block mb-1">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How may our artisans and client directors assist you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#7A0D2E] text-white py-3 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-[#6B0B28] transition-colors"
              >
                Send Message to Concierge
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Interactive Google Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-[#D4A437]/40 overflow-hidden shadow-xs">
          <div className="bg-[#0D2D5B] text-white px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4A437]" />
              <span className="font-semibold text-xs sm:text-sm">
                Headquarters Atelier Location: H-13, Gandhi Nagar, Naka Madaar, Ajmer - 305001, Rajasthan
              </span>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=H-13+Gandhi+Nagar+Naka+Madaar+Ajmer+Rajasthan+305001"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#D4A437] hover:underline"
            >
              <span>Open in Google Maps</span>
              <Globe className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="w-full h-80 sm:h-96 bg-neutral-100">
            <iframe
              title="CRAFTTECH GLOBAL - Ajmer Location Map"
              src="https://maps.google.com/maps?q=H-13,+Gandhi+Nagar,+Naka+Madaar,+Ajmer,+Rajasthan+305001&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

