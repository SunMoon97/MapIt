const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");
const cors = require("cors");

app.use(cors());
dotenv.config();

app.use(express.json());

mongoose 
 .connect(process.env.MONGO_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true 
 })   
 .then(() => console.log("MongoDB connected!"))
 .catch(err => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

app.listen(8801, () => {
  console.log("Backend server is running!");
});
