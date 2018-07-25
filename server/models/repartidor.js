const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let repartidor = new Schema({

    nombre : {
        type : String,
        required : [true, 'el nombre es necesario']
    },
    estado : {
        type : Boolean,
        default: true
    }

});

cliente.plugin(uniqueValidator, { message : '{PATH} no se puede repetir'});

module.exports = mongoose.model('Repartidor',repartidor);