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
exports.CartService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const http_status_1 = __importDefault(require("http-status"));
const addToCart = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma_1.default.product.findFirst({
        where: { id: payload.productId },
    });
    if (!product) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Product not found");
    }
    const res = yield prisma_1.default.cart.create({ data: Object.assign(Object.assign({}, payload), { userId }) });
    return res;
});
const myCarts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma_1.default.cart.findMany({
        where: { userId },
        select: {
            id: true,
            quantity: true,
            product: { select: { id: true, name: true, price: true, weight: true } },
        },
    });
    return res;
});
const updateCart = (payload, CartId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const Cart = yield prisma_1.default.cart.findFirst({
        where: { id: CartId, userId },
        select: { id: true },
    });
    if (!Cart) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Cart not found");
    }
    const result = yield prisma_1.default.cart.update({
        where: { id: CartId },
        data: { quantity: payload.quantity },
    });
    return result;
});
const deleteCart = (CartId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const Cart = yield prisma_1.default.cart.findFirst({
        where: { id: CartId, userId },
        select: { id: true },
    });
    if (!Cart) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Cart not found");
    }
    const result = yield prisma_1.default.cart.delete({
        where: { id: Cart.id },
    });
    return { message: "Deleted successfully!" };
});
exports.CartService = {
    addToCart,
    myCarts,
    updateCart,
    deleteCart,
};
