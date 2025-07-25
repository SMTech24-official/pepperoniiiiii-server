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
exports.ForumController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const Forum_costant_1 = require("./Forum.costant");
const Forum_service_1 = require("./Forum.service");
const addForum = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Forum_service_1.ForumService.addForum(req.body, req.file, req.user.id);
    (0, sendResponse_1.default)(res, {
        message: "Forum created successfully!",
        data: result,
    });
}));
const allForum = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, Forum_costant_1.forumFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield Forum_service_1.ForumService.allForum(filters, options, req.user.id);
    (0, sendResponse_1.default)(res, {
        message: "Forum retrieve successfully!",
        data: result,
    });
}));
const updateForum = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Forum_service_1.ForumService.updateForum(req.body, req.params.id, req.file);
    (0, sendResponse_1.default)(res, {
        message: "Forum updated successfully!",
        data: result,
    });
}));
const deleteForum = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Forum_service_1.ForumService.deleteForum(req.params.id);
    (0, sendResponse_1.default)(res, {
        message: "Deleted successfully!",
        data: result,
    });
}));
const likeToForum = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Forum_service_1.ForumService.likeToForum(req.params.id, req.user.id);
    (0, sendResponse_1.default)(res, {
        message: "Forum action successfully!",
        data: result,
    });
}));
const myForum = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, Forum_costant_1.forumFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield Forum_service_1.ForumService.myForum(filters, options, req.user.id);
    (0, sendResponse_1.default)(res, {
        message: "Forum retrieve successfully!",
        data: result,
    });
}));
exports.ForumController = {
    addForum,
    allForum,
    updateForum,
    deleteForum,
    likeToForum,
    myForum,
};
