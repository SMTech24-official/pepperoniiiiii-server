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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const Product_service_1 = require("./Product.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const Product_costant_1 = require("./Product.costant");
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Product_service_1.ProductService.createProduct(req.body, req.files);
    (0, sendResponse_1.default)(res, {
        message: "Product Created successfully!",
        data: result,
    });
}));
const getProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, Product_costant_1.ProductFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield Product_service_1.ProductService.getProductsFromDb(filters, options);
    (0, sendResponse_1.default)(res, {
        message: "Products retrieve successfully!",
        data: result,
    });
}));
const getSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Product_service_1.ProductService.getSingleProduct(req.params.id);
    (0, sendResponse_1.default)(res, {
        message: "Product profile retrieved successfully",
        data: result,
    });
}));
const updateProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req === null || req === void 0 ? void 0 : req.user;
    const result = yield Product_service_1.ProductService.updateProduct(req.body, req.params.id, req.files);
    (0, sendResponse_1.default)(res, {
        message: "Profile updated successfully!",
        data: result,
    });
}));
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req === null || req === void 0 ? void 0 : req.user;
    const result = yield Product_service_1.ProductService.deleteProduct(req.body, req.params.id);
    (0, sendResponse_1.default)(res, {
        message: "Deleted successfully!",
        data: result,
    });
}));
exports.ProductController = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
