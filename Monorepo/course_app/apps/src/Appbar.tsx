import { Button, Typography } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Appbar(){
    const navigate = useNavigate();
    const [useremail ,setUseremail] = useState();
    
    useEffect(()=>{
        console.log("Before fetch")
         fetch("http://localhost:3000/admin/me",{
            method:"GET",
            headers :{
                "Authorization": "Barer " + localStorage.getItem("tokan")
            } 
        }).then((res)=>{
            console.log("in res fetch")
            console.log(res)
            return res.json()
        }).then((data)=>{
            // console.log(data)
            setUseremail(data)
        })        
    
    },[])

if (useremail){
return <div style={{display:"flex",justifyContent: "space-between"}}>
    
        <div  style={{margin:10, marginLeft:10}} >
            <Typography variant="h4">Coursera</Typography>
        </div>
        <div style={{display:"flex",justifyContent: "space-between"}} >
            <div>
            <Typography variant="h4">{useremail}</Typography>
            </div>

            {/* <Button 
            variant="contained"
            style={{margin:10, marginLeft:10}}
            onClick ={()=>
            {
                navigate("/Course/:courseId")
            }}
                 >Edit specific course</Button> */}
            <Button 
            variant="contained"
            style={{margin:10, marginLeft:10}}
            onClick ={()=>
            {
                navigate("/AllCourses")
            }}
                 >All course</Button>
            <Button 
            variant="contained"
            style={{margin:10, marginLeft:10}}
            onClick ={()=>
            {
                navigate("/AddCourses")
            }}
                 >Add course</Button>
            <span>
            <Button 
                variant="contained"
                style={{margin:10, marginLeft:10}}
                onClick ={()=>
                {
                    localStorage.setItem("tokan" ," ")
                    window.location.href = ("/Signin")
                }}
            >Log out </Button>
            </span>
        </div>
        </div>
    }
    
   return <div style={{display:"flex",justifyContent: "space-between"}}>
    <div  style={{margin:10, marginLeft:10}} >
        <Typography variant="h4">Coursera</Typography>
    </div>
    <div >
        <Button
            variant="contained" 
            style={{margin:10, marginLeft:10}}
            onClick ={()=>
            {
                navigate("/Signup")
            }
            }>Signup</Button>
        <Button 
            variant="contained"
            style={{margin:10, marginLeft:10}}
            onClick ={()=>
            {
                navigate("/Signin")
            }}
         >Sign-In</Button>
        </div>
    </div>
}

export default Appbar;