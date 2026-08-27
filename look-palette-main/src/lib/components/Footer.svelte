<script lang="ts">
	const currentYear = new Date().getFullYear();
	let email = $state('');
	let isSubmitting = $state(false);

	async function handleSubscribe() {
		// Do nothing - just prevent form submission
		return;
	}
</script>

<footer class="bg-black px-4">
	<div class="mx-auto max-w-7xl pt-10 pb-8">
		<a
			href="/"
			class="oswald font-semibold tracking-wide text-3xl text-white hover:opacity-80 md:text-4xl"
			>LOOK PALETTE</a
		>

		<div class="mx-auto pb-8 pt-10 sm:pt-8 lg:pt-10">
			<div class="xl:grid xl:grid-cols-3 xl:gap-8">
				<div class="grid grid-cols-2 gap-8 xl:col-span-2">
					<div class="md:grid md:grid-cols-2 md:gap-8">
						<div>
							<h3 class="inter text-md font-semibold text-white">Navigation</h3>
							<ul role="list" class="inter mt-6 space-y-4">
								<li>
									<a href="/" class="inter text-sm/6 text-stone-300 hover:text-white">Home</a>
								</li>
								<li>
									<a href="/about" class="inter text-sm/6 text-stone-300 hover:text-white">About</a>
								</li>
								<li>
									<a href="/blog" class="inter text-sm/6 text-stone-300 hover:text-white">Blog</a>
								</li>
								<li>
									<a href="/contact" class="inter text-sm/6 text-stone-300 hover:text-white"
										>Contact</a
									>
								</li>
								<li>
									<a href="/faq" class="inter text-sm/6 text-stone-300 hover:text-white">FAQ</a>
								</li>
								<!--li>
									<a href="/pricing" class="inter text-sm/6 text-stone-300 hover:text-white"
										>Pricing</a
									>
								</li-->
							</ul>
						</div>
						<div class="mt-10 md:mt-0">
							<h3 class="inter text-md font-semibold text-white">Tools</h3>
							<ul role="list" class="inter mt-6 space-y-4">
								<li>
									<a
										href="/tools/seasonal-color-analysis"
										class="inter text-sm/6 text-stone-300 hover:text-white"
										>Seasonal Color Analysis</a
									>
								</li>
								<!--li>
									<a
										href="/tools/seasonal-style-analysis"
										class="inter text-sm/6 text-stone-300 hover:text-white"
										>Seasonal Style Analysis</a
									>
								</li-->
								<li>
									<a
										href="/tools/color-picker"
										class="inter text-sm/6 text-stone-300 hover:text-white">Image Color Picker</a
									>
								</li>
							</ul>
						</div>
					</div>
					<div class="md:grid md:grid-cols-2 md:gap-8">
						<div>
							<h3 class="inter text-md font-semibold text-white">Spring & Summer</h3>
							<ul role="list" class="inter mt-6 space-y-4">
								<li>
									<a
										href="/palettes/clear-spring"
										class="inter text-sm/6 text-stone-300 hover:text-white">Clear Spring</a
									>
								</li>
								<li>
									<a
										href="/palettes/warm-spring"
										class="inter text-sm/6 text-stone-300 hover:text-white">Warm Spring</a
									>
								</li>
								<li>
									<a
										href="/palettes/light-spring"
										class="inter text-sm/6 text-stone-300 hover:text-white">Light Spring</a
									>
								</li>
								<li>
									<a
										href="/palettes/light-summer"
										class="inter text-sm/6 text-stone-300 hover:text-white">Light Summer</a
									>
								</li>
								<li>
									<a
										href="/palettes/cool-summer"
										class="inter text-sm/6 text-stone-300 hover:text-white">Cool Summer</a
									>
								</li>
								<li>
									<a
										href="/palettes/soft-summer"
										class="inter text-sm/6 text-stone-300 hover:text-white">Soft Summer</a
									>
								</li>
							</ul>
						</div>
						<div class="mt-10 md:mt-0">
							<h3 class="inter text-md font-semibold text-white">Autumn & Winter</h3>
							<ul role="list" class="inter mt-6 space-y-4">
								<li>
									<a
										href="/palettes/soft-autumn"
										class="inter text-sm/6 text-stone-300 hover:text-white">Soft Autumn</a
									>
								</li>
								<li>
									<a
										href="/palettes/warm-autumn"
										class="inter text-sm/6 text-stone-300 hover:text-white">Warm Autumn</a
									>
								</li>
								<li>
									<a
										href="/palettes/deep-autumn"
										class="inter text-sm/6 text-stone-300 hover:text-white">Deep Autumn</a
									>
								</li>
								<li>
									<a
										href="/palettes/deep-winter"
										class="inter text-sm/6 text-stone-300 hover:text-white">Deep Winter</a
									>
								</li>
								<li>
									<a
										href="/palettes/cool-winter"
										class="inter text-sm/6 text-stone-300 hover:text-white">Cool Winter</a
									>
								</li>
								<li>
									<a
										href="/palettes/clear-winter"
										class="inter text-sm/6 text-stone-300 hover:text-white">Clear Winter</a
									>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="mt-10 xl:mt-0">
					<h3 class="inter text-md font-semibold text-white">Subscribe to our newsletter</h3>
					<p class="inter mt-2 text-sm/6 text-stone-300">
						The latest news and updates sent to your inbox.
					</p>
					<form
						class="mt-6 sm:flex sm:max-w-md"
						onsubmit={(e) => {
							e.preventDefault();
							handleSubscribe();
						}}
					>
						<label for="email-address" class="sr-only">Email address</label>
						<input
							type="email"
							name="email-address"
							id="email-address"
							bind:value={email}
							autocomplete="email"
							required
							class="inter w-full min-w-0 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-stone-600 placeholder:text-stone-400 focus:outline focus:-outline-offset-2 focus:outline-white sm:w-64 sm:text-sm/6 xl:w-full"
							placeholder="Enter your email"
						/>
						<div class="mt-4 sm:ml-4 sm:mt-0 sm:shrink-0">
							<button
								type="submit"
								class="inter flex w-full items-center justify-center rounded-md bg-stone-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-stone-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
								disabled={isSubmitting}
							>
								{isSubmitting ? 'Submitting...' : 'Subscribe'}
							</button>
						</div>
					</form>
					<p class="inter mt-3 text-xs text-stone-400 leading-relaxed">
						By subscribing, you agree to receive occasional product updates and news. You can
						unsubscribe anytime. See our <a
							href="/privacy-policy"
							class="text-stone-300 hover:text-white underline">Privacy Policy</a
						>.
					</p>
				</div>
			</div>
		</div>

		<div class="mt-5 border-t border-white/10 pt-8 sm:mt-4 lg:mt-6">
			<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div class="flex items-center gap-4 text-sm md:gap-5 md:text-base">
					<a
						href="https://www.facebook.com/lookpalette"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-400 hover:text-white"
					>
						<img src="/social/facebook.svg" alt="Facebook" class="h-5 w-5 md:h-5 md:w-5" />
					</a>
					<a
						href="https://www.instagram.com/look.palette/"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-400 hover:text-white"
					>
						<img src="/social/instagram.svg" alt="Instagram" class="h-6 w-6 md:h-6 md:w-6" />
					</a>
					<a
						href="https://x.com/lookpalettecom"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-400 hover:text-white"
					>
						<img src="/social/twitter.svg" alt="Twitter" class="h-4 w-4 md:h-4 md:w-4" />
					</a>
					<a
						href="https://bsky.app/profile/lookpalette.bsky.social"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-400 hover:text-white"
					>
						<img src="/social/bluesky.svg" alt="Bluesky" class="h-4 w-4 md:h-4 md:w-4" />
					</a>
					<a
						href="https://www.threads.com/@look.palette"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-400 hover:text-white"
					>
						<img src="/social/threads.svg" alt="Threads" class="h-4 w-4 md:h-4 md:w-4" />
					</a>
					<a
						href="https://www.youtube.com/@lookpalette"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-400 hover:text-white"
					>
						<img src="/social/youtube.svg" alt="Youtube" class="h-5 w-5 md:h-5 md:w-5" />
					</a>
					<a
						href="https://www.tiktok.com/@look.palette"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-400 hover:text-white"
					>
						<img src="/social/tiktok.svg" alt="TikTok" class="h-5 w-5 md:h-5 md:w-5" />
					</a>
					<a
						href="https://au.pinterest.com/lookpalette/"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-400 hover:text-white"
					>
						<img src="/social/pinterest.svg" alt="Pinterest" class="h-5 w-5 md:h-5 md:w-5" />
					</a>
				</div>

				<div class="inter md:text-md text-sm text-white">
					<span>&copy; {currentYear} Look Palette. All rights reserved.</span>
					<span> | </span>
					<a href="/privacy-policy" class="inter text-sm/6 text-white hover:text-gray-300"
						>Privacy Policy</a
					>
					<span> | </span>
					<a href="/terms-and-conditions" class="inter text-sm/6 text-white hover:text-gray-300"
						>Terms and Conditions</a
					>
				</div>
			</div>
		</div>
	</div>
</footer>
