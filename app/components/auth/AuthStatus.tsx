import { ReactNode } from "react";

interface AuthStatusProps {
  variant: "success" | "error";
  title: string;
  children: ReactNode;
}

export default function AuthStatus({ variant, title, children }: AuthStatusProps) {
  const color = variant === "success" ? "#1c6a90" : "#c0392b";

  return (
    <div>
      <div className="flex justify-center">
        <div
          className="flex items-center justify-center rounded-full border-2"
          style={{ width: "48px", height: "48px", borderColor: color, color }}>
          {variant === "success" ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </div>
      </div>

      <h2
        className="mt-6 text-center uppercase"
        style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.3em", color }}>
        {title}
      </h2>

      <p
        className="mx-auto mt-4 max-w-[340px] text-center text-[#888]"
        style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.75 }}>
        {children}
      </p>
    </div>
  );
}
