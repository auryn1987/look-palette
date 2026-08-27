<script lang="ts">
	import { onMount } from 'svelte';

	let fileInput: HTMLInputElement;
	let canvas = $state<HTMLCanvasElement>();
	let ctx: CanvasRenderingContext2D;
	let image = $state<HTMLImageElement>();
	let uploadedImage = $state<string | null>(null);
	let extractedColors = $state<string[]>([]);
	let originalRgbColors = $state<Array<{ r: number; g: number; b: number }>>([]);
	let isImageLoaded = $state(false);
	let colorFormat = $state<'hex' | 'rgb' | 'hsl' | 'hsb'>('hex');
	let copiedIndex = $state<number | null>(null);
	let imageData = $state<ImageData | null>(null);
	let originalImageData = $state<Uint8ClampedArray | null>(null);
	let originalImageWidth = $state(0);
	let originalImageHeight = $state(0);

	// Reactive statement to initialize canvas when it becomes available
	$effect(() => {
		if (canvas && !ctx) {
			ctx = canvas.getContext('2d')!;
			console.log('Canvas context created via reactive statement');
		}
	});

	// Convert existing colors when format changes
	$effect(() => {
		// Only run when colorFormat changes
		colorFormat;

		if (originalRgbColors.length > 0) {
			// Convert stored RGB values to new format
			extractedColors = originalRgbColors.map((rgb) => convertColor(rgb.r, rgb.g, rgb.b));
		}
	});

	// Function to manually initialize canvas
	function initCanvas() {
		if (canvas && !ctx) {
			ctx = canvas.getContext('2d')!;
			console.log('Canvas manually initialized');
		}
	}

	async function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file && file.type.startsWith('image/')) {
			try {
				// Extract raw image data first
				const rawData = await extractRawImageData(file);
				originalImageData = rawData.data;
				originalImageWidth = rawData.width;
				originalImageHeight = rawData.height;
				console.log('Raw image data extracted:', rawData.width, 'x', rawData.height);

				// Then load for display
				const reader = new FileReader();
				reader.onload = (e) => {
					uploadedImage = e.target?.result as string;
					loadImage();
				};
				reader.readAsDataURL(file);
			} catch (error) {
				console.error('Error extracting raw image data:', error);
				const reader = new FileReader();
				reader.onload = (e) => {
					uploadedImage = e.target?.result as string;
					loadImage();
				};
				reader.readAsDataURL(file);
			}
		}
	}

	function loadImage() {
		if (!uploadedImage) return;

		console.log('Starting to load image from:', uploadedImage.substring(0, 50) + '...');

		image = new Image();
		image.onload = () => {
			console.log('Image loaded successfully:', image?.width, 'x', image?.height);

			// Ensure canvas is ready
			if (!canvas) {
				console.log('Canvas not ready, retrying...');
				setTimeout(() => loadImage(), 100);
				return;
			}

			// Initialize canvas context if needed
			if (!ctx) {
				ctx = canvas.getContext('2d')!;
				console.log('Canvas context initialized');
			}

			console.log('About to call drawImage()');
			drawImage();
			console.log('drawImage() called');
		};
		image.onerror = (e) => {
			console.error('Image load error:', e);
		};
		image.src = uploadedImage;
	}

	function drawImage() {
		console.log('drawImage called with:', { canvas: !!canvas, ctx: !!ctx, image: !!image });

		if (!canvas || !ctx || !image) {
			console.log('Missing required elements:', { canvas: !!canvas, ctx: !!ctx, image: !!image });
			return;
		}

		try {
			// Original image data should already be extracted in handleFileUpload
			if (!originalImageData) {
				console.log('No original image data available, extracting now...');
				// Create a temporary canvas to get the original image data
				const tempCanvas = document.createElement('canvas');
				const tempCtx = tempCanvas.getContext('2d')!;
				tempCanvas.width = image.width;
				tempCanvas.height = image.height;

				// Disable smoothing and draw at original size
				tempCtx.imageSmoothingEnabled = false;
				tempCtx.drawImage(image, 0, 0);

				// Get the original image data
				imageData = tempCtx.getImageData(0, 0, image.width, image.height);
				originalImageData = imageData.data;
				originalImageWidth = image.width;
				originalImageHeight = image.height;
				console.log('Original image data stored:', imageData.data.length, 'pixels');
			}

			// Now draw to display canvas with proper sizing
			const maxWidth = 800;
			const maxHeight = 600;
			const aspectRatio = image.width / image.height;

			let displayWidth = image.width;
			let displayHeight = image.height;

			if (displayWidth > maxWidth) {
				displayWidth = maxWidth;
				displayHeight = maxWidth / aspectRatio;
			}

			if (displayHeight > maxHeight) {
				displayHeight = maxHeight;
				displayWidth = maxHeight * aspectRatio;
			}

			// Set display canvas dimensions
			canvas.width = displayWidth;
			canvas.height = displayHeight;

			// Get fresh context for display
			ctx = canvas.getContext('2d')!;
			ctx.imageSmoothingEnabled = false;

			// Clear and draw to display canvas
			ctx.clearRect(0, 0, displayWidth, displayHeight);
			ctx.drawImage(image, 0, 0, displayWidth, displayHeight);

			console.log('Display canvas drawn:', { displayWidth, displayHeight });
			isImageLoaded = true;
			console.log('isImageLoaded set to true');
		} catch (error) {
			console.error('Error in drawImage:', error);
		}
	}

	function handleCanvasClick(event: MouseEvent) {
		if (!canvas || !originalImageData || !image) return;

		const rect = canvas.getBoundingClientRect();
		const clickX = event.clientX - rect.left;
		const clickY = event.clientY - rect.top;

		// Calculate the scale factor between display size and original image size
		const scaleX = originalImageWidth / rect.width;
		const scaleY = originalImageHeight / rect.height;

		// Convert click coordinates to original image pixel coordinates
		const x = Math.floor(clickX * scaleX);
		const y = Math.floor(clickY * scaleY);

		// Ensure coordinates are within bounds
		const pixelX = Math.max(0, Math.min(originalImageWidth - 1, x));
		const pixelY = Math.max(0, Math.min(originalImageHeight - 1, y));

		// Get pixel data directly from original image data
		const pixelIndex = (pixelY * originalImageWidth + pixelX) * 4;
		const r = originalImageData[pixelIndex];
		const g = originalImageData[pixelIndex + 1];
		const b = originalImageData[pixelIndex + 2];
		const a = originalImageData[pixelIndex + 3];

		// Apply color correction to get the original color
		const corrected = correctColor(r, g, b);
		const colorValue = convertColor(corrected.r, corrected.g, corrected.b);

		// Also check surrounding pixels to see if there's any pattern
		const surroundingPixels = [];
		for (let dy = -1; dy <= 1; dy++) {
			for (let dx = -1; dx <= 1; dx++) {
				const nx = pixelX + dx;
				const ny = pixelY + dy;
				if (nx >= 0 && nx < originalImageWidth && ny >= 0 && ny < originalImageHeight) {
					const idx = (ny * originalImageWidth + nx) * 4;
					const corrected = correctColor(
						originalImageData[idx],
						originalImageData[idx + 1],
						originalImageData[idx + 2]
					);
					surroundingPixels.push({
						x: nx,
						y: ny,
						r: corrected.r,
						g: corrected.g,
						b: corrected.b,
						hex: convertColor(corrected.r, corrected.g, corrected.b)
					});
				}
			}
		}

		console.log(
			'Canvas click:',
			clickX,
			clickY,
			'Scale:',
			scaleX,
			scaleY,
			'Pixel:',
			pixelX,
			pixelY,
			'Color:',
			colorValue,
			'RGB:',
			r,
			g,
			b,
			'A:',
			a,
			'Surrounding pixels:',
			surroundingPixels
		);

		// Add to array if not already present
		if (!extractedColors.includes(colorValue)) {
			originalRgbColors = [
				...originalRgbColors,
				{ r: corrected.r, g: corrected.g, b: corrected.b }
			];
			extractedColors = [...extractedColors, colorValue];
		}
	}

	function rgbToHex(r: number, g: number, b: number): string {
		return (
			'#' +
			[r, g, b]
				.map((x) => {
					const hex = x.toString(16);
					return hex.length === 1 ? '0' + hex : hex;
				})
				.join('')
		);
	}

	function rgbToRgb(r: number, g: number, b: number): string {
		return `rgb(${r}, ${g}, ${b})`;
	}

	function rgbToHsl(r: number, g: number, b: number): string {
		r /= 255;
		g /= 255;
		b /= 255;

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		let h = 0;
		let s = 0;
		const l = (max + min) / 2;

		if (max !== min) {
			const d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}

		return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
	}

	function rgbToHsb(r: number, g: number, b: number): string {
		r /= 255;
		g /= 255;
		b /= 255;

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		let h = 0;
		let s = 0;
		const v = max;

		if (max !== min) {
			const d = max - min;
			s = max === 0 ? 0 : d / max;

			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}

		return `hsb(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%)`;
	}

	function convertColor(r: number, g: number, b: number): string {
		switch (colorFormat) {
			case 'hex':
				return rgbToHex(r, g, b);
			case 'rgb':
				return rgbToRgb(r, g, b);
			case 'hsl':
				return rgbToHsl(r, g, b);
			case 'hsb':
				return rgbToHsb(r, g, b);
			default:
				return rgbToHex(r, g, b);
		}
	}

	function getHexForDisplay(color: string): string {
		// Always return hex for display purposes
		if (color.startsWith('#')) {
			return color;
		} else if (color.startsWith('rgb')) {
			// Convert RGB to hex
			const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
			if (match) {
				const r = parseInt(match[1]);
				const g = parseInt(match[2]);
				const b = parseInt(match[3]);
				return rgbToHex(r, g, b);
			}
		} else if (color.startsWith('hsl')) {
			// Convert HSL to hex (simplified)
			const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
			if (match) {
				const h = parseInt(match[1]) / 360;
				const s = parseInt(match[2]) / 100;
				const l = parseInt(match[3]) / 100;
				// Simplified HSL to RGB conversion
				const c = (1 - Math.abs(2 * l - 1)) * s;
				const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
				const m = l - c / 2;
				let r, g, b;
				if (h < 1 / 6) {
					r = c;
					g = x;
					b = 0;
				} else if (h < 2 / 6) {
					r = x;
					g = c;
					b = 0;
				} else if (h < 3 / 6) {
					r = 0;
					g = c;
					b = x;
				} else if (h < 4 / 6) {
					r = 0;
					g = x;
					b = c;
				} else if (h < 5 / 6) {
					r = x;
					g = 0;
					b = c;
				} else {
					r = c;
					g = 0;
					b = x;
				}
				return rgbToHex(
					Math.round((r + m) * 255),
					Math.round((g + m) * 255),
					Math.round((b + m) * 255)
				);
			}
		} else if (color.startsWith('hsb')) {
			// Convert HSB to hex (simplified)
			const match = color.match(/hsb\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
			if (match) {
				const h = parseInt(match[1]) / 360;
				const s = parseInt(match[2]) / 100;
				const v = parseInt(match[3]) / 100;
				// Simplified HSB to RGB conversion
				const c = v * s;
				const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
				const m = v - c;
				let r, g, b;
				if (h < 1 / 6) {
					r = c;
					g = x;
					b = 0;
				} else if (h < 2 / 6) {
					r = x;
					g = c;
					b = 0;
				} else if (h < 3 / 6) {
					r = 0;
					g = c;
					b = x;
				} else if (h < 4 / 6) {
					r = 0;
					g = x;
					b = c;
				} else if (h < 5 / 6) {
					r = x;
					g = 0;
					b = c;
				} else {
					r = c;
					g = 0;
					b = x;
				}
				return rgbToHex(
					Math.round((r + m) * 255),
					Math.round((g + m) * 255),
					Math.round((b + m) * 255)
				);
			}
		}
		return '#000000'; // fallback
	}

	function correctColor(r: number, g: number, b: number): { r: number; g: number; b: number } {
		// Create a more sophisticated correction based on color ranges
		// The correction seems to vary based on the color intensity

		let correction = { r: 0, g: 0, b: 0 };

		// For light colors (like #F3F2D9)
		if (r > 240 && g > 240 && b > 200) {
			correction = { r: -2, g: -2, b: -5 };
		}
		// For beige/brown colors (like #c1b29c, #bba876)
		else if (r > 180 && r < 200 && g > 160 && g < 190 && b > 110 && b < 140) {
			correction = { r: -5, g: -7, b: -7 };
		}
		// For darker brown colors (like #ac8957, #a66344)
		else if (r > 160 && r < 180 && g > 130 && g < 150 && b > 80 && b < 100) {
			correction = { r: -3, g: -4, b: -5 };
		}
		// For red colors (like #D51A2F)
		else if (r > 200 && g < 50 && b < 50) {
			correction = { r: -3, g: -2, b: -3 };
		}
		// For pink/red colors (like #FA6768)
		else if (r > 240 && g > 100 && g < 120 && b > 100 && b < 120) {
			correction = { r: -1, g: -3, b: -2 };
		}
		// For yellow colors (like #F8D97A)
		else if (r > 240 && g > 200 && b > 100 && b < 150) {
			correction = { r: -1, g: -5, b: -11 };
		}
		// For blue colors (like #010175, #99b1de)
		else if (b > 100 && (r < 50 || (g > 150 && g < 200))) {
			correction = { r: -1, g: -2, b: -2 };
		}
		// For green colors (like #38ab80, #009357)
		else if (g > 100 && g < 200 && r < 100 && b < 100) {
			correction = { r: -1, g: -2, b: -1 };
		}
		// For purple colors (like #8e5bc7, #554280)
		else if (r > 80 && r < 150 && g > 60 && g < 100 && b > 120 && b < 200) {
			correction = { r: -2, g: -3, b: -4 };
		}
		// Default correction for other colors
		else {
			correction = { r: -2, g: -2, b: -3 };
		}

		return {
			r: Math.max(0, Math.min(255, r + correction.r)),
			g: Math.max(0, Math.min(255, g + correction.g)),
			b: Math.max(0, Math.min(255, b + correction.b))
		};
	}

	function extractRawImageData(
		file: File
	): Promise<{ data: Uint8ClampedArray; width: number; height: number }> {
		return new Promise((resolve, reject) => {
			// For PNG files, we can parse the raw bytes to get exact pixel data
			if (file.type === 'image/png') {
				const reader = new FileReader();
				reader.onload = (e) => {
					const arrayBuffer = e.target?.result as ArrayBuffer;
					const uint8Array = new Uint8Array(arrayBuffer);

					// Parse PNG header to get dimensions
					const width =
						(uint8Array[16] << 24) |
						(uint8Array[17] << 16) |
						(uint8Array[18] << 8) |
						uint8Array[19];
					const height =
						(uint8Array[20] << 24) |
						(uint8Array[21] << 16) |
						(uint8Array[22] << 8) |
						uint8Array[23];

					console.log('PNG dimensions from header:', width, 'x', height);

					// Try to find the IDAT chunk to get raw pixel data
					let idatStart = -1;
					for (let i = 0; i < uint8Array.length - 4; i++) {
						if (
							uint8Array[i] === 73 &&
							uint8Array[i + 1] === 68 &&
							uint8Array[i + 2] === 65 &&
							uint8Array[i + 3] === 84
						) {
							idatStart = i;
							break;
						}
					}

					if (idatStart !== -1) {
						console.log('Found IDAT chunk at position:', idatStart);
					}

					// For now, fall back to canvas method but with more aggressive settings
					const img = new Image();
					img.onload = () => {
						// Try multiple canvas contexts to find the most accurate one
						const contexts = [
							{
								name: 'default',
								options: { willReadFrequently: true, alpha: true }
							},
							{
								name: 'srgb',
								options: { willReadFrequently: true, alpha: true, colorSpace: 'srgb' }
							},
							{
								name: 'display-p3',
								options: { willReadFrequently: true, alpha: true, colorSpace: 'display-p3' }
							}
						];

						let bestImageData: ImageData | null = null;
						let bestContextName = '';

						for (const context of contexts) {
							try {
								const canvas = document.createElement('canvas');
								const ctx = canvas.getContext(
									'2d',
									context.options as any
								) as CanvasRenderingContext2D;
								canvas.width = img.naturalWidth;
								canvas.height = img.naturalHeight;

								ctx.imageSmoothingEnabled = false;
								ctx.imageSmoothingQuality = 'low';
								ctx.clearRect(0, 0, canvas.width, canvas.height);
								ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

								const imageData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);

								// Use the first one as default, but log all for comparison
								if (!bestImageData) {
									bestImageData = imageData;
									bestContextName = context.name;
								}

								console.log(`${context.name} pixel data:`, imageData.data.slice(0, 20));
							} catch (error) {
								console.log(`Failed to create ${context.name} context:`, error);
							}
						}

						if (bestImageData) {
							console.log('Using context:', bestContextName);
							resolve({
								data: bestImageData.data,
								width: img.naturalWidth,
								height: img.naturalHeight
							});
						} else {
							reject(new Error('Failed to create any canvas context'));
						}
					};
					img.onerror = () => reject(new Error('Failed to load image'));
					img.src = URL.createObjectURL(file);
				};
				reader.readAsArrayBuffer(file);
			} else {
				// For other formats, use canvas with aggressive settings
				const img = new Image();
				img.onload = () => {
					const canvas = document.createElement('canvas');
					const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
					canvas.width = img.naturalWidth;
					canvas.height = img.naturalHeight;

					// Disable all smoothing and interpolation
					ctx.imageSmoothingEnabled = false;
					ctx.imageSmoothingQuality = 'low';

					// Clear canvas first
					ctx.clearRect(0, 0, canvas.width, canvas.height);

					// Draw image at exact pixel boundaries
					ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

					const imageData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
					resolve({ data: imageData.data, width: img.naturalWidth, height: img.naturalHeight });
				};
				img.onerror = () => reject(new Error('Failed to load image'));
				img.src = URL.createObjectURL(file);
			}
		});
	}

	function copySingleColor(color: string, index: number) {
		navigator.clipboard.writeText(color);

		// Show visual feedback
		copiedIndex = index;
		setTimeout(() => {
			copiedIndex = null;
		}, 500);
	}

	function resetAll() {
		uploadedImage = null;
		extractedColors = [];
		originalRgbColors = [];
		isImageLoaded = false;
		if (fileInput) {
			fileInput.value = '';
		}
		if (canvas && ctx) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}
	}

	function removeColor(index: number) {
		originalRgbColors = originalRgbColors.filter((_, i) => i !== index);
		extractedColors = extractedColors.filter((_, i) => i !== index);
	}

	onMount(() => {
		// Canvas context will be initialized when canvas is available
	});
</script>

<svelte:head>
	<title>Image Color Picker | Look Palette</title>
	<meta
		name="description"
		content="Upload an image and click to extract color hex codes. Build your custom color palette from any image."
	/>
</svelte:head>

<header class="text-center mb-8 relative overflow-hidden bg-gray-800" style="min-height: 300px;">
	<img
		src="/hero/hero-image-color-picker.avif"
		alt="Hero background"
		class="absolute inset-0 w-full h-full object-cover"
	/>
	<div class="relative z-10 py-16 px-8">
		<h1 class="inter mt-2 text-5xl font-semibold tracking-tight text-pretty text-black md:text-6xl">
			Image Color Picker
		</h1>
		<p class="inter text-xl text-black max-w-7xl mx-auto mt-6">
			Upload an image and click to extract color codes. Build your custom color palette from any
			image.
		</p>
	</div>
</header>

<div class="max-w-7xl mx-auto p-8 py-8 sm:py-12">
	<div class="space-y-8">
		<!-- File Upload Section -->
		<div class="bg-white rounded-xl p-6 shadow-lg">
			<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<h2 class="text-2xl font-semibold text-gray-900">Upload Image</h2>
				<div class="flex flex-col sm:flex-row sm:items-center gap-4">
					<input
						bind:this={fileInput}
						type="file"
						accept="image/*"
						onchange={handleFileUpload}
						class="block w-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-black file:text-white hover:file:opacity-80"
					/>
					<button
						onclick={resetAll}
						class="block rounded-md bg-white border border-black px-4 py-2 text-center text-sm font-semibold text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black whitespace-nowrap transition-colors"
					>
						Reset All
					</button>
				</div>
			</div>
		</div>

		<!-- Image Display Section -->
		{#if uploadedImage}
			<div class="bg-white rounded-xl p-6 shadow-lg">
				<h2 class="text-2xl font-semibold text-gray-900 mb-4">
					Click on the image to extract colors
				</h2>
				<div class="flex justify-center">
					<canvas
						bind:this={canvas}
						onclick={handleCanvasClick}
						onload={initCanvas}
						class="border-2 border-gray-300 rounded-lg cursor-crosshair hover:border-black transition-colors"
						style="max-width: 100%; max-height: 800px; object-fit: contain;"
						title="Click anywhere on the image to extract the color"
					></canvas>
				</div>

				{#if isImageLoaded}
					<div class="mt-4 text-center text-sm text-gray-600">
						Canvas size: {canvas?.width || 0} × {canvas?.height || 0} | Image loaded: {image?.width ||
							0} × {image?.height || 0}
					</div>
				{/if}
			</div>
		{/if}

		<!-- Extracted Colors Section -->
		{#if extractedColors.length > 0}
			<div class="bg-white rounded-xl p-6 shadow-lg">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-semibold text-gray-900">
						Extracted Colors ({extractedColors.length})
					</h2>
					<select
						bind:value={colorFormat}
						class="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
					>
						<option value="hex">HEX</option>
						<option value="rgb">RGB</option>
						<option value="hsl">HSL</option>
						<option value="hsb">HSB</option>
					</select>
				</div>

				<!-- Color Swatches -->
				<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
					{#each extractedColors as color, index}
						<div class="relative group">
							<div
								class="w-full h-20 rounded-lg border-2 border-gray-200 cursor-pointer transition-transform hover:scale-105 relative"
								style="background-color: {getHexForDisplay(color)}"
								title={color}
								tabindex="0"
								role="button"
								onclick={() => copySingleColor(color, index)}
								onkeydown={(e) => e.key === 'Enter' && copySingleColor(color, index)}
							>
								{#if copiedIndex === index}
									<div
										class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg"
									>
										<span class="text-white text-sm font-semibold">Copied!</span>
									</div>
								{/if}
							</div>
							<button
								onclick={() => removeColor(index)}
								class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
								title="Remove color"
							>
								×
							</button>
							<p class="text-xs text-gray-600 mt-1 text-center font-mono">{color}</p>
						</div>
					{/each}
				</div>

				<!-- Multiple Output Formats -->
				<div class="space-y-4">
					<!-- 1. List format (Figma/Sketch/Adobe) -->
					<div class="bg-gray-50 rounded-lg p-4">
						<label for="colorList" class="block text-sm font-medium text-gray-700 mb-2">
							List Format (Figma/Sketch/Adobe):
						</label>
						<textarea
							id="colorList"
							value={extractedColors.join(', ')}
							readonly
							class="w-full h-20 p-3 border border-gray-300 rounded-lg bg-white font-mono text-sm resize-none"
							placeholder="Colors will appear here..."
						></textarea>
					</div>

					<!-- 2. Array format (current + brackets) -->
					<div class="bg-gray-50 rounded-lg p-4">
						<label for="colorArray" class="block text-sm font-medium text-gray-700 mb-2">
							Array Format:
						</label>
						<textarea
							id="colorArray"
							value={`[${extractedColors.map((color) => `'${color}'`).join(', ')}]`}
							readonly
							class="w-full h-20 p-3 border border-gray-300 rounded-lg bg-white font-mono text-sm resize-none"
							placeholder="Colors will appear here..."
						></textarea>
					</div>

					<!-- 3. JSON format -->
					<div class="bg-gray-50 rounded-lg p-4">
						<label for="colorJson" class="block text-sm font-medium text-gray-700 mb-2">
							JSON Format:
						</label>
						<textarea
							id="colorJson"
							value={JSON.stringify({ colors: extractedColors }, null, 2)}
							readonly
							class="w-full h-24 p-3 border border-gray-300 rounded-lg bg-white font-mono text-sm resize-none"
							placeholder="Colors will appear here..."
						></textarea>
					</div>
				</div>
			</div>
		{/if}

		<!-- Instructions -->
		{#if !isImageLoaded}
			<div class="bg-gray-50 border border-gray-200 rounded-xl p-6">
				<h3 class="text-lg font-semibold text-gray-900 mb-2">How to use:</h3>
				<ol class="list-decimal list-inside space-y-2 text-gray-800">
					<li>Upload an image using the file input above</li>
					<li>Click anywhere on the image to extract the color at that point</li>
					<li>Extracted colors will appear below with their color codes</li>
					<li>Use the output text area to copy all colors in desired format</li>
					<li>Click the × button on any color swatch to remove it</li>
					<li>Use "Reset All" to start over with a new image</li>
				</ol>
			</div>
		{/if}
	</div>
</div>
