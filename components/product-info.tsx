"use client";

import type { Product } from "@/lib/types";
import SizeSelector from "./size-selector";
import ColorVariants from "./color-variants";
import { ShoppingBag, Heart, Truck, RotateCcw, Shield } from "lucide-react";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { price, description } = product;
  const hasDiscount =
    price.discount_percent > 1 && price.current < price.original;

  return (
    <div className="flex flex-col gap-6">
      {/* Brand icon + title */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-2 py-1">
            {product.brand}
          </span>
          {product.is_new && (
            <span className="text-xs font-bold uppercase tracking-wider text-primary-foreground bg-foreground px-2 py-1">
              New
            </span>
          )}
          {product.is_on_sale && hasDiscount && (
            <span className="text-xs font-bold uppercase tracking-wider text-primary-foreground bg-destructive px-2 py-1">
              Sale
            </span>
          )}
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground text-balance">
          {product.brand} {product.model}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          <abbr title="product reference">ref</abbr>:{" "}
          <strong>{product.id}</strong>
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {description.subtitle}
        </p>
      </div>

      {/* Pricing */}
      <div className="bg-secondary p-4">
        <div className="flex items-baseline gap-3">
          {hasDiscount ? (
            <>
              <span className="text-sm text-muted-foreground line-through">
                {price.original.toFixed(2)} EUR
              </span>
              <span className="text-2xl font-bold text-destructive">
                {price.current.toFixed(2)} EUR
              </span>
              <span className="text-xs font-bold text-primary-foreground bg-destructive px-2 py-0.5">
                -{Math.round(price.discount_percent)}%
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-foreground">
              {price.original.toFixed(2)} EUR
            </span>
          )}
        </div>
        {price.member_price < price.original && (
          <p className="text-sm mt-1.5 text-muted-foreground">
            Member price:{" "}
            <span className="font-bold text-foreground">
              {price.member_price.toFixed(2)} EUR
            </span>
          </p>
        )}
      </div>

      {/* Color */}
      <div>
        <p className="text-sm text-muted-foreground">
          Color: <strong className="text-foreground">{product.color}</strong>
        </p>
      </div>

      {/* Color variants */}
      <ColorVariants
        variants={product.color_variants}
        currentColor={product.color}
      />

      {/* Size selector */}
      <SizeSelector sizes={product.sizes} />

      {/* Add to cart */}
      <div className="flex flex-col gap-2">
        <button
          className={`flex items-center justify-center gap-2 w-full py-3.5 font-bold text-sm uppercase tracking-wider transition-colors ${
            product.in_stock
              ? "bg-foreground text-primary-foreground hover:bg-foreground/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
          disabled={!product.in_stock}
        >
          <ShoppingBag className="h-4 w-4" />
          {product.in_stock ? "Add to Cart" : "Sold Out"}
        </button>
        <button className="flex items-center justify-center gap-2 w-full py-3 border-2 border-foreground font-bold text-sm uppercase tracking-wider text-foreground hover:bg-secondary transition-colors">
          <Heart className="h-4 w-4" />
          Add to Wishlist
        </button>
      </div>

      {/* Service badges */}
      <div className="grid grid-cols-3 gap-3 py-3 border-t border-b border-border">
        <div className="flex flex-col items-center gap-1.5 text-center">
          <Truck className="h-5 w-5 text-muted-foreground" />
          <span className="text-[10px] font-semibold text-muted-foreground leading-tight">
            Free Shipping{"\n"}over 100 EUR
          </span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <RotateCcw className="h-5 w-5 text-muted-foreground" />
          <span className="text-[10px] font-semibold text-muted-foreground leading-tight">
            30-Day{"\n"}Returns
          </span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <span className="text-[10px] font-semibold text-muted-foreground leading-tight">
            Secure{"\n"}Payment
          </span>
        </div>
      </div>
    </div>
  );
}
