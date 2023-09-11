import { NextFunction , Response, Request } from 'express';
import jwt from 'jsonwebtoken';
const secretKey ="N0rmAlS3crAt3"

export const authenticateJwtUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log("Auth headrer from Middleware" + authHeader)
  if(authHeader){
  var authToken = authHeader.split(" ")[1];
  if (authToken) {     
      jwt.verify(authToken, secretKey, (err, user) => {
          if (err || !user || typeof(user) !== "object") {
              return res.status(403).json({ error: "Unauthorized" });
          }
          try {
            req.headers["User_Username"] = user.username;
            req.headers["UserRole"] = user.role;      
            console.log("Our user at end of middleware is ")
                  console.log(user)
                 
            next();
        } catch (error) {
              return res.status(403).json({ error: "Catched errorr from Middleware" });
          }
      });
  } else {
      return res.status(401).json({ error: "Missing authorization tokan" });
  }
}
else {
    return res.status(401).json({ error: "Missing authorization header" });
}

};