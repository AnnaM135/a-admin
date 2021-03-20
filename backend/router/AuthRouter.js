const router = require("express").Router()
const AuthController = require("../controlers/AuthController")
const {check} = require("express-validator")



router.post("/add",
[
    check("email").not().isEmpty().withMessage("The email field is empty"),
    check("password").not().isEmpty().withMessage("The password field is empty"),
],
 AuthController.login)



module.exports = router