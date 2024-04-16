const express = require("express");
const userRoutes = require("./routes/user");

const app = express();

//app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use("/user",userRoutes)
app.set("view engine","ejs");
app.set("views","./views");

app.listen(3003, () => {
    console.log("app is running on port 3003");
})