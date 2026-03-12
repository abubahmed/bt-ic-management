"use client";

import Link from "next/link";

export default function AuthErrorPage() {
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
              className="flex items-center justify-center rounded-full border-2 border-[#c0392b] text-[#c0392b]"
              style={{ width: "48px", height: "48px" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </div>

          <h2
            className="mt-6 text-center uppercase text-[#c0392b]"
            style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.3em" }}>
            Sign Up Failed
          </h2>

          <p
            className="mx-auto mt-4 max-w-[340px] text-center text-[#888]"
            style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.75 }}>
            This could be because an account with this email already exists, or the email is not registered for the event. Please try signing in or contact your organization for assistance.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Link
            href="/auth/login"
            className="flex items-center justify-center border border-[#1c6a90] bg-[#1c6a90] uppercase text-white transition-all duration-300 hover:bg-white hover:text-[#1c6a90]"
            style={{ height: "48px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.35em" }}>
            Go to Sign In
          </Link>

          <Link
            href="/auth/signup"
            className="flex items-center justify-center border border-[#222] uppercase text-[#222] transition-all duration-300 hover:bg-[#222] hover:text-white"
            style={{ height: "48px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.25em" }}>
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
}
