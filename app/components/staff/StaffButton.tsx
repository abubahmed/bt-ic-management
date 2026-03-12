import { ButtonHTMLAttributes, ReactNode } from "react";

interface StaffButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  children: ReactNode;
}

export default function StaffButton({ variant = "primary", children, className, ...props }: StaffButtonProps) {
  const base = "uppercase transition-all duration-300";
  const variants = {
    primary: "border border-[#1c6a90] bg-[#1c6a90] text-white hover:bg-white hover:text-[#1c6a90]",
    secondary: "border border-[#222] text-[#222] hover:bg-[#222] hover:text-white",
    danger: "border border-[#c0392b] bg-[#c0392b] text-white hover:bg-white hover:text-[#c0392b]",
  };

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${props.disabled ? "cursor-not-allowed opacity-30" : ""} ${
        className || ""
      }`}
      style={{
        height: "44px",
        padding: "0 24px",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.25em",
        ...props.style,
      }}>
      {children}
    </button>
  );
}
