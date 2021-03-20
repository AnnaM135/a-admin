const jwt = require("jsonwebtoken")
const authConfig = require("../config/authConfig")

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]
    if(!token){
        return res.send("noToken")
        
    }
    else{
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if(err){
                return res.send("unauthorized")
            }
            else{
                req.adminId = decoded.id
                next()
              
            }
        })
    }
}


const auth = {
    verifyToken,
}

module.exports = auth

