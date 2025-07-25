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
exports.PurchaseProductService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const purchaseProduct = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma_1.default.purchaseProduct.create({
        data: Object.assign(Object.assign({}, payload), { userId }),
    });
    return res;
});
const purchaseDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma_1.default.purchaseProduct.findMany({
        include: { product: { select: { name: true, price: true } } },
    });
    return res;
});
exports.PurchaseProductService = {
    purchaseProduct,
    purchaseDetails,
};
