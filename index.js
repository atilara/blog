const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

connection
  .authenticate()
  .then(() => {
    console.log('Conexão realizada');
  })
  .catch((error) => {
    console.log(error);
  });

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.listen('5500', () => {
  console.log('Server running');
});
