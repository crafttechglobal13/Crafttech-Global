"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "@/lib/auth/authContext";
import { authRateLimiter, sanitizeInput, isValidEmail } from "@/lib/security/authSecurity";
import BrandLogo from "@/components/ui/BrandLogo";

export default function LoginPage() {
  const router = useRouter();
  const { login, googleLogin, resendVerificationEmail, isFirebaseReady } = useAuth();
  const [email, setEmail] = useState("sarah.m@crafttechglobal.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Email verification state
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setUnverifiedEmail("");
    setResendStatus("");

    // 1. Input Sanitization (O(n) security canonicalization)
    const cleanEmail = sanitizeInput(email).toLowerCase();

    // 2. Strict Email Format Verification
    if (!isValidEmail(cleanEmail)) {
      setError("Please provide a valid electronic mail address format.");
      return;
    }

    // 3. Sliding Window Rate Limiting (O(1) Anti-Brute-Force defense)
    const rateCheck = authRateLimiter.check(`login:${cleanEmail}`, 5, 60000);
    if (!rateCheck.allowed) {
      setError(
        `Too many unsuccessful login attempts. For security reasons, please wait ${rateCheck.retryAfterSec} seconds before re-attempting.`
      );
      return;
    }

    setLoading(true);
    const res = await login(cleanEmail, password);
    setLoading(false);

    if (res.success) {
      // Clear rate limiting log upon successful authentication
      authRateLimiter.reset(`login:${cleanEmail}`);

      if (cleanEmail.includes("admin")) {
        router.push("/admin");
      } else {
        router.push("/account");
      }
    } else {
      // Record failed attempt in sliding window queue
      authRateLimiter.record(`login:${cleanEmail}`);

      if (res.requiresVerification) {
        setUnverifiedEmail(cleanEmail);
      }
      setError(res.error || "Failed to authenticate credentials.");
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setError("");
    setUnverifiedEmail("");
    const res = await googleLogin();
    setGoogleLoading(false);

    if (res.success) {
      router.push("/account");
    } else {
      setError(res.error || "Google sign-in could not be completed.");
    }
  };

  const handleResendVerification = async () => {
    setResending(true);
    setResendStatus("");
    const res = await resendVerificationEmail();
    setResending(false);
    if (res.success) {
      setResendStatus("A new verification link has been dispatched to your email. Check your inbox and spam folder.");
    } else {
      setResendStatus(res.error || "Unable to resend verification link at this moment.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-20">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#D4A437]/40 p-6 sm:p-8 shadow-md space-y-6">
        <div className="text-center space-y-2">
          <BrandLogo variant="full" size="md" className="mx-auto" />
          <span className="text-[10px] font-bold tracking-widest text-[#D4A437] uppercase block pt-1">
            Customer Login
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">Welcome Back</h1>
          <p className="text-xs text-neutral-500">Sign in to view your orders, saved addresses, and wishlist.</p>
        </div>

        {/* Email Verification Required Alert */}
        {unverifiedEmail && (
          <div className="bg-amber-50/90 border border-amber-300 text-amber-900 rounded-lg p-3.5 space-y-2.5 text-xs">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Email Verification Required</p>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Your account for <strong>{unverifiedEmail}</strong> requires email verification before accessing the portal.
                </p>
              </div>
            </div>

            {resendStatus ? (
              <p className="text-[11px] text-green-700 bg-green-50 p-2 rounded border border-green-200 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                {resendStatus}
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendVerification}
                disabled={resending}
                className="w-full bg-[#7A0D2E] text-white py-2 rounded text-[11px] font-semibold hover:bg-[#6B0B28] flex items-center justify-center gap-1.5 transition-colors"
              >
                {resending ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending New Link...</span>
                  </>
                ) : (
                  <span>Resend Verification Email</span>
                )}
              </button>
            )}
          </div>
        )}

        {/* General Error Message */}
        {error && !unverifiedEmail && (
          <div className="bg-red-50 text-red-700 p-2.5 rounded text-xs border border-red-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Real Continue with Google Button */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={googleLoading || loading}
          className="w-full bg-white border border-neutral-300 py-2.5 px-4 rounded-full text-xs font-semibold text-neutral-700 hover:bg-neutral-50 flex items-center justify-center gap-2.5 transition-colors shadow-2xs disabled:opacity-60"
        >
          {googleLoading ? (
            <RefreshCw className="w-4 h-4 text-neutral-500 animate-spin" />
          ) : (
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
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
          )}
          <span>{googleLoading ? "Connecting to Google..." : "Continue with Google"}</span>
        </button>

        {/* Clean Divider */}
        <div className="relative flex items-center my-5">
          <div className="flex-grow border-t border-neutral-200" />
          <span className="flex-shrink-0 mx-3 text-[11px] text-neutral-400 font-semibold uppercase tracking-wider whitespace-nowrap">
            Or continue with email
          </span>
          <div className="flex-grow border-t border-neutral-200" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-neutral-800 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 pl-8 focus:outline-none focus:border-[#7A0D2E]"
              />
              <Mail className="w-4 h-4 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
            <p className="text-[10px] text-neutral-400 mt-1">
              Tip: Use <strong>admin@crafttechglobal.com</strong> for Admin Panel.
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
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 pl-8 pr-10 focus:outline-none focus:border-[#7A0D2E]"
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              
              {/* Eye Button Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#7A0D2E] transition-colors p-1 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-neutral-600" />
                ) : (
                  <Eye className="w-4 h-4 text-neutral-400 hover:text-neutral-700" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full bg-[#7A0D2E] text-white py-3 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-[#6B0B28] transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In to Account"}
          </button>
        </form>

        <div className="text-center text-xs text-neutral-600 pt-2 border-t border-neutral-100">
          Don&apos;t have an account yet?{" "}
          <Link href="/signup" className="text-[#7A0D2E] font-bold hover:underline">
            Sign Up / Register
          </Link>
        </div>
      </div>
    </div>
  );
}
