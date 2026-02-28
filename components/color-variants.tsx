import Link from "next/link";
import type { ColorVariant } from "@/lib/types";

interface ColorVariantsProps {
  variants: ColorVariant[];
  currentColor: string;
}

export default function ColorVariants({
  variants,
  currentColor,
}: ColorVariantsProps) {
  if (!variants || variants.length === 0) return null;

  // Show max 12 on initial render
  const displayed = variants.slice(0, 12);
  const remaining = variants.length - 12;

  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-wide text-foreground mb-3">
        Other colors{" "}
        <span className="font-normal normal-case text-muted-foreground">
          ({variants.length} options)
        </span>
      </p>
      <div className="flex flex-wrap gap-1.5">
        {displayed.map((v) => (
          <Link
            key={v.product_id}
            href={`/product/${v.product_id.toLowerCase()}`}
            title={v.color}
            className="block w-10 h-10 border-2 border-border hover:border-foreground transition-colors overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={v.thumbnail}
              alt={v.color}
              className="w-full h-full object-cover"
            />
          </Link>
        ))}
        {remaining > 0 && (
          <span className="flex items-center justify-center w-10 h-10 border-2 border-border text-xs font-bold text-muted-foreground">
            +{remaining}
          </span>
        )}
      </div>
    </div>
  );
}
