const express = require('express');

const _ = require('underscore');

const Cliente = require('../models/cliente');

const { validarNuevoCliente } = require('../middlewares/clienteValidator');

const app = express();


app.post('/cliente/nuevocliente', validarNuevoCliente,  (req, res)=> {

    let body = req.cliente;

    let cliente = new Cliente({
        nombre : body.nombre,
        apellido : body.apellido,
        documento : body.documento,
        telefono : body.telefono,
        direccion : body.direccion,
        email : body.email
    });

    cliente.save((err, clienteDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,

            cliente: clienteDB
        });

    });

});

app.get('/cliente/obtenerclientes', (req, res) => {

    Cliente.find({estado : 'true'}).exec((err, clientes) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            clientes
        });
    });
});

app.put('/cliente/bajacliente/:id', (req, res) => {

    let id = req.params.id;

    Cliente.findByIdAndUpdate(id, {estado : 'false'}, {new : true, runValidators :true},
    (err, clienteDB) => {
        if( err ) {
            return res.status(400).json({
                ok : false,
                err
            });
        }

        if(!clienteDB){
            return res.status(400).json({
                ok : false,
                err : {
                    message : 'Cliente no encontrado'
                }
            });
        }

        return res.json({
            ok: true,
            cliente : clienteDB
        })
    });

    


});

app.put('/cliente/modificarcliente/:id', validarNuevoCliente, (req, res)=>{

    let id = req.params.id;
    let body = req.cliente;
    console.log(body);
    Cliente.findByIdAndUpdate( id, body, {new : true, runValidators:true, context : 'query'} , (err , clienteDB) =>{
        if(err){
            return res.status(400).json({
                ok : false,
                err
            });
        }

        res.json({
            ok : true,
            cliente: clienteDB
        });

    });



})


module.exports = app;