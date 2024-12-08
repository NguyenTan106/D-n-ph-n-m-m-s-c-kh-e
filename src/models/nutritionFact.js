"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NutritionFact extends Model {
    /**
     * Helper method for defining associations.
     */
    static associate(models) {
      // NutritionFact belongs to Food
      NutritionFact.belongsTo(models.Food, { foreignKey: "foodId" });
    }
  }
  NutritionFact.init(
    {
      foodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nutrient_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "NutritionFact",
    }
  );
  return NutritionFact;
};
