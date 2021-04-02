const jwt = require("jsonwebtoken")
const authConfig = require("../config/authConfig")

const verifyToken = async (req, res, next) => {
    try{
        let token = req.headers["x-access-token"]
        if(!token){
            return res.send("noToken")    
        }
        const decoded = await jwt.verify(token, authConfig.secret)
        console.log(decoded)
        next()
    } catch(err){
        return res.send('unauthorized')
    }
}


const auth = {
    verifyToken,
}

module.exports = auth

