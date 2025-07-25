

export type TDashboard = {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};


export type IDashboardFilterRequest = {
  name?: string | undefined;
  email?: string | undefined;
  contactNumber?: string | undefined;
  searchTerm?: string | undefined;
};