import express from 'express';
import path from 'node:path';
import { error } from 'node:console';
import { ObjectId } from 'mongodb';
import hbs from 'hbs';
import { fileURLToPath } from 'url'; //https://codingbeautydev.com/blog/javascript-dirname-is-not-defined-in-es-module-scope/

import * as foreCast from '../weather-app/app2.js';
import * as mongoDb from '../mongodb/mdb.js';

const app = express();

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
//db connection
let db;

mongoDb.connectToDb(err => {
  if(!err) {
    app.listen(3000,() => {
        console.log('Server is up on port 3000.');
    });

    db = mongoDb.getDb();
  } else {
    throw error('ups, error al conectar...  :-(', err);
  }
});
/********************************************************************/
/********************************************************************/
app.get('/books', (req, res) => {
  let books = [];

  db.collection('books')
    .find()
    // .sort({ author: 1 })
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: 'Could not fetch the documents.' });
    });
});

app.get('/books/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection('books')
      .findOne({ _id: new ObjectId(req.params.id) })
      .then(doc => {
        res.status(200).json(doc);
      })
      .catch(() => {
        res.status(500).json({ error: 'Could not fetch the document.' });
      });
  } else {
    res.status(500).json({ error: 'Not a valid doc id'})
  }
});

app.use(express.json());

app.post('/books', (req, res) => {
  const book = req.body;

  db.collection('books')
    .insertOne(book)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(() => {
      res.status(500).json({ error: 'Could not create a new document'});
    })
});
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