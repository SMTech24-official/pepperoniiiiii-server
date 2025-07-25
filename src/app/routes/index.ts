import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { UserRoutes } from "../modules/User/user.routes";
import { ProductRoutes } from "../modules/Product/Product.routes";
import { CartRoutes } from "../modules/Cart/Cart.routes";
import { PurchaseProductRoutes } from "../modules/PurchaseProduct/PurchaseProduct.routes";
import { NewsRoutes } from "../modules/News/News.routes";
import { ForumRoutes } from "../modules/Forum/Forum.routes";
import { SalesBoardRoutes } from "../modules/SalesBoard/SalesBoard.routes";
import { AiDiagnosisRoutes } from "../modules/AiDiagnosis/AiDiagnosis.routes";
import { DashboardRoutes } from "../modules/Dashboard/Dashboard.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/cart",
    route: CartRoutes,
  },
  {
    path: "/purchase-product",
    route: PurchaseProductRoutes,
  },
  {
    path: "/news",
    route: NewsRoutes,
  },
  {
    path: "/forum",
    route: ForumRoutes,
  },
  {
    path: "/sales-board",
    route: SalesBoardRoutes,
  },
  {
    path: "/ai-diagnosis",
    route: AiDiagnosisRoutes,
  },
  {
    path: "/dashboard",
    route: DashboardRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
