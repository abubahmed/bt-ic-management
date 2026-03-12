"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AuthCard from "../../components/auth/AuthCard";
import AuthStatus from "../../components/auth/AuthStatus";
import AuthLinkButton from "../../components/auth/AuthLinkButton";

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-svh flex-col bg-[#1c6a90]">
      <Navbar
        links={[
          { label: "Sign In", href: "/auth/login" },
          { label: "Sign Up", href: "/auth/signup" },
        ]}
      />

      <AuthCard>
        <AuthStatus variant="error" title="Sign Up Failed">
          This could be because an account with this email already exists, or the email is not registered for the event.
          Please try signing in or contact your organization for assistance.
        </AuthStatus>

        <div className="mt-10 flex flex-col gap-4">
          <AuthLinkButton href="/auth/login">Go to Sign In</AuthLinkButton>
          <AuthLinkButton href="/auth/signup" variant="secondary">
            Try Again
          </AuthLinkButton>
        </div>
      </AuthCard>

      <Footer />
    </div>
  );
}
