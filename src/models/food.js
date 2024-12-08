"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here if needed
      // For example: Food.hasMany(models.NutritionFacts, { foreignKey: 'foodId' });
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
        allowNull: true,
      },
      foodType: {
        type: DataTypes.ENUM(
          "Vegetable",
          "Fruit",
          "Meat",
          "Seafood",
          "Grain",
          "Other"
        ),
        allowNull: false,
      },
      healthBenefits: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      targetAudience: {
        type: DataTypes.STRING, // Example: "Pregnant women, athletes"
        allowNull: true,
      },
      usageInstructions: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      expirationDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      storageInstructions: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      allergyInfo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING, // Store a link to the food's image
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      trustedSuppliers: {
        type: DataTypes.TEXT, // Example: "Supplier A, Supplier B"
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
