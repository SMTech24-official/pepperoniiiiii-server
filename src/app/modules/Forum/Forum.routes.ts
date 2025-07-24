import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ForumValidation } from "./Forum.validation";
import auth from "../../middlewares/auth";
import { ForumController } from "./Forum.controller";
import { fileUploader } from "../../../helpars/fileUploader";
import { UserRole } from "@prisma/client";

const router = express.Router();

router
  .route("/")
  .get(auth(), ForumController.allForum)
  .post(
    auth(UserRole.ADMIN),
    fileUploader.uploadSingle,
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    validateRequest(ForumValidation.CreateForumSchema),
    ForumController.addForum
  );

router.get("/my", auth(), ForumController.myForum);

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
    ForumController.updateForum
  )
  .patch(auth(), ForumController.likeToForum)
  .delete(auth(), ForumController.deleteForum);

export const ForumRoutes = router;
