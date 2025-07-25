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
exports.CartController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const Cart_service_1 = require("./Cart.service");
const addToCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Cart_service_1.CartService.addToCart(req.body, req.user.id);
    (0, sendResponse_1.default)(res, {
        message: "Add To Cart successfully!",
        data: result,
    });
}));
const myCarts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Cart_service_1.CartService.myCarts(req.user.id);
    (0, sendResponse_1.default)(res, {
        message: "Carts retrieve successfully!",
        data: result,
    });
}));
const updateCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req === null || req === void 0 ? void 0 : req.user;
    const result = yield Cart_service_1.CartService.updateCart(req.body, req.params.id, req.user.id);
    (0, sendResponse_1.default)(res, {
        message: "Cart updated successfully!",
        data: result,
    });
}));
const deleteCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Cart_service_1.CartService.deleteCart(req.params.id, req.user.id);
    (0, sendResponse_1.default)(res, {
        message: "Deleted successfully!",
        data: result,
    });
}));
exports.CartController = {
    addToCart,
    myCarts,
    updateCart,
    deleteCart,
};
