import express from "express";
import { ObjectId } from 'mongodb';
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

//updateOne with Mongoose
userRouter.patch('/users/:id', (req, res) => {
  const updates = req.body;

  if (ObjectId.isValid(req.params.id)) {
      mongoose.updateDocument(req.params.id, updates, User)
      .then(result => {
          res.status(200).json(result);
      })
      .catch((err) => {
          res.status(500).json({ error: 'Could not update the document.' + err.message });
      });
  } else {
      res.status(500).json({ error: 'Not a valid doc id'});
  }
});

userRouter.delete('/users/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
      mongoose.deleteDocument(req.params.id, User)
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

// login
userRouter.post('/users/login', async (req, res) => {
  try {
    const userLogin =  await User.validaIngresoUsuario(req.body.email, req.body.password);
    res.send('Welcome ' + userLogin.userName);
  } catch (error) {
    res.status(400).send(error.message);
  }
}); 