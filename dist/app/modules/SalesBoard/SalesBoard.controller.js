"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesBoardController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const SalesBoard_costant_1 = require("./SalesBoard.costant");
const SalesBoard_service_1 = require("./SalesBoard.service");
const addSalesBoard = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SalesBoard_service_1.SalesBoardService.addSalesBoard(req.body, req.file, req.user.id);
    (0, sendResponse_1.default)(res, {
        message: "Sales Board created successfully!",
        data: result,
    });
}));
const allSalesBoard = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, SalesBoard_costant_1.SalesBoardFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield SalesBoard_service_1.SalesBoardService.allSalesBoard(filters, options);
    (0, sendResponse_1.default)(res, {
        message: "Sales Board retrieve successfully!",
        data: result,
    });
}));
const updateSalesBoard = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SalesBoard_service_1.SalesBoardService.updateSalesBoard(req.body, req.params.id, req.file);
    (0, sendResponse_1.default)(res, {
        message: "Sales Board updated successfully!",
        data: result,
    });
}));
const deleteSalesBoard = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SalesBoard_service_1.SalesBoardService.deleteSalesBoard(req.params.id);
    (0, sendResponse_1.default)(res, {
        message: "Deleted successfully!",
        data: result,
    });
}));
const mySalesBoard = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, SalesBoard_costant_1.SalesBoardFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield SalesBoard_service_1.SalesBoardService.mySalesBoard(filters, options, req.user.id);
    (0, sendResponse_1.default)(res, {
        message: "Sales Board retrieve successfully!",
        data: result,
    });
}));
exports.SalesBoardController = {
    addSalesBoard,
    allSalesBoard,
    updateSalesBoard,
    deleteSalesBoard,
    mySalesBoard
};
