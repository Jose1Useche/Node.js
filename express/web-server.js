import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'url'; //https://codingbeautydev.com/blog/javascript-dirname-is-not-defined-in-es-module-scope/

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectoryPath = path.join(__dirname, 'public');

app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath)); 

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Titulo de mi pagina',
    name: 'Jose Useche'
  });
});

app.get('/help', (req, res) => {
  res.send(`<h1>
                Help page
            </h1>`
          );
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