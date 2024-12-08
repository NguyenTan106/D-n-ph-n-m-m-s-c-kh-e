"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     */
    static associate(models) {
      // Food relationships
      Food.belongsTo(models.Category, { foreignKey: "categoryId" }); // Reference to Category
      Food.hasMany(models.NutritionFact, { foreignKey: "foodId" });
      Food.hasMany(models.HealthBenefit, { foreignKey: "foodId" });
      Food.hasMany(models.AllergyInfo, { foreignKey: "foodId" });
      Food.hasMany(models.UsageInstruction, { foreignKey: "foodId" });
      Food.hasMany(models.SupplySource, { foreignKey: "foodId" });
    }
  }
  Food.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Food",
    }
  );
  return Food;
};
