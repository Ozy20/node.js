const express = require('express');
const app = express();
const port = process.env.PORT || 3011;
const path = require("path");
const helmet = require('helmet');
const log = require("./middelwares/logging");
const coursesRoute = require("./routes/courses")
const userRoute = require("./routes/users")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(log);
app.use(helmet());
app.use("/courses",coursesRoute);
app.use("/users",userRoute);


app.listen(port,()=>{
    console.log(`hello ${port}`)
})