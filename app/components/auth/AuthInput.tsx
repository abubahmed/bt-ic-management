import { InputHTMLAttributes, ReactNode } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelRight?: ReactNode;
}

export default function AuthInput({ label, labelRight, ...props }: AuthInputProps) {
  return (
    <div>
      <div className={labelRight ? "flex items-baseline justify-between" : ""}>
        <label
          className="block uppercase text-[#aaa]"
          style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.3em" }}>
          {label}
        </label>
        {labelRight}
      </div>
      <input
        {...props}
        className="mt-2 block w-full border border-[#ddd] bg-white text-[#333] outline-none placeholder:text-[#c5c5c5] focus:border-[#1c6a90]"
        style={{ height: "48px", padding: "0 16px", fontSize: "14px", fontWeight: 400 }}
      />
    </div>
  );
}
