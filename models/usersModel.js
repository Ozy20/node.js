const mongoose = require('mongoose');
const validator = require("validator")
const jwt = require("jsonwebtoken")
const config = require("config")

mongoose.connect("mongodb://127.0.0.1:27017/uni").then(
    () => {
        console.log("connected to the users database");
    }
).catch((err) => {
    console.log(err);
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 15

    }
    , email: {//primary key
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    }
    ,
    password: {
        type: String,
        required: true,
        minLength: 5,
    },
    isAdmin:{
        type:Boolean
    }
});

userSchema.method("genAuthToken", function() {
    const token = jwt.sign({ userid: this._id ,adminRole:this.isAdmin}, config.get("jwtsec"))
    return token;
}
)
const user = mongoose.model("users", userSchema);

module.exports = user