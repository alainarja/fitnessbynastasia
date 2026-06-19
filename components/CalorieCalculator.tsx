"use client";

import { useState } from "react";
import { Button } from "./Button";

type Unit = "metric" | "imperial";
type Sex = "female" | "male";

const activities = [
  { value: 1.2, label: "Mostly sitting" },
  { value: 1.375, label: "Lightly active (1 to 3 days a week)" },
  { value: 1.55, label: "Moderately active (3 to 5 days a week)" },
  { value: 1.725, label: "Very active (6 to 7 days a week)" },
  { value: 1.9, label: "Athlete or physical job" },
];

/**
 * Daily energy calculator using the Mifflin-St Jeor equation.
 *   BMR (women) = 10*kg + 6.25*cm - 5*age - 161
 *   BMR (men)   = 10*kg + 6.25*cm - 5*age + 5
 *   Maintenance = BMR * activity factor
 * Framed health first: most women under eat, so this shows how much to FUEL.
 * Runs locally, nothing leaves the browser. Not medical or nutrition advice.
 */
export function CalorieCalculator() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [sex, setSex] = useState<Sex>("female");
  const [age, setAge] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightLb, setWeightLb] = useState("");
  const [activity, setActivity] = useState(1.375);
  const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null);
  const [error, setError] = useState("");

  function compute() {
    setError("");
    const a = parseFloat(age);
    let cm = 0;
    let kg = 0;

    if (unit === "metric") {
      cm = parseFloat(heightCm);
      kg = parseFloat(weightKg);
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      cm = (ft * 12 + inch) * 2.54;
      kg = parseFloat(weightLb) * 0.453592;
    }

    if (!a || !cm || !kg || a < 14 || a > 100 || cm <= 0 || kg <= 0) {
      setError("Please enter your age, height, and weight to see your numbers.");
      setResult(null);
      return;
    }

    const bmr = 10 * kg + 6.25 * cm - 5 * a + (sex === "male" ? 5 : -161);
    const tdee = bmr * activity;
    setResult({ bmr: Math.round(bmr / 10) * 10, tdee: Math.round(tdee / 10) * 10 });
  }

  const inputClass =
    "w-full rounded-[8px] border border-brown/25 bg-card px-4 py-3 text-base text-espresso outline-none transition-colors placeholder:text-brown/45 focus-visible:border-red min-h-[48px]";
  const pill = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${active ? "bg-red text-card" : "text-brown hover:text-espresso"}`;

  return (
    <div className="grid gap-8 rounded-[8px] border border-brown/15 bg-card p-6 sm:p-9 lg:grid-cols-2 lg:gap-12">
      {/* Inputs */}
      <div>
        <div className="flex flex-wrap gap-3">
          <div className="inline-flex rounded-full border border-brown/20 bg-cream p-1">
            <button type="button" onClick={() => { setSex("female"); setResult(null); }} className={pill(sex === "female")}>
              Woman
            </button>
            <button type="button" onClick={() => { setSex("male"); setResult(null); }} className={pill(sex === "male")}>
              Man
            </button>
          </div>
          <div className="inline-flex rounded-full border border-brown/20 bg-cream p-1">
            <button type="button" onClick={() => { setUnit("metric"); setResult(null); }} className={pill(unit === "metric")}>
              Metric
            </button>
            <button type="button" onClick={() => { setUnit("imperial"); setResult(null); }} className={pill(unit === "imperial")}>
              Imperial
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="cal-age" className="label-eyebrow mb-2 block text-brown">
              Age
            </label>
            <input id="cal-age" inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 28" className={inputClass} />
          </div>

          {unit === "metric" ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="cal-h-cm" className="label-eyebrow mb-2 block text-brown">
                  Height (cm)
                </label>
                <input id="cal-h-cm" inputMode="decimal" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} placeholder="165" className={inputClass} />
              </div>
              <div>
                <label htmlFor="cal-w-kg" className="label-eyebrow mb-2 block text-brown">
                  Weight (kg)
                </label>
                <input id="cal-w-kg" inputMode="decimal" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} placeholder="62" className={inputClass} />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="cal-ft" className="label-eyebrow mb-2 block text-brown">
                  Ft
                </label>
                <input id="cal-ft" inputMode="numeric" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} placeholder="5" className={inputClass} />
              </div>
              <div>
                <label htmlFor="cal-in" className="label-eyebrow mb-2 block text-brown">
                  In
                </label>
                <input id="cal-in" inputMode="numeric" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} placeholder="5" className={inputClass} />
              </div>
              <div>
                <label htmlFor="cal-lb" className="label-eyebrow mb-2 block text-brown">
                  Weight (lb)
                </label>
                <input id="cal-lb" inputMode="decimal" value={weightLb} onChange={(e) => setWeightLb(e.target.value)} placeholder="137" className={inputClass} />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="cal-act" className="label-eyebrow mb-2 block text-brown">
              Activity level
            </label>
            <select id="cal-act" value={activity} onChange={(e) => setActivity(parseFloat(e.target.value))} className={inputClass}>
              {activities.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button onClick={compute} size="lg" className="mt-6 w-full">
          Calculate my calories
        </Button>
        {error ? (
          <p role="alert" className="mt-3 text-sm font-medium text-red">
            {error}
          </p>
        ) : null}
      </div>

      {/* Result */}
      <div className="flex flex-col justify-center rounded-[8px] bg-ink p-7 text-cream">
        {result ? (
          <div className="rise-in">
            <span className="label-eyebrow text-cream/60">Eat around</span>
            <p className="mt-1 font-display text-6xl font-bold text-cream">
              {result.tdee.toLocaleString()}
              <span className="ml-2 align-middle font-body text-base font-semibold text-cream/60">kcal / day</span>
            </p>
            <p className="mt-2 font-display text-lg italic text-red">to maintain and fuel your training 💪</p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-cream/75">
              At rest your body uses about {result.bmr.toLocaleString()} kcal. Eating well below your maintenance is what keeps most women tired and stuck. Let&apos;s fuel your training, not starve it.
            </p>
            <Button href="/contact" size="md" className="mt-6">
              Build my plan with Nastasia
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <span aria-hidden className="text-5xl">🍽️</span>
            <p className="mx-auto mt-4 max-w-xs text-[0.95rem] leading-relaxed text-cream/70">
              Enter your details to see roughly how much to eat each day. Most women I coach are eating far too little.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
