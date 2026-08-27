<script lang="ts">
	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let message = $state('');
	let isSubmitting = $state(false);

	type MessageType = 'success' | 'error';
	interface ContactMessage {
		type: MessageType;
		text: string;
	}

	let contactMessage = $state<ContactMessage | null>(null);

	const MAX_MESSAGE_LENGTH = 1000;
	const messageLength = $derived(message.length);
	const messageRemaining = $derived(MAX_MESSAGE_LENGTH - messageLength);

	async function handleSubmit(e: Event) {
		e.preventDefault();

		// Clear previous messages
		contactMessage = null;

		// Basic validation
		if (!firstName.trim() || !lastName.trim() || !email.trim() || !message.trim()) {
			contactMessage = {
				type: 'error',
				text: 'All fields are required'
			};
			return;
		}

		if (firstName.trim().length > 50 || lastName.trim().length > 50) {
			contactMessage = {
				type: 'error',
				text: 'Names must be 50 characters or less'
			};
			return;
		}

		if (message.trim().length < 10) {
			contactMessage = {
				type: 'error',
				text: 'Message must be at least 10 characters long'
			};
			return;
		}

		if (message.trim().length > MAX_MESSAGE_LENGTH) {
			contactMessage = {
				type: 'error',
				text: `Message must be no more than ${MAX_MESSAGE_LENGTH} characters`
			};
			return;
		}

		isSubmitting = true;

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					firstName: firstName.trim(),
					lastName: lastName.trim(),
					email: email.trim(),
					message: message.trim()
				})
			});

			const data = await response.json();

			if (response.ok) {
				contactMessage = {
					type: 'success',
					text: "Thank you for your message! We'll get back to you soon."
				};
				// Clear form
				firstName = '';
				lastName = '';
				email = '';
				message = '';
			} else {
				contactMessage = {
					type: 'error',
					text: data.error || 'Failed to send message. Please try again.'
				};
			}
		} catch (error) {
			contactMessage = {
				type: 'error',
				text: 'An error occurred. Please try again later.'
			};
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Contact Us | Look Palette</title>
	<meta name="description" content="Have a question? Contact us and we'll get back to you asap." />
</svelte:head>

<div
	class="isolate bg-white px-4 md:px-8 py-4 md:py-8"
	style="background-image: url('/hero/hero-autumn-deep.avif'); background-size: cover; background-position: center; background-repeat: no-repeat;"
>
	<h2
		class="inter text-center mt-2 text-5xl font-semibold tracking-tight text-pretty text-black md:text-6xl"
	>
		Contact us
	</h2>
	<p class="inter mt-4 text-center text-xl text-black mb-8">
		Have a question?
		<br class="sm:hidden" />
		Contact us and we'll get back to you asap.
	</p>

	<div
		class="mx-auto max-w-2xl bg-white rounded-3xl shadow-lg ring-1 ring-gray-900/5 p-6 md:p-8 mb-10 md:mb-20"
	>
		<form onsubmit={handleSubmit} class="mx-auto max-w-xl">
			<div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
				<div>
					<label for="first-name" class="inter block text-sm/6 font-semibold text-black"
						>First name</label
					>
					<div class="mt-2.5">
						<input
							id="first-name"
							type="text"
							name="first-name"
							bind:value={firstName}
							autocomplete="given-name"
							required
							maxlength="50"
							class="inter block w-full rounded-md bg-white px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black"
							placeholder="Enter your first name"
						/>
					</div>
				</div>
				<div>
					<label for="last-name" class="inter block text-sm/6 font-semibold text-black"
						>Last name</label
					>
					<div class="mt-2.5">
						<input
							id="last-name"
							type="text"
							name="last-name"
							bind:value={lastName}
							autocomplete="family-name"
							required
							maxlength="50"
							class="inter block w-full rounded-md bg-white px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black"
							placeholder="Enter your last name"
						/>
					</div>
				</div>
				<div class="sm:col-span-2">
					<label for="email" class="inter block text-sm/6 font-semibold text-black">Email</label>
					<div class="mt-2.5">
						<input
							id="email"
							type="email"
							name="email"
							bind:value={email}
							autocomplete="email"
							required
							class="inter block w-full rounded-md bg-white px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black"
							placeholder="Enter your email address"
						/>
					</div>
				</div>
				<div class="sm:col-span-2">
					<label for="message" class="inter block text-sm/6 font-semibold text-black">Message</label
					>
					<div class="mt-2.5">
						<textarea
							id="message"
							name="message"
							bind:value={message}
							rows="4"
							required
							maxlength={MAX_MESSAGE_LENGTH}
							class="inter block w-full rounded-md bg-white px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black"
							placeholder="Enter your message (minimum 10 characters)"
						></textarea>
						<div class="mt-1 text-right">
							<span
								class="inter text-xs text-gray-500 {messageRemaining < 50 ? 'text-red-500' : ''}"
							>
								{messageLength}/{MAX_MESSAGE_LENGTH} characters
							</span>
						</div>
					</div>
				</div>
			</div>

			{#if contactMessage}
				<div class="mt-6">
					<div
						class="inter text-sm {contactMessage.type === 'success'
							? 'text-green-600'
							: 'text-red-600'}"
					>
						{contactMessage.text}
					</div>
				</div>
			{/if}

			<div class="mt-10">
				<button
					type="submit"
					disabled={isSubmitting}
					class="block w-full rounded-md bg-black px-3 py-2 text-center text-sm/6 font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50 disabled:cursor-not-allowed"
					>{isSubmitting ? 'Sending...' : 'Send message'}</button
				>
			</div>
		</form>
	</div>
</div>
