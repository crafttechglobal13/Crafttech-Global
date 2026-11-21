"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Are CRAFTTECH GLOBAL carpets and handicrafts 100% genuine and handmade?",
      a: "Yes, without exception. Every carpet is hand-knotted on traditional pit looms in Bhadohi and Kashmir using genuine New Zealand wool and pure mulberry silk. All brass artifacts are hand-cast and hand-engraved with chisel techniques in Moradabad. Each piece includes a signed Certificate of Authenticity.",
    },
    {
      q: "Can I commission a custom size carpet or rug for my living room or banquet hall?",
      a: "Absolutely. We specialize in bespoke architectural sizing. You can submit your exact room dimensions, knot density preference, and custom colorways via our Custom Size Request form or directly through any carpet product page. Our loom masters will create a digital simulation and weaving quote within 24 hours.",
    },
    {
      q: "How does international shipping work and will I be charged customs duties?",
      a: "We ship door-to-door globally using DHL Express and FedEx Priority. For all retail orders placed on our website, applicable duties and taxes are clearly calculated or covered, eliminating unexpected border clearance charges.",
    },
    {
      q: "What payment gateways are supported?",
      a: "We support Stripe for international credit/debit cards (Visa, Mastercard, AMEX, Apple Pay) and Razorpay for Indian cards, UPI (Google Pay, PhonePe, Paytm), and NetBanking. Cash on Delivery is also available for eligible domestic deliveries.",
    },
    {
      q: "How do I care for and clean a hand-knotted wool or silk rug?",
      a: "We recommend regular vacuuming on low suction without a beater bar. For spills, blot immediately with an un-dyed clean cloth. Annual professional cleaning by a dedicated oriental rug specialist ensures your rug lasts for generations.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      <div className="text-center space-y-2 border-b border-[#D4A437]/30 pb-6">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A437]">
          Common Questions
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600">
          Everything you need to know about our artisanal provenance, delivery, and bespoke commissions.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white/80 rounded-lg border border-[#D4A437]/30 overflow-hidden shadow-xs"
          >
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
            >
              <span className="font-serif font-bold text-sm sm:text-base text-[#1A1A1A]">
                {faq.q}
              </span>
              {openIdx === i ? (
                <ChevronUp className="w-5 h-5 text-[#7A0D2E] flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#D4A437] flex-shrink-0" />
              )}
            </button>

            {openIdx === i && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-700 leading-relaxed border-t border-neutral-100">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

