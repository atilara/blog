const express = require('express');
const router = express.Router();
const User = require('./User');
// Package para criptografia
const bcrypt = require('bcryptjs');

// CREATE
router.get('/admin/users/create', (req, res) => {
  res.render('admin/users/create');
});

router.post('/users/create', (req, res) => {
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
      res.redirect('/admin/users/create');
    }
  });
});

// READ
router.get('/admin/users', (req, res) => {
  User.findAll().then((users) => {
    res.render('admin/users', { users: users });
  });
});

module.exports = router;
