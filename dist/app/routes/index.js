"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/Auth/auth.routes");
const user_routes_1 = require("../modules/User/user.routes");
const Product_routes_1 = require("../modules/Product/Product.routes");
const Cart_routes_1 = require("../modules/Cart/Cart.routes");
const PurchaseProduct_routes_1 = require("../modules/PurchaseProduct/PurchaseProduct.routes");
const News_routes_1 = require("../modules/News/News.routes");
const Forum_routes_1 = require("../modules/Forum/Forum.routes");
const SalesBoard_routes_1 = require("../modules/SalesBoard/SalesBoard.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/users",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/product",
        route: Product_routes_1.ProductRoutes,
    },
    {
        path: "/cart",
        route: Cart_routes_1.CartRoutes,
    },
    {
        path: "/purchase-product",
        route: PurchaseProduct_routes_1.PurchaseProductRoutes,
    },
    {
        path: "/news",
        route: News_routes_1.NewsRoutes,
    },
    {
        path: "/forum",
        route: Forum_routes_1.ForumRoutes,
    },
    {
        path: "/sales-board",
        route: SalesBoard_routes_1.SalesBoardRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
