import { ButtonHTMLAttributes, ReactNode } from "react";

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: ReactNode;
}

export default function AuthButton({ variant = "primary", children, className, ...props }: AuthButtonProps) {
  const base = "flex w-full items-center justify-center gap-3 uppercase transition-all duration-300";
  const variants = {
    primary:
      "border border-[#1c6a90] bg-[#1c6a90] text-white hover:bg-white hover:text-[#1c6a90]",
    secondary:
      "border border-[#222] text-[#222] hover:bg-[#222] hover:text-white",
  };

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className || ""}`}
      style={{ height: "48px", fontSize: "11px", fontWeight: 600, letterSpacing: variant === "primary" ? "0.35em" : "0.25em", ...props.style }}>
      {children}
    </button>
  );
}
