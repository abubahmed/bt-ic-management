"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-white px-5">
        <div className="w-full max-w-[400px]">
          <h1
            className="text-center uppercase text-[#222]"
            style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "0.35em" }}>
            2026 International Conference
          </h1>

          <div className="mt-12">
            <div className="flex justify-center">
              <div
                className="flex items-center justify-center rounded-full border-2 border-[#1c6a90] text-[#1c6a90]"
                style={{ width: "48px", height: "48px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>

            <h2
              className="mt-6 text-center uppercase text-[#1c6a90]"
              style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.3em" }}>
              Check Your Email
            </h2>

            <p
              className="mx-auto mt-4 max-w-[340px] text-center text-[#888]"
              style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.75 }}>
              If an account exists for <span className="text-[#333]" style={{ fontWeight: 500 }}>{email}</span>, we&apos;ve sent a link to reset your password.
            </p>
          </div>

          <div className="mt-10">
            <Link
              href="/auth/login"
              className="flex items-center justify-center border border-[#1c6a90] bg-[#1c6a90] uppercase text-white transition-all duration-300 hover:bg-white hover:text-[#1c6a90]"
              style={{ height: "48px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.35em" }}>
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-white px-5">
      <div className="w-full max-w-[400px]">
        <h1
          className="text-center uppercase text-[#222]"
          style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "0.35em" }}>
          2026 International Conference
        </h1>

        <p
          className="mx-auto mt-4 max-w-[320px] text-center text-[#888]"
          style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.75 }}>
          Enter your email and we&apos;ll send you a link to reset your password.
        </p>

        <form className="mt-12" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
          <div>
            <label
              className="block uppercase text-[#aaa]"
              style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.3em" }}>
              Email
            </label>
            <input
              type="email"
              placeholder="name@businesstoday.org"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full border border-[#ddd] bg-white text-[#333] outline-none placeholder:text-[#c5c5c5] focus:border-[#1c6a90]"
              style={{ height: "48px", padding: "0 16px", fontSize: "14px", fontWeight: 400 }}
            />
          </div>

          <button
            type="submit"
            className="mt-8 block w-full border border-[#1c6a90] bg-[#1c6a90] uppercase text-white transition-all duration-300 hover:bg-white hover:text-[#1c6a90]"
            style={{ height: "48px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.35em" }}>
            Reset Password
          </button>
        </form>

        <p className="mt-10 text-center text-[#aaa]" style={{ fontSize: "13px" }}>
          Remember your password?{" "}
          <Link href="/auth/login" className="text-[#1c6a90] hover:text-[#155a75]" style={{ fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
