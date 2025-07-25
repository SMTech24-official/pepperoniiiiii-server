export type TSalesBoard = {
  id: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type ISalesBoardFilterRequest = {
  quantity?: string | undefined;
  price?: string | undefined;
  description?: string | undefined;
  searchTerm?: string | undefined;
};
