import type { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
  className?: string;
};

export function SectionTitle({ children, className = "" }: SectionTitleProps) {
  return (
    <h2
      className={`flex items-center gap-4 text-2xl font-semibold tracking-tight text-[var(--color-main)] ${className}`}
    >
      <span
        aria-hidden
        className="h-10 w-1.5 rounded-full bg-[var(--color-main)]"
      />
      {children}
    </h2>
  );
}
