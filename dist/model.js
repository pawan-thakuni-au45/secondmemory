"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = exports.linkSchema = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: 'string',
    email: 'string',
    password: 'string'
});
exports.userModel = mongoose_1.default.model('User', userSchema);
const contentShema = new mongoose_1.default.Schema({
    title: 'string',
    link: 'string',
    tags: [{ type: mongoose_1.default.Types.ObjectId }],
    userId: { type: mongoose_1.default.Types.ObjectId }
});
exports.contentModel = mongoose_1.default.model('Content', contentShema);
exports.linkSchema = new mongoose_1.default.Schema({
    hash: 'string',
    userId: { type: mongoose_1.default.Types.ObjectId }
});
exports.linkModel = mongoose_1.default.model('Schema', exports.linkSchema);
