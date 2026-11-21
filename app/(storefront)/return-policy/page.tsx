import React from "react";
import { RotateCcw, ShieldCheck, CheckCircle } from "lucide-react";

export default function ReturnPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      <div className="text-center space-y-2 border-b border-[#D4A437]/30 pb-6">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A437]">
          Customer Confidence
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
          Returns & Refund Policy
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600">
          Our 30-Day Heritage Return Guarantee ensures absolute peace of mind.
        </p>
      </div>

      <div className="bg-white/80 rounded-xl border border-[#D4A437]/30 p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed shadow-xs">
        <div className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#7A0D2E]">1. 30-Day Return Guarantee</h2>
          <p>
            If a piece does not harmonize with your interior space, you may initiate a return within 30 days of documented delivery receipt. The item must be in its original, undamaged condition with all authentic artisan tags intact.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#7A0D2E]">2. Complimentary Return Pickup</h2>
          <p>
            Our global courier partners will schedule a direct doorstep pickup from your residence or office at a time convenient to you.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#7A0D2E]">3. Prompt Refunds</h2>
          <p>
            Upon inspection at our master facility, refunds are disbursed to your original payment gateway (Stripe or Razorpay) within 3 to 5 business days.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#7A0D2E]">4. Custom Commissions Exemption</h2>
          <p>
            Please note that bespoke pit-loom carpets custom-woven to client-specified architectural dimensions cannot be returned unless manufacturing discrepancies occur.
          </p>
        </div>
      </div>
    </div>
  );
}

