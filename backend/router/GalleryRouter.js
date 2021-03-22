const router = require("express").Router()
const GalleryController = require("../controlers/GalleryControllers")
const multer = require("multer")
const { auth } = require("../middlewares")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({storage: storage})


 router.get("/", [auth.verifyToken], GalleryController.getGalleryInfo)

 router.post("/add", [auth.verifyToken, upload.single("photo_url")], GalleryController.addProjectName)

router.post("/delete", [auth.verifyToken], GalleryController.deleteGalleryInfo)

router.get("/project/:id", [auth.verifyToken], GalleryController.showProjectItem)

module.exports = router