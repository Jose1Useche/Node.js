import express from "express";
import * as mongoose from '../../mongodb/mongoose.js';
import { User } from "../../mongodb/models/model.js";

export const userRouter = new express.Router();
userRouter.use(express.json());

//insertOne with Mongoose ==> crear un nuevo usuario donde tenemos campos unicos y requeridos
userRouter.post('/users', (req, res) => {
    mongoose.newUser(req.body, User)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(() => {
        res.status(500).json({ error: 'Could not create a new document'});
      })
  });
