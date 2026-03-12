interface EmptyStateProps {
  title: string;
  subtitle?: string;
}

export default function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <div className="mt-8 flex items-center justify-center border border-dashed border-[#ddd] bg-[#fafafa] py-16">
      <div className="text-center">
        <p className="text-[#aaa]" style={{ fontSize: "14px" }}>
          {title}
        </p>
        {subtitle && (
          <p className="mt-2 text-[#ccc]" style={{ fontSize: "12px" }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
