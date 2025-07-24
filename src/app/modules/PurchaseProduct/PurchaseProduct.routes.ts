import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { PurchaseProductValidation } from "./PurchaseProduct.validation";
import auth from "../../middlewares/auth";
import { PurchaseProductController } from "./PurchaseProduct.controller";
import { UserRole } from "@prisma/client";

const router = express.Router();

router
  .route("/")
  .get(auth(UserRole.ADMIN), PurchaseProductController.purchaseDetails)
  .post(
    auth(),
    validateRequest(PurchaseProductValidation.CreatePurchaseProductSchema),
    PurchaseProductController.purchaseProduct
  );

export const PurchaseProductRoutes = router;
