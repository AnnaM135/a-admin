const db = require("../models/models")


exports.getServicesDesc = (req, res) =>{
    db.Admin.findByPk(req.adminId, {include: ["servicesHeader"]})
    .then((data) => {
        res.send(data);
    })
    .catch((err) => console.log(err))
}

exports.addServicesDesc = (req, res) =>{
    res.send(req.body)
}