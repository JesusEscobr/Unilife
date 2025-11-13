const bcrypt = require ("bcryptjs")
const jwt = require ("jsonwebtoken")
const asyncHandler  = require ("express-async-handler")
const User = require("../models/usersModel")


const login = asyncHandler(async(req, res) => {

    const {email, password} = req.body

    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({

            _id:user.id,
            nombre:user.nombre,
            email:user.email,
            token:generarToken(user.id)
        })
    }
    else{
        res.status(401)
        throw new Error ("Credenciales incorrectas")
    }

})

const register = asyncHandler(async (req, res) => {
    const {nombre, email, password} = req.body

    if(!nombre || !email || !password){
        res.status(400)
        throw new Error ("faltan datos")
    }
    const userExiste = await User.findOne({email})

    if(userExiste){
        res.status(400)
        throw new Error ("usuario ya existe")
    }
    else{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            nombre,
            email,
            password : hashedPassword
        })

        if (user){
            res.status(201).json({
                __id: user.id,
                nombre: user.nombre,
                email: user.email
            })
        }
        else{
            res.status(400)
            throw new Error ("no se guardaron los datos")
        }
    }

})

const generarToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '3d'
    })
}

const data = (req, res) => {
    res.status(200).json ({mensaje: "data"})
}
module.exports ={
    login,register,data
}


