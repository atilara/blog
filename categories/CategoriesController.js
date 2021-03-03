const express = require('express');
// Definindo um router para conseguir estabelecer rotas fora
// do arquivo principal do projeto
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Categorias');
});

module.exports = router;
