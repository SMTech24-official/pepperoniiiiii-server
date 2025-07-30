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
  if (
    !imageFiles?.images ||
    !Array.isArray(imageFiles.images) ||
    imageFiles.images.length === 0
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "At least one image is required"
    );
  }

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

  if (!ProductProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }

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

  let newImages: string[] = [];

  if (imageFiles?.images?.length > 0) {
    newImages = await Promise.all(
      imageFiles.images.map(async (item: any) => {
        const imageUrl = (await fileUploader.uploadToDigitalOcean(item))
          .Location;
        return imageUrl;
      })
    );
  }

  const images = [...productImages, ...newImages];

  const result = await prisma.product.update({
    where: { id: productId },
    data: { ...payload, images },
  });

  return result;
};

const deleteProduct = async (
  payload: { type: "update" | "delete"; images?: string[] },
  id: string
) => {
  const product = await prisma.product.findFirst({
    where: { id },
    select: { id: true, images: true },
  });

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }

  if (payload.type === "delete") {
    await prisma.product.delete({ where: { id: product.id } });

    return { Message: "Product deleted successfully" };
  }

  const remainingImages = product.images?.filter(
    (image) => !payload.images?.includes(image)
  );

  await prisma.product.update({
    where: { id: product.id },
    data: { images: remainingImages },
  });

  return { Message: "image Deleted successfully" };
};



export const ProductService = {
  createProduct,
  getProductsFromDb,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
