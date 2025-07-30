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
exports.DashboardService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const date_fns_1 = require("date-fns");
const overView = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalRevenue = yield prisma_1.default.purchaseProduct.aggregate({
        _sum: { totalPrice: true },
    });
    const totalOrders = yield prisma_1.default.purchaseProduct.count();
    const totalDiagnosis = yield prisma_1.default.aiDiagnosis.count();
    return {
        totalRevenue: totalRevenue._sum.totalPrice || 0,
        totalOrders,
        totalDiagnosis,
    };
});
const revenueChart = () => __awaiter(void 0, void 0, void 0, function* () {
    const twelveMonthsAgo = (0, date_fns_1.subMonths)(new Date(), 6);
    const purchases = yield prisma_1.default.purchaseProduct.findMany({
        where: {
            createdAt: {
                gte: twelveMonthsAgo,
            },
        },
        select: {
            createdAt: true,
            totalPrice: true,
        },
    });
    const monthlyRevenueMap = {};
    for (const purchase of purchases) {
        const key = (0, date_fns_1.format)(purchase.createdAt, "yyyy-MM");
        monthlyRevenueMap[key] = (monthlyRevenueMap[key] || 0) + purchase.totalPrice;
    }
    const chartData = Array.from({ length: 6 }).map((_, index) => {
        const date = (0, date_fns_1.subMonths)(new Date(), 6 - index);
        const key = (0, date_fns_1.format)(date, "yyyy-MM");
        const monthName = (0, date_fns_1.format)(date, "MMMM");
        return {
            month: monthName,
            totalRevenue: monthlyRevenueMap[key] || 0,
        };
    });
    return chartData;
});
exports.DashboardService = {
    overView,
    revenueChart,
};
