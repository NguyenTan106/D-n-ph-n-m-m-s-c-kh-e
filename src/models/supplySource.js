"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SupplySource extends Model {
    /**
     * Helper method for defining associations.
     */
    static associate(models) {
      // SupplySource belongs to Food
      SupplySource.belongsTo(models.Food, { foreignKey: "foodId" });
    }
  }
  SupplySource.init(
    {
      foodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      source_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      source_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "SupplySource",
    }
  );
  return SupplySource;
};
