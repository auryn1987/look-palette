<script lang="ts">
</script>

<svelte:head>
	<title>Frequently Asked Questions | Look Palette</title>
	<meta name="description" content="Frequently Asked Questions | Look Palette" />
</svelte:head>

<header class="text-center mb-8 relative overflow-hidden bg-gray-800" style="min-height: 300px;">
	<img
		src="/hero/hero-image-faq.avif"
		alt="FAQ | Look Palette"
		class="absolute inset-0 w-full h-full object-cover"
	/>

	<div class="relative z-10 py-16 px-8">
		<h1 class="inter mt-2 text-5xl font-semibold tracking-tight text-pretty text-black md:text-6xl">
			Frequently Asked Questions
		</h1>
		<p class="inter text-xl text-black max-w-7xl mx-auto mt-6">
			Everything you need to know about seasonal color analysis
		</p>
	</div>
</header>
<div class="max-w-7xl mx-auto p-4 md:p-8 py-4 md:py-8">
	<main class="space-y-8">
		<!-- FAQ Items -->
		<div class="space-y-4">
			<!-- What is Seasonal Color Analysis FAQ -->
			<div class="collapse collapse-arrow bg-white border border-gray-200">
				<input type="radio" name="faq-accordion" checked={true} />
				<div class="collapse-title text-xl font-medium">What is seasonal color analysis?</div>
				<div class="collapse-content">
					<p class="text-gray-600">
						Seasonal color analysis is a method of determining which colors look best on you based
						on your natural coloring. It categorizes people into four main seasons (Spring, Summer,
						Autumn, Winter) and their subcategories, helping you identify the most flattering colors
						for your skin tone, hair, and eyes.
					</p>
				</div>
			</div>

			<!-- How it works FAQ -->
			<div class="collapse collapse-arrow bg-white border border-gray-200">
				<input type="radio" name="faq-accordion" />
				<div class="collapse-title text-xl font-medium">How does seasonal color analysis work?</div>
				<div class="collapse-content">
					<p class="text-gray-600 mb-4">
						Color analysis examines your natural features including skin undertone, hair color, and
						eye color. By analyzing these characteristics, we can determine whether you have warm or
						cool undertones, and whether your coloring is light, soft, clear, or deep. This creates
						your unique color season.
					</p>
					<p class="text-gray-600">
						Each season has specific color palettes that enhance your natural beauty and make you
						look more vibrant and healthy.
					</p>
				</div>
			</div>

			<!-- Benefits FAQ -->
			<div class="collapse collapse-arrow bg-white border border-gray-200">
				<input type="radio" name="faq-accordion" />
				<div class="collapse-title text-xl font-medium">
					What are the benefits of knowing my color season?
				</div>
				<div class="collapse-content">
					<p class="text-gray-600 mb-4">
						Knowing your color season can transform your appearance and confidence in several ways:
					</p>
					<ul class="list-disc list-inside text-gray-600 space-y-2">
						<li>Look more vibrant and healthy</li>
						<li>Simplify shopping decisions</li>
						<li>Build a cohesive wardrobe</li>
						<li>Save money by avoiding unflattering colors</li>
						<li>Feel more confident in your appearance</li>
						<li>Make better makeup and jewelry choices</li>
					</ul>
				</div>
			</div>

			<!-- Seasons FAQ -->
			<div class="collapse collapse-arrow bg-white border border-gray-200">
				<input type="radio" name="faq-accordion" />
				<div class="collapse-title text-xl font-medium">What are the different color seasons?</div>
				<div class="collapse-content">
					<p class="text-gray-600 mb-4">
						There are four main seasons, each with three subcategories:
					</p>

					<div class="grid gap-4 md:grid-cols-2">
						<div class="space-y-2">
							<h4 class="font-semibold text-green-700">Spring</h4>
							<ul class="text-sm text-gray-600 space-y-1">
								<li>• Clear Spring - Bright and warm</li>
								<li>• Warm Spring - Golden and vibrant</li>
								<li>• Light Spring - Soft and warm</li>
							</ul>
						</div>

						<div class="space-y-2">
							<h4 class="font-semibold text-blue-700">Summer</h4>
							<ul class="text-sm text-gray-600 space-y-1">
								<li>• Light Summer - Soft and cool</li>
								<li>• Cool Summer - Clear and cool</li>
								<li>• Soft Summer - Muted and cool</li>
							</ul>
						</div>

						<div class="space-y-2">
							<h4 class="font-semibold text-orange-700">Autumn</h4>
							<ul class="text-sm text-gray-600 space-y-1">
								<li>• Soft Autumn - Muted and warm</li>
								<li>• Warm Autumn - Golden and rich</li>
								<li>• Deep Autumn - Rich and warm</li>
							</ul>
						</div>

						<div class="space-y-2">
							<h4 class="font-semibold text-purple-700">Winter</h4>
							<ul class="text-sm text-gray-600 space-y-1">
								<li>• Deep Winter - Rich and cool</li>
								<li>• Cool Winter - Clear and cool</li>
								<li>• Clear Winter - Bright and cool</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<!-- How to determine FAQ -->
			<div class="collapse collapse-arrow bg-white border border-gray-200">
				<input type="radio" name="faq-accordion" />
				<div class="collapse-title text-xl font-medium">How can I determine my color season?</div>
				<div class="collapse-content">
					<p class="text-gray-600 mb-4">There are several ways to determine your color season:</p>
					<ul class="list-disc list-inside text-gray-600 space-y-2">
						<li>
							<strong>Professional Analysis:</strong> Visit a certified color analyst for the most accurate
							results
						</li>
						<li>
							<strong>Online Tools:</strong> Use our color analysis tools to get a preliminary assessment
						</li>
						<li>
							<strong>Self-Assessment:</strong> Compare your features to seasonal characteristics
						</li>
						<li>
							<strong>Drape Testing:</strong> Test different colored fabrics against your skin
						</li>
					</ul>
					<p class="text-gray-600 mt-4">
						For the most accurate results, we recommend a professional analysis or using our
						comprehensive online tools.
					</p>
				</div>
			</div>

			<!-- Metals FAQ -->
			<div class="collapse collapse-arrow bg-white border border-gray-200">
				<input type="radio" name="faq-accordion" />
				<div class="collapse-title text-xl font-medium">What metals and jewelry should I wear?</div>
				<div class="collapse-content">
					<p class="text-gray-600 mb-4">
						Your color season determines which metals look best on you:
					</p>
					<div class="grid gap-4 md:grid-cols-2">
						<div>
							<h4 class="font-semibold text-yellow-600 mb-2">Warm Seasons (Spring & Autumn)</h4>
							<ul class="text-sm text-gray-600 space-y-1">
								<li>• Yellow gold</li>
								<li>• Rose gold</li>
								<li>• Copper</li>
								<li>• Bronze</li>
							</ul>
						</div>
						<div>
							<h4 class="font-semibold text-gray-600 mb-2">Cool Seasons (Summer & Winter)</h4>
							<ul class="text-sm text-gray-600 space-y-1">
								<li>• White gold</li>
								<li>• Platinum</li>
								<li>• Silver</li>
								<li>• Stainless steel</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<!-- Gemstones FAQ -->
			<div class="collapse collapse-arrow bg-white border border-gray-200">
				<input type="radio" name="faq-accordion" />
				<div class="collapse-title text-xl font-medium">
					What gemstones complement my color season?
				</div>
				<div class="collapse-content">
					<p class="text-gray-600 mb-4">
						Different gemstones work better with different color seasons:
					</p>
					<div class="grid gap-4 md:grid-cols-2">
						<div>
							<h4 class="font-semibold text-green-600 mb-2">Spring</h4>
							<p class="text-sm text-gray-600">
								Bright, clear gemstones like emerald, aquamarine, and citrine
							</p>
						</div>
						<div>
							<h4 class="font-semibold text-blue-600 mb-2">Summer</h4>
							<p class="text-sm text-gray-600">
								Soft, cool gemstones like rose quartz, amethyst, and moonstone
							</p>
						</div>
						<div>
							<h4 class="font-semibold text-orange-600 mb-2">Autumn</h4>
							<p class="text-sm text-gray-600">
								Warm, rich gemstones like garnet, amber, and tiger's eye
							</p>
						</div>
						<div>
							<h4 class="font-semibold text-purple-600 mb-2">Winter</h4>
							<p class="text-sm text-gray-600">
								Deep, clear gemstones like ruby, sapphire, and diamond
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Best practices FAQ -->
			<div class="collapse collapse-arrow bg-white border border-gray-200">
				<input type="radio" name="faq-accordion" />
				<div class="collapse-title text-xl font-medium">
					What are the best practices for using my color palette?
				</div>
				<div class="collapse-content">
					<p class="text-gray-600 mb-4">
						Here are some tips for making the most of your color analysis:
					</p>
					<ul class="list-disc list-inside text-gray-600 space-y-2">
						<li>Use your best colors near your face (tops, scarves, jewelry)</li>
						<li>Mix your best colors with neutral tones for balance</li>
						<li>Don't feel limited - you can wear any color, just be mindful of placement</li>
						<li>Consider your color season when choosing makeup</li>
						<li>Use your palette as a guide, not a strict rule</li>
						<li>Remember that lighting and context can affect how colors appear</li>
					</ul>
				</div>
			</div>

			<!-- Getting started FAQ -->
			<div class="collapse collapse-arrow bg-white border border-gray-200">
				<input type="radio" name="faq-accordion" />
				<div class="collapse-title text-xl font-medium">
					How do I get started with color analysis?
				</div>
				<div class="collapse-content">
					<p class="text-gray-600 mb-4">Getting started with color analysis is easy:</p>
					<ol class="list-decimal list-inside text-gray-600 space-y-2">
						<li>Take our online color analysis quiz for a preliminary assessment</li>
						<li>Explore your color palette and recommendations</li>
						<li>Start with small changes like accessories or makeup</li>
						<li>Gradually incorporate your best colors into your wardrobe</li>
						<li>Consider a professional consultation for the most accurate results</li>
					</ol>
					<div class="mt-6">
						<a href="/tools/seasonal-color-analysis" class="btn btn-primary">
							Start Your Color Analysis
						</a>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
