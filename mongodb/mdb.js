import { MongoClient } from "mongodb";

let dbConnection;
let uri = 'mongodb+srv://jose1useche:sVEjL5FtjthryxZY@cluster0.no7f8lk.mongodb.net/?retryWrites=true&w=majority';

export const connectToDb = cbf => {
    MongoClient.connect(uri) //('mongodb://127.0.0.1:27017/bookstore')
            .then(client => {
                dbConnection = client.db();
                return cbf();
            })
            .catch(err => {
                return cbf(err);
            });
};

export const getDb = () => dbConnection;