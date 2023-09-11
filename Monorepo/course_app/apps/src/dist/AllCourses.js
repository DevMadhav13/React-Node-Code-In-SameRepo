"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = __importDefault(require("@mui/material/Button"));
const Card_1 = __importDefault(require("@mui/material/Card"));
const react_1 = require("react");
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const react_2 = __importDefault(require("react"));
function AllCourses() {
    const [courses, setcourses] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        fetch("http://localhost:3000/admin/courses", {
            method: "GET",
            // body: JSON.stringify({                
            // }),
            headers: {
                "Content-type": "application/json",
                "Authorization": "Barer " + localStorage.getItem("tokan")
            },
        })
            .then((res) => {
            // console.log('Inside res1');
            return res.json();
        })
            .then((data) => {
            // console.log('Inside res2');
            setcourses(data.courses);
        });
    }, []);
    return react_2.default.createElement("div", null,
        react_2.default.createElement("div", null,
            react_2.default.createElement("div", null,
                react_2.default.createElement("h1", { style: { display: 'flex', justifyContent: 'center', padding: 10 } }, "Courses are as below")),
            react_2.default.createElement("div", { style: { display: 'flex', justifyContent: "center", flexWrap: 'wrap' } }, courses.map((course) => (react_2.default.createElement(Courses, { key: course._id, course: course }))))));
}
function Courses(props) {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return react_2.default.createElement("div", null,
        react_2.default.createElement(Card_1.default, { style: { margin: 10, minHeight: 200 } },
            react_2.default.createElement(material_1.Typography, { variant: 'subtitle1' }, props.course._id),
            react_2.default.createElement(material_1.Typography, { variant: 'h6' }, props.course.title),
            react_2.default.createElement(material_1.Typography, { variant: 'subtitle1' }, props.course.description),
            react_2.default.createElement("img", { src: props.course.imageLink, alt: props.course.title, style: { width: 100 } }),
            react_2.default.createElement(material_1.CardActions, null,
                react_2.default.createElement(Button_1.default, { size: "small", color: "primary", onClick: () => {
                        navigate("/Course/" + props.course._id);
                    } }, "Update"))));
}
exports.default = AllCourses;
