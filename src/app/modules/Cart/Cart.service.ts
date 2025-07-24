import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";
import { TCart } from "./Cart.interface";

const addToCart = async (payload: TCart, userId: string) => {
  const product = await prisma.product.findFirst({
    where: { id: payload.productId },
  });

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }

  const res = await prisma.cart.create({ data: { ...payload, userId } });

  return res;
};

const myCarts = async (userId: string) => {
  const res = await prisma.cart.findMany({
    where: { userId },
    select: {
      id: true,
      quantity: true,
      product: { select: { id: true, name: true, price: true, weight: true } },
    },
  });

  return res;
};

const updateCart = async (
  payload: { quantity: number },
  CartId: string,
  userId: string
) => {
  const Cart = await prisma.cart.findFirst({
    where: { id: CartId, userId },
    select: { id: true },
  });

  if (!Cart) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cart not found");
  }

  const result = await prisma.cart.update({
    where: { id: CartId },
    data: { quantity: payload.quantity },
  });

  return result;
};

const deleteCart = async (CartId: string, userId: string) => {
  const Cart = await prisma.cart.findFirst({
    where: { id: CartId, userId },
    select: { id: true },
  });

  if (!Cart) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cart not found");
  }

  const result = await prisma.cart.delete({
    where: { id: Cart.id },
  });

  return { message: "Deleted successfully!" };
};

export const CartService = {
  addToCart,
  myCarts,
  updateCart,
  deleteCart,
};
