const mongoose = require('mongoose');
const express = require('express');
const app = express();
const adminRoute = require("./routes/admin");
const userRoute = require("./routes/user")

const cors = require('cors'); 


app.use(express.json());
app.use(cors( ))
app.use("/admin",adminRoute)
app.use("/users",userRoute)

mongoose.connect("mongodb+srv://madhavkulkarni1305:rw6s4eysY2CKG9lB@cluster0.7mbyfvf.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
