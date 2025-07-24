import prisma from "../../../shared/prisma";
import { TPurchaseProduct } from "./PurchaseProduct.interface";

const purchaseProduct = async (payload: TPurchaseProduct, userId: string) => {
  const res = await prisma.purchaseProduct.create({
    data: { ...payload, userId },
  });

  return res;
};

const purchaseDetails = async () => {
  const res = await prisma.purchaseProduct.findMany({
    include: { product: { select: { name: true, price: true } } },
  });

  return res;
};

export const PurchaseProductService = {
  purchaseProduct,
  purchaseDetails,
};
