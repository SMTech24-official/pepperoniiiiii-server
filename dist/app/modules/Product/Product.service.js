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
exports.ProductService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpars/paginationHelper");
const Product_costant_1 = require("./Product.costant");
const fileUploader_1 = require("../../../helpars/fileUploader");
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const http_status_1 = __importDefault(require("http-status"));
const createProduct = (payload, imageFiles) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(imageFiles === null || imageFiles === void 0 ? void 0 : imageFiles.images) ||
        !Array.isArray(imageFiles.images) ||
        imageFiles.images.length === 0) {
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, "At least one image is required");
    }
    const images = yield Promise.all(imageFiles.images.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const imageUrl = (yield fileUploader_1.fileUploader.uploadToDigitalOcean(item)).Location;
        return imageUrl;
    })));
    const res = yield prisma_1.default.product.create({ data: Object.assign(Object.assign({}, payload), { images }) });
    return res;
});
const getProductsFromDb = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (params.searchTerm) {
        andConditions.push({
            OR: Product_costant_1.ProductSearchAbleFields.map((field) => ({
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
    const result = yield prisma_1.default.product.findMany({
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
        select: {
            id: true,
            images: true,
            price: true,
            name: true,
            avgRating: true,
        },
    });
    const total = yield prisma_1.default.product.count({
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
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ProductProfile = yield prisma_1.default.product.findUnique({
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
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Product not found");
    }
    return ProductProfile;
});
const updateProduct = (payload, productId, imageFiles) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const product = yield prisma_1.default.product.findFirst({
        where: { id: productId },
        select: { id: true, images: true },
    });
    if (!product) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Product not found");
    }
    const productImages = product === null || product === void 0 ? void 0 : product.images;
    let newImages = [];
    if (((_a = imageFiles === null || imageFiles === void 0 ? void 0 : imageFiles.images) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        newImages = yield Promise.all(imageFiles.images.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const imageUrl = (yield fileUploader_1.fileUploader.uploadToDigitalOcean(item))
                .Location;
            return imageUrl;
        })));
    }
    const images = [...productImages, ...newImages];
    const result = yield prisma_1.default.product.update({
        where: { id: productId },
        data: Object.assign(Object.assign({}, payload), { images }),
    });
    return result;
});
const deleteProduct = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const product = yield prisma_1.default.product.findFirst({
        where: { id },
        select: { id: true, images: true },
    });
    if (!product) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Product not found");
    }
    if (payload.type === "delete") {
        yield prisma_1.default.product.delete({ where: { id: product.id } });
        return { Message: "Product deleted successfully" };
    }
    const remainingImages = (_a = product.images) === null || _a === void 0 ? void 0 : _a.filter((image) => { var _a; return !((_a = payload.images) === null || _a === void 0 ? void 0 : _a.includes(image)); });
    yield prisma_1.default.product.update({
        where: { id: product.id },
        data: { images: remainingImages },
    });
    return { Message: "image Deleted successfully" };
});
exports.ProductService = {
    createProduct,
    getProductsFromDb,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
