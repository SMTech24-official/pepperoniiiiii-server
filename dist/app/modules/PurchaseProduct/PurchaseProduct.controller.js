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
exports.PurchaseProductController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const News_costant_1 = require("../News/News.costant");
const PurchaseProduct_service_1 = require("./PurchaseProduct.service");
const purchaseProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield PurchaseProduct_service_1.PurchaseProductService.purchaseProduct(req.body, req.user.id);
    (0, sendResponse_1.default)(res, {
        message: "Add To PurchaseProduct successfully!",
        data: result,
    });
}));
const allOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, News_costant_1.newsFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield PurchaseProduct_service_1.PurchaseProductService.allOrder(filters, options);
    (0, sendResponse_1.default)(res, {
        message: "All Order retrieve successfully!",
        data: result,
    });
}));
const userOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, News_costant_1.newsFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield PurchaseProduct_service_1.PurchaseProductService.userOrders(filters, options, req.params.id);
    (0, sendResponse_1.default)(res, {
        message: "User Orders retrieve successfully!",
        data: result,
    });
}));
const updateOrderStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield PurchaseProduct_service_1.PurchaseProductService.updateOrderStatus(req.body, req.params.id);
    (0, sendResponse_1.default)(res, {
        message: "Order status updated successfully!",
        data: result,
    });
}));
exports.PurchaseProductController = {
    purchaseProduct,
    allOrder,
    userOrders,
    updateOrderStatus
};
