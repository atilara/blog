const sequelize = require('sequelize');

const connection = new sequelize('blog', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = connection;
