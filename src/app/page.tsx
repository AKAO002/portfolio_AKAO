import { ContactButton } from "@/components/ContactButton";
import { SectionTitle } from "@/components/SectionTitle";
import { SkillTag } from "@/components/SkillTag";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const skills = [
    "UI Design",
    "Design System",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
  ];

  return (
    <main className="min-h-screen bg-[var(--color-base)] px-6 py-14 text-[var(--color-text)] sm:px-10 sm:py-16">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-3xl border border-slate-200/70 bg-white/70 p-8 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.25)] backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/65 dark:shadow-[0_22px_60px_-45px_rgba(2,6,23,0.85)] sm:gap-7 sm:p-10">
        <div className="flex items-center justify-between gap-4">
          <SectionTitle>PORTFOLIO</SectionTitle>
          <ThemeToggle />
        </div>

        <div className="flex flex-col gap-3 sm:gap-3.5">
          <p className="text-[2rem] font-semibold leading-tight tracking-tight text-[var(--color-main)]">
            AKAO
          </p>
          <p className="text-base font-medium text-slate-700 dark:text-slate-200">
            エンジニア目指して日々精進中＆就活中
          </p>
          <p className="max-w-[36ch] text-[15px] leading-8 text-slate-700 [text-wrap:pretty] [word-break:keep-all] dark:text-slate-200 sm:max-w-2xl">
            北欧モダンな雰囲気と、ゆったりした使い心地を大切にしながら、
            見る人にやさしい Web サイトを制作しています。
          </p>
        </div>

        <div className="flex flex-col gap-6 pt-2 sm:gap-7">
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <SkillTag key={skill} label={skill} />
            ))}
          </div>
          <div>
            <ContactButton href="#contact">まずは気軽に相談する</ContactButton>
          </div>
        </div>
      </section>
    </main>
  );
}
