import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useEffect, useState } from 'react';
import { CardActions, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";


function AllCourses(){
    const [courses ,setcourses] = useState([])
    useEffect(()=>{
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
                setcourses(data.courses)
            })    
        },[])

    return <div >  
        
        <div >
            <div  >                 
                <h1 style={{display: 'flex', justifyContent: 'center', padding: 10}}>Courses are as below</h1>
            </div>
            <div style={{display:'flex',justifyContent: "center", flexWrap: 'wrap'}}>                
                                
                {Object.keys(courses).map((key) => (
                    <Courses key={key} course={courses[key]} />
                ))}
                
            </div>        
        </div>


</div>
}
function Courses(props){
    const navigate = useNavigate();
    return<div >
    <Card style ={{margin:10, minHeight: 200}} >
        <Typography variant='subtitle1'>{props.course._id}</Typography>
        <Typography variant='h6'>{ props.course.title}</Typography>
        <Typography variant='subtitle1'>{props.course.description}</Typography>
        <img src={props.course.imageLink}style={{width:100}}></img>
        <CardActions>
        <Button size="small" color="primary" 
        onClick={()=>{
            navigate("/Course/"+props.course._id)
        }}>
          Update
        </Button>
      </CardActions>
           </Card>
    </div> 
}

export default AllCourses;