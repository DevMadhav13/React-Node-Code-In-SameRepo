
import { NextFunction , Response, Request } from 'express';
import jwt from 'jsonwebtoken';

const secretKey ="N0rmAlS3crAt3"
declare module 'express-serve-static-core' {
  interface Request {
      jwtPayload?: any;
  }
}


export const authenticateJwtUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
      
  if (authHeader) {
      const authToken = authHeader.split(" ")[1];

      jwt.verify(authToken, secretKey, (err, jwtPayload) => {
          if (err || typeof jwtPayload !== "object") {
              return res.status(403).json({ error: "Unauthorized" });
          }
          try {
              req.jwtPayload = jwtPayload;
              next();
          } catch (error) {
              return res.status(403).json({ error: "Unauthorized" });
          }
      });
  } else {
      return res.status(401).json({ error: "Missing authorization header" });
  }
};