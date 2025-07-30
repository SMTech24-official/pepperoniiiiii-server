"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Forum_validation_1 = require("./Forum.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const Forum_controller_1 = require("./Forum.controller");
const fileUploader_1 = require("../../../helpars/fileUploader");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router
    .route("/")
    .get((0, auth_1.default)(), Forum_controller_1.ForumController.allForum)
    .post((0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), fileUploader_1.fileUploader.uploadSingle, (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(Forum_validation_1.ForumValidation.CreateForumSchema), Forum_controller_1.ForumController.addForum);
router.get("/my", (0, auth_1.default)(), Forum_controller_1.ForumController.myForum);
router
    .route("/:id")
    .put((0, auth_1.default)(), (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), fileUploader_1.fileUploader.uploadSingle, (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, Forum_controller_1.ForumController.updateForum)
    .patch((0, auth_1.default)(), Forum_controller_1.ForumController.likeToForum)
    .delete((0, auth_1.default)(), Forum_controller_1.ForumController.deleteForum);
exports.ForumRoutes = router;
