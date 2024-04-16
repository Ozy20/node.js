const { getPostData } = require('./getpostdata');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, './db.json');

const addUser = async (req, res) => {
    try {
        let data = await getPostData(req);
        console.log(data);

        let fileData = fs.readFileSync(dbPath);
        let parsedData = JSON.parse(fileData);
        parsedData.push({ id: data.id, name: data.name, job: data.job });

        fs.writeFileSync(dbPath, JSON.stringify(parsedData));

        let response = { message: "success" };
        res.end(JSON.stringify(response));
    } catch (error) {
        console.error("Error:", error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
    }
};

const getAll = async (req, res) => {
    try {
        let fileData = fs.readFileSync(dbPath);
        let parsedData = JSON.parse(fileData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(parsedData))
    }
    catch (error) {
        console.error("Error:", error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
    }

};


const deleteUser = async (req, res) => {
    try {
        let data = await getPostData(req);
        let fileData = fs.readFileSync(dbPath);
        fileData = JSON.parse(fileData);
        fileData = fileData.filter((user) => user.id !== data.userId);

        fs.writeFileSync(dbPath, JSON.stringify(fileData));
        let response = { message: "success" };
        res.end(JSON.stringify(response));
    } catch (error) {
        console.error("Error in deleteUser:", error);
        let response = { message: "error", error: error.message };
        res.end(JSON.stringify(response));
    }
};

const modifyUser = async (req, res) => {
    try {
        let data = await getPostData(req);
        let fileData = fs.readFileSync(dbPath);
        fileData = JSON.parse(fileData);

        fileData = fileData.map((user) => {
            return user.id == data.userId ? { id: data.id, name: data.name, job: data.job } : user;
        });

        fs.writeFileSync(dbPath, JSON.stringify(fileData));
        let response = { message: "success", data: fileData };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
    } catch (error) {
        console.error("Error in modifyUser:", error);
        let response = { message: "error", error: error.message };

    }
};
///////////////////////// search about user using id , getAllSorted
const getUser = async (id, res) => {
    try {
        let fileData = fs.readFileSync(dbPath);
        fileData = JSON.parse(fileData);
        let user = fileData.find(user => user.id == id);
        let response = { message: "success", user: user };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));

    }
    catch (error) {
        console.error("Error in modifyUser:", error);
        let response = { message: "error", error: error.message };
    }
}
const getSorted = async (req, res) => {
    try {
        let fileData = fs.readFileSync(dbPath);
        fileData = JSON.parse(fileData);
        console.log(fileData);
        
        fileData.sort((a, b) => {
            const nameA = a.name.toUpperCase(); 
            const nameB = b.name.toUpperCase();
            let index = 0;

            while (nameA[index] === nameB[index]) {    //loop over characters till a[i]!=b[i]
                index++;
            }

            if (nameA[index] > nameB[index]) {
                return 1; // a > b
            } else if (nameA[index] < nameB[index]) {
                return -1; // a < b 
            } else {
                return 0; // names are equal (in case we exceed the max index)
            }
        });

        console.log(fileData);
        let response = { message: "success", data: fileData };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
    } catch (error) {
        console.error("Error in getSorted:", error);
        let response = { message: "error", error: error.message };
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
    }
};



module.exports = {
    addUser,
    getAll,
    deleteUser,
    modifyUser,
    getUser,
    getSorted,
};
