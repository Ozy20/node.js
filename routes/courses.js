const express = require("express");
const router = express.Router();
const coursesControler = require("../controllers/coursesControler")
const coursesControlerDB = require("../controllers/coursesControlerDB")
const crsValidator = require("../util/courseValidatorMW")
/////////////////////////////////////////////////////
router.param("id",(req,res,next,val)=>{

    if(/^[0-9a-fA-F]{24}$/.test(val)){
        req.id = val;
        next()
    }
    else{
        res.status(403).send("bad request")
    }

});

router.get("/",coursesControlerDB.getAll);
router.post("/add",crsValidator,coursesControlerDB.addNew );

router.get("/:id",coursesControlerDB.getById );
 
router.delete("/delete/:id",coursesControlerDB.deleteById);
 
router.put("/modify/:id",coursesControlerDB.modifyById);
 
 
 

 module.exports = router;