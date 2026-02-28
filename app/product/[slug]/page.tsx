import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getProducts } from "@/lib/products";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SaleBanner from "@/components/sale-banner";
import Breadcrumbs from "@/components/breadcrumbs";
import ProductImageGallery from "@/components/product-image-gallery";
import ProductInfo from "@/components/product-info";
import ProductDescriptionTabs from "@/components/product-description-tabs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.flatMap((p) => [
    { slug: p.url_slug },
    { slug: p.id.toLowerCase() },
  ]);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.meta.title,
    description: product.meta.description,
    keywords: product.meta.keywords.join(", "),
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: product.category, href: "#" },
    { label: `${product.brand} ${product.model_line}`, href: "#" },
    { label: `${product.brand} ${product.model}` },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SaleBanner />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs items={breadcrumbs} />

          {/* Product section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-12">
            {/* Left: Images */}
            <div>
              <ProductImageGallery
                mainImage={product.main_image}
                gallery={product.image_gallery}
                productName={`${product.brand} ${product.model}`}
              />
            </div>

            {/* Right: Info */}
            <div>
              <ProductInfo product={product} />
              <ProductDescriptionTabs
                description={product.description}
                features={product.features}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
