import { ReactNode } from "react";

export default function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 items-center justify-center px-5 py-8">
      <div className="w-full max-w-[420px] bg-white px-9 py-10">
        <h1
          className="text-center uppercase text-[#222]"
          style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "0.35em" }}>
          2026 International Conference
        </h1>
        <div className="mt-9">
          {children}
        </div>
      </div>
    </div>
  );
}
