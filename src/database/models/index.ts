'use strict'
import fs from 'fs'
import path from 'path'
const Sequelize = require('sequelize')

const basename = path.basename(__filename);
const folder = process.env.PWD ? process.env.PWD : process.env.pm_cwd

require('dotenv').config(folder + '/.env')

type typeConfig = {
  database: string;
  dialect: any;
  port: any;
  logging: boolean;
  dialectOptions: {
    autoJsonMap: boolean;
  };
  timezone: string;
}

const config: typeConfig = {
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  logging: true,
  dialectOptions: {
    autoJsonMap: false
  },
  timezone: "-03:00"
}

const sequelize = new Sequelize(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, config);

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export function db(){
  return { sequelize, Sequelize }
}
