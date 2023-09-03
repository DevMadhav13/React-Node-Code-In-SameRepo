import express from 'express';
import jwt from 'jsonwebtoken';
import { Course, User } from "../Db/db_setup";
const router= express.Router();

import {authenticateJwtUser} from "../autentication/user_auth";

const secrate2 ="N0rmAlS3crAt3"
// User routes 
router.post('/signup', async(req, res) => {
    console.log("inside Signup")
    const user = req.body;
    const username = user.username
    // console.log(username)
    const existingUser= await User.findOne({username});
    // console.log(existingUser)
    if (existingUser){
      res.status(300).json({message:" user alrady exist"})
    }else{
      const NewUser = new User(user);
      NewUser.save()
      const tokan = jwt.sign({username, role: "user"},secrate2,{expiresIn: '1h'})
      res.status(200).json({message:" user Created succesfullly",tokan: tokan})
    }
    // logic to sign up user
  });
  
  router.post('/login', async(req, res) => {
    const {username ,passowrd} = req.headers;
    const existingUser = await User.findOne({username,passowrd});
    if(existingUser){
      const tokan = jwt.sign({username, role:"user"},secrate2,{expiresIn: '1h'})
      res.status(200).json({message:" user logedin succesfullly",tokan: tokan})
    }else{
      res.status(300).json({message:" user Doesnot exist"})
    }
    // logic to log in user
  });
  
  router.get('/courses',authenticateJwtUser, async(req, res) => {
    const publishedc = await Course.find({published:true})
    // console.log(publishedc)
    if(publishedc){
      res.status(200).json({message:" Publishd courses are", publishe: publishedc});
    }else{
      res.json({message:" mo published course found"});
    }
    // logic to list all courses
  });
  
  router.post('/courses/:courseId',authenticateJwtUser, async (req, res) => {
    const courseId = req.params.courseId;
    const ReqUser = req.headers["user"]
    // console.log(courseId)
    const course = await Course.findById({courseId});
    if (course){
      const username = ReqUser;
      const user = await User.findOne({username});
      if (user){
        user.purchasedCourses.push(course._id);
        await user.save();
        res.json({message:" course purchased"});
      }else{
        res.json({message:" no such user exist"});  
      }
    }else{
      res.json({message:" no such course exist"});
    }
    // logic to purchase a course
  });
  
  router.get('/purchasedCourses', authenticateJwtUser, async(req, res) => {
    console.log("inside get")
    const ReqAdmin = req.jwtPayload
    if(ReqAdmin ){
      const user = await User.findOne({username: ReqAdmin.username}).populate('purchasedCourses');
    // console.log({User: user})
    if (user){
      res.json({message: " purcaes courses are ", purchasedCourses: user.purchasedCourses });
    }else{
      res.json({message: " User not found "});
    }
  
    
    }
    
    // logic to view purchased courses
  });
  
  export default router;