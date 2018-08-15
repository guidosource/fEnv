
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let cliente = new Schema({

    nombre : {
        type : String,
        required : [true, 'el nombre es necesario']
    },
    apellido : {
        type : String,
        required : [true, 'el apellido es necesario']
    },
    documento : {
        type : String,
        unique : true
    },
    telefono : {
        type : String,
        required : [true, 'el telefono es necesario']
    },
    direccion : {
        type : String,
        required : [true, 'la dirección es necesaria']
    },
    email : {
        type : String,
        unique : true
    },
    estado : {
        type : Boolean,
        default: true
    }

});

cliente.plugin(uniqueValidator, { message : '{PATH} no se puede repetir'});

module.exports = mongoose.model('Cliente',cliente);