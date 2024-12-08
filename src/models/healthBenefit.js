"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HealthBenefit extends Model {
    /**
     * Helper method for defining associations.
     */
    static associate(models) {
      // HealthBenefit belongs to Food
      HealthBenefit.belongsTo(models.Food, { foreignKey: "foodId" });
    }
  }
  HealthBenefit.init(
    {
      foodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      benefit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "HealthBenefit",
    }
  );
  return HealthBenefit;
};
