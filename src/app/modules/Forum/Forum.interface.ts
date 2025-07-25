

export type TForum = {
  id: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};


export type IForumFilterRequest = {
  description?: string | undefined;
  searchTerm?: string | undefined;
};