const {Router} = require('express')
const controller = require('../controllers/pedido.controller')
const route = Router()

route.get("/", controller.getPedidos),
route.get("/:id", controller.getPedidoId),
route.post("/:id", controller.getNewPedido),

module.exports = route