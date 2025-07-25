import express from "express";
import auth from "../../middlewares/auth";
import { DashboardController } from "./Dashboard.controller";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.route("/overview").get(auth(UserRole.ADMIN), DashboardController.overView);

router.get("/revenue-chart", auth(UserRole.ADMIN), DashboardController.revenueChart);

export const DashboardRoutes = router;
