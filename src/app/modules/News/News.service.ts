import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";
import { INewsFilterRequest, TNews } from "./News.interface";
import { IPaginationOptions } from "../../../interfaces/paginations";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { Prisma } from "@prisma/client";
import { newsSearchAbleFields } from "./News.costant";
import { fileUploader } from "../../../helpars/fileUploader";

const addNews = async (payload: TNews, imageFile: any) => {
  if (!imageFile) {
    throw new ApiError(httpStatus.NOT_FOUND, "Image not found");
  }
  const image = (await fileUploader.uploadToDigitalOcean(imageFile)).Location;

  const res = await prisma.news.create({ data: { ...payload, image } });

  return res;
};

const allNews = async (
  params: INewsFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.NewsWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: newsSearchAbleFields.map((field) => ({
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
  const whereConditions: Prisma.NewsWhereInput = { AND: andConditions };

  const result = await prisma.news.findMany({
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
  });
  const total = await prisma.news.count({
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

const updateNews = async (
  payload: Partial<TNews>,
  NewsId: string,
  imageFile: any
) => {
  const News = await prisma.news.findFirst({
    where: { id: NewsId },
    select: { id: true, image: true },
  });

  if (!News) {
    throw new ApiError(httpStatus.NOT_FOUND, "News not found");
  }

  let image = News?.image;

  if (imageFile) {
    image = (await fileUploader.uploadToDigitalOcean(imageFile)).Location;
  }

  const result = await prisma.news.update({
    where: { id: NewsId },
    data: { ...payload, image },
  });

  return result;
};

const deleteNews = async (id: string) => {
  await prisma.news.delete({
    where: { id },
  });

  return { message: "Deleted successfully!" };
};

export const NewsService = {
  addNews,
  allNews,
  updateNews,
  deleteNews,
};
