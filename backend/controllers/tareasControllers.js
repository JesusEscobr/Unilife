const asynchandler = require("express-async-handler")
const Tarea = require("../models/tareasModel")


const getTareas = asynchandler( async (req,res) => {
    const tareas = await Tarea.find()
    res.status(200).json(tareas)
})

const createTareas = asynchandler( async(req,res) => {
    if (!req.body.texto){
        res.status(400)
        throw new Error("Por favor inserte un texto")
    }

    const tarea = await Tarea.create({
        texto: req.body.texto
    })
    res.status(201).json(tarea)
})

const updateTareas = asynchandler (async (req, res) => {
    const tarea = await Tarea.findById(req.params.id)
    if (!tarea){
        res.status(404)
        throw new Error("Tarea no existe")
    }
    
   if (tarea.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Usuario no autorizado")
   } else {
        const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(200).json(tareaUpdated)
   }
})

const deleteTareas = asynchandler( async (req,res) => {

    if(tarea.user.toString() !== req.user.id ){
        res.status(401)
        throw new Error ("Usuario no autorizado")
    }
    else{
        await tarea.deleteOne()
        res.status(200).json({id: req.params.id})
    }
})

module.exports = {
    getTareas,
    createTareas, 
    updateTareas, 
    deleteTareas
};