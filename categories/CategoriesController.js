const express = require('express');
// Definindo um router para conseguir estabelecer rotas fora
// do arquivo principal do projeto
const router = express.Router();
const Category = require('./Category');
// Importa lib para transformar títulos em slug
const slugify = require('slugify');

router.get('/admin/categories/new', (req, res) => {
  res.render('admin/categories/new');
});

router.post('/categories/save', (req, res) => {
  // Dados vindos do form
  var title = req.body.title;
  if (title != undefined) {
    Category.create({
      title: title,
      // Transformando título em slug
      slug: slugify(title),
    }).then(() => {
      res.redirect('/');
    });
  } else {
    res.redirect('admin/categories/new');
  }
});

module.exports = router;
