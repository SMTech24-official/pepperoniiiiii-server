import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AiDiagnosisValidation } from "./AiDiagnosis.validation";
import auth from "../../middlewares/auth";
import { AiDiagnosisController } from "./AiDiagnosis.controller";
import { fileUploader } from "../../../helpars/fileUploader";
import { UserRole } from "@prisma/client";

const router = express.Router();

router
  .route("/")
  .get(auth(), AiDiagnosisController.allAiDiagnosis)
  .post(
    auth(UserRole.USER, UserRole.ADMIN),
    fileUploader.uploadSingle,
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    validateRequest(AiDiagnosisValidation.CreateAiDiagnosisSchema),
    AiDiagnosisController.addAiDiagnosis
  );

router
  .route("/:id")
  .get(auth(), AiDiagnosisController.userAiDiagnosis)
  .delete(auth(UserRole.ADMIN), AiDiagnosisController.deleteAiDiagnosis);

export const AiDiagnosisRoutes = router;
