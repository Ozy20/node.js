module.exports=(req, res, next) => {
    console.log("logging to your app");
    next();
}