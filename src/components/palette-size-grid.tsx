"use client";

import { useState } from "react";
import {
  getPaletteColors,
  paletteSizes,
  type PaletteSize,
} from "@/lib/site-data";

export function PaletteSizeGrid({ paletteName }: { paletteName: string }) {
  const [selectedSize, setSelectedSize] = useState<PaletteSize>(64);
  const colors = getPaletteColors(paletteName, selectedSize);

  return (
    <section className="surface rounded-[2rem] p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-[var(--color-accent)]">Core Palette</p>
          <h2 className="mt-2 text-2xl font-semibold">Color Palette</h2>
          <p className="mt-2 text-stone-600">
            Switch palette size to view a tighter or broader range of recommended
            shades.
          </p>
        </div>
        <label className="flex items-center gap-3 text-sm font-medium text-stone-700">
          Palette size
          <select
            className="rounded-full border border-stone-300 bg-white px-4 py-2"
            value={selectedSize}
            onChange={(event) =>
              setSelectedSize(Number(event.target.value) as PaletteSize)
            }
          >
            {paletteSizes.map((size) => (
              <option key={size} value={size}>
                {size} colors
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {colors.map((color) => (
          <div key={color} className="space-y-2">
            <div
              className="h-20 rounded-2xl border border-black/10"
              style={{ backgroundColor: color }}
            />
            <p className="text-center text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
              {color}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
