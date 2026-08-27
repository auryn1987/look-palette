<svelte:head>
	<title>Pricing | Look Palette</title>
	<meta
		name="description"
		content="Choose the plan that best fits your seasonal color analysis journey. Look Palette offers simple pricing for everyone."
	/>
</svelte:head>

<div
	class="bg-white py-8 sm:py-12"
	style="background-image: url('/hero/hero-spring-light.avif'); background-size: cover; background-position: center; background-repeat: no-repeat;"
>
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-4xl sm:text-center">
			<p
				class="inter mt-2 text-5xl font-semibold tracking-tight text-pretty text-black sm:text-6xl sm:text-balance"
			>
				Simple pricing for everyone
			</p>
		</div>
		<p
			class="inter mx-auto mt-6 max-w-2xl text-lg font-medium text-pretty text-black sm:text-center sm:text-xl"
		>
			Choose the plan that best fits your seasonal color analysis journey.
		</p>
		<div class="mt-12 flow-root">
			<div
				class="isolate grid max-w-sm grid-cols-1 gap-y-16 divide-y divide-gray-100 sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-4 lg:divide-x lg:divide-y-0 xl:-mx-4"
			>
				<div
					class="pt-16 px-8 lg:px-8 lg:pt-12 xl:px-14 bg-white rounded-3xl shadow-lg ring-1 ring-gray-900/5 pb-12"
				>
					<h3 id="tier-free" class="text-base/7 font-semibold text-black">Free</h3>
					<p class="mt-6 flex items-baseline gap-x-1">
						<span class="text-5xl font-semibold tracking-tight text-black">$0</span>
						<span class="text-sm/6 font-semibold text-gray-600">/forever</span>
					</p>
					<button
						type="button"
						aria-describedby="tier-free"
						class="mt-10 block w-full rounded-md bg-gray-200 px-3 py-2 text-center text-sm/6 font-semibold text-gray-800 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-gray-500"
						>Get Started</button
					>
					<p class="mt-10 text-sm/6 font-semibold text-black">
						Perfect for exploring seasonal color analysis.
					</p>
					<ul role="list" class="mt-6 space-y-3 text-sm/6 text-gray-600">
						<li class="flex gap-x-3">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								data-slot="icon"
								aria-hidden="true"
								class="h-6 w-5 flex-none text-black"
							>
								<path
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
									clip-rule="evenodd"
									fill-rule="evenodd"
								/>
							</svg>
							Basic color theory guide
						</li>
						<li class="flex gap-x-3">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								data-slot="icon"
								aria-hidden="true"
								class="h-6 w-5 flex-none text-black"
							>
								<path
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
									clip-rule="evenodd"
									fill-rule="evenodd"
								/>
							</svg>
							Access to blog content
						</li>
						<li class="flex gap-x-3">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								data-slot="icon"
								aria-hidden="true"
								class="h-6 w-5 flex-none text-black"
							>
								<path
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
									clip-rule="evenodd"
									fill-rule="evenodd"
								/>
							</svg>
							Basic color wheel tool
						</li>
						<li class="flex gap-x-3">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								data-slot="icon"
								aria-hidden="true"
								class="h-6 w-5 flex-none text-gray-400"
							>
								<path
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
									clip-rule="evenodd"
									fill-rule="evenodd"
								/>
							</svg>
							Community support
						</li>
					</ul>
				</div>
				<div
					class="pt-16 px-8 lg:px-8 lg:pt-12 xl:px-14 bg-white rounded-3xl shadow-lg ring-1 ring-gray-900/5 pb-12"
				>
					<h3 id="tier-basic" class="text-base/7 font-semibold text-black">Monthly</h3>
					<p class="mt-6 flex items-baseline gap-x-1">
						<span class="text-5xl font-semibold tracking-tight text-black">$9</span>
						<span class="text-sm/6 font-semibold text-gray-600">/month</span>
					</p>
					<button
						type="button"
						aria-describedby="tier-basic"
						class="mt-10 block w-full rounded-md bg-black px-3 py-2 text-center text-sm/6 font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black"
						>Get Started</button
					>
					<p class="mt-10 text-sm/6 font-semibold text-black">
						Perfect for beginners starting their color journey.
					</p>
					<ul role="list" class="mt-6 space-y-3 text-sm/6 text-gray-600">
						<li class="flex gap-x-3">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								data-slot="icon"
								aria-hidden="true"
								class="h-6 w-5 flex-none text-black"
							>
								<path
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
									clip-rule="evenodd"
									fill-rule="evenodd"
								/>
							</svg>
							Basic seasonal color analysis
						</li>
						<li class="flex gap-x-3">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								data-slot="icon"
								aria-hidden="true"
								class="h-6 w-5 flex-none text-black"
							>
								<path
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
									clip-rule="evenodd"
									fill-rule="evenodd"
								/>
							</svg>
							Access to 4 seasonal palettes
						</li>
						<li class="flex gap-x-3">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								data-slot="icon"
								aria-hidden="true"
								class="h-6 w-5 flex-none text-black"
							>
								<path
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
									clip-rule="evenodd"
									fill-rule="evenodd"
								/>
							</svg>
							Color matching tools
						</li>
						<li class="flex gap-x-3">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								data-slot="icon"
								aria-hidden="true"
								class="h-6 w-5 flex-none text-black"
							>
								<path
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
									clip-rule="evenodd"
									fill-rule="evenodd"
								/>
							</svg>
							Email support
						</li>
					</ul>
				</div>
				<div
					class="pt-16 px-8 lg:px-8 lg:pt-12 xl:px-14 bg-white rounded-3xl shadow-lg ring-1 ring-gray-900/5 pb-12"
				>
					<h3 id="tier-essential" class="text-base/7 font-semibold text-black">Yearly</h3>
					<p class="mt-6 flex items-baseline gap-x-1">
						<span class="text-5xl font-semibold tracking-tight text-black">$89</span>
						<span class="text-sm/6 font-semibold text-gray-600">/year</span>
					</p>
					<button
						type="button"
						aria-describedby="tier-essential"
						class="mt-10 block w-full rounded-md bg-black px-3 py-2 text-center text-sm/6 font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black"
						>Get Started</button
					>
					<p class="mt-10 text-sm/6 font-semibold text-black">
						Everything in Basic, plus advanced analysis and personal consultation.
					</p>
					<ul role="list" class="mt-6 space-y-3 text-sm/6 text-gray-600">
						<li class="flex gap-x-3">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								data-slot="icon"
								aria-hidden="true"
								class="h-6 w-5 flex-none text-black"
							>
								<path
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
									clip-rule="evenodd"
									fill-rule="evenodd"
								/>
							</svg>
							Advanced seasonal analysis
						</li>
						<li class="flex gap-x-3">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								data-slot="icon"
								aria-hidden="true"
								class="h-6 w-5 flex-none text-black"
							>
								<path
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
									clip-rule="evenodd"
									fill-rule="evenodd"
								/>
							</svg>
							Access to all 12 seasonal palettes
						</li>
						<li class="flex gap-x-3">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								data-slot="icon"
								aria-hidden="true"
								class="h-6 w-5 flex-none text-black"
							>
								<path
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
									clip-rule="evenodd"
									fill-rule="evenodd"
								/>
							</svg>
							Personal color consultation
						</li>
						<li class="flex gap-x-3">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								data-slot="icon"
								aria-hidden="true"
								class="h-6 w-5 flex-none text-black"
							>
								<path
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
									clip-rule="evenodd"
									fill-rule="evenodd"
								/>
							</svg>
							Priority support
						</li>
						<li class="flex gap-x-3">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								data-slot="icon"
								aria-hidden="true"
								class="h-6 w-5 flex-none text-black"
							>
								<path
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
									clip-rule="evenodd"
									fill-rule="evenodd"
								/>
							</svg>
							Custom color recommendations
						</li>
					</ul>
				</div>
				<div
					class="pt-16 px-8 lg:px-8 lg:pt-12 xl:px-14 bg-white rounded-3xl shadow-lg ring-1 ring-gray-900/5 pb-12"
				>
					<h3 id="tier-growth" class="text-base/7 font-semibold text-black">Lifetime</h3>
					<p class="mt-6 flex items-baseline gap-x-1">
						<span class="text-5xl font-semibold tracking-tight text-black">$199</span>
						<span class="text-sm/6 font-semibold text-gray-600">/one-time</span>
					</p>
					<button
						type="button"
						aria-describedby="tier-growth"
						class="mt-10 block w-full rounded-md bg-black px-3 py-2 text-center text-sm/6 font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black"
						>Get Started</button
					>
					<p class="mt-10 text-sm/6 font-semibold text-black">
						Everything in Professional, plus exclusive features and dedicated support.
					</p>
					<ul role="list" class="mt-6 space-y-3 text-sm/6 text-gray-600">
						<li class="flex gap-x-3">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								data-slot="icon"
								aria-hidden="true"
								class="h-6 w-5 flex-none text-black"
							>
								<path
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
									clip-rule="evenodd"
									fill-rule="evenodd"
								/>
							</svg>
							Complete color analysis
						</li>
						<li class="flex gap-x-3">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								data-slot="icon"
								aria-hidden="true"
								class="h-6 w-5 flex-none text-black"
							>
								<path
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
									clip-rule="evenodd"
									fill-rule="evenodd"
								/>
							</svg>
							Unlimited palette access
						</li>
						<li class="flex gap-x-3">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								data-slot="icon"
								aria-hidden="true"
								class="h-6 w-5 flex-none text-black"
							>
								<path
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
									clip-rule="evenodd"
									fill-rule="evenodd"
								/>
							</svg>
							1-on-1 color consultation
						</li>
						<li class="flex gap-x-3">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								data-slot="icon"
								aria-hidden="true"
								class="h-6 w-5 flex-none text-black"
							>
								<path
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
									clip-rule="evenodd"
									fill-rule="evenodd"
								/>
							</svg>
							Dedicated color specialist
						</li>
						<li class="flex gap-x-3">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								data-slot="icon"
								aria-hidden="true"
								class="h-6 w-5 flex-none text-black"
							>
								<path
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
									clip-rule="evenodd"
									fill-rule="evenodd"
								/>
							</svg>
							Personalized wardrobe analysis
						</li>
						<li class="flex gap-x-3">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								data-slot="icon"
								aria-hidden="true"
								class="h-6 w-5 flex-none text-black"
							>
								<path
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
									clip-rule="evenodd"
									fill-rule="evenodd"
								/>
							</svg>
							Exclusive color workshops
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
