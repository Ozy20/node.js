const fs = require("fs");
const path = require("path");
var courses =[]
const coursesPath = path.join(path.dirname(require.main.filename), "data", "coursesData.json");

module.exports = class Student {

    constructor(obj) {
        this.name = obj.name;
        this.id = null; // ID will be set after loading existing students
    }

    saveCourse() {
       
       const data =fs.readFileSync(coursesPath,'utf-8')
       courses = JSON.parse(data)
       this.id=courses.length
       courses.push(this)
       fs.writeFileSync(coursesPath,JSON.stringify(courses),'utf-8')
       console.log(this)  
    }

    static modifyCourse(id,obj){
        const index = courses.findIndex(val => val.id == id)
        courses[index].name = obj.name;
        

    }

    static fetchAll() {
        const data =fs.readFileSync(coursesPath,'utf-8')
       courses = JSON.parse(data)
        return courses;
    }
    static delete(id) {
        courses = courses.filter(val => val.id != id);
    }
}
