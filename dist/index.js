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
const express_1 = __importDefault(require("express"));
const model_1 = require("./model");
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMiddlewear_1 = require("./userMiddlewear");
const cors_1 = __importDefault(require("cors"));
const utils_1 = require("./utils");
const JWT_SECRET_KEY = 'GRGREGREGRG';
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default.connect('mongodb+srv://thakunipawan:mongodb@cluster0.f7a9c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
app.post('/api/v1/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    yield model_1.userModel.create({
        username: username,
        email: email,
        password: password
    });
    res.json({
        message: "User is created"
    });
}));
app.post('/api/v1/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield model_1.userModel.find({
            email: email,
            password: password
        });
        if (!existingUser) {
            res.json({
                message: "wrong credentials"
            });
        }
        const token = jsonwebtoken_1.default.sign({
            //@ts-ignore
            userId: existingUser._id
        }, JWT_SECRET_KEY);
        res.json({
            token: token
        });
    }
    catch (e) {
        res.json({
            message: "wrong"
        });
    }
}));
app.post('/api/v1/content', userMiddlewear_1.userMiddlewear, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, link } = req.body;
    try {
        yield model_1.contentModel.create({
            title,
            link,
            //@ts-ignore
            userId: req.userId,
            tags: []
        });
        res.json({
            message: "content has been created"
        });
    }
    catch (e) {
        res.json({
            message: "error occured"
        });
    }
}));
app.get('/api/v1/allcontent', userMiddlewear_1.userMiddlewear, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    try {
        const content = yield model_1.contentModel.find({
            userId: userId
        }).populate("userId", "username");
        res.json({
            content
        });
    }
    catch (err) {
        res.json({
            message: "user not authenticate"
        });
    }
}));
app.delete('/api/v1/content', userMiddlewear_1.userMiddlewear, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const contentId = req.body.contentId;
    yield model_1.contentModel.deleteOne({
        userId: userId,
        contentId
    });
    res.json({
        message: "content has been deleted succesfully"
    });
}));
//this endpoint which user will send to the world ,this is just a hash url
app.post('/api/v1/brain/share', userMiddlewear_1.userMiddlewear, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        yield model_1.linkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: (0, utils_1.Random)(10)
        });
    }
    else {
        yield model_1.linkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
    }
    res.json({
        message: "share updated"
    });
}));
//this end point another user will get and after clicking on this link or hash or url that user can get all the data related to that particular hash in oue case that would be content details
// app.get('/',async (req,res)=>{
//     const hash=req.params
//    const content= await linkModel.find({})
//    res.json({
//     content
//    })
// })
app.listen(4001);
