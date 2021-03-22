const db = require("../models/models")

exports.addProjectName =  (req, res) =>{
     db.Gallery.create({project_name: req.body.project_name, photo_url: req.file.filename, adminId: req.adminId})
   .then((r) => {
       res.send(r)
   })
   .catch((err) => console.log(err))
}


exports.getGalleryInfo = (req, res) => {
    db.Admin.findByPk(req.adminId, {include: ["gallery"]})
    .then((data) => {
        res.send(data);
    })
    .catch((err) => console.log(err))
}

exports.deleteGalleryInfo = (req, res) => {
    db.Gallery.destroy({where: {id: req.body.id}})
    .then((data) => res.send("deleted"))
    .catch((err) => console.log(err))
}

exports.showProjectItem = (req, res) => {
    db.Gallery.findByPk(req.params.id)
    .then((data) => {
        res.send(data)
        // db.Gallery.findAll()
        // .then(p => res.send({data, p}))
        // .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
}