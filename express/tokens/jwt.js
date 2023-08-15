import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;
let token = null;

const myFunction = async () => {
    token = jwt.sign({ _id: 'Hola bebe 123' }, 'palabraClaveSecreta', { expiresIn: 2 });
    console.log (token);

    try {
        const data = jwt.verify(token, 'palabraClaveSecreta');
        console.log(data);
    } catch (error) {
        console.log('mensaje de error: ', error.message);
    }

};

myFunction();

setTimeout(() => {
    try {
        console.log(jwt.verify(token, 'palabraClaveSecreta'));
    } catch (error) {
        console.log('mensaje de error: ', error.message);
    }
}, 2000);