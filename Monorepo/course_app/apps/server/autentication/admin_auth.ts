import { NextFunction, Response,Request } from 'express';
import jwt from 'jsonwebtoken';
const secrate1 ="SperS3cRat3"

export const authenticateJwtAdmin = (req:Request, res:Response, next:NextFunction)=> {
  const authheader = req.headers.authorization;  
  console.log("Auth headrer from Middleware" + authheader)
  if (authheader){
    var AuthTokan = authheader.split(" ")[1];  
    console.log("auth tokan fromMiddleware "+AuthTokan)  
    jwt.verify(AuthTokan,secrate1,async(err , admin)=>{
      if(err || !admin || typeof(admin)!=="object"){
        return res.status(403).json({ error: "Unauthorized" });
      }
      req.headers["adminUsername"] = admin.username;
      req.headers["adminrole"] = admin.role;
      console.log("Our admin at end of middleware is ")
            console.log(admin)
           
      next();     
      }      
    )  
  } 
  else {
    return res.status(401).json({ error: "Missing authorization header" });
  
  }
  
} 