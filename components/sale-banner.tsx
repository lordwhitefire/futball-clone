import Link from "next/link";

export default function SaleBanner() {
  return (
    <div className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div>
          <span className="text-sm font-bold">Sale 2026</span>
          <span className="text-sm ml-2 text-primary-foreground/70">
            Thousands of products on sale
          </span>
        </div>
        <Link
          href="#"
          className="text-xs font-bold uppercase bg-primary-foreground text-foreground px-3 py-1 hover:bg-primary-foreground/90 transition-colors"
        >
          View More
        </Link>
      </div>
    </div>
  );
}
