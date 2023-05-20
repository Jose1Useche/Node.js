import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'url'; //https://codingbeautydev.com/blog/javascript-dirname-is-not-defined-in-es-module-scope/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDirectoryPath = path.join(__dirname, 'public');

const app = express();
app.use(express.static(publicDirectoryPath)); 

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/help', (req, res) => {
  res.send(`<h1>
                Help page
            </h1>`
          );
});

app.get('/about', (req, res) => {
  res.send(
    {
      name: 'Jose',
      lastName: 'Useche'
    }
  );
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