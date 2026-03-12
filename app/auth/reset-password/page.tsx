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

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
          <AuthStatus variant="success" title="Password Reset">
            Your password has been successfully updated. You can now sign in with your new password.
          </AuthStatus>

          <div className="mt-10">
            <AuthLinkButton href="/auth/login">Go to Sign In</AuthLinkButton>
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
          Enter your new password below.
        </p>

        <form
          className="mt-9"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}>
          <AuthInput
            label="New Password"
            type="password"
            placeholder="Create a new password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mt-7">
            <AuthInput
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your new password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

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
