const sequelize = require('sequelize');
const connection = require('../database/database');

const User = connection.define('users', {
  email: {
    type: sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

User.sync({ force: false });

module.exports = User;
