"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

/** 公開用 Google フォームの URL（.env.local に NEXT_PUBLIC_GOOGLE_FORM_URL=... で設定） */
const googleFormUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL ?? "";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const successCardRef = useRef<HTMLDivElement>(null);
  const successHeadingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!submitted) return;
    successCardRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
    const id = requestAnimationFrame(() => {
      successHeadingRef.current?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [submitted]);

  useEffect(() => {
    if (!submitError) return;
    const id = requestAnimationFrame(() => {
      submitButtonRef.current?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [submitError]);

  const fieldBase =
    "w-full rounded-xl border px-4 py-3 text-sm shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-2 dark:placeholder:text-slate-500";
  const fieldOk =
    "border-slate-200/90 bg-white/90 text-slate-800 focus:border-[var(--color-main)] focus:ring-[var(--color-main)]/25 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-100";
  const fieldErr =
    "border-red-400/90 bg-white/90 text-slate-800 focus:border-red-500 focus:ring-red-500/25 dark:border-red-500/70 dark:bg-slate-900/60 dark:text-slate-100";

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!name.trim()) {
      next.name = "お名前を入力してください";
    }
    if (!email.trim()) {
      next.email = "メールアドレスを入力してください";
    } else if (!isValidEmail(email)) {
      next.email = "正しいメールアドレスの形式で入力してください";
    }
    if (!message.trim()) {
      next.message = "本文を入力してください";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitted) return;
    if (!validate()) return;

    const payload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let message =
          "送信に失敗しました。しばらくしてからもう一度お試しください。";
        try {
          const data = (await response.json()) as { error?: string };
          if (typeof data.error === "string" && data.error) {
            message = data.error;
          }
        } catch {
          /* use default */
        }
        setSubmitError(message);
        return;
      }

      setSubmitted(true);
      setErrors({});
    } catch {
      setSubmitError(
        "ネットワークエラーが発生しました。接続を確認してからもう一度お試しください。",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setSubmitted(false);
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
    setSubmitError(null);
    queueMicrotask(() => nameInputRef.current?.focus());
  }

  if (submitted) {
    return (
      <div
        ref={successCardRef}
        id="contact-success"
        className="flex max-w-xl flex-col gap-4 scroll-mt-8 rounded-2xl border border-slate-200/80 bg-white/80 p-6 outline-none dark:border-slate-600 dark:bg-slate-900/50"
        role="status"
        aria-live="polite"
      >
        <p
          ref={successHeadingRef}
          id="contact-success-heading"
          tabIndex={-1}
          className="text-base font-semibold text-[var(--color-main)] outline-none"
        >
          送信が完了しました
        </p>
        <p className="text-sm leading-7 text-slate-700 [text-wrap:pretty] dark:text-slate-200">
          サーバーへの送信が完了しました。確実に連絡を取りたい場合は、Google
          フォームからもご送信ください。
        </p>
        {googleFormUrl ? (
          <>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              次のリンクは新しいタブで開きます。
            </p>
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-[var(--color-main)] bg-white/90 px-6 py-3 text-sm font-semibold text-[var(--color-main)] shadow-sm transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-[color-mix(in_oklab,var(--color-main)_8%,white)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-main)] dark:bg-slate-900/80 dark:hover:bg-[color-mix(in_oklab,var(--color-main)_18%,black)] sm:w-auto"
            >
              Googleフォームを開く
            </a>
          </>
        ) : (
          <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">
            Googleフォームの URL は、プロジェクト直下の{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px] dark:bg-slate-800">
              .env.local
            </code>{" "}
            に{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px] dark:bg-slate-800">
              NEXT_PUBLIC_GOOGLE_FORM_URL
            </code>{" "}
            を追加してください。
          </p>
        )}
        <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="text-left text-sm font-medium text-[var(--color-main)] underline-offset-4 hover:underline sm:text-center"
          >
            別の内容を送る
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-xl flex-col gap-5 pt-2"
      noValidate
      aria-busy={isSubmitting}
    >
      {submitError ? (
        <p
          className="rounded-xl border border-red-300/80 bg-red-50/90 px-4 py-3 text-sm leading-relaxed text-red-800 [text-wrap:pretty] [word-break:break-word] dark:border-red-500/50 dark:bg-red-950/40 dark:text-red-100"
          role="alert"
        >
          {submitError}
        </p>
      ) : null}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-name"
          className="text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          お名前
          <span className="ml-1 text-red-500" aria-hidden>
            *
          </span>
        </label>
        <input
          ref={nameInputRef}
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="山田 太郎"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setSubmitError(null);
            setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={`${fieldBase} ${errors.name ? fieldErr : fieldOk}`}
        />
        {errors.name ? (
          <p
            id="contact-name-error"
            className="text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {errors.name}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-email"
          className="text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          メールアドレス
          <span className="ml-1 text-red-500" aria-hidden>
            *
          </span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="hello@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setSubmitError(null);
            setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={`${fieldBase} ${errors.email ? fieldErr : fieldOk}`}
        />
        {errors.email ? (
          <p
            id="contact-email-error"
            className="text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {errors.email}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          本文
          <span className="ml-1 text-red-500" aria-hidden>
            *
          </span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="ご相談内容やご質問をお書きください"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setSubmitError(null);
            setErrors((prev) => ({ ...prev, message: undefined }));
          }}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          className={`${fieldBase} min-h-[8.5rem] resize-y ${errors.message ? fieldErr : fieldOk}`}
        />
        {errors.message ? (
          <p
            id="contact-message-error"
            className="text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {errors.message}
          </p>
        ) : null}
      </div>
      <div className="pt-1">
        <button
          ref={submitButtonRef}
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-main)] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-16px_rgba(37,99,235,0.65)] transition duration-300 ease-out hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-main)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {isSubmitting ? "送信中…" : "送信する"}
        </button>
      </div>
    </form>
  );
}
