const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let estadosValidos = {
    values: ['PENDIENTE', 'EN_CURSO', 'ANULADO', 'ENTREGADO'],
    message: '{VALUE} no es un estado válido'
};

let Schema = mongoose.Schema;

let envio = new Schema({

    clienteId : {
        type : String,
        required : [true, 'el clienteId es necesario']
    },
    empleadoId : {
        type : String,
        required : [true, 'el empleadoId es necesario']
    },
    repartidorId : {
        type : String,
        required : [true, 'el repartidorId es necesario']
    },
    pedidoId : {
        type : String,
        required : [true, 'el pedidoId es necesario']
    },
    estadoEnvio : {
        type : Boolean,
        default: 'PENDIENTE',
        enum  : estadosValidos
    }

});

cliente.plugin(uniqueValidator, { message : '{PATH} no se puede repetir'});

module.exports = mongoose.model('Envio',envio);