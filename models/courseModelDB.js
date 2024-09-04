const mongoose = require('mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/uni").then(
    () => {
        console.log("connected to the database");
    }
).catch((err) => {
    console.log(err);
});

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        validate:{validator : (v)=>{return v.length <= 10 }},
        set:v =>v.toUpperCase(),
        trim:true
    }
    , id: {//primary key
        type: Number,
        unique: true,
        require: true,
        min: 0,
    }
});

const course = mongoose.model("courses", courseSchema);





module.exports = course