"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const News_validation_1 = require("./News.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const News_controller_1 = require("./News.controller");
const fileUploader_1 = require("../../../helpars/fileUploader");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router
    .route("/")
    .get((0, auth_1.default)(), News_controller_1.NewsController.allNews)
    .post((0, auth_1.default)(client_1.UserRole.ADMIN), fileUploader_1.fileUploader.uploadSingle, (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(News_validation_1.NewsValidation.CreateNewsSchema), News_controller_1.NewsController.addNews);
router
    .route("/:id")
    .put((0, auth_1.default)(), (0, auth_1.default)(client_1.UserRole.ADMIN), fileUploader_1.fileUploader.uploadSingle, (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(News_validation_1.NewsValidation.UpdateNewsSchema), News_controller_1.NewsController.updateNews)
    .delete((0, auth_1.default)(), News_controller_1.NewsController.deleteNews);
exports.NewsRoutes = router;
