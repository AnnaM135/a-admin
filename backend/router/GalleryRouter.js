const router = require("express").Router()
const GalleryController = require("../controlers/GalleryControllers")
//const { auth } = require("../middlewares")



 router.get("/",  GalleryController.getGalleryInfo)

 router.post("/add",  GalleryController.addProjectName)

 router.post("/delete",  GalleryController.deleteGalleryInfo)

 router.get("/project/:id",  GalleryController.showProjectItem)

 router.post("/project/add",  GalleryController.addProjectItem)

 router.get("/project/get/:id",  GalleryController.showProject)

module.exports = router