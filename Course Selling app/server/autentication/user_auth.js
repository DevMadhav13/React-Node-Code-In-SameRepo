const jwt = require('jsonwebtoken');

const secrate2 ="N0rmAlS3crAt3"

const authenticateJwtUser = (req,res,next)=>{
    var authheader = req.headers.authorization;
    console.log(authheader)
    if (authheader){
      var AuthTokan = authheader.split(" ")[1];
      console.log("Tokan split done")
      jwt.verify (AuthTokan,secrate2,async (err,user)=>{
        if(err){
          console.log("error orror eooro")
          return res.status(403);
        }      
        console.log("Req.user executing")
          req.user = user;
          next();          
     })
    }
    res.status(403);
  }
  module.exports = authenticateJwtUser