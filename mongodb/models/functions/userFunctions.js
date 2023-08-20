import * as models from '../../models/model.js';
import bcrypt from 'bcryptjs';
import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;

//Methods
export const generateJWT =  async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id }, 'palabraClaveSecreta');
  user.tokens.push({ token }); // user.tokens = user.tokens.concat({ token });
  await user.save();
  
  return token;
};

//*********************************************************//
//*******************Hiding Private Data*******************//
export const getPublicProfile = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject._id;

  return userObject;
};
//*******************Hiding Private Data*******************//
//*********************************************************//
  
//Static functions
export const login = async (email, password) => {
  const user =  await models.User.findOne({ email });

  if(!user) {
    throw new Error('Unable to login');
  }

  const isMatch =  await bcrypt.compare(password, user.password);

  if(!isMatch) {
    throw new Error('Invalid password');
  }

  return user;
};