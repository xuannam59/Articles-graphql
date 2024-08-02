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
exports.resolversUser = void 0;
const generate_helper_1 = require("../helpers/generate.helper");
const user_model_1 = __importDefault(require("../model/user.model"));
const md5_1 = __importDefault(require("md5"));
exports.resolversUser = {
    Query: {
        getInfoUser: (_, agrs, context) => __awaiter(void 0, void 0, void 0, function* () {
            const token = context["user"].token;
            const infoUser = yield user_model_1.default.findOne({
                token: token,
                deleted: false
            });
            if (!infoUser) {
                return {
                    code: 400,
                    message: "Error!"
                };
            }
            return {
                code: 200,
                message: "Success!",
                fullName: infoUser.fullName,
                avatar: infoUser.avatar,
                email: infoUser.email,
                phone: infoUser.phone
            };
        }),
    },
    Mutation: {
        registerUser: (_, agrs) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = agrs;
            const existEmail = yield user_model_1.default.findOne({
                email: user.email,
                deleted: false
            });
            if (existEmail) {
                return {
                    code: 400,
                    message: "Email đã tồn tại!"
                };
            }
            user.password = (0, md5_1.default)(user.password);
            user.token = (0, generate_helper_1.generateRandomString)(25);
            const newUser = new user_model_1.default(user);
            const data = yield newUser.save();
            return {
                code: 200,
                message: "Thành công",
                id: data._id,
                fullName: data.fullName,
                email: data.email,
                token: data.token
            };
        }),
        loginUser: (_, agrs) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, password } = agrs.user;
            const infoUser = yield user_model_1.default.findOne({
                email: email,
                deleted: false
            });
            if (!infoUser) {
                return {
                    code: 400,
                    message: "Email Không tồn tại!"
                };
            }
            if ((0, md5_1.default)(password) !== infoUser.password) {
                return {
                    code: 400,
                    message: "Password không đúng"
                };
            }
            return {
                code: 200,
                message: "Success",
                id: infoUser._id,
                fullName: infoUser.fullName,
                email: infoUser.email,
                token: infoUser.token
            };
        })
    }
};
