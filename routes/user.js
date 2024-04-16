let controller = require("../controlers/controller");
const router = require("express").Router();
const page = require("../controlers/page");

router.get("/getAll", controller.getAll);
router.get("/getUser/:id", controller.getUser);
router.put("/modifyUser", controller.modifyUser);
router.post("/addUser", controller.addUser);
router.delete("/deleteUser", controller.deleteUser);

//ejs 
router.get("/addUser",page.addUserPage);
router.get("/modifyUser", page.modifyUserPage);
router.post("/compeleteUpdate",controller.modifyUser);
router.post("/deleteUser", controller.deleteUser);


module.exports = router;