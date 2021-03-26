const router = require("express").Router()
const GalleryController = require("../controlers/GalleryControllers")
const { auth } = require("../middlewares")



 router.get("/", [auth.verifyToken], GalleryController.getGalleryInfo)

 router.post("/add", [auth.verifyToken], GalleryController.addProjectName)

 router.post("/delete", [auth.verifyToken], GalleryController.deleteGalleryInfo)

 router.get("/project/:id", [auth.verifyToken], GalleryController.showProjectItem)

 router.post("/project/add", [auth.verifyToken], GalleryController.addProjectItem)

module.exports = router