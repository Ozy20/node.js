const jwt = require("jsonwebtoken");
const config = require("config")
module.exports = (req, res, next) => {
    //check user role(user/admin)
    const token = req.header("log-header-x");
    if (!token) { res.status(401).send("access denied") }
    try {
        const decodedPayload = jwt.verify(token, config.get("jwtsec"))
        if (!decodedPayload.adminRole)
            return res.status(401).send("access denied")
        next();
    }
    catch (err) {
        res.status(400).send("invalid token")
    }
}