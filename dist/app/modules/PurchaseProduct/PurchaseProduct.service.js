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
exports.PurchaseProductService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpars/paginationHelper");
const Purchase_costant_1 = require("./Purchase.costant");
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const http_status_1 = __importDefault(require("http-status"));
const purchaseProduct = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma_1.default.purchaseProduct.create({
        data: Object.assign(Object.assign({}, payload), { userId }),
    });
    return res;
});
const allOrder = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (params.searchTerm) {
        andConditions.push({
            OR: Purchase_costant_1.purchaseSearchAbleFields.map((field) => ({
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
    const whereConditions = {
        AND: andConditions,
    };
    const result = yield prisma_1.default.purchaseProduct.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: "desc",
            },
        include: { product: { select: { name: true, price: true } } },
    });
    const total = yield prisma_1.default.purchaseProduct.count({
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
const userOrders = (params, options, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (params.searchTerm) {
        andConditions.push({
            OR: Purchase_costant_1.purchaseSearchAbleFields.map((field) => ({
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
    const whereConditions = {
        AND: andConditions,
    };
    const result = yield prisma_1.default.purchaseProduct.findMany({
        where: Object.assign(Object.assign({}, whereConditions), { userId }),
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: "desc",
            },
        include: { product: { select: { name: true, price: true } } },
    });
    const total = yield prisma_1.default.purchaseProduct.count({
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
const updateOrderStatus = (payload, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield prisma_1.default.purchaseProduct.findUnique({
        where: { id: orderId },
        select: { id: true },
    });
    if (!order) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Order not found");
    }
    const result = yield prisma_1.default.purchaseProduct.update({
        where: { id: orderId },
        data: { orderStatus: payload.status },
        select: { orderStatus: true },
    });
    return result;
});
exports.PurchaseProductService = {
    purchaseProduct,
    allOrder,
    userOrders,
    updateOrderStatus,
};
