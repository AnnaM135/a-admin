const router = require("express").Router()
const ServicesController = require("../controlers/ServicesController")
const { auth } = require("../middlewares")

router.get("/", [auth.verifyToken], ServicesController.getServicesDesc)

router.post("/add", [auth.verifyToken], ServicesController.addServicesDesc)


module.exports = router