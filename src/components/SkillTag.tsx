type SkillTagProps = {
  label: string;
  className?: string;
};

export function SkillTag({ label, className = "" }: SkillTagProps) {
  return (
    <span
      className={`inline-flex max-w-full items-center rounded-full border border-[color-mix(in_oklab,var(--color-sub)_35%,white)] bg-[color-mix(in_oklab,var(--color-sub)_14%,white)] px-4 py-1.5 text-sm font-medium text-[var(--color-sub-strong)] break-words whitespace-pre-wrap dark:border-[color-mix(in_oklab,var(--color-sub)_30%,black)] dark:bg-[color-mix(in_oklab,var(--color-sub)_22%,black)] ${className}`}
    >
      {label}
    </span>
  );
}
