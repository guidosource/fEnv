
//Puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//BD
let urlBD;

if ( process.env.NODE_ENV === 'dev' ){
    urlBD = 'mongodb://localhost:27017/enviosFarmacia';
}
else {
    urlBD = '';
} 

process.env.URLBASE = urlBD;
