const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
// Carregando as rotas para o arquivo principal
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
// Importando os models para criação das tabelas
const Article = require('./articles/Article');
const Category = require('./categories/Category');

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

// Utilizando as rotas existentes nos controllers utilizando um prefixo
app.use('/', categoriesController);
app.use('/', articlesController);

app.get('/', (req, res) => {
  // Ordenando de forma decrescente através do order
  Article.findAll({ order: [['id', 'DESC']] }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render('index', { articles: articles, categories: categories });
    });
  });
});

app.get('/:slug', (req, res) => {
  var slug = req.params.slug;
  // Procura por um artigo onde o slug for o mesmo que foi passado na URL
  Article.findOne({ where: { slug: slug } })
    .then((article) => {
      if (article != undefined) {
        Category.findAll().then((categories) => {
          res.render('article', { article: article, categories: categories });
        });
      } else {
        res.redirect('/');
      }
    })
    .catch((error) => {
      res.redirect('/');
    });
});

app.get('/category/:slug', (req, res) => {
  var slug = req.params.slug;
  Category.findOne({
    where: { slug: slug },
    // Vai trazer pra gente todos os artigos que estão dentro dessa categoria
    include: [{ model: Article }],
  })
    .then((category) => {
      if (category != undefined) {
        // Para preencher o menu das categorias
        Category.findAll().then((categories) => {
          res.render('index', {
            // Array de todos os artigos pertencentes aquela categoria, só é possível
            // graças ao include/join que foi feito anteriormente
            articles: category.articles,
            categories: categories,
          });
        });
      } else {
        res.redirect('/');
      }
    })
    .catch((error) => {
      res.redirect('/');
    });
});

app.listen('5500', () => {
  console.log('Server running');
});
