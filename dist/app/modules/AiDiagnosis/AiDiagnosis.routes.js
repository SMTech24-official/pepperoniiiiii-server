"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiDiagnosisRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const AiDiagnosis_validation_1 = require("./AiDiagnosis.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const AiDiagnosis_controller_1 = require("./AiDiagnosis.controller");
const fileUploader_1 = require("../../../helpars/fileUploader");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router
    .route("/")
    .get((0, auth_1.default)(), AiDiagnosis_controller_1.AiDiagnosisController.allAiDiagnosis)
    .post((0, auth_1.default)(client_1.UserRole.USER, client_1.UserRole.ADMIN), fileUploader_1.fileUploader.uploadSingle, (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(AiDiagnosis_validation_1.AiDiagnosisValidation.CreateAiDiagnosisSchema), AiDiagnosis_controller_1.AiDiagnosisController.addAiDiagnosis);
router
    .route("/:id")
    .get((0, auth_1.default)(), AiDiagnosis_controller_1.AiDiagnosisController.userAiDiagnosis)
    .delete((0, auth_1.default)(client_1.UserRole.ADMIN), AiDiagnosis_controller_1.AiDiagnosisController.deleteAiDiagnosis);
exports.AiDiagnosisRoutes = router;
