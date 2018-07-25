import Item from './item';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let receta = new Schema({

    obraSocial : {
        type : String,
        required : [true, 'la OB es necesaria'],
    },
    fecha  : {
        type : String,
        required : [true, 'la fecha es necesaria']
    },
    matricula  : {
        type : String,
        required : [true, 'la matricula es necesaria']
    },
    otrosDatos  : {
        type : String,
        default : ""
    },
    items  : {
        type : [Item],
        required : [true, 'es necesario un item']
    }
    
});

cliente.plugin(uniqueValidator, { message : '{PATH} no se puede repetir'});

module.exports = mongoose.model('Receta',receta);