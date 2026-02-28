import Link from "next/link";
import { getProducts } from "@/lib/products";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SaleBanner from "@/components/sale-banner";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SaleBanner />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2 text-balance">
            Football Boots
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            {products.length} products
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map((product) => {
              const hasDiscount =
                product.price.discount_percent > 1 &&
                product.price.current < product.price.original;

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.url_slug}`}
                  className="group block"
                >
                  <div className="relative bg-secondary overflow-hidden aspect-square mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.main_image}
                      alt={`${product.brand} ${product.model}`}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.is_new && (
                        <span className="bg-foreground text-primary-foreground text-[10px] font-bold uppercase px-2 py-0.5">
                          New
                        </span>
                      )}
                      {hasDiscount && (
                        <span className="bg-destructive text-primary-foreground text-[10px] font-bold px-2 py-0.5">
                          -{Math.round(product.price.discount_percent)}%
                        </span>
                      )}
                    </div>
                    {!product.in_stock && (
                      <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                        <span className="text-xs font-bold uppercase text-foreground bg-background px-3 py-1">
                          Sold Out
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
                      {product.brand}
                    </p>
                    <p className="text-sm font-semibold text-foreground mb-1 group-hover:underline leading-tight">
                      {product.model}
                    </p>
                    <p className="text-xs text-muted-foreground mb-1.5 line-clamp-1">
                      {product.color}
                    </p>
                    <div className="flex items-baseline gap-2">
                      {hasDiscount ? (
                        <>
                          <span className="text-xs text-muted-foreground line-through">
                            {product.price.original.toFixed(2)} EUR
                          </span>
                          <span className="text-sm font-bold text-destructive">
                            {product.price.current.toFixed(2)} EUR
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-bold text-foreground">
                          {product.price.original.toFixed(2)} EUR
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
