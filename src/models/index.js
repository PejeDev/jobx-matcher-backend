'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const database = require.main.require('./config/database');

const basename = path.basename(__filename);

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    let model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.database = database;
db.Sequelize = Sequelize;

module.exports = db;
