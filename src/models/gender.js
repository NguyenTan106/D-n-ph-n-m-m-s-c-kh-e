"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Gender extends Model {
    /**
     * Helper method for defining associations.
     */
    static associate(models) {
      // Gender has many Users
      Gender.hasMany(models.User, { foreignKey: "genderId" });
    }
  }
  Gender.init(
    {
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Gender",
    }
  );
  return Gender;
};
