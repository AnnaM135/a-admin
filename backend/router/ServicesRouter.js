const router = require("express").Router()
const ServicesController = require("../controlers/ServicesController")
const { auth } = require("../middlewares")

router.get("/", [auth.verifyToken], ServicesController.getServicesDesc)

router.post("/add", [auth.verifyToken], ServicesController.addServicesDesc)

router.post("/addInfo", [auth.verifyToken], ServicesController.addInfo)

router.get("/showInfo", [auth.verifyToken], ServicesController.getServicesInfo)

router.post("/delete", [auth.verifyToken], ServicesController.deleteServicesInfo)

module.exports = router