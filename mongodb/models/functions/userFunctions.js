import * as models from '../../models/model.js';
import bcrypt from 'bcryptjs';
  
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