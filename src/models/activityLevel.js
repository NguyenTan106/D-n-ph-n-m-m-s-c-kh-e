"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ActivityLevel extends Model {
    /**
     * Helper method for defining associations.
     */
    static associate(models) {
      // ActivityLevel has many Users
      ActivityLevel.hasMany(models.User, { foreignKey: "activityLevelId" });
    }
  }
  ActivityLevel.init(
    {
      level: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ActivityLevel",
    }
  );
  return ActivityLevel;
};
