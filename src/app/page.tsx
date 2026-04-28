import { ContactButton } from "@/components/ContactButton";
import { SectionTitle } from "@/components/SectionTitle";
import { SkillTag } from "@/components/SkillTag";

export default function Home() {
  const skills = [
    "UI Design",
    "Design System",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
  ];

  return (
    <main className="min-h-screen bg-[var(--color-base)] px-6 py-16 text-[var(--color-text)] sm:px-10">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 rounded-3xl border border-slate-200/70 bg-white/70 p-8 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.25)] backdrop-blur-sm sm:p-10">
        <SectionTitle>PORTFOLIO</SectionTitle>

        <p className="max-w-2xl text-[15px] leading-8 text-slate-600"></p>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <SkillTag key={skill} label={skill} />
          ))}
        </div>

        <div className="pt-2">
          <ContactButton href="#contact">お問い合わせはこちら</ContactButton>
        </div>
      </section>
    </main>
  );
}
