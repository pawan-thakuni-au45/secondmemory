"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contentShema = new mongoose_1.default.Schema({
    title: 'string',
    description: 'string',
    contentId: mongoose_1.default.Types.ObjectId,
    userId: mongoose_1.default.Types.ObjectId
});
exports.contentModel = mongoose_1.default.model('Content', contentShema);
