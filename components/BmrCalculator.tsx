"use client";

import { useState } from "react";

type Sex = "female" | "male";
type Goal = "maintenance" | "loss" | "gain";

const activityOptions = [
  { value: 1.2, label: "I don't really train yet", note: "Mostly sitting" },
  { value: 1.375, label: "1 to 2 times a week", note: "Lightly active" },
  { value: 1.55, label: "3 to 4 times a week", note: "Moderately active" },
  { value: 1.725, label: "5 to 6 times a week", note: "Very active" },
  { value: 1.9, label: "Every day, or twice a day", note: "Athlete level" },
];

const round10 = (n: number) => Math.round(n / 10) * 10;

export function BmrCalculator() {
  const [sex, setSex] = useState<Sex | null>(null);
  const [weight, setWeight] = useState(""); // kg
  const [height, setHeight] = useState(""); // cm
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
      setError("Please choose female or male first.");
      return;
    }
    if (!kg || !cm || !a || kg <= 0 || cm <= 0 || a < 14 || a > 100) {
      setError("Please enter a valid weight, height, and age.");
      return;
    }
    // Mifflin-St Jeor
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

  const goalResult = (() => {
    if (tdee === null || !goal) return null;
    if (goal === "maintenance") return { headline: "Your maintenance calories", value: `${tdee.toLocaleString()} kcal / day` };
    if (goal === "loss")
      return {
        headline: "Your fat loss calories (20 to 25% deficit)",
        value: `${round10(tdee * 0.75).toLocaleString()} to ${round10(tdee * 0.8).toLocaleString()} kcal / day`,
      };
    return {
      headline: "Your weight gain calories (20 to 25% surplus)",
      value: `${round10(tdee * 1.2).toLocaleString()} to ${round10(tdee * 1.25).toLocaleString()} kcal / day`,
    };
  })();

  const inputClass =
    "w-full rounded-[8px] border border-brown/25 bg-cream px-4 py-3 text-base text-espresso outline-none transition-colors placeholder:text-brown/45 focus-visible:border-red min-h-[48px]";
  const stepLabel = "label-eyebrow mb-3 block text-brown";

  return (
    <div className="rounded-[8px] border border-brown/15 bg-card p-6 shadow-[0_30px_60px_-40px_rgba(36,24,19,0.5)] sm:p-9">
      {/* Step 1: sex */}
      <div>
        <span className={stepLabel}>Step 1. Are you female or male?</span>
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
                className={`flex touch-manipulation select-none items-center justify-center gap-2 rounded-[8px] border-2 px-4 py-4 text-[1.02rem] font-semibold capitalize transition-colors min-h-[56px] ${
                  active ? "border-red bg-red/5 text-espresso" : "border-brown/15 bg-cream text-espresso"
                }`}
              >
                <span aria-hidden>{s === "female" ? "👩" : "👨"}</span>
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: data */}
      {sex ? (
        <div className="mt-8">
          <span className={stepLabel}>Step 2. Your details</span>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label htmlFor="bmr-w" className="mb-1.5 block text-xs text-brown">Weight (kg)</label>
              <input id="bmr-w" inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="63" className={inputClass} />
            </div>
            <div>
              <label htmlFor="bmr-h" className="mb-1.5 block text-xs text-brown">Height (cm)</label>
              <input id="bmr-h" inputMode="decimal" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="167" className={inputClass} />
            </div>
            <div>
              <label htmlFor="bmr-a" className="mb-1.5 block text-xs text-brown">Age</label>
              <input id="bmr-a" inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} placeholder="27" className={inputClass} />
            </div>
          </div>
          <button
            type="button"
            onClick={calcBmr}
            className="btn-sheen mt-5 inline-flex min-h-[52px] w-full items-center justify-center rounded-[8px] bg-red px-6 py-3 font-semibold text-card transition hover:bg-maroon"
          >
            Calculate my BMR
          </button>
          {error ? <p role="alert" className="mt-3 text-sm font-medium text-red">{error}</p> : null}
        </div>
      ) : null}

      {/* BMR result */}
      {bmr !== null ? (
        <div className="rise-in mt-6 rounded-[8px] bg-ink p-6 text-cream">
          <span className="label-eyebrow text-cream/60">Your BMR</span>
          <p className="mt-1 font-display text-4xl font-bold text-cream">
            {bmr.toLocaleString()} <span className="font-body text-base font-semibold text-cream/60">kcal / day</span>
          </p>
          <p className="mt-2 text-[0.9rem] leading-relaxed text-cream/70">This is the energy your body burns at complete rest. Next, let&apos;s factor in your training.</p>
        </div>
      ) : null}

      {/* Step 3: training frequency */}
      {bmr !== null ? (
        <div className="mt-8">
          <span className={stepLabel}>Step 3. How many times do you train per week?</span>
          <div className="grid gap-3">
            {activityOptions.map((opt) => {
              const active = activity === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => chooseActivity(opt.value)}
                  className={`flex touch-manipulation select-none items-center justify-between gap-3 rounded-[8px] border-2 px-5 py-4 text-start transition-colors min-h-[56px] ${
                    active ? "border-red bg-red/5" : "border-brown/15 bg-cream"
                  }`}
                >
                  <span className="font-medium text-espresso">{opt.label}</span>
                  <span className="label-eyebrow shrink-0 text-brown/60">{opt.note}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* TDEE result */}
      {tdee !== null ? (
        <div className="rise-in mt-6 rounded-[8px] bg-ink p-6 text-cream">
          <span className="label-eyebrow text-cream/60">Your maintenance (TDEE)</span>
          <p className="mt-1 font-display text-4xl font-bold text-cream">
            {tdee.toLocaleString()} <span className="font-body text-base font-semibold text-cream/60">kcal / day</span>
          </p>
          <p className="mt-2 text-[0.9rem] leading-relaxed text-cream/70">This is roughly what you burn in a day with your training. Now pick your goal.</p>
        </div>
      ) : null}

      {/* Step 4: goal */}
      {tdee !== null ? (
        <div className="mt-8">
          <span className={stepLabel}>Step 4. What is your goal?</span>
          <div className="grid gap-3">
            {[
              { v: "maintenance" as Goal, label: "Give me my maintenance calories", emoji: "⚖️" },
              { v: "loss" as Goal, label: "Fat loss (20 to 25% deficit)", emoji: "🔥" },
              { v: "gain" as Goal, label: "Weight gain (20 to 25% surplus)", emoji: "💪" },
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
          <p className="mt-2 font-display text-4xl font-bold text-espresso sm:text-5xl">{goalResult.value}</p>
          <p className="mx-auto mt-4 max-w-md text-[0.9rem] leading-relaxed text-brown">
            A starting estimate. The best results come from eating enough, training with a plan, and adjusting as you go. Want help with that?
          </p>
          <a
            href="/shift"
            className="btn-sheen mt-5 inline-flex min-h-[48px] items-center justify-center rounded-[8px] bg-red px-6 py-3 font-semibold text-card transition hover:bg-maroon hover:-translate-y-0.5"
          >
            Get my free guide
          </a>
        </div>
      ) : null}

      {sex ? (
        <button type="button" onClick={reset} className="mt-7 label-eyebrow text-brown/70 hover:text-red">
          Start over
        </button>
      ) : null}
    </div>
  );
}
