interface SectionHeadingProps {
  children: string;
  size?: "lg" | "sm";
}

export default function SectionHeading({ children, size = "sm" }: SectionHeadingProps) {
  const isLg = size === "lg";

  return (
    <div>
      <h2
        className={`uppercase ${isLg ? "text-[#222]" : "text-[#1c6a90]"}`}
        style={{
          fontSize: isLg ? "18px" : "14px",
          fontWeight: 700,
          letterSpacing: "0.3em",
        }}>
        {children}
      </h2>
      <div className={`mt-1 h-px bg-[#1c6a90] ${isLg ? "w-10" : "w-8"}`} />
    </div>
  );
}
