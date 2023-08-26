import { Button, Card, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { RecoilRoot,atom,selector,useRecoilState,useRecoilValue,useSetRecoilState,useRecoilValueLoadable,} from 'recoil';

function Course (){    
    const courseID = useParams()    
    const courseId = courseID.courseId
    // const setCourse = useSetRecoilState(CourseState);
    const [course, setCourse] = useRecoilState(CourseState);
    console.log("Course function remdered")
    
    useEffect(()=>{        
        axios.get("http://localhost:3000/admin/course/"+courseId, 
            {                                  
            headers: {
                "Content-type": "application/json",
                "Authorization": "Barer " + localStorage.getItem("tokan") 
            },
            }).then(res => {
                setCourse(res.data) 
                // console.log(res.data) 

            })              
        }, []);
        if (!course){
            return<div>loading </div>
        }             
           
        return<div style={{display: 'flex', flexWrap: 'wrap' }}>

            <Grid container spacing={2}>
                    <Grid item xs={6}>
                    <UpdateCard course={course} setCourse={setCourse} />
                    </Grid>
                    <Grid item xs={6}>
                    <Existingcard  courseId={courseId}/>
                    </Grid>
                   
                </Grid>
            
            
            
            
            
            
        </div>
}



function UpdateCard({course, setCourse}){    
    
    const courseID = useParams()    
    const courseId = courseID.courseId
               
    const [title, setTitle] = useState(course.title);
    const [description, setDescription] = useState(course.description);
    const [image, setImage] = useState(course.imageLink);
    const [price, setPrice] = useState(course.price);
    // console.log(title)

    return <div style={{display: 'flex', justifyContent: 'center', }}>  
    
            <Card style={{width: 400, padding : 20, margin:100}}>
                <div >                 
                    <h1 style={{display: 'flex', justifyContent: 'center', padding: 10}}>
                        Update your course details</h1>
                </div>
                <div>
                <TextField 
                    defaultValue={title}
                    onChange={(e)=>{
                        setTitle(e.target.value) 
                    }} 
                    label="Title"
                    variant="outlined" 
                    fullWidth={true}                 
                     />
                <br/><br/>        
                <TextField  
                    value={description}
                    onChange={(e)=>{
                        setDescription(e.target.value);
                    }}
                    label="Discription" 
                    variant="outlined"  
                    fullWidth 
                />
                <br/><br/>        
                <TextField 
                    value={image}
                    onChange={(e)=>{
                        setImage(e.target.value);
                        }}
                    label="Image link" 
                    variant="outlined"  
                    fullWidth 
                />               
              
                <br/><br/>
                <TextField
                    value={price}
                    onChange={(e)=>{
                    setPrice(e.target.value);
                    }}
                    label="Price" 
                    variant="outlined"  
                    fullWidth 
                />
                              
                <br/><br/>
                <Button 
                    variant="contained"
                    onClick={()=>{
                        // console.log('Before fetch');
                        
                    fetch("http://localhost:3000/admin/courses/"+ courseId, {
                        method: "PUT",                            
                        body: JSON.stringify({
                            title : title,
                            description: description,
                            imageLink: image,
                            price : price,
                            published :true,
                        }),
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("tokan") 
                        },
                        })                            
                        .then((res) => {
                            // console.log('After Fetch');
                            return res.json()
                        }).then((data)=>{
                            // console.log('Inside res2');
                            let Updatecourse = { title: title,
                                description: description,
                                imageLink: image,
                                price : price,
                                published: true };                                          
                                        
                            // console.log(Updatecourse)                  
                            setCourse(Updatecourse)
                        })
                    }}
                    >Update course</Button>
                </div>        
            </Card>
        </div>
        }

        

function Existingcard(props){
    // console.log("Hi from existingCourse")   
    // const course = useRecoilState(CourseState)
    const [course] = useRecoilState(CourseState);
    // console.log(course.title)
    // const courseId = props.courseId
    // console.log(course)
    
return <div style={{display: 'flex', justifyContent: 'center', }}>
            
                <Card style={{width: 400, padding : 20, margin:100}}>
                <div style={{display: 'flex', justifyContent: 'center', padding: 10}}>
                    <Typography variant="h6"> Expsting course is</Typography>
                </div>
                    <div >                    

                        <img src={course.imageLink}style={{width:100}}></img>
                        <Typography>{course.title}</Typography>
                        <Typography>{course.description}</Typography>
                        <Typography>RS {course.price}</Typography>
                    </div>
                </Card>
                

            </div>
}



export default Course;

const CourseState = atom({
    key: 'CourseState', // unique ID (with respect to other atoms/selectors)
    default: {}, // default value (aka initial value)
  });