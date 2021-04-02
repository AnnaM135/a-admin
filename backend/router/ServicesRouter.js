const router = require("express").Router()
const ServicesController = require("../controlers/ServicesController")
//const { auth } = require("../middlewares")

router.get("/", ServicesController.getServicesDesc)

router.post("/add", ServicesController.editInfo)

router.post("/addInfo", ServicesController.addInfo)

router.get("/showInfo", ServicesController.getServicesInfo)

router.post("/delete",  ServicesController.deleteServicesInfo)

router.get("/outdoor/:id", ServicesController.showServicesItem)

router.post("/outdoor/add",  ServicesController.addServicesItem)

router.get("/outdoor/get/:id",  ServicesController.showServices)

module.exports = router