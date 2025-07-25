import { OrderStatus } from "@prisma/client";

export type TPurchaseProduct = {
  id: string;
  quantity: number;
  name: string;
  phoneNumber: string;
  deliveryAddress: string;
  orderStatus: OrderStatus;
  totalPrice: number;
  paymentId: string;
  createdAt: Date;
  productId: string;
  userId: string;
};


export type IPurchaseFilterRequest = {
  name?: string | undefined;
  email?: string | undefined;
  contactNumber?: string | undefined;
  searchTerm?: string | undefined;
};