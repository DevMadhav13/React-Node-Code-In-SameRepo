import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useState } from 'react';
import React from 'react';


function AddCourses(){
    const [title, settitle] = useState<string>("");
    const [description , setdescription]=useState<string>("")
    const [image , setImage] = useState<string>("")
    
        return <div style={{display: 'flex', justifyContent: 'center', }}>  
            
            <Card style={{width: 400, padding : 20, margin:100}}>
                <div >                 
                    <h1 style={{display: 'flex', justifyContent: 'center', padding: 10}}>Add course here, put down details</h1>
                </div>
                <div>
                <TextField id="outlined-basic" label="Title" variant="outlined" fullWidth 
                        onChange={(e)=>{
                            settitle(e.target.value) 
                         }}  />
                <br/><br/>        
                <TextField id="outlined-basic"  label="Discription"  fullWidth
                         onChange={(e)=>{
                            setdescription(e.target.value);
                        }}/>
                         <br/><br/>        
                <TextField id="outlined-basic"  label="Image link"  fullWidth
                    onChange={(e)=>{
                    setImage(e.target.value);
                }}/>
                <br/><br/>
                <Button 
                    variant="contained"
                    onClick={()=>{
                        console.log('Before fetch');
                            fetch("http://localhost:3000/admin/addcourse", {
                                method: "POST",                            
                                body: JSON.stringify({
                                    title : title,
                                    description: description,
                                    imageLink: image,
                                    price : 100,
                                    published :true,

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
                                    alert(data.message)
                                })                            
                    }}
                    >Add course</Button>
                </div>        
            </Card>


    </div>
}

export default AddCourses;