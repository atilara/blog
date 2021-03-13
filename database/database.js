const sequelize = require('sequelize');

const connection = new sequelize('blog', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  // Para os campos createdAt e updatedAt sejam preenchidos com os dados da minha
  timezone: '-03:00',
});

module.exports = connection;
