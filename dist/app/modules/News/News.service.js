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
exports.NewsService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const http_status_1 = __importDefault(require("http-status"));
const paginationHelper_1 = require("../../../helpars/paginationHelper");
const News_costant_1 = require("./News.costant");
const fileUploader_1 = require("../../../helpars/fileUploader");
const addNews = (payload, imageFile) => __awaiter(void 0, void 0, void 0, function* () {
    if (!imageFile) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Image not found");
    }
    const image = (yield fileUploader_1.fileUploader.uploadToDigitalOcean(imageFile)).Location;
    const res = yield prisma_1.default.news.create({ data: Object.assign(Object.assign({}, payload), { image }) });
    return res;
});
const allNews = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (params.searchTerm) {
        andConditions.push({
            OR: News_costant_1.newsSearchAbleFields.map((field) => ({
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
    const result = yield prisma_1.default.news.findMany({
        where: whereConditions,
        skip,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: "desc",
            },
    });
    const total = yield prisma_1.default.news.count({
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
const updateNews = (payload, NewsId, imageFile) => __awaiter(void 0, void 0, void 0, function* () {
    const News = yield prisma_1.default.news.findFirst({
        where: { id: NewsId },
        select: { id: true, image: true },
    });
    if (!News) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "News not found");
    }
    let image = News === null || News === void 0 ? void 0 : News.image;
    if (imageFile) {
        image = (yield fileUploader_1.fileUploader.uploadToDigitalOcean(imageFile)).Location;
    }
    const result = yield prisma_1.default.news.update({
        where: { id: NewsId },
        data: Object.assign(Object.assign({}, payload), { image }),
    });
    return result;
});
const deleteNews = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.news.delete({
        where: { id },
    });
    return { message: "Deleted successfully!" };
});
exports.NewsService = {
    addNews,
    allNews,
    updateNews,
    deleteNews,
};
