"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  User,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldAlert,
} from "lucide-react";
import { useAuth } from "@/lib/auth/authContext";
import {
  authRateLimiter,
  sanitizeInput,
  isValidEmail,
  calculatePasswordEntropy,
} from "@/lib/security/authSecurity";
import BrandLogo from "@/components/ui/BrandLogo";

export default function SignupPage() {
  const router = useRouter();
  const { signup, googleLogin, resendVerificationEmail } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Verification step state
  const [verificationPending, setVerificationPending] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState("");

  // Real-time password entropy calculation (DSA bitmask)
  const passwordEntropy = calculatePasswordEntropy(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResendStatus("");

    // 1. Input Sanitization (O(n) linear scan)
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email).toLowerCase();

    // 2. Strict Email Verification
    if (!isValidEmail(cleanEmail)) {
      setError("Please provide a valid electronic mail address format.");
      return;
    }

    // 3. Password Integrity & Entropy Checks
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }
    if (password.length < 8) {
      setError("Password must contain at least 8 characters for account security.");
      return;
    }
    if (passwordEntropy.label === "Weak") {
      setError("Password is too weak. Please include a mix of uppercase, lowercase, numbers, and symbols.");
      return;
    }

    if (!agree) {
      setError("Please accept the terms and conditions to proceed.");
      return;
    }

    // 4. Sliding Window Anti-Abuse Rate Limiting
    const rateCheck = authRateLimiter.check("signup:rate", 5, 60000);
    if (!rateCheck.allowed) {
      setError(
        `Too many registration requests from this session. Please wait ${rateCheck.retryAfterSec} seconds before trying again.`
      );
      return;
    }

    setLoading(true);
    const res = await signup(cleanName, cleanEmail, password);
    setLoading(false);

    if (res.success) {
      authRateLimiter.reset("signup:rate");
      if (res.requiresVerification) {
        setRegisteredEmail(cleanEmail);
        setVerificationPending(true);
      } else {
        router.push("/account");
      }
    } else {
      authRateLimiter.record("signup:rate");
      setError(res.error || "Signup failed. Please try again.");
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setError("");
    const res = await googleLogin();
    setGoogleLoading(false);

    if (res.success) {
      router.push("/account");
    } else {
      setError(res.error || "Google sign-in could not be completed.");
    }
  };

  const handleResend = async () => {
    setResending(true);
    setResendStatus("");
    const res = await resendVerificationEmail();
    setResending(false);

    if (res.success) {
      setResendStatus("A fresh verification link has been sent to your email.");
    } else {
      setResendStatus(res.error || "Could not resend email right now. Please try logging in to trigger a new link.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-20">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#D4A437]/40 p-6 sm:p-8 shadow-md space-y-6">
        <div className="text-center space-y-2">
          <BrandLogo variant="full" size="md" className="mx-auto" />
          <span className="text-[10px] font-bold tracking-widest text-[#D4A437] uppercase block pt-1">
            Join CRAFTTECH GLOBAL
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">
            {verificationPending ? "Verify Your Email" : "Create Account"}
          </h1>
          <p className="text-xs text-neutral-500">
            {verificationPending
              ? "We've dispatched an activation link to your email address."
              : "Enjoy personalized concierge service, expedited checkout, and order tracking."}
          </p>
        </div>

        {/* Verification Success Screen */}
        {verificationPending ? (
          <div className="space-y-5 text-center py-2">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
              <Mail className="w-8 h-8" />
            </div>

            <div className="space-y-2 bg-[#FAF5EE] border border-[#D4A437]/30 rounded-lg p-4 text-left">
              <p className="text-xs font-semibold text-[#1A1A1A]">Verification Link Sent to:</p>
              <p className="text-xs font-mono font-bold text-[#7A0D2E] break-all">{registeredEmail}</p>
              <div className="pt-2 text-[11px] text-neutral-600 space-y-1.5 leading-relaxed">
                <p>1. Open your inbox and look for an email from <strong>CRAFTTECH GLOBAL / Firebase</strong>.</p>
                <p>2. Click the verification link to activate your customer credentials.</p>
                <p>3. Return here and log in to your account.</p>
              </div>
            </div>

            {resendStatus && (
              <div className="p-2.5 rounded text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-2 text-left">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{resendStatus}</span>
              </div>
            )}

            <div className="space-y-2 pt-2">
              <Link
                href="/login"
                className="w-full bg-[#7A0D2E] text-white py-3 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-[#6B0B28] transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Proceed to Login</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="w-full text-xs text-neutral-600 hover:text-[#7A0D2E] py-2 underline disabled:opacity-50"
              >
                {resending ? "Sending New Link..." : "Didn't receive the email? Resend verification link"}
              </button>
            </div>
          </div>
        ) : (
          <>
            {error && (
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
                Or register with email
              </span>
              <div className="flex-grow border-t border-neutral-200" />
            </div>

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
                <p className="text-[10px] text-neutral-400 mt-1">
                  A verification link will be sent to this email upon registration.
                </p>
              </div>

              <div>
                <label className="font-semibold text-neutral-800 block mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 pl-8 pr-10 focus:outline-none focus:border-[#7A0D2E]"
                  />
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  
                  {/* Password Eye Button Toggle */}
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

                {/* Password Strength Meter (DSA Entropy Score) */}
                {password.length > 0 && (
                  <div className="mt-1.5 space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-neutral-500">Security Strength:</span>
                      <span className={`font-bold ${
                        passwordEntropy.label === "Strong"
                          ? "text-emerald-700"
                          : passwordEntropy.label === "Good"
                          ? "text-amber-700"
                          : "text-red-600"
                      }`}>
                        {passwordEntropy.label}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${passwordEntropy.color}`}
                        style={{ width: `${passwordEntropy.score}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="font-semibold text-neutral-800 block mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 pl-8 pr-10 focus:outline-none focus:border-[#7A0D2E]"
                  />
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  
                  {/* Confirm Password Eye Button Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#7A0D2E] transition-colors p-1 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-neutral-600" />
                    ) : (
                      <Eye className="w-4 h-4 text-neutral-400 hover:text-neutral-700" />
                    )}
                  </button>
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
                disabled={loading || googleLoading}
                className="w-full bg-[#7A0D2E] text-white py-3 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-[#6B0B28] transition-colors shadow-sm disabled:opacity-50 mt-2"
              >
                {loading ? "Creating Account..." : "Create Account & Verify Email"}
              </button>
            </form>

            <div className="text-center text-xs text-neutral-600 pt-2 border-t border-neutral-100">
              Already have an account?{" "}
              <Link href="/login" className="text-[#7A0D2E] font-bold hover:underline">
                Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
