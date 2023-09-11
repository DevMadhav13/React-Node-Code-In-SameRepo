"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const admin_1 = __importDefault(require("./routes/admin"));
const user_1 = __importDefault(require("./routes/user"));
const cors_1 = __importDefault(require("cors"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/admin", admin_1.default);
app.use("/users", user_1.default);
mongoose_1.default.connect("mongodb+srv://madhavkulkarni1305:rw6s4eysY2CKG9lB@cluster0.7mbyfvf.mongodb.net/", { dbName: "TScoursesAppData" })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
