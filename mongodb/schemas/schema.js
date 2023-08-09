import { Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

export const product = new Schema({
    name: String,
    description: String,
    price: {
        type: Number,
        default: 0
    }
  });

  export const blogSchema = new Schema({
    title: String,
    slug: String,
    published: Boolean,
    author: String,
    content: String,
    tags: [String],
    createdAt: Date,
    updatedAt: Date,
    comments: [{
      user: String,
      content: String,
      votes: Number
    }]
  });

  // export const booksSchema = new Schema({}, { strict: false });
  export const booksSchema = new Schema({ any: {} });

  export const userSchema = new Schema({
    userName: String,
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if(!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      }
    },
    password: {
      type: String,
      required: true
    },
    age: Number
  });

  userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 8);
    }
    next();
  });

  userSchema.pre('updateOne', async function(next) {
    const query = this.getUpdate();

    if(query.$set.password) {
      query.$set.password = await bcrypt.hash(query.$set.password, 8);
    }

    next();
  });