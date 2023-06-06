const {Router} = require('express')
const controller = require('../controllers/alumno.controller')
const route = Router()

route.get("/", controller.getAlumnos)
route.get("/:dni", controller.getByDni)
route.get("/:dni", controller.updateByDni)
route.get("/", controller.newAlumno)

module.exports = route