"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const Dashboard_controller_1 = require("./Dashboard.controller");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.route("/overview").get((0, auth_1.default)(client_1.UserRole.ADMIN), Dashboard_controller_1.DashboardController.overView);
router.get("/revenue-chart", (0, auth_1.default)(client_1.UserRole.ADMIN), Dashboard_controller_1.DashboardController.revenueChart);
exports.DashboardRoutes = router;
