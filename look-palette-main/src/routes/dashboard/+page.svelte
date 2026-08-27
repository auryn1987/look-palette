<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import type {
		Profile,
		Newsletter_Subscriptions,
		User_Palettes,
		Seasonal_Palettes
	} from '$lib/types';

	// Country list
	const countries = [
		'Afghanistan',
		'Albania',
		'Algeria',
		'Andorra',
		'Angola',
		'Antigua and Barbuda',
		'Argentina',
		'Armenia',
		'Australia',
		'Austria',
		'Azerbaijan',
		'Bahamas',
		'Bahrain',
		'Bangladesh',
		'Barbados',
		'Belarus',
		'Belgium',
		'Belize',
		'Benin',
		'Bhutan',
		'Bolivia',
		'Bosnia and Herzegovina',
		'Botswana',
		'Brazil',
		'Brunei',
		'Bulgaria',
		'Burkina Faso',
		'Burundi',
		'Cabo Verde',
		'Cambodia',
		'Cameroon',
		'Canada',
		'Central African Republic',
		'Chad',
		'Chile',
		'China',
		'Colombia',
		'Comoros',
		'Congo',
		'Costa Rica',
		'Croatia',
		'Cuba',
		'Cyprus',
		'Czech Republic',
		'Democratic Republic of the Congo',
		'Denmark',
		'Djibouti',
		'Dominica',
		'Dominican Republic',
		'Ecuador',
		'Egypt',
		'El Salvador',
		'Equatorial Guinea',
		'Eritrea',
		'Estonia',
		'Eswatini',
		'Ethiopia',
		'Fiji',
		'Finland',
		'France',
		'Gabon',
		'Gambia',
		'Georgia',
		'Germany',
		'Ghana',
		'Greece',
		'Grenada',
		'Guatemala',
		'Guinea',
		'Guinea-Bissau',
		'Guyana',
		'Haiti',
		'Honduras',
		'Hungary',
		'Iceland',
		'India',
		'Indonesia',
		'Iran',
		'Iraq',
		'Ireland',
		'Israel',
		'Italy',
		'Jamaica',
		'Japan',
		'Jordan',
		'Kazakhstan',
		'Kenya',
		'Kiribati',
		'Kuwait',
		'Kyrgyzstan',
		'Laos',
		'Latvia',
		'Lebanon',
		'Lesotho',
		'Liberia',
		'Libya',
		'Liechtenstein',
		'Lithuania',
		'Luxembourg',
		'Madagascar',
		'Malawi',
		'Malaysia',
		'Maldives',
		'Mali',
		'Malta',
		'Marshall Islands',
		'Mauritania',
		'Mauritius',
		'Mexico',
		'Micronesia',
		'Moldova',
		'Monaco',
		'Mongolia',
		'Montenegro',
		'Morocco',
		'Mozambique',
		'Myanmar',
		'Namibia',
		'Nauru',
		'Nepal',
		'Netherlands',
		'New Zealand',
		'Nicaragua',
		'Niger',
		'Nigeria',
		'North Korea',
		'North Macedonia',
		'Norway',
		'Oman',
		'Pakistan',
		'Palau',
		'Palestine',
		'Panama',
		'Papua New Guinea',
		'Paraguay',
		'Peru',
		'Philippines',
		'Poland',
		'Portugal',
		'Qatar',
		'Romania',
		'Russia',
		'Rwanda',
		'Saint Kitts and Nevis',
		'Saint Lucia',
		'Saint Vincent and the Grenadines',
		'Samoa',
		'San Marino',
		'Sao Tome and Principe',
		'Saudi Arabia',
		'Senegal',
		'Serbia',
		'Seychelles',
		'Sierra Leone',
		'Singapore',
		'Slovakia',
		'Slovenia',
		'Solomon Islands',
		'Somalia',
		'South Africa',
		'South Korea',
		'South Sudan',
		'Spain',
		'Sri Lanka',
		'Sudan',
		'Suriname',
		'Sweden',
		'Switzerland',
		'Syria',
		'Taiwan',
		'Tajikistan',
		'Tanzania',
		'Thailand',
		'Timor-Leste',
		'Togo',
		'Tonga',
		'Trinidad and Tobago',
		'Tunisia',
		'Turkey',
		'Turkmenistan',
		'Tuvalu',
		'Uganda',
		'Ukraine',
		'United Arab Emirates',
		'United Kingdom',
		'United States',
		'Uruguay',
		'Uzbekistan',
		'Vanuatu',
		'Vatican City',
		'Venezuela',
		'Vietnam',
		'Yemen',
		'Zambia',
		'Zimbabwe'
	];

	let { data } = $props<{ data: { user: any } }>();
	let user = $state(data.user);
	let profile = $state<Profile | null>(null);
	let newsletterSubscription = $state<Newsletter_Subscriptions | null>(null);
	let currentPalette = $state<User_Palettes | null>(null);
	let loading = $state(true);
	let message = $state<{ type: 'success' | 'error'; text: string } | null>(null);

	// Edit states for individual fields
	let editingDisplayName = $state(false);
	let editingCountry = $state(false);
	let editingPalette = $state(false);
	let savingDisplayName = $state(false);
	let savingCountry = $state(false);
	let savingNewsletter = $state(false);
	let savingPalette = $state(false);

	// Form values
	let displayNameValue = $state('');
	let countryValue = $state('');
	let paletteValue = $state<Seasonal_Palettes | ''>('');

	// Seasonal palettes list
	const seasonalPalettes: Seasonal_Palettes[] = [
		'Clear Spring',
		'Warm Spring',
		'Light Spring',
		'Light Summer',
		'Cool Summer',
		'Soft Summer',
		'Clear Winter',
		'Cool Winter',
		'Deep Winter',
		'Warm Autumn',
		'Soft Autumn',
		'Deep Autumn'
	];

	onMount(async () => {
		// Check if user is authenticated on the client side
		const {
			data: { session }
		} = await supabase.auth.getSession();

		if (session?.user) {
			user = {
				id: session.user.id,
				email: session.user.email,
				created_at: session.user.created_at
			};

			// Load user profile, newsletter subscription, and current palette
			await loadProfile(session.user.id);
			await loadNewsletterSubscription(session.user.id);
			await loadCurrentPalette(session.user.id);

			// Sync the session with the server
			try {
				await fetch('/api/auth/sync-session', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						user: {
							id: session.user.id,
							email: session.user.email,
							created_at: session.user.created_at
						}
					})
				});
			} catch (error) {
				console.error('Failed to sync session:', error);
			}
		} else {
			// Redirect to signin if not authenticated
			goto('/signin');
		}
	});

	async function loadProfile(userId: string) {
		try {
			const { data: profileData, error } = await supabase
				.from('profiles')
				.select('*')
				.eq('user_id', userId)
				.single();

			if (error && error.code !== 'PGRST116') {
				// PGRST116 = no rows returned
				console.error('Error loading profile:', error);
				message = { type: 'error', text: 'Failed to load profile data' };
			} else if (profileData) {
				profile = profileData;
				displayNameValue = profileData.display_name || '';
				countryValue = profileData.country || '';
			} else {
				// No profile exists, create a default one
				await createProfile(userId);
			}
		} catch (error) {
			console.error('Error loading profile:', error);
			message = { type: 'error', text: 'Failed to load profile data' };
		} finally {
			loading = false;
		}
	}

	async function createProfile(userId: string) {
		try {
			const { data: newProfile, error } = await supabase
				.from('profiles')
				.insert([
					{
						user_id: userId,
						display_name: user?.email?.split('@')[0] || 'User',
						country: '',
						created_at: new Date().toISOString(),
						updated_at: new Date().toISOString()
					}
				])
				.select()
				.single();

			if (error) {
				console.error('Error creating profile:', error);
				message = { type: 'error', text: 'Failed to create profile' };
			} else {
				profile = newProfile;
				displayNameValue = newProfile.display_name;
				countryValue = newProfile.country;
			}
		} catch (error) {
			console.error('Error creating profile:', error);
			message = { type: 'error', text: 'Failed to create profile' };
		}
	}

	async function loadNewsletterSubscription(userId: string) {
		try {
			const { data: subscriptionData, error } = await supabase
				.from('newsletter_subscriptions')
				.select('*')
				.eq('user_id', userId)
				.single();

			if (error && error.code !== 'PGRST116') {
				// PGRST116 = no rows returned
				console.error('Error loading newsletter subscription:', error);
			} else if (subscriptionData) {
				newsletterSubscription = subscriptionData;
			}
			// If no subscription exists, newsletterSubscription remains null
		} catch (error) {
			console.error('Error loading newsletter subscription:', error);
		}
	}

	async function loadCurrentPalette(userId: string) {
		try {
			const { data: paletteData, error } = await supabase
				.from('user_palettes')
				.select('*')
				.eq('user_id', userId)
				.eq('is_current', true)
				.single();

			if (error && error.code !== 'PGRST116') {
				// PGRST116 = no rows returned
				console.error('Error loading current palette:', error);
			} else if (paletteData) {
				currentPalette = paletteData;
				paletteValue = paletteData.season;
			}
			// If no current palette exists, currentPalette remains null
		} catch (error) {
			console.error('Error loading current palette:', error);
		}
	}

	function startEditingDisplayName() {
		displayNameValue = profile?.display_name || '';
		editingDisplayName = true;
	}

	function cancelEditingDisplayName() {
		displayNameValue = profile?.display_name || '';
		editingDisplayName = false;
	}

	async function saveDisplayName() {
		if (!user?.id || !displayNameValue.trim()) return;

		savingDisplayName = true;
		message = null;

		try {
			const { data: updatedProfile, error } = await supabase
				.from('profiles')
				.update({
					display_name: displayNameValue.trim(),
					updated_at: new Date().toISOString()
				})
				.eq('user_id', user.id)
				.select()
				.single();

			if (error) {
				console.error('Error updating display name:', error);
				message = { type: 'error', text: 'Failed to update display name' };
			} else {
				profile = updatedProfile;
				editingDisplayName = false;
				message = { type: 'success', text: 'Display name updated successfully!' };
				setTimeout(() => {
					message = null;
				}, 3000);
			}
		} catch (error) {
			console.error('Error updating display name:', error);
			message = { type: 'error', text: 'Failed to update display name' };
		} finally {
			savingDisplayName = false;
		}
	}

	function startEditingCountry() {
		countryValue = profile?.country || '';
		editingCountry = true;
	}

	function cancelEditingCountry() {
		countryValue = profile?.country || '';
		editingCountry = false;
	}

	async function saveCountry() {
		if (!user?.id) return;

		savingCountry = true;
		message = null;

		try {
			const { data: updatedProfile, error } = await supabase
				.from('profiles')
				.update({
					country: countryValue.trim(),
					updated_at: new Date().toISOString()
				})
				.eq('user_id', user.id)
				.select()
				.single();

			if (error) {
				console.error('Error updating country:', error);
				message = { type: 'error', text: 'Failed to update country' };
			} else {
				profile = updatedProfile;
				editingCountry = false;
				message = { type: 'success', text: 'Country updated successfully!' };
				setTimeout(() => {
					message = null;
				}, 3000);
			}
		} catch (error) {
			console.error('Error updating country:', error);
			message = { type: 'error', text: 'Failed to update country' };
		} finally {
			savingCountry = false;
		}
	}

	async function toggleNewsletterSubscription() {
		if (!user?.id || !user?.email) return;

		savingNewsletter = true;
		message = null;

		try {
			if (!newsletterSubscription) {
				// Create new subscription
				const { data: newSubscription, error } = await supabase
					.from('newsletter_subscriptions')
					.insert([
						{
							user_id: user.id,
							email: user.email,
							status: 'subscribed',
							source: 'dashboard',
							double_opt_in_token: crypto.randomUUID(),
							confirmed_at: new Date().toISOString(),
							created_at: new Date().toISOString()
						}
					])
					.select()
					.single();

				if (error) {
					console.error('Error creating newsletter subscription:', error);
					message = { type: 'error', text: `Failed to subscribe to newsletter: ${error.message}` };
				} else {
					newsletterSubscription = newSubscription;
					message = { type: 'success', text: 'Successfully subscribed to newsletter!' };
					setTimeout(() => {
						message = null;
					}, 3000);
				}
			} else {
				// Update existing subscription
				const newStatus =
					newsletterSubscription.status === 'subscribed' ? 'unsubscribed' : 'subscribed';

				const { data: updatedSubscription, error } = await supabase
					.from('newsletter_subscriptions')
					.update({
						status: newStatus,
						unsubscribed_at: newStatus === 'unsubscribed' ? new Date().toISOString() : null,
						confirmed_at: newStatus === 'subscribed' ? new Date().toISOString() : null
					})
					.eq('user_id', user.id)
					.select()
					.single();

				if (error) {
					console.error('Error updating newsletter subscription:', error);
					message = { type: 'error', text: 'Failed to update newsletter subscription' };
				} else {
					newsletterSubscription = updatedSubscription;
					const actionText = newStatus === 'subscribed' ? 'subscribed to' : 'unsubscribed from';
					message = { type: 'success', text: `Successfully ${actionText} newsletter!` };
					setTimeout(() => {
						message = null;
					}, 3000);
				}
			}
		} catch (error) {
			console.error('Error managing newsletter subscription:', error);
			message = { type: 'error', text: 'Failed to update newsletter subscription' };
		} finally {
			savingNewsletter = false;
		}
	}

	function startEditingPalette() {
		paletteValue = currentPalette?.season || '';
		editingPalette = true;
	}

	function cancelEditingPalette() {
		paletteValue = currentPalette?.season || '';
		editingPalette = false;
	}

	async function savePalette() {
		if (!user?.id || !paletteValue) return;

		savingPalette = true;
		message = null;

		try {
			// First, set all existing palettes for this user to is_current = false
			const { error: updateError } = await supabase
				.from('user_palettes')
				.update({ is_current: false })
				.eq('user_id', user.id);

			if (updateError) {
				console.error('Error updating existing palettes:', updateError);
				message = { type: 'error', text: 'Failed to update palette' };
				return;
			}

			// Then create a new palette record with is_current = true
			const { data: newPalette, error: insertError } = await supabase
				.from('user_palettes')
				.insert([
					{
						user_id: user.id,
						season: paletteValue,
						method: 'manual_selection',
						confidence: 100,
						source_image_path: '',
						is_current: true,
						created_at: new Date().toISOString()
					}
				])
				.select()
				.single();

			if (insertError) {
				console.error('Error creating new palette:', insertError);
				message = { type: 'error', text: 'Failed to save new palette' };
			} else {
				currentPalette = newPalette;
				editingPalette = false;
				message = { type: 'success', text: 'Palette updated successfully!' };
				setTimeout(() => {
					message = null;
				}, 3000);
			}
		} catch (error) {
			console.error('Error saving palette:', error);
			message = { type: 'error', text: 'Failed to update palette' };
		} finally {
			savingPalette = false;
		}
	}

	function getNewsletterStatus() {
		if (!newsletterSubscription) return 'Not subscribed';

		switch (newsletterSubscription.status) {
			case 'subscribed':
				return 'Subscribed';
			case 'unsubscribed':
				return 'Unsubscribed';
			case 'unconfirmed':
				return 'Pending confirmation';
			case 'bounced':
				return 'Email bounced';
			default:
				return 'Unknown status';
		}
	}

	function getNewsletterButtonText() {
		if (!newsletterSubscription || newsletterSubscription.status !== 'subscribed') {
			return 'Subscribe';
		} else {
			return 'Unsubscribe';
		}
	}

	async function handleLogout() {
		try {
			const { error } = await supabase.auth.signOut();
			if (!error) {
				goto('/');
			} else {
				console.error('Logout failed:', error);
			}
		} catch (error) {
			console.error('Logout failed:', error);
		}
	}
</script>

<svelte:head>
	<title>Dashboard | Look Palette</title>
	<meta name="description" content="Your Look Palette dashboard" />
</svelte:head>

<div
	class="isolate bg-white px-6 py-8 sm:py-10 lg:px-8"
	style="background-image: url('/hero/hero-image-dashboard.avif'); background-size: cover; background-position: center; background-repeat: no-repeat;"
>
	<div class="mx-auto max-w-2xl">
		<h2
			class="inter text-center text-5xl font-semibold tracking-tight mt-2 text-balance text-black sm:text-6xl"
		>
			Dashboard
		</h2>

		<p class="inter mt-4 text-center text-lg text-black mb-8 sm:text-xl">
			Manage your account and subscriptions.
		</p>

		{#if loading}
			<div class="text-center">
				<div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
				<p class="mt-4 text-gray-600">Loading...</p>
			</div>
		{:else if user}
			<div class="bg-white rounded-3xl shadow-lg ring-1 ring-gray-900/5 p-8">
				<div class="text-center mb-8">
					<h2 class="inter text-xl font-semibold text-black mb-2">
						Welcome back{profile?.display_name ? `, ${profile.display_name}` : ''}!
					</h2>
					<p class="inter text-sm text-gray-500">
						{user.email}
					</p>
				</div>

				{#if message}
					<div
						class="mb-6 p-4 rounded-lg {message.type === 'success'
							? 'bg-green-50 text-green-700 border border-green-200'
							: 'bg-red-50 text-red-700 border border-red-200'}"
					>
						{message.text}
					</div>
				{/if}

				<div class="space-y-4">
					<!-- Display Name -->
					<div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
						<div class="flex-1">
							<span class="inter text-sm font-medium text-gray-700">Display Name</span>
							{#if editingDisplayName}
								<div class="mt-2 flex items-center gap-2">
									<input
										type="text"
										bind:value={displayNameValue}
										class="flex-1 inter px-3 py-1 text-sm border border-gray-300 rounded"
										placeholder="Enter display name"
									/>
									<button
										onclick={saveDisplayName}
										disabled={savingDisplayName || !displayNameValue.trim()}
										class="px-3 py-1 bg-black text-white text-sm rounded hover:opacity-80 disabled:opacity-50"
									>
										{savingDisplayName ? 'Saving...' : 'Save'}
									</button>
									<button
										onclick={cancelEditingDisplayName}
										class="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
									>
										Cancel
									</button>
								</div>
							{:else}
								<div class="mt-1 flex items-center justify-between">
									<span class="inter text-sm text-gray-500">
										{profile?.display_name || 'Not set'}
									</span>
									<button
										onclick={startEditingDisplayName}
										class="inter text-sm text-black hover:underline"
									>
										Edit
									</button>
								</div>
							{/if}
						</div>
					</div>

					<!-- Seasonal Palette -->
					<div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
						<div class="flex-1">
							<span class="inter text-sm font-medium text-gray-700">Seasonal Palette</span>
							{#if editingPalette}
								<div class="mt-2 flex items-center gap-2">
									<select
										bind:value={paletteValue}
										class="flex-1 inter px-3 py-1 text-sm border border-gray-300 rounded bg-white"
									>
										<option value="">Select a palette</option>
										{#each seasonalPalettes as palette}
											<option value={palette}>{palette}</option>
										{/each}
									</select>
									<button
										onclick={savePalette}
										disabled={savingPalette || !paletteValue}
										class="px-3 py-1 bg-black text-white text-sm rounded hover:opacity-80 disabled:opacity-50"
									>
										{savingPalette ? 'Saving...' : 'Save'}
									</button>
									<button
										onclick={cancelEditingPalette}
										class="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
									>
										Cancel
									</button>
								</div>
							{:else}
								<div class="mt-1 flex items-center justify-between">
									<span class="inter text-sm text-gray-500">
										{currentPalette?.season || 'Not set'}
									</span>
									<button
										onclick={startEditingPalette}
										class="inter text-sm text-black hover:underline"
									>
										Edit
									</button>
								</div>
							{/if}
						</div>
					</div>

					<!-- Country -->
					<div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
						<div class="flex-1">
							<span class="inter text-sm font-medium text-gray-700">Country</span>
							{#if editingCountry}
								<div class="mt-2 flex items-center gap-2">
									<select
										bind:value={countryValue}
										class="flex-1 inter px-3 py-1 text-sm border border-gray-300 rounded bg-white"
									>
										<option value="">Select a country</option>
										{#each countries as country}
											<option value={country}>{country}</option>
										{/each}
									</select>
									<button
										onclick={saveCountry}
										disabled={savingCountry}
										class="px-3 py-1 bg-black text-white text-sm rounded hover:opacity-80 disabled:opacity-50"
									>
										{savingCountry ? 'Saving...' : 'Save'}
									</button>
									<button
										onclick={cancelEditingCountry}
										class="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
									>
										Cancel
									</button>
								</div>
							{:else}
								<div class="mt-1 flex items-center justify-between">
									<span class="inter text-sm text-gray-500">
										{profile?.country || 'Not set'}
									</span>
									<button
										onclick={startEditingCountry}
										class="inter text-sm text-black hover:underline"
									>
										Edit
									</button>
								</div>
							{/if}
						</div>
					</div>

					<!-- Newsletter Subscription -->
					<div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
						<div class="flex-1">
							<span class="inter text-sm font-medium text-gray-700">Newsletter Subscription</span>
							<div class="mt-1 flex items-center justify-between">
								<span class="inter text-sm text-gray-500">
									{getNewsletterStatus()}
								</span>
								<button
									onclick={toggleNewsletterSubscription}
									disabled={savingNewsletter}
									class="inter text-sm text-black hover:underline disabled:opacity-50"
								>
									{savingNewsletter ? 'Updating...' : getNewsletterButtonText()}
								</button>
							</div>
						</div>
					</div>

					<!-- Sign Out Button -->
					<div class="pt-6">
						<button
							onclick={handleLogout}
							class="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors inter font-medium"
						>
							Sign out
						</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
