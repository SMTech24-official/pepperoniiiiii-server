
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
  name?: string | undefined;
  email?: string | undefined;
  contactNumber?: string | undefined;
  searchTerm?: string | undefined;
};