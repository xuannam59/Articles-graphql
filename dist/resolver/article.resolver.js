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
exports.resolversArticle = void 0;
const articles_model_1 = __importDefault(require("../model/articles.model"));
const category_model_1 = __importDefault(require("../model/category.model"));
exports.resolversArticle = {
    Query: {
        getlistArticle: (_, agrs) => __awaiter(void 0, void 0, void 0, function* () {
            const { sortKey, sortValue, currentPage, limitItem, filterKey, filterValue, keyword } = agrs;
            let find = {
                deleted: false
            };
            const sort = {};
            if (sortKey && sortValue) {
                sort[sortKey] = sortValue;
            }
            const skip = (currentPage - 1) * limitItem;
            if (filterKey && filterValue) {
                find[filterKey] = filterValue;
            }
            if (keyword) {
                const regexKey = new RegExp(keyword, "i");
                find["title"] = regexKey;
            }
            const articles = yield articles_model_1.default.find(find)
                .sort(sort)
                .skip(skip)
                .limit(limitItem);
            return articles;
        }),
        getArticle: (_, agrs) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = agrs;
            const article = yield articles_model_1.default.findOne({
                _id: id,
                deleted: false
            });
            return article;
        }),
    },
    Article: {
        category: (article) => __awaiter(void 0, void 0, void 0, function* () {
            const categoryId = article.categoryId;
            const category = yield category_model_1.default.findOne({
                _id: categoryId,
                deleted: false
            });
            return category;
        })
    },
    Mutation: {
        createArticle: (_, agrs) => __awaiter(void 0, void 0, void 0, function* () {
            const { article } = agrs;
            const record = new articles_model_1.default(article);
            yield record.save();
            return record;
        }),
        updateArticle: (_, agrs) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, article } = agrs;
            yield articles_model_1.default.updateOne({
                _id: id,
            }, article);
            const record = yield articles_model_1.default.findOne({
                _id: id
            });
            return record;
        }),
        deleteArticle: (_, agrs) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = agrs;
            yield articles_model_1.default.updateOne({
                _id: id
            }, {
                deleted: true,
                deletedAt: new Date()
            });
            return "Đã xoá";
        }),
    }
};
