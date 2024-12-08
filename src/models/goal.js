"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    /**
     * Helper method for defining associations.
     */
    static associate(models) {
      // Goal has many Users
      Goal.hasMany(models.User, { foreignKey: "goalId" });
    }
  }
  Goal.init(
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Goal",
    }
  );
  return Goal;
};
