import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";
import { IForumFilterRequest, TForum } from "./Forum.interface";
import { IPaginationOptions } from "../../../interfaces/paginations";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { Prisma } from "@prisma/client";
import { fileUploader } from "../../../helpars/fileUploader";
import { forumSearchAbleFields } from "./Forum.costant";

const addForum = async (payload: TForum, imageFile: any, userId: string) => {
  if (!imageFile) {
    throw new ApiError(httpStatus.NOT_FOUND, "Image not found");
  }
  const image = (await fileUploader.uploadToDigitalOcean(imageFile)).Location;

  const res = await prisma.forum.create({
    data: { ...payload, image, userId },
  });

  return res;
};

const allForum = async (
  params: IForumFilterRequest,
  options: IPaginationOptions,
  userId: string
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.ForumWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: forumSearchAbleFields.map((field) => ({
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
  const whereConditions: Prisma.ForumWhereInput = { AND: andConditions };

  const result = await prisma.forum.findMany({
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
      user: { select: { fullName: true, image: true, location: true } },
      ForumReact: {
        where: { userId },
        select: { id: true },
      },
    },
  });
  const total = await prisma.forum.count({
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

const updateForum = async (
  payload: Partial<TForum>,
  ForumId: string,
  imageFile: any
) => {
  const Forum = await prisma.forum.findFirst({
    where: { id: ForumId },
    select: { id: true, image: true },
  });

  if (!Forum) {
    throw new ApiError(httpStatus.NOT_FOUND, "Forum not found");
  }

  let image = Forum?.image;

  if (imageFile) {
    image = (await fileUploader.uploadToDigitalOcean(imageFile)).Location;
  }

  const result = await prisma.forum.update({
    where: { id: ForumId },
    data: { ...payload, image },
  });

  return result;
};

const deleteForum = async (id: string) => {
  await prisma.forum.delete({
    where: { id },
  });

  return { message: "Deleted successfully!" };
};

const likeToForum = async (forumId: string, userId: string) => {
  const forum = await prisma.forum.findFirst({
    where: { id: forumId },
  });

  if (!forum) {
    throw new ApiError(httpStatus.NOT_FOUND, "Forum not found");
  }

  const isLiked = await prisma.forumReact.findFirst({
    where: { forumId: forum.id, userId },
  });

  if (isLiked) {
    await prisma.forumReact.delete({
      where: { id: isLiked.id },
    });

    return { message: "Forum React deleted" };
  } else {
    const result = await prisma.forumReact.create({
      data: { forumId, userId },
    });
    return result;
  }
};

const myForum = async (
  params: IForumFilterRequest,
  options: IPaginationOptions,
  userId: string
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.ForumWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: forumSearchAbleFields.map((field) => ({
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
  const whereConditions: Prisma.ForumWhereInput = { AND: andConditions };

  const result = await prisma.forum.findMany({
    where: {...whereConditions, userId},
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
      user: { select: { fullName: true, image: true, location: true } },
      ForumReact: {
        where: { userId },
        select: { id: true },
      },
    },
  });
  const total = await prisma.forum.count({
    where: {...whereConditions, userId},
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

export const ForumService = {
  addForum,
  allForum,
  updateForum,
  deleteForum,
  likeToForum,
  myForum
};
