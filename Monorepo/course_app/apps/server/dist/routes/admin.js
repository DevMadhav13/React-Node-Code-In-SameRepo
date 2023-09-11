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
const admin_auth_1 = require("../autentication/admin_auth");
const secrate1 = "SperS3cRat3";
const zod_1 = require("zod");
let AdmincredValidation = zod_1.z.object({
    username: zod_1.z.string().min(1).max(30),
    password: zod_1.z.string().min(3).max(30)
});
let usernameValidation = zod_1.z.string().min(1).max(30);
let PasswordValidation = zod_1.z.string().min(1).max(30);
let CourseValidation = zod_1.z.object({
    title: zod_1.z.string().min(1).max(30),
    description: zod_1.z.string().min(1).max(300),
    imageLink: zod_1.z.string().min(1),
    price: zod_1.z.number().min(1)
});
// Admin routes
router.get('/me', admin_auth_1.authenticateJwtAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ReqAdmin = req.headers["adminUsername"];
    const admin = yield db_setup_1.Admin.findOne({ username: ReqAdmin });
    if (admin) {
        res.status(200).json(ReqAdmin);
    }
    else {
        res.status(404).json({ message: "Admin not found" });
    }
}));
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newadmin = AdmincredValidation.safeParse(req.body);
    if (!newadmin.success) {
        return res.status(411).json(newadmin.error);
    }
    const username = newadmin.data.username;
    const existingAdmin = yield db_setup_1.Admin.findOne({ username });
    console.log(existingAdmin);
    console.log("from /signup route after admin.find");
    if (existingAdmin) {
        res.status(200).json({ message: "Admin alreadyeixst" });
    }
    else {
        const updateAdmin = new db_setup_1.Admin(newadmin);
        updateAdmin.save();
        const tokan = jsonwebtoken_1.default.sign({ username: username, role: "admin" }, secrate1, { expiresIn: '1h' });
        res.status(200).json({ message: "Admin creat dsuccesfully ", tokan: tokan });
    }
    // logic to sign up admin
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usernamev = usernameValidation.safeParse(req.headers.username);
    const passowrdv = PasswordValidation.safeParse(req.headers.password);
    console.log(usernamev);
    console.log(passowrdv);
    if (!usernamev.success && !passowrdv.success) {
        return res.status(411).json(usernamev.error || passowrdv.error);
    }
    if (usernamev.success && passowrdv.success) {
        const username = usernamev.data;
        const passowrd = passowrdv.data;
        const existingAdmin = yield db_setup_1.Admin.findOne({ username, passowrd });
        console.log(existingAdmin);
        if (existingAdmin) {
            const username = existingAdmin.username;
            console.log(username);
            const tokan = jsonwebtoken_1.default.sign({ username, role: "admin" }, secrate1, { expiresIn: '1h' });
            res.status(200).json({ message: "Admin login succesful", tokan: tokan });
        }
        else {
            res.status(200).json({ message: "Admin doesnot exist" });
        }
    }
    // logic to log in admin
}));
router.post('/addcourse', admin_auth_1.authenticateJwtAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedRes = CourseValidation.safeParse(req.body);
    if (!parsedRes.success) {
        return res.status(300).json(parsedRes.error);
    }
    try {
        const course = new db_setup_1.Course(req.body);
        yield course.save();
        res.status(200).json({ message: "Course created successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
    // logic to create a course
}));
router.get('/course/:courseId', admin_auth_1.authenticateJwtAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    const course = yield db_setup_1.Course.findById(courseId);
    if (course) {
        res.status(200).json(course);
    }
    else {
        res.status(205).json({ message: "course not found" });
    }
    // logic to create a course
}));
router.put('/courses/:courseId', admin_auth_1.authenticateJwtAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validate = CourseValidation.safeParse(req.body);
    if (!validate.success) {
        return res.status(300).json(validate.error);
    }
    try {
        const course = yield db_setup_1.Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
        if (course) {
            res.status(200).json({ message: " Course updated dsuccesfully" });
        }
        else {
            res.status(300).json({ message: " Course Not found" });
        }
    }
    catch (_a) {
        res.json("Bad Issue happened");
    }
    // logic to edit a course
}));
router.get('/courses', admin_auth_1.authenticateJwtAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield db_setup_1.Course.find({});
    // console.log("found couses are ")
    // console.log(courses)
    res.status(200).json({ courses });
    // logic to get all courses
}));
exports.default = router;
