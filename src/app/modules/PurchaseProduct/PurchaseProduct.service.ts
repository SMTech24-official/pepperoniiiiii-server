import { OrderStatus, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import {
  IPurchaseFilterRequest,
  TPurchaseProduct,
} from "./PurchaseProduct.interface";
import { IPaginationOptions } from "../../../interfaces/paginations";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { purchaseSearchAbleFields } from "./Purchase.costant";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";

const purchaseProduct = async (payload: TPurchaseProduct, userId: string) => {
  const res = await prisma.purchaseProduct.create({
    data: { ...payload, userId },
  });

  return res;
};

const allOrder = async (
  params: IPurchaseFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.PurchaseProductWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: purchaseSearchAbleFields.map((field) => ({
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
  const whereConditions: Prisma.PurchaseProductWhereInput = {
    AND: andConditions,
  };

  const result = await prisma.purchaseProduct.findMany({
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
    include: { product: { select: { name: true, price: true } } },
  });
  const total = await prisma.purchaseProduct.count({
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

const userOrders = async (
  params: IPurchaseFilterRequest,
  options: IPaginationOptions,
  userId: string
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.PurchaseProductWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: purchaseSearchAbleFields.map((field) => ({
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
  const whereConditions: Prisma.PurchaseProductWhereInput = {
    AND: andConditions,
  };

  const result = await prisma.purchaseProduct.findMany({
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
    include: { product: { select: { name: true, price: true } } },
  });
  const total = await prisma.purchaseProduct.count({
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

const updateOrderStatus = async (
  payload: { status: OrderStatus },
  orderId: string
) => {
  const order = await prisma.purchaseProduct.findUnique({
    where: { id: orderId },
    select: { id: true },
  });

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }

  const result = await prisma.purchaseProduct.update({
    where: { id: orderId },
    data: { orderStatus: payload.status },
    select: { orderStatus: true },
  });

  return result;
};

export const PurchaseProductService = {
  purchaseProduct,
  allOrder,
  userOrders,
  updateOrderStatus,
};
