import Item from './item';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let tiposValidos = {

    values: ['OBRA_SOCIAL', 'PARTICULAR'],
    message: '{VALUE} no es un estado válido'
};

let pedido = new Schema({

    tipo : {
        type : String,
        required : [true, 'el tipo es necesario'],
        enum : [tiposValidos]
    },
    recetasId : {
        type : [String],
        default : []
    },
    items : {
        type : [Item],
        default : []
    },
    importe : {
        type : Number,
        required : [true, 'el importe es necesario']
    } 

});

cliente.plugin(uniqueValidator, { message : '{PATH} no se puede repetir'});

module.exports = mongoose.model('Pedido',pedido);