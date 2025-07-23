import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./Product.validation";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../../helpars/fileUploader";
import { ProductController } from "./Product.controller";
import { UserRole } from "@prisma/client";

const router = express.Router();

router
  .route("/")
  .get(ProductController.getProducts)
  .post(
    auth(UserRole.ADMIN),
    fileUploader.uploadMultipleImage,
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    validateRequest(ProductValidation.CreateProductSchema),
    ProductController.createProduct
  );

router
  .route("/:id")
  .get(auth(), ProductController.getSingleProduct)
  .put(
    auth(UserRole.ADMIN),
    fileUploader.uploadMultipleImage,
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    validateRequest(ProductValidation.ProductUpdateSchema),
    ProductController.updateProduct
  );

export const ProductRoutes = router;
