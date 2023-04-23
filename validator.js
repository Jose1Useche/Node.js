//Vamos a validar si la direccion de un email es correcta en cuanto a forma.
import validator from 'validator';

const email = 'jose1useche@gmail.com';

console.log(validator.isEmail(email));