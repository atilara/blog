const { Sequelize } = require('sequelize');
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

module.exports = Category;
