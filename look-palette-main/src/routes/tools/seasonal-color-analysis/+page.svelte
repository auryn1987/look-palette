<script lang="ts">
	import SeasonBadge from '$lib/components/SeasonBadge.svelte';
	import seasonalData from '$lib/SeasonalAnalysis.json';
	import { heroSeasonalPalettes } from '$lib/heroSeasonalPalettes';

	interface AnalysisResult {
		characteristics: {
			value: { trait: string; rank: number; confidence: number; reasoning: string };
			chroma: { trait: string; rank: number; confidence: number; reasoning: string };
			hue: { trait: string; rank: number; confidence: number; reasoning: string };
		};
		seasonal_palette: {
			primary: string;
			confidence: number;
			reasoning: string;
		};
		formula_applied?: boolean;
	}

	let currentStep = $state(0);
	let answers = $state<Record<string, string>>({});
	let analysisResult = $state<AnalysisResult | null>(null);
	let error = $state<string>('');
	let isAnalyzing = $state(false);

	// Reactive palette data
	let paletteData = $derived(
		analysisResult ? getPaletteData(analysisResult.seasonal_palette.primary) : null
	);

	const questions = seasonalData.questions;

	function selectAnswer(questionId: string, optionId: string) {
		answers[questionId] = optionId;
	}

	function nextStep() {
		const currentQuestion = questions[currentStep];
		if (currentQuestion.required && !answers[currentQuestion.id]) {
			error = 'Please select an answer to continue';
			return;
		}
		error = '';
		if (currentStep < questions.length - 1) {
			currentStep++;
		}
	}

	function prevStep() {
		if (currentStep > 0) {
			currentStep--;
			error = '';
		}
	}

	function calculateSeasonFromAnswers() {
		isAnalyzing = true;
		error = '';

		try {
			// Calculate totals for each axis
			const totals = { hue: 0, value: 0, chroma: 0, contrast: 0 };

			Object.entries(answers).forEach(([questionId, optionId]) => {
				const question = questions.find((q) => q.id === questionId);
				const option = question?.options.find((o) => o.id === optionId);

				if (option?.deltas) {
					Object.entries(option.deltas).forEach(([axis, delta]) => {
						totals[axis as keyof typeof totals] += delta as number;
					});
				}
			});

			// Calculate confidence based on score strength
			const valueConfidence = Math.min(10, Math.max(5, 5 + Math.abs(totals.value)));
			const hueConfidence = Math.min(10, Math.max(5, 5 + Math.abs(totals.hue)));
			const chromaConfidence = Math.min(10, Math.max(5, 5 + Math.abs(totals.chroma)));

			// Create characteristics with scores for ranking
			const characteristicsData = [
				{
					key: 'value',
					trait: totals.value >= 0 ? 'dark' : 'light',
					confidence: valueConfidence,
					score: Math.abs(totals.value),
					reasoning: `Value score: ${totals.value}`
				},
				{
					key: 'hue',
					trait: totals.hue >= 0 ? 'warm' : 'cool',
					confidence: hueConfidence,
					score: Math.abs(totals.hue),
					reasoning: `Hue score: ${totals.hue}`
				},
				{
					key: 'chroma',
					trait: totals.chroma >= 0 ? 'bright' : 'muted',
					confidence: chromaConfidence,
					score: Math.abs(totals.chroma),
					reasoning: `Chroma score: ${totals.chroma}`
				}
			];

			// Sort by score (highest first) to determine ranking
			characteristicsData.sort((a, b) => b.score - a.score);

			// Build final characteristics object with proper ranking
			const characteristics: any = {};
			characteristicsData.forEach((char, index) => {
				characteristics[char.key] = {
					trait: char.trait,
					rank: index + 1,
					confidence: char.confidence,
					reasoning: char.reasoning
				};
			});

			// Calculate seasonal palette confidence as average of characteristics
			const avgConfidence = Math.round((valueConfidence + hueConfidence + chromaConfidence) / 3);

			const seasonResult = calculateSeason(characteristics);
			const seasonal_palette = {
				primary: seasonResult.season,
				confidence: avgConfidence,
				reasoning: `Your seasonal palette is determined by the ${seasonResult.combination} combination from your analysis.`
			};

			analysisResult = {
				characteristics,
				seasonal_palette
			};
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to calculate season';
		} finally {
			isAnalyzing = false;
		}
	}

	function calculateSeason(characteristics: any) {
		// Get characteristics sorted by rank (1st, 2nd, 3rd)
		const sortedChars = Object.entries(characteristics).sort(
			(a: any, b: any) => a[1].rank - b[1].rank
		);

		const firstTrait = (sortedChars[0][1] as any).trait;
		const secondTrait = (sortedChars[1][1] as any).trait;

		const seasonMap: Record<string, string> = {
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

		// Apply the specific logic for trait combinations
		let dominantTrait = firstTrait;
		let secondaryTrait = secondTrait;
		let usedCombination = '';

		// If dominant is dark/light/muted/bright, secondary should be warm/cool
		if (['dark', 'light', 'muted', 'bright'].includes(firstTrait)) {
			// Find warm/cool from remaining traits
			const warmCoolTrait = sortedChars.find((char: any) =>
				['warm', 'cool'].includes((char[1] as any).trait)
			);
			if (warmCoolTrait) {
				secondaryTrait = (warmCoolTrait[1] as any).trait;
				usedCombination = `${firstTrait} + ${secondaryTrait}`;
			}
		}
		// If dominant is warm/cool, secondary should be muted/bright
		else if (['warm', 'cool'].includes(firstTrait)) {
			// Find muted/bright from remaining traits
			const mutedBrightTrait = sortedChars.find((char: any) =>
				['muted', 'bright'].includes((char[1] as any).trait)
			);
			if (mutedBrightTrait) {
				secondaryTrait = (mutedBrightTrait[1] as any).trait;
				usedCombination = `${firstTrait} + ${secondaryTrait}`;
			}
		}

		const combo = `${dominantTrait} + ${secondaryTrait}`;

		if (seasonMap[combo]) {
			return { season: seasonMap[combo], combination: usedCombination };
		}

		return { season: 'Light Spring', combination: 'default' }; // default
	}

	function resetAnalysis() {
		currentStep = 0;
		answers = {};
		analysisResult = null;
		error = '';
	}

	function getRankIcon(rank: number) {
		switch (rank) {
			case 1:
				return '🥇';
			case 2:
				return '🥈';
			case 3:
				return '🥉';
			default:
				return '📊';
		}
	}

	function getConfidenceColor(confidence: number) {
		if (confidence >= 8) return 'text-green-600';
		if (confidence >= 6) return 'text-yellow-600';
		return 'text-red-600';
	}

	function getConfidenceText(confidence: number) {
		if (confidence >= 8) return 'High';
		if (confidence >= 6) return 'Medium';
		return 'Low';
	}

	function getPaletteData(seasonName: string) {
		// Find the matching palette from imported data
		for (const season of heroSeasonalPalettes) {
			for (const subtype of season.subtypes) {
				if (subtype.name === seasonName) {
					return subtype;
				}
			}
		}
		// Default fallback
		return {
			name: 'Clear Spring',
			description: 'Clear Spring is vivid, bright, and sparkling.',
			image: '/models/model-spring-clear.avif',
			slug: 'clear-spring',
			bestColors: [
				'#ec3d43',
				'#e86e48',
				'#fccd63',
				'#98cb2f',
				'#4bb916',
				'#019cd9',
				'#ea2282',
				'#fdf24c',
				'#00a297',
				'#e20043'
			]
		};
	}
</script>

<svelte:head>
	<title>Seasonal Color Analysis | Look Palette</title>
	<meta
		name="description"
		content="Our seasonal color analysis tool will help you discover your seasonal color palette."
	/>
</svelte:head>

<header class="text-center mb-8 relative overflow-hidden bg-gray-800" style="min-height: 300px;">
	<img
		src="/hero/hero-image-seasonal-color.avif"
		alt="Hero background"
		class="absolute inset-0 w-full h-full object-cover"
	/>
	<div class="relative z-10 py-16 px-8">
		<h1 class="inter mt-2 text-5xl md:text-6xl font-semibold tracking-tight text-pretty text-black">
			Seasonal Color Analysis
		</h1>
		<p class="inter text-xl text-black max-w-7xl mx-auto mt-6">
			Answer a few questions to discover your seasonal color palette.
		</p>
	</div>
</header>

<div class="max-w-7xl mx-auto p-4 sm:p-8">
	{#if !analysisResult}
		<!-- Questionnaire Section -->
		<div class="max-w-5xl mx-auto">
			<div class="bg-white rounded-lg shadow-lg p-6 sm:p-8">
				<!-- Progress Bar -->
				<div class="mb-8">
					<div class="flex justify-between text-sm text-gray-600 mb-2">
						<span>Step {currentStep + 1} of {questions.length}</span>
						<span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
					</div>
					<div class="w-full bg-gray-200 rounded-full h-2">
						<div
							class="bg-blue-600 h-2 rounded-full transition-all duration-300"
							style="width: {((currentStep + 1) / questions.length) * 100}%"
						></div>
					</div>
				</div>

				<!-- Question -->
				{#if questions[currentStep]}
					{@const question = questions[currentStep]}
					<div class="mb-8">
						<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
							{question.text}
						</h2>
						{#if question.required}
							<p class="text-sm text-gray-500">Required</p>
						{/if}
						{#if question.help}
							<div class="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<p class="text-sm text-blue-800">{question.help}</p>
							</div>
						{/if}
					</div>

					<!-- Options -->
					{#if question.id === 'hair_color'}
						<!-- Hair Color with Images -->
						<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
							{#each question.options as option}
								{@const imageMap = {
									light_blonde: 'platinum-blonde',
									golden_blonde: 'golden-blonde',
									ash_blonde: 'ash-blonde',
									light_brown: 'light-golden-brown',
									medium_brown: 'medium-warm-brown',
									dark_brown: 'dark-chocolate',
									black: 'jet-black',
									red_auburn: 'rich-auburn'
								}}
								<button
									onclick={() => selectAnswer(question.id, option.id)}
									class="relative group overflow-hidden rounded-lg border-4 transition-all {answers[
										question.id
									] === option.id
										? 'border-blue-600 shadow-lg'
										: 'border-gray-200 hover:border-gray-300'}"
								>
									<img
										src="/hair/{imageMap[option.id as keyof typeof imageMap]}.avif"
										alt={option.label}
										class="w-full h-32 sm:h-40 object-cover"
									/>
									<div
										class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3"
									>
										<p class="text-white text-sm font-semibold">{option.label}</p>
									</div>
									{#if answers[question.id] === option.id}
										<div class="absolute top-2 right-2 bg-blue-600 rounded-full p-1">
											<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
												<path
													fill-rule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clip-rule="evenodd"
												/>
											</svg>
										</div>
									{/if}
								</button>
							{/each}
						</div>
					{:else}
						<!-- Regular Options -->
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
							{#each question.options as option}
								<button
									onclick={() => selectAnswer(question.id, option.id)}
									class="text-left p-4 sm:p-5 border-2 rounded-lg transition-all {answers[
										question.id
									] === option.id
										? 'border-blue-600 bg-blue-50'
										: 'border-gray-200 hover:border-gray-300'}"
								>
									<div class="flex items-center justify-between">
										<span class="text-gray-900 text-sm sm:text-base pr-2">{option.label}</span>
										{#if answers[question.id] === option.id}
											<svg
												class="w-5 h-5 text-blue-600 flex-shrink-0"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fill-rule="evenodd"
													d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
													clip-rule="evenodd"
												/>
											</svg>
										{/if}
									</div>
								</button>
							{/each}
						</div>
					{/if}
				{/if}

				{#if error}
					<div class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
						<p class="text-red-600 text-sm">{error}</p>
					</div>
				{/if}

				<!-- Navigation -->
				<div class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
					<button
						onclick={prevStep}
						disabled={currentStep === 0}
						class="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors order-2 sm:order-1"
					>
						Previous
					</button>

					{#if currentStep === questions.length - 1}
						<button
							onclick={calculateSeasonFromAnswers}
							disabled={isAnalyzing}
							class="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors order-1 sm:order-2"
						>
							{isAnalyzing ? 'Calculating...' : 'Get My Results'}
						</button>
					{:else}
						<button
							onclick={nextStep}
							class="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors order-1 sm:order-2"
						>
							Next
						</button>
					{/if}
				</div>
			</div>
		</div>
	{:else}
		<!-- Results Section -->
		<div class="max-w-4xl mx-auto">
			<div class="bg-white rounded-lg shadow-lg p-8">
				<!-- Your Color Palette -->
				{#if paletteData}
					<div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8 max-w-xl mx-auto">
						<!-- Hero Image -->
						<div class="aspect-square">
							<img
								src={paletteData.image}
								alt="{paletteData.name} color palette"
								class="w-full h-full object-cover"
							/>
						</div>

						<!-- Color Palette Swatches -->
						<div class="bg-gray-50">
							<div class="grid grid-cols-10 gap-0">
								{#each paletteData.bestColors as color}
									<div class="aspect-square" style="background-color: {color}" title={color}></div>
								{/each}
							</div>
						</div>

						<!-- Content -->
						<div class="p-6">
							<h3 class="text-xl font-semibold text-gray-900 mb-2">
								Your Seasonal Palette is {paletteData.name}
							</h3>
							<p class="text-gray-600 mb-4">
								{paletteData.description}
							</p>
							<a
								href="/palettes/{paletteData.slug}"
								class="block rounded-md bg-black px-3 py-2 text-center text-sm/6 font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black"
							>
								View Palette
							</a>
						</div>
					</div>
				{/if}

				<!-- Seasonal Palette Result -->
				<div class="mb-8 p-4 bg-gray-50 rounded-lg">
					<h3 class="text-xl font-semibold text-gray-900 mb-4">Your Seasonal Palette</h3>
					<div class="flex items-center gap-4 mb-4">
						<SeasonBadge season={analysisResult.seasonal_palette.primary} />
						<div class="flex-1">
							<div class="flex items-center gap-2">
								<span
									class="text-sm font-semibold {getConfidenceColor(
										analysisResult.seasonal_palette.confidence
									)}"
								>
									{getConfidenceText(analysisResult.seasonal_palette.confidence)} ({analysisResult
										.seasonal_palette.confidence}/10)
								</span>
							</div>
						</div>
					</div>
					<p class="text-gray-700 text-sm">{analysisResult.seasonal_palette.reasoning}</p>
				</div>

				<!-- Characteristics Analysis -->
				<div class="mb-8">
					<h3 class="text-xl font-semibold text-gray-900 mb-4">Color Characteristics (Ranked)</h3>
					<div class="space-y-4">
						{#each Object.entries(analysisResult.characteristics).sort((a, b) => a[1].rank - b[1].rank) as [key, char]}
							<div class="p-4 border border-gray-200 rounded-lg">
								<div class="flex items-center justify-between mb-2">
									<div class="flex items-center gap-2">
										<span class="text-lg">{getRankIcon(char.rank)}</span>
										<span class="font-semibold text-gray-900 capitalize">{key}</span>
										<span class="text-gray-600">({char.trait})</span>
									</div>
									<span class="text-sm font-semibold {getConfidenceColor(char.confidence)}">
										{getConfidenceText(char.confidence)} ({char.confidence}/10)
									</span>
								</div>
								<p class="text-gray-700 text-sm">{char.reasoning}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- What This Means -->
				<div class="p-4 bg-gray-50 rounded-lg mb-8">
					<h3 class="text-lg font-semibold text-gray-900 mb-3">What This Means for You</h3>
					<p class="text-gray-800 text-sm mb-3">
						Your seasonal color analysis helps determine which colors will make you look your best.
						The characteristics above show your natural coloring, while your seasonal palette
						provides specific color recommendations.
					</p>
					<div class="text-sm text-gray-700">
						<p><strong>Value:</strong> Whether you look better in light or dark colors</p>
						<p><strong>Chroma:</strong> Whether you look better in muted or bright colors</p>
						<p><strong>Hue:</strong> Whether you look better in warm or cool colors</p>
					</div>
				</div>

				<!-- Start Over Button -->
				<button
					onclick={resetAnalysis}
					class="w-full rounded-md bg-black px-6 py-3 text-center text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black transition-opacity"
				>
					Start Over
				</button>
			</div>
		</div>
	{/if}
</div>

<div class="max-w-7xl mx-auto p-4 md:p-8 py-8 sm:py-12">
	<main class="space-y-16">
		<section>
			<div class="text-center mb-12">
				<h2 class="text-3xl font-semibold text-gray-900 mb-4">
					Understanding Seasonal Color Analysis
				</h2>
				<p class="text-lg text-gray-700 max-w-4xl mx-auto">
					Seasonal color analysis is a systematic approach to determining which colors enhance your
					natural beauty by analyzing your unique coloring characteristics.
				</p>
			</div>
		</section>

		<section>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
				<div>
					<h3 class="text-2xl font-semibold text-gray-900 mb-6">The Science Behind It</h3>
					<div class="space-y-4 text-gray-700">
						<p>
							Every person has a unique combination of natural coloring that falls into one of 12
							seasonal categories. These categories are determined by three key characteristics:
						</p>
						<ul class="list-disc list-inside space-y-2 ml-4">
							<li><strong>Value:</strong> The lightness or darkness of your natural coloring</li>
							<li><strong>Chroma:</strong> The intensity or mutedness of your coloring</li>
							<li><strong>Hue:</strong> The warmth or coolness of your undertones</li>
						</ul>
						<p>
							By identifying which of these characteristics is most dominant in your appearance, we
							can determine which seasonal palette will make you look your absolute best.
						</p>
					</div>
				</div>

				<div>
					<h3 class="text-2xl font-semibold text-gray-900 mb-6">Why This Method Works</h3>
					<div class="space-y-4 text-gray-700">
						<p>
							Our questionnaire-based approach analyzes your natural coloring through carefully
							designed questions that assess your hair, eye, and skin characteristics.
						</p>
						<p>
							Each answer contributes to a scoring system that measures your position on the value,
							chroma, and hue axes. The combination of your two most prominent characteristics
							determines your seasonal palette.
						</p>
						<p>
							This method is more accurate than visual assessment alone because it considers
							multiple factors and uses a proven scoring system based on color theory principles.
						</p>
					</div>
				</div>
			</div>
		</section>

		<section>
			<div class="bg-gray-50 rounded-lg p-4 md:p-8">
				<h3 class="text-2xl font-semibold text-gray-900 mb-6 text-center">
					The 12 Seasonal Palettes
				</h3>
				<p class="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
					Each seasonal palette is determined by a specific combination of dominant and secondary
					color characteristics. Click on any palette to explore its colors and learn more.
				</p>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<!-- Spring Palettes -->
					<div class="bg-white rounded-lg p-6 shadow-sm">
						<h4 class="font-semibold text-gray-900 mb-4 text-center">Spring Palettes</h4>
						<div class="space-y-3 text-center">
							<a
								href="/palettes/clear-spring"
								target="_blank"
								class="block p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
							>
								<div class="font-medium text-gray-900">Clear Spring</div>
								<div class="text-sm text-gray-600">Bright + Warm</div>
								<div class="flex justify-center gap-1 mt-2">
									{#each getPaletteData('Clear Spring').bestColors as color}
										<div
											class="w-4 h-4 rounded"
											style="background-color: {color}"
											title={color}
										></div>
									{/each}
								</div>
							</a>
							<a
								href="/palettes/warm-spring"
								target="_blank"
								class="block p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
							>
								<div class="font-medium text-gray-900">Warm Spring</div>
								<div class="text-sm text-gray-600">Warm + Bright</div>
								<div class="flex justify-center gap-1 mt-2">
									{#each getPaletteData('Warm Spring').bestColors as color}
										<div
											class="w-4 h-4 rounded"
											style="background-color: {color}"
											title={color}
										></div>
									{/each}
								</div>
							</a>
							<a
								href="/palettes/light-spring"
								target="_blank"
								class="block p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
							>
								<div class="font-medium text-gray-900">Light Spring</div>
								<div class="text-sm text-gray-600">Light + Warm</div>
								<div class="flex justify-center gap-1 mt-2">
									{#each getPaletteData('Light Spring').bestColors as color}
										<div
											class="w-4 h-4 rounded"
											style="background-color: {color}"
											title={color}
										></div>
									{/each}
								</div>
							</a>
						</div>
					</div>

					<!-- Summer Palettes -->
					<div class="bg-white rounded-lg p-6 shadow-sm">
						<h4 class="font-semibold text-gray-900 mb-4 text-center">Summer Palettes</h4>
						<div class="space-y-3 text-center">
							<a
								href="/palettes/light-summer"
								target="_blank"
								class="block p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
							>
								<div class="font-medium text-gray-900">Light Summer</div>
								<div class="text-sm text-gray-600">Light + Cool</div>
								<div class="flex justify-center gap-1 mt-2">
									{#each getPaletteData('Light Summer').bestColors as color}
										<div
											class="w-4 h-4 rounded"
											style="background-color: {color}"
											title={color}
										></div>
									{/each}
								</div>
							</a>
							<a
								href="/palettes/cool-summer"
								target="_blank"
								class="block p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
							>
								<div class="font-medium text-gray-900">Cool Summer</div>
								<div class="text-sm text-gray-600">Cool + Muted</div>
								<div class="flex justify-center gap-1 mt-2">
									{#each getPaletteData('Cool Summer').bestColors as color}
										<div
											class="w-4 h-4 rounded"
											style="background-color: {color}"
											title={color}
										></div>
									{/each}
								</div>
							</a>
							<a
								href="/palettes/soft-summer"
								target="_blank"
								class="block p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
							>
								<div class="font-medium text-gray-900">Soft Summer</div>
								<div class="text-sm text-gray-600">Muted + Cool</div>
								<div class="flex justify-center gap-1 mt-2">
									{#each getPaletteData('Soft Summer').bestColors as color}
										<div
											class="w-4 h-4 rounded"
											style="background-color: {color}"
											title={color}
										></div>
									{/each}
								</div>
							</a>
						</div>
					</div>

					<!-- Autumn Palettes -->
					<div class="bg-white rounded-lg p-6 shadow-sm">
						<h4 class="font-semibold text-gray-900 mb-4 text-center">Autumn Palettes</h4>
						<div class="space-y-3 text-center">
							<a
								href="/palettes/soft-autumn"
								target="_blank"
								class="block p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
							>
								<div class="font-medium text-gray-900">Soft Autumn</div>
								<div class="text-sm text-gray-600">Muted + Warm</div>
								<div class="flex justify-center gap-1 mt-2">
									{#each getPaletteData('Soft Autumn').bestColors as color}
										<div
											class="w-4 h-4 rounded"
											style="background-color: {color}"
											title={color}
										></div>
									{/each}
								</div>
							</a>
							<a
								href="/palettes/warm-autumn"
								target="_blank"
								class="block p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
							>
								<div class="font-medium text-gray-900">Warm Autumn</div>
								<div class="text-sm text-gray-600">Warm + Muted</div>
								<div class="flex justify-center gap-1 mt-2">
									{#each getPaletteData('Warm Autumn').bestColors as color}
										<div
											class="w-4 h-4 rounded"
											style="background-color: {color}"
											title={color}
										></div>
									{/each}
								</div>
							</a>
							<a
								href="/palettes/deep-autumn"
								target="_blank"
								class="block p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
							>
								<div class="font-medium text-gray-900">Deep Autumn</div>
								<div class="text-sm text-gray-600">Dark + Warm</div>
								<div class="flex justify-center gap-1 mt-2">
									{#each getPaletteData('Deep Autumn').bestColors as color}
										<div
											class="w-4 h-4 rounded"
											style="background-color: {color}"
											title={color}
										></div>
									{/each}
								</div>
							</a>
						</div>
					</div>

					<!-- Winter Palettes -->
					<div class="bg-white rounded-lg p-6 shadow-sm">
						<h4 class="font-semibold text-gray-900 mb-4 text-center">Winter Palettes</h4>
						<div class="space-y-3 text-center">
							<a
								href="/palettes/deep-winter"
								target="_blank"
								class="block p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
							>
								<div class="font-medium text-gray-900">Deep Winter</div>
								<div class="text-sm text-gray-600">Dark + Cool</div>
								<div class="flex justify-center gap-1 mt-2">
									{#each getPaletteData('Deep Winter').bestColors as color}
										<div
											class="w-4 h-4 rounded"
											style="background-color: {color}"
											title={color}
										></div>
									{/each}
								</div>
							</a>
							<a
								href="/palettes/cool-winter"
								target="_blank"
								class="block p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
							>
								<div class="font-medium text-gray-900">Cool Winter</div>
								<div class="text-sm text-gray-600">Cool + Bright</div>
								<div class="flex justify-center gap-1 mt-2">
									{#each getPaletteData('Cool Winter').bestColors as color}
										<div
											class="w-4 h-4 rounded"
											style="background-color: {color}"
											title={color}
										></div>
									{/each}
								</div>
							</a>
							<a
								href="/palettes/clear-winter"
								target="_blank"
								class="block p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
							>
								<div class="font-medium text-gray-900">Clear Winter</div>
								<div class="text-sm text-gray-600">Bright + Cool</div>
								<div class="flex justify-center gap-1 mt-2">
									{#each getPaletteData('Clear Winter').bestColors as color}
										<div
											class="w-4 h-4 rounded"
											style="background-color: {color}"
											title={color}
										></div>
									{/each}
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section>
			<div class="text-center">
				<h3 class="text-2xl font-semibold text-gray-900 mb-6">How to Use Your Results</h3>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div class="p-6 bg-white rounded-lg shadow-sm">
						<div class="text-3xl mb-4">🎨</div>
						<h4 class="font-semibold text-gray-900 mb-2">Wardrobe Planning</h4>
						<p class="text-gray-600 text-sm">
							Use your palette colors when shopping for clothes, accessories, and makeup to ensure
							everything complements your natural coloring.
						</p>
					</div>
					<div class="p-6 bg-white rounded-lg shadow-sm">
						<div class="text-3xl mb-4">💄</div>
						<h4 class="font-semibold text-gray-900 mb-2">Makeup Selection</h4>
						<p class="text-gray-600 text-sm">
							Choose foundation, lipstick, and eyeshadow colors that match your seasonal palette for
							a harmonious, natural look.
						</p>
					</div>
					<div class="p-6 bg-white rounded-lg shadow-sm">
						<div class="text-3xl mb-4">✨</div>
						<h4 class="font-semibold text-gray-900 mb-2">Confidence Boost</h4>
						<p class="text-gray-600 text-sm">
							Wearing colors that enhance your natural beauty will make you look and feel more
							confident and radiant.
						</p>
					</div>
				</div>
			</div>
		</section>
	</main>
</div>
