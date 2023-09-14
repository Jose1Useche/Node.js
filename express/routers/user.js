import express from "express";
import { ObjectId } from 'mongodb';
import * as mongoose from '../../mongodb/mongoose.js';
import { User } from "../../mongodb/models/model.js";
import { auth } from "../middlewares/auth.js";
import * as snGrid from '../emails/sendgrid.js';

export const userRouter = new express.Router();
userRouter.use(express.json());

//insertOne with Mongoose ==> crear un nuevo usuario donde tenemos campos unicos y requeridos
userRouter.post('/users', (req, res) => {
    mongoose.newUser(req.body, User)
      .then(result => {
        snGrid.sendWelcomeEmail(result.email, result.userName);
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

userRouter.delete('/users/:id', async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
      let user = await User.findById(req.params.id);
      
      mongoose.deleteDocument(req.params.id, User)
      .then(result => {
      snGrid.deleteAccount(user.email, user.userName);
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
    const user =  await User.validaIngresoUsuario(req.body.email, req.body.password);

    const token = await user.generateToken();

    // res.send({user: user.getPublicProfile(), token});
    res.send({user, token});

  } catch (error) {
    res.status(400).send(error.message);
  }
}); 

//GET
userRouter.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
  
  // try {
  //   const users = await User.find({}, {password: 0});
  //   res.send(users);
  // } catch (error) {
  //   res.status(500).send(error.message)    ;
  // }
});

//logout
userRouter.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(tk => {
      return tk.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//logout All
userRouter.post('/users/logoutall', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});