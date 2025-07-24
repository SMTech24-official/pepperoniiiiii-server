import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CartValidation } from "./Cart.validation";
import auth from "../../middlewares/auth";
import { CartController } from "./Cart.controller";


const router = express.Router();

router
  .route("/")
  .get(auth(), CartController.myCarts)
  .post(
    auth(),
    validateRequest(CartValidation.CreateCartSchema),
    CartController.addToCart
  );

router
  .route("/:id")
  .patch(auth(), CartController.updateCart)
  .delete(auth(), CartController.deleteCart);

export const CartRoutes = router;
