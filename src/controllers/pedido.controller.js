const pedidos = require('../../data/pedidos.json')
const httpStatusCodes = require('http2').constants;

const getPedidos = (_, res) => {
    res.status(httpStatusCodes.HTTP_STATUS_OK).json(pedidos)
}
const getPedidoId = ( req, res) =>{
    const id = req.params.id;
    const pedido = pedidos.find(pedido => pedido.id == id);
    
    if(pedido)
        res.status(httpStatusCodes.HTTP_STATUS_OK).json(pedido); 
    else
        res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND)
           .json({ mensaje: ` ${id} no fue encontrado`});    

  } 
const getNewPedido = (req, res) => {
    const pedidosData = req.body; 
    const pedido = {  
        id,
        fecha: new Date().toISOString().slice(0, 10),
        alumno,
        vianda
        
    }
    
    pedidos.push(pedido)
    alumnos[alumnoId].habilitado = false
    viandas[viandaId].stock = viandas[viandaId].stock - 1
    res.status(httpStatusCodes.HTTP_STATUS_CREATED).json(pedido) 
   
} 
module.exports ={getPedidos,getPedidoId,getNewPedido}


