"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UsageInstruction extends Model {
    /**
     * Helper method for defining associations.
     */
    static associate(models) {
      // UsageInstruction belongs to Food
      UsageInstruction.belongsTo(models.Food, { foreignKey: "foodId" });
    }
  }
  UsageInstruction.init(
    {
      foodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      instruction: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UsageInstruction",
    }
  );
  return UsageInstruction;
};
