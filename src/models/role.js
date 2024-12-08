"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     */
    static associate(models) {
      // Role has many Users
      Role.hasMany(models.User, { foreignKey: "roleId" });
    }
  }
  Role.init(
    {
      role_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
