"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const PurchaseProduct_validation_1 = require("./PurchaseProduct.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const PurchaseProduct_controller_1 = require("./PurchaseProduct.controller");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router
    .route("/")
    .get((0, auth_1.default)(client_1.UserRole.ADMIN), PurchaseProduct_controller_1.PurchaseProductController.purchaseDetails)
    .post((0, auth_1.default)(), (0, validateRequest_1.default)(PurchaseProduct_validation_1.PurchaseProductValidation.CreatePurchaseProductSchema), PurchaseProduct_controller_1.PurchaseProductController.purchaseProduct);
exports.PurchaseProductRoutes = router;
