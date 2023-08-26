const jwt = require('jsonwebtoken');
const secrate1 ="SperS3cRat3"


const authenticateJwtAdmin = (req, res, next)=> {
  const authheader = req.headers.authorization;  
  if (authheader){
    var AuthTokan = authheader.split(" ")[1];  
    console.log(AuthTokan)  
    jwt.verify(AuthTokan,secrate1,async(err , admin)=>{
      if(err){
        return res.status(403)
      }
      req.admin = admin;
      console.log(admin)
      next();     
      }      
    )   
  }
  res.status(403)
}
module.exports = authenticateJwtAdmin;