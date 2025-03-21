"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = require("../model");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/content', (req, res) => {
    const { title, description } = req.body;
    const content = model_1.contentModel.create({
        title: title,
        discription: description
    });
    return res.json({
        content,
        message: "content is created "
    });
});
app.listen(4000);
