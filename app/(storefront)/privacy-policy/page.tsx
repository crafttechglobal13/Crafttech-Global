import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      <div className="text-center space-y-2 border-b border-[#D4A437]/30 pb-6">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600">
          Last revised: November 2026 • CRAFTTECH GLOBAL Patron Data Security
        </p>
      </div>

      <div className="bg-white/80 rounded-xl border border-[#D4A437]/30 p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed shadow-xs">
        <p>
          CRAFTTECH GLOBAL values the privacy and security of our patrons. We strictly protect your personal identifying credentials, payment details, and shipping records in accordance with international GDPR and data protection laws.
        </p>
        <h3 className="font-serif font-bold text-[#7A0D2E] text-base">Payment Security</h3>
        <p>
          We do not store complete credit card or debit card numbers on our servers. All financial transactions are securely tokenized and handled directly by PCI-DSS Level 1 certified gateways (Stripe & Razorpay).
        </p>
      </div>
    </div>
  );
}

