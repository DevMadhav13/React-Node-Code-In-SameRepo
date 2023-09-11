"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const recoil_1 = require("recoil");
const react_2 = __importDefault(require("react"));
function Course() {
    const { courseId } = (0, react_router_dom_1.useParams)();
    // const courseId = courseID.courseId
    // const setCourse = useSetRecoilState(CourseState);
    const [course, setCourse] = (0, recoil_1.useRecoilState)(CourseState);
    console.log("Course function remdered");
    (0, react_1.useEffect)(() => {
        axios_1.default.get("http://localhost:3000/admin/course/" + courseId, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Barer " + localStorage.getItem("tokan")
            },
        }).then(res => {
            setCourse(res.data);
            // console.log(res.data) 
        });
    }, []);
    if (!course) {
        return react_2.default.createElement("div", null, "loading ");
    }
    return react_2.default.createElement("div", { style: { display: 'flex', flexWrap: 'wrap' } },
        react_2.default.createElement(Grid_1.default, { container: true, spacing: 2 },
            react_2.default.createElement(Grid_1.default, { item: true, xs: 6 },
                react_2.default.createElement(UpdateCard, null)),
            react_2.default.createElement(Grid_1.default, { item: true, xs: 6 },
                react_2.default.createElement(Existingcard, null))));
}
function UpdateCard() {
    const [course, setCourse] = (0, recoil_1.useRecoilState)(CourseState);
    const { courseId } = (0, react_router_dom_1.useParams)();
    // const courseId = courseID.course
    const [title, setTitle] = (0, react_1.useState)(course.title);
    const [description, setDescription] = (0, react_1.useState)(course.description);
    const [image, setImage] = (0, react_1.useState)(course.imageLink);
    const [price, setPrice] = (0, react_1.useState)(course.price);
    // console.log(title)
    return react_2.default.createElement("div", { style: { display: 'flex', justifyContent: 'center', } },
        react_2.default.createElement(material_1.Card, { style: { width: 400, padding: 20, margin: 100 } },
            react_2.default.createElement("div", null,
                react_2.default.createElement("h1", { style: { display: 'flex', justifyContent: 'center', padding: 10 } }, "Update your course details")),
            react_2.default.createElement("div", null,
                react_2.default.createElement(material_1.TextField, { defaultValue: title, onChange: (e) => {
                        setTitle(e.target.value);
                    }, label: "Title", variant: "outlined", fullWidth: true }),
                react_2.default.createElement("br", null),
                react_2.default.createElement("br", null),
                react_2.default.createElement(material_1.TextField, { value: description, onChange: (e) => {
                        setDescription(e.target.value);
                    }, label: "Discription", variant: "outlined", fullWidth: true }),
                react_2.default.createElement("br", null),
                react_2.default.createElement("br", null),
                react_2.default.createElement(material_1.TextField, { value: image, onChange: (e) => {
                        setImage(e.target.value);
                    }, label: "Image link", variant: "outlined", fullWidth: true }),
                react_2.default.createElement("br", null),
                react_2.default.createElement("br", null),
                react_2.default.createElement(material_1.TextField, { value: price, onChange: (e) => {
                        setPrice(e.target.value);
                    }, label: "Price", variant: "outlined", fullWidth: true }),
                react_2.default.createElement("br", null),
                react_2.default.createElement("br", null),
                react_2.default.createElement(material_1.Button, { variant: "contained", onClick: () => {
                        // console.log('Before fetch');
                        fetch("http://localhost:3000/admin/courses/" + courseId, {
                            method: "PUT",
                            body: JSON.stringify({
                                title: title,
                                description: description,
                                imageLink: image,
                                price: price,
                                published: true,
                            }),
                            headers: {
                                "Content-type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem("tokan")
                            },
                        })
                            .then((res) => {
                            // console.log('After Fetch');
                            return res.json();
                        }).then((data) => {
                            let Updatecourse = { title: title,
                                description: description,
                                imageLink: image,
                                price: price,
                                published: true };
                            // console.log(Updatecourse)                  
                            setCourse(Updatecourse);
                        });
                    } }, "Update course"))));
}
function Existingcard() {
    // console.log("Hi from existingCourse")   
    // const course = useRecoilState(CourseState)
    const [course] = (0, recoil_1.useRecoilState)(CourseState);
    // console.log(course.title)
    // const courseId = props.courseId
    // console.log(course)
    return react_2.default.createElement("div", { style: { display: 'flex', justifyContent: 'center', } },
        react_2.default.createElement(material_1.Card, { style: { width: 400, padding: 20, margin: 100 } },
            react_2.default.createElement("div", { style: { display: 'flex', justifyContent: 'center', padding: 10 } },
                react_2.default.createElement(material_1.Typography, { variant: "h6" }, " Expsting course is")),
            react_2.default.createElement("div", null,
                react_2.default.createElement("img", { src: course.imageLink, style: { width: 100 } }),
                react_2.default.createElement(material_1.Typography, null, course.title),
                react_2.default.createElement(material_1.Typography, null, course.description),
                react_2.default.createElement(material_1.Typography, null,
                    "RS ",
                    course.price))));
}
exports.default = Course;
const CourseState = (0, recoil_1.atom)({
    key: 'CourseState',
    default: {
        title: '',
        description: '',
        imageLink: '',
        price: ''
    }
});
