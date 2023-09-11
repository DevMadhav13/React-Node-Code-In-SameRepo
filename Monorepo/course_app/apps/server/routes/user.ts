import express from 'express';
import jwt from 'jsonwebtoken';
import { Course, User } from "../Db/db_setup";
const router= express.Router();
import {authenticateJwtUser} from "../autentication/user_auth";
const secrate2 ="N0rmAlS3crAt3"
import { USercredValidation ,usernameValidation,PasswordValidation } from 'ui'; 

router.get('/me',authenticateJwtUser,async(req, res) => {
  const ReqAdmin = req.headers["User_Username"]
  const user = await User.findOne({username: ReqAdmin})
  if (user){
  res.status(200).json(ReqAdmin)
  } else {
  res.status(404).json({ message: "user not found" });
}

});

// User routes 
router.post('/signup', async(req, res) => {
  const newuser = USercredValidation.safeParse(req.body);
  if (!newuser.success){
    return res.status(411).json(newuser.error)
  }
  console.log("new user ");
  console.log(newuser)
  const username = newuser.data.username;
  console.log("username of new user "+ username)
  const existingUser = await User.findOne({username})
  console.log("esisting user "+ existingUser)
  console.log("from /signup route after admin.find")
    if (existingUser){
      res.status(300).json({message:" user alrady exist"})
    }else{
      const NewUser = new User(newuser.data);
      NewUser.save()
      console.log(NewUser)
      const tokan = jwt.sign({username, role: "user"},secrate2,{expiresIn: '1h'})
      res.status(200).json({message:" user Created succesfullly",tokan: tokan})
    }
    // logic to sign up user
  });
  
  router.post('/login', async(req, res) => {
    const usernamev =usernameValidation.safeParse(req.headers.username);
    const passwordv =PasswordValidation.safeParse(req.headers.password);
    console.log(usernamev)
    console.log(passwordv)
    if (!usernamev.success && !passwordv.success){
      return res.status(411).json(usernamev.error|| passwordv.error)
    }
    if (usernamev.success&& passwordv.success){
      const username = usernamev.data;
      const password = passwordv.data
      var usercred = {username , password}
      console.log("users creda sre")
      console.log(usercred)
      const existingUser = await User.findOne(usercred);
      console.log(existingUser)
    
    if(existingUser){
      const username = existingUser.username
      console.log(username)
      const tokan = jwt.sign({username, role:"user"},secrate2,{expiresIn: '1h'})
      res.status(200).json({message:" user logedin succesfullly",tokan: tokan})
    }else{
      res.status(300).json({message:" user Doesnot exist"})
    }}
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
    const ReqUser = req.headers["User_Username"]
    console.log("courseId is ")
    console.log(courseId)
    const course = await Course.findById(courseId);
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
    const Requser = req.headers["User_Username"]
    if(Requser ){
      const user = await User.findOne({username:Requser}).populate('purchasedCourses');
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