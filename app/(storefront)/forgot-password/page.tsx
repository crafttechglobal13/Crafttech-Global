"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, CheckCircle, ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth/authContext";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setError("");
    setLoading(true);
    const res = await resetPassword(email);
    setLoading(false);

    if (res.success) {
      setSent(true);
    } else {
      setError(res.error || "Failed to send reset link. Please check your email address.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-white/85 rounded-xl border border-[#D4A437]/40 p-6 sm:p-8 shadow-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">
            Reset Password
          </h1>
          <p className="text-xs text-neutral-500">
            Enter your registered email address to receive password recovery instructions.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-2.5 rounded text-xs border border-red-200">
            {error}
          </div>
        )}

        {sent ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle className="w-12 h-12 text-green-700 mx-auto" />
            <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">
              Recovery Email Dispatched
            </h3>
            <p className="text-xs text-neutral-600 max-w-xs mx-auto leading-relaxed">
              We have dispatched a secure password reset link to <strong>{email}</strong>. Check your inbox and spam folder.
            </p>
            <Link
              href="/login"
              className="inline-block mt-3 text-xs text-[#7A0D2E] font-semibold underline"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-neutral-800 block mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 pl-8 focus:outline-none focus:border-[#7A0D2E]"
                />
                <Mail className="w-4 h-4 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7A0D2E] text-white py-3 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-[#6B0B28] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
              <span>{loading ? "Dispatching..." : "Send Reset Link"}</span>
            </button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="text-neutral-500 hover:text-[#7A0D2E] inline-flex items-center gap-1 text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Login</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
