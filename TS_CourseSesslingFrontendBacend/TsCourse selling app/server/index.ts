import mongoose from 'mongoose';
import express from 'express';
const app = express();
import adminRoute from "./routes/admin";
import userRoute from "./routes/user";

import cors from 'cors'; 


app.use(express.json());
app.use(cors( ))
app.use("/admin",adminRoute)
app.use("/users",userRoute)

mongoose.connect("mongodb+srv://madhavkulkarni1305:rw6s4eysY2CKG9lB@cluster0.7mbyfvf.mongodb.net/", {dbName: "TScoursesAppData"})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
