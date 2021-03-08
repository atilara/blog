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

router.get('/admin/categories', (req, res) => {
  Category.findAll().then((categories) => {
    res.render('admin/categories', {
      categories: categories,
    });
  });
});

router.post('/categories/delete', (req, res) => {
  var id = req.body.id;
  if (id != undefined) {
    // Verifica se o id é numérico
    if (!isNaN(id)) {
      // Método para excluir categoria, chamando método destroy e passando JSON
      Category.destroy({
        where: { id: id },
      }).then(() => {
        res.redirect('/admin/categories');
      });
    } else {
      res.redirect('/admin/categories');
    }
  } else {
    res.redirect('/admin/categories');
  }
});

module.exports = router;
