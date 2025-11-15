const express = require("express")
const router = express.Router()

const {login, register, data} = require("../controllers/usersControllers")
const {protect} = require("../middleware/authMiddleware")
//publicos
router.post("/login", login)
router.post("/register", register)

//privados 
router.get("/data",protect, data)

module.exports = router

