

export type TForum = {
  id: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};


export type IForumFilterRequest = {
  name?: string | undefined;
  email?: string | undefined;
  contactNumber?: string | undefined;
  searchTerm?: string | undefined;
};