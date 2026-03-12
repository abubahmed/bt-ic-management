"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AuthCard from "../../components/auth/AuthCard";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import AuthStatus from "../../components/auth/AuthStatus";
import AuthLinkButton from "../../components/auth/AuthLinkButton";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex min-h-svh flex-col bg-[#1c6a90]">
        <Navbar
          links={[
            { label: "Sign In", href: "/auth/login" },
            { label: "Sign Up", href: "/auth/signup" },
          ]}
        />

        <AuthCard>
          <AuthStatus variant="success" title="Check Your Email">
            If an account exists for{" "}
            <span className="text-[#333]" style={{ fontWeight: 500 }}>
              {email}
            </span>
            , we&apos;ve sent a link to reset your password.
          </AuthStatus>

          <div className="mt-10">
            <AuthLinkButton href="/auth/login">Back to Sign In</AuthLinkButton>
          </div>
        </AuthCard>

        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-svh flex-col bg-[#1c6a90]">
      <Navbar
        links={[
          { label: "Sign In", href: "/auth/login" },
          { label: "Sign Up", href: "/auth/signup" },
        ]}
      />

      <AuthCard>
        <p
          className="mx-auto max-w-[320px] text-center text-[#888]"
          style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.75 }}>
          Enter your email and we&apos;ll send you a link to reset your password.
        </p>

        <form
          className="mt-9"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}>
          <AuthInput
            label="Email"
            type="email"
            placeholder="name@businesstoday.org"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="mt-8">
            <AuthButton type="submit">Reset Password</AuthButton>
          </div>
        </form>

        <p className="mt-8 text-center text-[#aaa]" style={{ fontSize: "13px" }}>
          Remember your password?{" "}
          <Link href="/auth/login" className="text-[#1c6a90] hover:text-[#155a75]" style={{ fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </AuthCard>

      <Footer />
    </div>
  );
}
