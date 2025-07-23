import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/paginations";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { Prisma, Product } from "@prisma/client";
import { ProductSearchAbleFields } from "./Product.costant";
import { fileUploader } from "../../../helpars/fileUploader";
import { IProductFilterRequest, TProduct } from "./Product.interface";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";

const createProduct = async (payload: TProduct, imageFiles: any) => {
  const images = await Promise.all(
    imageFiles.images.map(async (item: any) => {
      const imageUrl = (await fileUploader.uploadToDigitalOcean(item)).Location;

      return imageUrl;
    })
  );

  const res = await prisma.product.create({ data: { ...payload, images } });

  return res;
};

const getProductsFromDb = async (
  params: IProductFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.ProductWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: ProductSearchAbleFields.map((field) => ({
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
  const whereConditions: Prisma.ProductWhereInput = { AND: andConditions };

  const result = await prisma.product.findMany({
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

    select: {
      id: true,
      images: true,
      price: true,
      name: true,
      avgRating: true,
    },
  });
  const total = await prisma.product.count({
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

const getSingleProduct = async (id: string) => {
  const ProductProfile = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      images: true,
      price: true,
      name: true,
      description: true,
      weight: true,
      avgRating: true,
    },
  });

  return ProductProfile;
};

const updateProduct = async (
  payload: Product,
  productId: string,
  imageFiles: any
) => {
  const product = await prisma.product.findFirst({
    where: { id: productId },
    select: { id: true, images: true },
  });

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }

  const productImages = product?.images;

  const newImages = await Promise.all(
    imageFiles.images.map(async (item: any) => {
      const imageUrl = (await fileUploader.uploadToDigitalOcean(item)).Location;

      return imageUrl;
    })
  );

  const images = [...productImages, ...newImages];

  const result = await prisma.product.update({
    where: { id: productId },
    data: { ...payload, images },
  });

  return result;
};

export const ProductService = {
  createProduct,
  getProductsFromDb,
  getSingleProduct,
  updateProduct,
};
