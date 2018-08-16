const Cliente = require('../models/cliente');

const _ = require('underscore');

// Valida que los datos enviados son correctos

let validarNuevoCliente = async (req, res, next) => {

    const body = req.body;
    var errores = [];
    var dataOk = [];

    //Reglas
    const regNombreApellido = new RegExp('^[a-zA-ZÑñáéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ \s]{1,50}$');
    const regDocumento = new RegExp('^[0-9]{0,31}$');
    const regEmail = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$');

    // Consulta a la DB.
    const verificarDatos = async (attr, value) => {
        let query = {};
        query[attr] = value;
        let clienteDB = await Cliente.find( query )
        .then(rta=>{return rta})
        .catch(err=>{throw new Error(err)});
        
        if(clienteDB.length == 0){
            return true;
        }

        throw new Error(`${attr} repetido`);
    };

    

    if (!body.nombre || !body.apellido || body.documento == null
        || !body.telefono || !body.direccion || !body.email == null) {
        return res.status(400).json({
            ok: false,
            message: 'No se enviaron los campos requeridos'
        });
    }

    //Nombre
    if (regNombreApellido.test(body.nombre)) {
        dataOk.push('nombre');
    }
    else {
        errores.push('nombre');
    }

    //Apellido
    if (regNombreApellido.test(body.apellido)) {
        dataOk.push('apellido');
    }
    else {
        errores.push('apellido');
    }

    //Documento

    await verificarDatos('documento', body.documento)
    .then(res =>{
        if(res){
            if(regDocumento.test(body.documento)){
                dataOk.push('documento');
            }
            else{
                errores.push('documento');
            }
        }
    })
    .catch(err =>{
        errores.push('documentoRepetido');
    });
    

    //Telefono
    if (body.telefono.length >= 1 && body.telefono.length < 31) {
        dataOk.push('telefono');
    }
    else {
        errores.push('telefono');
    }

    //Direccion
    if (body.direccion.length >= 1 && body.direccion.length < 51) {
        dataOk.push('direccion');
    }
    else {
        errores.push('direccion');
    }

    //Email

    await verificarDatos('email', body.email)
    .then(res =>{
        if(res){
            if (regEmail.test(body.email ) || !body.email ) {
                // Check unique
                dataOk.push('email');
            }
            else {
                errores.push('email');
            }
        }
    })
    .catch(err =>{
        errores.push('emailRepetido');
    });


    //Verifica si hay errores.

    if (dataOk.length != 6) {
        return res.status(400).json({
            ok: false,
            err: { 'errores en los campos': errores }
        });
    }

    req.cliente = _.pick(body, ['nombre','apellido','documento','telefono','direccion','email'] );

    next();

};

module.exports = {
    validarNuevoCliente
}