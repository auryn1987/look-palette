"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SeasonBadge } from "@/components/season-badge";
import { allPaletteSummaries, getPaletteQuestionnaire } from "@/lib/site-data";

const questionnaire = getPaletteQuestionnaire();
const questions = questionnaire.questions;

const hairImageMap: Record<string, string> = {
  light_blonde: "platinum-blonde",
  golden_blonde: "golden-blonde",
  ash_blonde: "ash-blonde",
  light_brown: "light-golden-brown",
  medium_brown: "medium-warm-brown",
  dark_brown: "dark-chocolate",
  black: "jet-black",
  red_auburn: "rich-auburn",
};

interface Characteristic {
  trait: string;
  rank: number;
  confidence: number;
  reasoning: string;
}

interface AnalysisResult {
  characteristics: {
    value: Characteristic;
    hue: Characteristic;
    chroma: Characteristic;
  };
  seasonal_palette: {
    primary: string;
    confidence: number;
    reasoning: string;
  };
}

function getPaletteData(seasonName: string) {
  return (
    allPaletteSummaries.find((palette) => palette.name === seasonName) ??
    allPaletteSummaries[0]
  );
}

function getConfidenceLabel(confidence: number) {
  if (confidence >= 8) {
    return "High";
  }

  if (confidence >= 6) {
    return "Medium";
  }

  return "Low";
}

function getConfidenceColor(confidence: number) {
  if (confidence >= 8) {
    return "text-emerald-700";
  }

  if (confidence >= 6) {
    return "text-amber-700";
  }

  return "text-red-700";
}

function calculateSeason(characteristics: Record<string, Characteristic>) {
  const sortedCharacteristics = Object.entries(characteristics).sort(
    (left, right) => left[1].rank - right[1].rank,
  );

  const firstTrait = sortedCharacteristics[0][1].trait;
  const secondTrait = sortedCharacteristics[1][1].trait;

  const seasonMap: Record<string, string> = {
    "dark + warm": "Deep Autumn",
    "dark + cool": "Deep Winter",
    "light + warm": "Light Spring",
    "light + cool": "Light Summer",
    "muted + warm": "Soft Autumn",
    "muted + cool": "Soft Summer",
    "bright + warm": "Clear Spring",
    "bright + cool": "Clear Winter",
    "warm + muted": "Warm Autumn",
    "warm + bright": "Warm Spring",
    "cool + muted": "Cool Summer",
    "cool + bright": "Cool Winter",
  };

  let dominantTrait = firstTrait;
  let secondaryTrait = secondTrait;
  let combination = `${firstTrait} + ${secondTrait}`;

  if (["dark", "light", "muted", "bright"].includes(firstTrait)) {
    const warmCool = sortedCharacteristics.find((characteristic) =>
      ["warm", "cool"].includes(characteristic[1].trait),
    );

    if (warmCool) {
      secondaryTrait = warmCool[1].trait;
      combination = `${firstTrait} + ${secondaryTrait}`;
    }
  }

  if (["warm", "cool"].includes(firstTrait)) {
    const mutedBright = sortedCharacteristics.find((characteristic) =>
      ["muted", "bright"].includes(characteristic[1].trait),
    );

    if (mutedBright) {
      dominantTrait = firstTrait;
      secondaryTrait = mutedBright[1].trait;
      combination = `${dominantTrait} + ${secondaryTrait}`;
    }
  }

  return {
    season: seasonMap[combination] ?? "Light Spring",
    combination,
  };
}

export function SeasonalAnalysisTool() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  const currentQuestion = questions[currentStep];
  const paletteData = analysisResult
    ? getPaletteData(analysisResult.seasonal_palette.primary)
    : null;

  function selectAnswer(questionId: string, optionId: string) {
    setAnswers((current) => ({ ...current, [questionId]: optionId }));
    setError("");
  }

  function nextStep() {
    if (currentQuestion.required && !answers[currentQuestion.id]) {
      setError("Please select an answer to continue.");
      return;
    }

    setCurrentStep((step) => Math.min(step + 1, questions.length - 1));
  }

  function previousStep() {
    setCurrentStep((step) => Math.max(step - 1, 0));
    setError("");
  }

  function calculateFromAnswers() {
    const totals = { hue: 0, value: 0, chroma: 0, contrast: 0 };

    Object.entries(answers).forEach(([questionId, optionId]) => {
      const question = questions.find((item) => item.id === questionId);
      const option = question?.options.find((item) => item.id === optionId);

      if (!option?.deltas) {
        return;
      }

      Object.entries(option.deltas).forEach(([axis, delta]) => {
        totals[axis as keyof typeof totals] += Number(delta);
      });
    });

    const characteristicsData = [
      {
        key: "value",
        trait: totals.value >= 0 ? "dark" : "light",
        confidence: Math.min(10, Math.max(5, 5 + Math.abs(totals.value))),
        score: Math.abs(totals.value),
        reasoning: `Value score: ${totals.value}`,
      },
      {
        key: "hue",
        trait: totals.hue >= 0 ? "warm" : "cool",
        confidence: Math.min(10, Math.max(5, 5 + Math.abs(totals.hue))),
        score: Math.abs(totals.hue),
        reasoning: `Hue score: ${totals.hue}`,
      },
      {
        key: "chroma",
        trait: totals.chroma >= 0 ? "bright" : "muted",
        confidence: Math.min(10, Math.max(5, 5 + Math.abs(totals.chroma))),
        score: Math.abs(totals.chroma),
        reasoning: `Chroma score: ${totals.chroma}`,
      },
    ].sort((left, right) => right.score - left.score);

    const characteristics = {} as AnalysisResult["characteristics"];

    characteristicsData.forEach((characteristic, index) => {
      characteristics[characteristic.key as keyof AnalysisResult["characteristics"]] =
        {
          trait: characteristic.trait,
          rank: index + 1,
          confidence: characteristic.confidence,
          reasoning: characteristic.reasoning,
        };
    });

    const seasonResult = calculateSeason(characteristics);
    const averageConfidence = Math.round(
      (characteristics.value.confidence +
        characteristics.hue.confidence +
        characteristics.chroma.confidence) /
        3,
    );

    setAnalysisResult({
      characteristics,
      seasonal_palette: {
        primary: seasonResult.season,
        confidence: averageConfidence,
        reasoning: `Your palette is driven by the ${seasonResult.combination} combination from your answers.`,
      },
    });
  }

  function reset() {
    setCurrentStep(0);
    setAnswers({});
    setAnalysisResult(null);
    setError("");
  }

  return (
    <div className="space-y-10">
      {!analysisResult ? (
        <div className="surface rounded-[2rem] p-6 sm:p-8">
          <div className="mb-8">
            <div className="mb-2 flex justify-between text-sm text-stone-600">
              <span>
                Step {currentStep + 1} of {questions.length}
              </span>
              <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="h-2 rounded-full bg-stone-200">
              <div
                className="h-2 rounded-full bg-[var(--color-brand)] transition-all"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-stone-950">
              {currentQuestion.text}
            </h2>
            {currentQuestion.required ? (
              <p className="mt-2 text-sm text-stone-500">Required</p>
            ) : null}
            {"help" in currentQuestion && currentQuestion.help ? (
              <div className="mt-4 rounded-[1.5rem] border border-sky-200 bg-sky-50 p-4 text-sm leading-7 text-sky-900">
                {currentQuestion.help}
              </div>
            ) : null}
          </div>

          {currentQuestion.id === "hair_color" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {currentQuestion.options.map((option) => {
                const selected = answers[currentQuestion.id] === option.id;
                const imageName = hairImageMap[option.id];

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => selectAnswer(currentQuestion.id, option.id)}
                    className={`overflow-hidden rounded-[1.5rem] border-4 text-left transition ${
                      selected
                        ? "border-[var(--color-brand)] shadow-lg"
                        : "border-transparent hover:border-stone-200"
                    }`}
                  >
                    <div className="relative h-40">
                      <Image
                        src={`/hair/${imageName}.avif`}
                        alt={option.label}
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="bg-white px-4 py-3">
                      <p className="font-semibold text-stone-900">{option.label}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {currentQuestion.options.map((option) => {
                const selected = answers[currentQuestion.id] === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => selectAnswer(currentQuestion.id, option.id)}
                    className={`rounded-[1.5rem] border-2 p-5 text-left transition ${
                      selected
                        ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                        : "border-stone-200 bg-white hover:border-stone-300"
                    }`}
                  >
                    <p className="font-semibold text-stone-900">{option.label}</p>
                    {"examples" in option && option.examples ? (
                      <p className="mt-2 text-sm text-stone-600">
                        {option.examples.join(", ")}
                      </p>
                    ) : null}
                  </button>
                );
              })}
            </div>
          )}

          {error ? (
            <p className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={previousStep}
              disabled={currentStep === 0}
              className="rounded-full border border-stone-300 px-6 py-3 font-semibold text-stone-700 disabled:opacity-50"
            >
              Previous
            </button>
            {currentStep === questions.length - 1 ? (
              <button
                type="button"
                onClick={calculateFromAnswers}
                className="button-primary"
              >
                Get My Results
              </button>
            ) : (
              <button type="button" onClick={nextStep} className="button-primary">
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="surface rounded-[2rem] p-6 sm:p-8">
          {paletteData ? (
            <div className="mx-auto mb-8 max-w-xl overflow-hidden rounded-[1.75rem] border border-black/8 bg-white">
              <div className="relative aspect-square">
                <Image
                  src={paletteData.image}
                  alt={paletteData.name}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-10">
                {paletteData.bestColors.map((color) => (
                  <div
                    key={color}
                    className="aspect-square"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold">
                  Your seasonal palette is {paletteData.name}
                </h2>
                <p className="mt-3 leading-7 text-stone-600">{paletteData.description}</p>
                <Link
                  href={`/palettes/${paletteData.slug}`}
                  className="button-primary mt-5 w-full"
                >
                  View Palette
                </Link>
              </div>
            </div>
          ) : null}

          <div className="rounded-[1.5rem] bg-stone-50 p-5">
            <h3 className="text-xl font-semibold">Your Seasonal Palette</h3>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <SeasonBadge season={analysisResult.seasonal_palette.primary} />
              <p
                className={`text-sm font-semibold ${getConfidenceColor(
                  analysisResult.seasonal_palette.confidence,
                )}`}
              >
                {getConfidenceLabel(analysisResult.seasonal_palette.confidence)} (
                {analysisResult.seasonal_palette.confidence}/10)
              </p>
            </div>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              {analysisResult.seasonal_palette.reasoning}
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {Object.entries(analysisResult.characteristics)
              .sort((left, right) => left[1].rank - right[1].rank)
              .map(([key, value]) => (
                <div key={key} className="rounded-[1.5rem] border border-stone-200 bg-white p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm uppercase tracking-[0.16em] text-stone-500">
                        Rank {value.rank}
                      </p>
                      <p className="mt-1 text-lg font-semibold capitalize text-stone-950">
                        {key} ({value.trait})
                      </p>
                    </div>
                    <p className={`text-sm font-semibold ${getConfidenceColor(value.confidence)}`}>
                      {getConfidenceLabel(value.confidence)} ({value.confidence}/10)
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{value.reasoning}</p>
                </div>
              ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] bg-stone-50 p-5">
            <h3 className="text-lg font-semibold">How to use this result</h3>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              Value tells you whether light or dark colors feel more balanced on you.
              Hue points to warm versus cool undertones, and chroma measures whether
              crisp or muted shades look more natural.
            </p>
          </div>

          <button type="button" onClick={reset} className="button-primary mt-8 w-full">
            Start Over
          </button>
        </div>
      )}

      <div className="surface rounded-[2rem] p-6 sm:p-8">
        <h2 className="text-2xl font-semibold">Understanding the 12-season system</h2>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Value",
              description:
                "Measures whether your natural coloring is better supported by lighter or deeper shades.",
            },
            {
              title: "Hue",
              description:
                "Measures warmth versus coolness in your undertones, jewelry harmony, and overall complexion.",
            },
            {
              title: "Chroma",
              description:
                "Measures whether clear, bright colors or softened, muted colors feel more aligned with you.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[1.5rem] border border-stone-200 bg-white p-5">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 leading-7 text-stone-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
