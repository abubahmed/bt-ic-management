"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AuthCard from "../../components/auth/AuthCard";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-svh flex-col bg-[#1c6a90]">
      <Navbar
        links={[
          { label: "Sign In", href: "/auth/login", active: true },
          { label: "Sign Up", href: "/auth/signup" },
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
              labelRight={
                <Link
                  href="/auth/forgot-password"
                  className="text-[#1c6a90] hover:text-[#155a75]"
                  style={{ fontSize: "11px", fontWeight: 500 }}>
                  Forgot password?
                </Link>
              }
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-8">
            <AuthButton type="submit">Sign In</AuthButton>
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
          Continue with Google
        </AuthButton>

        <p className="mt-8 text-center text-[#aaa]" style={{ fontSize: "13px" }}>
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-[#1c6a90] hover:text-[#155a75]" style={{ fontWeight: 600 }}>
            Create one here
          </Link>
        </p>
      </AuthCard>

      <Footer />
    </div>
  );
}
