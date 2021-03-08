const sequelize = require('sequelize');
const connection = require('../database/database');

const Category = connection.define('categories', {
  title: {
    type: sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

// Category.sync();

module.exports = Category;
