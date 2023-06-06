const viandas = require('../../data/viandas.json')
const httpStatusCodes = require('http2').constants;

const getViandas = (_, res) => {
    res.status(httpStatusCodes.HTTP_STATUS_OK).json(viandas)
}
const getByCodigo = (req, res) => {
    const codigo = req.params.codigo
    const vianda = viandas.find(vianda => vianda.codigo == codigo);
    
    if(vianda)
        res.status(httpStatusCodes.HTTP_STATUS_OK).json(vianda); 
    else
        res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND)
           .json({ mensaje: `la vianda ${codigo} no se encuentra`});    
}
const updateByCodigo = (req, res) => {
    const codigo = req.params.codigo
    const indexVianda = viandas.findIndex(vianda => vianda.codigo == codigo);
    if(indexVianda != -1) {
        const viandaData = req.body;
        viandas[indexVianda].aptoCeliaco = (typeof viandaData.aptoCeliaco !== 'undefined') ? viandaData.aptoCeliaco : viandas[indexVianda].aptoCeliaco;
        viandas[indexVianda].stock     = (typeof viandaData.stock     !== 'undefined') ? viandaData.stock   : viandas[indexVianda].stock  ;
        viandas[indexVianda].descripcion   = (typeof viandaData.descripcion        !== 'undefined') ? viandaData.descripcion  : viandas[indexVianda].descripcion ;
        
        res.status(httpStatusCodes.HTTP_STATUS_CREATED).json({"vianda":  viandas[indexVianda]});
    } else {
        res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND)
           .json({ mensaje: `La vianda con ${codigo} no se encuentra`});
    }
}
const getNewVianda = (req, res) => {
        const { codigo, tipo, aptoCeliaco, stock, descripcion } = req.body
        const inicioVianda = /^[V]{1}\[A-Z]{4}$/
          if (!inicioVianda.test(codigo)) {
    res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: 'El codigo debe empezar con la letra V' })
    return;
  }
        const existeVianda = viandas.find((vianda) => vianda.codigo == codigo)
          if (existeVianda) {
    res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: 'ese codigo ya esta en uso' })
    return;
  }
  if (stock <= 0) {
    res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: 'el stock debe ser mayor a 0' })
    return;
  }
  if (tipo != TARTA || tipo !=POLLO || tipo !=PASTA || tipo !=PIZZA || tipo !=EMPANADAS){
    res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: 'no es un tipo correcto' })
    return;
  }
  const newVianda = {
    codigo,
    tipo,
    aptoCeliaco,
    stock,
    descripcion,    
  }
  viandas.push(newVianda)
  res.status(httpStatusCodes.HTTP_STATUS_CREATED).json({ message: 'Nueva vianda preparada', vianda: newVianda })
}



module.exports = {getViandas,getByCodigo,updateByCodigo,getNewVianda}