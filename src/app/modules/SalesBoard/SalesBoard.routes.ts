import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SalesBoardValidation } from "./SalesBoard.validation";
import auth from "../../middlewares/auth";
import { SalesBoardController } from "./SalesBoard.controller";
import { fileUploader } from "../../../helpars/fileUploader";
import { UserRole } from "@prisma/client";

const router = express.Router();

router
  .route("/")
  .get(auth(), SalesBoardController.allSalesBoard)
  .post(
    auth(UserRole.ADMIN, UserRole.USER),
    fileUploader.uploadSingle,
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    validateRequest(SalesBoardValidation.CreateSalesBoardSchema),
    SalesBoardController.addSalesBoard
  );

router.get("/my", auth(), SalesBoardController.mySalesBoard);

router
  .route("/:id")
  .put(
    auth(),
    auth(UserRole.ADMIN, UserRole.USER),
    fileUploader.uploadSingle,
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    SalesBoardController.updateSalesBoard
  )
  .delete(auth(), SalesBoardController.deleteSalesBoard);

export const SalesBoardRoutes = router;
