import { ContactButton } from "@/components/ContactButton";
import { ContactForm } from "@/components/ContactForm";
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
  const works = [
    {
      title: "Portfolio First View Design",
      summary:
        "自己紹介・スキル・問い合わせ導線が一画面で自然につながる、ポートフォリオのファーストビューを設計・実装しました。",
      improvement:
        "余白リズムと配色比率（70:20:5:5）を調整し、読みやすさを維持したまま CTA までの視線導線を短くしました。",
      impact:
        "初見でも「誰のサイトか」「何ができるか」が短時間で把握しやすい構成に改善。",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
      githubLabel: "GitHub: 準備中",
    },
    {
      title: "Dark / Light Theme Toggle UI",
      summary:
        "ヘッダー横から直感的に操作できる、ライト・ダークモード切り替えトグルを実装しました。",
      improvement:
        "マウント前の表示制御と初期テーマ反映を追加し、テーマ切替時のチラつきと表示ズレを抑えました。",
      impact:
        "モード切替後も表示が安定し、明るさの好みに合わせて継続閲覧しやすい体験を実現。",
      tech: ["Next.js", "React", "Tailwind CSS", "localStorage"],
      githubLabel: "GitHub: 準備中",
    },
    {
      title: "Skill Information Architecture",
      summary:
        "スキルを Frontend / Design / Tools・Workflow の3カテゴリに整理し、強みの全体像が短時間で伝わる構成にしました。",
      improvement:
        "タグ数を適正化（8〜12）し、見出しの強さ・折り返し・間隔を調整してスマホでも読みやすさを維持しました。",
      impact:
        "情報量を増やさずに比較しやすさを高め、採用担当が技術スタックを把握しやすい状態に改善。",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Accessibility"],
      githubLabel: "GitHub: 準備中",
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
                    <SkillTag
                      key={`${group.category}-${skill}`}
                      label={skill}
                    />
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

      <section className="mx-auto mt-8 flex w-full max-w-4xl flex-col gap-5 sm:mt-10 sm:gap-6">
        <SectionTitle>WORKS</SectionTitle>
        <div className="grid gap-4 sm:gap-5">
          {works.map((work) => (
            <article
              key={work.title}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200/75 bg-white/75 p-5 shadow-[0_16px_42px_-36px_rgba(15,23,42,0.55)] dark:border-slate-700/80 dark:bg-slate-900/65"
            >
              <h3 className="text-lg font-semibold tracking-tight text-[var(--color-main)]">
                {work.title}
              </h3>
              <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">
                {work.summary}
              </p>
              <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">
                {work.improvement}
              </p>
              <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">
                <span className="mr-1 font-semibold text-[var(--color-main)]">
                  成果:
                </span>
                {work.impact}
              </p>
              <div className="flex flex-wrap gap-2.5 pt-1">
                {work.tech.map((tech) => (
                  <SkillTag key={`${work.title}-${tech}`} label={tech} />
                ))}
              </div>
              <p className="pt-1 text-xs font-medium tracking-wide text-slate-500 dark:text-slate-400">
                {work.githubLabel}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto mt-8 flex w-full max-w-4xl scroll-mt-8 flex-col gap-4 rounded-3xl border border-slate-200/70 bg-white/70 p-8 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.25)] backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/65 dark:shadow-[0_22px_60px_-45px_rgba(2,6,23,0.85)] sm:mt-10 sm:gap-5 sm:p-10"
      >
        <SectionTitle>CONTACT</SectionTitle>
        <p className="max-w-[36ch] text-[15px] leading-8 text-slate-700 [text-wrap:pretty] [word-break:keep-all] dark:text-slate-200 sm:max-w-2xl">
          お仕事のご相談やポートフォリオについてのフィードバックなど、
          お気軽にメッセージをください。折り返しご連絡します。
        </p>
        <ContactForm />
      </section>
    </main>
  );
}
