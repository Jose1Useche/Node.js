import jsonwebtoken from "jsonwebtoken";
import { config } from "dotenv";

config({ path: "../../config/.env" })

const jwt = jsonwebtoken;
let token = null;

const myFunction = async () => {
    token = jwt.sign({ _id: 'Hola bebe 123' }, process.env.PRIVATE_KEY, { expiresIn: 2 });
    console.log (token);

    try {
        const data = jwt.verify(token, process.env.PRIVATE_KEY);
        console.log(data);
    } catch (error) {
        console.log('mensaje de error: ', error.message);
    }

};

myFunction();

setTimeout(() => {
    try {
        console.log(jwt.verify(token, process.env.PRIVATE_KEY));
    } catch (error) {
        console.log('mensaje de error setTimeout: ', error.message);
    }
}, 2000);