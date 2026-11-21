"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, ShoppingBag, ShieldCheck } from "lucide-react";

export default function OrderFailedPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto border border-red-300">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
          Payment Processing Interrupted
        </h1>
        <p className="text-xs text-neutral-600">
          Your card or financial provider declined the settlement attempt. No funds have been debited from your account.
        </p>
      </div>

      <div className="space-y-3 pt-2">
        <Link
          href="/checkout"
          className="w-full bg-[#7A0D2E] text-white py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#6B0B28]"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Checkout / Switch Payment</span>
        </Link>
        <Link
          href="/cart"
          className="w-full bg-white border border-neutral-300 text-neutral-700 py-3 rounded-full text-xs font-semibold uppercase tracking-wider block"
        >
          Return to Cart
        </Link>
      </div>
    </div>
  );
}

