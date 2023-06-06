const {Router} = require('express')
const controller = require('../controllers/vianda.controller')
const route = Router()

route.get("/", controller.getViandas)
route.get("/:codigo", controller.getByCodigo)
route.put("/:codigo", controller.updateByCodigo)
route.post("/:", controller.getNewVianda)

module.exports = route