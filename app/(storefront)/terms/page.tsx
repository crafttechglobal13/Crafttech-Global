import React from "react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      <div className="text-center space-y-2 border-b border-[#D4A437]/30 pb-6">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
          Terms & Conditions
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600">
          Last revised: November 2026 • Single-Brand Operations
        </p>
      </div>

      <div className="bg-white/80 rounded-xl border border-[#D4A437]/30 p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed shadow-xs">
        <p>
          Welcome to CRAFTTECH GLOBAL. By browsing, placing orders, or submitting custom commissions through our website, you agree to comply with our purchase and warranty terms.
        </p>
        <h3 className="font-serif font-bold text-[#7A0D2E] text-base">Single-Brand Guarantee</h3>
        <p>
          All products offered on this platform are exclusively curated and produced under the CRAFTTECH GLOBAL brand mark.
        </p>
      </div>
    </div>
  );
}

