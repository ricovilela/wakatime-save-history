'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class devs_repository extends Model {

    static associate(models) {

    }
  };
  devs_repository.init({
    name: DataTypes.STRING,
    urlhours: DataTypes.STRING,
    urllanguage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'devs_repository',
  });
  return devs_repository;
};