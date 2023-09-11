"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const react_router_dom_1 = require("react-router-dom");
function Appbar() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [useremail, setUseremail] = (0, react_2.useState)();
    (0, react_2.useEffect)(() => {
        console.log("Before fetch");
        fetch("http://localhost:3000/admin/me", {
            method: "GET",
            headers: {
                "Authorization": "Barer " + localStorage.getItem("tokan")
            }
        }).then((res) => {
            console.log("in res fetch");
            console.log(res);
            return res.json();
        }).then((data) => {
            // console.log(data)
            setUseremail(data);
        });
    }, []);
    if (useremail) {
        return react_1.default.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
            react_1.default.createElement("div", { style: { margin: 10, marginLeft: 10 } },
                react_1.default.createElement(material_1.Typography, { variant: "h4" }, "Coursera")),
            react_1.default.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
                react_1.default.createElement("div", null,
                    react_1.default.createElement(material_1.Typography, { variant: "h4" }, useremail)),
                react_1.default.createElement(material_1.Button, { variant: "contained", style: { margin: 10, marginLeft: 10 }, onClick: () => {
                        navigate("/AllCourses");
                    } }, "All course"),
                react_1.default.createElement(material_1.Button, { variant: "contained", style: { margin: 10, marginLeft: 10 }, onClick: () => {
                        navigate("/AddCourses");
                    } }, "Add course"),
                react_1.default.createElement("span", null,
                    react_1.default.createElement(material_1.Button, { variant: "contained", style: { margin: 10, marginLeft: 10 }, onClick: () => {
                            localStorage.setItem("tokan", " ");
                            window.location.href = ("/Signin");
                        } }, "Log out "))));
    }
    return react_1.default.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
        react_1.default.createElement("div", { style: { margin: 10, marginLeft: 10 } },
            react_1.default.createElement(material_1.Typography, { variant: "h4" }, "Coursera")),
        react_1.default.createElement("div", null,
            react_1.default.createElement(material_1.Button, { variant: "contained", style: { margin: 10, marginLeft: 10 }, onClick: () => {
                    navigate("/Signup");
                } }, "Signup"),
            react_1.default.createElement(material_1.Button, { variant: "contained", style: { margin: 10, marginLeft: 10 }, onClick: () => {
                    navigate("/Signin");
                } }, "Sign-In")));
}
exports.default = Appbar;
