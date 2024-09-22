const express = require("express")
const router = express.Router()
const authValidator = require("../middelwares/authValidationMW")
const User = require("../models/usersModel")
const bcrypt = require("bcrypt")
const config = require("config")

//terminating the process if the towken is not set 
if (!config.get("jwtsec")) {
    console.log("");
    process.exit(0);
}


router.post("/", authValidator, async (req, res) => {
    //check email

    let user = await User.findOne({ email: req.body.email }).exec()
    if (!user) {
        return res.status(400).send("invalid email or password")
    }
    //check pass
    const valid = await bcrypt.compare(req.body.password, user.password)
    if (!valid) {
        return res.status(400).send("invalid email or password")
    }
    //res
    const token = user.genAuthToken();

    res.header("log-header-x", token)
    res.status(200).send("logged in !")
})

module.exports = router;