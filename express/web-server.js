import express from 'express';
import path from 'node:path';
import hbs from 'hbs';
import { fileURLToPath } from 'url'; //https://codingbeautydev.com/blog/javascript-dirname-is-not-defined-in-es-module-scope/

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
  res.send([
    {
      name: 'Nohemi'
    },
    {
      name: 'Maria'
    },
    {
      name: 'Juan'
    }
  ]);
});

app.listen(3000,() => {
    console.log('Server is up on port 3000.');
});