const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');

// Rotas criadas para lidar com artigos

router.get('/articles', (req, res) => {
  res.send('Rota de Artigos');
});

router.get('/admin/articles/new', (req, res) => {
  Category.findAll().then((categories) => {
    // Passando a variável pro view
    res.render('admin/articles/new', { categories: categories });
  });
});

module.exports = router;
