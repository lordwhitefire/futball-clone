"use client";

import { useState } from "react";

interface ProductImageGalleryProps {
  mainImage: string;
  gallery: string[];
  productName: string;
}

export default function ProductImageGallery({
  mainImage,
  gallery,
  productName,
}: ProductImageGalleryProps) {
  const allImages = [mainImage, ...gallery];
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-3">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] pb-2 lg:pb-0 lg:pr-2">
        {allImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className={`flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 border-2 transition-colors overflow-hidden ${
              selectedIndex === i
                ? "border-foreground"
                : "border-border hover:border-foreground/40"
            }`}
            aria-label={`View image ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              alt={`${productName} view ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 bg-secondary flex items-center justify-center overflow-hidden relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={allImages[selectedIndex]}
          alt={productName}
          className="w-full max-w-[600px] object-contain aspect-square"
        />
        <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-muted-foreground">
          Click thumbnails to change view
        </p>
      </div>
    </div>
  );
}
