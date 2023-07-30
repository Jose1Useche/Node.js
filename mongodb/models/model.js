import { model } from 'mongoose';
import * as schemas from '../schemas/schema.js'

export const Product = model('Products', schemas.product);
export const Blog = model('Blogs', schemas.blogSchema);
export const Books = model('Books', schemas.booksSchema);