const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the server');
});

app.listen('5500', () => {
  console.log('Server running');
});
