"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddCourses_1 = __importDefault(require("./AddCourses"));
const AllCourses_1 = __importDefault(require("./AllCourses"));
const Appbar_1 = __importDefault(require("./Appbar"));
const Signin_1 = __importDefault(require("./Signin"));
const Signup_1 = __importDefault(require("./Signup"));
const react_router_dom_1 = require("react-router-dom");
const Course_1 = __importDefault(require("./Course"));
const recoil_1 = require("recoil");
const react_1 = __importDefault(require("react"));
function App() {
    return (react_1.default.createElement("div", { style: { width: "100vw", height: "100vh", backgroundColor: '#eeeeee' } },
        react_1.default.createElement(recoil_1.RecoilRoot, null,
            react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(Appbar_1.default, null),
                react_1.default.createElement(react_router_dom_1.Routes, null,
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/Course/:courseId", element: react_1.default.createElement(Course_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/AllCourses", element: react_1.default.createElement(AllCourses_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/Signup", element: react_1.default.createElement(Signup_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/Signin", element: react_1.default.createElement(Signin_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/AddCourses", element: react_1.default.createElement(AddCourses_1.default, null) }))))));
}
exports.default = App;
