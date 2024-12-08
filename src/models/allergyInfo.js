"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AllergyInfo extends Model {
    /**
     * Helper method for defining associations.
     */
    static associate(models) {
      // AllergyInfo belongs to Food
      AllergyInfo.belongsTo(models.Food, { foreignKey: "foodId" });
    }
  }
  AllergyInfo.init(
    {
      foodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      allergy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "AllergyInfo",
    }
  );
  return AllergyInfo;
};
