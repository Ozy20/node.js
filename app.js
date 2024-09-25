const express = require('express');
const app = express();
const port = process.env.PORT || 3011;
const path = require("path");
const helmet = require('helmet');
const log = require("./middelwares/logging");
const coursesRoute = require("./routes/courses")
const userRoute = require("./routes/users")
const authRouter = require("./routes/login")
const adminRouter = require("./routes/admin")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(log);
app.use(helmet());
app.use("/courses",coursesRoute);
app.use("/users",userRoute);
app.use("/login",authRouter)
app.use("/admin",adminRouter)
app.listen(port,()=>{
    console.log(`hello ${port}`)
})