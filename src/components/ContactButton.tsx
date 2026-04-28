import type { ReactNode } from "react";

type ContactButtonProps = {
  children: ReactNode;
  href?: string;
  className?: string;
};

export function ContactButton({
  children,
  href = "#contact",
  className = "",
}: ContactButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_10px_24px_-14px_rgba(251,191,36,0.8)] transition duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_14px_26px_-12px_rgba(251,191,36,0.85)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-main)] active:translate-y-0 ${className}`}
    >
      {children}
    </a>
  );
}
