const db = require("../models/models")


exports.getServicesDesc = (req, res) =>{
    db.Admin.findByPk(req.adminId, {include: ["servicesHeader"]})
    .then((data) => {
        res.send(data);
    })
    .catch((err) => console.log(err))
}

exports.addServicesDesc = (req, res) =>{
    db.ServicesHeader.update({description: req.body.data}, {where: {adminId: req.adminId}})
     .then((data) => res.send("ok"))
    .catch((err) => console.log(err))
}



exports.addInfo = (req, res) =>{
    db.ServicesInfo.create({name: req.body.data.name, title: req.body.data.title, adminId: req.adminId})
     .then((data) => res.send(data))
    .catch((err) => console.log(err))
}

exports.getServicesInfo = (req, res) => {
    db.Admin.findByPk(req.adminId, {include: ["servicesinfo"]})
    .then((data) => {
        res.send(data);
    })
    .catch((err) => console.log(err))
}

exports.deleteServicesInfo = (req, res) =>{
    db.ServicesInfo.destroy({where: {id: req.body.id}})
    .then((data) => res.send("deleted"))
    .catch((err) => console.log(err))
}