const db = require("../models/models")
const {validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authConfig = require("../config/authConfig")




exports.login = (req, res) => {
    let errors = validationResult(req)
    errors = errors.array()

    if(errors.length == 0){
        db.Admin.findOne({where: {email: req.body.email}})
        .then(data => {
            if(!data){
                errors.push({
                    param: "email",
                    msg: "No user with this email",
                    location: "body",
                })
                res.send(errors)
            } else {
                // let validPass = bcrypt.compareSync(data.password, req.body.password)
                if(data.password !== req.body.password){
                    errors.push({
                        param: "password",
                        msg: "Wrong password",
                        location: "body",
                    })
                    res.send(errors)
                }
                else{
                    let token = jwt.sign({id: data.id}, authConfig.secret, {
                        expiresIn: 86400,
                    })
                    res.send({accessToken: token, id: data.id})
                }
            }
        })
        .catch(err => console.log(err))
    }
    else{
        res.send(errors)
    }
}

// exports.getServicesDesc = (req, res) =>{
//     db.Admin.findByPk(req.adminId, {include: ["servicesHeader"]})
//     .then((data) => {
//         res.send(data);
//     })
//     .catch((err) => console.log(err))
// }