const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let empleado = new Schema({

    nombre : {
        type : String,
        required : [true, 'el nombre es necesario']
    },
    apellido : {
        type : String,
        required : [true, 'el apellido es necesario']
    },
    estado : {
        type : Boolean,
        default: true
    }

});

cliente.plugin(uniqueValidator, { message : '{PATH} no se puede repetir'});

module.exports = mongoose.model('Empleado',empleado);