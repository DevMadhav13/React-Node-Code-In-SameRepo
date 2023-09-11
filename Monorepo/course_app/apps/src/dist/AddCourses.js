"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const Card_1 = __importDefault(require("@mui/material/Card"));
const react_1 = require("react");
const react_2 = __importDefault(require("react"));
function AddCourses() {
    const [title, settitle] = (0, react_1.useState)("");
    const [description, setdescription] = (0, react_1.useState)("");
    const [image, setImage] = (0, react_1.useState)("");
    return react_2.default.createElement("div", { style: { display: 'flex', justifyContent: 'center', } },
        react_2.default.createElement(Card_1.default, { style: { width: 400, padding: 20, margin: 100 } },
            react_2.default.createElement("div", null,
                react_2.default.createElement("h1", { style: { display: 'flex', justifyContent: 'center', padding: 10 } }, "Add course here, put down details")),
            react_2.default.createElement("div", null,
                react_2.default.createElement(TextField_1.default, { id: "outlined-basic", label: "Title", variant: "outlined", fullWidth: true, onChange: (e) => {
                        settitle(e.target.value);
                    } }),
                react_2.default.createElement("br", null),
                react_2.default.createElement("br", null),
                react_2.default.createElement(TextField_1.default, { id: "outlined-basic", label: "Discription", fullWidth: true, onChange: (e) => {
                        setdescription(e.target.value);
                    } }),
                react_2.default.createElement("br", null),
                react_2.default.createElement("br", null),
                react_2.default.createElement(TextField_1.default, { id: "outlined-basic", label: "Image link", fullWidth: true, onChange: (e) => {
                        setImage(e.target.value);
                    } }),
                react_2.default.createElement("br", null),
                react_2.default.createElement("br", null),
                react_2.default.createElement(Button_1.default, { variant: "contained", onClick: () => {
                        console.log('Before fetch');
                        fetch("http://localhost:3000/admin/addcourse", {
                            method: "POST",
                            body: JSON.stringify({
                                title: title,
                                description: description,
                                imageLink: image,
                                price: 100,
                                published: true,
                            }),
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
                            console.log(data);
                            alert(data.message);
                        });
                    } }, "Add course"))));
}
exports.default = AddCourses;
