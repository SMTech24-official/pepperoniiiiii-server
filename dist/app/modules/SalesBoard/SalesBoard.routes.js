"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesBoardRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const SalesBoard_validation_1 = require("./SalesBoard.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const SalesBoard_controller_1 = require("./SalesBoard.controller");
const fileUploader_1 = require("../../../helpars/fileUploader");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router
    .route("/")
    .get((0, auth_1.default)(), SalesBoard_controller_1.SalesBoardController.allSalesBoard)
    .post((0, auth_1.default)(client_1.UserRole.ADMIN), fileUploader_1.fileUploader.uploadSingle, (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(SalesBoard_validation_1.SalesBoardValidation.CreateSalesBoardSchema), SalesBoard_controller_1.SalesBoardController.addSalesBoard);
router.get("/my", (0, auth_1.default)(), SalesBoard_controller_1.SalesBoardController.mySalesBoard);
router
    .route("/:id")
    .put((0, auth_1.default)(), (0, auth_1.default)(client_1.UserRole.ADMIN), fileUploader_1.fileUploader.uploadSingle, (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, SalesBoard_controller_1.SalesBoardController.updateSalesBoard)
    .delete((0, auth_1.default)(), SalesBoard_controller_1.SalesBoardController.deleteSalesBoard);
exports.SalesBoardRoutes = router;
