"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwtUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = "N0rmAlS3crAt3";
const authenticateJwtUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Auth headrer from Middleware" + authHeader);
    if (authHeader) {
        var authToken = authHeader.split(" ")[1];
        if (authToken) {
            jsonwebtoken_1.default.verify(authToken, secretKey, (err, user) => {
                if (err || !user || typeof (user) !== "object") {
                    return res.status(403).json({ error: "Unauthorized" });
                }
                try {
                    req.headers["User_Username"] = user.username;
                    req.headers["UserRole"] = user.role;
                    console.log("Our user at end of middleware is ");
                    console.log(user);
                    next();
                }
                catch (error) {
                    return res.status(403).json({ error: "Catched errorr from Middleware" });
                }
            });
        }
        else {
            return res.status(401).json({ error: "Missing authorization tokan" });
        }
    }
    else {
        return res.status(401).json({ error: "Missing authorization header" });
    }
};
exports.authenticateJwtUser = authenticateJwtUser;
