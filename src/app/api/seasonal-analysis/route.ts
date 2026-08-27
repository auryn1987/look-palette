import type { NextRequest } from "next/server";

interface Characteristic {
  trait: string;
  rank: number;
  confidence: number;
  reasoning: string;
}

interface SeasonalPaletteResult {
  primary: string;
  confidence: number;
  reasoning: string;
  formula_applied?: boolean;
}

type Characteristics = Record<string, Characteristic>;

function calculateSeasonalPalette(characteristics: Characteristics) {
  const sortedCharacteristics = Object.entries(characteristics).sort(
    (left, right) => left[1].rank - right[1].rank,
  );

  const seasonalCombinations = {
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
  } as const;

  const traits = sortedCharacteristics.map((characteristic) => characteristic[1].trait);
  let calculatedSeason = "Light Spring";
  let usedCombination = "";

  const tryCombination = (left: string, right: string) => {
    const primary = `${left} + ${right}` as keyof typeof seasonalCombinations;
    const reverse = `${right} + ${left}` as keyof typeof seasonalCombinations;

    if (seasonalCombinations[primary]) {
      calculatedSeason = seasonalCombinations[primary];
      usedCombination = primary;
      return true;
    }

    if (seasonalCombinations[reverse]) {
      calculatedSeason = seasonalCombinations[reverse];
      usedCombination = reverse;
      return true;
    }

    return false;
  };

  if (traits.length >= 2) {
    tryCombination(traits[0], traits[1]);
  }

  if (calculatedSeason === "Light Spring" && traits.length >= 3) {
    tryCombination(traits[0], traits[2]);
  }

  if (calculatedSeason === "Light Spring" && traits.length >= 3) {
    tryCombination(traits[1], traits[2]);
  }

  const averageConfidence = Math.round(
    Object.values(characteristics).reduce(
      (sum, characteristic) => sum + characteristic.confidence,
      0,
    ) / 3,
  );

  return {
    primary: calculatedSeason,
    confidence: averageConfidence,
    reasoning: usedCombination
      ? `Based on ${usedCombination} characteristics`
      : "Default analysis",
  };
}

function applyFallbackFormula(analysis: {
  characteristics: Characteristics;
  seasonal_palette: SeasonalPaletteResult;
}) {
  const { characteristics, seasonal_palette } = analysis;

  const lowConfidence = Object.values(characteristics).some(
    (characteristic) => characteristic.confidence < 6,
  );

  if (!lowConfidence && seasonal_palette.confidence >= 6) {
    return analysis;
  }

  const value = characteristics.value.trait;
  const chroma = characteristics.chroma.trait;
  const hue = characteristics.hue.trait;

  let calculatedSeason = "Light Spring";

  if (value === "dark" && hue === "warm") {
    calculatedSeason = "Deep Autumn";
  } else if (value === "dark" && hue === "cool") {
    calculatedSeason = "Deep Winter";
  } else if (value === "light" && hue === "warm") {
    calculatedSeason = "Light Spring";
  } else if (value === "light" && hue === "cool") {
    calculatedSeason = "Light Summer";
  } else if (chroma === "muted" && hue === "warm") {
    calculatedSeason = "Soft Autumn";
  } else if (chroma === "muted" && hue === "cool") {
    calculatedSeason = "Soft Summer";
  } else if (chroma === "bright" && hue === "warm") {
    calculatedSeason = "Clear Spring";
  } else if (chroma === "bright" && hue === "cool") {
    calculatedSeason = "Clear Winter";
  }

  return {
    ...analysis,
    seasonal_palette: {
      ...analysis.seasonal_palette,
      primary: calculatedSeason,
      formula_applied: true,
    },
  };
}

export async function POST(request: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "OPENAI_API_KEY is not configured for image analysis." },
      { status: 503 },
    );
  }

  const body = (await request.json()) as { imageData?: string };
  if (!body.imageData) {
    return Response.json({ error: "No image data provided." }, { status: 400 });
  }

  const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a professional color analyst specializing in seasonal color theory.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze the person's natural coloring in this image.

Focus on these 3 characteristics:
1. VALUE: light or dark
2. CHROMA: muted or bright
3. HUE: warm or cool

Rank them from 1st (most prominent) to 3rd (least prominent).

Respond ONLY in this JSON format:
{
  "characteristics": {
    "value": {"trait": "light", "rank": 1, "confidence": 8, "reasoning": "brief explanation"},
    "chroma": {"trait": "bright", "rank": 2, "confidence": 7, "reasoning": "brief explanation"},
    "hue": {"trait": "warm", "rank": 3, "confidence": 6, "reasoning": "brief explanation"}
  }
}`,
            },
            {
              type: "image_url",
              image_url: { url: body.imageData },
            },
          ],
        },
      ],
    }),
  });

  if (!openaiResponse.ok) {
    return Response.json(
      { error: `OpenAI API error: ${openaiResponse.statusText}` },
      { status: 500 },
    );
  }

  const openaiData = (await openaiResponse.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const analysisText = openaiData.choices?.[0]?.message?.content;

  if (!analysisText) {
    return Response.json({ error: "No analysis received from OpenAI." }, { status: 500 });
  }

  let characteristics: Characteristics;

  try {
    const parsed = JSON.parse(analysisText) as { characteristics: Characteristics };
    characteristics = parsed.characteristics;
  } catch {
    const fallbackMatch = analysisText.match(/\{[\s\S]*\}/);

    if (!fallbackMatch) {
      return Response.json(
        { error: "Unable to parse the analysis response." },
        { status: 500 },
      );
    }

    const parsed = JSON.parse(fallbackMatch[0]) as {
      characteristics: Characteristics;
    };
    characteristics = parsed.characteristics;
  }

  const analysis = {
    characteristics,
    seasonal_palette: calculateSeasonalPalette(characteristics),
  };

  return Response.json({
    success: true,
    analysis: applyFallbackFormula(analysis),
    rawResponse: analysisText,
  });
}
