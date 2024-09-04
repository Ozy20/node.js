const Course = require("../models/courseModelDB")

//1- add new
const addNew = (req, res) => {
    const crs = new Course({ name: req.body.name, id: req.body.id })
    crs.save().then(() => {
        res.send({ message: "new course added", data: crs })
    }).catch((err) => {
        res.sed(err)
    })
}
//2-get all
const getAll = (req, res) => {
    Course.find().then((data) => { res.status(200).send(data) }).catch((err) => {
        res.send(err);
    })

}
//3-modify course
const modifyById = async(req, res) => {
    const newCrs = req.body
    let crs = await Course.findOneAndUpdate({ id: req.params.id }, newCrs,{new:true});
    if(crs){
        res.status(200).send({message:"student updated",data:crs})
    }
    else{
        res.status(404).send("student not f0und")
    }

}
//4- get by id
const getById = async (req, res) => {
    let course = await Course.findOne({ id: req.params.id })
    if(course){
        res.send(course)
    }
    else(
        res.status(404).send("course is not found")
    )

}
//5- delete by id
const deleteById = (req, res) => {
    Course.findOneAndDelete({ id: req.params.id }).then((value) => res.status(200).send({ message: "course deleted", data: value }))
}
module.exports = { addNew, getAll, modifyById, getById, deleteById }
