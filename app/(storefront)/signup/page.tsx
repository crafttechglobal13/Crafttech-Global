"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, User, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth/authContext";
import BrandLogo from "@/components/ui/BrandLogo";

export default function SignupPage() {
  const router = useRouter();
  const { signup, googleLogin } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agree) {
      setError("Please accept the terms and conditions.");
      return;
    }

    setLoading(true);
    const res = await signup(name, email, password);
    setLoading(false);
    if (res.success) {
      router.push("/account");
    } else {
      setError(res.error || "Signup failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-20">
      <div className="bg-white/85 rounded-xl border border-[#D4A437]/40 p-6 sm:p-8 shadow-md space-y-6">
        <div className="text-center space-y-2">
          <BrandLogo variant="full" size="md" className="mx-auto" />
          <span className="text-[10px] font-bold tracking-widest text-[#D4A437] uppercase block pt-1">
            Join CRAFTTECH GLOBAL
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">Create Account</h1>
          <p className="text-xs text-neutral-500">
            Enjoy personalized concierge service, expedited checkout, and order tracking.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-2.5 rounded text-xs border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="font-semibold text-neutral-800 block mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. Alexander Wright"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 pl-8 focus:outline-none focus:border-[#7A0D2E]"
              />
              <User className="w-4 h-4 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="font-semibold text-neutral-800 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="alexander@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 pl-8 focus:outline-none focus:border-[#7A0D2E]"
              />
              <Mail className="w-4 h-4 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="font-semibold text-neutral-800 block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 pl-8 focus:outline-none focus:border-[#7A0D2E]"
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="font-semibold text-neutral-800 block mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 pl-8 focus:outline-none focus:border-[#7A0D2E]"
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <label className="flex items-start gap-2 pt-1 text-[11px] text-neutral-600 cursor-pointer">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="accent-[#7A0D2E] mt-0.5"
            />
            <span>
              I accept the{" "}
              <Link href="/terms" className="text-[#7A0D2E] underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="text-[#7A0D2E] underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7A0D2E] text-white py-3 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-[#6B0B28] transition-colors shadow-sm disabled:opacity-50 mt-2"
          >
            {loading ? "Creating Account..." : "Register as Patron"}
          </button>
        </form>

        <div className="text-center text-xs text-neutral-600 pt-2 border-t border-neutral-100">
          Already have an account?{" "}
          <Link href="/login" className="text-[#7A0D2E] font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

