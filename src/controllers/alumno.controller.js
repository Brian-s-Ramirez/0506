const alumnos = require('../../data/alumnos.json')
const httpStatusCodes = require('http2').constants;

const getAlumnos = ( _, res) => {
    res.status(httpStatusCodes.HTTP_STATUS_OK).json(alumnos)
}
const getByDni = (req, res) => {
    const dni = req.params.dni
    const alumno = alumnos.find(alumno => alumno.dni == dni);
    
    if(alumno)
        res.status(httpStatusCodes.HTTP_STATUS_OK).json(alumno); 
    else
        res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND)
           .json({ mensaje: `El alumno con dni ${dni} no fue encontrado`});    
}
const updateByDni = (req, res) => {
    const dni = req.params.dni
    const indexAlumno = alumnos.findIndex(alumno => alumno.dni == dni);
    if(indexAlumno != -1) {
        const alumnoData = req.body;
        alumnos[indexAlumno].habilitado = (typeof alumnoData.habilitado !== 'undefined') ? alumnoData.habilitado : alumnos[indexAlumno].habilitado;
        alumnos[indexAlumno].celiaco    = (typeof alumnoData.celiaco    !== 'undefined') ? alumnoData.celiaco  : alumnos[indexAlumno].celiaco ;
        alumnos[indexAlumno].edad       = (typeof alumnoData.edad       !== 'undefined') ? alumnoData.edad : alumnos[indexAlumno].edad;
        
        res.status(httpStatusCodes.HTTP_STATUS_CREATED).json({"alumno":  alumnos[indexAlumno]});
    } else {
        res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND)
           .json({ mensaje: `El alumno con dni ${dni} no fue encontrado`});
    }
}
const newAlumno = (req, res) => {
    const alumnoData = req.body;
    if (dni < 8 || dni > 9) {
        res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: 'el dni debe tener 8 numeros' });
        return
      }
  
    if (edad < 18 || edad > 99) {
        res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: 'la edad debe ser siempre mayor a 18 y menor a 99 años' });
        return
      }
      alumnoData.celiaco == false;

    const indexAlumno = alumnos.findIndex(alumno => alumno.dni == alumnoData.dni);
    if (indexAlumno == -1) {
        alumnoData.habilitado == true;
        alumnos.push(alumnoData);
        res.status(httpStatusCodes.HTTP_STATUS_CREATED).json({mensaje: `El nuevo alumno fue ingresado correctamente`}); 
  
    } else {
        res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST)
           .json({mensaje: `El alumno con dni ${alumnoData.dni} ya existe `});
    }
}

module.exports = {getAlumnos,getByDni,updateByDni,newAlumno}