import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";
import { ISalesBoardFilterRequest, TSalesBoard } from "./SalesBoard.interface";
import { IPaginationOptions } from "../../../interfaces/paginations";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { Prisma } from "@prisma/client";
import { fileUploader } from "../../../helpars/fileUploader";
import { SalesBoardSearchAbleFields } from "./SalesBoard.costant";

const addSalesBoard = async (
  payload: TSalesBoard,
  imageFile: any,
  userId: string
) => {
  if (!imageFile) {
    throw new ApiError(httpStatus.NOT_FOUND, "Image not found");
  }
  const image = (await fileUploader.uploadToDigitalOcean(imageFile)).Location;

  const res = await prisma.salesBoard.create({
    data: { ...payload, image, userId },
  });

  return res;
};

const allSalesBoard = async (
  params: ISalesBoardFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.SalesBoardWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: SalesBoardSearchAbleFields.map((field) => ({
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
  const whereConditions: Prisma.SalesBoardWhereInput = { AND: andConditions };

  const result = await prisma.salesBoard.findMany({
    where: whereConditions,
    skip,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    select: {
      id: true,
      description: true,
      image: true,
      price: true,
      quantity: true,
      user: { select: { fullName: true, image: true, location: true } },
    },
  });
  const total = await prisma.salesBoard.count({
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

const updateSalesBoard = async (
  payload: Partial<TSalesBoard>,
  SalesBoardId: string,
  imageFile: any
) => {
  const SalesBoard = await prisma.salesBoard.findFirst({
    where: { id: SalesBoardId },
    select: { id: true, image: true },
  });

  if (!SalesBoard) {
    throw new ApiError(httpStatus.NOT_FOUND, "SalesBoard not found");
  }

  let image = SalesBoard?.image;

  if (imageFile) {
    image = (await fileUploader.uploadToDigitalOcean(imageFile)).Location;
  }

  const result = await prisma.salesBoard.update({
    where: { id: SalesBoardId },
    data: { ...payload, image },
  });

  return result;
};

const deleteSalesBoard = async (id: string) => {
  await prisma.salesBoard.delete({
    where: { id },
  });

  return { message: "Deleted successfully!" };
};

const mySalesBoard = async (
  params: ISalesBoardFilterRequest,
  options: IPaginationOptions,
  userId: string
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.SalesBoardWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: SalesBoardSearchAbleFields.map((field) => ({
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
  const whereConditions: Prisma.SalesBoardWhereInput = { AND: andConditions };

  const result = await prisma.salesBoard.findMany({
    where: { ...whereConditions, userId },
    skip,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    select: {
      id: true,
      description: true,
      image: true,
      price: true,
      quantity: true,
      user: { select: { fullName: true, image: true, location: true } },
    },
  });
  const total = await prisma.salesBoard.count({
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

export const SalesBoardService = {
  addSalesBoard,
  allSalesBoard,
  updateSalesBoard,
  deleteSalesBoard,
  mySalesBoard,
};
