const express = require("express")
const router = express.Router()

const {login, register, data} = require("../controllers/usersControllers")

//publicos
router.post("/login", login)
router.post("/register", register)

//privados 
router.get("/data", data)

module.exports = router

