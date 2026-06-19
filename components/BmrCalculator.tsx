"use client";

import { useState } from "react";
import { useLocale } from "./LocaleProvider";

type Sex = "female" | "male";
type Goal = "maintenance" | "loss" | "gain" | "recomp";

const factors = [1.2, 1.375, 1.55, 1.725, 1.9];
const round10 = (n: number) => Math.round(n / 10) * 10;
const fmt = (n: number) => n.toLocaleString("en-US");

export function BmrCalculator() {
  const { t } = useLocale();
  const c = t.calculator;

  const [sex, setSex] = useState<Sex | null>(null);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [bmr, setBmr] = useState<number | null>(null);
  const [activity, setActivity] = useState<number | null>(null);
  const [tdee, setTdee] = useState<number | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [error, setError] = useState("");

  function reset() {
    setSex(null);
    setWeight("");
    setHeight("");
    setAge("");
    setBmr(null);
    setActivity(null);
    setTdee(null);
    setGoal(null);
    setError("");
  }

  function calcBmr() {
    setError("");
    const kg = parseFloat(weight);
    const cm = parseFloat(height);
    const a = parseFloat(age);
    if (!sex) {
      setError(c.errSex);
      return;
    }
    if (!kg || !cm || !a || kg <= 0 || cm <= 0 || a < 14 || a > 100) {
      setError(c.errData);
      return;
    }
    const value = 10 * kg + 6.25 * cm - 5 * a + (sex === "male" ? 5 : -161);
    setBmr(round10(value));
    setActivity(null);
    setTdee(null);
    setGoal(null);
  }

  function chooseActivity(factor: number) {
    if (bmr === null) return;
    setActivity(factor);
    setTdee(round10(bmr * factor));
    setGoal(null);
  }

  const percents = [5, 10, 15, 20, 25];

  type Res = { headline: string; value?: string; rows?: { pct: string; kcal: string }[] };
  const goalResult: Res | null = (() => {
    if (tdee === null || !goal) return null;
    if (goal === "maintenance") return { headline: c.resMaintenance, value: `${fmt(tdee)} ${c.perDay}` };
    if (goal === "recomp")
      return { headline: c.resRecomp, value: `${fmt(round10(tdee * 0.9))} ${c.to} ${fmt(tdee)} ${c.perDay}` };
    if (goal === "loss")
      return {
        headline: c.resLoss,
        rows: percents.map((p) => ({ pct: `${p}% ${c.deficit}`, kcal: fmt(round10(tdee * (1 - p / 100))) })),
      };
    return {
      headline: c.resGain,
      rows: percents.map((p) => ({ pct: `${p}% ${c.surplus}`, kcal: fmt(round10(tdee * (1 + p / 100))) })),
    };
  })();

  const inputClass =
    "w-full rounded-[8px] border border-brown/25 bg-cream px-4 py-3 text-base text-espresso outline-none transition-colors placeholder:text-brown/45 focus-visible:border-red min-h-[48px]";
  const stepLabel = "label-eyebrow mb-3 block text-brown";

  return (
    <>
      <div className="rounded-[8px] border border-brown/15 bg-card p-6 shadow-[0_30px_60px_-40px_rgba(36,24,19,0.5)] sm:p-9">
        {/* Step 1: sex */}
        <div>
          <span className={stepLabel}>{c.step1}</span>
          <div className="grid grid-cols-2 gap-3">
            {(["female", "male"] as Sex[]).map((s) => {
              const active = sex === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSex(s);
                    setBmr(null);
                    setActivity(null);
                    setTdee(null);
                    setGoal(null);
                  }}
                  className={`flex touch-manipulation select-none items-center justify-center gap-2 rounded-[8px] border-2 px-4 py-4 text-[1.02rem] font-semibold transition-colors min-h-[56px] ${
                    active ? "border-red bg-red/5 text-espresso" : "border-brown/15 bg-cream text-espresso"
                  }`}
                >
                  <span aria-hidden>{s === "female" ? "👩" : "👨"}</span>
                  {s === "female" ? c.female : c.male}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: data */}
        {sex ? (
          <div className="mt-8">
            <span className={stepLabel}>{c.step2}</span>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label htmlFor="bmr-w" className="mb-1.5 block text-xs text-brown">{c.weight}</label>
                <input id="bmr-w" inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="63" className={inputClass} />
              </div>
              <div>
                <label htmlFor="bmr-h" className="mb-1.5 block text-xs text-brown">{c.height}</label>
                <input id="bmr-h" inputMode="decimal" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="167" className={inputClass} />
              </div>
              <div>
                <label htmlFor="bmr-a" className="mb-1.5 block text-xs text-brown">{c.age}</label>
                <input id="bmr-a" inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} placeholder="27" className={inputClass} />
              </div>
            </div>
            <button
              type="button"
              onClick={calcBmr}
              className="btn-sheen mt-5 inline-flex min-h-[52px] w-full items-center justify-center rounded-[8px] bg-red px-6 py-3 font-semibold text-card transition hover:bg-maroon"
            >
              {c.calcBtn}
            </button>
            {error ? <p role="alert" className="mt-3 text-sm font-medium text-red">{error}</p> : null}
          </div>
        ) : null}

        {/* BMR result */}
        {bmr !== null ? (
          <div className="rise-in mt-6 rounded-[8px] bg-ink p-6 text-cream">
            <span className="label-eyebrow text-cream/60">{c.bmrLabel}</span>
            <p className="mt-1 font-display text-4xl font-bold text-cream">
              {fmt(bmr)} <span className="font-body text-base font-semibold text-cream/60">{c.perDay}</span>
            </p>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-cream/70">{c.bmrNote}</p>
          </div>
        ) : null}

        {/* Step 3: training frequency */}
        {bmr !== null ? (
          <div className="mt-8">
            <span className={stepLabel}>{c.step3}</span>
            <div className="grid gap-3">
              {factors.map((factor, i) => {
                const active = activity === factor;
                return (
                  <button
                    key={factor}
                    type="button"
                    onClick={() => chooseActivity(factor)}
                    className={`flex touch-manipulation select-none items-center justify-between gap-3 rounded-[8px] border-2 px-5 py-4 text-start transition-colors min-h-[56px] ${
                      active ? "border-red bg-red/5" : "border-brown/15 bg-cream"
                    }`}
                  >
                    <span className="font-medium text-espresso">{c.act[i].label}</span>
                    <span className="label-eyebrow shrink-0 text-brown/60">{c.act[i].note}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* TDEE result */}
        {tdee !== null ? (
          <div className="rise-in mt-6 rounded-[8px] bg-ink p-6 text-cream">
            <span className="label-eyebrow text-cream/60">{c.tdeeLabel}</span>
            <p className="mt-1 font-display text-4xl font-bold text-cream">
              {fmt(tdee)} <span className="font-body text-base font-semibold text-cream/60">{c.perDay}</span>
            </p>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-cream/70">{c.tdeeNote}</p>
          </div>
        ) : null}

        {/* Step 4: goal */}
        {tdee !== null ? (
          <div className="mt-8">
            <span className={stepLabel}>{c.step4}</span>
            <div className="grid gap-3">
              {[
                { v: "maintenance" as Goal, label: c.goalMaintenance, emoji: "⚖️" },
                { v: "recomp" as Goal, label: c.goalRecomp, emoji: "🔄" },
                { v: "loss" as Goal, label: c.goalLoss, emoji: "🔥" },
                { v: "gain" as Goal, label: c.goalGain, emoji: "💪" },
              ].map((g) => {
                const active = goal === g.v;
                return (
                  <button
                    key={g.v}
                    type="button"
                    onClick={() => setGoal(g.v)}
                    className={`flex touch-manipulation select-none items-center gap-3 rounded-[8px] border-2 px-5 py-4 text-start transition-colors min-h-[56px] ${
                      active ? "border-red bg-red/5" : "border-brown/15 bg-cream"
                    }`}
                  >
                    <span aria-hidden className="text-xl">{g.emoji}</span>
                    <span className="font-medium text-espresso">{g.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Final result */}
        {goalResult ? (
          <div className="rise-in mt-6 rounded-[8px] border-2 border-red bg-red/5 p-7 text-center">
            <span className="label-eyebrow text-red">{goalResult.headline}</span>
            {goalResult.rows ? (
              <div className="mx-auto mt-4 max-w-sm divide-y divide-red/15 text-start">
                {goalResult.rows.map((r) => (
                  <div key={r.pct} className="flex items-baseline justify-between gap-4 py-2.5">
                    <span className="label-eyebrow text-brown">{r.pct}</span>
                    <span className="font-display text-2xl font-bold text-espresso">
                      {r.kcal} <span className="font-body text-xs font-semibold text-brown/60">{c.perDay}</span>
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 font-display text-4xl font-bold text-espresso sm:text-5xl">{goalResult.value}</p>
            )}
            <p className="mx-auto mt-4 max-w-md text-[0.9rem] leading-relaxed text-brown">{c.resultNote}</p>
            <a
              href="/shift"
              className="btn-sheen mt-5 inline-flex min-h-[48px] items-center justify-center rounded-[8px] bg-red px-6 py-3 font-semibold text-card transition hover:bg-maroon hover:-translate-y-0.5"
            >
              {c.cta}
            </a>
          </div>
        ) : null}

        {sex ? (
          <button type="button" onClick={reset} className="mt-7 label-eyebrow text-brown/70 hover:text-red">
            {c.startOver}
          </button>
        ) : null}
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-brown/60">{c.disclaimer}</p>
    </>
  );
}
