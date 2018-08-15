const express = require('express');

const Cliente = require('../models/cliente');

const { validarNuevoCliente } = require('../middlewares/clienteValidator');

const app = express();


app.post('/cliente/nuevocliente', validarNuevoCliente,  (req, res)=> {

    let body = req.body;

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

    Cliente.find({}).exec((err, clientes) => {
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

module.exports = app;