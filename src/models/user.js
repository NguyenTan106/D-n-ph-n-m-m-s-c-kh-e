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
      this.belongsTo(models.Gender, { foreignKey: "genderId", as: "gender" });
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
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      genderId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Genders", // Name of the table
          key: "id",
        },
        allowNull: false,
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      height: {
        type: DataTypes.FLOAT,
        allowNull: false,
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
        allowNull: false,
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
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Roles",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
