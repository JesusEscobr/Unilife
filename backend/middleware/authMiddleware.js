const jwt = require ("jsonwebtoken")
const User = require ("../models/usersModel")

const protect = async(req, res, next) => {
let token 
if (req.header.authorization && req.header.authorization.startsWith("Bearer")){

try {
    
    token = req.header.authorization.split (" ")[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id).select("-password")

    next()

} catch (error) {
    
    console.log(error)
    res.status(401)
    throw new Error ("Acceso no autorizado")

}
}

if (token ){
    res.status(401)
    throw new Error("no hay token")
}
}

module.exports ={protect}