import express from 'express';
import jwt from 'jsonwebtoken';
import { Course, Admin } from "../Db/db_setup";
const router= express.Router();
import { authenticateJwtAdmin } from "../autentication/admin_auth";
const secrate1 ="SperS3cRat3"

import { z } from 'zod'; 

let inputProps = z.object({
  username : z.string().min(1).max(30),
  password : z.string().min(3).max(30)
})

let usernameValidation = z.string().min(1).max(30)  
let PasswordValidation = z.string().min(1).max(30)  

let CourseValidation = z.object({
  title: z.string().min(1).max(30),
  description: z.string().min(1).max(300),
  imageLink : z.string().min(1),
  price : z.number().min(1)
})

// Admin routes
router.get('/me',authenticateJwtAdmin,async(req, res) => {
  const ReqAdmin = req.headers["adminUsername"]
  const admin = await Admin.findOne({username: ReqAdmin})
  if (admin){
  res.status(200).json(ReqAdmin)
  } else {
  res.status(404).json({ message: "Admin not found" });
}

});

router.post('/signup', async (req, res) => {
    const newadmin = inputProps.safeParse(req.body);
    if (!newadmin.success){
      return res.status(411).json(newadmin.error)
    }
    const username = newadmin.data.username;
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
    const usernamev =usernameValidation.safeParse(req.headers.username);
    const passowrdv =PasswordValidation.safeParse(req.headers.password);
    console.log(usernamev)
    console.log(passowrdv)
    if (!usernamev.success && !passowrdv.success){
      return res.status(411).json(usernamev.error|| passowrdv.error)
    }
    if (usernamev.success&& passowrdv.success){
      const username = usernamev.data;
      const passowrd = passowrdv.data
      const existingAdmin = await Admin.findOne({username, passowrd});
      console.log(existingAdmin)
    
    if(existingAdmin){
      const username = existingAdmin.username
      console.log(username)
      const tokan = jwt.sign({username , role: "admin"},secrate1,{expiresIn : '1h'});
      res.status(200).json({message: "Admin login succesful", tokan:tokan})
    }else{
      res.status(200).json({message: "Admin doesnot exist"})
    }
    }

    // logic to log in admin
  });
  
  
  router.post('/addcourse', authenticateJwtAdmin, async(req, res) => {
    const parsedRes = CourseValidation.safeParse(req.body)
    if(!parsedRes.success){
      return res.status(300).json(parsedRes.error)      
    }
    
    try {
      const course = new Course(req.body);
      await course.save();
      res.status(200).json({ message: "Course created successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
    // logic to create a course
  });

  router.get('/course/:courseId', authenticateJwtAdmin, async(req, res) => {
    const courseId : String = req.params.courseId    
    const course = await Course.findById(courseId);    
    if (course){
    res.status(200).json(course)
    }else{
      res.status(205).json({message : "course not found"})
    }
     
    // logic to create a course
  });
  
  router.put('/courses/:courseId',authenticateJwtAdmin, async(req, res) => {
    const validate = CourseValidation.safeParse(req.body);
    if(!validate.success){
      return res.status(300).json(validate.error)
    }
    try{
    const course = await Course.findByIdAndUpdate(req.params.courseId,req.body,{new : true})
    
    if(course){
      res.status(200).json({message:" Course updated dsuccesfully"})
    }else{
      res.status(300).json({message:" Course Not found"})
    }
  }catch{
    res.json("Bad Issue happened")
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