import express from 'express';
import jwt from 'jsonwebtoken';
import { Course, Admin } from "../Db/db_setup";
const router= express.Router();
import { authenticateJwtAdmin } from "../autentication/admin_auth";
const secrate1 ="SperS3cRat3"


// Admin routes
router.get('/me',authenticateJwtAdmin,async(req, res) => {
  // console.log("/me log hitted by madhav")
  const ReqAdmin = req.headers["adminUsername"]
  // console.log(ReqAdmin)
  const admin = await Admin.findOne({username: ReqAdmin})
  if (admin){
  res.status(200).json(ReqAdmin)
  // console.log("ReqAdmin sent from in me route is  ")
  // console.log(ReqAdmin)
  // console.log(admin)


} else {
  res.status(404).json({ message: "Admin not found" });
}

});

router.post('/signup', async (req, res) => {
    const newadmin = req.body;
    const username = req.body.username;
    console.log("from /signup route")
    console.log(username)
    console.log({username})

    const existingAdmin = await Admin.findOne({username})
    console.log(existingAdmin)
    console.log("from /signup route after admin.find")
    if (existingAdmin){      
      res.status(200).json({message: "Admin alreadyeixst"})
    }else{
        const updateAdmin = new Admin(newadmin)
        updateAdmin.save();
        const tokan = jwt.sign({username :username, role:"admin"}, secrate1,{expiresIn: '1h'});
        res.status(200).json({message: "Admin creat dsuccesfully ", tokan: tokan});
    }
    // logic to sign up admin
  });
  
  router.post('/login',async (req, res) => {
    const {username,passowrd}=req.headers;
    const existingAdmin = await Admin.findOne({username,passowrd});
    if(existingAdmin){
      const tokan = jwt.sign({username , role: "admin"},secrate1,{expiresIn : '1h'});
      res.status(200).json({message: "Admin login succesful", tokan:tokan})
    }else{
      res.status(200).json({message: "Admin doesnot exist"})
    }
    
    // logic to log in admin
  });
  
  
  router.post('/addcourse', authenticateJwtAdmin, async(req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.status(200).json({message:" Course create dsuccesfully"})
  
    // logic to create a course
  });

  router.get('/course/:courseId', authenticateJwtAdmin, async(req, res) => {
    const courseId = req.params.courseId
    // console.log(courseId); // Add this line
    const course = await Course.findById(courseId);
    
    // console.log('Retrieved course:', course); // Add this line
    // // console.log(courseId)
    // console.log(course)
    
    if (course){
    res.status(200).json(course)
    }else{
      res.status(205).json({message : "course not found"})
    }
     
    // logic to create a course
  });
  
  router.put('/courses/:courseId',authenticateJwtAdmin, async(req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId,req.body,{new : true})
    const cs = JSON.stringify(req.body)
    if(course){
      res.status(200).json({message:" Course updated dsuccesfully"})
    }else{
      res.status(300).json({message:" Course Not found"})
    }
    // logic to edit a course
  });
  
  router.get('/courses',authenticateJwtAdmin, async (req, res) => {
    const courses = await Course.find({});
    // console.log("found couses are ")
    // console.log(courses)
    res.status(200).json({courses})
    // logic to get all courses
  });
  

  export default router;