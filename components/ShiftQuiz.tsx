"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useLocale } from "./LocaleProvider";
import {
  getQuiz,
  getQuizIntro,
  getQuizContact,
  getQuizUi,
  readinessFromInterest,
  type QuizOption,
  type QuizQuestion,
} from "@/content/quiz";

type Answer = { value: string; label: string; tag: string };
type Answers = Record<string, Answer>;

export function ShiftQuiz() {
  const { locale } = useLocale();
  const questions = getQuiz(locale);
  const intro = getQuizIntro(locale);
  const contact = getQuizContact(locale);
  const ui = getQuizUi(locale);
  const TOTAL = questions.length;

  const router = useRouter();
  const [step, setStep] = useState(0); // 0..TOTAL-1 = questions, TOTAL = contact
  const [answers, setAnswers] = useState<Answers>({});
  const [selecting, setSelecting] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  const isContact = step === TOTAL;
  const progress = Math.round((step / (TOTAL + 1)) * 100) + (isContact ? Math.round(100 / (TOTAL + 1)) : 0);

  function choose(q: QuizQuestion, opt: QuizOption) {
    setSelecting(opt.value);
    setAnswers((prev) => ({ ...prev, [q.id]: { value: opt.value, label: opt.label, tag: opt.tag } }));
    window.setTimeout(() => {
      setSelecting(null);
      setStep((s) => s + 1);
    }, 280);
  }

  function back() {
    setError("");
    setStep((s) => Math.max(0, s - 1));
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();

    if (!email && !phone) {
      setStatus("error");
      setError(contact.needContact);
      return;
    }

    setStatus("submitting");
    setError("");

    const answerMap: Record<string, string> = {};
    const tags: string[] = [];
    for (const q of questions) {
      const a = answers[q.id];
      if (a) {
        answerMap[q.id] = a.value;
        tags.push(a.tag);
      }
    }
    const interest = answers["interest"]?.value;
    const readiness = readinessFromInterest(interest);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone,
          firstName: String(data.get("firstName") || ""),
          company: String(data.get("company") || ""), // honeypot
          source: "shift-quiz",
          locale,
          answers: answerMap,
          tags,
          interest: interest || "",
          readiness,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.ok) throw new Error(json?.error || ui.error);
      router.push(`/shift/thank-you?next=${encodeURIComponent(readiness)}`);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : ui.error);
    }
  }

  const inputClass =
    "min-h-[52px] w-full rounded-[8px] border border-brown/25 bg-cream px-4 py-3 text-base text-espresso outline-none transition-colors placeholder:text-brown/45 focus-visible:border-red";

  return (
    <div className="rounded-[8px] border border-brown/15 bg-card p-6 shadow-[0_30px_60px_-40px_rgba(36,24,19,0.5)] sm:p-9">
      {/* Progress */}
      <div className="mb-7">
        <div className="mb-2 flex items-center justify-between">
          <span className="label-eyebrow text-brown/70">
            {isContact ? ui.lastStep : `${intro.stepLabel} ${step + 1} ${ui.of} ${TOTAL}`}
          </span>
          <span className="label-eyebrow text-red">{progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-cream-deep">
          <div className="h-full rounded-full bg-red transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {!isContact ? (
        <div key={step} className="rise-in">
          {(() => {
            const q = questions[step];
            return (
              <>
                <h2 className="text-3xl sm:text-4xl text-balance">
                  {q.lead} {q.emphasis ? <em className="font-display italic text-red">{q.emphasis}</em> : null}
                </h2>
                {q.helper ? <p className="mt-3 text-sm text-brown">{q.helper}</p> : null}

                <div className="mt-7 grid gap-3" role="group" aria-label={q.lead}>
                  {q.options.map((opt) => {
                    const selected = answers[q.id]?.value === opt.value;
                    const flashing = selecting === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => choose(q, opt)}
                        className={`group flex touch-manipulation select-none items-center gap-4 rounded-[8px] border-2 px-5 py-4 text-start transition-all duration-200 min-h-[62px] ${
                          selected || flashing ? "border-red bg-red/5" : "border-brown/15 bg-cream hover:border-red/60 hover:bg-red/[0.03]"
                        }`}
                      >
                        <span aria-hidden className="pointer-events-none flex h-9 w-9 shrink-0 items-center justify-center">
                          <span data-flash={flashing ? "true" : undefined} className="emoji-pop text-2xl leading-none">
                            {opt.emoji}
                          </span>
                        </span>
                        <span className="min-w-0 flex-1 text-[1.02rem] font-medium text-espresso">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            );
          })()}

          {step > 0 ? (
            <button type="button" onClick={back} className="mt-7 inline-flex items-center gap-2 label-eyebrow text-brown/70 hover:text-red">
              <span aria-hidden className="rtl:rotate-180">&larr;</span> {ui.back}
            </button>
          ) : null}
        </div>
      ) : (
        <div key="contact" className="rise-in">
          <span className="label-eyebrow mb-4 inline-block rounded-full bg-red/10 px-3 py-1.5 text-red">{contact.badge}</span>
          <h2 className="text-3xl sm:text-4xl text-balance">
            {contact.lead} <em className="font-display italic text-red">{contact.emphasis}</em>
          </h2>
          <p className="mt-3 text-brown">{contact.sub}</p>

          <form onSubmit={submit} noValidate className="mt-7 space-y-3">
            <label htmlFor="quiz-fn" className="sr-only">
              {contact.namePlaceholder}
            </label>
            <input id="quiz-fn" name="firstName" type="text" autoComplete="given-name" placeholder={contact.namePlaceholder} className={inputClass} />

            <label htmlFor="quiz-em" className="sr-only">
              {contact.emailPlaceholder}
            </label>
            <input id="quiz-em" name="email" type="email" autoComplete="email" placeholder={contact.emailPlaceholder} className={inputClass} />

            <label htmlFor="quiz-ph" className="sr-only">
              {contact.phonePlaceholder}
            </label>
            <input id="quiz-ph" name="phone" type="tel" autoComplete="tel" placeholder={contact.phonePlaceholder} className={inputClass} />

            <p className="text-xs text-brown/60">{contact.orText}</p>

            {/* Honeypot */}
            <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="quiz-co">Company</label>
              <input id="quiz-co" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-sheen inline-flex min-h-[54px] w-full items-center justify-center rounded-[8px] bg-red px-6 py-4 font-semibold text-card transition hover:bg-maroon hover:-translate-y-0.5 disabled:opacity-70"
            >
              {status === "submitting" ? contact.sending : contact.button}
            </button>
            <p className="text-xs text-brown/70">{contact.reassurance}</p>

            {status === "error" ? (
              <p role="alert" className="text-sm font-medium text-red">
                {error}
              </p>
            ) : null}
          </form>

          <button type="button" onClick={back} className="mt-6 inline-flex items-center gap-2 label-eyebrow text-brown/70 hover:text-red">
            <span aria-hidden className="rtl:rotate-180">&larr;</span> {ui.back}
          </button>
        </div>
      )}
    </div>
  );
}
