const router = require("express").Router();

//import handlers
const { signup } = require("./handlers/signup");
const { signin } = require("./handlers/signin");

//add routes
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;