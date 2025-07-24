import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { NewsValidation } from "./News.validation";
import auth from "../../middlewares/auth";
import { NewsController } from "./News.controller";
import { fileUploader } from "../../../helpars/fileUploader";
import { UserRole } from "@prisma/client";

const router = express.Router();

router
  .route("/")
  .get(auth(), NewsController.allNews)
  .post(
    auth(UserRole.ADMIN),
    fileUploader.uploadSingle,
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    validateRequest(NewsValidation.CreateNewsSchema),
    NewsController.addNews
  );

router
  .route("/:id")
  .put(
    auth(),
    auth(UserRole.ADMIN),
    fileUploader.uploadSingle,
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    validateRequest(NewsValidation.UpdateNewsSchema),
    NewsController.updateNews
  )
  .delete(auth(), NewsController.deleteNews);

export const NewsRoutes = router;
