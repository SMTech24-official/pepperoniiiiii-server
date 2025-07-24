

export type TNews = {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};


export type INewsFilterRequest = {
  name?: string | undefined;
  email?: string | undefined;
  contactNumber?: string | undefined;
  searchTerm?: string | undefined;
};