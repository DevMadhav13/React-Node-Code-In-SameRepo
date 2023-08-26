import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Signin(){
    const [email,setEmail] = useState();
    const [passowrd,setPassword] = useState();
    
    return <div style={{display: 'flex', justifyContent: 'center', }}>  
            
            <Card style={{width: 400, padding : 20, margin:100}}>
                <div >
                    <h1 style={{display: 'flex', justifyContent: 'center', padding: 10}}>Welcome Back , Signin below</h1>
                </div>
                <div>
                <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }} />
                <br/><br/>        
                <TextField id="outlined-password-input" label="Password"  type="password" fullWidth 
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }} />
                <br/><br/>
                <Button variant="contained" 
                    onClick={async()=>{
                        console.log('Before fetch');                   
                        const responce = await axios.post("http://localhost:3000/admin/login",{},
                        {headers :{
                                "username": email,
                                "passowrd": passowrd
                            }})
                            const data = responce.data
                                localStorage.setItem("tokan", data.tokan)
                                console.log(data);
                                let jsondata = JSON.stringify(data.message)
                                alert(jsondata)
                                if (jsondata){
                                    window.location.href= '/AllCourses'; 
                                }
                          
                           
                }}
                                        
                >Signin Now</Button>
                </div>        
            </Card>


    </div>
}

export default Signin;