'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wakatimeline extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  wakatimeline.init({
    user: DataTypes.STRING,
    hours: DataTypes.TIME,
    date: DataTypes.DATE,
    languages: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'wakatimeline',
  });
  return wakatimeline;
};