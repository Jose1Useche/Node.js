import { MongoClient } from "mongodb";
import { config } from "dotenv";

config({ path: "../config/.env" })

let dbConnection;
let uri = 
          'mongodb://127.0.0.1:27017/bookstore';
        // process.env.MONGODB_CONNECT;

export const connectToDb = cbf => {
    MongoClient.connect(uri)
            .then(client => {
                dbConnection = client.db();
                return cbf();
            })
            .catch(err => {
                return cbf(err);
            });
};

export const getDb = () => dbConnection;