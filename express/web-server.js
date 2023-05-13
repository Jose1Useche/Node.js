import express from 'express';
const app = express();

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