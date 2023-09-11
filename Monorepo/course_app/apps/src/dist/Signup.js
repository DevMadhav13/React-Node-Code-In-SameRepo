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
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const Card_1 = __importDefault(require("@mui/material/Card"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
const react_2 = __importDefault(require("react"));
function Signup() {
    const [email, setEmail] = (0, react_1.useState)("");
    const [passowrd, setPassword] = (0, react_1.useState)("");
    const navigate = (0, react_router_dom_1.useNavigate)();
    return react_2.default.createElement("div", { style: { display: 'flex', justifyContent: 'center', } },
        react_2.default.createElement(Card_1.default, { style: { width: 400, padding: 20, margin: 100 } },
            react_2.default.createElement("div", null,
                react_2.default.createElement("h1", { style: { display: 'flex', justifyContent: 'center', padding: 10 } }, "Welcome to Signup page")),
            react_2.default.createElement("div", null,
                react_2.default.createElement(TextField_1.default, { id: "outlined-basic", label: "Email", variant: "outlined", fullWidth: true, onChange: (e) => {
                        setEmail(e.target.value);
                    } }),
                react_2.default.createElement("br", null),
                react_2.default.createElement("br", null),
                react_2.default.createElement(TextField_1.default, { id: "outlined-password-input", label: "Password", type: "password", fullWidth: true, onChange: (e) => {
                        setPassword(e.target.value);
                    } }),
                react_2.default.createElement("br", null),
                react_2.default.createElement("br", null),
                react_2.default.createElement(Button_1.default, { variant: "contained", onClick: () => __awaiter(this, void 0, void 0, function* () {
                        console.log('Before fetch');
                        const responce = yield axios_1.default.post("http://localhost:3000/admin/signup", {
                            username: email,
                            passowrd: passowrd,
                        });
                        const data = responce.data;
                        let jsondata = JSON.stringify(data.message);
                        alert(jsondata);
                        console.log(data);
                        if (data.tokan) {
                            localStorage.setItem("tokan", data.tokan);
                            navigate("/Signin");
                        }
                    }) }, "Signup"))));
}
exports.default = Signup;
