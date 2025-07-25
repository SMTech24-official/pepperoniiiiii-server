import prisma from "../../../shared/prisma";
import { subMonths, format } from "date-fns";

const overView = async () => {
  const totalRevenue = await prisma.purchaseProduct.aggregate({
    _sum: { totalPrice: true },
  });

  const totalOrders = await prisma.purchaseProduct.count();

  const totalDiagnosis = await prisma.aiDiagnosis.count();

  return {
    totalRevenue: totalRevenue._sum.totalPrice || 0,
    totalOrders,
    totalDiagnosis,
  };
};

const revenueChart = async () => {
  const twelveMonthsAgo = subMonths(new Date(), 6);

  const purchases = await prisma.purchaseProduct.findMany({
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

  const monthlyRevenueMap: Record<string, number> = {};

  for (const purchase of purchases) {
    const key = format(purchase.createdAt, "yyyy-MM");
    monthlyRevenueMap[key] = (monthlyRevenueMap[key] || 0) + purchase.totalPrice;
  }

  const chartData = Array.from({ length: 6 }).map((_, index) => {
    const date = subMonths(new Date(), 6 - index);
    const key = format(date, "yyyy-MM");
    const monthName = format(date, "MMMM"); 

    return {
      month: monthName,
      totalRevenue: monthlyRevenueMap[key] || 0,
    };
  });

  return chartData;
};

export const DashboardService = {
  overView,
  revenueChart,
};
