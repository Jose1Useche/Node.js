import express from 'express';
import path from 'node:path';
import { error } from 'node:console';
// import { ObjectId } from 'mongodb';
import hbs from 'hbs';
import { fileURLToPath } from 'url'; //https://codingbeautydev.com/blog/javascript-dirname-is-not-defined-in-es-module-scope/

import * as foreCast from '../weather-app/app2.js';
// import * as mongoDb from '../mongodb/mdb.js';
import * as mongoose from '../mongodb/mongoose.js';
// import * as models from '../mongodb/models/model.js';
import { userRouter } from './routers/user.js';
import { bookRouter } from './routers/book.js';
import { taskRouter } from './routers/task.js';
import { multerRouter } from './routers/multer.js';

const app = express();

//---------------------Middleware from express---------------------//
// app.use((req, res, next) => {
//   console.log(req.method, req.path);

//   if (req.method === 'GET') {
//     res.send('GET requests are disabled');
//   } else {
//     next();
//   }
// });
//-----------------------------------------------------------------//

app.use(userRouter);
app.use(bookRouter);
app.use(taskRouter);
app.use(multerRouter);

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, 'public');
const viewsPath = path.join(__dirname, 'views-example/views');
const partialsPath = path.join(__dirname, 'views-example/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static diretory to seerve
app.use(express.static(publicDirectoryPath)); 

// RESTful API's
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Titulo de mi pagina',
    name: 'Jose Useche'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'About me help:',
    name: 'Jose Useche'
  });
  // res.send(`<h1>
  //               Help page
  //           </h1>`
  //         );
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me:', 
    name: 'Jose Useche'
  });
  // res.send(
  //   {
  //     name: 'Jose',
  //     lastName: 'Useche'
  //   }
  // );
});

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  }

  console.log(req.query);
  console.log(req.query.address);

  foreCast.myForecast(req.query.address)
  .then(r => {
    console.log('Lo que devuelve mi promesa: ', r);
    res.send({
      forecast: r.forecast,
      location: r.locationName,
      latitude: r.latitude,
      longitude: r.longitude
    });
  })
  .catch(() => {
    res.send({
      error: 'You send an incorrect address'
    });
  });


  // res.send([
  //   {
  //     name: 'Nohemi'
  //   },
  //   {
  //     name: 'Maria'
  //   },
  //   {
  //     name: 'Juan'
  //   }
  // ]);
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  } 
  
  console.log(req.query);

  res.send({
    products: []
  });
});
/********************************************************************/
/***************************Mongodb START****************************/
/********************************************************************/
//db connection with MongoDB
// let db;

// mongoDb.connectToDb(err => {
//   if(!err) {
//     app.listen(3000,() => {
//         console.log('Server is up on port 3000.');
//     });

//     db = mongoDb.getDb();
//   } else {
//     throw error('ups, error al conectar...  :-(', err);
//   }
// });

//db connection with Mongoose
mongoose.connectToDb(err => {
  if(!err) {
    app.listen(3000,() => {
        console.log('Server is up on port 3000.');
    });
  } else {
    throw error('ups, error al conectar...  :-(', err);
  }
});
/********************************************************************/
/********************************************************************/
// //find() MongoDB
// app.get('/books', (req, res) => {
//   // current page
//   const page = req.query.page || 0;
//   const booksPerPage = 5;

//   let books = [];

//   db.collection('books')
//     .find()
//     .sort({ title: 1 })
//     .skip(page * booksPerPage)
//     .limit(booksPerPage)
//     .forEach(book => books.push(book))
//     .then(() => {
//       res.status(200).json(books);
//     })
//     .catch(() => {
//       res.status(500).json({ error: 'Could not fetch the documents.' });
//     });
// });

// //find() Mongoose
// app.get('/books', (req, res) => {
//   const page = req.query.page || 0;
//   const productsPerPage = 3;

//   mongoose.productList(page, productsPerPage, models.Product)
//     .then(data => {
//       res.status(200).json(data);
//     })
//     .catch(() => {
//       res.status(500).json({ error: 'Could not fetch the documents.' });
//     });
// });

// //findOne() MongoDB
// app.get('/books/:id', (req, res) => {
//   if (ObjectId.isValid(req.params.id)) {
//     db.collection('books')
//       .findOne({ _id: new ObjectId(req.params.id) })
//       .then(doc => {
//         res.status(200).json(doc);
//       })
//       .catch(() => {
//         res.status(500).json({ error: 'Could not fetch the document.' });
//       });
//   } else {
//     res.status(500).json({ error: 'Not a valid doc id'})
//   }
// });

// //findOne() Mongoose
// app.get('/books/:id', (req, res) => {
//   if (ObjectId.isValid(req.params.id)) {
//     mongoose.productDocument(req.params.id, models.Product)
//       .then(data => {
//         res.status(200).json(data);
//       })
//       .catch(() => {
//         res.status(500).json({ error: 'Could not fetch the documents.' });
//       });
//   } else {
//     res.status(500).json({ error: 'Not a valid doc id'});
//   }
// });



// //insertOne with MongoDB
// app.post('/books', (req, res) => {
//   const book = req.body;

//   db.collection('books')
//     .insertOne(book)
//     .then(result => {
//       res.status(201).json(result);
//     })
//     .catch(() => {
//       res.status(500).json({ error: 'Could not create a new document'});
//     })
// });

// //insertOne with Mongoose
// app.post('/books', (req, res) => {
//   mongoose.newProduct(req.body, models.Product)
//     .then(result => {
//       res.status(201).json(result);
//     })
//     .catch(() => {
//       res.status(500).json({ error: 'Could not create a new document'});
//     })
// });

// //insertOne with Mongoose ==> crear un nuevo usuario donde tenemos campos unicos y requeridos
// app.post('/users', (req, res) => {
//   mongoose.newUser(req.body, models.User)
//     .then(result => {
//       res.status(201).json(result);
//     })
//     .catch(() => {
//       res.status(500).json({ error: 'Could not create a new document'});
//     })
// });

// //updateOne with MongoDB
// app.patch('/books/:id', (req, res) => {
//   const updates = req.body;
//   console.log(req.body);

//   if (ObjectId.isValid(req.params.id)) {
//     db.collection('books')
//       .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
//       .then(result => {
//         res.status(200).json(result);
//       })
//       .catch(() => {
//         res.status(500).json({ error: 'Could not update the document.' });
//       });
//   } else {
//     res.status(500).json({ error: 'Not a valid doc id'});
//   }
// });

// //updateOne with Mongoose
// app.patch('/books/:id', (req, res) => {
//   const updates = req.body;

//   if (ObjectId.isValid(req.params.id)) {
//     mongoose.updateDocument(req.params.id, updates, models.Product)
//       .then(result => {
//         res.status(200).json(result);
//       })
//       .catch(() => {
//         res.status(500).json({ error: 'Could not update the document.' });
//       });
//   } else {
//     res.status(500).json({ error: 'Not a valid doc id'});
//   }
// });

// //deleteOne with MongoDB
// app.delete('/books/:id', (req, res) => {
//   if (ObjectId.isValid(req.params.id)) {
//     db.collection('books')
//       .deleteOne({ _id: new ObjectId(req.params.id) })
//       .then(result => {
//         res.status(200).json(result);
//       })
//       .catch(() => {
//         res.status(500).json({ error: 'Could not delete the document.' });
//       });
//   } else {
//     res.status(500).json({ error: 'Not a valid doc id'})
//   }
// });

// //deleteOne with Mongoose
// app.delete('/books/:id', (req, res) => {
//   if (ObjectId.isValid(req.params.id)) {
//     mongoose.deleteDocument(req.params.id, models.Product)
//     .then(result => {
//       res.status(200).json(result);
//     })
//     .catch(() => {
//       res.status(500).json({ error: 'Could not delete the document.' });
//     });
//   } else {
//     res.status(500).json({ error: 'Not a valid doc id'})
//   }
// });
/********************************************************************/
/*****************************Mongodb END****************************/
/********************************************************************/

// Enrutamiento 404
app.get('/help/*', (req, res) => {
  res.render('404-template', 
  { 
    title: 'Help error',
    name: 'Jose Useche', 
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404-template', 
  { 
    title: 'General error',
    name: 'Jose Useche', 
    errorMessage: 'Page not found',
  });
});

// app.listen(3000,() => {
//     console.log('Server is up on port 3000.');
// });