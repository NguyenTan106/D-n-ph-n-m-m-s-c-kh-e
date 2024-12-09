"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      this.belongsTo(models.ActivityLevel, {
        foreignKey: "activityLevelId",
        as: "activityLevel",
      });
      this.belongsTo(models.Goal, { foreignKey: "goalId", as: "goal" });
      this.belongsTo(models.Role, { foreignKey: "roleId", as: "role" });
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      height: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      bmi: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      bmr: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      activityLevelId: {
        type: DataTypes.INTEGER,
        references: {
          model: "ActivityLevels",
          key: "id",
        },
        allowNull: true,
      },
      medicalHistory: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      goalId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Goals",
          key: "id",
        },
        allowNull: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Roles",
          key: "id",
        },
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    }
  );

  return User;
};
