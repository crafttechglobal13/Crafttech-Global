"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth/authContext";
import BrandLogo from "@/components/ui/BrandLogo";

export default function LoginPage() {
  const router = useRouter();
  const { login, googleLogin } = useAuth();
  const [email, setEmail] = useState("sarah.m@crafttechglobal.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      if (email.toLowerCase().includes("admin")) {
        router.push("/admin");
      } else {
        router.push("/account");
      }
    } else {
      setError(res.error || "Failed to authenticate.");
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    await googleLogin();
    setLoading(false);
    router.push("/account");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-20">
      <div className="bg-white/85 rounded-xl border border-[#D4A437]/40 p-6 sm:p-8 shadow-md space-y-6">
        <div className="text-center space-y-2">
          <BrandLogo variant="full" size="md" className="mx-auto" />
          <span className="text-[10px] font-bold tracking-widest text-[#D4A437] uppercase block pt-1">
            Customer Login
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">Welcome Back</h1>
          <p className="text-xs text-neutral-500">Sign in to view your orders, saved addresses, and wishlist.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-2.5 rounded text-xs border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-neutral-800 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 pl-8 focus:outline-none focus:border-[#7A0D2E]"
              />
              <Mail className="w-4 h-4 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
            <p className="text-[10px] text-neutral-400 mt-1">
              Tip: Use <strong>admin@crafttechglobal.com</strong> to test Admin Panel or any email for Customer Dashboard.
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-semibold text-neutral-800">Password</label>
              <Link href="/forgot-password" className="text-[11px] text-[#7A0D2E] hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 pl-8 focus:outline-none focus:border-[#7A0D2E]"
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7A0D2E] text-white py-3 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-[#6B0B28] transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In to Account"}
          </button>
        </form>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-neutral-200 w-full" />
          <span className="bg-[#FAF5EE] px-3 text-[11px] text-neutral-500 font-semibold uppercase">
            Or
          </span>
          <div className="border-t border-neutral-200 w-full" />
        </div>

        <button
          onClick={handleGoogle}
          className="w-full bg-white border border-neutral-300 py-2.5 rounded-full text-xs font-semibold text-neutral-700 hover:bg-neutral-50 flex items-center justify-center gap-2 transition-colors shadow-2xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="text-center text-xs text-neutral-600 pt-2">
          Don&apos;t have an account yet?{" "}
          <Link href="/signup" className="text-[#7A0D2E] font-bold hover:underline">
            Sign Up / Register
          </Link>
        </div>
      </div>
    </div>
  );
}

