const express = require("express");
const reouter = express.Router();
const coursesControler = require("../controllers/coursesControler")
const coursesControlerDB = require("../controllers/coursesControlerDB")

/////////////////////////////////////////////////////
reouter.get("/",coursesControlerDB.getAll);
 
reouter.get("/:id",coursesControlerDB.getById );
 
reouter.delete("/delete/:id",coursesControlerDB.deleteById);
 
reouter.put("/modify/:id",coursesControlerDB.modifyById);
 
reouter.post("/add",coursesControlerDB.addNew );
 
 

 module.exports = reouter;