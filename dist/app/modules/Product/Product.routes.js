"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Product_validation_1 = require("./Product.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const fileUploader_1 = require("../../../helpars/fileUploader");
const Product_controller_1 = require("./Product.controller");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router
    .route("/")
    .get(Product_controller_1.ProductController.getProducts)
    .post((0, auth_1.default)(client_1.UserRole.ADMIN), fileUploader_1.fileUploader.uploadMultipleImage, (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(Product_validation_1.ProductValidation.CreateProductSchema), Product_controller_1.ProductController.createProduct);
router
    .route("/:id")
    .get((0, auth_1.default)(), Product_controller_1.ProductController.getSingleProduct)
    .put((0, auth_1.default)(client_1.UserRole.ADMIN), fileUploader_1.fileUploader.uploadMultipleImage, (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(Product_validation_1.ProductValidation.ProductUpdateSchema), Product_controller_1.ProductController.updateProduct)
    .delete((0, auth_1.default)(client_1.UserRole.ADMIN), Product_controller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
