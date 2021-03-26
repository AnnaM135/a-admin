const router = require("express").Router()
const ServicesController = require("../controlers/ServicesController")
const { auth } = require("../middlewares")

router.get("/", [auth.verifyToken], ServicesController.getServicesDesc)

router.post("/add", [auth.verifyToken], ServicesController.editInfo)

router.post("/addInfo", [auth.verifyToken], ServicesController.addInfo)

router.get("/showInfo", [auth.verifyToken], ServicesController.getServicesInfo)

router.post("/delete", [auth.verifyToken], ServicesController.deleteServicesInfo)

router.get("/outdoor/:id", [auth.verifyToken], ServicesController.showServicesItem)

router.post("/outdoor/add", [auth.verifyToken], ServicesController.addServicesItem)

router.get("/outdoor/get/:id", [auth.verifyToken], ServicesController.showServices)



module.exports = router