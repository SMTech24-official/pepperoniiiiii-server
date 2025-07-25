"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Cart_validation_1 = require("./Cart.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const Cart_controller_1 = require("./Cart.controller");
const router = express_1.default.Router();
router
    .route("/")
    .get((0, auth_1.default)(), Cart_controller_1.CartController.myCarts)
    .post((0, auth_1.default)(), (0, validateRequest_1.default)(Cart_validation_1.CartValidation.CreateCartSchema), Cart_controller_1.CartController.addToCart);
router
    .route("/:id")
    .patch((0, auth_1.default)(), Cart_controller_1.CartController.updateCart)
    .delete((0, auth_1.default)(), Cart_controller_1.CartController.deleteCart);
exports.CartRoutes = router;
