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
exports.NewsController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const News_costant_1 = require("./News.costant");
const News_service_1 = require("./News.service");
const addNews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield News_service_1.NewsService.addNews(req.body, req.file);
    (0, sendResponse_1.default)(res, {
        message: "News created successfully!",
        data: result,
    });
}));
const allNews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, News_costant_1.newsFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield News_service_1.NewsService.allNews(filters, options);
    (0, sendResponse_1.default)(res, {
        message: "News retrieve successfully!",
        data: result,
    });
}));
const updateNews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield News_service_1.NewsService.updateNews(req.body, req.params.id, req.file);
    (0, sendResponse_1.default)(res, {
        message: "News updated successfully!",
        data: result,
    });
}));
const deleteNews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield News_service_1.NewsService.deleteNews(req.params.id);
    (0, sendResponse_1.default)(res, {
        message: "Deleted successfully!",
        data: result,
    });
}));
exports.NewsController = {
    addNews,
    allNews,
    updateNews,
    deleteNews,
};
