import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { BmrCalculator } from "@/components/BmrCalculator";

export const metadata: Metadata = {
  title: "Calorie calculator (BMR, TDEE, goals)",
  description:
    "Free calorie calculator using the Mifflin-St Jeor equation. Find your BMR, your maintenance calories (TDEE) based on how often you train, and your target for fat loss or weight gain.",
  alternates: { canonical: "/calculator" },
  openGraph: {
    title: "Free calorie calculator | Fitness by Nastasia",
    description: "Calculate your BMR, maintenance calories, and your fat loss or weight gain target.",
  },
};

export default function CalculatorPage() {
  return (
    <section className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <Eyebrow className="justify-center">Free tool</Eyebrow>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-balance">
            Calculate your <em className="font-display italic text-red">calories.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-brown">
            Using the Mifflin-St Jeor equation. Find your BMR, then your maintenance calories based on how much you train, then your target for fat loss or weight gain.
          </p>
        </div>

        <div className="mt-10">
          <BmrCalculator />
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-brown/60">
          These are general estimates and do not account for your full health picture. This is not medical or nutrition advice. For anything specific, please speak with your doctor or a dietitian.
        </p>
      </div>
    </section>
  );
}
