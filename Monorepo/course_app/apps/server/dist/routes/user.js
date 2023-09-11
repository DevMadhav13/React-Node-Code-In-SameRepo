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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_setup_1 = require("../Db/db_setup");
const router = express_1.default.Router();
const user_auth_1 = require("../autentication/user_auth");
const secrate2 = "N0rmAlS3crAt3";
const zod_1 = require("zod");
let USercredValidation = zod_1.z.object({
    username: zod_1.z.string().min(1).max(30),
    password: zod_1.z.string().min(3).max(30)
});
let usernameValidation = zod_1.z.string().min(1).max(30);
let PasswordValidation = zod_1.z.string().min(1).max(30);
router.get('/me', user_auth_1.authenticateJwtUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ReqAdmin = req.headers["User_Username"];
    const user = yield db_setup_1.User.findOne({ username: ReqAdmin });
    if (user) {
        res.status(200).json(ReqAdmin);
    }
    else {
        res.status(404).json({ message: "user not found" });
    }
}));
// User routes 
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newuser = USercredValidation.safeParse(req.body);
    if (!newuser.success) {
        return res.status(411).json(newuser.error);
    }
    console.log("new user ");
    console.log(newuser);
    const username = newuser.data.username;
    console.log("username of new user " + username);
    const existingUser = yield db_setup_1.User.findOne({ username });
    console.log("esisting user " + existingUser);
    console.log("from /signup route after admin.find");
    if (existingUser) {
        res.status(300).json({ message: " user alrady exist" });
    }
    else {
        const NewUser = new db_setup_1.User(newuser.data);
        NewUser.save();
        console.log(NewUser);
        const tokan = jsonwebtoken_1.default.sign({ username, role: "user" }, secrate2, { expiresIn: '1h' });
        res.status(200).json({ message: " user Created succesfullly", tokan: tokan });
    }
    // logic to sign up user
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usernamev = usernameValidation.safeParse(req.headers.username);
    const passwordv = PasswordValidation.safeParse(req.headers.password);
    console.log(usernamev);
    console.log(passwordv);
    if (!usernamev.success && !passwordv.success) {
        return res.status(411).json(usernamev.error || passwordv.error);
    }
    if (usernamev.success && passwordv.success) {
        const username = usernamev.data;
        const password = passwordv.data;
        var usercred = { username, password };
        console.log("users creda sre");
        console.log(usercred);
        const existingUser = yield db_setup_1.User.findOne(usercred);
        console.log(existingUser);
        if (existingUser) {
            const username = existingUser.username;
            console.log(username);
            const tokan = jsonwebtoken_1.default.sign({ username, role: "user" }, secrate2, { expiresIn: '1h' });
            res.status(200).json({ message: " user logedin succesfullly", tokan: tokan });
        }
        else {
            res.status(300).json({ message: " user Doesnot exist" });
        }
    }
    // logic to log in user
}));
router.get('/courses', user_auth_1.authenticateJwtUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const publishedc = yield db_setup_1.Course.find({ published: true });
    // console.log(publishedc)
    if (publishedc) {
        res.status(200).json({ message: " Publishd courses are", publishe: publishedc });
    }
    else {
        res.json({ message: " mo published course found" });
    }
    // logic to list all courses
}));
router.post('/courses/:courseId', user_auth_1.authenticateJwtUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    const ReqUser = req.headers["User_Username"];
    console.log("courseId is ");
    console.log(courseId);
    const course = yield db_setup_1.Course.findById(courseId);
    if (course) {
        const username = ReqUser;
        const user = yield db_setup_1.User.findOne({ username });
        if (user) {
            user.purchasedCourses.push(course._id);
            yield user.save();
            res.json({ message: " course purchased" });
        }
        else {
            res.json({ message: " no such user exist" });
        }
    }
    else {
        res.json({ message: " no such course exist" });
    }
    // logic to purchase a course
}));
router.get('/purchasedCourses', user_auth_1.authenticateJwtUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside get");
    const Requser = req.headers["User_Username"];
    if (Requser) {
        const user = yield db_setup_1.User.findOne({ username: Requser }).populate('purchasedCourses');
        // console.log({User: user})
        if (user) {
            res.json({ message: " purcaes courses are ", purchasedCourses: user.purchasedCourses });
        }
        else {
            res.json({ message: " User not found " });
        }
    }
    // logic to view purchased courses
}));
exports.default = router;
