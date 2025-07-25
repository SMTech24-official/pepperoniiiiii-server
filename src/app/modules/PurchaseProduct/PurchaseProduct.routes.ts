import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { PurchaseProductValidation } from "./PurchaseProduct.validation";
import auth from "../../middlewares/auth";
import { PurchaseProductController } from "./PurchaseProduct.controller";
import { UserRole } from "@prisma/client";

const router = express.Router();

router
  .route("/")
  .get(auth(UserRole.ADMIN), PurchaseProductController.allOrder)
  .post(
    auth(),
    validateRequest(PurchaseProductValidation.CreatePurchaseProductSchema),
    PurchaseProductController.purchaseProduct
  );

router
  .route("/:id")
  .get(auth(UserRole.ADMIN), PurchaseProductController.userOrders)
  .patch(
    auth(UserRole.ADMIN),
    validateRequest(PurchaseProductValidation.UpdateOrderStatusSchema),
    PurchaseProductController.updateOrderStatus
  );

export const PurchaseProductRoutes = router;
