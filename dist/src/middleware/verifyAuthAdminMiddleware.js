"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthAdminMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthAdminMiddleware = (req, res, next) => {
    var _a;
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const { type } = req.user;
    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (type !== "adm") {
            return res.status(401).json({ message: "User is not an admin" });
        }
        next();
    });
};
exports.verifyAuthAdminMiddleware = verifyAuthAdminMiddleware;