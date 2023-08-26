import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';



function Signup(){
    const [email,setEmail] = useState();
    const [passowrd,setPassword] = useState();
    const navigate = useNavigate();
    return <div style={{display: 'flex', justifyContent: 'center', }}>  
         
    
            <Card style={{width: 400, padding : 20, margin:100}}>
                <div >                 
                    <h1 style={{display: 'flex', justifyContent: 'center', padding: 10}}>Welcome to Signup page</h1>
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
                        }}/>
                <br/><br/>
                <Button 
                    variant="contained"
                    onClick={async ()=>{
                        console.log('Before fetch');
                        const responce = await axios.post("http://localhost:3000/admin/signup", {
                                username: email,
                                passowrd: passowrd,
                            })                        
                            const data = responce.data                                                      
                            localStorage.setItem("tokan", data.tokan)
                            console.log(data);
                            let jsondata = JSON.stringify(data.message)
                            alert(jsondata)
                            navigate("/Signin");
                        }}
                                
                    
                    >Signup</Button>
                </div>        
            </Card>


    </div>
}

export default Signup;