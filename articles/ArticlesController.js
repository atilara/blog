const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const slugify = require('slugify');

// Rotas criadas para lidar com artigos

// CREATE
// Rota para criação de um novo artigo
router.get('/admin/articles/new', (req, res) => {
  // Incluindo o model Category na busca devido ao relacionamento existente entre as tabelas
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
  Article.findAll({
    // Inclui o model de categoria na pesquisa devido ao relacionamento
    include: [{ model: Category }],
  }).then((articles) => {
    res.render('admin/articles', { articles: articles });
  });
});

// UPDATE
// Rota para edição de artigo
router.get('/admin/articles/edit/:id', (req, res) => {
  var id = req.params.id;
  // Redireciona caso o id não seja um número
  if (isNaN(id)) res.redirect('/admin/articles');

  // find by primary key, ou seja, id
  Article.findByPk(id)
    .then((article) => {
      if (article != undefined) {
        Category.findAll().then((categories) => {
          res.render('admin/articles/edit', {
            article: article,
            categories: categories,
          });
        });
      } else {
        res.redirect('/admin/articles');
      }
    })
    .catch((error) => {
      res.redirect('/admin/articles');
    });
});

router.get('/articles/page/:number', (req, res) => {
  var page = req.params.number;
  var offset = 0;

  if (isNaN(page) || page <= 1) {
    offset = 0;
  } else {
    // Parse int pq vai receber String
    offset = (parseInt(page) - 1) * 4;
  }
  // Encontra todos os artigos e tbm retorna a contagem de artigos
  // Limit vai limitar a quantidade de artigos que serão retornados
  // Offset mudará quais serão os 4 artigos retornados de acordo com o paramêtro na url
  Article.findAndCountAll({ limit: 4, offset: offset }).then((articles) => {
    var next;
    if (offset + 4 >= articles.count) {
      next = false;
    } else {
      next = true;
    }
    var result = {
      next: next,
      articles: articles,
    };
    res.json(result);
  });
});

// Salva as informações recebidas pela rota de edit
router.post('/articles/update', (req, res) => {
  var id = req.body.id;
  var title = req.body.title;
  var body = req.body.body;
  var category = req.body.category;
  // Atualiza título onde o id for igual ao recebido
  Article.update(
    { title: title, slug: slugify(title), body: body, categoryId: category },
    { where: { id: id } },
  ).then(() => {
    res.redirect('/admin/articles');
  });
});

// DETELE
router.post('/articles/delete', (req, res) => {
  var id = req.body.id;

  if (id != undefined) {
    // Verifica se o id é numérico
    if (!isNaN(id)) {
      // Método para excluir artigo, chamando método destroy e passando JSON com condições
      Article.destroy({
        where: { id: id },
      }).then(() => {
        res.redirect('/admin/articles');
      });
    } else {
      res.redirect('/admin/articles');
    }
  } else {
    res.redirect('/admin/articles');
  }
});

module.exports = router;
