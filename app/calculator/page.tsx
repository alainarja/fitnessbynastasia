import type { Metadata } from "next";
import { CalculatorIntro } from "@/components/CalculatorIntro";
import { BmrCalculator } from "@/components/BmrCalculator";

export const metadata: Metadata = {
  title: "Calorie calculator (BMR, TDEE, goals)",
  description:
    "Free calorie calculator using the Mifflin-St Jeor equation. Find your BMR, your maintenance calories (TDEE) based on how often you train, and your target for fat loss, weight gain, or body recomposition.",
  alternates: { canonical: "/calculator" },
  openGraph: {
    title: "Free calorie calculator | Fitness by Nastasia",
    description: "Calculate your BMR, maintenance calories, and your fat loss, weight gain, or recomposition target.",
  },
};

export default function CalculatorPage() {
  return (
    <section className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <CalculatorIntro />
        <div className="mt-10">
          <BmrCalculator />
        </div>
      </div>
    </section>
  );
}
