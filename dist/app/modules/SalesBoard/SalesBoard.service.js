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
exports.SalesBoardService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const http_status_1 = __importDefault(require("http-status"));
const paginationHelper_1 = require("../../../helpars/paginationHelper");
const fileUploader_1 = require("../../../helpars/fileUploader");
const SalesBoard_costant_1 = require("./SalesBoard.costant");
const addSalesBoard = (payload, imageFile, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!imageFile) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Image not found");
    }
    const image = (yield fileUploader_1.fileUploader.uploadToDigitalOcean(imageFile)).Location;
    const res = yield prisma_1.default.salesBoard.create({
        data: Object.assign(Object.assign({}, payload), { image, userId }),
    });
    return res;
});
const allSalesBoard = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (params.searchTerm) {
        andConditions.push({
            OR: SalesBoard_costant_1.SalesBoardSearchAbleFields.map((field) => ({
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
    const result = yield prisma_1.default.salesBoard.findMany({
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
            price: true,
            quantity: true,
            user: { select: { fullName: true, image: true, location: true } },
        },
    });
    const total = yield prisma_1.default.salesBoard.count({
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
const updateSalesBoard = (payload, SalesBoardId, imageFile) => __awaiter(void 0, void 0, void 0, function* () {
    const SalesBoard = yield prisma_1.default.salesBoard.findFirst({
        where: { id: SalesBoardId },
        select: { id: true, image: true },
    });
    if (!SalesBoard) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "SalesBoard not found");
    }
    let image = SalesBoard === null || SalesBoard === void 0 ? void 0 : SalesBoard.image;
    if (imageFile) {
        image = (yield fileUploader_1.fileUploader.uploadToDigitalOcean(imageFile)).Location;
    }
    const result = yield prisma_1.default.salesBoard.update({
        where: { id: SalesBoardId },
        data: Object.assign(Object.assign({}, payload), { image }),
    });
    return result;
});
const deleteSalesBoard = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.salesBoard.delete({
        where: { id },
    });
    return { message: "Deleted successfully!" };
});
const mySalesBoard = (params, options, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (params.searchTerm) {
        andConditions.push({
            OR: SalesBoard_costant_1.SalesBoardSearchAbleFields.map((field) => ({
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
    const result = yield prisma_1.default.salesBoard.findMany({
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
            price: true,
            quantity: true,
            user: { select: { fullName: true, image: true, location: true } },
        },
    });
    const total = yield prisma_1.default.salesBoard.count({
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
exports.SalesBoardService = {
    addSalesBoard,
    allSalesBoard,
    updateSalesBoard,
    deleteSalesBoard,
    mySalesBoard,
};
