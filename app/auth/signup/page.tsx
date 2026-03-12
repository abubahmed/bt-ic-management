"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AuthCard from "../../components/auth/AuthCard";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="flex min-h-svh flex-col bg-[#1c6a90]">
      <Navbar
        links={[
          { label: "Sign In", href: "/auth/login" },
          { label: "Sign Up", href: "/auth/signup", active: true },
        ]}
      />

      <AuthCard>
        <form onSubmit={(e) => e.preventDefault()}>
          <AuthInput
            label="Email"
            type="email"
            placeholder="name@businesstoday.org"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="mt-7">
            <AuthInput
              label="Password"
              type="password"
              placeholder="Create a password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-7">
            <AuthInput
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="mt-8">
            <AuthButton type="submit">Create Account</AuthButton>
          </div>
        </form>

        <div className="my-8 flex items-center gap-5">
          <div className="h-px flex-1 bg-[#eaeaea]" />
          <span className="uppercase text-[#ccc]" style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.35em" }}>
            or
          </span>
          <div className="h-px flex-1 bg-[#eaeaea]" />
        </div>

        <AuthButton type="button" variant="secondary">
          <img src="/google.svg" alt="" className="h-4 w-4" aria-hidden="true" />
          Sign Up with Google
        </AuthButton>

        <p className="mt-8 text-center text-[#aaa]" style={{ fontSize: "13px" }}>
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#1c6a90] hover:text-[#155a75]" style={{ fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </AuthCard>

      <Footer />
    </div>
  );
}
