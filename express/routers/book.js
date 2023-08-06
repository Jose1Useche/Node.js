import express from "express";
import { ObjectId } from 'mongodb';
import * as mongoose from '../../mongodb/mongoose.js';
import { Product } from "../../mongodb/models/model.js";

export const bookRouter = new express.Router();
bookRouter.use(express.json());

//find() Mongoose
bookRouter.get('/books', (req, res) => {
    const page = req.query.page || 0;
    const productsPerPage = 3;

    mongoose.productList(page, productsPerPage, Product)
    .then(data => {
    res.status(200).json(data);
    })
    .catch(() => {
    res.status(500).json({ error: 'Could not fetch the documents.' });
    });
});

//findOne() Mongoose
bookRouter.get('/books/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        mongoose.productDocument(req.params.id, Product)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the documents.' });
        });
    } else {
        res.status(500).json({ error: 'Not a valid doc id'});
    }
});

//insertOne with Mongoose
bookRouter.post('/books', (req, res) => {
    mongoose.newProduct(req.body, Product)
    .then(result => {
    res.status(201).json(result);
    })
    .catch(() => {
    res.status(500).json({ error: 'Could not create a new document'});
    })
});

//updateOne with Mongoose
bookRouter.patch('/books/:id', (req, res) => {
    const updates = req.body;

    if (ObjectId.isValid(req.params.id)) {
        mongoose.updateDocument(req.params.id, updates, Product)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not update the document.' });
        });
    } else {
        res.status(500).json({ error: 'Not a valid doc id'});
    }
});

//deleteOne with Mongoose
bookRouter.delete('/books/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        mongoose.deleteDocument(req.params.id, Product)
        .then(result => {
        res.status(200).json(result);
        })
        .catch(() => {
        res.status(500).json({ error: 'Could not delete the document.' });
        });
    } else {
        res.status(500).json({ error: 'Not a valid doc id'})
    }
});