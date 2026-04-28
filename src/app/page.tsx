import { ContactButton } from "@/components/ContactButton";
import { SectionTitle } from "@/components/SectionTitle";
import { SkillTag } from "@/components/SkillTag";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const skillGroups = [
    {
      category: "Frontend",
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
    {
      category: "Design",
      skills: ["UI Design", "Design System"],
    },
    {
      category: "Tools / Workflow",
      skills: ["Git/GitHub", "Vercel", "Accessibility", "Responsive Design"],
    },
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

        <div className="flex flex-col gap-5 pt-1.5 sm:gap-6 sm:pt-2">
          <div className="flex flex-col gap-4.5 sm:gap-5">
            {skillGroups.map((group) => (
              <div key={group.category} className="flex flex-col gap-2.5">
                <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-main)]/85 dark:text-blue-300/90">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {group.skills.map((skill) => (
                    <SkillTag key={`${group.category}-${skill}`} label={skill} />
                  ))}
                </div>
              </div>
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
