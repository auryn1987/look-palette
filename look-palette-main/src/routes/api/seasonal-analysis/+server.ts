import { json } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		console.log('API endpoint called');
		const { imageData } = await request.json();
		console.log('Image data received, length:', imageData?.length);

		if (!imageData) {
			console.log('No image data provided');
			return json({ error: 'No image data provided' }, { status: 400 });
		}

		// OpenAI API call for seasonal color analysis
		console.log('Calling OpenAI API...');
		const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${OPENAI_API_KEY}`
			},
			body: JSON.stringify({
				model: 'gpt-4o',
				temperature: 0,
				response_format: { type: 'json_object' },
				messages: [
					{
						role: 'system',
						content: 'You are a professional color analyst specializing in seasonal color theory.'
					},
					{
						role: 'user',
						content: [
							{
								type: 'text',
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
}`
							},
							{
								type: 'image_url',
								image_url: {
									url: imageData
								}
							}
						]
					}
				]
			})
		});

		console.log('OpenAI response status:', openaiResponse.status);
		if (!openaiResponse.ok) {
			console.log('OpenAI API error:', openaiResponse.statusText);
			throw new Error(`OpenAI API error: ${openaiResponse.statusText}`);
		}

		const openaiData = await openaiResponse.json();
		console.log('OpenAI response received');
		const analysisText = openaiData.choices[0]?.message?.content;
		console.log('Analysis text length:', analysisText?.length);

		if (!analysisText) {
			throw new Error('No analysis received from OpenAI');
		}

		// Parse the JSON response from OpenAI
		let characteristics;
		try {
			// Try to parse the response directly as JSON first
			const response = JSON.parse(analysisText);
			characteristics = response.characteristics;
		} catch (directParseError) {
			try {
				// If direct parsing fails, try to extract JSON from the response
				const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
				if (jsonMatch) {
					const response = JSON.parse(jsonMatch[0]);
					characteristics = response.characteristics;
				} else {
					throw new Error('No JSON found in response');
				}
			} catch (parseError) {
				console.error('Failed to parse OpenAI response:', parseError);
				console.error('Raw response:', analysisText);
				// Fallback: create a basic analysis structure
				characteristics = {
					value: {
						trait: 'light',
						rank: 1,
						confidence: 5,
						reasoning: 'Unable to parse detailed analysis'
					},
					chroma: {
						trait: 'muted',
						rank: 2,
						confidence: 5,
						reasoning: 'Unable to parse detailed analysis'
					},
					hue: {
						trait: 'warm',
						rank: 3,
						confidence: 5,
						reasoning: 'Unable to parse detailed analysis'
					}
				};
			}
		}

		// Calculate seasonal palette based on characteristics
		console.log('Calculating seasonal palette...');
		const seasonal_palette = calculateSeasonalPalette(characteristics);

		// Create final analysis structure
		const analysis = {
			characteristics,
			seasonal_palette
		};

		// Apply fallback formula if confidence is low
		console.log('Applying fallback formula...');
		const finalAnalysis = applyFallbackFormula(analysis);

		console.log('Returning analysis result');
		return json({
			success: true,
			analysis: finalAnalysis,
			rawResponse: analysisText
		});
	} catch (error) {
		console.error('Seasonal analysis error:', error);
		return json(
			{
				error: 'Failed to analyze image',
				details: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 500 }
		);
	}
};

function calculateSeasonalPalette(characteristics: any) {
	// Get all characteristics sorted by rank
	const sortedChars = Object.entries(characteristics).sort(
		(a: any, b: any) => a[1].rank - b[1].rank
	);

	// Define all possible seasonal combinations
	const seasonalCombinations = {
		'dark + warm': 'Deep Autumn',
		'dark + cool': 'Deep Winter',
		'light + warm': 'Light Spring',
		'light + cool': 'Light Summer',
		'muted + warm': 'Soft Autumn',
		'muted + cool': 'Soft Summer',
		'bright + warm': 'Clear Spring',
		'bright + cool': 'Clear Winter',
		'warm + muted': 'Warm Autumn',
		'warm + bright': 'Warm Spring',
		'cool + muted': 'Cool Summer',
		'cool + bright': 'Cool Winter'
	};

	// Try all possible combinations of traits
	const traits = sortedChars.map((char: any) => (char[1] as any).trait);
	let calculatedSeason = 'Light Spring'; // default
	let usedCombination = '';

	// Try 1st + 2nd combination
	if (traits.length >= 2) {
		const combo1 = `${traits[0]} + ${traits[1]}`;
		const combo1Reverse = `${traits[1]} + ${traits[0]}`;

		if (seasonalCombinations[combo1 as keyof typeof seasonalCombinations]) {
			calculatedSeason = seasonalCombinations[combo1 as keyof typeof seasonalCombinations];
			usedCombination = combo1;
		} else if (seasonalCombinations[combo1Reverse as keyof typeof seasonalCombinations]) {
			calculatedSeason = seasonalCombinations[combo1Reverse as keyof typeof seasonalCombinations];
			usedCombination = combo1Reverse;
		}
	}

	// Try 1st + 3rd combination if 1st + 2nd didn't work
	if (calculatedSeason === 'Light Spring' && traits.length >= 3) {
		const combo2 = `${traits[0]} + ${traits[2]}`;
		const combo2Reverse = `${traits[2]} + ${traits[0]}`;

		if (seasonalCombinations[combo2 as keyof typeof seasonalCombinations]) {
			calculatedSeason = seasonalCombinations[combo2 as keyof typeof seasonalCombinations];
			usedCombination = combo2;
		} else if (seasonalCombinations[combo2Reverse as keyof typeof seasonalCombinations]) {
			calculatedSeason = seasonalCombinations[combo2Reverse as keyof typeof seasonalCombinations];
			usedCombination = combo2Reverse;
		}
	}

	// Try 2nd + 3rd combination if others didn't work
	if (calculatedSeason === 'Light Spring' && traits.length >= 3) {
		const combo3 = `${traits[1]} + ${traits[2]}`;
		const combo3Reverse = `${traits[2]} + ${traits[1]}`;

		if (seasonalCombinations[combo3 as keyof typeof seasonalCombinations]) {
			calculatedSeason = seasonalCombinations[combo3 as keyof typeof seasonalCombinations];
			usedCombination = combo3;
		} else if (seasonalCombinations[combo3Reverse as keyof typeof seasonalCombinations]) {
			calculatedSeason = seasonalCombinations[combo3Reverse as keyof typeof seasonalCombinations];
			usedCombination = combo3Reverse;
		}
	}

	// Calculate average confidence
	const avgConfidence = Math.round(
		(Object.values(characteristics) as any[]).reduce((sum, char) => sum + char.confidence, 0) / 3
	);

	return {
		primary: calculatedSeason,
		confidence: avgConfidence,
		reasoning: usedCombination ? `Based on ${usedCombination} characteristics` : 'Default analysis'
	};
}

function applyFallbackFormula(analysis: any) {
	// If confidence is low, apply our formula
	const { characteristics, seasonal_palette } = analysis;

	// Check if any characteristic has low confidence
	const lowConfidence = Object.values(characteristics).some((char: any) => char.confidence < 6);

	if (lowConfidence || seasonal_palette.confidence < 6) {
		// Apply formula based on characteristics
		const value = characteristics.value.trait;
		const chroma = characteristics.chroma.trait;
		const hue = characteristics.hue.trait;

		let calculatedSeason = 'Light Spring'; // default

		// 12-season color analysis formula
		if (value === 'dark' && hue === 'warm') {
			calculatedSeason = 'Deep Autumn';
		} else if (value === 'dark' && hue === 'cool') {
			calculatedSeason = 'Deep Winter';
		} else if (value === 'light' && hue === 'warm') {
			calculatedSeason = 'Light Spring';
		} else if (value === 'light' && hue === 'cool') {
			calculatedSeason = 'Light Summer';
		} else if (chroma === 'muted' && hue === 'warm') {
			calculatedSeason = 'Soft Autumn';
		} else if (chroma === 'muted' && hue === 'cool') {
			calculatedSeason = 'Soft Summer';
		} else if (chroma === 'bright' && hue === 'warm') {
			calculatedSeason = 'Clear Spring';
		} else if (chroma === 'bright' && hue === 'cool') {
			calculatedSeason = 'Clear Winter';
		} else if (hue === 'warm' && chroma === 'muted') {
			calculatedSeason = 'Warm Autumn';
		} else if (hue === 'warm' && chroma === 'bright') {
			calculatedSeason = 'Warm Spring';
		} else if (hue === 'cool' && chroma === 'muted') {
			calculatedSeason = 'Cool Summer';
		} else if (hue === 'cool' && chroma === 'bright') {
			calculatedSeason = 'Cool Winter';
		}

		return {
			...analysis,
			seasonal_palette: {
				...seasonal_palette,
				primary: calculatedSeason,
				confidence: Math.max(seasonal_palette.confidence, 7),
				reasoning: `Formula-based calculation: ${value} + ${hue} + ${chroma} = ${calculatedSeason}`
			},
			formula_applied: true
		};
	}

	return analysis;
}
