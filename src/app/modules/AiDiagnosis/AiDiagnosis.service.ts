import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";
import {
  IAiDiagnosisFilterRequest,
  TAiDiagnosis,
} from "./AiDiagnosis.interface";
import { IPaginationOptions } from "../../../interfaces/paginations";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { Prisma } from "@prisma/client";
import { AiDiagnosisSearchAbleFields } from "./AiDiagnosis.costant";
import { fileUploader } from "../../../helpars/fileUploader";

const addAiDiagnosis = async (
  payload: TAiDiagnosis,
  imageFile: any,
  userId: string
) => {
  if (!imageFile) {
    throw new ApiError(httpStatus.NOT_FOUND, "Image not found");
  }
  const image = (await fileUploader.uploadToDigitalOcean(imageFile)).Location;

  const res = await prisma.aiDiagnosis.create({
    data: { ...payload, image, userId },
  });

  return res;
};

const allAiDiagnosis = async (
  params: IAiDiagnosisFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.AiDiagnosisWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: AiDiagnosisSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.AiDiagnosisWhereInput = { AND: andConditions };

  const result = await prisma.aiDiagnosis.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.aiDiagnosis.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const userAiDiagnosis = async (
  params: IAiDiagnosisFilterRequest,
  options: IPaginationOptions,
  userId: string
) => {
  console.log(userId);
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.AiDiagnosisWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: AiDiagnosisSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.AiDiagnosisWhereInput = { AND: andConditions };

  const result = await prisma.aiDiagnosis.findMany({
    where: { ...whereConditions, userId },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.aiDiagnosis.count({
    where: { ...whereConditions, userId },
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const deleteAiDiagnosis = async (id: string) => {
  await prisma.aiDiagnosis.delete({
    where: { id },
  });

  return { message: "Deleted successfully!" };
};

export const AiDiagnosisService = {
  addAiDiagnosis,
  allAiDiagnosis,
  userAiDiagnosis,
  deleteAiDiagnosis,
};
