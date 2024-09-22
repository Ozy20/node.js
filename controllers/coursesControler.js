const CourseModel = require("../models/courseModel")
const validator = require("../util/courseValidator")
const getAll = (req, res) => {
    res.json(CourseModel.fetchAll());
}

const deleteById = (req, res) => {
    const id = req.params.id;
    CourseModel.delete(id)
    res.json({ message: "course is delted", data: CourseModel.fetchAll() })
}

const getById = (req, res) => {
    const courses = CourseModel.fetchAll();
    const id = req.params.id;
    const course = courses.find(val => val.id == id)
    res.json(course);
}

const modifyById = (req, res) => {
    const valid = validator(req.body)
    const id = req.params.id;
    if (valid) {

        CourseModel.modifyCourse(id, req.body)
        res.json({ mesaage: "course updated", data: CourseModel.fetchAll() })

    }
    else {
        res.json("not valid course")
    }
}

const addNew = (req, res) => {
    const valid = validator(req.body)
    if (valid) {
        const newCourse = new CourseModel(req.body)
        newCourse.saveCourse()
        res.json({ message: "added successfully", data: CourseModel.fetchAll() });
    }
    else {
        res.json("not valid course")
    }
}

module.exports = { getAll, deleteById, getById, modifyById, addNew }