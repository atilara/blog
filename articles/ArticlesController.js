const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const slugify = require('slugify');

// Rotas criadas para lidar com artigos

// CREATE
// Rota para criação de um novo artigo
router.get('/admin/articles/new', (req, res) => {
  Category.findAll().then((categories) => {
    // Passando a variável pro view
    res.render('admin/articles/new', { categories: categories });
  });
});

// Rota que salva os dados recebidos através do form localizado na rota new
router.post('/articles/save', (req, res) => {
  var title = req.body.title;
  var body = req.body.body;
  var category = req.body.category;

  Article.create({
    title: title,
    slug: slugify(title),
    body: body,
    // Campo gerado pelo relacionamento, chave estrangeira
    categoryId: category,
  }).then(() => {
    res.redirect('/admin/articles');
  });
});

// READ
//Rota para listagem de todos os artigos
router.get('/admin/articles', (req, res) => {
  Article.findAll().then((articles) => {
    res.render('admin/articles', { articles: articles });
  });
});

module.exports = router;
