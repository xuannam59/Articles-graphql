"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const articel_typeDefs_1 = require("./articel.typeDefs");
const category_typeDefs_1 = require("./category.typeDefs");
const user_typDefs_1 = require("./user.typDefs");
exports.typeDefs = [
    articel_typeDefs_1.typeDefsArticle,
    category_typeDefs_1.typeDefsCategory,
    user_typDefs_1.typeDefsUse
];
