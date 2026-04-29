"use client";

import { useState, type FormEvent } from "react";

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

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 450));
    setIsSubmitting(false);
    setSubmitted(true);
    setErrors({});
  }

  function handleReset() {
    setSubmitted(false);
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
  }

  if (submitted) {
    return (
      <div
        className="flex max-w-xl flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-6 dark:border-slate-600 dark:bg-slate-900/50"
        role="status"
        aria-live="polite"
      >
        <p className="text-base font-semibold text-[var(--color-main)]">
          送信ありがとうございます
        </p>
        <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">
          内容を確認のうえ、折り返しご連絡します。少々お待ちください。
        </p>
        <div className="pt-1">
          <button
            type="button"
            onClick={handleReset}
            className="text-sm font-medium text-[var(--color-main)] underline-offset-4 hover:underline"
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
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="text-sm font-medium text-slate-700 dark:text-slate-200">
          お名前
          <span className="ml-1 text-red-500" aria-hidden>
            *
          </span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="山田 太郎"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={`${fieldBase} ${errors.name ? fieldErr : fieldOk}`}
        />
        {errors.name ? (
          <p id="contact-name-error" className="text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-sm font-medium text-slate-700 dark:text-slate-200">
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
            setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={`${fieldBase} ${errors.email ? fieldErr : fieldOk}`}
        />
        {errors.email ? (
          <p id="contact-email-error" className="text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-slate-700 dark:text-slate-200">
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
            setErrors((prev) => ({ ...prev, message: undefined }));
          }}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${fieldBase} min-h-[8.5rem] resize-y ${errors.message ? fieldErr : fieldOk}`}
        />
        {errors.message ? (
          <p id="contact-message-error" className="text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>
      <div className="pt-1">
        <button
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
