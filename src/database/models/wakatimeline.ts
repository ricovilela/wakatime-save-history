"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class wakatimeline extends Model {
    static associate(models) {
      // define association here
    }
  }
  wakatimeline.init(
    {
      user: DataTypes.STRING,
      hours: DataTypes.TIME,
      date: DataTypes.DATEONLY,
      languages: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "wakatimeline",
    }
  );
  return wakatimeline;
};
