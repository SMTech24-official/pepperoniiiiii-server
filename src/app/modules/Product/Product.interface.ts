import { ProductCategory, ProductStatus } from "@prisma/client";

export type TProduct = {
  id: string;
  name: string;
  image: string[]; 
  price: number;
  description: string;
  weight: number;
  category: ProductCategory; 
  stock?: number;
  status: ProductStatus;
  avgRating?: number;
  createdAt: Date;
  updatedAt: Date;
};

export type IProductFilterRequest = {
  name?: string | undefined;
  category?: string | undefined;
  status?: string | undefined;
  searchTerm?: string | undefined;
};
