

export type TAiDiagnosis = {
  id: string;
  image: string;
  problemCount: number;
  description: string[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type IAiDiagnosisFilterRequest = {
  name?: string | undefined;
  email?: string | undefined;
  contactNumber?: string | undefined;
  searchTerm?: string | undefined;
};