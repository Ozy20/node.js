const http = require("http");
const url = require('url');
let controller = require("./controller");
const { Socket } = require("dgram");
const { error } = require("console");

let httpServer = http.createServer((req, res) => {

    const urlString =req.url.split('/'); //converting url (string) into array of url parts
    const id = parseInt(urlString[urlString.length -1 ]);

    if (req.url == "/hello" && req.method == "GET") {
        res.end('Hello');
    }
    
   else if (req.url == "/addUser" && req.method == "POST") {
        controller.addUser(req, res);

    }
    else if (req.url == "/getAll" && req.method == "GET") {
        controller.getAll(req, res);
    }
   
    else if (req.url == "/deleteUser" && req.method == "DELETE") {
       
        controller.deleteUser(req, res);
    }
    else if (req.url == "/modifyUser" && req.method == "PUT") {
        controller.modifyUser(req, res);
    }
    else if(urlString[1]=="getUser" && req.method == "GET"){
        controller.getUser(id,res);
    }
    else if(req.url == "/getSorted" && req.method == "GET"){
        controller.getSorted(req,res);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});
let port = 3002;
httpServer.listen(port, () => {
   console.log("you are listening on port 3002");
   console.log(global)
    
})