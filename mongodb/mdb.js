import { MongoClient } from "mongodb";

let dbConnection;

export const connectToDb = cbf => {
    MongoClient.connect('mongodb://127.0.0.1:27017/bookstore')
            .then(client => {
                dbConnection = client.db();
                return cbf();
            })
            .catch(err => {
                return cbf(err);
            });
};

export const getDb = () => dbConnection;