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
exports.AiDiagnosisController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const AiDiagnosis_costant_1 = require("./AiDiagnosis.costant");
const AiDiagnosis_service_1 = require("./AiDiagnosis.service");
const addAiDiagnosis = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield AiDiagnosis_service_1.AiDiagnosisService.addAiDiagnosis(req.body, req.file, req.user.id);
    (0, sendResponse_1.default)(res, {
        message: "AiDiagnosis created successfully!",
        data: result,
    });
}));
const allAiDiagnosis = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, AiDiagnosis_costant_1.AiDiagnosisFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield AiDiagnosis_service_1.AiDiagnosisService.allAiDiagnosis(filters, options);
    (0, sendResponse_1.default)(res, {
        message: "AiDiagnosis retrieve successfully!",
        data: result,
    });
}));
const userAiDiagnosis = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, AiDiagnosis_costant_1.AiDiagnosisFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield AiDiagnosis_service_1.AiDiagnosisService.userAiDiagnosis(filters, options, req.params.id);
    (0, sendResponse_1.default)(res, {
        message: "AiDiagnosis retrieve successfully!",
        data: result,
    });
}));
const deleteAiDiagnosis = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield AiDiagnosis_service_1.AiDiagnosisService.deleteAiDiagnosis(req.params.id);
    (0, sendResponse_1.default)(res, {
        message: "Deleted successfully!",
        data: result,
    });
}));
exports.AiDiagnosisController = {
    addAiDiagnosis,
    allAiDiagnosis,
    userAiDiagnosis,
    deleteAiDiagnosis,
};
