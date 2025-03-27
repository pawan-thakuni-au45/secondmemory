"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddlewear = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET_KEY = 'GRGREGREGRG';
const userMiddlewear = (req, res, next) => {
    const token = req.headers["authorization"];
    const decode = jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY);
    if (decode) {
        //@ts-ignore
        req.userId = decode.id;
        next();
    }
    else {
        res.json({
            message: "wrong credentials"
        });
    }
};
exports.userMiddlewear = userMiddlewear;
