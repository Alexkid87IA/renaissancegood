export interface ProductVariant {
  id: string;
  title: string;
  price: string;
  availableForSale: boolean;
  colorName?: string;
  image?: string | null;
}

export interface ProductImage {
  url: string;
  altText: string | null;
}

export interface Product {
  id: string;
  name: string;
  modelName?: string;
  collection: string;
  badge?: string;
  price: string;
  frame: string;
  lens: string;
  colors: { name: string }[];
  dimensions: {
    lens: string;
    bridge: string;
    temple: string;
  };
  description: string;
  descriptionHtml?: string;
  variants: ProductVariant[];
  images?: string[];
  allImages?: ProductImage[];
  tags?: string[];
}
