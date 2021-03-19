const express = require('express');
const router = express.Router();
const User = require('./User');
// Package para criptografia
const bcrypt = require('bcryptjs');

// CREATE
router.get('/admin/users/new', (req, res) => {
  res.render('admin/users/new');
});

router.post('/users/save', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  // Verifica se o email já está cadastrado no banco de dados, se não existir, ele realiza o cadastro
  User.findOne({ where: { email: email } }).then((user) => {
    if (user == undefined) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);

      User.create({
        email: email,
        password: hash,
      })
        .then(() => {
          res.redirect('/');
        })
        .catch(() => {
          res.redirect('/');
        });
    } else {
      res.redirect('/admin/users/new');
    }
  });
});

// READ
router.get('/admin/users', (req, res) => {
  User.findAll().then((users) => {
    res.render('admin/users', { users: users });
  });
});

// LOGIN
router.get('/login', (req, res) => {
  res.render('admin/users/login');
});

router.post('/authenticate', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({ where: { email: email } }).then((user) => {
    // Se existe um usuário
    if (user != undefined) {
      // Validação de senha
      // Compara a senha fornecida no login com a senha armazenada no banco
      var correct = bcrypt.compareSync(password, user.password);
      if (correct) {
        // Criação de sessão
        req.session.user = {
          id: user.id,
          email: user.email,
        };
        res.redirect('/admin/articles');
      } else {
        res.redirect('/login');
      }
    } else {
      res.redirect('/login');
    }
  });
});

router.get('/logout', (req, res) => {
  req.session.user = undefined;
  res.redirect('/login');
});

module.exports = router;
