import { Schema } from 'mongoose';

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
      required: true
    },
    age: Number
  });