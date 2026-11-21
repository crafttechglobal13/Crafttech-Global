import React from "react";
import { Truck, ShieldCheck, Globe, Clock } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      <div className="text-center space-y-2 border-b border-[#D4A437]/30 pb-6">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A437]">
          Logistics & Global Fulfillment
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
          Worldwide Shipping Policy
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600">
          White-glove international air couriers ensuring your heirloom pieces arrive in pristine condition.
        </p>
      </div>

      <div className="bg-white/80 rounded-xl border border-[#D4A437]/30 p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed shadow-xs">
        <div className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#7A0D2E]">1. Global Reach & Destinations</h2>
          <p>
            CRAFTTECH GLOBAL ships to patrons across 60+ countries, including the United States, United Kingdom, European Union, Middle East (UAE, Saudi Arabia, Qatar), Canada, Australia, and India.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#7A0D2E]">2. Transit Timelines & Carriers</h2>
          <p>
            Standard pieces are dispatched within 24 to 48 hours following thorough quality curation. International transit via DHL Express, FedEx Priority, or Blue Dart Apex takes approximately 3 to 7 business days door-to-door.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#7A0D2E]">3. Customs, Duties & Taxes</h2>
          <p>
            All prices displayed on CRAFTTECH GLOBAL for eligible retail orders are inclusive of customs tariffs and import duties where indicated. Patrons will experience seamless delivery without hidden fees at customs frontiers.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#7A0D2E]">4. Full Transit Insurance</h2>
          <p>
            Every single shipment is 100% insured against loss or damage during transit. If any piece arrives compromised, our concierge will arrange instant replacement or full restitution.
          </p>
        </div>
      </div>
    </div>
  );
}

