//const { getPostData } = require('./getpostdata');
const path = require('path');
const fs = require('fs');
const { json } = require('stream/consumers');
const dbPath = path.join(__dirname, '../db.json');


const addUser = (req, res) => {
    try {
        let fileData = fs.readFileSync(dbPath);
        let parsedData = JSON.parse(fileData);
        parsedData.push(req.body);
        fs.writeFileSync(dbPath, JSON.stringify(parsedData));
        res.status(201).render("user",{
            users : parsedData
        })
    }
    catch (err) {
        res.status(500).json({ message: "failure" })
    }


}


const getAll = (req, res) => {
    try {
        let fileData = fs.readFileSync(dbPath);
        fileData = JSON.parse(fileData);
        //let response = { message: "success", data: fileData }
        res.status(200).render("user",{
            users : fileData
        })
    }
    catch (err) {
        let message = { message: "failure" }
        res.status(500).json(message)
    }

}



const deleteUser = (req, res) => {
    try {
        let fileData = fs.readFileSync(dbPath);
        fileData = JSON.parse(fileData);
        fileData = fileData.filter((user) => user.id !== req.body.id);
        fs.writeFileSync(dbPath, JSON.stringify(fileData));
        res.status(201).render("user",{
            users : fileData
        })
    }
    catch (err) {
        let message = { message: "failure" }
        res.status(500).json(message)
    }

}


const modifyUser = (req, res) => {
    try {
        let fileData = fs.readFileSync(dbPath);
        fileData = JSON.parse(fileData);

        fileData = fileData.map((user) => {
            return user.id == req.body.id ? req.body : user;
        });
        fs.writeFileSync(dbPath, JSON.stringify(fileData));
        res.status(201).render("user",{
            users : fileData
        })
    }
    catch (err) {
        let message = { message: "failure" }
        res.status(500).json(message)
    }
}


const getUser = (req, res) => {
    try {
        let fileData = fs.readFileSync(dbPath);
        fileData = JSON.parse(fileData);
        const userId = parseInt(req.params.id);
        const user = fileData.find(user => user.id === userId)
        let response = { message: "success", user: user };
        res.status(200).json(response);
    }
    catch (err) { 
        let message = { message: "failure" }
        res.status(500).json(message)
    }


}





module.exports = {
    addUser,
    getAll,
    deleteUser,
    modifyUser,
    getUser,
    
};
