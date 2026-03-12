import Link from "next/link";
import { ReactNode } from "react";

interface AuthLinkButtonProps {
  href: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
}

export default function AuthLinkButton({ href, variant = "primary", children }: AuthLinkButtonProps) {
  const base = "flex items-center justify-center uppercase transition-all duration-300";
  const variants = {
    primary:
      "border border-[#1c6a90] bg-[#1c6a90] text-white hover:bg-white hover:text-[#1c6a90]",
    secondary:
      "border border-[#222] text-[#222] hover:bg-[#222] hover:text-white",
  };

  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]}`}
      style={{ height: "48px", fontSize: "11px", fontWeight: 600, letterSpacing: variant === "primary" ? "0.35em" : "0.25em" }}>
      {children}
    </Link>
  );
}
