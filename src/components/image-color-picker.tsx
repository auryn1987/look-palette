"use client";

import type { ChangeEvent, MouseEvent } from "react";
import { useRef, useState } from "react";

type ColorFormat = "hex" | "rgb" | "hsl" | "hsb";

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")}`.toUpperCase();
}

function rgbToRgb(r: number, g: number, b: number) {
  return `rgb(${r}, ${g}, ${b})`;
}

function rgbToHsl(r: number, g: number, b: number) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;
  const delta = max - min;
  let hue = 0;
  let saturation = 0;

  if (delta !== 0) {
    saturation =
      lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case red:
        hue = (green - blue) / delta + (green < blue ? 6 : 0);
        break;
      case green:
        hue = (blue - red) / delta + 2;
        break;
      default:
        hue = (red - green) / delta + 4;
        break;
    }

    hue /= 6;
  }

  return `hsl(${Math.round(hue * 360)}, ${Math.round(saturation * 100)}%, ${Math.round(
    lightness * 100,
  )}%)`;
}

function rgbToHsb(r: number, g: number, b: number) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  let hue = 0;

  if (delta !== 0) {
    switch (max) {
      case red:
        hue = (green - blue) / delta + (green < blue ? 6 : 0);
        break;
      case green:
        hue = (blue - red) / delta + 2;
        break;
      default:
        hue = (red - green) / delta + 4;
        break;
    }

    hue /= 6;
  }

  const saturation = max === 0 ? 0 : delta / max;

  return `hsb(${Math.round(hue * 360)}, ${Math.round(saturation * 100)}%, ${Math.round(
    max * 100,
  )}%)`;
}

function convertColor(r: number, g: number, b: number, format: ColorFormat) {
  if (format === "rgb") {
    return rgbToRgb(r, g, b);
  }

  if (format === "hsl") {
    return rgbToHsl(r, g, b);
  }

  if (format === "hsb") {
    return rgbToHsb(r, g, b);
  }

  return rgbToHex(r, g, b);
}

function normalizeHex(color: string) {
  if (color.startsWith("#")) {
    return color;
  }

  const match = color.match(/rgb\((\d+), (\d+), (\d+)\)/);
  if (match) {
    return rgbToHex(Number(match[1]), Number(match[2]), Number(match[3]));
  }

  return color;
}

export function ImageColorPicker() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageSource, setImageSource] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [format, setFormat] = useState<ColorFormat>("hex");
  const [copied, setCopied] = useState<number | null>(null);
  const [helpText, setHelpText] = useState(
    "Upload an image and click anywhere on it to sample a color.",
  );

  function redrawDisplay(image: HTMLImageElement) {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const maxWidth = 900;
    const maxHeight = 620;
    const ratio = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
    const width = Math.round(image.width * ratio);
    const height = Math.round(image.height * ratio);

    canvas.width = width;
    canvas.height = height;
    context.clearRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);

    const offscreen = document.createElement("canvas");
    offscreen.width = image.width;
    offscreen.height = image.height;
    const offscreenContext = offscreen.getContext("2d");

    if (!offscreenContext) {
      return;
    }

    offscreenContext.drawImage(image, 0, 0);
    offscreenCanvasRef.current = offscreen;
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setImageSource(objectUrl);
    setColors([]);
    setCopied(null);
    setHelpText("Click the image to capture colors into your custom palette.");

    const image = new window.Image();
    image.onload = () => redrawDisplay(image);
    image.src = objectUrl;
  }

  function handleCanvasClick(event: MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const offscreen = offscreenCanvasRef.current;
    if (!canvas || !offscreen) {
      return;
    }

    const displayRect = canvas.getBoundingClientRect();
    const scaleX = offscreen.width / displayRect.width;
    const scaleY = offscreen.height / displayRect.height;
    const x = Math.floor((event.clientX - displayRect.left) * scaleX);
    const y = Math.floor((event.clientY - displayRect.top) * scaleY);
    const context = offscreen.getContext("2d");

    if (!context) {
      return;
    }

    const pixel = context.getImageData(x, y, 1, 1).data;
    const nextColor = convertColor(pixel[0], pixel[1], pixel[2], format);

    setColors((current) => {
      if (current.includes(nextColor) || current.length >= 16) {
        return current;
      }

      return [...current, nextColor];
    });
  }

  function updateFormat(nextFormat: ColorFormat) {
    if (nextFormat === format) {
      return;
    }

    setFormat(nextFormat);
    setColors((current) =>
      current.map((color) => {
        const hex = normalizeHex(color);
        const value = hex.replace("#", "");
        const red = Number.parseInt(value.slice(0, 2), 16);
        const green = Number.parseInt(value.slice(2, 4), 16);
        const blue = Number.parseInt(value.slice(4, 6), 16);
        return convertColor(red, green, blue, nextFormat);
      }),
    );
  }

  async function copyColor(color: string, index: number) {
    await navigator.clipboard.writeText(color);
    setCopied(index);
    window.setTimeout(() => setCopied(null), 1200);
  }

  async function copyPalette() {
    await navigator.clipboard.writeText(colors.join(",\n"));
    setHelpText("Palette copied to your clipboard.");
  }

  function removeColor(index: number) {
    setColors((current) => current.filter((_, currentIndex) => currentIndex !== index));
  }

  function reset() {
    setImageSource(null);
    setColors([]);
    setCopied(null);
    setHelpText("Upload an image and click anywhere on it to sample a color.");
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  return (
    <div className="space-y-8">
      <div className="surface rounded-4xl p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Image color picker</h2>
            <p className="mt-2 leading-7 text-stone-600">{helpText}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="inline-flex min-h-12 cursor-pointer items-center justify-center whitespace-nowrap rounded-full border border-black bg-white px-5 py-3 text-sm font-semibold text-stone-950 transition hover:border-black! hover:bg-black! hover:text-white!">
              Upload image
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            <select
              className="min-h-12 rounded-full border border-black bg-white px-5 py-3 text-sm font-semibold text-stone-950"
              value={format}
              onChange={(event) => updateFormat(event.target.value as ColorFormat)}
            >
              <option value="hex">HEX</option>
              <option value="rgb">RGB</option>
              <option value="hsl">HSL</option>
              <option value="hsb">HSB</option>
            </select>
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full border border-black bg-white px-5 py-3 text-sm font-semibold text-stone-950 transition hover:border-black! hover:bg-black! hover:text-white!"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-4xl border border-dashed border-stone-300 bg-white/70 p-4">
          {imageSource ? (
            <canvas
              ref={canvasRef}
              className="mx-auto w-full cursor-crosshair rounded-3xl"
              onClick={handleCanvasClick}
            />
          ) : (
            <div className="flex h-72 items-center justify-center rounded-3xl bg-stone-100 text-center text-stone-500">
              Upload an image to start sampling colors.
            </div>
          )}
        </div>
      </div>

      <div className="surface rounded-4xl p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Picked colors</h2>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              Up to 16 swatches. Click a swatch label to copy it.
            </p>
          </div>
          {colors.length ? (
            <button
              type="button"
              onClick={copyPalette}
              className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full border border-black bg-white px-5 py-3 text-sm font-semibold text-stone-950 transition hover:border-black! hover:bg-black! hover:text-white!"
            >
              Copy full palette
            </button>
          ) : null}
        </div>

        {colors.length ? (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {colors.map((color, index) => (
                <div
                  key={`${color}-${index}`}
                  className="rounded-3xl border border-stone-200 bg-white p-4"
                >
                  <div
                    className="h-24 rounded-2xl border border-black/8"
                    style={{ backgroundColor: normalizeHex(color) }}
                  />
                  <button
                    type="button"
                    onClick={() => copyColor(color, index)}
                    className="mt-3 w-full text-left text-sm font-semibold text-stone-900"
                  >
                    {copied === index ? "Copied" : color}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeColor(index)}
                    className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <textarea
              readOnly
              value={colors.join(",\n")}
              className="mt-6 min-h-40 w-full rounded-3xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700"
            />
          </>
        ) : (
          <div className="mt-6 rounded-3xl bg-stone-50 p-6 text-stone-600">
            Your sampled palette will appear here.
          </div>
        )}
      </div>
    </div>
  );
}
