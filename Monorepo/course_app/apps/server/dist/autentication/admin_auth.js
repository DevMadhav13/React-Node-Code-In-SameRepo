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
exports.authenticateJwtAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrate1 = "SperS3cRat3";
const authenticateJwtAdmin = (req, res, next) => {
    const authheader = req.headers.authorization;
    console.log("Auth headrer from Middleware" + authheader);
    if (authheader) {
        var AuthTokan = authheader.split(" ")[1];
        console.log("auth tokan fromMiddleware " + AuthTokan);
        jsonwebtoken_1.default.verify(AuthTokan, secrate1, (err, admin) => __awaiter(void 0, void 0, void 0, function* () {
            if (err || !admin || typeof (admin) !== "object") {
                return res.status(403).json({ error: "Unauthorized" });
            }
            req.headers["adminUsername"] = admin.username;
            req.headers["adminrole"] = admin.role;
            console.log("Our admin at end of middleware is ");
            console.log(admin);
            next();
        }));
    }
    else {
        return res.status(401).json({ error: "Missing authorization header" });
    }
};
exports.authenticateJwtAdmin = authenticateJwtAdmin;
