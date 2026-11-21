"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Truck } from "lucide-react";
import { dbService } from "@/lib/database/db";
import { useCurrency } from "@/lib/currency/currencyContext";
import BrandLogo from "@/components/ui/BrandLogo";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "CG-2026-9812";
  const order = dbService.getOrderById(orderId);
  const { formatPrice } = useCurrency();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center space-y-8">
      {/* Brand Logo & Success Badge */}
      <div className="space-y-4">
        <BrandLogo variant="full" size="md" className="mx-auto" />
        <div className="w-16 h-16 rounded-full bg-[#FAF5EE] border-2 border-[#D4A437] flex items-center justify-center mx-auto text-[#7A0D2E] shadow-md">
          <CheckCircle className="w-8 h-8 text-[#7A0D2E]" />
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A437]">
          Payment & Order Confirmed
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
          Thank You For Celebrating Heritage
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto">
          Your order has been registered in the CRAFTTECH GLOBAL master ledger. A confirmation certificate and tracking itinerary have been dispatched to your email.
        </p>
      </div>

      {/* Order Summary Box */}
      <div className="bg-white/80 rounded-xl border border-[#D4A437]/40 p-6 sm:p-8 text-left shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">
              Official Order Reference
            </span>
            <span className="font-serif font-bold text-lg text-[#7A0D2E]">{orderId}</span>
          </div>
          <div>
            <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">
              Global Tracking Reference
            </span>
            <span className="font-mono text-xs font-bold text-[#0D2D5B]">
              {order?.trackingNumber || "EXP-984102GL"} ({order?.carrier || "DHL Express"})
            </span>
          </div>
          <div>
            <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">
              Total Amount Settled
            </span>
            <span className="font-bold text-sm text-[#1A1A1A]">
              {order ? formatPrice(order.total) : "$499.00"}
            </span>
          </div>
        </div>

        {order?.items && (
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-xs uppercase text-[#7A0D2E]">
              Registered Items:
            </h4>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded overflow-hidden bg-neutral-100 border">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#1A1A1A] block">{item.name}</span>
                    <span className="text-[11px] text-neutral-500">
                      Qty: {item.quantity} {item.size && `• Size: ${item.size}`}
                    </span>
                  </div>
                </div>
                <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        )}

        <div className="bg-[#FAF5EE] p-4 rounded border-l-4 border-[#D4A437] text-xs text-neutral-700 space-y-1">
          <span className="font-bold text-[#7A0D2E] uppercase text-[10px] block">
            Artisanal Preparation Notice:
          </span>
          <p>
            Your handmade selection is inspected by our quality curators in Jaipur and Bhadohi, wrapped in moisture-resistant muslin packaging, and dispatched within 48 hours.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <Link
          href="/account/orders"
          className="bg-[#7A0D2E] text-white px-7 py-3 rounded-full text-xs font-semibold hover:bg-[#6B0B28] transition-colors shadow-md flex items-center gap-2"
        >
          <Truck className="w-4 h-4" />
          <span>Track Order Status</span>
        </Link>
        <Link
          href="/shop"
          className="bg-transparent border border-[#7A0D2E] text-[#7A0D2E] px-7 py-3 rounded-full text-xs font-semibold hover:bg-[#7A0D2E] hover:text-white transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading Order Receipt...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
