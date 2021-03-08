const express = require('express');
// Definindo um router para conseguir estabelecer rotas fora
// do arquivo principal do projeto
const router = express.Router();

router.get('/admin/categories/new', (req, res) => {
  res.render('admin/categories/new');
});

module.exports = router;
