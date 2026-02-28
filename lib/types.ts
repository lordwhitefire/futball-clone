export interface ProductSize {
  size: string;
  available: boolean;
  stock: number;
}

export interface ColorVariant {
  color: string;
  product_id: string;
  thumbnail: string;
}

export interface ProductPrice {
  current: number;
  original: number;
  discount_percent: number;
  member_price: number;
  currency: string;
}

export interface ProductDescription {
  subtitle: string;
  tagline: string;
  intro: string;
  collection: string;
  key_benefits: string[];
  technical_details: {
    range: string;
    sole_type: string;
    upper_material: string;
    adjustment: string;
    technologies: string[];
    recommended_use: string;
  };
  closing: string;
}

export interface ProductFeatures {
  traction: string;
  sole_material: string;
  upper_material: string;
  closure: string;
  weight_grams: number | null;
  level: string;
  benefits_level: string;
  season: string;
}

export interface Product {
  id: string;
  url_slug: string;
  model: string;
  brand: string;
  brand_logo: string | null;
  category: string;
  traction: string;
  model_line: string;
  gender: string;
  age_group: string;
  main_image: string;
  image_gallery: string[];
  thumbnail: string;
  color: string;
  color_variants: ColorVariant[];
  price: ProductPrice;
  sizes: ProductSize[];
  description: ProductDescription;
  features: ProductFeatures;
  in_stock: boolean;
  is_new: boolean;
  is_on_sale: boolean;
  is_preorder: boolean;
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  _inferred?: Record<string, string>;
}
