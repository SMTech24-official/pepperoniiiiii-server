"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const http_status_1 = __importDefault(require("http-status"));
const paginationHelper_1 = require("../../../helpars/paginationHelper");
const fileUploader_1 = require("../../../helpars/fileUploader");
const Forum_costant_1 = require("./Forum.costant");
const addForum = (payload, imageFile, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!imageFile) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Image not found");
    }
    const image = (yield fileUploader_1.fileUploader.uploadToDigitalOcean(imageFile)).Location;
    const res = yield prisma_1.default.forum.create({
        data: Object.assign(Object.assign({}, payload), { image, userId }),
    });
    return res;
});
const allForum = (params, options, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (params.searchTerm) {
        andConditions.push({
            OR: Forum_costant_1.forumSearchAbleFields.map((field) => ({
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
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = { AND: andConditions };
    const result = yield prisma_1.default.forum.findMany({
        where: whereConditions,
        skip,
        orderBy: options.sortBy && options.sortOrder
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
    const total = yield prisma_1.default.forum.count({
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
});
const updateForum = (payload, ForumId, imageFile) => __awaiter(void 0, void 0, void 0, function* () {
    const Forum = yield prisma_1.default.forum.findFirst({
        where: { id: ForumId },
        select: { id: true, image: true },
    });
    if (!Forum) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Forum not found");
    }
    let image = Forum === null || Forum === void 0 ? void 0 : Forum.image;
    if (imageFile) {
        image = (yield fileUploader_1.fileUploader.uploadToDigitalOcean(imageFile)).Location;
    }
    const result = yield prisma_1.default.forum.update({
        where: { id: ForumId },
        data: Object.assign(Object.assign({}, payload), { image }),
    });
    return result;
});
const deleteForum = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.forum.delete({
        where: { id },
    });
    return { message: "Deleted successfully!" };
});
const likeToForum = (forumId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const forum = yield prisma_1.default.forum.findFirst({
        where: { id: forumId },
    });
    if (!forum) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Forum not found");
    }
    const isLiked = yield prisma_1.default.forumReact.findFirst({
        where: { forumId: forum.id, userId },
    });
    if (isLiked) {
        yield prisma_1.default.forumReact.delete({
            where: { id: isLiked.id },
        });
        return { message: "Forum React deleted" };
    }
    else {
        const result = yield prisma_1.default.forumReact.create({
            data: { forumId, userId },
        });
        return result;
    }
});
const myForum = (params, options, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (params.searchTerm) {
        andConditions.push({
            OR: Forum_costant_1.forumSearchAbleFields.map((field) => ({
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
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = { AND: andConditions };
    const result = yield prisma_1.default.forum.findMany({
        where: Object.assign(Object.assign({}, whereConditions), { userId }),
        skip,
        orderBy: options.sortBy && options.sortOrder
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
    const total = yield prisma_1.default.forum.count({
        where: Object.assign(Object.assign({}, whereConditions), { userId }),
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.ForumService = {
    addForum,
    allForum,
    updateForum,
    deleteForum,
    likeToForum,
    myForum
};
