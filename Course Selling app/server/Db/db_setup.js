
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username : String,
  password : String,
  purchasedCourses :[{type:mongoose.Schema.Types.ObjectId, ref: 'Course'}]
})

const adminSchema = new mongoose.Schema({
  username: String,
  passowrd: String,
  })

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageLink: String, 
  price: Number,
  published: Boolean
});

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);


// mongoose.connect(, {dbName:"Couse"});

module.exports = {User, Admin,Course};

