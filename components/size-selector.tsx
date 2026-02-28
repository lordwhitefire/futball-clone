"use client";

import { useState } from "react";
import type { ProductSize } from "@/lib/types";

interface SizeSelectorProps {
  sizes: ProductSize[];
}

export default function SizeSelector({ sizes }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold uppercase tracking-wide text-foreground">
          Size
        </span>
        <button className="text-xs underline text-muted-foreground hover:text-foreground">
          Size Guide
        </button>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {sizes.map((s) => (
          <button
            key={s.size}
            disabled={!s.available}
            onClick={() => setSelectedSize(s.size)}
            className={`py-2.5 px-1 text-xs font-semibold border transition-colors ${
              !s.available
                ? "border-border text-muted-foreground/40 bg-muted cursor-not-allowed line-through"
                : selectedSize === s.size
                ? "border-foreground bg-foreground text-primary-foreground"
                : "border-border text-foreground hover:border-foreground"
            }`}
          >
            {s.size.replace(" EU", "")}
          </button>
        ))}
      </div>
      {selectedSize && (
        <p className="mt-2 text-xs text-fm-green font-semibold">
          Selected: {selectedSize}
        </p>
      )}
    </div>
  );
}
