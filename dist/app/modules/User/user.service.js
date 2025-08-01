"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const bcrypt = __importStar(require("bcrypt"));
const paginationHelper_1 = require("../../../helpars/paginationHelper");
const user_costant_1 = require("./user.costant");
const config_1 = __importDefault(require("../../../config"));
const fileUploader_1 = require("../../../helpars/fileUploader");
const http_status_1 = __importDefault(require("http-status"));
const createUserIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.default.user.findFirst({
        where: {
            email: payload.email,
        },
    });
    if (existingUser) {
        if (existingUser.email === payload.email) {
            throw new ApiErrors_1.default(400, `User with this email ${payload.email} already exists`);
        }
    }
    const hashedPassword = yield bcrypt.hash(payload.password, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield prisma_1.default.user.create({
        data: Object.assign(Object.assign({}, payload), { password: hashedPassword }),
        select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
const getUsersFromDb = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (params.searchTerm) {
        andConditions.push({
            OR: user_costant_1.userSearchAbleFields.map((field) => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = { AND: andConditions };
    const result = yield prisma_1.default.user.findMany({
        where: Object.assign(Object.assign({}, whereConditions), { role: { not: "ADMIN" } }),
        skip,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: "desc",
            },
        select: {
            id: true,
            fullName: true,
            email: true,
            image: true,
            role: true,
            phoneNumber: true,
            location: true,
            isDeleted: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    const total = yield prisma_1.default.user.count({
        where: whereConditions,
    });
    if (!result || result.length === 0) {
        throw new ApiErrors_1.default(404, "No active users found");
    }
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getMyProfile = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfile = yield prisma_1.default.user.findUnique({
        where: {
            email: userEmail,
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            location: true,
            image: true,
            phoneNumber: true,
        },
    });
    return userProfile;
});
const updateProfile = (payload, imageFile, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
        where: { id: userId },
        select: { id: true, image: true },
    });
    let image = user === null || user === void 0 ? void 0 : user.image;
    if (imageFile) {
        image = (yield fileUploader_1.fileUploader.uploadToCloudinary(imageFile)).Location;
    }
    const result = yield prisma_1.default.user.update({
        where: { id: userId },
        data: Object.assign(Object.assign({}, payload), { image: image }),
        select: {
            id: true,
            fullName: true,
            email: true,
            location: true,
            image: true,
            phoneNumber: true,
        },
    });
    return result;
});
const blockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
        where: { id: userId },
        select: { id: true, isDeleted: true },
    });
    if (!user) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    yield prisma_1.default.user.update({
        where: { id: user.id },
        data: { isDeleted: !user.isDeleted },
    });
    return { message: "User is blocked successfully" };
});
exports.userService = {
    createUserIntoDb,
    getUsersFromDb,
    getMyProfile,
    updateProfile,
    blockUser
};
