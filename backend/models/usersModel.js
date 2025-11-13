const mongoose = require ("mongoose")

const userSchema = mongoose.Schema({
    nombre :{
        type: String, 
        required: [true, "porfavor teclea tu nombre"]
    },
    email :{
        type: String,
        required: [true, "Porfavor escribe un email"],
        unique: true
    },
    password :{
        type: String,
        required: [true, "porfavor teclea tu contrasena"]
    },
    esAdmin: {
        type: Boolean,
        default: false
    }
})
module.exports = mongoose.model("User", userSchema)